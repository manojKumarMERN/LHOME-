// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Dropdown from "react-bootstrap/Dropdown";
// import css from '../../styles/otherdropdown.module.scss';
// import DropDownIcon from "../../public/assets/SVGIcons/DropdownArrow";
// import Link from 'next/link';
// import { useRouter } from "next/router";
// interface CitiesProps {
//   children: object;
//   onClick(event: string): void;
// }
// const CityToggle = React.forwardRef<HTMLElement, CitiesProps>(({ children: any, onClick }, ref: any) => (
//   <Link
//     href=''
//     ref={ref}
//     onClick={(e: any) => {
//       e.preventDefault();
//       onClick(e);
//     }}
//     className={css.cdropdown}
//   >
//     <div>
//       <DropDownIcon transFormX="1" transFormY="1" fillColor={"none"} strokeColor={"blue"} strokeWidth={.5} />
//     </div>
//   </Link>
// ));
// CityToggle.displayName = "Cities Event";

// const OtherDropDownMenu = (options: any, positionmove: string) => {
//   const router = useRouter();
//   const handleNav = (e) => {
//     e.target.innerText === 'Customer stories' ? router.push('/customstories') : null;
//   }

//   return (
//     <div>
//       <Dropdown className={css.dropdown}>
//         <Dropdown.Toggle as={CityToggle} />
//         <Dropdown.Menu title="">
//           <div className={css.dropdownitemsstyle}>
//             {options.options && options.options.length > 0 && options.options.map((option: any) => {
//               return <Dropdown.Item onClick={handleNav} className={css.dropdownitemstyle} key={`menu-${option}`}>{option}</Dropdown.Item>
//             })}
//             {/* {options && options.length > 0 && options.map((option:any)=>{
//                 return <Dropdown.Item className={css.dropdownitemstyle}  key={`menu-${option}`}>{option}</Dropdown.Item>
//               })} */}
//           </div>
//         </Dropdown.Menu>
//       </Dropdown>
//     </div>
//   );
// }

// OtherDropDownMenu.displayName = "Other";
// export default OtherDropDownMenu;

//______________________________________________

import React from "react";
import css from '../../styles/otherdropdown.module.scss';
import { Menu, MenuItem, ThemeProvider, createTheme } from "@mui/material";
import DropDownIcon from "../../public/assets/SVGIcons/DropdownArrow";
import Link from 'next/link';
import { useRouter } from "next/router";

interface OtherDropDownProps {
  options: string[];
  positionmove: string;
}

const OtherDropDownMenu: React.FC<OtherDropDownProps> = ({ options, positionmove }) => {

  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Montserrat",
      },
    },
  });
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNav = (option: string) => {
    if (option === 'Customer stories') {
      router.push('/customstories');
      handleClose();
    }
    if (option === 'Design journal') {
      router.push('/Designjournal');
      handleClose();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div onClick={handleClick} className={css.cdropdown}>
          <DropDownIcon transFormX="1" transFormY="1" fillColor={"none"} strokeColor={"blue"} strokeWidth={.5} />
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
         
        >
          <div className={css.dropdownitemsstyle}>
            {options.map((option: string) => (
              <MenuItem key={option} onClick={() => handleNav(option)}>
                {option}
              </MenuItem>
            ))}
          </div>
        </Menu>

      </div>
    </ThemeProvider>
  );
};

export default OtherDropDownMenu;

