import { Images } from "@/utils/Images";

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

export const sectionMetaApp = {
  label: "OUR SERVICES",
  heading: "Complete App Development Solutions",
  subheading:
    "From native to cross-platform apps, we deliver mobile solutions that engage users and drive business growth.",
};

export const servicesDataApp = [
  {
    id: 1,
    images: Images.android.src,
    title: "Android Application",
    description:
      "Native Android apps built with the latest technologies for optimal performance.",
    link: "#",
  },
  {
    id: 2,
    images: Images.apple.src,
    title: "IOS Application",
    description:
      "Premium iOS apps designed for seamless user experience on Apple devices.",
    link: "#",
  },
  {
    id: 3,
    images: Images.react.src,
    title: "React Native",
    description:
      "Cross-platform mobile apps built with React Native for faster development.",
    link: "#",
  },
  {
    id: 4,
    images: Images.flutter.src,
    title: "Flutter App Development",
    description:
      "Beautiful, fast, and native-like apps built with Google's Flutter framework.",
    link: "#",
  },
  {
    id: 5,
    images: Images.customwebsite.src,
    title: "Custom App Development",
    description:
      "Tailored mobile solutions built from scratch to match your business needs.",
    link: "#",
  },
];

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


export const processDataApp = {
  tag: "OUR PROCESS",
  title: "How We Bring Your Ideas to Life",
  subtitle:
    "A proven process that ensures clarity, transparency, and outstanding results.",
  steps: [
    {
      number: "01",
      title: "Discovery",
      description:
        "We understand your goals, audience, and requirements.",
    },
    {
      number: "02",
      title: "Planning",
      description:
        "We create a clear roadmap and project strategy.",
    },
    {
      number: "03",
      title: "Development",
      description:
        "Our team builds your website using the latest technologies.",
    },
    {
      number: "04",
      title: "Testing",
      description:
        "We ensure everything works perfectly across all devices.",
    },
    {
      number: "05",
      title: "Launch & Support",
      description:
        "We launch your site and provide ongoing support.",
    },
  ],
};
