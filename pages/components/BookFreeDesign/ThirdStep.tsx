import { Grid } from '@mui/material';
import css from '../../../styles/bookfreedesign.module.scss';
import Bookfreedropdown from '../../components/SelectButton/Bookfreedropdown';
import React from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { MdDateRange } from 'react-icons/md';
import { RiArrowDropDownFill } from "react-icons/ri";
import { BsClockFill } from "react-icons/bs";
import { BiSolidDownArrow } from "react-icons/bi";

const ThirdStep: React.FC = () => {
    const showroom: string[] = [
        "Coimbatore showroom",
        "Rajapalayam showroom",
    ];
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [selectedTime, setSelectedTime] = React.useState(null);
    const handleDateChange = (date) => {
        setSelectedDate(date);
        
    };
    const handleTimeChange = (time) =>{
        setSelectedTime(time);
    }

    return (
        <>
            <div className={css.getfree_Estimate_Content + " mb-[3%]"}>
                <div className={css.Book_heading_content}>
                    <p className={css.heading}>USAGE</p>
                    <p className={css.step}> Step 3 0f 3</p>
                </div>
                <div className={css.book_Content}>
                    <Bookfreedropdown district={showroom} heading="Pick the nearest experience centre" defaultoption="Select Showroom" />
                    <div className='mt-5'>
                    <div className={css.select_button_Heading}>Book a meeting with our Design Expert</div>
                        <Grid container gap={6}>
                            <Grid item md={5}>
                        <div className="custom-date-picker relative">
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select date"
                                className="absolute bg-transparent mx-5 top-5 focus:outline-none  px-5 cursor-pointer"
                                style= {{width: '200%'}}
                            />
                            <div className=' w-[100%] rounded-lg h-[50%] flex justify-content-between align-items-center border py-3 px-2 cursor-pointer -z-50'><MdDateRange /><BiSolidDownArrow/></div>
                        </div>
                        </Grid>
                        <Grid item md={5}>
                        <div className={"custom-date-picker relative" + css.Time_content}>
                            <TimePicker
                                closeClock={true}
                                disableClock={true}
                                value={selectedTime}
                                onChange={handleTimeChange}
                                className="absolute bg-transparent w-full top-[40px] focus:outline-none px-5 cursor-pointer border-none"
                                
                            />
                            <div className=' w-[100%] rounded-lg h-[50%] flex justify-content-between align-items-center border py-3 px-2 cursor-pointer -z-50'><BsClockFill/><BiSolidDownArrow/></div>
                        </div>
                        </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ThirdStep;