import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useModals } from "../../Context/ModalContext";
import { UserData } from '../../Types/UserTypes';
import { sendVerificationCode } from '../services/apiService';
import axios from 'axios';



interface RegistreProps {
  onRegistrationSuccess?: () => void;
}


const Registre: React.FC<RegistreProps> = () => {
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();
  const { openModal, closeModal, setUserData } = useModals();

  

  const onSubmit = async (data: UserData) => {
    console.log("Registre data:", data);
    try {
      await sendVerificationCode(data.email, "signup");
      setUserData(data);
      closeModal();
      openModal("SignUpVerifyCode", data.email, data, "signup");
    } catch (error) {
      alert("Failed to send verification code");
    }
  };

  return (
    <div className="flex w-full justify-center items-center h-full">
      <div className="md:max-w-[700px] w-full px-4 rounded-3xl bg-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2">
            <div className="text-center my-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome to our Makaan
              </h2>
              <p className="text-md text-gray-600 mt-2">
                Please fill in the details to create your account.
              </p>
            </div>

            <div>
              <label className="text-base font-medium">First Name</label>
              <input
                type="text"
                {...register("firstname", {
                  required: "First name is required",
                })}
                className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                placeholder="Enter your first name"
              />
              {errors.firstname && (
                <p className="text-red-500">{errors.firstname.message}</p>
              )}
            </div>

            <div>
              <label className="text-base font-medium">Last Name</label>
              <input
                type="text"
                {...register("lastname", { required: "Last name is required" })}
                className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                placeholder="Enter your last name"
              />
              {errors.lastname && (
                <p className="text-red-500">{errors.lastname.message}</p>
              )}
            </div>

            <div>
              <label className="text-base font-medium">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/,
                })}
                className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-base font-medium">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                  },
                })}
                className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            {error && <p className="text-red-500 text-md my-1">{error}</p>}
            <div className="mt-4 flex flex-col gap-y-4">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-400 text-white text-lg font-bold py-2 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registre;
