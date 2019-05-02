import Typography from 'typography';
import theme from 'typography-theme-sutro';

// fix for list bullets overflowing div
theme.overrideThemeStyles = () => ({
  'ul,ol': {
    marginLeft: 1
  }
})

export default new Typography(theme);
