// Define menu data
interface MenuItem {
    title: string;
    href: string;
    subItems?: MenuItem[];
    static?: boolean
};

const menuItemsTwo: MenuItem[] = [
    {
        title: "Home",
        href: "#",
    },
    {
        title: "About Us",
        href: "#",
    },
    {
        title: "Services",
        href: "#",
        static: true,
        subItems: [
            { title: "About Me", href: "/about-me-light" },
            { title: "About Us", href: "/about-us-light" },
            { title: "Services", href: "/service-1-light" },
            { title: "Service Details", href: "/service-details-2-light" },
            { title: "Carrer", href: "/career-light" },
            { title: "Carrer Details", href: "/career-details-light" },
            { title: "Team", href: "/team-light" },
            { title: "Team Details", href: "/team-details-light" },
            { title: "Pricing", href: "/pricing-light" },
            { title: "Faq's", href: "/faq-light" },
        ],
    },
    {
        title: "Projects",
        href: "#",
        static: true,
        subItems: [
            { title: "Webgl Showcase", href: "/portfolio-webgl-showcase" },
            { title: "Coverflow Slider", href: "/portfolio-coverflow-slider-light" },
            { title: "Creative Thumb Slider", href: "/portfolio-creative-thumb-slider" },
            { title: "Creative Skew Slider", href: "/portfolio-creative-skew-slider" },
            { title: "Creative Text Slider", href: "/portfolio-creative-text-slider" },
            { title: "Parallax Slider", href: "/portfolio-parallax-slider" },
            { title: "Paspective Showcase", href: "/portfolio-perspective-slider-light" },
        ],
    },
    {
        title: "Blog",
        href: "#",
        static: false,
        subItems: [
            { title: "Blog Grid", href: "/blog-grid-light" },
            { title: "Blog Classic", href: "/blog-standard-light" },
            { title: "Blog Listing", href: "/blog-list-light" },
            { title: "Masonry", href: "/blog-masonry-light" },
            { title: "Blog Single Post", href: "/blog-details-light" },
        ],
    },
    {
        title: "Shop",
        href: "#",
        static: false,
        subItems: [
            { title: "Shop Modern", href: "/shop-modern-light" },
            { title: "Shop Details", href: "/shop-details" },
            { title: "My Account", href: "/my-account" },
            { title: "Cart", href: "/cart" },
            { title: "Checkout", href: "/checkout" },
            { title: "Wishlist", href: "/wishlist" },
            { title: "LogIn", href: "/login" },
        ],
    },
    {
        title: "Contact",
        href: "#",
        static: false,
        subItems: [
            { title: "Contact Me", href: "/contact-me-light" },
            { title: "Contact Us", href: "/contact-us-light" },
            { title: "Get In Touch", href: "/contact" },
        ],
    },
];

export default menuItemsTwo;




// interface MegaMenuItem {
//     title?: string;
//     link?: string;
//     heading?: string;
// }

// interface Submenu {
//     title: string;
//     link?: string;
//     megaMenu?: MegaMenuItem[];
// }

// interface MenuItem {
//     id: number;
//     title: string;
//     href: string;
//     submenus?: Submenu[];
// }

// /* ================= MENU DATA ================= */

// const MenuItemtwo: MenuItem[] = [
//     {
//         id: 1,
//         title: "Home",
//         href: "#",
//     },
//     {
//         id: 2,
//         title: "Services",
//         href: "#",
//         submenus: [
//             {
//                 title: "Web Development",
//                 megaMenu: [
//                     { title: "Web Developer", link: "/web-developer" },
//                     { title: "Website Development", link: "/website-development" },
//                     { title: "WordPress Website", link: "/wordpress-website" },
//                     { title: "Ecommerce Website", link: "/ecommerce-website" },
//                     { title: "Shopify Website", link: "/shopify-website" },
//                     { title: "WooCommerce Website", link: "/woocommerce-website" },
//                 ],
//             },
//             {
//                 title: "App Development",
//                 megaMenu: [
//                     { title: "Android Application", link: "/android-application" },
//                     { title: "IOS Application", link: "/ios-application" },
//                     { title: "React Native", link: "/react-native" },
//                     { title: "Flutter App Development", link: "/flutter-app-development" },
//                 ],
//             },
//             {
//                 title: "Digital Marketing",
//                 megaMenu: [
//                     { title: "Search Engine Optimization", link: "/search-engine-optimization" },
//                     { title: "Search Engine Marketing", link: "/search-engine-marketing" },
//                     { title: "Social Media Marketing", link: "/social-media-marketing" },
//                     { title: "Content Marketing", link: "/content-marketing" },
//                 ],
//             },
//             {
//                 title: "Local SEO",
//                 megaMenu: [
//                     { heading: "Local SEO" },
//                     { title: "Google My Business Ranking", link: "/google-my-business-ranking" },
//                     { title: "Local Directory Listings", link: "/local-directory-listings" },
//                     { title: "Local SEO Tools", link: "/local-seo-tools" },
//                 ],
//             },
//             {
//                 title: "PPC",
//                 megaMenu: [
//                     { title: "Google Ads", link: "/google-ads" },
//                     { title: "Facebook Ads", link: "/facebook-ads" },
//                 ],
//             },
//             {
//                 title: "Designing",
//                 megaMenu: [
//                     { title: "Logo Designs", link: "/logo-designs" },
//                     { title: "Banner Designs", link: "/banner-designs" },
//                     { title: "Branding", link: "/branding" },
//                 ],
//             },
//             {
//                 title: "Video Editing",
//                 megaMenu: [
//                     { title: "Reel Videos", link: "/reel-videos" },
//                     { title: "Drone Shots", link: "/realestate-drone-shots" },
//                 ],
//             },
//             {
//                 title: "Software Development",
//                 link: "/software-development",
//             },
//             {
//                 title: "AI Automations",
//                 link: "/ai-automations",
//             },
//         ],
//     },
// ];

