import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Avatar from "../../img/Avatar.png";


import SideBar from "./SideBar";
import Navbar from "./Navbar";



const MenuBar: React.FC = () => {
  const [nav, setNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
    const [profilePicUrl, setProfilePicUrl] = useState<string>("Avatar");


  const handleNav = () => {
    setNav((prevNav) => !prevNav);
  };

  const closeNav = () => setNav(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed w-full z-10 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-4 h-2O flex justify-between items-center  text-black font-medium ">
        <Navbar profilePicUrl={profilePicUrl} />

        <div onClick={handleNav} className="block md:hidden">
          {nav ? (
            <AiOutlineClose className="text-yellow-500" size={25} />
          ) : (
            <AiOutlineMenu className="text-yellow-500 font-bold	" size={25} />
          )}
        </div>
        <div
          className={
            nav
              ? "fixed left-0 top-0 z-50 w-[60%] h-full border-r border-r-gray-900 bg-white  ease-in-out duration-500"
              : "ease-in-out duration-500 fixed left-[-100%]"
          }
        >
          <SideBar closeNav={closeNav} profilePicUrl={profilePicUrl} />
        </div>
      </div>
    </div>
  );
};

export default MenuBar