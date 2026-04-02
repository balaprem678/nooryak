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
    { id: 2, title: "About Us", link: "/404", megaMenu: false },

    {
        id: 3,
        title: "Services",
        link: "/404",
        megaMenu: true,
        columns: [
            {
                title: "Web Development",
                links: [
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
                links: [
                    { title: "Android Application", link: "/404" },
                    { title: "IOS Application", link: "/404" },
                    { title: "React Native", link: "/404" },
                    { title: "Flutter App Development", link: "/404" },
                ]
            },
            {
                title: "Digital Marketing",
                links: [
                    { title: "Search Engine Optimization", link: "/404" },
                    { title: "Search Engine Marketing", link: "/404" },
                    { title: "Social Media Marketing", link: "/404" },
                    { title: "SMS Marketing", link: "/404" },
                    { title: "Facebook Marketing", link: "/404" },
                    { title: "Content Marketing", link: "/404" },
                    { title: "On-Page Optimization", link: "/404" },
                    { title: "Off-Page Optimization", link: "/404" },
                    { title: "Technical SEO", link: "/404" },
                    { title: "Branding", link: "/404" }
                ]
            },
            {
                title: "Social Media Marketing",
                links: [
                    { title: "Facebook Marketing", link: "/404" },
                    { title: "Instagram Marketing", link: "/404" },
                    { title: "Youtube Marketing", link: "/404" },
                    { title: "LinkedIn Marketing", link: "/404" },
                    { title: "Twitter Marketing", link: "/404" },
                    { title: "Social Media Advertising", link: "/404" },
                    { title: "Social Media Post Scheduling", link: "/404" }
                ]
            },
            {
                title: "Local SEO",
                links: [
                    { title: "Google My Business Ranking", link: "/404" },
                    { title: "Local Directory Listings", link: "/404" },
                    { title: "Local SEO Tools", link: "/404" }
                ]
            },
            {
                title: "Pay-Per-Click (PPC)",
                links: [
                    { title: "Google Ads", link: "/404" },
                    { title: "Facebook Ads", link: "/404" },
                    { title: "Display Advertising", link: "/404" },
                    { title: "Remarketing Campaigns", link: "/404" }
                ]
            },
            {
                title: "Graphic Designing",
                links: [
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
                    { title: "CSR Report design", link: "/404" },
                    { title: "Strategy Report Design", link: "/404" },
                    { title: "Catalogue Designs", link: "/404" },
                    { title: "Menu Designs", link: "/404" },
                    { title: "Marriage Card designs", link: "/404" },
                    { title: "Hoarding/billboard designs", link: "/404" },
                    { title: "Illustrations", link: "/404" },
                    { title: "Branding", link: "/404" }
                ]
            },
            {
                title: "Video Editing",
                links: [
                    { title: "Reel Videos", link: "/404" },
                    { title: "Model Shoot Videos", link: "/404" },
                    { title: "RealEstate Drone Shots", link: "/404" },
                    { title: "Custom Videos", link: "/404" }
                ]
            },
            {
                title: "Software Development",
                links: [
                    { title: "Software Development", link: "/404" },
                    { title: "AI Automations", link: "/404" }
                ]
            },
        ],
        image: { src: menuThumb, alt: "menu thumb" }
    },

    {
        id: 4,
        title: "Products",
        link: "/404",
        megaMenu: true,
        columns: [
            {
                title: "",
                links: [
                    { title: "SAAS WEBSITE BUILDER", link: "/404" },
                    { title: "SAAS LEAD MANAGEMENT CRM", link: "/404" },
                    { title: "SAAS INVOICE GENERATOR", link: "/404" },
                ]
            },
        ],

        image: { src: menuThumb, alt: "menu thumb" }
    },

    { id: 5, title: "Portfolio", link: "/404", megaMenu: false },
    { id: 6, title: "Careers", link: "/404", megaMenu: false },
    { id: 7, title: "Clients", link: "/404", megaMenu: false },
    { id: 8, title: "Blog", link: "/404", megaMenu: false },
    { id: 9, title: "Contact", link: "/404", megaMenu: false }
];

export default mobileMenuData;