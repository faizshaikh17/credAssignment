import { Suspense } from 'react';
import CreditCardsList from './ui/components/CreditCardsList';

export default function Page() {
  return (
    <div className="min-h-screen md:p-0 p-2 relative flex flex-col items-center justify-start bg-black">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <CreditCardsList />
      </Suspense>
    </div>
  );
}
