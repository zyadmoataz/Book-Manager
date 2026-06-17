import { Link } from "react-router-dom";

//Wrap a risky part of the UI in an Error Boundary.
function ErrorBoundry() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <p className='text-2xl font-bold'>Something went wrong</p>
      <button
        onClick={() => window.location.reload()}
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
      >
        Reload
      </button>
      <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'>
        <Link to='/'>Homepage</Link>
      </button>
    </div>
  );
}

export default ErrorBoundry;
