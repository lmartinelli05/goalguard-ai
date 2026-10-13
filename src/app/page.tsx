'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/analysis/match_123');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-950 text-white">
      <p className="animate-pulse text-zinc-500">Loading GoalGuard AI...</p>
    </div>
  );
}
