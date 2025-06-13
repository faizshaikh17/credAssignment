'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search as Magnify } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [query, setQuery] = useState(searchParams.get('query') || '');

    const handleSearch = useDebouncedCallback((term: string) => {
        setQuery(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    });

    return (
        <div className="relative flex w-full max-w-[20rem] h-10 sm:h-10 flex-1 shrink-0">
            <label htmlFor="search" className="sr-only">Search</label>
            <input
                id="search"
                className="peer block w-full rounded-md border border-neutral-800/50 py-[9px] pl-10 pr-3 text-sm placeholder:text-neutral-400 bg-neutral-900 text-neutral-200 focus:outline-none"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value.toLowerCase())}
                value={query}
                aria-autocomplete="list"
            />
            <Magnify className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-600 peer-focus:text-neutral-400" />
        </div>
    );
}
