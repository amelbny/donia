import React, {useState} from 'react'
import { useFormContext } from 'react-hook-form';
import { MyFormData } from '../../../Types/FormTypes';
import { useFormContext as useCustomFormContext } from "../../../Context/FormDataContext";




const StepSixRE: React.FC<{ navigateToEditStep: (editStep: number) => void }> = ({ navigateToEditStep }) => {
    const {getValues, watch} = useFormContext<MyFormData>();
    const {images} = useCustomFormContext()
    const formData = getValues();
    const action = watch("action");
    

    return (
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-bold align-middle mb-4">
          Summary of Your Listing
        </h2>

        <div className="mb-8 w-full">
          <h3 className="font-semibold mb-2">Category and action</h3>
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-64 items-center border border-gray-200 shadow-sm rounded-lg p-4 w-full">
            <div className="flex flex-col items-start mb-2 w-full">
              <p>Category: {formData.category}</p>
              <p>Action: {formData.action}</p>
            </div>
            <button
              onClick={() => navigateToEditStep(1)}
              className="text-sm md:text-base text-white bg-yellow-500 hover:bg-yellow-400 px-2 md:px-4 py-1 md:py-2 rounded"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="mb-8 w-full">
          <h3 className="font-semibold mb-2">Property Information</h3>
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-64 items-center border border-gray-200 shadow-sm rounded-lg p-4 w-full">
            <div className="flex flex-col items-start mb-2 w-full">
              <p>Country: {formData.Country}</p>
              <p>Address: {formData.address}</p>
              <p>Property Type: {formData.propertyType}</p>
            </div>
            <button
              onClick={() => navigateToEditStep(2)}
              className="text-sm md:text-base text-white bg-yellow-500 hover:bg-yellow-400 px-2 md:px-4 py-1 md:py-2 rounded"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Listing Details */}
        <div className="mb-8 w-full">
          <h3 className="font-semibold mb-2">Listing Details</h3>
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-64 items-center border border-gray-200 shadow-sm rounded-lg p-4 w-full">
            <div className="flex flex-col items-start mb-2 w-full">
              <p>Space: {formData.Space} m²</p>
              {formData.RentPrice ? (
                <p>Monthly Rent Price: {formData.RentPrice} TND</p>
              ) : (
                <p>Price: {formData.SalePrice} TND</p>
              )}

              <p>Description: {formData.description}</p>
            </div>
            <button
              onClick={() => navigateToEditStep(3)}
              className="text-sm md:text-base text-white bg-yellow-500 hover:bg-yellow-400 px-2 md:px-4 py-1 md:py-2 rounded"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Media */}
        <div className="mb-8 w-full">
          <h3 className="font-semibold mb-2">Media</h3>
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-64 items-center border border-gray-200 shadow-sm rounded-lg p-4 w-full">
            <div className="flex flex-col items-start mb-2 w-full">
              {/* Displaying the uploaded images */}
              {images && images.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`Uploaded Image ${index}`}
                      className="w-full h-auto object-cover"
                    />
                  ))}
                </div>
              ) : (
                <p>No images uploaded.</p>
              )}
            </div>
            <button
              onClick={() => navigateToEditStep(4)} 
              className="text-sm md:text-base text-white bg-yellow-500 hover:bg-yellow-400 px-2 md:px-4 py-1 md:py-2 rounded"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Final Details */}
        <div className="mb-8 w-full">
          <h3 className="font-semibold mb-2">Final Details</h3>
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-64 items-center border border-gray-200 shadow-sm rounded-lg p-4 w-full">
            <div className="flex flex-col items-start mb-2">
              <p>Full Name: {formData.Name}</p>
              <p>Phone Number: {formData.phone}</p>
              {action === "rent" && (
                <p>
                  Available Date for Rent:{" "}
                  {formData.availableDateforRent
                    ? new Date(
                        formData.availableDateforRent
                      ).toLocaleDateString()
                    : "Not set"}
                </p>
              )}
              <p>Tour Dates: {formData.selectedDates}</p>
            </div>
            <button
              onClick={() => navigateToEditStep(5)}
              className="text-sm md:text-base text-white bg-yellow-500 hover:bg-yellow-400 px-2 md:px-4 py-1 md:py-2 rounded"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    );
}

export default StepSixRE;
