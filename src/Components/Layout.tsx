import React from 'react';
import { Outlet} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import MenuBar from './Menu/MenuBar';
import Footer from './Footer';
import LoginModal from './Modals/LoginModal';
import RegistreModal from './Modals/RegistreModal';
import SignUpEmailVerify from "./Modals/SignUpEmailVerify";
import ResetEmailVerify from './Modals/ResetEmailVerify';
import ResetPwd from './Modals/ResetPwd';
import UpdateEmail from './Modals/UpdateEmail';





const Layout: React.FC = () => {
 
  return (
    <>
      <MenuBar />
      <main className="App">
        <Outlet />
      </main>
      <ToastContainer/>
      <Footer />
      <LoginModal />
      <RegistreModal />
      <SignUpEmailVerify />
      <ResetPwd />
      <ResetEmailVerify/>
      <UpdateEmail/>
    </>
  );
};

export default Layout;
