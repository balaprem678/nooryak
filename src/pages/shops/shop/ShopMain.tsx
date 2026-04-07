import ProductPagination from '@/components/product/subComponents/ProductPagination';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ShopModernSubscribePopup from '@/components/Popup/ShopModernSubscribePopup';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import ProductQuickViewModal from '@/components/modals/ProductQuickViewModal';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import ShopProductArea from '@/components/product/ShopProductArea';
import CartOffcanvas from '@/components/offcanvas/CartOffcanvas';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import SearchArea from '@/components/search-area/SearchArea';

const ShopMain = () => {
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
                    <ProductQuickViewModal />
                    <ShopModernSubscribePopup />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <ShopProductArea />
                                <ProductPagination />
                            </main>
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default ShopMain;