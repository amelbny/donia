import React, { createContext, useContext, useState, ReactNode } from "react";

interface Image {
  file: File;
  url: string;
}

interface FormContextType {
  images: Image[];
  addImage: (newImage: Image) => void;
  removeImage: (imageIndex: number) => void;
  clearImages: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}

interface Props {
  children: ReactNode;
}

export const FormProvider: React.FC<Props> = ({ children }) => {
  const [images, setImages] = useState<Image[]>([]);

  const addImage = (newImage: Image) => {
    setImages((prevImages) => [...prevImages, newImage]);
  };

  const removeImage = (imageIndex: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== imageIndex)
    );
  };

  const clearImages = () => {
    setImages([]);
  };

  return (
    <FormContext.Provider
      value={{ images, addImage, removeImage, clearImages }}
    >
      {children}
    </FormContext.Provider>
  );
};
