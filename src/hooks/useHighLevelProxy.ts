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

export interface UseHighLevelProxyReturn {
  createContact: (data: ContactData) => Promise<HighLevelResponse>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useHighLevelProxy = (): UseHighLevelProxyReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const createContact = async (formData: ContactData): Promise<HighLevelResponse> => {
    setLoading(true);
    setError(null);

    try {
      // Get the API endpoint from environment or use default
      const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3001';

      console.log('Sending contact data to backend proxy:', {
        ...formData,
        email: '[REDACTED]'
      });

      const response = await fetch(`${apiEndpoint}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(`Failed to create contact: ${errorMessage}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Unknown error occurred');
      }

      console.log('Contact created successfully via proxy:', result);

      return {
        contact: result.contact,
        success: true,
        message: result.message || 'Contact created successfully'
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Backend Proxy Error:', err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    createContact,
    loading,
    error,
    clearError
  };
};
