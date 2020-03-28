import React from "react";
import styled from "styled-components";

const StyledSpan = styled.span`
  vertical-align: middle;
`;

export const Emoji = ({ label, symbol }) => (
  <StyledSpan role="img" aria-label={label}>
    {symbol}
  </StyledSpan>
);
