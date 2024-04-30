/**
 * @author Abhijit Baldawa
 */

import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { PopupHandler } from "./shared/components/app-components/popup/containers/popup-handler/popup-handler";
import { AppThemeProvider } from "./theme";
import { PageContainer } from "./shared/layouts/page-container.styles";
import { VehicleSelection } from "./modules/traffic-meister/containers/vehicle-selection/vehicle-selection";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <AppThemeProvider>
        <PopupHandler />
        <PageContainer>
          <VehicleSelection />
        </PageContainer>
      </AppThemeProvider>
    </>
  );
};

export { App };
