import React from 'react';
import {Link} from 'react-router-dom';

import apartment from '../../../img/apartment.png'
import villa from '../../../img/villa.png'
import house from '../../../img/house.png'
import building1 from '../../../img/building1.png'
import garage from '../../../img/garage.png'
import townhouse from '../../../img/townhouse.png'
import office from '../../../img/office.png'
import sho4 from '../../../img/sho4.png'



type PropertyType = {
    id: number;
    name: string;
    icon: string;
    propertiesCount: number;
    path: string;
};

const propertyTypes: PropertyType[] = [
  {
    id: 1,
    name: "Apartment",
    icon: apartment,
    propertiesCount: 123,
    path: "/property/real-estate/type/apartment",
  },
  {
    id: 2,
    name: "Villa",
    icon: villa,
    propertiesCount: 123,
    path: "/property/real-estate/type/villa",
  },
  {
    id: 3,
    name: "Home",
    icon: house,
    propertiesCount: 123,
    path: "/property/real-estate/type/home",
  },
  {
    id: 4,
    name: "Office",
    icon: office,
    propertiesCount: 123,
    path: "/property/real-estate/type/office",
  },
  {
    id: 5,
    name: "Building",
    icon: building1,
    propertiesCount: 123,
    path: "/property/real-estate/type/building",
  },
  {
    id: 6,
    name: "Townhouse",
    icon: townhouse,
    propertiesCount: 123,
    path: "/property/real-estate/type/townhouse",
  },
  {
    id: 7,
    name: "Shop",
    icon: sho4,
    propertiesCount: 123,
    path: "/property/real-estate/type/shop",
  },
  {
    id: 8,
    name: "Garage",
    icon: garage,
    propertiesCount: 123,
    path: "/property/real-estate/type/garage",
  },
];

const RealEstateTypes: React.FC = () => {
    
  return (
    <div>
        <div className="mx-auto px-4  md:px-8 max-w-screen-xl">
            <div className="text-center text-pretty	 pt-10 mx-auto mb-5" style={{ maxWidth: '600px' }}>
                <h1 className="text-4xl font-bold pt-16 pb-8">Property Types</h1>
                <p className="text-gray-800 pb-4">
                    From cozy apartments to luxury villas, find your perfect property match for living or investment.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                {propertyTypes.map(({ id, name, icon, propertiesCount, path }) => (
                    <div key={id} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                        <Link  to={path} className="block bg-amber-300 text-center rounded p-3">
                            <div className="rounded p-4">
                                <div className="mb-3">
                                    <img className="mx-auto" src={icon} alt="Icon" />
                                </div>
                                <h6 className="text-lg font-semibold">{name}</h6>
                                <span>{propertiesCount} Properties</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </div>
 );
};

export default RealEstateTypes;
