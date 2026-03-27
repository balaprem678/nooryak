// "use client";
// import headerMenuData from "@/data/header-menu/menuData";
// import ThemeLink from "@/components/ThemeLink";
// import { Submenu } from "@/types/menu-d-t";
// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// export default function NavMenus() {
//   const [hoveredMenu, setHoveredMenu] = useState<number | null>(headerMenuData[0]?.id || null);

//   // Renders nested submenus
//   const renderSubmenu = (submenus: Submenu[] = []) => {
//     return submenus.map((submenu, i) => {
//       if (submenu.submenus) {
//         return (
//           <li key={i} className="menu-item-has-children">
//             <Link href={submenu.link || "#"}>{submenu.title}</Link>
//             <ul className="tp-submenu submenu">
//               {renderSubmenu(submenu.submenus)}
//             </ul>
//           </li>
//         );
//       }

//       return (
//         <li key={i}>
//           <Link href={submenu.link || "#"}>
//             {submenu.title}
//           </Link>
//         </li>
//       );
//     });
//   };

//   // Returns CSS class based on tag like 'Popular', 'Trending', or 'Hot'
//   const getTagClass = (tag: string) => {
//     switch (tag) {
//       case 'Popular': return 'pop';
//       case 'Trending': return 'new';
//       case 'Hot': return 'hot';
//       default: return '';
//     }
//   };

//   return (
//     <ul>
//       {headerMenuData.map((menu) => (
//         <li
//           key={menu.id}
//           className={`has-dropdown ${menu.megaMenu || menu.smallMenu || menu.mediumMenu ? "p-static active" : ""
//             } ${hoveredMenu === menu.id ? 'active' : ''}`}

//           onMouseEnter={() => setHoveredMenu(menu.id)}
//           onMouseLeave={() => setHoveredMenu(null)}
//         >
//           <Link href={menu.link}>
//             {menu.title}
//             {menu.pluseIncon && (
//               <span className="dropdown-btn"></span>
//             )}
//           </Link>

//           {menu.megaMenu || menu.smallMenu || menu.mediumMenu ? (
//             <div className={`tp-megamenu-wrapper ${menu.smallMenu ? "megamenu-small" : ""} mega-menu megamenu-white-bg`}>
//               <div className=" gx-0">

//                 {menu.megaMenu &&
//                   menu?.submenus?.map((submenu: Submenu, i: number) => (
//                     <div key={i} className="tp-megamenu-list">
//                       {submenu.title && (
//                         <h4 className="tp-megamenu-title">{submenu.title}</h4>
//                       )}
//                       {submenu.megaMenu && (
//                         <ul>
//                           {submenu.megaMenu.map((item, j) => (
//                             <li key={j}>
//                               <ThemeLink href={item.link}>
//                                 {item.title}
//                                 {item.tag && (
//                                   <span className={getTagClass(item.tag)}>{item.tag}</span>
//                                 )}
//                               </ThemeLink>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </div>
//                   ))}

//                 {menu.smallMenu &&
//                   menu?.submenus?.map((submenu: Submenu, i: number) => (
//                     <div key={i} className="col-xl-4">
//                       <div className="tp-megamenu-list">
//                         {submenu.title && (
//                           <h4 className="tp-megamenu-title">{submenu.title}</h4>
//                         )}
//                         {submenu.megaMenu && (
//                           <ul>
//                             {submenu.megaMenu.map((item, j) => (
//                               <li key={j}>
//                                 <ThemeLink href={item.link}>
//                                   {item.title}
//                                   {item.tag && (
//                                     <span className={getTagClass(item.tag)}>{item.tag}</span>
//                                   )}
//                                 </ThemeLink>
//                               </li>
//                             ))}
//                           </ul>
//                         )}
//                       </div>
//                     </div>
//                   ))}

//               </div>
//             </div>

//           ) : menu.submenus ? (
//             <ul className="tp-submenu submenu">
//               {renderSubmenu(menu.submenus)}
//             </ul>
//           ) : null}
//         </li>
//       ))}
//     </ul>
//   );
// }

// "use client";

// import headerMenuData from "@/data/header-menu/menuData";
// import ThemeLink from "@/components/ThemeLink";
// import { Submenu } from "@/types/menu-d-t";
// import { useState } from "react";
// import Link from "next/link";

// // ✅ ICONS
// import {
//   Globe,
//   Code,
//   ShoppingCart,
//   Smartphone,
//   Search,
//   Megaphone,
//   PenTool,
//   Video,
//   Cpu,
//   Layers,
// } from "lucide-react";

// export default function NavMenus() {
//   const [hoveredMenu, setHoveredMenu] = useState<number | null>(headerMenuData[0]?.id || null);

//   // 🔥 ICON LOGIC
//   const getIcon = (title: string) => {
//     const t = title.toLowerCase();

//     if (t.includes("web") || t.includes("website")) return <Globe size={16} />;
//     if (t.includes("react") || t.includes("php")) return <Code size={16} />;
//     if (t.includes("shop") || t.includes("commerce")) return <ShoppingCart size={16} />;
//     if (t.includes("app") || t.includes("android") || t.includes("ios")) return <Smartphone size={16} />;
//     if (t.includes("seo")) return <Search size={16} />;
//     if (t.includes("marketing") || t.includes("ads")) return <Megaphone size={16} />;
//     if (t.includes("design")) return <PenTool size={16} />;
//     if (t.includes("video")) return <Video size={16} />;
//     if (t.includes("software") || t.includes("ai")) return <Cpu size={16} />;
//     return <Layers size={16} />;
//   };

//   // 🔁 NESTED SUBMENU
//   const renderSubmenu = (submenus: Submenu[] = []) => {
//     return submenus.map((submenu, i) => {
//       if (submenu.submenus) {
//         return (
//           <li key={i} className="menu-item-has-children">
//             <Link href={submenu.link || "#"}>{submenu.title}</Link>
//             <ul className="tp-submenu submenu">
//               {renderSubmenu(submenu.submenus)}
//             </ul>
//           </li>
//         );
//       }

//       return (
//         <li key={i}>
//           <Link href={submenu.link || "#"}>{submenu.title}</Link>
//         </li>
//       );
//     });
//   };

//   // 🏷 TAG STYLE
//   const getTagClass = (tag: string) => {
//     switch (tag) {
//       case "Popular": return "pop";
//       case "Trending": return "new";
//       case "Hot": return "hot";
//       default: return "";
//     }
//   };

//   return (
//     <ul className="main-menu">
//       {headerMenuData.map((menu) => (
//         <li
//           key={menu.id}
//           className={`has-dropdown ${menu.megaMenu || menu.smallMenu || menu.mediumMenu ? "p-static active" : ""} 
//           ${hoveredMenu === menu.id ? "active" : ""}`}
//           onMouseEnter={() => setHoveredMenu(menu.id)}
//           onMouseLeave={() => setHoveredMenu(null)}
//         >
//           <Link href={menu.link}>
//             {menu.title}
//             {menu.pluseIncon && <span className="dropdown-btn"></span>}
//           </Link>

//           {/* ✅ MEGA MENU */}
//           {menu.megaMenu || menu.smallMenu || menu.mediumMenu ? (
//             <div className="tp-megamenu-wrapper mega-menu megamenu-white-bg">
//               <div className="gx-0 row">

//                 {menu?.submenus?.map((submenu: Submenu, i: number) => (
//                   <div key={i} className="col-md-2 tp-megamenu-list">

//                     {submenu.title && (
//                       <h4 className="tp-megamenu-title">{submenu.title}</h4>
//                     )}

//                     {submenu.megaMenu && (
//                       <ul>
//                         {submenu.megaMenu.map((item, j) => (
//                           <li key={j}>
//                             <ThemeLink href={item.link} className="menu-link">

//                               {/* ICON */}
//                               <span className="menu-icon">
//                                 {getIcon(item.title)}
//                               </span>

//                               {/* TEXT */}
//                               <span className="menu-text">
//                                 {item.title}
//                               </span>

//                               {/* TAG */}
//                               {item.tag && (
//                                 <span className={getTagClass(item.tag)}>
//                                   {item.tag}
//                                 </span>
//                               )}

//                             </ThemeLink>
//                           </li>
//                         ))}
//                       </ul>
//                     )}

//                   </div>
//                 ))}

//               </div>
//             </div>

//           ) : menu.submenus ? (
//             <ul className="tp-submenu submenu">
//               {renderSubmenu(menu.submenus)}
//             </ul>
//           ) : null}
//         </li>
//       ))}
//     </ul>
//   );
// }


"use client";

import headerMenuData from "@/data/header-menu/menuData";
import ThemeLink from "@/components/ThemeLink";
import { Submenu } from "@/types/menu-d-t";
import { useState } from "react";
import Link from "next/link";
import "./NavMenus.scss";

import {
  Monitor, Globe, Layout, Settings, Store, ShoppingBag, CreditCard,
  Package, Truck, AppWindow, Code, Database,
  Smartphone, Tablet, Layers, Cpu,
  Search, LineChart, Share2, MessageSquare, BadgeCheck,
  FileText, ClipboardList, Send, Wrench, Rocket,
  MapPin, ListTree,
  Target, Megaphone, Tv, Repeat,
  Camera, PlayCircle, Briefcase, CalendarClock, Activity,
  Film, Aperture, Video, Wand2,
  Brush, Box, Image, File, Newspaper, LayoutGrid, Columns,
  Cuboid, Layers3, IdCard, BarChart4, Lightbulb, FileBadge,
  Focus, BookOpen, MenuSquare, Heart, PenTool,
  BrainCircuit, Cloud
} from "lucide-react";

export default function NavMenus() {
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(
    headerMenuData[0]?.id || null
  );

  // ✅ ICON LOGIC
  const getIcon = (title: string = "") => {
    const t = title.toLowerCase();

    // 🌐 WEB (ALL UNIQUE)
    if (t.includes("web developer")) return <Monitor size={16} />;
    if (t.includes("website development")) return <Globe size={16} />;
    if (t.includes("wordpress")) return <Layout size={16} />;
    if (t.includes("custom website")) return <Settings size={16} />;

    // 🛒 ECOMMERCE (ALL UNIQUE)
    if (t.includes("ecommerce website")) return <Store size={16} />;
    if (t.includes("shopify website")) return <ShoppingBag size={16} />;
    if (t.includes("woocommerce")) return <CreditCard size={16} />;
    if (t.includes("ecommerce development")) return <Package size={16} />;
    if (t.includes("shopify development")) return <Truck size={16} />;

    // 💻 DEVELOPMENT (ALL UNIQUE)
    if (t.includes("react web")) return <AppWindow size={16} />;
    if (t.includes("php")) return <Code size={16} />;
    if (t.includes("software")) return <Database size={16} />;

    // 📱 APP (ALL UNIQUE)
    if (t.includes("android")) return <Smartphone size={16} />;
    if (t.includes("ios")) return <Tablet size={16} />;
    if (t.includes("flutter")) return <Layers size={16} />;
    if (t.includes("react native")) return <Cpu size={16} />;

    // 📊 MARKETING (ALL UNIQUE)
    if (t.includes("search engine optimization")) return <Search size={16} />;
    if (t.includes("search engine marketing")) return <LineChart size={16} />;
    if (t.includes("social media marketing")) return <Share2 size={16} />;
    if (t.includes("sms marketing")) return <MessageSquare size={16} />;
    if (t.includes("facebook marketing")) return <BadgeCheck size={16} />;
    if (t.includes("content marketing")) return <FileText size={16} />;
    if (t.includes("on-page")) return <ClipboardList size={16} />;
    if (t.includes("off-page")) return <Send size={16} />;
    if (t.includes("technical seo")) return <Wrench size={16} />;
    if (t.includes("branding")) return <Rocket size={16} />;

    // 📍 LOCAL SEO (ALL UNIQUE)
    if (t.includes("google my business")) return <MapPin size={16} />;
    if (t.includes("directory")) return <ListTree size={16} />;
    if (t.includes("local seo tools")) return <ListTree size={16} />;

    // 📢 ADS (ALL UNIQUE)
    if (t.includes("google ads")) return <Target size={16} />;
    if (t.includes("facebook ads")) return <Megaphone size={16} />;
    if (t.includes("display advertising")) return <Tv size={16} />;
    if (t.includes("remarketing")) return <Repeat size={16} />;

    // 📱 SOCIAL MEDIA (ALL UNIQUE)
    if (t.includes("instagram")) return <Camera size={16} />;
    if (t.includes("youtube")) return <PlayCircle size={16} />;
    if (t.includes("linkedin")) return <Briefcase size={16} />;
    if (t.includes("twitter")) return <Briefcase size={16} />;
    if (t.includes("post scheduling")) return <CalendarClock size={16} />;
    if (t.includes("social media advertising")) return <Activity size={16} />;

    // 🎬 VIDEO (ALL UNIQUE)
    if (t.includes("reel")) return <Film size={16} />;
    if (t.includes("model shoot")) return <Aperture size={16} />;
    if (t.includes("drone")) return <Video size={16} />;
    if (t.includes("custom video")) return <Wand2 size={16} />;

    // 🎨 DESIGN (ALL UNIQUE)
    if (t.includes("logo")) return <Brush size={16} />;
    if (t.includes("package design")) return <Box size={16} />;
    if (t.includes("social media design")) return <Image size={16} />;
    if (t.includes("brochure")) return <File size={16} />;
    if (t.includes("pamphlet")) return <Newspaper size={16} />;
    if (t.includes("website banner")) return <LayoutGrid size={16} />;
    if (t.includes("banner design")) return <Columns size={16} />;
    if (t.includes("2d") || t.includes("3d")) return <Cuboid size={16} />;
    if (t.includes("standee")) return <Layers3 size={16} />;
    if (t.includes("business card")) return <IdCard size={16} />;
    if (t.includes("annual report")) return <BarChart4 size={16} />;
    if (t.includes("event design")) return <Lightbulb size={16} />;
    if (t.includes("csr")) return <FileBadge size={16} />;
    if (t.includes("strategy")) return <Focus size={16} />;
    if (t.includes("catalogue")) return <BookOpen size={16} />;
    if (t.includes("menu design")) return <MenuSquare size={16} />;
    if (t.includes("marriage")) return <Heart size={16} />;
    if (t.includes("hoarding") || t.includes("billboard")) return <Heart size={16} />;
    if (t.includes("illustration")) return <PenTool size={16} />;

    // 🤖 AI
    if (t.includes("ai")) return <BrainCircuit size={16} />;

    // ☁️ CLOUD
    if (t.includes("cloud") || t.includes("hosting")) return <Cloud size={16} />;

    // ⚙️ FINAL FALLBACK
    return <Layers size={16} />;
  };
  // 🔁 NESTED SUBMENU
  const renderSubmenu = (submenus: Submenu[] = []) => {
    return submenus.map((submenu, i) => {
      if (submenu.submenus) {
        return (
          <li key={i} className="menu-item-has-children">
            <Link href={submenu.link || "#"}>{submenu.title}</Link>
            <ul className="tp-submenu submenu">
              {renderSubmenu(submenu.submenus)}
            </ul>
          </li>
        );
      }

      return (
        <li key={i}>
          <Link href={submenu.link || "#"}>{submenu.title}</Link>
        </li>
      );
    });
  };

  // 🏷 TAG STYLE
  const getTagClass = (tag: string) => {
    switch (tag) {
      case "Popular":
        return "pop";
      case "Trending":
        return "new";
      case "Hot":
        return "hot";
      default:
        return "";
    }
  };

  return (
    <ul className="main-menu">
      {headerMenuData.map((menu) => (
        <li
          key={menu.id}
          className={`has-dropdown ${menu.megaMenu || menu.smallMenu || menu.mediumMenu
            ? "p-static"
            : ""
            } ${hoveredMenu === menu.id ? "active" : ""}`}
          onMouseEnter={() => setHoveredMenu(menu.id)}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <Link href={menu.link}>
            {menu.title}
            {menu.pluseIncon && <span className="dropdown-btn"></span>}
          </Link>

          {/* ✅ MEGA MENU */}
          {menu.megaMenu || menu.smallMenu || menu.mediumMenu ? (
            <div className="tp-megamenu-wrapper mega-menu megamenu-white-bg">
              <div className="gx-0 row">

                {menu?.submenus?.map((submenu: any, i: number) => (
                  <div key={i} className="col-md-2 tp-megamenu-list">

                    {submenu.title && (
                      <h4 className="tp-megamenu-title">{submenu.title}</h4>
                    )}

                    {submenu.megaMenu && (
                      <ul className="mega-grid">

                        {submenu.megaMenu.map((item: any, j: number) => {

                          // ✅ HEADING
                          if (item.heading) {
                            return (
                              <li key={j} className="tp-megamenu-title">
                                {item.heading}
                              </li>
                            );
                          }

                          // ✅ NORMAL ITEM
                          return (
                            <li key={j}>
                              <ThemeLink href={item.link || "#"} className="menu-link">

                                {/* ICON */}
                                <span className="menu-icon">
                                  {getIcon(item.title)}
                                </span>

                                {/* TEXT */}
                                <span className="menu-text">
                                  {item.title}
                                </span>

                                {/* TAG */}
                                {item.tag && (
                                  <span className={getTagClass(item.tag)}>
                                    {item.tag}
                                  </span>
                                )}

                              </ThemeLink>
                            </li>
                          );
                        })}

                      </ul>
                    )}

                  </div>
                ))}

              </div>
            </div>

          ) : menu.submenus ? (
            <ul className="tp-submenu submenu">
              {renderSubmenu(menu.submenus)}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}