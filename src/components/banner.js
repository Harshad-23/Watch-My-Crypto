import { Container, styled, Typography } from "@mui/material";
import Carousal from "./carousal";
import Title from "./title";

const StyledBanner = styled("div")(() => ({
  backgroundImage: "url(/images/banner8.1.webp)",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  ".MuiContainer-root": {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-around",
  },
  "> div": {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  ".MuiTypography-h2": {
    fontWeight: "bold",
    marginBottom: 15,
  },
  ".MuiTypography-subtitle2": {
    color: "darkgray",
    textTransform: "capitalize",
  },
}));

const Banner = () => {
  return (
    <StyledBanner>
      <Container>
        <div>
          {/* <Typography variant="h2">Crypto Tracker</Typography> */}
          <Title />
          <Typography variant="subtitle2">
            Get all Info Regarding your favorite Crypto Currency at one stop!
          </Typography>
        </div>
        <div>
          <Carousal />
        </div>
      </Container>
    </StyledBanner>
  );
};

export default Banner;
