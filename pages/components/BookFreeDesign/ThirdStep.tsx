import css from '../../../styles/bookfreedesign.module.scss';
import Bookfreedropdown from '../../components/SelectButton/Bookfreedropdown';
import React from 'react';
const ThirdStep: React.FC = () => {
    const labels: string[] = ["Apartment", "Villa", "Independent Home"];
    const showroom: string[] = [
        "Coimbatore showroom",
        "Rajapalayam showroom",
    ];
    const [showDatePicker, setShowDatePicker] = React.useState(false);

    const handleLabelClick = () => {
      setShowDatePicker(!showDatePicker);
    };
  
    return (
        <>
            <div className={css.getfree_Estimate_Content}>
                <div className={css.Book_heading_content}>
                    <p className={css.heading}>USAGE</p>
                    <p className={css.step}> Step 3 0f 3</p>
                </div>
                <div className={css.book_Content}>
                    <Bookfreedropdown district={showroom} heading="Pick the nearest experience centre" defaultoption="Select Showroom" />
                    <div className={css.NextBook_page}>
                        <div className={css.Dropdown_list}>
                            <label htmlFor='date_input' onClick={handleLabelClick}>Select date</label>
                            <input type='date' id='date_input'  onChange={(e) => console.log(e.target.value)} />
                        </div>
                        <div className={css.Dropdown_list}><Bookfreedropdown district={showroom} heading="Possession in..." defaultoption="Select time slot" /></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ThirdStep;