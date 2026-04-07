import HomeMainTestimonial from '@/components/testimonial/HomeMainTestimonial';
import HomeMainTextSlider from '@/components/text-slider/HomeMainTextSlider';
import ModernAgencyAward from '@/components/award/ModernAgencyAward';
import HomeMainProject from '@/components/project/HomeMainProject';
import HomeMainService from '@/components/service/HomeMainService';
import HomeMainVideo from '@/components/video-area/HomeMainVideo';
import HomeMainHero from '@/components/hero-banner/HomeMainHero';
import HomeMainBanner from '@/components/banner/HomeMainBanner';
import HomeMainAbout from '@/components/about/HomeMainAbout';
import HomeMainWork from '@/components/work/HomeMainWork';
import ClientSlider from '@/components/clientslider/clientslider';
import CraftingWebsite from '@/components/craftingwebsite/craftingwebsite';
import Whychoose from '../../../components/whychoose/whychoose';
import SliderMarketing from '@/components/slidermarketing/slidermarketing';

const HomeMain = () => {
    return (
        /* Main Content Sections */
        <main style={{ overflowX: "hidden" }}>
            <HomeMainHero />
            <ClientSlider />
            <HomeMainBanner />
            <HomeMainTextSlider />
            <CraftingWebsite />
            <HomeMainAbout />
            <Whychoose />
            <HomeMainService />
            <HomeMainVideo />
            <HomeMainProject />
            <HomeMainWork />
            <HomeMainTestimonial />
            <SliderMarketing />
        </main>
    );
};

export default HomeMain;
