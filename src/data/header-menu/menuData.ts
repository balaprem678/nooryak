import { MenuItem } from "@/types/menu-d-t";

const headerMenuData: MenuItem[] = [
  // home
  {
    id: 1,
    active: true,
    title: "Home",
    link: "/",
  },
  // aboutus
  {
    id: 2,
    active: true,
    title: "About Us",
    link: "/about",
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
    link: "/404",
    submenus: [
      {
        title: "Web Development",
        megaMenu: [
          { title: "Web Developer", link: "/404" },
          { title: "Website Development", link: "/404" },
          { title: "WordPress Website", link: "/404" },
          { title: "Ecommerce Website", link: "/404" },
          { title: "Shopify Website", link: "/404" },
          { title: "WooCommerce Website", link: "/404" },
          { title: "PHP Web Development", link: "/404" },
          { title: "React Web Development", link: "/404" },
          { title: "Ecommerce Development", link: "/404" },
          { title: "Shopify Development", link: "/404" },
          { title: "Custom Website Development", link: "/404" },
          { title: "Website Design and Development", link: "/404" }
        ]
      },
      {
        title: "App Development",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Android Application", link: "/404" },
          { title: "IOS Application", link: "/404" },
          { title: "React Native", link: "/404" },
          { title: "Flutter App Development", link: "/404" },
          {
            heading: "Pay-Per-Click (PPC)",
            title: "",
            link: ""
          },
          { title: "Google Ads", link: "/404" },
          { title: "Facebook Ads", link: "/404" },
          { title: "Display Advertising", link: "/404" },
          { title: "Remarketing Campaigns", link: "/404" },

          {
            heading: "Software Development",
            title: "",
            link: ""
          },
          { title: "Software Development", link: "/404" },
          { title: "AI Automations", link: "/404" },
        ]
      },
      {
        title: "Digital Marketing",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Search Engine Optimization", link: "/404" },
          { title: "Search Engine Marketing", link: "/404" },
          { title: "Social Media Marketing", link: "/404" },
          { title: "SMS Marketing", link: "/404" },
          { title: "Facebook Marketing", link: "/f404" },
          { title: "Content Marketing", link: "/404" },
          { title: "On-Page Optimization", link: "/404" },
          { title: "Off-Page Optimization", link: "/404" },
          { title: "Technical SEO", link: "/404" },
          { title: "Branding", link: "/404" },



        ]
      },
      {
        title: "Social Media Marketing",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Facebook Marketing", link: "/404" },
          { title: "Instagram Marketing", link: "/404" },
          { title: "Youtube Marketing", link: "/404" },
          { title: "LinkedIn Marketing", link: "/404" },
          { title: "Twitter Marketing", link: "/404" },
          { title: "Social Media Advertising", link: "/404" },
          { title: "Social Media Post Scheduling", link: "/404" },

          {
            heading: "Local SEO",
            title: "",
            link: ""
          },
          { title: "Google My Business Ranking", link: "/404" },
          { title: "Local Directory Listings", link: "/404" },
          { title: "Local SEO Tools", link: "/404" },
        ]
      },

      {
        title: "Graphic Designing",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Logo Designs", link: "/404" },
          { title: "Package Designs", link: "/404" },
          { title: "Social Media Designs", link: "/404" },
          { title: "Brochure Designs", link: "/404" },
          { title: "Pamphlet Designs", link: "/404" },
          { title: "Website Banners", link: "/404" },
          { title: "Banner Designs", link: "/404" },
          { title: "2D & 3D Designs", link: "/404" },
          { title: "Standee Designs", link: "/404" },
          { title: "Creative Business Card designs", link: "/404" },
          { title: "Annual report design", link: "/404" },
          { title: "End to End Event designs", link: "/404" },
          { title: "CSR Report design", link: "/404" }
        ]
      },
      {
        title: "",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Strategy Report Design", link: "/404" },
          { title: "Catalogue Designs", link: "/404" },
          { title: "Menu Designs", link: "/404" },
          { title: "Marriage Card designs", link: "/404" },
          { title: "Hoarding/billboard designs", link: "/404" },
          { title: "Illustrations", link: "/404" },
          { title: "Branding", link: "/404" },

          {
            heading: "Video Editing",
            title: "",
            link: ""
          },

          { title: "Reel Videos", link: "/404" },
          { title: "Model Shoot Videos", link: "/404" },
          { title: "RealEstate Drone Shots", link: "/404" },
          { title: "Custom Videos", link: "/404" }
        ]
      },

    ],

  },
  // products
  {
    id: 10,
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
          { title: "SAAS WEBSITE BUILDER", link: "/404" },
          { title: "SAAS LEAD MANAGEMENT CRM", link: "/404" },
          { title: "SAAS INVOICE GENERATOR", link: "/404" }
        ]
      },
    ],
  },
  // portfolio
  {
    id: 5,
    active: true,
    title: "Portfolio",
    link: "/404",
  },
  // Clients
  {
    id: 6,
    active: true,
    title: "Clients",
    link: "/404",
  },
  // Careers
  {
    id: 7,
    active: true,
    title: "Careers",
    link: "/404",
  },
  // Blog
  {
    id: 8,
    active: true,
    title: "Blog",
    link: "/blog",
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

