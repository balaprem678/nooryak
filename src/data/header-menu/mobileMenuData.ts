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
    {
        id: 1,
        title: "Home",
        link: "/",
        megaMenu: false,
    },
    {
        id: 2,
        title: "About Us",
        link: "#",
        megaMenu: false,
    },
    {
        id: 3,
        title: "Services",
        link: "",
        megaMenu: true,
        columns: [
            {
                title: "Web Development",
                links: [
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
                links: [
                    { title: "Android Application", link: "/android-application" },
                    { title: "IOS Application", link: "/ios-application" },
                    { title: "React Native", link: "/react-native" },
                    { title: "Flutter App Development", link: "/flutter-app-development" },
                ]
            },
            {
                title: "Digital Marketing",
                links: [
                    { title: "Search Engine Optimization", link: "/search-engine-optimization" },
                    { title: "Search Engine Marketing", link: "/search-engine-marketing" },
                    { title: "Social Media Marketing", link: "/social-media-marketing" },
                    { title: "SMS Marketing", link: "/sms-marketing" },
                    { title: "Facebook Marketing", link: "/facebook-marketing" },
                    { title: "Content Marketing", link: "/content-marketing" },
                    { title: "On-Page Optimization", link: "/on-page-optimization" },
                    { title: "Off-Page Optimization", link: "/off-page-optimization" },
                    { title: "Technical SEO", link: "/technical-seo" },
                    { title: "Branding", link: "/branding" }
                ]
            },
            {
                title: "Social Media Marketing",
                links: [
                    { title: "Facebook Marketing", link: "/facebook-marketing" },
                    { title: "Instagram Marketing", link: "/instagram-marketing" },
                    { title: "Youtube Marketing", link: "/youtube-marketing" },
                    { title: "LinkedIn Marketing", link: "/linkedin-marketing" },
                    { title: "Twitter Marketing", link: "/twitter-marketing" },
                    { title: "Social Media Advertising", link: "/social-media-advertising" },
                    { title: "Social Media Post Scheduling", link: "/social-media-post-scheduling" }
                ]
            },
            {
                title: "Local SEO",
                links: [
                    { title: "Google My Business Ranking", link: "/google-my-business-ranking" },
                    { title: "Local Directory Listings", link: "/local-directory-listings" },
                    { title: "Local SEO Tools", link: "/local-seo-tools" }
                ]
            },
            {
                title: "Pay-Per-Click (PPC)",
                links: [
                    { title: "Google Ads", link: "/google-ads" },
                    { title: "Facebook Ads", link: "/facebook-ads" },
                    { title: "Display Advertising", link: "/display-advertising" },
                    { title: "Remarketing Campaigns", link: "/remarketing-campaigns" }
                ]
            },
            {
                title: "Graphic Designing",
                links: [
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
                    { title: "Strategy Report Design", link: "/strategy-report-design" },
                    { title: "Catalogue Designs", link: "/catalogue-designs" },
                    { title: "Menu Designs", link: "/menu-designs" },
                    { title: "Marriage Card designs", link: "/marriage-card-designs" },
                    { title: "Hoarding/billboard designs", link: "/hoarding-billboard-designs" },
                    { title: "Illustrations", link: "/illustrations" },
                    { title: "Branding", link: "/branding" }
                ]
            },
            {
                title: "Video Editing",
                links: [
                    { title: "Reel Videos", link: "/reel-videos" },
                    { title: "Model Shoot Videos", link: "/model-shoot-videos" },
                    { title: "RealEstate Drone Shots", link: "/realestate-drone-shots" },
                    { title: "Custom Videos", link: "/custom-videos" }
                ]
            },
            {
                title: "Software Development",
                links: [
                    { title: "Software Development", link: "/software-development" },
                ]
            },
            {
                title: "AI Automations",
                links: [
                    { title: "AI Automations", link: "/ai-automations" }
                ]
            },
        ],
        image: {
            src: menuThumb,
            alt: "menu thumb"
        }
    },
    {
        id: 4,
        title: "Products",
        link: "",
        megaMenu: true,
        columns: [
            {
                title: "Web Development",
                links: [
                    { title: "SAAS WEBSITE BUILDER", link: "" },
                    { title: "SAAS LEAD MANAGEMENT CRM", link: "" },
                    { title: "SAAS INVOICE GENERATOR", link: "" },
                ]
            },

        ],
        image: {
            src: menuThumb,
            alt: "menu thumb"
        }
    },
    {
        id: 5,
        title: "Portfolio",
        link: "",
        megaMenu: false,
    },
    {
        id: 6,
        title: "Careers",
        link: "",
        megaMenu: false,
    },
    {
        id: 7,
        title: "Clients",
        link: "",
        megaMenu: false,
    },
    {
        id: 8,
        title: "Blog",
        link: "",
        megaMenu: false,
    },
    {
        id: 9,
        title: "Contact",
        link: "",
        megaMenu: false,
    }
];

export default mobileMenuData;
