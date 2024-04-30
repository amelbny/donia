 export const stepTitles = [
    "Category & Action",
    "Property Info",
    "Listing Details",
    "Media",
    "Final Details",
    "Review",
  ];
export enum REproportyTypeEnum {
  Apartment = "Apartment",
  Villa = "Villa",
  House = "House",
  Office = "Office",
  Building = "Building",
  Townhouse = "Townhouse",
  Shop = "Shop",
  Garage = "Garage",
}

export enum VHproportyTypeEnum {
  Motos = "Motos",
  Vehicle = "Vehicle",
  Truck = "Truck",
  Other = "Other",
}

export enum ColorEnum {
  Blue = "Blue",
  White = "White",
  Black = "Black",
  Red = "Red",
  Green = "Green",
  Other = "Other"
}

export enum ConditionEnum {
  Nouveau= "Nouveau",
  WithMileage= "With Mileage",
  Unpaid= "Unpaid",
  RS= "RS",
  MissingPieces= "Missing pieces"

}

export enum TransmissionEnum {
  Automatic= "Automatic",
  Manual= "Manual",
  SemiAutomatic = "Semi-automatic"
}

type BrandModels = { [brand: string]: string[] };

export const brandsWithModels: BrandModels = {
  Toyota: ["Corolla", "Camry", "RAV4", "Highlander", "Prius", "Hilux"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "Fit", "HR-V"],
  Ford: ["Fiesta", "Focus", "Mustang", "Explorer", "F-150", "Ranger"],
  Chevrolet: ["Silverado", "Malibu", "Equinox", "Tahoe", "Camaro", "Trailblazer"],
  Nissan: ["Altima", "Sentra", "Leaf", "Maxima", "Rogue", "Navara"],
  BMW: ["3 Series", "5 Series", "X5", "X3", "M3", "X6"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "A-Class"],
  Audi: ["A4", "A6", "Q5", "Q7", "TT", "Q3"],
  Volkswagen: ["Golf", "Passat", "Tiguan", "Jetta", "Beetle", "Polo"],
  Subaru: ["Outback", "Forester", "Impreza", "Legacy", "Crosstrek", "XV"],
  Peugeot: ["208", "308", "508", "2008", "3008", "5008"],
  Citroen: ["C3", "C4", "C5 Aircross", "Berlingo", "C3 Picasso"],
  Renault: ["Clio", "Megane", "Kadjar", "Talisman", "Duster", "Captur"],
  Fiat: ["500", "Panda", "Punto", "Tipo", "500X", "Doblo"],
  Hyundai: ["i10", "i20", "i30", "Tucson", "Santa Fe", "Elantra"],
  Kia: ["Picanto", "Rio", "Ceed", "Sportage", "Sorento", "Soul"],
  Dacia: ["Sandero", "Logan", "Duster", "Lodgy", "Stepway"],
  Skoda: ["Fabia", "Octavia", "Superb", "Kodiaq", "Karoq"],
};

export enum BodyTypeEnum {
  Compacte= 'Compacte',
  Berline='Berline',
  Cabriolet='Cabriolet',
  X4 = '4X4',
  Monospace='Monospace',
  Utilitaire='Utilitaire',
  PickUp='PickUp',
  Other='Other',
}

export enum FuelEnum {
  Essence = 'Essence',
  Diesel = 'Diesel',
  Hybride = 'Hybride',
  Electric = 'Electric'
}

export enum TruckTypesEnum {
  Bus = 'Bus',
  Truck = 'Truck',
  SemiTrailerTruck = 'SemiTrailerTruck', 
}

export enum AutreTypeEnum {
  Forklift = 'Forklift',
  ConstructionMachine = 'ConstructionMachine',
  Trailer = 'Trailer',
  AgriculturalVehicle = 'AgriculturalVehicle',
}



export type CategoryType = 'realEstate' | 'vehicle'| '';
export type ActionType = 'rent' | 'sell'| '';  

export interface StepConfig {
  title: string;
  fields: (keyof MyFormData)[];
}

export const realEstateStepsConfig: StepConfig[] = [
    { title: "Category & Action", fields: ['category', 'action'] },
    { title: "Property Info", fields: ['Country', 'address', 'propertyType'] },
    { title: "Listing Details", fields: ['Space', 'SalePrice', 'RentPrice','description'] },
    { title: "Media", fields: ['images'] },
    { title: "Final Details", fields: ['Name', 'phone', 'availableDateforRent','selectedDates'] },
    { title: "Review", fields: ['Country', 'address', 'propertyType', 'Space', 'SalePrice', 'RentPrice','description', 'images', 'Name', 'phone'] },

  ];

export const VehicleStepsConfig: StepConfig[] = [
    { title: "Category & Action", fields: ['category', 'action'] },
    { title: "Property Info", fields: ['propertyType', 'Mileage', 'Color', 'Condition', 'Transmission', 'displacementMoto', 'Vehiculedisplacement', 'Year', 'Marque', 'Model', 'FiscalPower', 'BodyType', 'Fuel', 'TruckType', 'OtherType'] },
    { title: "Listing Details", fields: ['address','SalePrice','RentPrice', 'description'] },
    { title: "Media", fields: ['images'] },
    { title: "Final Details", fields: ['Name', 'phone','availableDateforRent','selectedDates'] },
    { title: "Review", fields: ['category', 'action', 'address', 'propertyType', 'SalePrice', 'RentPrice','description', 'images', 'Name', 'phone', 'availableDateforRent', 'selectedDates'] },

  ];

export interface MyFormData {
  category: CategoryType,
  action: ActionType,
  Country?: string;
  address: string;
  propertyType: REproportyTypeEnum | VHproportyTypeEnum | "";
  Space?: number;
  SalePrice?: number; 
  RentPrice?: number;
  description: string;
  Name: string;
  phone: number;
  availableDateforRent: string,
  selectedDates: string[],
  images: string[];
  Mileage?: number
  Color?: ColorEnum
  Condition?: ConditionEnum
  Transmission?: TransmissionEnum
  displacementMoto?: number
  Vehiculedisplacement?: number
  Year?: number
  Marque?: string
  Model?: string
  below?: number
  above?: number
  FiscalPower?: number
  BodyType?: BodyTypeEnum
  Fuel?: FuelEnum
  TruckType?: TruckTypesEnum
  OtherType?: AutreTypeEnum
  [key: string]: any; 

}

export const initialState: MyFormData = {
    category: "",
    action: "",
    address: "",
    propertyType: "", 
    description: "",
    Name: "",
    email: "",
    phone:0,
    availableDateforRent: "",
    selectedDates: [],
    images: [],
    Mileage: undefined,
    Color: undefined,
    Condition: undefined,
    Transmission: undefined,
    displacementMoto: undefined,
    Vehiculedisplacement: undefined,
    Year: undefined,
    Marque: "",
    Model: "",
    below: undefined,
    above: undefined,
    FiscalPower: undefined,
    BodyType: undefined,
    Fuel: undefined,
    TruckType: undefined,
    OtherType: undefined
};


