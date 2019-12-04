import React from 'react';
import './Carousel.scss';
import MobileStepper from '@material-ui/core/MobileStepper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Carousel(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.items.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => (prevActiveStep === maxSteps - 1) ? 0 : (prevActiveStep + 1));
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => (prevActiveStep === 0) ? (maxSteps - 1): (prevActiveStep - 1));
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <div className="Carousel">
      <AutoPlaySwipeableViews
        axis='x'
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {props.items.map((step, index) => (
          <div key={step.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className='carouselImg' src={step.bannerImageUrl} alt={step.bannerImageAlt} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <IconButton className='CarouselArrow' onClick={handleNext}>
            <KeyboardArrowRight />
          </IconButton>
        }
        backButton={
          <IconButton className='CarouselArrow' onClick={handleBack}>
            <KeyboardArrowLeft />
          </IconButton>
        }
      />
    </div>
  );
}

export default Carousel;
