import { DefaultTheme } from "@react-navigation/native";

const PrimaryTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F7EBE8',
    background: '#1E1E1E',
    card: '#262626',
    text: '#CB4B47',
    border: '#591028',
  },
};

export default PrimaryTheme;
