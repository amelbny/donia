import React from 'react';
import { useFormContext } from "react-hook-form";

interface StepThreeFields {
  Country: string
  address: string;
  SalePrice?: string; 
  RentPrice?: string;
  description: string;
}

interface StepThreeProps {
    isForRent: boolean;
}

const StepThreeVH: React.FC<StepThreeProps> = ({ isForRent }) => {        
    const { register, formState: { errors } } = useFormContext<StepThreeFields>();

    return (
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold text-xl py-2">Country</span>
          </div>
          <input
            {...register("Country", { required: "Country is required" })}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          {errors.Country && (
            <p className="text-red-500">{errors.Country.message}</p>
          )}
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold text-xl py-2">Address</span>
          </div>
          <div className="relative">
            <input
              {...register("address", { required: "Address is required" })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full pr-16"
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>
        </label>

        {!isForRent ? (
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold text-xl py-2">Price</span>
            </div>
            <div className="relative">
              <input
                {...register("SalePrice", { required: "Price is required" })}
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full pr-16"
              />
              <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                TND
              </span>
              {errors.SalePrice && (
                <p className="text-red-500">{errors.SalePrice.message}</p>
              )}
            </div>
          </label>
        ) : (
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold text-xl py-2">
                Rent Price
              </span>
            </div>
            <div className="relative">
              <input
                {...register("RentPrice", {
                  required: "Rent price is required",
                })}
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full pr-16"
              />
              <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                TND
              </span>
              {errors.RentPrice && (
                <p className="text-red-500">{errors.RentPrice.message}</p>
              )}
            </div>
          </label>
        )}

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-xl py-2">
              Proporty description
            </span>
          </div>
          <textarea
            {...register("description", {
              required: "description is required",
            })}
            className="textarea textarea-bordered h-32 w-80"
            placeholder="Example: Please describe the vehicle: Equipped with a navigation system, backup camera, and heated seats for a comfortable drive. 
                            Regularly serviced with a recent oil change and new tires. Ideal for both city and highway driving."
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </label>
      </div>
    );
}

export default StepThreeVH;
