import React from 'react';
import { useNavigate } from 'react-router-dom';
import Autobg from '../../../img/Autobg.jpg';
import Autokey from '../../../img/Autokey.jpg'
import Filter from '../../../Components/Util/Filter';


const VehiculeHome: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="mx-auto px-4 md:px-8 max-w-screen-xl">
        <div className="relative md:min-h-[100vh] w-full">
          <img
            src={Autobg}
            className="w-full h-full md:h-[100vh] object-cover pt-16"
            alt="bg-image"
          />
        </div>

        <div className="flex justify-center items-center gap-8 sm:flex-row flex-col">
          <div className="card my-10 w-96 bg-base-100 shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <figure className="px-10 pt-10">
              <img src={Autokey} alt="car" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Buy a vehicle</h2>
              <p>
                Discover your ideal vehicle from our diverse collection, ranging
                from family cars to luxury sports models. With expert guidance
                and personalized support, enjoy a seamless buying experience.
              </p>
              <div className="card-actions">
                <button
                  onClick={() => navigate("/vehicles/posts-for-sell")}
                  className="btn bg-yellow-600 hover:bg-yellow-500 text-white"
                >
                  Browse vehicles
                </button>
              </div>
            </div>
          </div>

          <div className="card my-10 w-96 bg-base-100 shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <figure className="px-10 pt-10">
              <img src={Autokey} alt="car" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Sell a vehicle</h2>
              <p>
                Maximize your vehicle's sale price with our market expertise and
                buyer network. We streamline the sale for a smooth experience,
                connecting you with serious buyers for the best deal.
              </p>
              <div className="card-actions">
                <button
                  onClick={() => navigate("/addProperty")}
                  className="btn bg-yellow-600 hover:bg-yellow-500 text-white"
                >
                  See your options
                </button>
              </div>
            </div>
          </div>

          <div className="card my-14 w-96 bg-base-100 shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <figure className="px-10 pt-10">
              <img src={Autokey} alt="car" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Rent a vehicle</h2>
              <p>
                Discover the perfect ride for any occasion with our extensive
                selection of rental vehicles. Enjoy a complimentary test drive
                on us, ensuring your choice meets all your needs with our
                hassle-free, personalized service.
              </p>
              <div className="card-actions">
                <button
                  onClick={() => navigate("/vehicles/posts-for-rent")}
                  className="btn bg-yellow-600 hover:bg-yellow-500 text-white"
                >
                  Find rentals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehiculeHome