import React from 'react'
import Registre from '../Auth/Registre';
import { useModals } from "../../Context/ModalContext";

import { IoClose } from "react-icons/io5";


const RegistreModal: React.FC= () => {
    const { currentModal, openModal, closeModal } = useModals();

      if (currentModal !== "signUp") return null;


  const handleRegistrationSuccess = () => {
    closeModal();
    openModal("signIn");
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      <div className="relative bg-white p-4 rounded w-full max-w-md">
        <Registre onRegistrationSuccess={handleRegistrationSuccess} />
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-2 text-xl rounded-full bg-yellow-500 text-white p-2 hover:bg-yellow-400"
          aria-label="Close modal"
        >
          <IoClose />
        </button>
        <div className="divider mx-4">or</div>
        <div className="flex flex-row gap-2 mt-2 ml-4">
          <p>Already have an account!</p>
          <button
            className=" bg-white text-yellow-500 text-bold "
            onClick={() => {
              closeModal(); // Close this modal first
              openModal("signIn");
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistreModal