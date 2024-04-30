import homebg from '../../../img/homebg.jpg';
import home from '../../../img/home.jpg';


import Filter from '../../../Components/Util/Filter';
import { useNavigate } from 'react-router-dom';

const RealEstateHome: React.FC = () => {
  
  const navigate = useNavigate()

  return (
    <div>
      <div className="mx-auto px-4 md:px-8 max-w-screen-xl">
        <div className="relative md:min-h-[100vh] w-full">
          <img
            src={homebg}
            className="w-full h-full md:h-[100vh] object-cover pt-16"
            alt="bg-image"
          />
        </div>

        <div className="flex justify-center items-center gap-8 sm:flex-row flex-col">
          <div className="card my-10 w-96 bg-base-100 shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <figure className="px-10 pt-10">
              <img src={home} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Buy a home</h2>
              <p>
                Discover your perfect home with our comprehensive listings and
                expert advice.
              </p>
              <div className="card-actions">
                <button
                  onClick={() => navigate("/real-estate/posts-for-sell")}
                  className="btn bg-yellow-600 hover:bg-yellow-500 text-white"
                >
                  Browse homes
                </button>
              </div>
            </div>
          </div>

          <div className="card my-10 w-96 bg-base-100 shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <figure className="px-10 pt-10">
              <img src={home} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Sell a home</h2>
              <p>
                Boost your sale with our expertise for smooth sailing to your
                goals.
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
              <img src={home} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Rent a home</h2>
              <p>
                Find your ideal home effortlessly with our curated listings and
                personalized support.
              </p>
              <div className="card-actions">
                <button
                  onClick={() => navigate("/real-estate/posts-for-rent")}
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

export default RealEstateHome;
