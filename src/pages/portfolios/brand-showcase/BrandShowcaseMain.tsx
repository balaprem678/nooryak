import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import BrandShowcaseHero from '@/components/hero-banner/BrandShowcaseHero';
import BrandShowcaseBrand from '@/components/brand/BrandShowcaseBrand';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

const PortfolioColTwoMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#fff'>
                <AnimationWrapper>
                    <div id="magic-cursor" className='cursor-bg-red-2'>
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <BrandShowcaseHero />
                                <BrandShowcaseBrand />
                            </main>
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default PortfolioColTwoMain;