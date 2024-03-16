import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import css from "./joinusTable.module.scss";
import { BiSolidDownArrow } from 'react-icons/bi';

interface CustomHeaderWithDropdownProps {
  label: string;
  value: any;
  onSelectionChange: (selectedValue: string) => void;
}

const CustomHeaderWithDropdown: React.FC<CustomHeaderWithDropdownProps> = ({ label, value, onSelectionChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  // const uniqueValues = [...new Set(value.map(item => item[label.toLowerCase()]))];

  // // Add 'Rajapalayam' to the unique values
  // if (!uniqueValues.includes('Rajapalayam')) {
  //   uniqueValues.push('Rajapalayam');
  // }
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleSelection = (selectedItem: any) => {
    setSelectedValue(selectedItem);
    onSelectionChange(selectedItem); // Notify the parent component about the selection
  };
  let val = []

  if(label == "ROLE"){
    val.push("All")
    value.forEach((item) => {
      if (val.includes(item.role)) {
      } else {
        val.push(item.role)
      }
    })
  }else if(label == "LOCATION"){
    value.forEach((item) => {
      if (val.includes(item.location)) {
      } else {
        val.push(item.location)
      }
    })
  }else{
    value.forEach((item) => {
      if (val.includes(item.department)) {
      } else {
        val.push(item.department)
      }
    })
  }

 


  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className={css.dropdown}>
        <DropdownToggle caret>
          {label}<BiSolidDownArrow className={css.arrow} />
        </DropdownToggle>
        <DropdownMenu>
          {val.map((item, index) => (
            <DropdownItem key={index} onClick={() => handleSelection(item)}>
              {item}
              {/* {label === 'ROLE' ? item.role : label === 'LOCATION' ? item.location : item.department} */}
            </DropdownItem>
          )
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default CustomHeaderWithDropdown;
