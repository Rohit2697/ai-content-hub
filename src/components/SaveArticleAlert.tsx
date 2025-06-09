import { Alert, AlertTitle } from '@/components/ui/alert';
type redirectProps = {
  redirectTime: number;
  message:string
}
export default function SaveArticleAlert({ redirectTime,message }: redirectProps) {
  return (
    <Alert className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-md">
      <AlertTitle className="font-semibold text-base">
        {message} Redirecting the page in {redirectTime} sec...
      </AlertTitle>
    </Alert>

  );
}
