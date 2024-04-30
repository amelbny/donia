import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FunctionComponent,
} from "react";
import { UserData } from "../Types/UserTypes";

type ModalType =
  | "signIn"
  | "signUp"
  | "SignUpVerifyCode"
  | "ForgotPwdVerifyCode"
  | "resetPwd"
  |"VerifyEmailSetting"
  | null;
type ModalReason = "signup" | "forgotpassword" | "profileSettings" | null;

interface ModalContextType {
  currentModal: ModalType;
  openModal: (modal: ModalType, email?: string, data?: UserData, reason?: ModalReason) => void;
  closeModal: () => void;
  email: string;
  setEmail: (email: string) => void;
  UserData: UserData | null;
  setUserData: (data: UserData) => void;
  reason: ModalReason;
}

const initialContextData: ModalContextType = {
  currentModal: null,
  openModal: () => {},
  closeModal: () => {},
  email: "",
  setEmail: () => {},
  UserData: null,
  setUserData: () => {},
  reason: null,
};

const ModalContext = createContext<ModalContextType>(initialContextData);

export const useModals = () => useContext(ModalContext);

interface ModalProviderProps {
  children: ReactNode; // This tells TypeScript that children can be anything that React considers a valid node
}

export const ModalProvider: FunctionComponent<ModalProviderProps> = ({
  children,
}) => {
  const [currentModal, setCurrentModal] = useState<ModalType>(null);
  const [email, setEmail] = useState<string>("");
  const [UserData, setUserData] = useState<UserData | null>(null);
  const [reason, setReason] = useState<ModalReason>(null);

  const openModal = (
    modal: ModalType,
    email: string = "",
    data: UserData | null = null,
    reason: ModalReason = null
  ) => {
    console.log(
      `Attempting to open modal: ${modal}, currentModal: ${currentModal}`
    );
    if (currentModal !== modal) {
      setCurrentModal(modal);
      setEmail(email);
      setUserData(data);
      setReason(reason);
      console.log(
        `Opening modal: ${modal} with email: ${email} Reason: ${reason}`
      );
    } else {
      console.log(`Modal ${modal} already open`);
    }
  };


  const closeModal = () => {
    console.log("Closing modal");
    setCurrentModal(null);
    setEmail("");
    setUserData(null);
    setReason(null);
  };
  const contextValue = {
    currentModal,
    openModal,
    email,
    reason,
    setEmail,
    UserData,
    setUserData,
    closeModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
