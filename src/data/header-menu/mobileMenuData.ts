import menuThumb from "../../../public/assets/img/menu/menu-1.png";
import { StaticImageData } from "next/image";

// Define types for our menu data
interface MenuLink {
    title: string;
    link: string;
    badge?: string;
}

interface SubMenuItem extends MenuLink {
    submenu?: MenuLink[];
}

interface MenuColumn {
    title: string;
    links: MenuLink[];
}

interface MenuItem {
    id: number;
    title: string;
    link: string;
    megaMenu: boolean;
    columns?: MenuColumn[];
    submenu?: SubMenuItem[];
    image?: {
        src: StaticImageData;
        alt: string;
    };
}

// Menu data structure
const mobileMenuData: MenuItem[] = [
    { id: 1, title: "Home", link: "/", megaMenu: false },
    { id: 2, title: "About Us", link: "/commingsoon", megaMenu: false },

    {
        id: 3,
        title: "Services",
        link: "/commingsoon",
        megaMenu: true,
        columns: [
            {
                title: "Web Development",
                links: [
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
                links: [
                    { title: "Android Application", link: "/commingsoon" },
                    { title: "IOS Application", link: "/commingsoon" },
                    { title: "React Native", link: "/commingsoon" },
                    { title: "Flutter App Development", link: "/commingsoon" },
                ]
            },
            {
                title: "Digital Marketing",
                links: [
                    { title: "Search Engine Optimization", link: "/commingsoon" },
                    { title: "Search Engine Marketing", link: "/commingsoon" },
                    { title: "Social Media Marketing", link: "/commingsoon" },
                    { title: "SMS Marketing", link: "/commingsoon" },
                    { title: "Facebook Marketing", link: "/commingsoon" },
                    { title: "Content Marketing", link: "/commingsoon" },
                    { title: "On-Page Optimization", link: "/commingsoon" },
                    { title: "Off-Page Optimization", link: "/commingsoon" },
                    { title: "Technical SEO", link: "/commingsoon" },
                    { title: "Branding", link: "/commingsoon" }
                ]
            },
            {
                title: "Social Media Marketing",
                links: [
                    { title: "Facebook Marketing", link: "/commingsoon" },
                    { title: "Instagram Marketing", link: "/commingsoon" },
                    { title: "Youtube Marketing", link: "/commingsoon" },
                    { title: "LinkedIn Marketing", link: "/commingsoon" },
                    { title: "Twitter Marketing", link: "/commingsoon" },
                    { title: "Social Media Advertising", link: "/commingsoon" },
                    { title: "Social Media Post Scheduling", link: "/commingsoon" }
                ]
            },
            {
                title: "Local SEO",
                links: [
                    { title: "Google My Business Ranking", link: "/commingsoon" },
                    { title: "Local Directory Listings", link: "/commingsoon" },
                    { title: "Local SEO Tools", link: "/commingsoon" }
                ]
            },
            {
                title: "Pay-Per-Click (PPC)",
                links: [
                    { title: "Google Ads", link: "/commingsoon" },
                    { title: "Facebook Ads", link: "/commingsoon" },
                    { title: "Display Advertising", link: "/commingsoon" },
                    { title: "Remarketing Campaigns", link: "/commingsoon" }
                ]
            },
            {
                title: "Graphic Designing",
                links: [
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
                    { title: "CSR Report design", link: "/commingsoon" },
                    { title: "Strategy Report Design", link: "/commingsoon" },
                    { title: "Catalogue Designs", link: "/commingsoon" },
                    { title: "Menu Designs", link: "/commingsoon" },
                    { title: "Marriage Card designs", link: "/commingsoon" },
                    { title: "Hoarding/billboard designs", link: "/commingsoon" },
                    { title: "Illustrations", link: "/commingsoon" },
                    { title: "Branding", link: "/commingsoon" }
                ]
            },
            {
                title: "Video Editing",
                links: [
                    { title: "Reel Videos", link: "/commingsoon" },
                    { title: "Model Shoot Videos", link: "/commingsoon" },
                    { title: "RealEstate Drone Shots", link: "/commingsoon" },
                    { title: "Custom Videos", link: "/commingsoon" }
                ]
            },
            {
                title: "Software Development",
                links: [
                    { title: "Software Development", link: "/commingsoon" },
                    { title: "AI Automations", link: "/commingsoon" }
                ]
            },
        ],
        image: { src: menuThumb, alt: "menu thumb" }
    },

    {
        id: 4,
        title: "Products",
        link: "/commingsoon",
        megaMenu: true,
        columns: [
            {
                title: "Web Development",
                links: [
                    { title: "SAAS WEBSITE BUILDER", link: "/commingsoon" },
                    { title: "SAAS LEAD MANAGEMENT CRM", link: "/commingsoon" },
                    { title: "SAAS INVOICE GENERATOR", link: "/commingsoon" },
                ]
            },
        ],
        image: { src: menuThumb, alt: "menu thumb" }
    },

    { id: 5, title: "Portfolio", link: "/commingsoon", megaMenu: false },
    { id: 6, title: "Careers", link: "/commingsoon", megaMenu: false },
    { id: 7, title: "Clients", link: "/commingsoon", megaMenu: false },
    { id: 8, title: "Blog", link: "/commingsoon", megaMenu: false },
    { id: 9, title: "Contact", link: "/commingsoon", megaMenu: false }
];

export default mobileMenuData;