'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';

// 1. Force the Canvas wrapper to be client-only
const SafeCanvas = dynamic(() => import('./three-canvas'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted/20 animate-pulse" />
});

// 2. Force the Scene content to be client-only
const ParasiteScene = dynamic(() => import('./parasite-scene'), { 
  ssr: false 
});

export function ParasiteViewer({ parasiteId }: { parasiteId: string }) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="h-[400px] w-full bg-muted/10" />;

  return (
    <div className="w-full h-full min-h-[400px]">
      <SafeCanvas
        style={{ background: 'linear-gradient(135deg, #e8f1f7 0%, #f5f9fc 100%)' }}
        dpr={[1, 2]}
        shadows
        flat
      >
        <ParasiteScene parasiteId={parasiteId} />
      </SafeCanvas>
    </div>
  );
}