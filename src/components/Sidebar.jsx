import React, { useEffect, useState } from "react";
import { href, Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdCalendarMonth,
  MdInventory,
  MdOutlineDashboard,
  MdPeople,
} from "react-icons/md";
import { FaAngleDown, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/Logo.png";
// import { logout } from "../apis/authApi";
// import { useAuth } from "../context/AuthProvider";
import { GiGoat, GiPostOffice } from "react-icons/gi";
import { GrDocumentDownload } from "react-icons/gr";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BsApp, BsViewList } from "react-icons/bs";
import { BiDollar } from "react-icons/bi";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { user, setUser, setLogin } = useAuth();

  const [activeButton, setActiveButton] = useState(
    localStorage.getItem("activeButton") || "Dashboard"
  );
  const [openDropdown, setOpenDropdown] = useState(null);

const menuItems = [
  {
    name: "Dashboard",
    href: "/app",
    icon: <MdOutlineDashboard />,
  },
  {
    name: "Products",
    href: "products",
    icon: <MdInventory />,
  },
  {
    name: "Settings",
    href: "settings",
    icon: <CiSettings />,
  },
];



  // const filteredMenuItems = user?.role === "admin" ? menuItems: menuItems.filter(item => user?.permissions[item.name]?.read);

  const filteredMenuItems = [
   
    ...menuItems
    
  ];
  // console.log(user?.permissions)
  
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    // logout().then(() => {
      // setLogin(false);
      // setUser(null);
      // localStorage.removeItem('token')
      navigate("/login");
    // });
  };

  const handleDropdownToggle = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find(
      (item) =>
        item.href === currentPath ||
        item.subItems?.some((sub) => sub.href === currentPath)
    );
    if (currentItem) {
      setActiveButton(currentItem.name);
      localStorage.setItem("activeButton", currentItem.name);
    }
  }, [location.pathname]);

  return (
    <>
<div
  className={`fixed top-0 left-0 z-50 h-screen bg-white shadow-lg w-64 transition-transform duration-300
  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
>
  {/* Logo */}
  <div className="px-6 py-5 border-b">
    <Link to="/" className="flex justify-center">
      <img src={logo} alt="Logo" className="w-28" />
    </Link>
  </div>

  {/* Menu */}
  <ul className="px-4 py-4 space-y-1">
    {menuItems.map((item) => {
      const isActive = activeButton === item.name;

      return (
        <li key={item.name}>
          <button
            onClick={() => {
              setActiveButton(item.name);
              localStorage.setItem("activeButton", item.name);
              setIsSidebarOpen(false);
              navigate(item.href);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition
              ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        </li>
      );
    })}

    {/* Divider */}
    <li className="my-4 border-t"></li>

    {/* Logout */}
    <li>
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
      >
        <FaSignOutAlt className="text-lg" />
        <span>Logout</span>
      </button>
    </li>
  </ul>
</div>


      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
