import React from 'react';
import css from '../../../styles/bookfreedesign.module.scss';
import { BsCalendarDateFill } from "react-icons/bs";

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
                  <p>hi</p>
                    // <Calendar value={dateState} onChange={changeDate} />
                )}
            </div>
        </>
    )
}
export default DateComponent;