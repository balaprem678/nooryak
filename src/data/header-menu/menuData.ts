import { MenuItem } from "@/types/menu-d-t";

const headerMenuData: MenuItem[] = [
  // home
  {
    id: 1,
    active: true,
    title: "Home",
    link: "#",
  },
  // aboutus
  {
    id: 2,
    active: true,
    title: "About Us",
    link: "#",

  },

  // Services
  {
    id: 4,
    hasDropdown: true,
    active: true,
    children: true,
    title: "Services",
    pluseIncon: true,
    megaMenu: true,
    link: "#",
    submenus: [
      {
        title: "Web Development",
        megaMenu: [
          { title: "Web Developer", link: "/web-developer" },
          { title: "Website Development", link: "/website-development" },
          { title: "WordPress Website", link: "/wordpress-website" },
          { title: "Ecommerce Website", link: "/ecommerce-website" },
          { title: "Shopify Website", link: "/shopify-website" },
          { title: "WooCommerce Website", link: "/woocommerce-website" },
          { title: "PHP Web Development", link: "/php-web-development" },
          { title: "React Web Development", link: "/react-web-development" },
          { title: "Ecommerce Development", link: "/ecommerce-development" },
          { title: "Shopify Development", link: "/shopify-development" },
          { title: "Custom Website Development", link: "/custom-website-development" },
          { title: "Website Design and Development", link: "/website-design-development" }
        ]
      },
      {
        title: "App Development",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Android Application", link: "/android-application" },
          { title: "IOS Application", link: "/ios-application" },
          { title: "React Native", link: "/react-native" },
          { title: "Flutter App Development", link: "/flutter-app-development" },
          {
            heading: "Pay-Per-Click (PPC)",
            title: "",
            link: ""
          },
          { title: "Google Ads", link: "/google-ads" },
          { title: "Facebook Ads", link: "/facebook-ads" },
          { title: "Display Advertising", link: "/display-advertising" },
          { title: "Remarketing Campaigns", link: "/remarketing-campaigns" },

          {
            heading: "Software Development",
            title: "",
            link: ""
          },
          { title: "Software Development", link: "/software-development" },
          { title: "AI Automations", link: "/ai-automations" },
        ]
      },
      {
        title: "Digital Marketing",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Search Engine Optimization", link: "/search-engine-optimization" },
          { title: "Search Engine Marketing", link: "/search-engine-marketing" },
          { title: "Social Media Marketing", link: "/social-media-marketing" },
          { title: "SMS Marketing", link: "/sms-marketing" },
          { title: "Facebook Marketing", link: "/facebook-marketing" },
          { title: "Content Marketing", link: "/content-marketing" },
          { title: "On-Page Optimization", link: "/on-page-optimization" },
          { title: "Off-Page Optimization", link: "/off-page-optimization" },
          { title: "Technical SEO", link: "/technical-seo" },
          { title: "Branding", link: "/branding" },



        ]
      },
      {
        title: "Social Media Marketing",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Facebook Marketing", link: "/facebook-marketing" },
          { title: "Instagram Marketing", link: "/instagram-marketing" },
          { title: "Youtube Marketing", link: "/youtube-marketing" },
          { title: "LinkedIn Marketing", link: "/linkedin-marketing" },
          { title: "Twitter Marketing", link: "/twitter-marketing" },
          { title: "Social Media Advertising", link: "/social-media-advertising" },
          { title: "Social Media Post Scheduling", link: "/social-media-post-scheduling" },

          {
            heading: "Local SEO",
            title: "",
            link: ""
          },
          { title: "Google My Business Ranking", link: "/google-my-business-ranking" },
          { title: "Local Directory Listings", link: "/local-directory-listings" },
          { title: "Local SEO Tools", link: "/local-seo-tools" },
        ]
      },
     
      {
        title: "Graphic Designing",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Logo Designs", link: "/logo-designs" },
          { title: "Package Designs", link: "/package-designs" },
          { title: "Social Media Designs", link: "/social-media-designs" },
          { title: "Brochure Designs", link: "/brochure-designs" },
          { title: "Pamphlet Designs", link: "/pamphlet-designs" },
          { title: "Website Banners", link: "/website-banners" },
          { title: "Banner Designs", link: "/banner-designs" },
          { title: "2D & 3D Designs", link: "/2d-3d-designs" },
          { title: "Standee Designs", link: "/standee-designs" },
          { title: "Creative Business Card designs", link: "/business-card-designs" },
          { title: "Annual report design", link: "/annual-report-design" },
          { title: "End to End Event designs", link: "/event-designs" },
          { title: "CSR Report design", link: "/csr-report-design" },

        ]
      },
      {
        title: "",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Strategy Report Design", link: "/strategy-report-design" },
          { title: "Catalogue Designs", link: "/catalogue-designs" },
          { title: "Menu Designs", link: "/menu-designs" },
          { title: "Marriage Card designs", link: "/marriage-card-designs" },
          { title: "Hoarding/billboard designs", link: "/hoarding-billboard-designs" },
          { title: "Illustrations", link: "/illustrations" },
          { title: "Branding", link: "/branding" },
          {
            heading: "Video Editing",
            title: "",
            link: ""
          },
          { title: "Reel Videos", link: "/reel-videos" },
          { title: "Model Shoot Videos", link: "/model-shoot-videos" },
          { title: "RealEstate Drone Shots", link: "/realestate-drone-shots" },
          { title: "Custom Videos", link: "/custom-videos" },




        ]
      },
    
    ],

  },
  // products
  {
    id: 4,
    hasDropdown: true,
    active: true,
    children: true,
    title: "Products",
    pluseIncon: true,
    smallMenu: true,
    link: "#",
    submenus: [
      {
        title: "Portfolio Grid",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "SAAS WEBSITE BUILDER", link: "" },
          { title: "SAAS LEAD MANAGEMENT CRM", link: "" },
          { title: "SAAS INVOICE GENERATOR", link: "" },
        ]
      },
    ],
  },
  // portfolio
  {
    id: 5,
    active: true,
    title: "Portfolio",
    link: "#",
  },
  // Clients
  {
    id: 6,
    active: true,
    title: "Clients",
    link: "#",
  },
  // Careers
  {
    id: 7,
    active: true,
    title: "Careers",
    link: "#",
  },
  // Blog
  {
    id: 8,
    active: true,
    title: "Blog",
    link: "",
  },

  // Contact us
  {
    id: 9,
    active: true,
    title: "Contact",
    link: "/contact",
  }
];
export default headerMenuData;

