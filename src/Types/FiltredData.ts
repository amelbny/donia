import { MyFormData } from "./FormTypes"


const FiltredData = (data: MyFormData): MyFormData => {
  const commonFields = ['category', 'action', 'propertyType','address', 'Name', 'email', 'description', 'selectedDates','images'];
  let specificFields: string[] = [];

  if (data.category === 'vehicle' && data.action === 'sell' && data.propertyType === 'Vehicle') {
            specificFields = ['Mileage', 'Color', 'Transmission', 'Condition', 'Vehiculedisplacement', 'Year', 'Marque', 'Model', 'SalePrice', 'BodyType', 'Fuel', 'FiscalPower'];
    }else if (data.category === 'vehicle' && data.action === 'rent' && data.propertyType === 'Vehicle') {
            specificFields = ['Mileage', 'Color', 'Transmission', 'Condition', 'Vehiculedisplacement', 'Year', 'Marque', 'Model', 'RentPrice', 'BodyType', 'Fuel', 'FiscalPower', 'availableDateforRent'];

    }else if (data.category === 'vehicle' && data.action === 'sell' && data.propertyType === 'Motos') {
                specificFields = ['Mileage', 'Color', 'Condition', 'Transmission', 'displacementMoto', 'Year', 'SalePrice']

    }else  if (data.category === 'vehicle' && data.action === 'rent' && data.propertyType === 'Motos') {
                specificFields = ['Mileage', 'Color', 'Condition', 'Transmission', 'displacementMoto', 'Year', 'RentPrice', 'availableDateforRent']

    }else if (data.category === 'vehicle' && data.action === 'sell' && data.propertyType === 'Truck'){
            specificFields = ['Mileage', 'Color', 'Condition', 'Transmission', 'TruckType','Marque', 'Model', 'Fuel', 'Year', 'SalePrice']

    }else if (data.category === 'vehicle' && data.action === 'rent' && data.propertyType === 'Truck'){
            specificFields = ['Mileage', 'Color', 'Condition', 'Transmission', 'TruckType','Marque', 'Model', 'Fuel', 'Year', 'RentPrice', 'availableDateforRent']
    }else if (data.category === 'vehicle' && data.action === 'sell' && data.propertyType === 'Other'){
            specificFields = ['Color', 'Condition', 'Transmission', 'OtherType','Marque', 'Model', 'Fuel', 'Year', 'SalePrice']
    }else if (data.category === 'vehicle' && data.action === 'rent' && data.propertyType === 'Other'){
            specificFields = ['Color', 'Condition', 'Transmission', 'OtherType','Marque', 'Model', 'Fuel', 'Year', 'RentPrice', 'availableDateforRent']
    }else if (data.category === 'realEstate' && data.action === 'sell'){
            specificFields = ['Country', 'Space', 'SalePrice']
    }else if (data.category === 'realEstate' && data.action === 'rent'){
            specificFields = ['Country', 'Space', 'RentPrice','availableDateforRent']
    }

    const releventFields = [...commonFields, ...specificFields];
  let filtredData: MyFormData = {} as MyFormData;

    releventFields.forEach(field => {
        if (data[field] !== undefined && data[field] !== '') {
            filtredData[field] = data[field];
        }
    });

    Object.keys(data).forEach(key => {
        if(!releventFields.includes(key)) {
            filtredData[key] = undefined;
        }
    }); 
    return filtredData;
}

export default FiltredData