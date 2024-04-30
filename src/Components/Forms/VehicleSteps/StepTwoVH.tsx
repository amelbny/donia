import React, { useEffect, useState } from 'react';
import { useFormContext } from "react-hook-form";
import { brandsWithModels } from '../../../Types/FormTypes';
import { MyFormData,VHproportyTypeEnum, ColorEnum, ConditionEnum, TransmissionEnum, BodyTypeEnum, FuelEnum, TruckTypesEnum, AutreTypeEnum } from '../../../Types/FormTypes';






const StepTwoVH: React.FC = () => {
  
    const { register, watch, formState: { errors }, setValue } = useFormContext<MyFormData>();

    const selectedVehiculeType = watch("propertyType");
    const selectedBrand = watch("Marque");
    const selectedTruckType = watch("TruckType");
    const selectedOther = watch("OtherType")


    const [models, setModels] = useState<string[]>([]);

    useEffect (()=> {
      if (selectedBrand) {
        const modelsForBrand = brandsWithModels[selectedBrand] || [];
        setModels(modelsForBrand);
        setValue("Model","");
      }
    }, [selectedBrand, setValue]
    );

    const MotodisplacementOptions = [];
    for (let i = 50; i<=2500; i += 50) {
      MotodisplacementOptions.push(<option key={i} value={i}>{i} cc</option>)
    }

    const VehicleDisplacementOptions = [];
    for (let i = 1.0; i <= 4.0; i += 0.1) {
      const value = i.toFixed(1); 
      VehicleDisplacementOptions.push(<option key={value} value={value}>{`${value} L`}</option>);
    }

    const getYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const YearOptions = [];
        for (let i = 1980; i<= currentYear; i +=1) {
          YearOptions.push(<option key={i} value={i}> {i} </option>)
        }
        return YearOptions;
    };
    

  return (
    <div>
      <div className="flex justify-center items-center mb-16">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold text-xl py-2">
              Vehicle types
            </span>
          </div>
          <select
            className="select select-bordered"
            {...register("propertyType", {
              required: "Vehicle Type is required",
            })}
          >
            <option value="">Pick one</option>
            <option value={VHproportyTypeEnum.Vehicle}>Vehicle</option>
            <option value={VHproportyTypeEnum.Truck}>Truck</option>
            <option value={VHproportyTypeEnum.Motos}>Motos</option>
            <option value={VHproportyTypeEnum.Other}>Other</option>
          </select>
          {errors.propertyType && (
            <p className="text-red-500">{errors.propertyType.message}</p>
          )}
        </label>
      </div>

      {selectedVehiculeType === VHproportyTypeEnum.Motos && (
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">
                  Mileage
                </span>
              </div>
              <input
                {...register("Mileage", { required: "Mileage is required" })}
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.Mileage && (
                <p className="text-red-500">{errors.Mileage.message}</p>
              )}
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">
                  Vehicle color
                </span>
              </div>
              <select
                className="select select-bordered"
                {...register("Color", {
                  required: "Vehicle color is required",
                })}
              >
                <option value="">Pick one</option>
                <option value={ColorEnum.Blue}>Blue</option>
                <option value={ColorEnum.White}>White</option>
                <option value={ColorEnum.Black}>Black</option>
                <option value={ColorEnum.Red}>Red</option>
                <option value={ColorEnum.Green}>Green</option>
                <option value={ColorEnum.Other}>Other</option>
              </select>
              {errors.Color && (
                <p className="text-red-500">{errors.Color.message}</p>
              )}
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">
                  Vehicle condition
                </span>
              </div>
              <select
                className="select select-bordered"
                {...register("Condition", {
                  required: "Vehicle condition is required",
                })}
              >
                <option value="">Pick one</option>
                <option value={ConditionEnum.Nouveau}>Nouveau</option>
                <option value={ConditionEnum.WithMileage}>With Mileage</option>
                <option value={ConditionEnum.Unpaid}>Unpaid</option>
                <option value={ConditionEnum.RS}>RS</option>
                <option value={ConditionEnum.MissingPieces}>
                  Missing Pieces
                </option>
              </select>
              {errors.Condition && (
                <p className="text-red-500">{errors.Condition.message}</p>
              )}
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">
                  Vehicle transmission
                </span>
              </div>
              <select
                className="select select-bordered"
                {...register("Transmission", {
                  required: "Vehicle transmission is required",
                })}
              >
                <option value="">Pick one</option>
                <option value={TransmissionEnum.Automatic}>Automatic</option>
                <option value={TransmissionEnum.Manual}>Manual</option>
                <option value={TransmissionEnum.SemiAutomatic}>
                  Semi-automatic
                </option>
              </select>
              {errors.Transmission && (
                <p className="text-red-500">{errors.Transmission.message}</p>
              )}
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">
                  Displacement
                </span>
              </div>
              <select
                className="select select-bordered"
                {...register("displacementMoto", {
                  required: "Displacement is required",
                })}
              >
                <option value="">Pick one</option>
                {MotodisplacementOptions}
              </select>
              {errors.displacementMoto && (
                <p className="text-red-500">
                  {errors.displacementMoto.message}
                </p>
              )}
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">Year</span>
              </div>
              <select
                className="select select-bordered"
                {...register("Year", { required: "Year is required" })}
              >
                <option value="">Pick one</option>
                {getYearOptions()}
              </select>
              {errors.Year && (
                <p className="text-red-500">{errors.Year.message}</p>
              )}
            </label>
          </div>
        </div>
      )}

      {selectedVehiculeType === VHproportyTypeEnum.Vehicle && (
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">
                  Mileage
                </span>
              </div>
              <input
                {...register("Mileage", { required: "Mileage is required" })}
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.Mileage && (
                <p className="text-red-500">{errors.Mileage.message}</p>
              )}
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">
                  Vehicle color
                </span>
              </div>
              <select
                className="select select-bordered"
                {...register("Color", {
                  required: "Vehicle color is required",
                })}
              >
                <option value="">Pick one</option>
                <option value={ColorEnum.Blue}>Blue</option>
                <option value={ColorEnum.White}>White</option>
                <option value={ColorEnum.Black}>Black</option>
                <option value={ColorEnum.Red}>Red</option>
                <option value={ColorEnum.Green}>Green</option>
                <option value={ColorEnum.Other}>Other</option>
              </select>
              {errors.Color && (
                <p className="text-red-500">{errors.Color.message}</p>
              )}
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">
                  Vehicle condition
                </span>
              </div>
              <select
                className="select select-bordered"
                {...register("Condition", {
                  required: "Vehicle condition is required",
                })}
              >
                <option value="">Pick one</option>
                <option value={ConditionEnum.Nouveau}>Nouveau</option>
                <option value={ConditionEnum.WithMileage}>With Mileage</option>
                <option value={ConditionEnum.Unpaid}>Unpaid</option>
                <option value={ConditionEnum.RS}>RS</option>
                <option value={ConditionEnum.MissingPieces}>
                  Missing Pieces
                </option>
              </select>
              {errors.Condition && (
                <p className="text-red-500">{errors.Condition.message}</p>
              )}
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">
                  Vehicle transmission
                </span>
              </div>
              <select
                className="select select-bordered"
                {...register("Transmission", {
                  required: "Vehicle transmission is required",
                })}
              >
                <option value="">Pick one</option>
                <option value={TransmissionEnum.Automatic}>Automatic</option>
                <option value={TransmissionEnum.Manual}>Manual</option>
                <option value={TransmissionEnum.SemiAutomatic}>
                  Semi-automatic
                </option>
              </select>
              {errors.Transmission && (
                <p className="text-red-500">{errors.Transmission.message}</p>
              )}
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">
                  Displacement
                </span>
              </div>
              <select
                className="select select-bordered"
                {...register("Vehiculedisplacement", {
                  required: "Displacement is required",
                })}
              >
                <option value="">Pick one</option>
                <option value="below">{"<0.1 L"}</option>
                {VehicleDisplacementOptions}
                <option value="above">{">4.0 L"}</option>
              </select>
              {errors.Vehiculedisplacement && (
                <p className="text-red-500">
                  {errors.Vehiculedisplacement.message}
                </p>
              )}
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">Year</span>
              </div>
              <select
                className="select select-bordered"
                {...register("Year", { required: "Year is required" })}
              >
                <option value="">Pick one</option>
                {getYearOptions()}
              </select>
              {errors.Year && (
                <p className="text-red-500">{errors.Year.message}</p>
              )}
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">
                  Marque
                </span>
              </div>
              <select
                className="select select-bordered"
                {...register("Marque", { required: "Marque is required" })}
              >
                <option value="">Pick one</option>
                {Object.keys(brandsWithModels).map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              {errors.Marque && (
                <p className="text-red-500">{errors.Marque.message}</p>
              )}
            </label>

            {selectedBrand && (
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-bold text-xl py-2">
                    Model
                  </span>
                </div>
                <select
                  className="select select-bordered"
                  {...register("Model", { required: "Model is required" })}
                >
                  <option value="">Pick one</option>
                  {models.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
                {errors.Model && (
                  <p className="text-red-500">{errors.Model.message}</p>
                )}
              </label>
            )}

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">
                  Fiscal power
                </span>
              </div>
              <input
                {...register("FiscalPower", {
                  required: "Fiscal power is required",
                })}
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.FiscalPower && (
                <p className="text-red-500">{errors.FiscalPower.message}</p>
              )}
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">
                  Body type
                </span>
              </div>
              <select
                className="select select-bordered"
                {...register("BodyType", {
                  required: "Body type condition is required",
                })}
              >
                <option value="">Pick one</option>
                <option value={BodyTypeEnum.Compacte}>Compacte</option>
                <option value={BodyTypeEnum.Berline}>Berline</option>
                <option value={BodyTypeEnum.Cabriolet}>Cabriolet</option>
                <option value={BodyTypeEnum.X4}>4 x 4</option>
                <option value={BodyTypeEnum.Monospace}>Monospace</option>
                <option value={BodyTypeEnum.Utilitaire}>Utilitaire</option>
                <option value={BodyTypeEnum.PickUp}>Pick up</option>
                <option value={BodyTypeEnum.Other}>Other</option>
              </select>
              {errors.BodyType && (
                <p className="text-red-500">{errors.BodyType.message}</p>
              )}
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">Fuel</span>
              </div>
              <select
                className="select select-bordered"
                {...register("Fuel", { required: "Fuel is required" })}
              >
                <option value="">Pick one</option>
                <option value={FuelEnum.Essence}>Essence</option>
                <option value={FuelEnum.Diesel}>Diesel</option>
                <option value={FuelEnum.Hybride}>Hybride</option>
                <option value={FuelEnum.Electric}>Electric</option>
              </select>
              {errors.Fuel && (
                <p className="text-red-500">{errors.Fuel.message}</p>
              )}
            </label>
          </div>
        </div>
      )}

      {selectedVehiculeType === VHproportyTypeEnum.Truck && (
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <label className="form-control w-full max-w-xs mb-8">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">
                  Sub-type
                </span>
              </div>
              <select
                className="select select-bordered"
                {...register("TruckType", {
                  required: "Truck Types is required",
                })}
              >
                <option value="">Pick one</option>
                <option value={TruckTypesEnum.Bus}>Bus</option>
                <option value={TruckTypesEnum.Truck}>Truck</option>
                <option value={TruckTypesEnum.SemiTrailerTruck}>
                  Semi-Trailer Truck
                </option>
              </select>
              {errors.TruckType && (
                <p className="text-red-500">{errors.TruckType.message}</p>
              )}
            </label>

            {["Bus", "Truck", "SemiTrailerTruck"].includes(
              selectedTruckType ?? ""
            ) && (
              <div className="flex justify-center items-center">
                <div className="flex flex-wrap justify-center items-center gap-4">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-bold text-xl py-2">
                        Marque
                      </span>
                    </div>
                    <select
                      className="select select-bordered"
                      {...register("Marque", {
                        required: "Marque is required",
                      })}
                    >
                      <option value="">Pick one</option>
                      {Object.keys(brandsWithModels).map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                    {errors.Marque && (
                      <p className="text-red-500">{errors.Marque.message}</p>
                    )}
                  </label>

                  {selectedBrand && (
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text font-bold text-xl py-2">
                          Model
                        </span>
                      </div>
                      <select
                        className="select select-bordered"
                        {...register("Model", {
                          required: "Model is required",
                        })}
                      >
                        <option value="">Pick one</option>
                        {models.map((model) => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                      {errors.Model && (
                        <p className="text-red-500">{errors.Model.message}</p>
                      )}
                    </label>
                  )}

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-bold text-xl py-2">
                        Mileage
                      </span>
                    </div>
                    <input
                      {...register("Mileage", {
                        required: "Mileage is required",
                      })}
                      type="number"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                    />
                    {errors.Mileage && (
                      <p className="text-red-500">{errors.Mileage.message}</p>
                    )}
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-bold text-xl py-2">
                        Vehicle condition
                      </span>
                    </div>
                    <select
                      className="select select-bordered"
                      {...register("Condition", {
                        required: "Vehicle condition is required",
                      })}
                    >
                      <option value="">Pick one</option>
                      <option value={ConditionEnum.Nouveau}>Nouveau</option>
                      <option value={ConditionEnum.WithMileage}>
                        With Mileage
                      </option>
                      <option value={ConditionEnum.Unpaid}>Unpaid</option>
                      <option value={ConditionEnum.RS}>RS</option>
                      <option value={ConditionEnum.MissingPieces}>
                        Missing Pieces
                      </option>
                    </select>
                    {errors.Condition && (
                      <p className="text-red-500">{errors.Condition.message}</p>
                    )}
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-bold text-xl py-2">
                        Vehicle transmission
                      </span>
                    </div>
                    <select
                      className="select select-bordered"
                      {...register("Transmission", {
                        required: "Vehicle transmission is required",
                      })}
                    >
                      <option value="">Pick one</option>
                      <option value={TransmissionEnum.Automatic}>
                        Automatic
                      </option>
                      <option value={TransmissionEnum.Manual}>Manual</option>
                      <option value={TransmissionEnum.SemiAutomatic}>
                        Semi-automatic
                      </option>
                    </select>
                    {errors.Transmission && (
                      <p className="text-red-500">
                        {errors.Transmission.message}
                      </p>
                    )}
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-bold text-xl py-2">
                        Vehicle color
                      </span>
                    </div>
                    <select
                      className="select select-bordered"
                      {...register("Color", {
                        required: "Vehicle color is required",
                      })}
                    >
                      <option value="">Pick one</option>
                      <option value={ColorEnum.Blue}>Blue</option>
                      <option value={ColorEnum.White}>White</option>
                      <option value={ColorEnum.Black}>Black</option>
                      <option value={ColorEnum.Red}>Red</option>
                      <option value={ColorEnum.Green}>Green</option>
                      <option value={ColorEnum.Other}>Other</option>
                    </select>
                    {errors.Color && (
                      <p className="text-red-500">{errors.Color.message}</p>
                    )}
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-bold text-xl py-2">
                        Fuel
                      </span>
                    </div>
                    <select
                      className="select select-bordered"
                      {...register("Fuel", { required: "Fuel is required" })}
                    >
                      <option value="">Pick one</option>
                      <option value={FuelEnum.Essence}>Essence</option>
                      <option value={FuelEnum.Diesel}>Diesel</option>
                      <option value={FuelEnum.Hybride}>Hybride</option>
                      <option value={FuelEnum.Electric}>Electric</option>
                    </select>
                    {errors.Fuel && (
                      <p className="text-red-500">{errors.Fuel.message}</p>
                    )}
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-bold text-xl py-2">
                        Year
                      </span>
                    </div>
                    <select
                      className="select select-bordered"
                      {...register("Year", { required: "Year is required" })}
                    >
                      <option value="">Pick one</option>
                      {getYearOptions()}
                    </select>
                    {errors.Year && (
                      <p className="text-red-500">{errors.Year.message}</p>
                    )}
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedVehiculeType === VHproportyTypeEnum.Other && (
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <label className="form-control w-full max-w-xs mb-8">
              <div className="label">
                <span className="label-text font-bold text-xl py-2">
                  Sub-type
                </span>
              </div>
              <select
                className="select select-bordered"
                {...register("OtherType", {
                  required: " Other Type is required",
                })}
              >
                <option value="">Pick one</option>
                <option value={AutreTypeEnum.Forklift}>Forklift</option>
                <option value={AutreTypeEnum.ConstructionMachine}>
                  Construction Machine
                </option>
                <option value={AutreTypeEnum.Trailer}>Trailer</option>
                <option value={AutreTypeEnum.AgriculturalVehicle}>
                  Agricultural Vehicule
                </option>
              </select>
              {errors.OtherType && (
                <p className="text-red-500">{errors.OtherType.message}</p>
              )}
            </label>

            {[
              "Forklift",
              "ConstructionMachine",
              "Trailer",
              "AgriculturalVehicle",
            ].includes(selectedOther ?? "") && (
              <div className="flex flex-wrap justify-center items-center gap-4">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text font-bold text-xl py-2">
                      Marque
                    </span>
                  </div>
                  <select
                    className="select select-bordered"
                    {...register("Marque", { required: "Marque is required" })}
                  >
                    <option value="">Pick one</option>
                    {Object.keys(brandsWithModels).map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  {errors.Marque && (
                    <p className="text-red-500">{errors.Marque.message}</p>
                  )}
                </label>

                {selectedBrand && (
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-bold text-xl py-2">
                        Model
                      </span>
                    </div>
                    <select
                      className="select select-bordered"
                      {...register("Model", { required: "Model is required" })}
                    >
                      <option value="">Pick one</option>
                      {models.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                    {errors.Model && (
                      <p className="text-red-500">{errors.Model.message}</p>
                    )}
                  </label>
                )}

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text font-bold text-xl py-2">
                      Vehicle condition
                    </span>
                  </div>
                  <select
                    className="select select-bordered"
                    {...register("Condition", {
                      required: "Vehicle condition is required",
                    })}
                  >
                    <option value="">Pick one</option>
                    <option value={ConditionEnum.Nouveau}>Nouveau</option>
                    <option value={ConditionEnum.WithMileage}>
                      With Mileage
                    </option>
                    <option value={ConditionEnum.Unpaid}>Unpaid</option>
                    <option value={ConditionEnum.RS}>RS</option>
                    <option value={ConditionEnum.MissingPieces}>
                      Missing Pieces
                    </option>
                  </select>
                  {errors.Condition && (
                    <p className="text-red-500">{errors.Condition.message}</p>
                  )}
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text font-bold text-xl py-2">
                      Vehicle color
                    </span>
                  </div>
                  <select
                    className="select select-bordered"
                    {...register("Color", {
                      required: "Vehicle color is required",
                    })}
                  >
                    <option value="">Pick one</option>
                    <option value={ColorEnum.Blue}>Blue</option>
                    <option value={ColorEnum.White}>White</option>
                    <option value={ColorEnum.Black}>Black</option>
                    <option value={ColorEnum.Red}>Red</option>
                    <option value={ColorEnum.Green}>Green</option>
                    <option value={ColorEnum.Other}>Other</option>
                  </select>
                  {errors.Color && (
                    <p className="text-red-500">{errors.Color.message}</p>
                  )}
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text font-bold text-xl py-2">
                      Fuel
                    </span>
                  </div>
                  <select
                    className="select select-bordered"
                    {...register("Fuel", { required: "Fuel is required" })}
                  >
                    <option value="">Pick one</option>
                    <option value={FuelEnum.Essence}>Essence</option>
                    <option value={FuelEnum.Diesel}>Diesel</option>
                    <option value={FuelEnum.Hybride}>Hybride</option>
                    <option value={FuelEnum.Electric}>Electric</option>
                  </select>
                  {errors.Fuel && (
                    <p className="text-red-500">{errors.Fuel.message}</p>
                  )}
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text font-bold text-xl py-2">
                      Year
                    </span>
                  </div>
                  <select
                    className="select select-bordered"
                    {...register("Year", { required: "Year is required" })}
                  >
                    <option value="">Pick one</option>
                    {getYearOptions()}
                  </select>
                  {errors.Year && (
                    <p className="text-red-500">{errors.Year.message}</p>
                  )}
                </label>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StepTwoVH;
