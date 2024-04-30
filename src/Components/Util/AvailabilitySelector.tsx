import React, { useState, useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

const AvailabilitySelector: React.FC = () => {
    const { register, setValue, watch, formState: { errors } } = useFormContext();
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    useEffect(() => {
        register("selectedDates", { required: "Please select at least one date" });
    }, [register]);

    useEffect(() => {
        // Format and set the value for the hidden input
        const formattedDates = selectedDates.map(date => format(date, 'yyyy-MM-dd'));
        setValue("selectedDates", formattedDates.join(', '), { shouldValidate: true });
    }, [selectedDates, setValue]);

    const handleDateChange = (date: Date) => {
        // Toggle date selection
        if (selectedDates.find(selectedDate => format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))) {
            setSelectedDates(selectedDates.filter(selectedDate => format(selectedDate, 'yyyy-MM-dd') !== format(date, 'yyyy-MM-dd')));
        } else {
            setSelectedDates([...selectedDates, date]);
        }
    };

    const selectedDatesValue = watch("selectedDates");

    return (
        <div className='mt-4'>
            <h3 className='font-semibold text-xl mb-4'>When are you available?</h3>
            <p className='mb-4 text-gray-800'>Select your availability.</p>
            <div className='flex flex-wrap'>
                <DatePicker
                    onChange={handleDateChange}
                    highlightDates={selectedDates}
                    inline
                />
            </div>
            <input type="hidden" {...register("selectedDates")} value={selectedDatesValue || ''} />
            {errors.selectedDates && typeof errors.selectedDates.message === 'string' && <p className="text-red-500">{errors.selectedDates.message}</p>}
        </div>
    );
}

export default AvailabilitySelector;
