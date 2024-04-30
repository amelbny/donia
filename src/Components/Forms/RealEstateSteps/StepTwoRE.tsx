import React from 'react'
import { useFormContext } from "react-hook-form";
import { MyFormData, REproportyTypeEnum } from '../../../Types/FormTypes';





const StepTwoRE: React.FC = () => {

    const { register, formState: { errors } } = useFormContext<MyFormData>();

  return (
    <div className='flex flex-col justify-center items-center'>

        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text font-bold text-xl py-2">Country</span>
            </div>
            <input {...register("Country", { required: "Country is required" })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            {errors.Country && <p className="text-red-500">{errors.Country.message}</p>}

        </label>

        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text font-bold text-xl py-2">Street address</span>
            </div>
            <input  {...register("address", { required: "Address is required" })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}

        </label>

        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text font-bold text-xl py-2">Property type</span>
            </div>
            <select className="select select-bordered" {...register("propertyType", { required: "Property Type is required" })}>
                <option disabled selected value="pickOne">Pick one</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Office">Office</option>
                <option value="Building">Building</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Shop">Shop</option>
                <option value="Garage">Garage</option>
            </select>
            {errors.propertyType && <p className="text-red-500">{errors.propertyType.message}</p>}

        </label>
    </div>
  )
}

export default StepTwoRE