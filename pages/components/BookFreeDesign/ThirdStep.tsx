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
                    <div className='mt-[4%] mb-[3.5%]'>
                        <div className={css.select_button_Heading}>Book a meeting with our Design Expert</div>
                        <Grid container gap={6}>
                            <Grid item xs={12} md={5.55}>
                                <div className={css.custom_date_picker}>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        
                                        placeholderText="Select date"
                                        className={css.date_content}
                                        style={{ width: '100%' }}
                                        calendarIcon={<MdDateRange/>}
                                    />
                                    <span className={css.LeftIcon}><MdDateRange className={css.icon_bottom}/></span><span className={css.RightIcon}><BiSolidDownArrow className={css.icon_bottom}/></span>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={5.55}>
                            <div className={css.custom_date_picker}>
                                    <DatePicker
                                        selected={selectedTime}
                                        onChange={handleTimeChange}
                                        dateFormat="h:mm aa"
                                        showTimeSelect
                                        showTimeSelectOnly
                                        placeholderText="Select time slot"
                                        className={css.date_content}
                                        style={{ width: '200%' }}
                                        
                                    />
                                    <span className={css.LeftIcon}><BsClockFill className={css.icon_bottom}/></span><span className={css.RightIcon}><BiSolidDownArrow className={css.icon_bottom}/></span>
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