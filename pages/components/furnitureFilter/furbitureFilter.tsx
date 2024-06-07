import React, { useState, useEffect } from "react";
import { Box, Container, ThemeProvider, Typography, createTheme, Menu, MenuItem } from "@mui/material";
import { FaChevronRight } from "react-icons/fa6";
import DynamicFurnitureIterableComponent from "../spaceFurniture/DynamicfurnitureIterableComponent";

interface Properties {
    data: any[]
}

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: "Montserrat",
        },
    },
});

const FurnitureFilter: React.FC<Properties> = ({ data }) => {
    const [selectedFurniture, setSelectedFurniture] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [filteredData, setFilteredData] = useState<any[]>(data);
    const [btnString, setBtnString] = useState<boolean>(true);

    const [furnitureMenuAnchor, setFurnitureMenuAnchor] = useState<null | HTMLElement>(null);
    const [typeMenuAnchor, setTypeMenuAnchor] = useState<null | HTMLElement>(null);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleFurnitureMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setFurnitureMenuAnchor(event.currentTarget);
    };

    const handleTypeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setTypeMenuAnchor(event.currentTarget);
    };

    const handleFurnitureMenuItemClick = (furnitureType: string) => {
        setSelectedFurniture(furnitureType);
        setFurnitureMenuAnchor(null);
        setSelectedType(null); // Reset selected type when furniture changes
        setBtnString(true); // Reset button text to "Search"
    };

    const handleTypeMenuItemClick = (type: string) => {
        setSelectedType(type);
        setTypeMenuAnchor(null);
        if (!btnString) {
            setBtnString(true);
        }
    };

    const handleClear = () => {
        setSelectedFurniture(null);
        setSelectedType(null);
        setBtnString(true);
        setFilteredData(data);
    };

    const handleSearchClick = () => {
        if (selectedFurniture && selectedType) {
            const filteredType = data.filter(item => item.furniture_type === selectedFurniture && item.ftype === selectedType);
            setFilteredData(filteredType);
            setBtnString(false);
        } else if (selectedFurniture) {
            const filteredFurniture = data.filter(item => item.furniture_type === selectedFurniture);
            setFilteredData(filteredFurniture);
            setBtnString(false);
        } else {
            setFilteredData(data);
            setBtnString(true);
        }
    };

    const json = {
        "furniture": [
            {
                "name": "Sofa",
                "types": [
                    "Corner",
                    "L-type",
                    "U-type"
                ]
            },
            {
                "name": "Table",
                "types": [
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
                <Container sx={{ display: 'flex', justifyContent: 'flex-end', pt: 5 }}>
                    <Box sx={{ pr: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={handleFurnitureMenuOpen}>
                        <Typography variant="body1">
                            {selectedFurniture ? selectedFurniture : "Furniture"}
                        </Typography>
                        <FaChevronRight />
                    </Box>
                    <Menu
                        anchorEl={furnitureMenuAnchor}
                        open={Boolean(furnitureMenuAnchor)}
                        PaperProps={{ style: { maxHeight: '200px' } }}
                        onClose={() => setFurnitureMenuAnchor(null)}
                    >
                        {json.furniture.map((furniture, index) => (
                            <MenuItem key={index} onClick={() => handleFurnitureMenuItemClick(furniture.name)}>
                                {furniture.name}
                            </MenuItem>
                        ))}
                    </Menu>

                    <Box sx={{ pr: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={handleTypeMenuOpen}>
                        <Typography variant="body1">
                            {selectedType ? selectedType : "Type"}
                        </Typography>
                        <FaChevronRight />
                    </Box>
                    <Menu
                        anchorEl={typeMenuAnchor}
                        open={Boolean(typeMenuAnchor)}
                        PaperProps={{ style: { maxHeight: '200px', maxWidth: '400px' } }}
                        onClose={() => setTypeMenuAnchor(null)}
                    >
                        {selectedFurniture ? (
                            json.furniture.find(item => item.name === selectedFurniture)?.types.map((type, index) => (
                                <MenuItem key={index} onClick={() => handleTypeMenuItemClick(type)}>
                                    {type}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem>Please select Furniture</MenuItem>
                        )}
                    </Menu>

                    <Box sx={{ pr: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                        {btnString ? (
                            <Typography variant="body1" color="#EF5350" onClick={handleSearchClick}>
                                Search
                            </Typography>
                        ) : (
                            <Typography variant="body1" color="#EF5350" onClick={handleClear}>
                                Clear
                            </Typography>
                        )}
                    </Box>
                </Container>
            </ThemeProvider>
            <Box>
                <DynamicFurnitureIterableComponent prop="Space Saving Furniture" data={filteredData} categoryId='16' />
            </Box>
        </React.Fragment>
    );
};

export default FurnitureFilter;
