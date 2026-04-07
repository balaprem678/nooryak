import DesignStudioTextAreaTwo from '@/components/text-slider/DesignStudioTextAreaTwo';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import AboutModernSuccess from '@/components/success-area/AboutModernSuccess';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import AboutModernHero from '@/components/hero-banner/AboutModernHero';
import AboutModernBanner from '@/components/banner/AboutModernBanner';
import DesignStudioBrand from '@/components/brand/DesignStudioBrand';
import DesignStudioTeam from '@/components/team/DesignStudioTeam';
import ProjectCounter from '@/components/counter/ProjectCounter';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

const AboutModernMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider customClass='white-bg'>
                <AnimationWrapper>
                    <div id="magic-cursor">
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            <main>
                                <AboutModernHero />
                                <AboutModernBanner />
                                <DesignStudioTextAreaTwo spacingCls="pt-20" />
                                <AboutModernSuccess />
                                <div className="des-project-area pt-70 pb-120">
                                    <ProjectCounter spacingCls="" />
                                </div>
                                <DesignStudioBrand />
                                <DesignStudioTeam />
                            </main>
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default AboutModernMain;