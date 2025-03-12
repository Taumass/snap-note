import { ThemeProvider } from "@material-tailwind/react";

export const theme = {
  button: {
    defaultProps: {
      color: "blue",
      size: "md",
      variant: "filled",
    },
    styles: {
      base: {
        initial: {
          textTransform: "none",
        },
      },
    },
  },
  navbar: {
    styles: {
      base: {
        initial: {
          borderRadius: "0",
          boxShadow: "none",
        },
      },
    },
  },
};
