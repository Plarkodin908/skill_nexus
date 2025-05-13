
/**
 * Utility functions for handling encrypted API communications
 */

// Simple encryption/decryption using a combination of Base64 and character shifting
// For production, use a more sophisticated encryption library like CryptoJS

/**
 * Encrypts a string using basic Base64 + character shifting
 * @param data The data to encrypt
 * @returns Encrypted string
 */
export const encryptData = (data: string): string => {
  try {
    // First convert to Base64
    const base64 = btoa(typeof data === 'string' ? data : JSON.stringify(data));
    // Then shift characters (simple Caesar cipher-like approach)
    return base64.split('').map(char => {
      const code = char.charCodeAt(0);
      return String.fromCharCode(code + 1); // Shift by 1
    }).join('');
  } catch (error) {
    console.error('Encryption error:', error);
    return '';
  }
};

/**
 * Decrypts a string that was encrypted with encryptData
 * @param encryptedData The encrypted string
 * @returns Decrypted string
 */
export const decryptData = (encryptedData: string): string => {
  try {
    // First unshift characters
    const unshifted = encryptedData.split('').map(char => {
      const code = char.charCodeAt(0);
      return String.fromCharCode(code - 1); // Unshift by 1
    }).join('');
    
    // Then decode from Base64
    return atob(unshifted);
  } catch (error) {
    console.error('Decryption error:', error);
    return '';
  }
};

/**
 * Securely stores API keys in localStorage with encryption
 * @param keyName Identifier for the API key
 * @param keyValue The API key to store
 */
export const securelyStoreApiKey = (keyName: string, keyValue: string): void => {
  try {
    const encryptedKey = encryptData(keyValue);
    localStorage.setItem(`secure_api_${keyName}`, encryptedKey);
  } catch (error) {
    console.error('Failed to store API key securely:', error);
  }
};

/**
 * Retrieves a securely stored API key
 * @param keyName Identifier for the API key
 * @returns The decrypted API key or null if not found
 */
export const getSecureApiKey = (keyName: string): string | null => {
  try {
    const encryptedKey = localStorage.getItem(`secure_api_${keyName}`);
    if (!encryptedKey) return null;
    
    return decryptData(encryptedKey);
  } catch (error) {
    console.error('Failed to retrieve API key:', error);
    return null;
  }
};

/**
 * Creates a secure token for API requests with short expiration
 * @returns Secure token with timestamp
 */
export const generateSecureToken = (): string => {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 15);
  
  return encryptData(`${timestamp}:${randomPart}:${window.location.origin}`);
};

/**
 * Masks an API key for display purposes
 * @param apiKey The full API key
 * @returns A masked version like "sk_*****1234"
 */
export const maskApiKey = (apiKey: string): string => {
  if (!apiKey || apiKey.length < 8) return '******';
  
  const prefix = apiKey.substring(0, 3);
  const suffix = apiKey.substring(apiKey.length - 4);
  
  return `${prefix}${'*'.repeat(Math.max(0, apiKey.length - 7))}${suffix}`;
};

// Utility to detect if the browser supports secure storage
export const hasSecureStorageSupport = (): boolean => {
  try {
    return 'crypto' in window && 'subtle' in window.crypto;
  } catch (_) {
    return false;
  }
};
