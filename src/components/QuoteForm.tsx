import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Upload, X, Image } from 'lucide-react';
import { useHighLevel, type ContactData } from '../hooks/useHighLevel';
import { validateForm, sanitizeFormData, formatPhoneNumber, type ValidationError } from '../utils/formValidation';

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectDetails: string;
  consent: boolean;
  projectImage?: File | null;
}

const QuoteForm = () => {
  const { createContact, uploadMedia, loading, error, clearError } = useHighLevel();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent double submissions
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectDetails: '',
    consent: false,
    projectImage: null
  });

  const getFieldError = (fieldName: string): string | undefined => {
    return validationErrors.find(error => error.field === fieldName)?.message;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear validation errors for this field when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors(prev => prev.filter(error => error.field !== name));
    }

    // Clear any existing API errors when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setFormData(prev => ({
      ...prev,
      projectImage: file
    }));

    // Clear validation errors for this field
    if (validationErrors.length > 0) {
      setValidationErrors(prev => prev.filter(error => error.field !== 'projectImage'));
    }

    // Clear any existing API errors
    if (error) {
      clearError();
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      projectImage: null
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submissions
    if (isSubmitting || loading) {
      console.log('Form submission already in progress, ignoring duplicate submission');
      return;
    }

    setIsSubmitting(true);

    // Clear previous validation errors
    setValidationErrors([]);

    // Sanitize form data
    const sanitizedData = sanitizeFormData(formData);

    // Validate form
    const validation = validateForm(sanitizedData);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      let imageUrl = '';
      let imageId = '';
      let imageName = '';

      // Upload image first if provided
      if (sanitizedData.projectImage) {
        try {
          console.log('Uploading project image to HighLevel...', {
            fileName: sanitizedData.projectImage.name,
            fileSize: sanitizedData.projectImage.size,
            timestamp: new Date().toISOString()
          });

          const mediaResult = await uploadMedia(sanitizedData.projectImage);
          imageUrl = mediaResult.url;
          imageId = mediaResult.altId;
          imageName = mediaResult.name;

          console.log('Image uploaded successfully:', {
            url: imageUrl,
            id: imageId,
            name: imageName
          });
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          // Continue with contact creation even if image upload fails
          // You could also choose to stop here by throwing the error
        }
      }

      // Parse full name into first and last name
      const nameParts = sanitizedData.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const contactData: ContactData = {
        firstName,
        lastName,
        fullName: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone ? formatPhoneNumber(sanitizedData.phone) : '',
        projectDetails: sanitizedData.projectDetails,
        customFields: [
          {
            key: 'lead_source',
            field_value: 'Form4Design Website'
          },
          {
            key: 'form_type',
            field_value: 'Quote Request'
          },
          {
            key: 'submission_date',
            field_value: new Date().toISOString()
          },
          // Image-related custom fields (if image was uploaded)
          ...(imageUrl ? [
            {
              key: 'project_image_url',
              field_value: imageUrl
            },
            {
              key: 'project_image_id',
              field_value: imageId
            },
            {
              key: 'project_image_name',
              field_value: imageName
            },
            {
              key: 'has_project_image',
              field_value: 'Yes'
            }
          ] : [
            {
              key: 'has_project_image',
              field_value: 'No'
            }
          ])
        ]
      };

      await createContact(contactData);
      setIsSubmitted(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectDetails: '',
        consent: false,
        projectImage: null
      });
      setValidationErrors([]);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (err) {
      console.error('Form submission error:', err);
      // Error is already handled by the hook
    } finally {
      setIsSubmitting(false); // Always reset submission state
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-gray-300 mb-4">
          Your quote request has been submitted successfully to our HighLevel CRM. Jason will get back to you within 1 hour.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-yellow-400 hover:text-yellow-300 underline text-sm transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Start your free design today
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-red-400 font-medium mb-1">Submission Error</h4>
              <p className="text-red-300 text-sm">{error}</p>
              <button
                type="button"
                onClick={clearError}
                className="text-red-400 hover:text-red-300 underline text-sm mt-2"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white placeholder-gray-400 transition-colors backdrop-blur-sm ${
                getFieldError('name')
                  ? 'border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                  : 'border-slate-600/50 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400'
              }`}
              placeholder="Your full name"
            />
            {getFieldError('name') && (
              <p className="mt-1 text-sm text-red-400">{getFieldError('name')}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white placeholder-gray-400 transition-colors backdrop-blur-sm ${
                getFieldError('email')
                  ? 'border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                  : 'border-slate-600/50 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400'
              }`}
              placeholder="your@email.com"
            />
            {getFieldError('email') && (
              <p className="mt-1 text-sm text-red-400">{getFieldError('email')}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white placeholder-gray-400 transition-colors backdrop-blur-sm ${
              getFieldError('phone')
                ? 'border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-slate-600/50 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400'
            }`}
            placeholder="(555) 123-4567"
          />
          {getFieldError('phone') && (
            <p className="mt-1 text-sm text-red-400">{getFieldError('phone')}</p>
          )}
        </div>

        <div>
          <label htmlFor="project-details" className="block text-sm font-medium text-gray-300 mb-2">
            Project Details
          </label>
          <textarea
            id="project-details"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white placeholder-gray-400 transition-colors resize-none backdrop-blur-sm ${
              getFieldError('projectDetails')
                ? 'border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-slate-600/50 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400'
            }`}
            placeholder="Tell us about your trade show needs, timeline, and budget..."
          />
          {getFieldError('projectDetails') && (
            <p className="mt-1 text-sm text-red-400">{getFieldError('projectDetails')}</p>
          )}
        </div>

        {/* Project Image Upload */}
        <div>
          <label htmlFor="project-image" className="block text-sm font-medium text-gray-300 mb-2">
            Project Image (Optional)
          </label>

          {!formData.projectImage ? (
            <div className="relative">
              <input
                type="file"
                id="project-image"
                name="projectImage"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="project-image"
                className={`w-full px-4 py-6 bg-slate-800/50 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors backdrop-blur-sm flex flex-col items-center space-y-2 hover:bg-slate-700/50 ${
                  getFieldError('projectImage')
                    ? 'border-red-500/50 hover:border-red-400'
                    : 'border-slate-600/50 hover:border-yellow-400'
                }`}
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-gray-300">
                  Click to upload project image
                </span>
                <span className="text-sm text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </span>
              </label>
            </div>
          ) : (
            <div className="relative bg-slate-800/50 border border-slate-600/50 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Image className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{formData.projectImage.name}</p>
                  <p className="text-sm text-gray-400">
                    {(formData.projectImage.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          )}

          {getFieldError('projectImage') && (
            <p className="mt-1 text-sm text-red-400">{getFieldError('projectImage')}</p>
          )}
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={handleInputChange}
            required
            className="mt-1 w-4 h-4 text-yellow-600 bg-slate-800/50 border border-slate-600/50 rounded focus:ring-yellow-400 focus:ring-2"
          />
          <label htmlFor="consent" className="text-sm text-gray-300 leading-relaxed">
            By checking this box and submitting this form, I consent to receive marketing communications from Form4Design via phone, email, and text message. I understand that I can opt out at any time by replying STOP to text messages or unsubscribing from emails. Message and data rates may apply. I acknowledge that I have read and agree to the{' '}
            <a href="/privacy-policy" className="text-yellow-400 hover:text-yellow-300 underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms-of-service" className="text-orange-400 hover:text-orange-300 underline">
              Terms of Service
            </a>
            . *
          </label>
          {getFieldError('consent') && (
            <p className="mt-1 text-sm text-red-400">{getFieldError('consent')}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || isSubmitting}
          className={`w-full brand-button text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group shadow-lg shadow-yellow-500/25 ${
            loading || isSubmitting
              ? 'opacity-75 cursor-not-allowed'
              : 'transform hover:scale-105'
          }`}
        >
          {loading || isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
              {formData.projectImage ? 'Uploading Image & Creating Contact...' : 'Sending to HighLevel...'}
            </>
          ) : (
            <>
              Send Quote Request
              <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <p className="text-sm text-gray-400 text-center mt-4">
        * Required fields. We'll respond within 1 hour.
      </p>
    </div>
  );
};

export default QuoteForm;