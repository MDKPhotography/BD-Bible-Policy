// GMU Official Brand Colors
export const gmuColors = {
  primaryGreen: '#006633',
  primaryGold: '#FFCC33',
  darkGreen: '#00563F',
  secondaryGold: '#FFB81C',
  lightGray: '#f5f5f5',
  white: '#ffffff'
};

export const gmuTheme = {
  colors: gmuColors,
  header: {
    backgroundColor: gmuColors.primaryGreen,
    color: gmuColors.white
  },
  button: {
    primary: {
      backgroundColor: gmuColors.primaryGold,
      color: gmuColors.primaryGreen,
      fontWeight: 'bold'
    },
    active: {
      backgroundColor: gmuColors.secondaryGold,
      color: gmuColors.darkGreen,
      fontWeight: 'bold'
    }
  }
};
