/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import httpClient from "src/shared/httpClient";

declare module "next-auth" {
  interface Session {
    access_token?: string;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const refInterceptor = useRef<number | null>(null);
  const refAccessToken = useRef<string | null>(null);

  useEffect(() => {
    // TODO: allow validation for 401.
    //TODO: sign out function
    // TODO: fix type errors
    if (!session?.access_token) return;

    refAccessToken.current = session?.access_token || '';

    if (refInterceptor.current) {
      httpClient.interceptors.request.eject(refInterceptor.current);
    }

    const requestInterceptor = (config: any) => {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${refAccessToken.current}`,
      };

      return config;
    };

    httpClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          console.error('error', error) //TODO: sign out function
        }

        return Promise.reject(error);
      }
    );

    refInterceptor.current = httpClient.interceptors.request.use(requestInterceptor);

    return () => {
      if (refInterceptor.current) {
        httpClient.interceptors.request.eject(refInterceptor.current);
      }
    };
  }, [session?.access_token]);
  return <>{children}</>
}