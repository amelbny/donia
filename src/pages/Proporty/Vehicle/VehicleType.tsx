import React from 'react';
import {Link} from 'react-router-dom';
import car from '../../../img/Car.png'
import BigCar from '../../../img/BigCar.png'




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
    name: "Vehicle",
    icon: car,
    propertiesCount: 123,
    path: "/property/vehicle/type/Vehicle",
  },
  {
    id: 2,
    name: "Moto",
    icon: car,
    propertiesCount: 123,
    path: "/property/vehicle/type/Motos",
  },
  {
    id: 3,
    name: "Truck",
    icon: BigCar,
    propertiesCount: 123,
    path: "/property/vehicle/type/Truck",
  },
  {
    id: 4,
    name: "Other",
    icon: BigCar,
    propertiesCount: 123,
    path: "/property/vehicle/type/other",
  },
];

const VehiculeType: React.FC = () => {
    


  return (
    <div className="mx-auto px-4  md:px-8 max-w-screen-xl">
        <div className="text-center text-pretty	 pt-10 mx-auto mb-5" style={{ maxWidth: '600px' }}>
            <h1 className="text-4xl font-bold pt-16 pb-8">Vehicule Property Types</h1>
            <p className="text-gray-800 pb-4">
                From cozy apartments to luxury villas, find your perfect property match for living or investment.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center lg:grid-cols-2 gap-4 mb-16">
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
        
    );
};

export default VehiculeType;
