import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as config from "./../next.config.js";
import Typography from '@mui/material/Typography';
import css from '../styles/bookfreedesign.module.scss';
import PageHeader from "./components/PageHeader";
import SecondStep from './components/BookFreeDesign/SecondStep';
import ThirdStep from './components/BookFreeDesign/ThirdStep';
import FirstStep from './components/BookFreeDesign/FirstStep';
import Image from 'next/image.js';
const steps = [
    'Select campaign settings',
    'Create an ad group',
    'Create an ad'
    // Add more steps as neededkk
];
interface homeproperties {
    screenwidth: number;
    screenheight: number;

}
const Bookfreedesign: React.FC<homeproperties> = ({ screenwidth, screenheight }) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
    const living = React.useRef(null);

    const page = React.useRef(null);
    const [prevPosition, setPrev] = React.useState(0);
    const [hidden, setHidden] = React.useState(false);
    const [BHK , setBHK] = React.useState('');
    const [selectButton,setSelectButton] = React.useState('');
    const [selectLocation,setSelectLocation] =React.useState('');
    const [selectPlan,setSelectPlan] = React.useState('');
    const [selectLooking,setSelectLooking] = React.useState('');
    const [selectBudget,setSelectBudget] = React.useState('');
    const [selectPossession,setSelectPossession] =React.useState('');
    const [selectShowRoom,setSelectShowRoom] = React.useState('');
    const [selectDateData, setSelectDateData] =React.useState('');
    const [SelectTimeData,setSelectTimeData] =  React.useState('');
    // console.log(selectShowRoom);
    // console.log(selectDateData);
    // console.log(SelectTimeData);
    // console.log(selectPlan);
    
    const pageheaderMonitor = () => {
        if (page.current.scrollTop > prevPosition) {
            setPrev(page.current.scrollTop)
            setHidden(true)
        } else {
            setHidden(false)
            setPrev(page.current.scrollTop)

        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleComplete = () => {
        const newCompleted = { ...completed };
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Typography>
                        <FirstStep setBHK={setBHK} setSelectButton={setSelectButton} setSelectLocation={setSelectLocation}/>
                    </Typography>
                );
            case 1:
                return (
                    <Typography>
                        <SecondStep setSelectPlan={setSelectPlan} setSelectLooking={setSelectLooking} setSelectPossession={setSelectPossession} setSelectBudget={setSelectBudget}/>
                    </Typography>
                );
            case 2:
                return (
                    <Typography>
                        <ThirdStep setSelectShowRoom={setSelectShowRoom} setSelectDateData={setSelectDateData} setSelectTimeData={setSelectTimeData}/>
                    </Typography>
                );

        }
    };

    const isLastStep = activeStep === steps.length - 1;

    return (
        <>
            <div className={css.lhomePage}>
                <div className={css.Img_content}>
                    <Image src={require("../public/assets/images/LhomeLogo.jpg")} className={css.Img_content_img} alt="Logo_Image"/>
                </div>
                <Box sx={{ width: '100%' }} className={css.mutli_step}>
                    <div>
                        <div className={css.getfree_Estimate_Content}>
                            {getStepContent(activeStep)}
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt:'1%', width: '85%' }}>
                            {activeStep === 0 ? null :(
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={css.Bookfreedesign_Button_Back}
                            >
                                Back
                            </Button>)}
                            {isLastStep ? (
                                <Button
                                    onClick={handleComplete}
                                    className={css.Bookfreedesign_Button}
                                >
                                    Book free design session
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleNext}
                                    className={css.Bookfreedesign_Button}
                                >
                                    Next
                                </Button>
                            )}
                        </Box>
                        <div className='w-[100vw] h-[10vh]'></div>
                    </div>
                </Box>
            </div>
        </>
    );
}

export default Bookfreedesign;
