import React, { useState } from "react";
import { Box, Container, ThemeProvider, Typography, createTheme, Menu, MenuItem } from "@mui/material";
import { FaChevronRight } from "react-icons/fa6";
import DynamicFurniturIterableComponent from "../spaceFurniture/DynamicfurnitureIterableComponent";

interface properties {
    data: any
}

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: "Montserrat",
        },
    },
});

const FurnitureFilter: React.FC<properties> = ({ data }) => {


    const [selectedFurniture, setSelectedFurniture] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [holeData, setHoledata] = useState<[] | null>(null);

    const [furnitureMenuAnchor, setFurnitureMenuAnchor] = useState<null | HTMLElement>(null);
    const [typeMenuAnchor, setTypeMenuAnchor] = useState<null | HTMLElement>(null);

    const handleFurnitureMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setFurnitureMenuAnchor(event.currentTarget);
    };

    const handleTypeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setTypeMenuAnchor(event.currentTarget);
    };

    const handleFurnitureMenuItemClick = (furniture: string) => {
        setSelectedFurniture(furniture);
        setFurnitureMenuAnchor(null);
    };

    const handleTypeMenuItemClick = (type: string) => {
        setSelectedType(type);
        setTypeMenuAnchor(null);
    };

    const handleSearchClick = () => {
        console.log("Selected Furniture:", selectedFurniture);
        console.log("Selected Type:", selectedType);

        if (selectedFurniture && selectedType) {
            const filteredType = data.filter(item => item.furniture == selectedFurniture && item.Ftype == selectedType);
            setHoledata(filteredType)

        }

        else {
            setHoledata(data);
        }
    };

    const json = {
        "furniture": [
            {
                "name": "Sofa",
                "types": [
                    "SELECT TYPE",
                    "Corner",
                    "L-type",
                    "U-type"
                ]
            },
            {
                "name": "Table",
                "types": [
                    "SELECT TYPE",
                    "Square",
                    "Rectangle",
                    "Round"
                ]
            }
        ]
    };

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Container sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    pt: 5
                }}>
                    <Box sx={{
                        pr: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }} onClick={handleFurnitureMenuOpen}>
                        <Typography variant="body1">{selectedFurniture ? selectedFurniture : "Furniture"}</Typography><FaChevronRight />
                    </Box>
                    <Menu
                        anchorEl={furnitureMenuAnchor}
                        open={Boolean(furnitureMenuAnchor)}
                        PaperProps={
                            {
                                style: {
                                    maxHeight: '200px'
                                }
                            }
                        }
                        onClose={() => setFurnitureMenuAnchor(null)}
                    >
                        {json.furniture.map((furniture, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => handleFurnitureMenuItemClick(furniture.name)}
                            >{furniture.name}</MenuItem>
                        ))}
                    </Menu>

                    <Box sx={{
                        pr: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }} onClick={handleTypeMenuOpen}>
                        <Typography variant="body1">{selectedType ? selectedType : "Type"}</Typography><FaChevronRight />
                    </Box>
                    <Menu
                        anchorEl={typeMenuAnchor}
                        open={Boolean(typeMenuAnchor)}
                        PaperProps={{
                            style: {
                                maxHeight: '200px',
                                maxWidth: '400px'
                            }
                        }}
                        onClose={() => setTypeMenuAnchor(null)}
                    >
                        {selectedFurniture ? (
                            json.furniture
                                .find(item => item.name === selectedFurniture)
                                ?.types.map((type, index) => (
                                    <MenuItem key={index} onClick={() => handleTypeMenuItemClick(type)}>
                                        {type}
                                    </MenuItem>
                                ))
                        ) : (
                            <MenuItem>Please select Furniture</MenuItem>
                        )}

                    </Menu>


                    <Box sx={{
                        pr: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}>
                        <Typography variant="body1" color="#EF5350" onClick={handleSearchClick}>Search</Typography>
                    </Box>
                </Container>
            </ThemeProvider>
            <Box>

                {
                    holeData ?
                        <DynamicFurniturIterableComponent
                            prop="Space Saving Furniture"
                            data={holeData}
                            categoryId='16' /> :
                        <DynamicFurniturIterableComponent prop="Space Saving Furniture"
                            data={data}
                            categoryId='16' />
                }
            </Box>
        </React.Fragment>
    );
};

export default FurnitureFilter;
