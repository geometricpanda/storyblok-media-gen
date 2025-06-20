import Link from 'next/link';
import type { FC } from 'react';

const Unauthorized: FC = () => {
  return (
    <main className="flex size-full flex-col items-center justify-center p-4">
      <div className="card card-compact bg-base-100 w-full max-w-sm shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Access Denied</h2>
          <p>Please log in to continue.</p>
          <div className="card-actions mt-4">
            <Link className="btn btn-primary btn-sm" href="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Unauthorized;
