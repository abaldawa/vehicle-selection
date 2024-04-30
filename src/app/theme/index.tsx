/**
 * @author Abhijit Baldawa
 *
 * Theme provider module
 */

import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "#E26525",
      contrastText: "#FFFFFF",
    },
  },
});

/**
 * @public
 *
 * Component which provides theme to the entire
 * react children tree
 */
const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;

export { AppThemeProvider };
