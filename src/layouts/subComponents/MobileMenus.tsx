// import menuItemsTwo from '@/data/header-menu/menuItemTwo';
// import { useState } from 'react';
// import Link from 'next/link';

// const MobileMenus = () => {
//   const [activeMenus, setActiveMenus] = useState<number[]>([]);
//   const [submenuDisplay, setSubmenuDisplay] = useState<{[key: number]: boolean}>({});
//   const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);


//   const toggleMenu = (index: number) => {
//     // Toggle submenu display
//     setSubmenuDisplay(prev => ({
//       ...prev,
//       [index]: !prev[index]
//     }));

//     // Update active menus
//     if (activeMenus.includes(index)) {
//       setActiveMenus(activeMenus.filter(i => i !== index));
//     } else {
//       setActiveMenus([...activeMenus, index]);
//     }
//   };

//   return (
//     <ul>
//       {menuItemsTwo.map((item, index) => (
//         <li
//           key={`menu-${index}`}
//           className={`has-dropdown ${item.static ? 'p-static' : ''} ${
//             activeMenus.includes(index) ? 'active' : ''
//           } ${hoveredMenu === index || hoveredMenu === null ? 'is-active' : ''}`}
//           onMouseEnter={() => setHoveredMenu(index)}
//           onMouseLeave={() => setHoveredMenu(null)}
//         >
//           <Link onClick={() => toggleMenu(index) } href={item.href} >
//             {item.title}
//           </Link>
//           {item.subItems && (
//             <>
//               <ul 
//                 className="tp-submenu submenu" 
//                 style={{ display: submenuDisplay[index] ? 'block' : 'none' }}
//               >
//                 {item.subItems.map((subItem, subIndex) => (
//                   <li key={`submenu-${index}-${subIndex}`}>
//                     <Link href={subItem.href}>{subItem.title}</Link>
//                   </li>
//                 ))}
//               </ul>
//               <button 
//                 className='tp-menu-close' 
//                 onClick={() => toggleMenu(index)}
//               >
//                 <i className="fa-solid fa-plus"></i>
//               </button>
//             </>
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default MobileMenus;

// "use client";

// import menuItemsTwo from "@/data/header-menu/menuItemTwo"
// import { useState } from 'react';
// import Link from 'next/link';

// interface SubItem {
//   title: string;
//   href: string;
// }

// interface MenuItem {
//   title: string;
//   href: string;
//   static?: boolean;
//   subItems?: SubItem[];
// }

// const MobileMenus = () => {
//   const [activeMenus, setActiveMenus] = useState<number[]>([]);
//   const [submenuDisplay, setSubmenuDisplay] = useState<{ [key: number]: boolean }>({});
//   const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);

//   const toggleMenu = (index: number) => {
//     // Toggle submenu display
//     setSubmenuDisplay(prev => ({
//       ...prev,
//       [index]: !prev[index]
//     }));

//     // Update active menus
//     setActiveMenus(prev =>
//       prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
//     );
//   };

//   return (
//     <ul>
//       {menuItemsTwo.map((item: MenuItem, index: number) => (
//         <li
//           key={`menu-${index}`}
//           className={`has-dropdown ${item.static ? 'p-static' : ''} ${activeMenus.includes(index) ? 'active' : ''
//             } ${hoveredMenu === index ? 'is-active' : ''}`}
//           onMouseEnter={() => setHoveredMenu(index)}
//           onMouseLeave={() => setHoveredMenu(null)}
//         >
//           {/* Use <a> inside Link for onClick */}
//           <Link href={item.href} passHref legacyBehavior>
//             <a onClick={(e) => { e.preventDefault(); toggleMenu(index); }}>
//               {item.title}
//             </a>
//           </Link>

//           {item.subItems && (
//             <>
//               <ul
//                 className="tp-submenu submenu"
//                 style={{ display: submenuDisplay[index] ? 'block' : 'none' }}
//               >
//                 {item.subItems.map((subItem, subIndex) => (
//                   <li key={`submenu-${index}-${subIndex}`}>
//                     <Link href={subItem.href}>
//                       <a>{subItem.title}</a>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>

//               <button
//                 className='tp-menu-close'
//                 onClick={() => toggleMenu(index)}
//                 type="button"
//               >
//                 <i className="fa-solid fa-plus"></i>
//               </button>
//             </>
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default MobileMenus;



"use client";

import menuItemsTwo from "@/data/header-menu/menuItemTwo";
import { useState } from "react";
import Link from "next/link";
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

interface SubItem {
  title: string;
  href: string;
}

interface MenuItem {
  title: string;
  href: string;
  static?: boolean;
  subItems?: SubItem[];
}

// 🔹 ICON LOGIC (same as desktop)
const getIcon = (title: string = "") => {
  const t = title.toLowerCase();
  if (t.includes("web developer")) return <Monitor size={16} />;
  if (t.includes("website development")) return <Globe size={16} />;
  if (t.includes("wordpress")) return <Layout size={16} />;
  if (t.includes("custom website")) return <Settings size={16} />;
  if (t.includes("ecommerce website")) return <Store size={16} />;
  if (t.includes("shopify website")) return <ShoppingBag size={16} />;
  if (t.includes("woocommerce")) return <CreditCard size={16} />;
  if (t.includes("ecommerce development")) return <Package size={16} />;
  if (t.includes("shopify development")) return <Truck size={16} />;
  if (t.includes("react web")) return <AppWindow size={16} />;
  if (t.includes("php")) return <Code size={16} />;
  if (t.includes("software")) return <Database size={16} />;
  if (t.includes("android")) return <Smartphone size={16} />;
  if (t.includes("ios")) return <Tablet size={16} />;
  if (t.includes("flutter")) return <Layers size={16} />;
  if (t.includes("react native")) return <Cpu size={16} />;
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
  if (t.includes("google my business")) return <MapPin size={16} />;
  if (t.includes("directory") || t.includes("local seo tools")) return <ListTree size={16} />;
  if (t.includes("google ads")) return <Target size={16} />;
  if (t.includes("facebook ads")) return <Megaphone size={16} />;
  if (t.includes("display advertising")) return <Tv size={16} />;
  if (t.includes("remarketing")) return <Repeat size={16} />;
  if (t.includes("instagram")) return <Camera size={16} />;
  if (t.includes("youtube")) return <PlayCircle size={16} />;
  if (t.includes("linkedin")) return <Briefcase size={16} />;
  if (t.includes("twitter")) return <Briefcase size={16} />;
  if (t.includes("post scheduling")) return <CalendarClock size={16} />;
  if (t.includes("social media advertising")) return <Activity size={16} />;
  if (t.includes("reel")) return <Film size={16} />;
  if (t.includes("model shoot")) return <Aperture size={16} />;
  if (t.includes("drone")) return <Video size={16} />;
  if (t.includes("custom video")) return <Wand2 size={16} />;
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
  if (t.includes("ai")) return <BrainCircuit size={16} />;
  if (t.includes("cloud") || t.includes("hosting")) return <Cloud size={16} />;
  return <Layers size={16} />;
};

const MobileMenus = () => {
  const [activeMenus, setActiveMenus] = useState<number[]>([]);
  const [submenuDisplay, setSubmenuDisplay] = useState<{ [key: number]: boolean }>({});
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    setSubmenuDisplay(prev => ({ ...prev, [index]: !prev[index] }));
    setActiveMenus(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  return (
    <ul>
      {menuItemsTwo.map((item, index) => (
        <li
          key={`menu-${index}`}
          className={`has-dropdown ${item.static ? 'p-static' : ''} ${activeMenus.includes(index) ? 'active' : ''
            } ${hoveredMenu === index ? 'is-active' : ''}`}
          onMouseEnter={() => setHoveredMenu(index)}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <Link href={item.href} passHref legacyBehavior>
            <a onClick={(e) => { e.preventDefault(); toggleMenu(index); }}>
              {/* ✅ ICON */}
              <span className="menu-icon">{getIcon(item.title)}</span>
              {/* TITLE */}
              <span className="menu-text">{item.title}</span>
            </a>
          </Link>

          {item.subItems && (
            <>
              <ul
                className="tp-submenu submenu"
                style={{ display: submenuDisplay[index] ? 'block' : 'none' }}
              >
                {item.subItems.map((subItem, subIndex) => (
                  <li key={`submenu-${index}-${subIndex}`}>
                    <Link href={subItem.href}>
                      <a>
                        <span className="menu-icon">{getIcon(subItem.title)}</span>
                        <span className="menu-text">{subItem.title}</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>

              <button
                className="tp-menu-close"
                onClick={() => toggleMenu(index)}
                type="button"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MobileMenus;