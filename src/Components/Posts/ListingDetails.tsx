import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 
import telephone from '../../img/telephone.png'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import axios from "axios";
import { useParams } from "react-router-dom";
import { PostDetails } from "../../Types/postsDataTypes";

const ListingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [listings, setListings] = useState<PostDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorited, setIsFavorited] = useState(false); 

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/posts/${id}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setListings(response.data.data);
        setLoading(false);
      } catch (error: any) {
        setError(
          `Failed to fetch data: ${
            error.response ? error.response.data.message : error.message
          }`
        );
        setLoading(false);
      }
    };
    fetchPostDetails();
  }, [id]);
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!listings) return <div>No listing found.</div>;

  const images = listings.images || [];

  return (
    <div className="mx-auto px-4 md:px-8 max-w-screen-xl py-24">
      <header className="text-center mb-10">
        <h1 className="text-lg md:text-3xl font-bold text-black">
          Discover Your Dream Property
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mt-2">
          Now Available for {listings.action}!
        </p>
      </header>
      <div className="flex flex-col md:flex-row">
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          className="mySwiper w-1/2"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Listing ${index}`}
                className="w-full object-cover rounded-3xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="md:w-1/2 w-full md:ml-6 mt-4 p-4 bg-base-100 shadow-md rounded-3xl">
          <div className="flex flex-col mt-10 space-y-4">
            <p className="text-lg md:text-xl font-semibold text-black">
              {listings.propertyType} for {listings.action} - {listings.Country}
              , {listings.address}
            </p>
            <div className="text-base md:text-lg text-black">
              <strong>Description</strong>
              <div className="mt-1 whitespace-pre-line">
                {listings.description}
              </div>
            </div>
            <p className="text-base md:text-lg text-black">
              <strong>Available date to see the property</strong>
              <div className="mt-1 whitespace-pre-line">
                {listings.selectedDates}
              </div>
            </p>
            <p className="text-lg md:text-xl md:pt-20 pt-10 font-bold text-black">
              {listings.SalePrice} TND
            </p>
          </div>
          <button
            onClick={toggleFavorite}
            className="text-3xl text-red-500 absolute bottom-0 right-0  mr-10 mb-5 md:mb-32 md:mr-44"
          >
            {isFavorited ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>

      <div className=" flex md:flex-row flex-col justify-between mt-8 p-4 md:w-1/2 w-full border border-gray-200 rounded-xl">
        <div className="flex flex-row gap-4">
          <img src={telephone} alt="contact" className="w-16 h-16"/>
          <div>
            <p className="text-lg font-semibold">Contact Owner</p>
            <p>{listings.Name}</p>
            <p>
              <span>Phone Number</span>
              <div className="mt-1 whitespace-pre-line">{listings.phone}</div>
            </p>
          </div>
        </div>
        <button className="btn w-32 max-w-xs text-md rounded-xl px-2 bg-yellow-500 text-white hover:bg-yellow-400">
          Send message{" "}
        </button>
      </div>
    </div>
  );
};

export default ListingDetails;
