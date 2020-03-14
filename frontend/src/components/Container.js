import React from "react";

import { Box } from "rebass/styled-components";

export const Container = ({ children }) => (
  <Box
    width={["100%", "90%"]}
    maxWidth="1024px"
    minHeight="100vh"
    margin="0 auto"
    bg="background"
  >
    {children}
  </Box>
);
