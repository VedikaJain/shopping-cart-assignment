import React from 'react';
import './Carousel.scss';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Carousel(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.items.length | 0;
  const handleNext = () => {
    setActiveStep(prevActiveStep => (prevActiveStep === maxSteps - 1) ? 0 : (prevActiveStep + 1));
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => (prevActiveStep === 0) ? (maxSteps - 1) : (prevActiveStep - 1));
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    (maxSteps > 0) &&
    <div className='Carousel' role='region'
      aria-roledescription='carousel' aria-label='Ongoing offers'>
      <AutoPlaySwipeableViews axis='x' index={activeStep}
        onChangeIndex={handleStepChange} enableMouseEvents
        aria-live='off' id='carouselSlides'>
        {props.items.map((step, index) => (
          <div key={step.id} role='group' aria-roledescription='slide'
            aria-label={(index + 1)  + ' of ' + props.items.length + ' offers'}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className='carouselImg' src={step.bannerImageUrl} alt={step.bannerImageAlt} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        variant='dots'
        steps={maxSteps}
        position='static'
        activeStep={activeStep}
        nextButton={
          <Button aria-label='Go to next image' aria-controls='carouselSlides'
            className='CarouselArrow' onClick={handleNext}>
            NEXT
          </Button>
        }
        backButton={
          <Button aria-label='Go to previous image' aria-controls='carouselSlides'
            className='CarouselArrow' onClick={handleBack}>
            PREV
          </Button>
        }
      />
    </div>
  );
}

export default Carousel;
