import React, { useState } from "react";
import AccountSetting from "../UserProfile/AccountSetting";
import Favorites from "../UserProfile/Favorites";
import Posts from "../UserProfile/Posts";
import ConnectionAndSecurity from "../UserProfile/ConnectionAndSecurity";
import PaymentsAndDisbursements from "../UserProfile/PaymentsAndDisbursements";
import UserSideBar from "../UserProfile/UserSideBar";
import { useParams } from "react-router-dom";

const UserProfile: React.FC = () => {
  const { activepage } = useParams<{ activepage: string }>();

  return (
    <div className="mx-auto px-4 md:px-8 lg:px-12 max-w-screen-xl pt-32 pb-20 flex flex-col md:flex-row">
      <div className="w-full md:w-48 lg:w-64 flex-none">
        <div className="h-96 border border-gray-300">
          <UserSideBar activepage={activepage} />
        </div>
      </div>

      <div className="flex-grow  md:pl-8">
        <div className="h-full border border-gray-300">
          {activepage === "accountSettings" && <AccountSetting />}
          {activepage === "ConnectionAndSecurity" && <ConnectionAndSecurity />}
          {activepage === "PaymentsAndDisbursements" && (
            <PaymentsAndDisbursements />
          )}
          {activepage === "favorites" && <Favorites />}
          {activepage === "posts" && <Posts />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
