import React, { useState } from "react";
import axios from "axios";


interface FilterProps {
  setFilterParams: (params: {
    propertyType?: string;
    Country?: string;
    Space?: string;
    SalePrice?: string;
    category: string;
    action: string;
  }) => void;
}
const Filter: React.FC<FilterProps> = ({setFilterParams}) => {

  const [propertyType, setPropertyType] = useState("");
  const [Country, setCountry] = useState("");
  const [Space, setSpace] = useState('');
  const [SalePrice, setSalePrice] = useState("");

  const handleSearch = async () => {
    setFilterParams({
      propertyType,
      Country,
      Space,
      SalePrice,
      category: "realEstate",
      action: "sell",
    });
  };



  return (
    <div className="flex justify-center w-full p-4">
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-screen-lg">
        <div className="flex flex-col w-full sm:w-1/2 md:w-1/5 lg:w-1/6">
          <select
            className="select select-bordered w-full"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option disabled value="">
              Property types
            </option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
            <option value="Office">Office</option>
            <option value="Building">Building</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Shop">Shop</option>
            <option value="Garage">Garage</option>
          </select>
        </div>

        <div className="flex flex-col w-full sm:w-1/2 md:w-1/5 lg:w-1/6">
          <select
            className="select select-bordered w-full"
            value={Country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option disabled value="">
              Country
            </option>
            <option>Ariana</option>
            <option>Beja</option>
            <option>Ben Arous</option>
            <option>Bizerte</option>
            <option>Gabes</option>
            <option>Gafsa</option>
            <option>Jendouba</option>
            <option>Kairouan</option>
            <option>Kasserine</option>
            <option>Kebili</option>
            <option>Kef</option>
            <option>Mahdia</option>
            <option>Manouba</option>
            <option>Medenine</option>
            <option>Monastir</option>
            <option>Nabeul</option>
            <option>Sfax</option>
            <option>Sidi Bouzid</option>
            <option>Siliana</option>
            <option>Sousse</option>
            <option>Tataouine</option>
            <option>Tozeur</option>
            <option>Tunis</option>
            <option>Zaghouan</option>
          </select>
        </div>

        <div className="flex flex-col w-full sm:w-1/2 md:w-1/5 lg:w-1/6">
          <select
            className="select select-bordered w-full"
            value={Space}
            onChange={(e) => setSpace(e.target.value)}
          >
            <option disabled value="">
              Space
            </option>
            <option>Location 1</option>
            <option>Location 2</option>
          </select>
        </div>

        <div className="flex flex-col w-full sm:w-1/2 md:w-1/5 lg:w-1/6">
          <select
            className="select select-bordered w-full"
            value={SalePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          >
            <option disabled value="">
              price
            </option>
            <option>Location 1</option>
            <option>Location 2</option>
          </select>
        </div>

        <div className="flex flex-col w-full sm:w-1/2 md:w-1/5 lg:w-1/6">
          <button
            onClick={handleSearch}
            className="btn bg-yellow-500 hover:bg-yellow-400 border-0 text-white w-full"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
