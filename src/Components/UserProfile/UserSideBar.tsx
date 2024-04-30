import React from "react";
import { Link } from "react-router-dom";
import settings from '../../img/settings.png'
import security from "../../img/security.png";
import online from "../../img/online.png";
import creditCard from "../../img/creditCard.png";
import touch from "../../img/touch.png";



interface UserSideBarProps {
  activepage?: string;
}

const UserSideBar: React.FC<UserSideBarProps> = ({ activepage }) => {
  return (
    <div className="text-black h-96 w-64 space-y-2 p-5">
      {/* Navigation link for Account Settings */}
      <Link
        to="/userProfile/accountSettings"
        className={`block p-2 rounded-lg ${
          activepage === "accountsettings"
            ? "bg-yellow-400"
            : "hover:bg-yellow-400"
        }`}
      >
        <div className="flex flex-row items-center gap-4 ">
          <img src={settings} alt="settings" />
          <span>Account Settings</span>
        </div>
      </Link>

      {/* Navigation link for Connection And Security */}
      <Link
        to="/userProfile/ConnectionAndSecurity"
        className={`block p-2 rounded-lg ${
          activepage === "ConnectionAndSecurity"
            ? "bg-yellow-400"
            : "hover:bg-yellow-400"
        }`}
      >
        <div className="flex flex-row items-center gap-4">
          <img src={security} alt="security" />
          <span>Connection And Security</span>
        </div>
      </Link>

      {/* Navigation link for Payments And Disbursements */}
      <Link
        to="/userProfile/PaymentsAndDisbursements"
        className={`block p-2 rounded-lg ${
          activepage === "PaymentsAndDisbursements"
            ? "bg-yellow-400"
            : "hover:bg-yellow-400"
        }`}
      >
        <div className="flex flex-row items-center gap-4">
          <img src={creditCard} alt="hand" />
          <span>Payments And Disbursements</span>
        </div>
      </Link>

      {/* Navigation link for Favorites */}
      <Link
        to="/userProfile/favorites"
        className={`block p-2 rounded-lg ${
          activepage === "favorites" ? "bg-yellow-400" : "hover:bg-yellow-400"
        }`}
      >
        <div className="flex flex-row items-center gap-4">
          <img src={touch} alt="touch" />
          <span>Favorites</span>
        </div>
      </Link>

      {/* Navigation link for Posts */}
      <Link
        to="/userProfile/posts"
        className={`block p-2 rounded-lg ${
          activepage === "posts" ? "bg-yellow-400" : "hover:bg-yellow-400"
        }`}
      >
        <div className="flex flex-row items-center gap-4">
          <img src={online} alt="online" />
          <span>Posts</span>
        </div>
      </Link>
    </div>
  );
};

export default UserSideBar;
