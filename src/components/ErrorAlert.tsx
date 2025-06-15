'use client';
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle, X } from 'lucide-react';
type ErrorAlertProps = {
    message: string;
    setError: React.Dispatch<React.SetStateAction<string>>
}
export function ErrorAlert({ message,setError }: ErrorAlertProps) {
    return (

<Alert
  variant="destructive"
  className="relative bg-red-100 border-l-4 border-red-500 text-red-700 p-3 sm:p-4 rounded-md shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-3"
>
  <div className="flex items-start sm:items-center gap-2">
    <AlertCircle className="h-5 w-5 mt-0.5 text-red-600 shrink-0" />

    <div className="flex-1">
      <AlertTitle className="font-semibold text-base sm:text-lg">Error</AlertTitle>
      <AlertDescription className="text-sm break-words">{message}</AlertDescription>
    </div>
  </div>

  <button
    onClick={() => setError('')}
    className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition-colors"
    aria-label="Close"
  >
    <X className="h-4 w-4" />
  </button>
</Alert>


    );
}

export default ErrorAlert;
