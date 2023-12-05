import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import css from '../styles/getfreeEstimate.module.scss'
import Firststep from './components/MultiStep/Firststep';
const steps = [
    'Select campaign settings',
    'Create an ad group',
    'Create an ad'
    // Add more steps as needed
];

function GetfreeEstimate() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

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
                        <div className={css.GetfreeEstimate_content_value}>
                            <p className={css.GetfreeEstimate_head}>Your Ideas. Our Expertise.</p>
                            <p className={css.GetfreeEstimate_para}>Our 50+ design experts use state-of-the-art 3D design technology, SpaceCraft, to ensure that you get the perfect designs for your home. Wait no more! Start your home interiors journey with us.</p>
                            <Firststep />
                        </div>
                    </Typography>
                );
            case 1:
                return (
                    <Typography>
                        <div className={css.GetfreeEstimate_content_value}>
                            <p className={css.GetfreeEstimate_head}>Tell Us What You Need</p>
                            <p className={css.GetfreeEstimate_para}>When it comes to choosing your BHK (Bedroom, Hall, Kitchen) type, consider the diversity of options that cater to your specific needs and preferences. Our range includes 1BHK, 2BHK, and 3BHK configurations, each offering a unique blend of space and functionality.</p>
                            
                        </div>
                    </Typography>
                );
            case 2:
                return (
                    <Typography>
                        Content for Step 3: Create an ad
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
            <Box sx={{ width: '100%' }}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={() => setActiveStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    <div className={css.getfree_Estimate_Content}>
                        {getStepContent(activeStep)}
                    </div>
                    {/* Buttons for navigation */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            variant="outlined"
                        >
                            Back
                        </Button>
                        {isLastStep ? (
                            <Button
                                variant="contained"
                                onClick={handleComplete}
                                color="primary"
                            >
                                Complete
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                color="primary"
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

export default GetfreeEstimate;
