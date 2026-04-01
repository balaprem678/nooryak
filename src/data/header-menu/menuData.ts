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
    link: "/commingsoon",

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
    link: "/commingsoon",
    submenus: [
      {
        title: "Web Development",
        megaMenu: [
          { title: "Web Developer", link: "/commingsoon" },
          { title: "Website Development", link: "/commingsoon" },
          { title: "WordPress Website", link: "/commingsoon" },
          { title: "Ecommerce Website", link: "/commingsoon" },
          { title: "Shopify Website", link: "/commingsoon" },
          { title: "WooCommerce Website", link: "/commingsoon" },
          { title: "PHP Web Development", link: "/commingsoon" },
          { title: "React Web Development", link: "/commingsoon" },
          { title: "Ecommerce Development", link: "/commingsoon" },
          { title: "Shopify Development", link: "/commingsoon" },
          { title: "Custom Website Development", link: "/commingsoon" },
          { title: "Website Design and Development", link: "/commingsoon" }
        ]
      },
      {
        title: "App Development",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Android Application", link: "/commingsoon" },
          { title: "IOS Application", link: "/commingsoon" },
          { title: "React Native", link: "/commingsoon" },
          { title: "Flutter App Development", link: "/commingsoon" },
          {
            heading: "Pay-Per-Click (PPC)",
            title: "",
            link: ""
          },
          { title: "Google Ads", link: "/commingsoon" },
          { title: "Facebook Ads", link: "/commingsoon" },
          { title: "Display Advertising", link: "/commingsoon" },
          { title: "Remarketing Campaigns", link: "/commingsoon" },

          {
            heading: "Software Development",
            title: "",
            link: ""
          },
          { title: "Software Development", link: "/commingsoon" },
          { title: "AI Automations", link: "/commingsoon" },
        ]
      },
      {
        title: "Digital Marketing",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Search Engine Optimization", link: "/commingsoon" },
          { title: "Search Engine Marketing", link: "/commingsoon" },
          { title: "Social Media Marketing", link: "/commingsoon" },
          { title: "SMS Marketing", link: "/commingsoon" },
          { title: "Facebook Marketing", link: "/fcommingsoon" },
          { title: "Content Marketing", link: "/commingsoon" },
          { title: "On-Page Optimization", link: "/commingsoon" },
          { title: "Off-Page Optimization", link: "/commingsoon" },
          { title: "Technical SEO", link: "/commingsoon" },
          { title: "Branding", link: "/commingsoon" },



        ]
      },
      {
        title: "Social Media Marketing",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Facebook Marketing", link: "/commingsoon" },
          { title: "Instagram Marketing", link: "/commingsoon" },
          { title: "Youtube Marketing", link: "/commingsoon" },
          { title: "LinkedIn Marketing", link: "/commingsoon" },
          { title: "Twitter Marketing", link: "/commingsoon" },
          { title: "Social Media Advertising", link: "/commingsoon" },
          { title: "Social Media Post Scheduling", link: "/commingsoon" },

          {
            heading: "Local SEO",
            title: "",
            link: ""
          },
          { title: "Google My Business Ranking", link: "/commingsoon" },
          { title: "Local Directory Listings", link: "/commingsoon" },
          { title: "Local SEO Tools", link: "/commingsoon" },
        ]
      },

      {
        title: "Graphic Designing",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Logo Designs", link: "/commingsoon" },
          { title: "Package Designs", link: "/commingsoon" },
          { title: "Social Media Designs", link: "/commingsoon" },
          { title: "Brochure Designs", link: "/commingsoon" },
          { title: "Pamphlet Designs", link: "/commingsoon" },
          { title: "Website Banners", link: "/commingsoon" },
          { title: "Banner Designs", link: "/commingsoon" },
          { title: "2D & 3D Designs", link: "/commingsoon" },
          { title: "Standee Designs", link: "/commingsoon" },
          { title: "Creative Business Card designs", link: "/commingsoon" },
          { title: "Annual report design", link: "/commingsoon" },
          { title: "End to End Event designs", link: "/commingsoon" },
          { title: "CSR Report design", link: "/commingsoon" }
        ]
      },
      {
        title: "",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Strategy Report Design", link: "/commingsoon" },
          { title: "Catalogue Designs", link: "/commingsoon" },
          { title: "Menu Designs", link: "/commingsoon" },
          { title: "Marriage Card designs", link: "/commingsoon" },
          { title: "Hoarding/billboard designs", link: "/commingsoon" },
          { title: "Illustrations", link: "/commingsoon" },
          { title: "Branding", link: "/commingsoon" },

          {
            heading: "Video Editing",
            title: "",
            link: ""
          },

          { title: "Reel Videos", link: "/commingsoon" },
          { title: "Model Shoot Videos", link: "/commingsoon" },
          { title: "RealEstate Drone Shots", link: "/commingsoon" },
          { title: "Custom Videos", link: "/commingsoon" }
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
          { title: "SAAS WEBSITE BUILDER", link: "/commingsoon" },
          { title: "SAAS LEAD MANAGEMENT CRM", link: "/commingsoon" },
          { title: "SAAS INVOICE GENERATOR", link: "/commingsoon" }
        ]
      },
    ],
  },
  // portfolio
  {
    id: 5,
    active: true,
    title: "Portfolio",
    link: "/commingsoon",
  },
  // Clients
  {
    id: 6,
    active: true,
    title: "Clients",
    link: "/commingsoon",
  },
  // Careers
  {
    id: 7,
    active: true,
    title: "Careers",
    link: "/commingsoon",
  },
  // Blog
  {
    id: 8,
    active: true,
    title: "Blog",
    link: "/commingsoon",
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

