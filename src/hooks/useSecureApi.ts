import { useState, useCallback } from 'react';
import { encryptData, decryptData, generateSecureToken } from '@/utils/encryption';
import { toast } from 'sonner';

interface ApiOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
}

interface ApiResponse<T = any> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

/**
 * Custom hook for making secure API requests
 */
export function useSecureApi(defaultOptions: ApiOptions = {}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  const callApi = useCallback(async <T>(
    endpoint: string,
    method: string = 'GET',
    data?: any,
    options: ApiOptions = {}
  ): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);
    
    // Merge options with defaults
    const mergedOptions: ApiOptions = {
      baseUrl: '',
      timeout: 30000, // 30 seconds
      retries: 1,
      ...defaultOptions,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Security-Token': generateSecureToken(),
        ...defaultOptions.headers,
        ...options.headers,
      }
    };
    
    const url = `${mergedOptions.baseUrl || ''}${endpoint}`;
    let attempts = 0;
    const maxAttempts = (mergedOptions.retries || 0) + 1;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), mergedOptions.timeout);
    
    try {
      while (attempts < maxAttempts) {
        attempts++;
        
        try {
          // Encrypt data if present
          const encryptedBody = data ? encryptData(JSON.stringify(data)) : undefined;
          
          const response = await fetch(url, {
            method,
            headers: {
              ...mergedOptions.headers,
              ...(encryptedBody ? { 'X-Content-Encrypted': 'true' } : {})
            },
            ...(method !== 'GET' && encryptedBody ? { body: encryptedBody } : {}),
            signal: controller.signal,
            credentials: 'same-origin',
          });
          
          // Clear timeout as request completed
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
          }
          
          const responseText = await response.text();
          let responseData: T;
          
          // Check if response is encrypted
          if (response.headers.get('X-Content-Encrypted') === 'true') {
            const decrypted = decryptData(responseText);
            responseData = JSON.parse(decrypted) as T;
          } else {
            // Try to parse as JSON, but handle non-JSON responses
            try {
              responseData = responseText ? JSON.parse(responseText) as T : null as T;
            } catch (e) {
              responseData = responseText as unknown as T;
            }
          }
          
          setLoading(false);
          return { data: responseData, error: null, loading: false };
        } catch (err) {
          // If it's the last attempt, throw the error
          // Otherwise, retry
          if (attempts >= maxAttempts) {
            throw err;
          }
          
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 2 ** attempts * 100));
        }
      }
      
      // This shouldn't be reached due to throw in the loop, but TypeScript needs it
      throw new Error('All API call attempts failed');
    } catch (err) {
      clearTimeout(timeoutId);
      setLoading(false);
      
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      
      // Show toast for API errors
      toast.error('API Request Failed', {
        description: error.message.substring(0, 100),
      });
      
      return { data: null, error, loading: false };
    }
  }, [defaultOptions]);
  
  // Convenience methods for different HTTP methods
  const get = useCallback(<T>(endpoint: string, options?: ApiOptions) => {
    return callApi<T>(endpoint, 'GET', undefined, options);
  }, [callApi]);
  
  const post = useCallback(<T>(endpoint: string, data?: any, options?: ApiOptions) => {
    return callApi<T>(endpoint, 'POST', data, options);
  }, [callApi]);
  
  const put = useCallback(<T>(endpoint: string, data?: any, options?: ApiOptions) => {
    return callApi<T>(endpoint, 'PUT', data, options);
  }, [callApi]);
  
  const del = useCallback(<T>(endpoint: string, options?: ApiOptions) => {
    return callApi<T>(endpoint, 'DELETE', undefined, options);
  }, [callApi]);
  
  return {
    loading,
    error,
    get,
    post,
    put,
    delete: del,
    callApi
  };
}

export default useSecureApi;
