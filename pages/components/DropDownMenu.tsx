import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import css from '../../styles/DropDownMenu.module.scss';
import CitiesDropDownMenu from './CitiesDropDown';
import { useRouter } from "next/router";
import OtherDropDownMenu from "./OtherDropDown";
import { simpleCallInitAPI } from '../../services/ApicallInit'
interface DropDownProps {
  children: object;
  onClick(event: string): void;
}

const ToggleDropDown = React.forwardRef<HTMLElement, DropDownProps>(({ children, onClick }, ref: any) => (
  <div className={css.drpdownicon}>
    <a
      href=""
      ref={ref}
      onClick={(e: any) => {
        e.preventDefault();
        onClick(e);
      }}
      className={css.ddropdown}
    >
      •••
    </a>
  </div>
));
ToggleDropDown.displayName = "Drop Down Event";

const DropDownMenu = (options: any) => {
  const [citiesDropdown, setCitiesDropdown] = React.useState(false);
  const [ setAssestpath] = React.useState();
  const [other, setOther] = React.useState(["Customstories", "Unknown"]);


  const router = useRouter();
  const handleNav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    switch (e.target.innerText) {
      case 'Home':
        router.push('/');
        break;
      case 'Design Gallery':
        router.push('/designgallery');
        break;
      case 'Modular Kitchen':
        router.push('/modularkitchen');
        break;
      case 'Wardrobe':
        router.push('/wardrobe');
        break;
      case 'Bedroom':
        router.push('/bedroom');
        break;
      case 'Living Room':
        router.push('/livingroom');
        break;
      case 'Bath Room':
        router.push('/bathroom');
        break;
      case 'Space Saving Furniture':
        router.push('/spacesavingfurniture');
        break;
      case 'Home Office':
        router.push('/homeoffice');
        break;
      case 'Customer stories':
        router.push('/customstories')
        break;
      case 'Unknown':
        router.push('/unknow');
        break;
      case 'Partner With LHome':
        router.push('/partnership');
        break;

      case 'Refer and Earn':
        router.push('/referandearn');
        break;

      case 'Join Us':
        router.push('/joinuspage');
        break;


      case 'Visit Us':
        router.push('/visitus');
        break;
      
      case 'Customer Support':
        router.push('/CustomersupportPage');
        break;


    }
  }
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle as={ToggleDropDown} />
        <Dropdown.Menu title="">
          <div className={options.fontclass.length > 0 ? css.modifiedfont : ''}>
            {options.options.map((option: any, index: number) => {
              return option.toUpperCase() === "CITIES" ?
                <div key={`{key_${index}`} className={css.dropdowngroup}><Dropdown.Item onClick={handleNav} key={`menu-${option}`}>{option}</Dropdown.Item>
                  <div key={`{key_${index}`} className={css.dropdowngroupmove}><CitiesDropDownMenu options={options.cities} /></div></div>
                : <Dropdown.Item onClick={handleNav} key={`menu-${option}`}>{option}</Dropdown.Item>
            })}

          </div>
        </Dropdown.Menu>
      </Dropdown>

    </div>
  );
}
DropDownMenu.displayName = "Drop Down";

export default DropDownMenu;
