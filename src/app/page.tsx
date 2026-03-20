import HomeMain from "@/pages/homes/home/HomeMain";
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
    <HomeMain />
  );
}
