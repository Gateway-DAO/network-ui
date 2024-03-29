declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_ENDPOINT: string;
      NEXT_PUBLIC_API_KEY: string;
      NEXT_PUBLIC_API_ENV:
        | 'development'
        | 'staging'
        | 'testnet'
        | 'production'
        | 'test';
      NEXTAUTH_SECRET: string;
      SECURE_API_KEY: string;
      VERCEL_ENV: 'production' | 'preview' | 'development';
    }
  }

  interface Window {
    pocketNetwork: any;
  }
}
export {};
