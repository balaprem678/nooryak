'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // We don't track admin or API routes as 'site engagement'
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
      return;
    }

    const trackVisit = async () => {
      try {
        // Get or Create Visitor ID
        let visitorId = localStorage.getItem('nooryak_v_id');
        if (!visitorId) {
          visitorId = Math.random().toString(36).substring(2) + Date.now().toString(36);
          localStorage.setItem('nooryak_v_id', visitorId);
        }

        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: pathname,
            visitorId,
          }),
        });
      } catch (error) {
        // Ignore tracking errors
      }
    };

    trackVisit();
  }, [pathname]);

  return null; // This is a logic-only component
}
