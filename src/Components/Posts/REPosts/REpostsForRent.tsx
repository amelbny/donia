import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PostDetails } from "../../../Types/postsDataTypes";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const REPostsForRent: React.FC = () => {
  const [listings, setListings] = useState<PostDetails[]>([]);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const params = {
          category: "realEstate",
          action: "rent",
        };
        const response = await axios.get(
          "http://localhost:3000/api/v1/posts/all",
          { params }
        );
        console.log("API Response:", response.data);

        if (
          response.data &&
          response.data.data &&
          response.data.data.docs &&
          Array.isArray(response.data.data.docs)
        ) {
          setListings(response.data.data.docs);
          console.log("listing image:", listings);
        } else {
          throw new Error("Data received is not formatted correctly");
        }
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        console.error("Failed to fetch listings:", error.message);
      }
    };

    fetchListings();
  }, []);

  const handleCardClick = (_id: string): void => {
    console.log("Navigating with ID", _id);
    navigate(`/listing/${_id}`);
  };

  if (error) {
    return <div>Error fetching listings: {error}</div>;
  }

  return (
    <div className="flex flex-wrap items-center justify-center pt-20">
      {listings.map((listing) => (
        <div
          key={listing._id}
          className="card m-4 w-full md:w-1/2 lg:w-1/4 cursor-pointer"
          onClick={() => handleCardClick(listing._id)}
        >
          <div className="w-full">
            <Carousel showThumbs={false} showStatus={false} dynamicHeight>
              {Array.isArray(listing.images) && listing.images.length > 0 ? (
                listing.images.map((image, idx) => (
                  <div key={idx} className="carousel-image">
                    <img
                      src={image}
                      alt={`Slide ${idx}`}
                      className="object-cover rounded-2xl w-full h-40 md:h-64"
                    />
                  </div>
                ))
              ) : (
                [<p>No images available</p>]
              )}
            </Carousel>
          </div>
          <div className="card-body">
            <span className="card-title text-sm text-black">
              {listing.address}, {listing.Country}
            </span>
            <div className="flex flex-row text-sm text-gray-500 gap-1">
              <p>{listing.propertyType}</p>
              <p>{listing.Space} m²</p>
              <p className="text-black">
                <strong>{listing.RentPrice} TND</strong>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default REPostsForRent;
