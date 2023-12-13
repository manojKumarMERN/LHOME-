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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimeField } from '@mui/x-date-pickers';
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
    const handleTimeChange = (time) => {
        setSelectedTime(time);
    }
    const inputElement = document.querySelector<HTMLInputElement>('#customInput');
    // console.log(inputElement.placeholder);
    if (inputElement) {
        setTimeout(()=>{
            inputElement.placeholder = 'Select Time';
        } ,2000);
        
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
                            <Grid item xs={12} md={5.55}>
                                <div className="custom-date-picker relative">
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Select date"
                                        className="absolute bg-transparent mx-5 top-5 focus:outline-none  px-5 cursor-pointer"
                                        style={{ width: '200%' }}
                                    />
                                    <div className=' w-[100%] rounded-lg h-[50%] flex justify-content-between align-items-center border py-3 px-2 cursor-pointer -z-50'><MdDateRange className={css.icon_bottom}/><BiSolidDownArrow className={css.icon_bottom}/></div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={5.55}>
                                <div className={"custom-time-picker relative"}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <TimeField className={css.time_content} id='customInput' />
                                    </LocalizationProvider>
                                    <div className=' w-[100%] rounded-lg h-[50%] flex justify-content-between align-items-center border py-3 px-2 cursor-pointer -z-50'><BsClockFill className={css.icon_bottom}/><BiSolidDownArrow className={css.icon_bottom}/></div>
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