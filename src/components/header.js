import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { currencies } from "../config/data";
import { CryptoState } from "../cryptoContext";

const StyledContainer = styled(Container)(({ theme }) => ({
  ".MuiTypography-h5": {
    flex: 1,
    color: theme.palette.mainColor.main,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
  img: {
    marginRight: 5,
    cursor: "pointer",
    height: 35,
  },
  b: {
    color: theme.palette.mainColor.main,
  },
}));

function Header() {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  return (
    <>
      <AppBar color="transparent" position="static">
        <StyledContainer>
          <Toolbar>
            <img
              alt="logo"
              src="/cryptologo2-purple.webp"
              onClick={() => navigate("/")}
            ></img>
            <Typography variant="h5" onClick={() => navigate("/")}>
              Crypto<b>Tracker</b>
            </Typography>

            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{
                width: 100,
                height: 40,
                marginLeft: "auto",
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencies.map((sign) => (
                <MenuItem key={sign.name} value={sign.name}>
                  {sign.name}
                </MenuItem>
              ))}
            </Select>
          </Toolbar>
        </StyledContainer>
      </AppBar>
    </>
  );
}

export default Header;
