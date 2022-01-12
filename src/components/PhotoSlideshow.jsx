import React from 'react';
import { Slide } from 'react-slideshow-image';
import PhotoSlide from './PhotoSlide';
import 'react-slideshow-image/dist/styles.css';
import '../static/css/PhotoSlideshow.css';

export default function PhotoSlideshow(images) {
    return (
        <div>
          <Slide easing="ease" autoplay={false}>
            {
                images.images.map(image => {
                    return <PhotoSlide key={image} image={image}/>;
                })
            }
          </Slide>
        </div>
      )
}