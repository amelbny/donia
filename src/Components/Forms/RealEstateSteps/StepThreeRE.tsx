import React from 'react';
import { useFormContext } from "react-hook-form";

interface StepThreeFields {
  Space: string;
  SalePrice?: string; 
  RentPrice?: string;
  description: string;
}

interface StepThreeProps {
    isForRent: boolean;
}

const StepThreeRE: React.FC<StepThreeProps> = ({ isForRent }) => {        
    const { register, formState: { errors } } = useFormContext<StepThreeFields>();

    return (
        <div>
           <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text font-bold text-xl py-2">Space</span>
                </div>
                <div className="relative">
                    <input {...register("Space", { required: "Space is required" })} type="number" placeholder="Type here" className="input input-bordered w-full pr-16" />
                    <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        m²
                    </span>
                    {errors.Space && <p className="text-red-500">{errors.Space.message}</p>}
                </div>            
            </label>

            {!isForRent ? ( 
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text font-bold text-xl py-2">Price</span>
                    </div>
                    <div className="relative">
                        <input {...register("SalePrice", { required: "Price is required" })} type="number" placeholder="Type here" className="input input-bordered w-full pr-16" />
                        <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            TND
                        </span>
                        {errors.SalePrice && <p className="text-red-500">{errors.SalePrice.message}</p>}
                    </div>            
                </label>

            ):(
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text font-bold text-xl py-2">Monthly Rent Price</span>
                    </div>
                    <div className="relative">
                        <input {...register("RentPrice", { required: "Monthly rent price is required" })} type="number" placeholder="Type here" className="input input-bordered w-full pr-16" />
                        <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            TND
                        </span>
                        {errors.RentPrice && <p className="text-red-500">{errors.RentPrice.message}</p>}
                    </div>            
                </label>
            )}
            

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text font-bold text-xl py-2">Proporty description</span>
                </div>
                <textarea 
                    {...register("description", { required: "description is required" })}
                    className="textarea textarea-bordered h-32 w-80" 
                    placeholder="Example: Recently updated residence featuring modern appliances and fresh carpeting. 
                                Easy walking to public transit and a great neighborhood."
                />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </label>
        </div>
    );
}

export default StepThreeRE;
