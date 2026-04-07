import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import AboutMeHero from '@/components/hero-banner/AboutMeHero';
import AboutService from '@/components/service/AboutService';
import AboutMeBrand from '@/components/brand/AboutMeBrand';

const AboutMeMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-bg-yellow">
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            <main>
                                <div className="pp-top-wrap">
                                    <AboutMeHero />
                                    <AboutMeBrand />
                                </div>
                                <AboutService />
                            </main>
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default AboutMeMain;