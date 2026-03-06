import { useState } from 'react';

export interface ContactData {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  projectDetails?: string;
  customFields?: Array<{
    key: string;
    field_value: string;
  }>;
}

export interface HighLevelResponse {
  contact: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    locationId: string;
    createdAt: string;
  };
  success: boolean;
  message?: string;
}

export interface MediaUploadResponse {
  url: string;
  altId: string;
  altType: string;
  name: string;
  success: boolean;
}

export interface UseHighLevelReturn {
  createContact: (data: ContactData) => Promise<HighLevelResponse>;
  uploadMedia: (file: File) => Promise<MediaUploadResponse>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

const HIGHLEVEL_API_BASE = 'https://services.leadconnectorhq.com';
const API_VERSION = '2021-07-28';

export const useHighLevel = (): UseHighLevelReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const uploadMedia = async (file: File): Promise<MediaUploadResponse> => {
    setLoading(true);
    setError(null);

    try {
      const token = import.meta.env.VITE_HIGHLEVEL_TOKEN;
      const locationId = import.meta.env.VITE_HIGHLEVEL_LOCATION_ID;

      if (!token) {
        throw new Error('HighLevel token not configured for media upload.');
      }

      if (!locationId) {
        throw new Error('HighLevel location ID not configured for media upload.');
      }

      // Create FormData for file upload with unique identifier
      const formData = new FormData();
      formData.append('file', file);
      formData.append('locationId', locationId);

      // Add timestamp to filename to prevent duplicates
      const timestamp = Date.now();
      const originalName = file.name;
      const fileExtension = originalName.split('.').pop();
      const baseName = originalName.replace(`.${fileExtension}`, '');
      const uniqueName = `${baseName}_${timestamp}.${fileExtension}`;

      // Note: Some APIs support custom filename, but HighLevel may use original file.name

      console.log('Uploading file to HighLevel media library:', {
        originalName: file.name,
        uniqueName: uniqueName,
        fileSize: file.size,
        fileType: file.type,
        timestamp: timestamp
      });

      const response = await fetch(`${HIGHLEVEL_API_BASE}/medias/upload-file`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Version': API_VERSION
          // Note: Don't set Content-Type for FormData, browser will set it with boundary
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(`Failed to upload file to HighLevel: ${errorMessage}`);
      }

      const result = await response.json();

      console.log('File uploaded successfully to HighLevel:', result);

      return {
        url: result.url || result.fileUrl,
        altId: result.altId || result.id,
        altType: result.altType || 'media',
        name: result.name || file.name,
        success: true
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred during file upload';
      console.error('HighLevel Media Upload Error:', err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (formData: ContactData): Promise<HighLevelResponse> => {
    setLoading(true);
    setError(null);

    try {
      // Get environment variables
      const token = import.meta.env.VITE_HIGHLEVEL_TOKEN;
      const locationId = import.meta.env.VITE_HIGHLEVEL_LOCATION_ID;

      if (!token) {
        throw new Error('HighLevel token not configured. Please set VITE_HIGHLEVEL_TOKEN in your environment variables.');
      }

      if (!locationId) {
        throw new Error('HighLevel location ID not configured. Please set VITE_HIGHLEVEL_LOCATION_ID in your environment variables.');
      }

      // Prepare the payload for HighLevel API
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone || '',
        locationId: locationId,
        customFields: [
          ...(formData.customFields || []),
          ...(formData.projectDetails ? [{
            key: 'project_details',
            field_value: formData.projectDetails
          }] : [])
        ],
        tags: ['Website Lead', 'React Form', 'Form4Design'],
        source: 'Custom React Form - Form4Design Website'
      };

      console.log('Sending contact data to HighLevel:', { ...payload, locationId: '[REDACTED]' });

      const response = await fetch(`${HIGHLEVEL_API_BASE}/contacts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Version': API_VERSION,
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(`Failed to create contact in HighLevel: ${errorMessage}`);
      }

      const result = await response.json();
      
      console.log('HighLevel contact created successfully:', result);

      return {
        contact: result.contact || result,
        success: true,
        message: 'Contact created successfully'
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('HighLevel API Error:', err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    createContact,
    uploadMedia,
    loading,
    error,
    clearError
  };
};
