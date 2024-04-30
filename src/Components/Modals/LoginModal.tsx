import React from 'react'
import Login from '../Auth/Login';
import { useModals } from '../../Context/ModalContext';
import { IoClose } from "react-icons/io5";




const LoginModal: React.FC = () => {
  const { currentModal, openModal, closeModal } = useModals();

  if (currentModal !== "signIn") return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      <div className="relative bg-white p-4 rounded w-full max-w-md">
        <Login />
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-2 text-xl rounded-full bg-yellow-500 text-white p-2 hover:bg-yellow-400"
          aria-label="Close modal"
        >
          <IoClose />
        </button>
        <div className="divider mx-4">or</div>
        <div className="flex gap-2 items-center pl-4 mt-2">
          <p>Don't have an account ?</p>
          <button
            type='button'
            className=" bg-white text-yellow-500 text-bold"
            onClick={() => {
              closeModal(); 
              openModal("signUp");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
  
export default LoginModal