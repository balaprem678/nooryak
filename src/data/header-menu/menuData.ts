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
    link: "/notfound",

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
    link: "/notfound",
    submenus: [
      {
        title: "Web Development",
        megaMenu: [
          { title: "Web Developer", link: "/notfound" },
          { title: "Website Development", link: "/notfound" },
          { title: "WordPress Website", link: "/notfound" },
          { title: "Ecommerce Website", link: "/notfound" },
          { title: "Shopify Website", link: "/notfound" },
          { title: "WooCommerce Website", link: "/notfound" },
          { title: "PHP Web Development", link: "/notfound" },
          { title: "React Web Development", link: "/notfound" },
          { title: "Ecommerce Development", link: "/notfound" },
          { title: "Shopify Development", link: "/notfound" },
          { title: "Custom Website Development", link: "/notfound" },
          { title: "Website Design and Development", link: "/notfound" }
        ]
      },
      {
        title: "App Development",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Android Application", link: "/notfound" },
          { title: "IOS Application", link: "/notfound" },
          { title: "React Native", link: "/notfound" },
          { title: "Flutter App Development", link: "/notfound" },
          {
            heading: "Pay-Per-Click (PPC)",
            title: "",
            link: ""
          },
          { title: "Google Ads", link: "/notfound" },
          { title: "Facebook Ads", link: "/notfound" },
          { title: "Display Advertising", link: "/notfound" },
          { title: "Remarketing Campaigns", link: "/notfound" },

          {
            heading: "Software Development",
            title: "",
            link: ""
          },
          { title: "Software Development", link: "/notfound" },
          { title: "AI Automations", link: "/notfound" },
        ]
      },
      {
        title: "Digital Marketing",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Search Engine Optimization", link: "/notfound" },
          { title: "Search Engine Marketing", link: "/notfound" },
          { title: "Social Media Marketing", link: "/notfound" },
          { title: "SMS Marketing", link: "/notfound" },
          { title: "Facebook Marketing", link: "/fnotfound" },
          { title: "Content Marketing", link: "/notfound" },
          { title: "On-Page Optimization", link: "/notfound" },
          { title: "Off-Page Optimization", link: "/notfound" },
          { title: "Technical SEO", link: "/notfound" },
          { title: "Branding", link: "/notfound" },



        ]
      },
      {
        title: "Social Media Marketing",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Facebook Marketing", link: "/notfound" },
          { title: "Instagram Marketing", link: "/notfound" },
          { title: "Youtube Marketing", link: "/notfound" },
          { title: "LinkedIn Marketing", link: "/notfound" },
          { title: "Twitter Marketing", link: "/notfound" },
          { title: "Social Media Advertising", link: "/notfound" },
          { title: "Social Media Post Scheduling", link: "/notfound" },

          {
            heading: "Local SEO",
            title: "",
            link: ""
          },
          { title: "Google My Business Ranking", link: "/notfound" },
          { title: "Local Directory Listings", link: "/notfound" },
          { title: "Local SEO Tools", link: "/notfound" },
        ]
      },

      {
        title: "Graphic Designing",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Logo Designs", link: "/notfound" },
          { title: "Package Designs", link: "/notfound" },
          { title: "Social Media Designs", link: "/notfound" },
          { title: "Brochure Designs", link: "/notfound" },
          { title: "Pamphlet Designs", link: "/notfound" },
          { title: "Website Banners", link: "/notfound" },
          { title: "Banner Designs", link: "/notfound" },
          { title: "2D & 3D Designs", link: "/notfound" },
          { title: "Standee Designs", link: "/notfound" },
          { title: "Creative Business Card designs", link: "/notfound" },
          { title: "Annual report design", link: "/notfound" },
          { title: "End to End Event designs", link: "/notfound" },
          { title: "CSR Report design", link: "/notfound" }
        ]
      },
      {
        title: "",
        link: "#",
        pluseIncon: true,
        megaMenu: [
          { title: "Strategy Report Design", link: "/notfound" },
          { title: "Catalogue Designs", link: "/notfound" },
          { title: "Menu Designs", link: "/notfound" },
          { title: "Marriage Card designs", link: "/notfound" },
          { title: "Hoarding/billboard designs", link: "/notfound" },
          { title: "Illustrations", link: "/notfound" },
          { title: "Branding", link: "/notfound" },

          {
            heading: "Video Editing",
            title: "",
            link: ""
          },

          { title: "Reel Videos", link: "/notfound" },
          { title: "Model Shoot Videos", link: "/notfound" },
          { title: "RealEstate Drone Shots", link: "/notfound" },
          { title: "Custom Videos", link: "/notfound" }
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
          { title: "SAAS WEBSITE BUILDER", link: "/notfound" },
          { title: "SAAS LEAD MANAGEMENT CRM", link: "/notfound" },
          { title: "SAAS INVOICE GENERATOR", link: "/notfound" }
        ]
      },
    ],
  },
  // portfolio
  {
    id: 5,
    active: true,
    title: "Portfolio",
    link: "/notfound",
  },
  // Clients
  {
    id: 6,
    active: true,
    title: "Clients",
    link: "/notfound",
  },
  // Careers
  {
    id: 7,
    active: true,
    title: "Careers",
    link: "/notfound",
  },
  // Blog
  {
    id: 8,
    active: true,
    title: "Blog",
    link: "/notfound",
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

