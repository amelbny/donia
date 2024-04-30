import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostDetails } from "../../../Types/postsDataTypes";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const PropertyListing = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [listings, setListings] = useState<PostDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchListingsByType = async () => {
      try {
        console.log("property type:", type);
        const response = await axios.get(
          `http://localhost:3000/api/v1/posts/all`,
          {
            params: { propertyType: type },
          }
        );
        console.log("Api response for propertyType select:", response.data);
        if (
          response.data &&
          response.data.data &&
          response.data.data.docs &&
          Array.isArray(response.data.data.docs)
        ) {
          setListings(response.data.data.docs);
          setError(null);
        } else {
          throw new Error("Data received is not formatted correctly");
        }
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        console.error("Failed to fetch listings:", error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchListingsByType();
  }, [type]);

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <div>Error fetching listings: {error}</div>;
  }

  const handleCardClick = (_id: string): void => {
    console.log("Navigating with ID", _id);
    navigate(`/listing/${_id}`);
  };

  return (
    <div className="pt-24 text-center">
      <div className="pb-16">
        <h1 className="text-2xl font-semibold text-black pb-6">
          Your Gateway to Homeownership
        </h1>
        <p className="pb-8">Discover Properties that Align with Your Vision</p>
      </div>
      <div className="flex flex-wrap items-center justify-center">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="card m-2 p-2 md:w-1/5 cursor-pointer"
            onClick={() => handleCardClick(listing._id)}
          >
            <div className="w-full">
              <Carousel showThumbs={false} showStatus={false} dynamicHeight>
                {listing.images.map((image, idx) => (
                  <div key={idx} className="carousel-image">
                    <img
                      src={image}
                      alt={`Slide ${idx}`}
                      className="object-cover rounded-2xl w-full h-24 md:h-64"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="card-body p-2 flex">
              <span className="card-title text-sm text-black">
                {listing.address}, {listing.Country}
              </span>
              <div className="flex flex-col items-start text-sm text-gray-500 gap-1">
                <p>{listing.propertyType}</p>
                <p>{listing.Space} m²</p>
                <p className="text-black">
                  <strong>{listing.SalePrice} TND</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyListing;
