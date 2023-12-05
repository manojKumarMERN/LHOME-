import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import * as config from "./../next.config.js";
import Typography from '@mui/material/Typography';
import css from '../styles/bookfreedesign.module.scss';
import Selectbutton from './components/SelectButton/selectbutton';
import Radibutton from './components/SelectButton/RadiButton';
import Bookfreedropdown from './components/SelectButton/Bookfreedropdown';
import PageHeader from "./components/PageHeader";
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
    const labels: string[] = ["Apartment", "Villa", "Independent Home"];
    const Planinglabels: string[] = ["Move In", "Rent Out", "Renovate"];
    const Lookinglabels: string[] = ["End-to-end Interiors", "Kitchen and Wardrobes", "Only Kitchen"];
    const district: string[] = [
        "Ariyalur",
        "Chengalpattu",
        "Chennai",
        "Coimbatore",
        "Cuddalore",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Kallakurichi",
        "Kanchipuram",
        "Kanniyakumari",
        "Karur",
        "Krishnagiri",
        "Madurai",
        "Mayiladuthurai",
        "Nagapattinam",
        "Namakkal",
        "Nilgiris",
        "Perambalur",
        "Pudukkottai",
        "Ramanathapuram",
        "Ranipet",
        "Salem",
        "Sivagangai",
        "Tenkasi",
        "Thanjavur",
        "Theni",
        "Thoothukudi",
        "Tiruchirappalli",
        "Tirunelveli",
        "Tirupathur",
        "Tiruppur",
        "Tiruvallur",
        "Tiruvannamalai",
        "Tiruvarur",
        "Vellore",
        "Viluppuram",
        "Virudhunagar"
    ];

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Typography>
                        <div className={css.Book_heading_content}>
                            <p className={css.heading}>Basic Information</p>
                            <p className={css.step}> Step 1 0f 3</p>
                        </div>
                        <div className={css.book_Content}>
                            <Selectbutton labels={labels} heading="I own a..." />
                            <Radibutton />
                            <Bookfreedropdown district={district} heading="My Locality is" />
                        </div>
                        {/* <div className={css.Bookfreedesign_Button_content}><button className={css.Bookfreedesign_Button} onClick={handleNext}>NEXT</button></div> */}
                    </Typography>
                );
            case 1:
                return (
                    <Typography>
                        <div className={css.Book_heading_content}>
                            <p className={css.heading}>USAGE</p>
                            <p className={css.step}> Step 2 0f 3</p>
                        </div>
                        <div className={css.book_Content}>
                            <Selectbutton labels={Planinglabels} heading="I am planning to..." />
                            <div style={{ paddingTop: "4%" }}><Selectbutton labels={Lookinglabels} heading="I am looking for..." /></div>
                            <div className={css.NextBook_page}>
                                <div className={css.Dropdown_list}><Bookfreedropdown district={district} heading="I have a budget of..." /></div>
                                <div className={css.Dropdown_list}><Bookfreedropdown district={district} heading="Possession in..." /></div>
                            </div>
                        </div>
                    </Typography>
                );
            case 2:
                return (
                    <Typography>
                        <div className={css.Book_heading_content}>
                            <p className={css.heading}>USAGE</p>
                            <p className={css.step}> Step 3 0f 3</p>
                        </div>
                        <div className={css.book_Content}>
                            <Bookfreedropdown district={district} heading="Pick the nearest experience centre" />
                            <div className={css.NextBook_page}>
                                <div className={css.Dropdown_list}><Bookfreedropdown district={district} heading="Book a meeting with our Design Expert" /></div>
                                <div className={css.Dropdown_list}><Bookfreedropdown district={district} heading="Possession in..." /></div>
                            </div>
                        </div>
                    </Typography>
                );
            default:
                return (
                    <Typography>
                        No content for this step
                    </Typography>
                );
        }
    };

    const isLastStep = activeStep === steps.length - 1;

    return (
        <>
            <div className={hidden ? "hidden" : ""}>
                <PageHeader screenwidth={screenwidth} screenheight={screenheight} assetpath={assetpath} hidden={true} />
            </div>
            <Box sx={{ width: '100%' }}>
                {/* <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={() => setActiveStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper> */}
                <div>
                    <div className={css.getfree_Estimate_Content}>
                        {getStepContent(activeStep)}
                    </div>
                    {/* Buttons for navigation */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 ,width:'85%'}}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={css.Bookfreedesign_Button_Back}
                        >
                            Back
                        </Button>
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
                </div>
            </Box>
        </>
    );
}

export default Bookfreedesign;
