import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import css from '../styles/getfreeEstimate.module.scss'
import FirststepGetfree from './components/MultiStep/FirststepGetfree';
import { StepIconProps } from '@mui/material/StepIcon';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import StepLabel from '@mui/material/StepLabel';
const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 20,
      left: 'calc(-50% + 25px)',
        width:'10vw',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#eaeaf0',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#eaeaf0',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 2,

      borderRadius: 1,
    },
  }));
  
  const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
      color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #222222',
      borderRadius:'50%',
      ...(ownerState.active && {
        color: 'white',
        border:'10px solid red',
        borderRadius:"50%",
        
      }),

      '& .QontoStepIcon-completedIcon': {
        color: 'white',
        zIndex: 1,
        fontSize: 18,
        width: '1vw',
        height: '1vw',
        background: 'red',
        borderRadius:"50%",
      },
      '& .QontoStepIcon-circle': {
        width: '2vw',
        height: '2vw',
        borderRadius: '50%',
        backgroundColor: 'white',
      },
    }),
  );
  
  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
  
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }
  
  
const steps = [
    'BHK TYPE',
    'ROOMS TO DESIGN',
    'GET QUOTE'
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
                            <FirststepGetfree/>
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
            <Box  className={css.mutli_step}>
                {/* <Stepper nonLinear activeStep={activeStep} >
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={() => setActiveStep(index)}>
                                {label} 
                            </StepButton>
                        </Step>
                    ))}
                </Stepper> */}
                <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
                <div>
                    <div className={css.getfree_Estimate_Content}>
                        {getStepContent(activeStep)}
                    </div>
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
