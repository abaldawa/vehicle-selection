/**
 * @author Abhijit Baldawa
 */

import { Box, styled } from "@mui/material";

const Container = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
}));

Container.defaultProps = {
  component: "article",
};

export { Container };
