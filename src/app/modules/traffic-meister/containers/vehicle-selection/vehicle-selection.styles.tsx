/**
 * @author Abhijit Baldawa
 */

import { Box, styled } from "@mui/material";

const LOGO_AREA = "logo";
const VEHICLE_ATTRIBUTE_SELECTION_AREA = "vehicleAttributeSelection";
const VEHICLE_ATTRIBUTE_DISPLAY_AREA = "vehicleAttributeDisplay";

const Container = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateAreas: `
        "${LOGO_AREA}"
        "${VEHICLE_ATTRIBUTE_SELECTION_AREA}"
        "${VEHICLE_ATTRIBUTE_DISPLAY_AREA}"
      `,
  gridTemplateRows: "auto 1fr auto",
  height: "100%",
  gap: "0.5rem",
  width: "100%",
  maxWidth: "900px",

  [theme.breakpoints.up("sm")]: {
    gridTemplateAreas: `
        "${LOGO_AREA} ${LOGO_AREA}"
        "${VEHICLE_ATTRIBUTE_SELECTION_AREA} ${VEHICLE_ATTRIBUTE_DISPLAY_AREA}"
      `,
    gridTemplateRows: "auto 1fr",
    height: "90%",
  },
}));

const HeaderWrapper = styled(Box)(() => ({
  width: "100%",
  gridArea: LOGO_AREA,
  display: "flex",
  flexDirection: "column",
}));

HeaderWrapper.defaultProps = {
  component: "header",
};

const HeaderImage = styled("img")(() => ({
  width: "100%",
  flexGrow: 1,
  height: "1%",
}));

const SolidBorder = styled(Box)(() => ({
  border: "4px solid",
  height: "100%",
  padding: "clamp(0.5rem, 0.3rem + 5cqw, 7rem)",
}));

const VehicleAttributeSelectionWrapper = styled(Box)(({ theme }) => ({
  gridArea: VEHICLE_ATTRIBUTE_SELECTION_AREA,
  backgroundColor: theme.palette.primary.contrastText,
  padding: "0.5rem",
  containerType: "inline-size",
}));

VehicleAttributeSelectionWrapper.defaultProps = {
  component: "section",
};

const VehicleAttributeDisplayWrapper = styled(Box)(({ theme }) => ({
  gridArea: VEHICLE_ATTRIBUTE_DISPLAY_AREA,
  backgroundColor: theme.palette.primary.contrastText,
  padding: "0.5rem",
  containerType: "inline-size",
}));

VehicleAttributeDisplayWrapper.defaultProps = {
  component: "section",
};

export {
  Container,
  HeaderWrapper,
  HeaderImage,
  SolidBorder,
  VehicleAttributeSelectionWrapper,
  VehicleAttributeDisplayWrapper,
};
