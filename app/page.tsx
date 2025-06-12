import { Suspense } from 'react';
import SearchWrapper from './ui/components/SearchWrapper';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <SearchWrapper />
      </Suspense>
    </div>
  );
}
