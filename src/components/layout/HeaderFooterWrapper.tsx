'use client';

import { usePathname } from 'next/navigation';
import HomeMainHeader from '@/layouts/headers/HomeMainHeader';
import HomeMainFooter from '@/layouts/footers/HomeMainFooter';

// Layout & Providers
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import EnquiryForm from '../forms/EnquiryFrom';

export default function HeaderFooterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if current path is an admin route or login/register
  const isAdminPage = pathname?.startsWith('/admin') || 
                      pathname === '/login' || 
                      pathname === '/register';

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <HomeMainHeader />
      <EnquiryForm />

      <ScrollSmoothProvider>
        <CursorAndBackgroundProvider>
          <AnimationWrapper>
            <div id="magic-cursor" className="cursor-white-bg">
              <div id="ball"></div>
            </div>
            <BackToTop />
            
            <div id="smooth-wrapper">
              <div id="smooth-content">
                <main style={{ minHeight: '100vh' }}>
                  {children}
                </main>
                <HomeMainFooter />
              </div>
            </div>
          </AnimationWrapper>
        </CursorAndBackgroundProvider>
      </ScrollSmoothProvider>
    </>
  );
}
