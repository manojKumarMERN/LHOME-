import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import css from '../../../styles/loginRegister.module.scss';
import {BiSolidDownArrow} from 'react-icons/bi'; 



const CustomDropdown: React.FC = ({}) => {


  return (
    <div>
      <Dropdown  className={css.dropdown}>
        <DropdownToggle caret>
        <BiSolidDownArrow className={css.arrow}/>
        </DropdownToggle>
        <DropdownMenu>
        {/* {value.map((item, index) => (
            <DropdownItem key={index}  onClick={() => handleSelection(label === 'ROLE' ? item.role : label === 'LOCATION' ? item.location : item.department)}>
                {label === 'ROLE' ? item.role : label === 'LOCATION' ? item.location : item.department}
                </DropdownItem>
          ))} */}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default CustomDropdown;
