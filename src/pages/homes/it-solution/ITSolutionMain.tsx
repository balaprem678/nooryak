import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ITSolutionTestimonial from '@/components/testimonial/ITSolutionTestimonial';
import ITSolutionComparison from '@/components/comparison/ITSolutionComparison';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import ITSolutionBenifit from '@/components/benefits/ITSolutionBenifit';
import ITSolutionProject from '@/components/project/ITSolutionProject';
import ITSolutionBrandTwo from '@/components/brand/ITSolutionBrandTwo';
import ITSolutionHero from '@/components/hero-banner/ITSolutionHero';
import ITSolutionFeature from '@/components/features/ITSolutionFaq';
import ITSolutionBrand from '@/components/brand/ITSolutionBrand';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import ITSolutionStep from '@/components/step/ITSolutionStep';
import SearchArea from '@/components/search-area/SearchArea';
import ITSolutionFaq from '@/components/faq/ITSolutionFaq';

const ITSolutionMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#08041D'>
                <AnimationWrapper>
                    {/* Magic cursor element */}
                    <div id="magic-cursor">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <SearchArea />

                    <div id="smooth-wrapper" style={{ backgroundColor: "#FDF7F4" }}>
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <ITSolutionHero />
                                <ITSolutionStep />
                                <ITSolutionBrand />
                                <ITSolutionFeature />
                                <ITSolutionProject />
                                <ITSolutionBrandTwo />
                                <ITSolutionTestimonial />
                                <ITSolutionComparison />
                                <ITSolutionBenifit />
                                <ITSolutionFaq />
                            </main>
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default ITSolutionMain;
