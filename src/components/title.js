import { styled, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

const reveal = keyframes`
80%{
    letter-spacing: 8px;
    }
100% {
    background-size: 300% 300%;
    }
`;

const glow = keyframes`
40% {
     text-shadow: 0 0 8px #fff;
    }
`;
const StyledTitle = styled(Typography)(() => ({
  background:
    "50% 100% / 50% 50% no-repeat radial-gradient(ellipse at bottom, #fff, transparent, transparent)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  animation: `${reveal} 3000ms ease-in-out forwards 200ms, ${glow} 2500ms linear infinite 2000ms`,
}));

const Title = () => {
  return (
    <>
      <StyledTitle variant="h2">Crypto Tracker</StyledTitle>
    </>
  );
};

export default Title;
