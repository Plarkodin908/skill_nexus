
/// <reference types="vite/client" />

// Define Lovable specific environment variables
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL: string;
  readonly VITE_ENABLE_FEATURES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
