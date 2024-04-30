import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { useForm} from "react-hook-form";
import { FormProvider } from 'react-hook-form';
import { axiosPrivate } from '../api/axios';


import { MyFormData, CategoryType, StepConfig, stepTitles, realEstateStepsConfig, VehicleStepsConfig } from '../Types/FormTypes';

import StepFour from '../Components/Forms/CommonSteps/StepFour';
import StepFive from '../Components/Forms/CommonSteps/StepFive';
import StepSixRE from '../Components/Forms/RealEstateSteps/StepSixRE';

import StepTwoVH from '../Components/Forms/VehicleSteps/StepTwoVH';
import StepThreeVH from '../Components/Forms/VehicleSteps/StepThreeVH';
import StepSixVH from '../Components/Forms/VehicleSteps/StepSixVH';
import StepOne from '../Components/Forms/CommonSteps/StepOne';
import StepTwoRE from '../Components/Forms/RealEstateSteps/StepTwoRE';
import StepThreeRE from '../Components/Forms/RealEstateSteps/StepThreeRE';



const AddProporty: React.FC = () => {
      
  const [currentStepsConfig, setCurrentStepsConfig] = useState<StepConfig[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);


  const [modalMessage, setModalMessage] = useState('');
  const [modalStatus, setModalStatus] = useState('success');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();


 
  const methods = useForm<MyFormData>({
    mode: "all",
    
  });
  const { watch, trigger, reset } = methods;

  const category = watch("category");
  const action = watch("action");


 


  useEffect(() => {
    const updateStepsConfig = (category: CategoryType) => {
      if (category === 'realEstate') {
        setCurrentStepsConfig(realEstateStepsConfig);
      } else if (category === 'vehicle') {
        setCurrentStepsConfig(VehicleStepsConfig);
      } else {
        setCurrentStepsConfig([]);
      }
    };

    updateStepsConfig(category);
    setCurrentStep(1);
  }, [category]);

  const navigateToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  }

   
  const goToNextStep = async () => {
    const isStepValid = await trigger(); 
    if (isStepValid) {
      if (currentStep < stepTitles.length) { 
        setCurrentStep(currentStep + 1); 
      } else {
        console.log("Submit the form");
      }

    } else {
      console.error("Current step is invalid. Please correct the errors before proceeding.");
    }
  };



  const goToPreviousStep = () => {
    
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    
  };

  



 const onSubmit = async (data: MyFormData) => {

   console.log("Submitting Data:", data);

   try {
     const response = await axiosPrivate.post( "http://localhost:3000/api/v1/posts/", data);
     console.log(response.data);
     setCurrentStep(6);
     reset();
     setModalMessage("Form submitted successfully!");
     setModalStatus("success");
     setIsModalOpen(true);
     setTimeout(() => {
       navigate("/");
     }, 3000);
   } catch (error) {
     if (axios.isAxiosError(error)) {
       console.log("Error data:", error.response?.data);
     }
     setModalMessage("An error occurred during form submission.");
     setModalStatus("error");
     setIsModalOpen(true);
   }
 };




  return (
    <div className="mx-auto px-4 md:px-8 max-w-screen-xl md:px-0 w-full pt-32">
      <div className="pb-10">
        <ul className="steps steps-vertical lg:steps-horizontal w-full">
          {stepTitles.map((title, index) => (
            <li
              key={index}
              className={`step  ${currentStep > index ? "step-warning" : ""}`}
            >
              <div className="text-center">{title}</div>
            </li>
          ))}
        </ul>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="p-4 flex  justify-center items-center">
            {currentStep >= 1 && (
              <section className={currentStep === 1 ? "block" : "hidden"}>
                <StepOne />
              </section>
            )}

            {currentStep >= 2 &&
              category === "realEstate" &&
              action === "sell" && (
                <section className={currentStep === 2 ? "block" : "hidden"}>
                  <StepTwoRE />
                </section>
              )}

            {currentStep >= 2 &&
              category === "realEstate" &&
              action === "rent" && (
                <section className={currentStep === 2 ? "block" : "hidden"}>
                  <StepTwoRE />
                </section>
              )}

            {currentStep >= 2 &&
              category === "vehicle" &&
              (action === "sell" || action === "rent") && (
                <section className={currentStep === 2 ? "block" : "hidden"}>
                  <StepTwoVH />
                </section>
              )}

            {currentStep >= 3 &&
              category === "realEstate" &&
              action === "sell" && (
                <section className={currentStep === 3 ? "block" : "hidden"}>
                  <StepThreeRE isForRent={false} />
                </section>
              )}
            {currentStep >= 3 &&
              category === "realEstate" &&
              action === "rent" && (
                <section className={currentStep === 3 ? "block" : "hidden"}>
                  <StepThreeRE isForRent={true} />
                </section>
              )}

            {currentStep >= 3 &&
              category === "vehicle" &&
              action === "sell" && (
                <section className={currentStep === 3 ? "block" : "hidden"}>
                  <StepThreeVH isForRent={false} />
                </section>
              )}

            {currentStep >= 3 &&
              category === "vehicle" &&
              action === "rent" && (
                <section className={currentStep === 3 ? "block" : "hidden"}>
                  <StepThreeVH isForRent={true} />
                </section>
              )}

            {currentStep >= 4 &&
              category === "realEstate" &&
              (action === "sell" || action === "rent") && (
                <section className={currentStep === 4 ? "block" : "hidden"}>
                  <StepFour />
                </section>
              )}

            {currentStep >= 4 &&
              category === "vehicle" &&
              (action === "sell" || action === "rent") && (
                <section className={currentStep === 4 ? "block" : "hidden"}>
                  <StepFour />
                </section>
              )}

            {currentStep >= 5 &&
              category === "realEstate" &&
              action === "sell" && (
                <section className={currentStep === 5 ? "block" : "hidden"}>
                  <StepFive isForRent={false} />
                </section>
              )}
            {currentStep >= 5 &&
              category === "realEstate" &&
              action === "rent" && (
                <section className={currentStep === 5 ? "block" : "hidden"}>
                  <StepFive isForRent={true} />
                </section>
              )}

            {currentStep >= 5 &&
              category === "vehicle" &&
              action === "sell" && (
                <section className={currentStep === 5 ? "block" : "hidden"}>
                  <StepFive isForRent={false} />
                </section>
              )}
            {currentStep >= 5 &&
              category === "vehicle" &&
              action === "rent" && (
                <section className={currentStep === 5 ? "block" : "hidden"}>
                  <StepFive isForRent={true} />
                </section>
              )}

            {currentStep >= 6 &&
              category === "realEstate" &&
              (action === "sell" || action === "rent") && (
                <section className={currentStep === 6 ? "block" : "hidden"}>
                  <StepSixRE navigateToEditStep={navigateToStep} />
                </section>
              )}
            {currentStep >= 6 &&
              category === "vehicle" &&
              (action === "sell" || action === "rent") && (
                <section className={currentStep === 6 ? "block" : "hidden"}>
                  <StepSixVH navigateToEditStep={navigateToStep} />
                </section>
              )}
          </div>

          <div className="flex justify-between my-16 pl-16">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={goToPreviousStep}
                className="text-white btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-yellow-500 hover:bg-yellow-400"
              >
                Back
              </button>
            )}

            {currentStep < stepTitles.length && (
              <button
                type="button"
                onClick={goToNextStep}
                className="text-white btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-yellow-500 hover:bg-yellow-400"
              >
                Next
              </button>
            )}

            {currentStep === stepTitles.length && (
              <button
                type="submit"
                className="text-white btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-yellow-500 hover:bg-yellow-400"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </FormProvider>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
          <dialog
            open
            id="my_modal"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                {modalStatus === "success" ? "Success" : "Error"}
              </h3>
              <p className="py-4">{modalMessage}</p>
              <div className="modal-action">
                <button
                  className="text-white btn btn-xs sm:btn-sm md:btn-md  bg-yellow-500 hover:bg-yellow-400"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default AddProporty;