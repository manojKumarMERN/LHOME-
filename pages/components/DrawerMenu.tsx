import React, { useState } from "react";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import css from '../../styles/DropDownMenu.module.scss';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoChevronForward } from "react-icons/io5"; // Import close and chevron icons
import CitiesDropDownMenu from './CitiesDropDown';
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Dropdown from "react-bootstrap/Dropdown";
import { Divider, IconButton, createTheme, styled } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

interface DrawerMenuProps {
    options: string[];
    onClick: (event: string) => void;
    cities: string[];
    fontclass: string;
}

const ToggleDropDown = React.forwardRef<HTMLElement, { onClick: () => void }>(({ onClick }, ref: any) => (
    <div className={css.drpdownicon}>
        <a
            href=""
            ref={ref}
            onClick={(e: any) => {
                e.preventDefault();
                onClick();
            }}
            className={css.ddropdown}
        >
            <GiHamburgerMenu color="black" size="12px" />
        </a>
    </div>
));

ToggleDropDown.displayName="drop down event"

const DrawerMenu: React.FC<DrawerMenuProps> = ({ options, cities, onClick }) => {

    console.log(options);

    const theme = createTheme({
        typography: {
            allVariants: {
                fontFamily: "Montserrat"
            },
        },
    })

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));


    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showCitiesDropDown, setShowCitiesDropDown] = useState(false);

    const handleToggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleNav = (option: string) => {
        if (option.toUpperCase() === "CITIES") {
            setShowCitiesDropDown(!showCitiesDropDown);
        } else {
            onClick(option);
        }
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <ToggleDropDown onClick={handleToggleDrawer} />
                <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>

                    <DrawerHeader sx={{
                        display:'flex',
                        justifyContent:"flex-start"
                    }}>


                        <IconButton onClick={() => setDrawerOpen(false)}>
                            <IoChevronForward size={24} />
                        </IconButton>

                    </DrawerHeader>

                    <Divider sx={{ borderBottomWidth: '5px', borderColor: '#F44336' }} />

                    <List sx={{
                        display:'flex',
                        flexDirection:'column',
                       justifyContent:'flex-start'
                        
                    }}>
                        {
                            options.map((options: any, index: number) => {
                                return options.toUpperCase() === "CITIES" ? (
                                    <div key={`{key_ ${index}}`} className={css.dropdowngroup}>
                                        <Dropdown.Item onClick={() => handleNav(options)} key={`menu_${options}`}>
                                            {options}
                                        </Dropdown.Item>
                                        <div key={`key_${index}`} className={css.dropdowngroup1}>
                                            <CitiesDropDownMenu options={cities} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className={css.iteralItemstyl}>
                                        <ListItemButton key={`menu-${options}`} onClick={() => handleNav(options)}>
                                            <ListItemText primary={options} />
                                        </ListItemButton>
                                    </div>
                                )
                            })
                        }
                    </List>
                    <Divider sx={{ borderBottomWidth: '5px', borderColor: '#F44336' }} />

                    {showCitiesDropDown && <CitiesDropDownMenu options={cities} />}
                </Drawer>
            </ThemeProvider>

        </>
    );
};

export default DrawerMenu;
