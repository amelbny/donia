import React, {useState, useEffect} from 'react'
import { useFormContext } from "react-hook-form";
import AvailabilitySelector from '../../Util/AvailabilitySelector';

interface StepFive {
    Name: string
    availableDateforRent: string;
    phone: string
}

interface StepFiveProps {
    isForRent: boolean
}


const StepFive: React.FC<StepFiveProps> = ({ isForRent }) => {

  const { register, formState: { errors } } = useFormContext<StepFive>();
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="text-xl md:text-2xl font-semibold text-black my-4 pb-1 block text-start">
        Who's listing this property for sell?
      </span>
      <p>
        Enter your information, unless you're creating the listing for someone
        else and they should be the main contact person.
      </p>

      <div className="form-control w-full max-w-xs mt-4">
        <div className="label">
          <span className="label-text font-semibold text-xl">Full Name</span>
        </div>
        <div className="relative">
          <input
            {...register("Name", { required: "Full Name is required" })}
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
          />
          {errors.Name && <p className="text-red-500">{errors.Name.message}</p>}
        </div>
      </div>

      <div className="form-control w-full max-w-xs mt-4">
        <div className="label">
          <span className="label-text font-semibold text-xl">Phone Number</span>
        </div>
        <div className="relative">
          <input
            {...register("phone", { required: "Phone Number is required" })}
            type="tel"
            placeholder="+216 25 304 606"
            className="input input-bordered w-full"
          />
        </div>
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>

      {isForRent && (
        <label className="form-control w-full max-w-xs mt-4">
          <h3 className="font-semibold text-xl my-4 whitespace-nowrap">
            When is the property available for rent?
          </h3>
          <div className="relative">
            <input
              {...register("availableDateforRent", {
                required: "Available date is required",
              })}
              type="date"
              className="input input-bordered w-full pr-16"
            />
            {errors.availableDateforRent && (
              <p className="text-red-500">
                {errors.availableDateforRent.message}
              </p>
            )}
          </div>
        </label>
      )}

      <div className="mt-6">
        <AvailabilitySelector />
      </div>
    </div>
  );
}

export default StepFive