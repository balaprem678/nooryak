import { Images } from "@/utils/Images";

export const sectionMetaApp = {
  label: "OUR SERVICES",
  heading: "Complete App Development Solutions",
  subheading:
    "From native to cross-platform apps, we deliver mobile solutions that engage users and drive business growth.",
};

export const servicesDataApp = [
  {
    id: 1,
    icon: "mobile",
    iconBg: "#f4510b",
    iconColor: "#fff",
    title: "Android Application",
    description:
      "Native Android apps built with the latest technologies for optimal performance.",
    link: "#",
  },
  {
    id: 2,
    icon: "apple",
    iconBg: "#000",
    iconColor: "#fff",
    title: "IOS Application",
    description:
      "Premium iOS apps designed for seamless user experience on Apple devices.",
    link: "#",
  },
  {
    id: 3,
    icon: "react",
    iconBg: "#61dafb",
    iconColor: "#000",
    title: "React Native",
    description:
      "Cross-platform mobile apps built with React Native for faster development.",
    link: "#",
  },
  {
    id: 4,
    icon: "flutter",
    iconBg: "#02569B",
    iconColor: "#fff",
    title: "Flutter App Development",
    description:
      "Beautiful, fast, and native-like apps built with Google's Flutter framework.",
    link: "#",
  },
  {
    id: 5,
    icon: "code",
    iconBg: "#f4510b",
    iconColor: "#fff",
    title: "Custom App Development",
    description:
      "Tailored mobile solutions built from scratch to match your business needs.",
    link: "#",
  },
];


export const AppDevelopmentHeroData = {
    label: "APP DEVELOPMENT",
    title: {
        line1: "Powerful Websites.",
        line2: "Built for",
        highlight: "Growth."
    },
    description:
        "We design and develop high-performance mobile applications that engage users, slove real problems, and accelerate business growth on every platform.",

    buttons: [
        {
            text: "Explore Our Services",
            link: "#",
            type: "primary"
        },
        {
            text: "Let's Talk",
            link: "#",
            type: "secondary"
        }
    ],

    features: [
        {
            icon: "✔",
            text: "User-Centered Design"
        },
        {
            icon: "⊙",
            text: "Scalable & Secure"
        },
        {
            icon: "↺",
            text: "On-Time Delivery"
        }
    ],

    image: Images.Appdevlopment
};

export const whyChooseDataApp = {
    heading: "WHY CHOOSE NOORYAK",
    title: "We Build More Than Apps — We Build Experiences",
    subtitle:
        "Our mobile solutions are designed to engage users, solve real problems, and drive business growth across all platforms.",
    items: [
        {
            icon: Images.dashboard,
            title: "Customized Apps",
            description:
                "Every app is tailored to your unique business goals and user needs.",
        },
        {
            icon: Images.setting,
            title: "Performance Focused",
            description:
                "We build fast, secure, and high-performing mobile applications.",
        },
        {
            icon: Images.optimization,
            title: "App Store Optimized",
            description:
                "Our apps are designed to rank higher and attract more downloads.",
        },
        {
            icon: Images.support,
            title: "Reliable Support",
            description:
                "We're here for you — before, during, and after the launch.",
        },
    ],
};