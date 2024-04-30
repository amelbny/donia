import { useFormContext } from "react-hook-form";
import { MyFormData } from "../../../Types/FormTypes";

const StepOne: React.FC = () => {
    const { register, formState: { errors } } = useFormContext<MyFormData>();

    return (
        <div> 
            <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text font-bold text-xl py-2">Category</span>
                    </div>
                    
                    <select 
                        {...register("category", { required: "Category is required" })}
                        className="select select-bordered"
                    >
                        <option value="">Pick one</option>
                        <option value="realEstate">Real estate</option>
                        <option value="vehicle">Vehicle</option>
                    </select>
                    
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}
            </label>

            <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-bold text-xl py-2">Transaction Type</span>
                    </div>
                    <select
                        {...register("action", { required: "Transaction Type is required" })}
                        className="select select-bordered"    
                    >
                        <option value="">Pick one</option>
                        <option value="sell">Sell</option>
                        <option value="rent">Rent</option>
                    </select>
                      
                    {errors.action && <p className="text-red-500">{errors.action.message}</p>}
            </label>
        </div>
    );
};

export default StepOne;
