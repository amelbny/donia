import React, { useState, useRef, useEffect } from "react";
import { useFormContext as useReactHookFormContext } from "react-hook-form";
import { useFormContext as useCustomFormContext } from "../../../Context/FormDataContext";


interface StepFour {
  images: File[];
}

const StepFour: React.FC = () => {
  const {
    register,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useReactHookFormContext<StepFour>();
  const { addImage } = useCustomFormContext();
  
  const [previewImages, setPreviewImages] = useState<
    { file: File; url: string }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    register("images", { required: "At least one image is required" });
  }, [register]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      // Map through the files to create an array of objects with file and URL
      const fileArray = Array.from(event.target.files).map((file) => {
        const url = URL.createObjectURL(file);
        addImage({ file, url }); // Assuming this modifies some external state
        return { file, url }; 
      });

      const newImages = [...previewImages, ...fileArray];

      setPreviewImages(newImages);

      setValue(
        "images",
        newImages.map(({ file }) => file),
        { shouldValidate: true }
      );
      clearErrors("images");
    } else {
      // If no files selected and previewImages is also empty, set an error
      if (previewImages.length === 0) {
        setError("images", {
          type: "manual",
          message: "At least one image is required",
        });
      }
    }
  };


  const handleRemoveImage = (url: string) => {
    const filteredImages = previewImages.filter((image) => image.url !== url);
    setPreviewImages(filteredImages);

    setValue(
      "images",
      filteredImages.map(({ file }) => file),
      { shouldValidate: true }
    );
    if (filteredImages.length === 0) {
      // If all images are removed, set an error
      setError("images", {
        type: "manual",
        message: "At least one image is required.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 my-4">
        Add some images for your property
      </span>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {previewImages.map((image, index) => {
          return (
            <div key={index} className="relative">
              <img
                src={image.url}
                alt={`Preview ${index}`}
                className="w-24 sm:w-32 md:w-40 lg:w-48 h-auto object-cover"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                onClick={() => handleRemoveImage(image.url)}
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>
      {errors.images && <p className="text-red-500">{errors.images.message}</p>}

      <input
        type="file"
        ref={fileInputRef}
        multiple
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <button
        type="button"
        className="btn mr-2 file-input file-input-bordered focus:outline-none border-yellow-500 hover:text-white hover:bg-yellow-500 file-input-info w-full max-w-xs sm:max-w-sm md:max-w-md"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Images
      </button>
    </div>
  );
};

export default StepFour;
