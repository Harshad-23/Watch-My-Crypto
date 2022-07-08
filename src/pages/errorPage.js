import { Divider, styled, Typography } from "@mui/material";

const StyledDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "80vh",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  ".MuiTypography-h1": {
    color: "red",
    fontWeight: "bold",
  },
  ".MuiTypography-h4": {
    fontWeight: "bold",
  },
  ".MuiTypography-body1": {
    fontSize: 20,
  },
  "> div": { [theme.breakpoints.down("md")]: { textAlign: "center" } },
}));

const ErrorPage = ({ query }) => {
  return (
    <StyledDiv>
      <img src="/images/broken.webp" height={300} alt="not found"></img>
      <Divider orientation="vertical" flexItem sx={{ marginRight: 3 }} />
      <div>
        <Typography variant="h1">404</Typography>
        <Typography variant="h4">SORRY!</Typography>
        <Typography variant="body1">
          The {query} you are looking for was not found
        </Typography>
      </div>
    </StyledDiv>
  );
};

export default ErrorPage;
