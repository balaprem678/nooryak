"use client";

import mobileMenuData from "@/data/header-menu/mobileMenuData";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MainMobileMenu = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
    if (activeMenu === id) {
      setActiveMenu(null);
    } else {
      setActiveMenu(id);
      setActiveSubmenu(null);
    }
  };

  const toggleSubmenu = (index: number) => {
    if (activeSubmenu === index) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(index);
    }
  };

  return (
    <ul>
      {mobileMenuData.map((menuItem) => {
        const isDropdown = menuItem.megaMenu;

        return (
          <li
            key={menuItem.id}
            className={`${isDropdown ? "has-dropdown" : ""} ${
              activeMenu === menuItem.id ? "active" : ""
            }`}
          >
            {/* ✅ MAIN MENU */}
            <Link
              href={menuItem.link}
              onClick={(e) => {
                if (isDropdown) {
                  e.preventDefault(); // only block dropdown
                  toggleMenu(menuItem.id);
                }
              }}
            >
              <span className="menu-text">{menuItem.title}</span>
            </Link>

            {/* ✅ MEGA MENU */}
            {isDropdown && menuItem.megaMenu && (
              <div
                className="tp-megamenu-wrapper mega-menu"
                style={{
                  display: activeMenu === menuItem.id ? "block" : "none",
                }}
              >
                <div className="row gx-0">
                  {menuItem.columns?.map((column, colIndex) => (
                    <div key={colIndex} className="col-xl-3">
                      <div className="tp-megamenu-list">
                        <h4 className="tp-megamenu-title">
                          {column.link ? (
                            <Link href={column.link}>
                              {column.title}
                            </Link>
                          ) : (
                            column.title
                          )}
                        </h4>

                        <ul>
                          {column.links.map((link, linkIndex) => (
                            <li key={linkIndex}>
                              <Link href={link.link}>
                                {link.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}

                  {/* IMAGE */}
                  {menuItem.image && (
                    <div className="col-xl-3">
                      <div className="tp-megamenu-thumb">
                        <Image
                          src={menuItem.image.src}
                          alt={menuItem.image.alt}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ✅ TOGGLE BUTTON ONLY FOR DROPDOWN */}
            {isDropdown && (
              <button
                className={`tp-menu-close ${
                  activeMenu === menuItem.id ? "active" : ""
                }`}
                onClick={() => toggleMenu(menuItem.id)}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MainMobileMenu;