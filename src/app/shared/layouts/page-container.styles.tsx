/**
 * @author Abhijit Baldawa
 *
 * Provides layout for the entire UI
 */

import { Box, styled } from "@mui/material";

const PageContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  backgroundColor: theme.palette.primary.main,
  padding: "1rem",
  overflow: "scroll",

  [theme.breakpoints.up("md")]: {
    display: "grid",
    placeItems: "center",
  },
}));

PageContainer.defaultProps = {
  component: "main",
};

export { PageContainer };
