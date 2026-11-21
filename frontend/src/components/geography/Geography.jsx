import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { Box, useTheme } from "@mui/material";
import { geo } from "./world_countries";
import { data } from "./data";
import Geo from "./geo";


const Geography = () => {
  const theme = useTheme();
  return (
    <Box>


      <Geo />
    </Box>
  );
};

export default Geography;
