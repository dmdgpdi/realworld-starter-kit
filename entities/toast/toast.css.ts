import { style, keyframes, createTheme } from '@vanilla-extract/css';

export const toastBoxList = style({
  position: 'fixed',
  bottom: '32px',
  right: '0',
  left: '0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 'fit-content',
  margin: '0 auto',
});

export const toastBox = style({
  boxSizing: 'border-box',
  minWidth: '240px',
  minHeight: '32px',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '16px',
  marginBottom: '16px',
  overflowY: 'auto',
  zIndex: '99',
});

const fadeOut = keyframes({
  '0%': {
    opacity: 1,
    transform: 'scale(1.0)',
  },
  '50%': {
    opacity: 1,
    transform: 'scale(0.5)',
  },
  '100%': {
    opacity: 0,
    transform: 'scale(0.1)',
  },
});

export const hideToastBox = style({
  animation: `${fadeOut} 2s ease-in`,
});

export const toastText = style({
  textAlign: 'center',
  margin: '0',
});

export const [themeA, vars] = createTheme({
  color: {
    brand: 'blue',
  },
  font: {
    body: 'arial',
  },
});

export const themeB = createTheme(vars, {
  color: {
    brand: 'pink',
  },
  font: {
    body: 'comic sans ms',
  },
});

export const brandText = style({
  color: vars.color.brand,
  fontFamily: vars.font.body,
});
