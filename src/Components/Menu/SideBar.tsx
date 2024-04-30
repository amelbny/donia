import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classnames from "classnames";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useModals } from "../../Context/ModalContext";
import { useAuth } from "../../Hooks/AuthProvider";
import { useUser } from "../../Context/UserContext";
import Avatar from "../../img/Avatar.png";

interface SidebarProps {
  closeNav: () => void;
  profilePicUrl: string;
}

const SideBar: React.FC<SidebarProps> = ({closeNav, profilePicUrl}) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { user } = useUser();

  const { openModal } = useModals();

  const handleItemClick = (path: string) => {
    navigate(path);
    closeNav();
  };

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
    <div>
      <div className="flex m-4 items-center">
        <Link
          to="/"
          className="text-3xl text-yellow-500 hover:text-yellow-500 capitalize font-bold"
        >
          Makaan
        </Link>
      </div>
      <ul>
        <li className="p-4">
          <Menu>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/"
                  className={`block text-black px-4 py-2 ${
                    active ? "text-yellow-500" : ""
                  }`}
                  onClick={() => handleItemClick("/")}
                >
                  HOME
                </Link>
              )}
            </Menu.Item>
          </Menu>
        </li>

        <li className="p-4">
          <Menu as="div" className="relative inline-block text-left">
            {({ open }) => (
              <>
                <Menu.Button className="hover:text-yellow-500 text-black focus:text-yellow-500 flex px-4 py-2">
                  REAL ESTATE
                  <span className="ml-2 pt-1">
                    {open ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-left absolute left-0 mt-2 w-56  rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none z-50">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/real-estate/type"
                          className={classnames(
                            active ? "text-yellow-500" : "text-black",
                            "block px-4 py-2 text-sm"
                          )}
                          onClick={() => handleItemClick("/real-estate/type")}
                        >
                          PROPERTY TYPE
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/realEstate/list"
                          className={classnames(
                            active ? " text-yellow-500" : "text-black",
                            "block px-4 py-2 text-sm"
                          )}
                          onClick={() => handleItemClick("/realEstate/list")}
                        >
                          PROPERTY LIST
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </li>

        <li className="p-4">
          <Menu as="div" className="relative inline-block text-left">
            {({ open }) => (
              <>
                <Menu.Button className="hover:text-yellow-500 text-black focus:text-yellow-500 flex px-4 py-2">
                  VEHICULE
                  <span className="ml-2 pt-1">
                    {open ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none z-50">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/vehicles/type"
                          className={classnames(
                            active ? " text-yellow-500" : "text-black",
                            "block px-4 py-2 text-sm"
                          )}
                          onClick={() => handleItemClick("/vehicles/type")}
                        >
                          PROPERTY TYPE
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/vehicules/list"
                          className={classnames(
                            active ? " text-yellow-500" : "text-black",
                            "block px-4 py-2 text-sm"
                          )}
                          onClick={() => handleItemClick("/vehicules/list")}
                        >
                          PROPERTY LIST
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </li>

        <li className="p-4">
          <Link
            to="/addProperty"
            className="hover:text-yellow-500 text-black focus:text-yellow-500 flex px-4 py-2"
          >
            ADD PROPERTY
          </Link>
        </li>

        {/* Conditionally render Account or Profile based on isAuthenticated */}
        {!isAuthenticated ? (
          <li className="p-4">
            <button
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded"
              onClick={() => openModal("signIn")}
            >
              Sign In
            </button>
          </li>
        ) : (
          <li className="p-4">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="hover:text-yellow-500 text-black focus:text-yellow-500 flex px-4 py-2">
                <div className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt=" Avatar" src={profilePicUrl || Avatar} />
                  </div>
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/userProfile/accountSettings"
                        className={classnames(
                          active ? "text-yellow-500" : "text-black",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={() =>
                          handleItemClick("/userProfile/accountSettings")
                        }
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classnames(
                          active ? "text-yellow-500" : "text-black",
                          "block px-4 py-2 text-sm w-full text-left"
                        )}
                        onClick={logout}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideBar;
