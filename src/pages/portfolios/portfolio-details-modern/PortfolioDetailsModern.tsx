import PortfolioDetailsFourColorArea from '@/components/portfolio/PortfolioDetailsFourColor';
import PortfolioDetailsFourSlider from '@/components/portfolio/PortfolioDetailsFourSlider';
import PortfolioDetailsFourBanner from '@/components/banner/PortfolioDetailsFourBanner';
import PortfolioDetailsFourArea from '@/components/portfolio/PortfolioDetailsFourArea';
import PortfolioDetailsNextPrv from '@/components/portfolio/PortfolioDetailsNextPrv';
import PortfolioDetailsFourAbout from '@/components/about/PortfolioDetailsFourAbout';
import PortfolioDetailsFourThumb from '@/components/thumb/PortfolioDetailsFourThumb';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import PortfolioDetailsFourWork from '@/components/work/PortfolioDetailsFourWork';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

const PortfolioDetailsModern = () => {

    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor" className='cursor-bg-red'>
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <PortfolioDetailsFourArea />
                                <PortfolioDetailsFourBanner />
                                <PortfolioDetailsFourAbout />
                                <PortfolioDetailsFourColorArea />
                                <PortfolioDetailsFourWork />
                                <PortfolioDetailsFourThumb />
                                <PortfolioDetailsFourSlider />
                                <PortfolioDetailsNextPrv />
                            </main>
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default PortfolioDetailsModern;