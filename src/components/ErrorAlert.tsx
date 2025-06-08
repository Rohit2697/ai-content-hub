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
        // <Alert variant="destructive" className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md flex items-start space-x-3">
        //     <AlertCircle className="h-5 w-5 mt-1 text-red-600" />
        //     <div>
        //         <AlertTitle className="font-semibold text-lg">Error</AlertTitle>
        //         <AlertDescription className="text-sm">{message}</AlertDescription>
        //     </div>
        // </Alert>
        <Alert
            variant="destructive"
            className="relative bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md flex items-start space-x-3"
        >
            <AlertCircle className="h-5 w-5 mt-1 text-red-600" />

            <div className="flex-1">
                <AlertTitle className="font-semibold text-lg">Error</AlertTitle>
                <AlertDescription className="text-sm">{message}</AlertDescription>
            </div>

            <button
                onClick={()=>setError('')}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                aria-label="Close"
            >
                <X className="h-4 w-4" />
            </button>
        </Alert>

    );
}

export default ErrorAlert;
