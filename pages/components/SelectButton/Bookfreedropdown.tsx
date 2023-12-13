import React from 'react';
import { Input } from 'reactstrap';
import css from './Selectbutton.module.scss'
import { MdLocationPin } from "react-icons/md";
import { BiSolidDownArrow } from "react-icons/bi";
interface districtprops {
    district: string[];
    heading: string;
    defaultoption: string;
}
const Bookfreedropdown: React.FC<districtprops> = ({ district, heading, defaultoption }) => {
    const [districtList, setDistrictList] = React.useState("");
    return (
        <>
            <div className={css.bookfree_dropdown}>
                <p className={css.select_button_Heading} style={{ paddingTop: '4%' }}>{heading}</p>
                <span className={heading === "My Locality is" ? css.show : css.hidden}><MdLocationPin /></span>
                <Input
                    type="select"
                    value={districtList}
                    onChange={(e) => setDistrictList(e.target.value)}
                    id="selectTitle"
                    className={css.input_Dropdown}
                >
                    <option hidden>{defaultoption}</option>
                    {district && district.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </Input>
                {/* <span className={css.customSelectIcon}>
                    <BiSolidDownArrow />
                </span> */}
            </div>
        </>
    )
}
export default Bookfreedropdown;