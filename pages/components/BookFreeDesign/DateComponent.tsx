import css from '../../../styles/bookfreedesign.module.scss';
import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendarDateFill } from "react-icons/bs";;
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import moment from 'moment';
// import { useAlert } from 'react-alert';

function DateComponent() {
    // const alert = useAlert();
    const [value, setValue] = React.useState(new Date());
    const [showPicker, setShowPicker] = React.useState(false);
    const [showPickerDate, setShowPickerDate] = React.useState(false)

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };
    const togglePickerDate = () => {
        setShowPickerDate(!showPickerDate);
    };
    let now = new Date()
    const [dateState, setDateState] = React.useState(new Date());
    const changeDate = (e) => {
        setDateState(e)
    }
    return (
        <>
            <div className={css.input__content}>
                <div onClick={togglePickerDate} className={css.input_field}>
                    <BsCalendarDateFill className={css.input_field_icon} />
                    Select Date
                </div>
                {showPickerDate && (
                    <Calendar value={dateState} onChange={changeDate} />
                )}
                {/* <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p> */}
            </div>
        </>
    )
}
export default DateComponent;