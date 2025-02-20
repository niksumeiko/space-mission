declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_PHASE: string;
    }
  }
}

export {}