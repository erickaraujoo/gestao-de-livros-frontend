export const fontSizes = {
  tiny: '0.75rem',
  small: '0.875rem',
  default: '1rem',
  medium: '1.5rem',
  large: '3rem',
};

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

export const theme = {
  colors: {
    blue: '#1B6AC4',
    dullBlue: '#165091',
    blueCharchoal: '#24292d',
    pattensBlue: '#e0e1e2',
    darkOrange: '#F35E07',
    orange: '#F7834A',
    lightOrange: '#ff9901',
    darkRed: '#AB0310',
    red: '#D91900',
    green: '#189D3E',
    oliveGreen: '#1b6b46',
    white: '#ffffff',
    black: '#000000',
    blackCharcoal: '#222426',
    nero: '#1a1a1a',
    gray: '#999999',
    dullGray: '#c2c2c2',
    limeade: '#69bf07',
    lightGray: '#d2d2d2',
    raven: '#6c757d',
    beige: '#F1F0EB',
    marsala: '#5e1b44',
    magnolia: '#F6F5F8',
    whiteSomke: '#F1F1F1',
    solitude: '#E8ECF8',

    whiteWithMediumOpacity: 'rgba(255, 255, 255, 0.5)',
    blackWithMediumOpacity: 'rgba(0, 0, 0, 0.5)',
    blackWithGreatOpacity: 'rgba(0, 0, 0, 0.15)',
    blackCharcoalWithMediumOpacity: 'rgba(34, 36, 38, 0.15)',
    lightRavenWithGreatOpacity: 'rgba(153, 153, 153, 0.2)',
    marsalaWithMediumOpacity: 'rgba(94, 27, 68, 0.5)',
    marsalaWithGreatOpacity: 'rgba(94, 27, 68, 0.2)',
  },
};
