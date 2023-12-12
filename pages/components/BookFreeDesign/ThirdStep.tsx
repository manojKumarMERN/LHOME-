import css from '../../../styles/bookfreedesign.module.scss';
import Bookfreedropdown from '../../components/SelectButton/Bookfreedropdown';
import React from 'react';
import DateComponent from './DateComponent';
import TimeComponent from './Timecomponent';


const ThirdStep: React.FC = () => {
    const showroom: string[] = [
        "Coimbatore showroom",
        "Rajapalayam showroom",
    ];
 

    return (
        <>
            <div className={css.getfree_Estimate_Content}>
                <div className={css.Book_heading_content}>
                    <p className={css.heading}>USAGE</p>
                    <p className={css.step}> Step 3 0f 3</p>
                </div>
                <div className={css.book_Content}>
                    <Bookfreedropdown district={showroom} heading="Pick the nearest experience centre" defaultoption="Select Showroom" />
                    <div className={css.input_Date_Time}>
                        <p className={css.select_button_Heading}>Book a meeting with our Design Expert</p>
                        <div className={css.input_Date_Time_content}>
                            <DateComponent/>
                            <TimeComponent/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ThirdStep;