import { useRef, useEffect, useState, useContext } from 'react';
import { useModals } from "../../Context/ModalContext";

import { useForm } from 'react-hook-form';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Hooks/AuthProvider';
import { DecodeTokenAndGetRole } from '../../Hooks/decodeToken';
import { sendVerificationCode } from '../services/apiService';

type LoginFormInputs = {
  email: string;
  password: string;
}

const Login: React.FC = () => {

  const { login} = useAuth();
  const navigate = useNavigate();
  const errRef = useRef<HTMLParagraphElement | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const {
      email,
      reason,
      openModal,
      closeModal,
      setEmail,
  } = useModals();


  const { register, handleSubmit, formState: { errors }, clearErrors, watch } = useForm<LoginFormInputs>();
  const emailInput = watch('email')

  useEffect(() => {
    setEmail(emailInput)
    setEmailError(null)
    clearErrors();
  }, [emailInput, clearErrors, setEmail]);

  const onSubmit = async (data: LoginFormInputs) => {
    console.log("Login data:", data);

    try {
      const response = await axios.post("http://localhost:3000/api/v1/login",data , {
         headers: { "Content-Type": "application/json" },
       });
       console.log(response);

      const { accessToken, refreshToken} = response.data.data;

      console.log('accessToken:', accessToken);
      console.log('refreshToken:', refreshToken);

      const primaryRole = DecodeTokenAndGetRole(accessToken);
      console.log('Primary role:',primaryRole)

      login(accessToken, refreshToken);

      if (primaryRole === 'ADMIN'){
        closeModal();
        navigate("/dashboard");
      }else {
        closeModal();
        navigate("/");
      }

    } catch (err: any) {
      if (!err?.response) {
        setApiError('No Server Response');      
      } else if (err.response?.status === 400) {
        setApiError('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setApiError('Unauthorized');
      } else {
        setApiError('Login Failed');
      }
      errRef.current?.focus();
    }
  }

  const handleForgotPwd = async () => {
    if (!email) {
      setEmailError("Please enter your email address to reset your password.");
    } else {
      setEmail(email);
      try {
        const result = await sendVerificationCode(email, "forgotpassword");
        if (result.success) {
          closeModal();
          openModal("ForgotPwdVerifyCode", email, undefined, 'forgotpassword');
        } else {
          setEmailError("Failed to send verification code. Please try again.");
        }
      } catch (error) {
        setEmailError(
          "Failed to send verification code. Please try again later."
        );
      }
    }
  };


  return (
    <div className="flex w-full justify-center items-center h-full">
      <div className="md:max-w-[700px] w-full px-4 rounded-3xl bg-white">
        <div className="text-center my-8">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
            Welcome Back
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-1">
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
            {emailError && <p className="text-red-500">{emailError}</p>}
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

          <div className="mt-4 flex justify-between gap-4 items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label className="ml-2 font-medium text-base" htmlFor="remember">
                Remember me for 30 days
              </label>
            </div>
            <button
              type='button'
              className="font-medium text-base text-yellow-500"
              onClick={handleForgotPwd}
            >
              Forgot password
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-y-4">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400
                          text-white text-lg 
                          font-bold py-2 rounded-xl 
                          active:scale-[.98]
                          active:duration-75
                          transition-all
                          hover:scale-[1.01]
                          ease-in-out"
            >
              Sign in
            </button>
            <p
              ref={errRef}
              className={
                apiError ? "errmsg text-red-500 text-center" : "offscreen"
              }
              aria-live="assertive"
            >
              {apiError}
            </p>

            <button
              type='button'
              className="flex items-center justify-center gap-2 
                                border-2 py-2 rounded-xl
                                active:scale-[.98]
                                active:duration-75
                                transition-all
                                hover:scale-[1.01]
                                ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                width="24"
                height="24"
                fill="#4A90E2"
              >
                <path d="M279.14 288l14.22-92.66h-88.91V142.4c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.69 0-121.08 44.96-121.08 127.24v70.46h-81.23V288h81.23v224h100.02V288z" />
              </svg>
              Sign in with facbook
            </button>

            <button
              type='button'
              className="flex items-center justify-center gap-2 
                                border-2 py-2 rounded-xl
                                active:scale-[.98]
                                active:duration-75
                                transition-all
                                hover:scale-[1.01]
                                ease-in-out"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                  fill="#EA4335"
                />
                <path
                  d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                  fill="#34A853"
                />
                <path
                  d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                  fill="#4A90E2"
                />
                <path
                  d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                  fill="#FBBC05"
                />
              </svg>
              Sign in with google chrome
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login