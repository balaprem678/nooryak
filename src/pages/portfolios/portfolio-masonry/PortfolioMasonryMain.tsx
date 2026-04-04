import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import PortfolioMasonryArea from '@/components/portfolio/PortfolioMasonryArea';
import PortfolioMasonryGrid from '@/components/portfolio/PortfolioMasonryGrid';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

const PortfolioMasonryMain = () => {
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
                                <PortfolioMasonryArea />
                                <PortfolioMasonryGrid />
                            </main>
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default PortfolioMasonryMain;