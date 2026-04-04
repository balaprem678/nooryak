"use client"
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import ContactUsForm from '@/components/contacts/ContactUsForm';
import ContactUsAbout from '@/components/about/ContactUsAbout';
import ContactUsArea from '@/components/contacts/ContactUsArea';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import ContactUsHero from '@/components/contacts/ContactUsHero';

const ContactUsMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-bg-red-2">
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <ContactUsHero />
                                <ContactUsForm />
                                <ContactUsAbout />
                                <ContactUsArea />
                            </main>
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default ContactUsMain;