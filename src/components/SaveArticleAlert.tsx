import { Alert, AlertTitle } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';
type redirectProps = {
  redirectTime: number;
  message: string
}
export default function SaveArticleAlert({ redirectTime, message }: redirectProps) {
  return (
    <Alert aria-live="polite" className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 sm:p-4 rounded-md shadow-md flex items-start sm:items-center gap-2">
      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
      <AlertTitle className="font-semibold text-sm sm:text-base">
        {message} Redirecting the page in {redirectTime} sec...
      </AlertTitle>
    </Alert>


  );
}
