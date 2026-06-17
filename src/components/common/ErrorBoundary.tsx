import { Link, useRouteError } from "react-router-dom";

//Wrap a risky part of the UI in an Error Boundary.
function ErrorBoundary() {
  const error = useRouteError() as { status?: number; statusText?: string };

  if (error?.status === 404) {
    return (
      <div className='flex h-[50vh] flex-col items-center justify-center gap-4 text-foreground'>
        <h1 className='text-3xl font-bold'>404 Not Found</h1>
        <span>The page you are looking for doesn't exist.</span>
        <Link to='/' className='mt-4 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-500'>
          Go to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className='flex h-[50vh] items-center justify-center text-foreground'>
      <div className='text-center'>
        <h2 className='mb-2 text-2xl font-bold'>Something went wrong</h2>
        <p className='text-muted-foreground'>Please try again later.</p>
        <Link to='/' className='mt-4 inline-block rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-500'>
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default ErrorBoundary;
