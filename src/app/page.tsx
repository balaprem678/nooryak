import HomeMain from "@/pages/homes/home/HomeMain";
import { Images } from "@/utils/Images";
import HomeMainHeader from '@/layouts/headers/HomeMainHeader';
import { Metadata } from "next";
// import logo from "../../public/assets/images/common/Logo-blue.png"
export const metadata: Metadata = {
  title: "Home - Nooryak",
  icons: {
    icon: "/assets/images/common/Logo-blue.png",
  },
};

export default function Home() {
  return (
    <>
      <HomeMainHeader />
      <HomeMain />
      <div className="foot_floating">
        <a href="https://wa.me/6374913298" target="_blank" rel="noopener noreferrer">
          <img src={Images.whatsapp.src} alt="WhatsApp" />
        </a>
          <a href="tel: 6374913298" rel="nofollow" className="btn-call">
            <div className="btn-call__ico">
              <i className="fas fa-phone-alt"></i>
            </div>
          </a>
      </div>
    </>
  );
}
