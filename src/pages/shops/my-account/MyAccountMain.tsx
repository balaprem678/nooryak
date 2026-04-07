import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import MyAccountProfile from '@/components/profile/MyAccountProfile';
import CartOffcanvas from '@/components/offcanvas/CartOffcanvas';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import SearchArea from '@/components/search-area/SearchArea';

const MyAccountMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#F4F0EA'>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-bg-red">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <CartOffcanvas />
                    <SearchArea />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <MyAccountProfile />
                            </main>
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default MyAccountMain;