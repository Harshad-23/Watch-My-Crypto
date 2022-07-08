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
import AuthModal from "./Authentication/authModal";
import UserSideBar from "./Authentication/userSideBar";

const StyledContainer = styled(Container)(({ theme }) => ({
  ".MuiTypography-h5": {
    flex: 1,
    color: theme.palette.mainColor.main,
    cursor: "pointer",
    marginRight: 5,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      //display: "none",
    },
  },
  img: {
    marginRight: 5,
    marginLeft: -5,
    cursor: "pointer",
    height: 35,
    width: 35,
  },
  b: {
    color: theme.palette.mainColor.main,
  },
  ".MuiAvatar-root": {
    marginLeft: 25,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 7,
    },
  },
}));

function Header() {
  const navigate = useNavigate();
  const { currency, setCurrency, user } = CryptoState();

  return (
    <>
      <AppBar color="transparent" position="static">
        <StyledContainer>
          <Toolbar>
            <img
              alt="logo"
              src="/images/cryptologo2-purple.webp"
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
                width: 90,
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
            {user ? <UserSideBar /> : <AuthModal />}
          </Toolbar>
        </StyledContainer>
      </AppBar>
    </>
  );
}

export default Header;
