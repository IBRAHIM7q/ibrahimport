'use client';

import { useEffect } from 'react';

export function HMRErrorSuppressor() {
  useEffect(() => {
    // Suppress HMR (Hot Module Replacement) errors in development
    if (process.env.NODE_ENV === 'development') {
      const originalError = console.error;
      console.error = (...args) => {
        // Filter out common HMR-related errors
        const errorMessage = args[0]?.toString() || '';
        if (
          errorMessage.includes('HMR') ||
          errorMessage.includes('Hot Module Replacement') ||
          errorMessage.includes('websocket') ||
          errorMessage.includes('Failed to fetch') ||
          errorMessage.includes('Cannot read properties of null (reading \'parentNode\')')
        ) {
          return;
        }
        originalError(...args);
      };
    }
  }, []);

  return null;
}