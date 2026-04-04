import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import PortfolioMertoProject from '@/components/project/PortfolioMertoProject';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import CreativeAgencyBrand from '@/components/brand/CreativeAgencyBrand';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

const PortfolioMetroMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor" className='cursor-white-bg'>
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <PortfolioMertoProject />
                                <CreativeAgencyBrand spacingCls='pb-50' subtitleTextColor='' />
                            </main>
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default PortfolioMetroMain;