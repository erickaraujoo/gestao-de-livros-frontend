import { theme, fontSizes } from './../../styles/global';
import { Button as ButtonUI, styled as styledUI } from '@material-ui/core';

export const StyledButton = styledUI(ButtonUI)({
  padding: '0 80px',
  minWidth: '250px',
  minHeight: '40px',
  background: theme.colors.blue,
  cursor: 'pointer',
  color: theme.colors.white,
  fontSize: fontSizes.default,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',

  '&:hover': { background: theme.colors.dullBlue },
  '&:disabled': { background: theme.colors.dullBlue },
});

export const StyledSecundaryButton = styledUI(ButtonUI)({
  padding: '0 80px',
  minWidth: '250px',
  minHeight: '40px',
  background: theme.colors.white,
  cursor: 'pointer',
  color: theme.colors.blue,
  fontSize: fontSizes.default,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  border: `solid 2px ${theme.colors.blue}`,

  '&:hover': { background: theme.colors.white },
  '&:disabled': { background: '#ebebeb' },
});
