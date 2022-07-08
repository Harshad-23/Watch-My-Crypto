import { useEffect, useState } from "react";
import { CryptoState } from "../../cryptoContext";
import { Avatar, SwipeableDrawer, styled, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { LogoutUser } from "../../config/firebaseOperations";
import UserAccordion from "./userAccordion";

const StyledContainer = styled("div")(({ theme }) => ({
  width: 310,
  padding: 15,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "#14161a",
  " > div": {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "95%",
  },
  ".MuiAvatar-root": {
    width: 150,
    height: 150,
    cursor: "pointer",
    backgroundColor: theme.palette.mainColor.main,
    objectFit: "contain",
  },
  ".MuiButton-root": {
    width: "100%",
    backgroundColor: theme.palette.mainColor.main,
    marginTop: 20,
    fontWeight: 700,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  height: 38,
  width: 38,
  marginLeft: 5,
  cursor: "pointer",
  backgroundColor: theme.palette.mainColor.main,
}));

export default function UserSideBar() {
  const [state, setState] = useState({
    right: false,
  });

  const { user, setAlert, watchlist, fetchCoins, coins, symbol } =
    CryptoState();

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    LogoutUser()
      .then(() => {
        setAlert({
          open: true,
          message: "Logged out succesfully",
          type: "success",
        });
        toggleDrawer();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <StyledAvatar
        onClick={toggleDrawer("right", true)}
        src={user.photoURL}
        alt={user.displayName || user.email}
      ></StyledAvatar>
      <SwipeableDrawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        <StyledContainer>
          <div>
            <Avatar
              onClick={toggleDrawer("right", true)}
              src={user.photoURL}
              alt={user.displayName || user.email}
            />
            <span
              style={{
                width: "100%",
                fontSize: 25,
                textAlign: "center",
                fontWeight: "bolder",
                wordWrap: "break-word",
              }}
            >
              {user.displayName || user.email}
            </span>
          </div>
          <UserAccordion watchlist={watchlist} coins={coins} symbol={symbol} />
          <Button variant="contained" onClick={logout}>
            Log Out <Logout sx={{ ml: 2 }} fontSize="small" />
          </Button>
        </StyledContainer>
      </SwipeableDrawer>
    </div>
  );
}
