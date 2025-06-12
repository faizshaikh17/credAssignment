import { Suspense } from 'react';
import SearchWrapper from './ui/components/SearchWrapper';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <SearchWrapper />
      </Suspense>
    </div>
  );
}
