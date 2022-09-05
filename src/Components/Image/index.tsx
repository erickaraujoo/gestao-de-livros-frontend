import React, { ImgHTMLAttributes } from 'react';
import { Container, Img } from './styles';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  image: string;
  margin?: string;
}

const Image: React.FC<ImageProps> = ({ image, ...props }) => {
  return (
    <Container>
      <Img src={image} {...props} />
    </Container>
  );
};

export default Image;
