import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  List,
  styled,
  Typography,
} from "@mui/material";
import {
  Delete,
  ExpandMore,
  PlaylistAddCheckCircle,
  Settings,
} from "@mui/icons-material";
import { numberWithCommas } from "../../config/utils";
import { CryptoState } from "../../cryptoContext";
import { RemoveFromWatchlist } from "../../config/firebaseOperations";
import ResetModal from "./resetModal";

const StyledAccordion = styled(Accordion)(() => ({
  width: "100%",
  gap: 0,
  ".MuiAccordionSummary-root": {
    ".MuiSvgIcon-root": {
      marginRight: 3,
      marginLeft: -5,
    },
  },

  ".MuiAccordionDetails-root": {
    padding: 6,
  },
}));

const WatchList = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxHeight: 270,
  gap: 12,
  overflow: "auto",
  [theme.breakpoints.down("md")]: {
    maxHeight: 210,
  },
}));

const ListItems = styled("div")(({ theme }) => ({
  background: theme.palette.background.default,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  gap: 4,
  padding: 5,
  borderRadius: 4,
  img: {
    verticalAlign: "middle",
    height: 25,
    //paddingBottom: 3,
  },
  span: {
    display: "flex",
    gap: 5,
    marginLeft: "auto",
    textAlign: "right",
  },
  ".MuiSvgIcon-root": {
    cursor: "pointer",
    marginLeft: "8%",
  },
}));

const UserAccordion = () => {
  const [expanded, setExpanded] = useState("panel1");

  const { user, setAlert, watchlist, fetchCoins, coins, symbol } =
    CryptoState();

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const removeFromWatchlist = async (coin) => {
    await RemoveFromWatchlist(coin, user, watchlist)
      .then(() => {
        setAlert({
          open: true,
          message: `${coin.name} Removed from Watchlist!`,
          type: "warning",
        });
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

  return (
    <div style={{ gap: 0 }}>
      <StyledAccordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <PlaylistAddCheckCircle />
          <Typography>WatchList</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <WatchList>
            {watchlist.length ? (
              coins?.map((coin, key) => {
                if (watchlist.includes(coin.id)) {
                  return (
                    <ListItems key={key}>
                      <div>
                        <img src={coin.image} alt={coin.symbol} /> {coin.name}
                      </div>
                      <span>
                        {symbol}
                        {numberWithCommas(
                          parseFloat(coin?.current_price.toFixed(2))
                        )}
                      </span>
                      <Delete onClick={() => removeFromWatchlist(coin)} />
                    </ListItems>
                  );
                } else {
                  return null;
                }
              })
            ) : (
              <p>No Coins in watchlist</p>
            )}
          </WatchList>
        </AccordionDetails>
      </StyledAccordion>
      <StyledAccordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Settings />
          <Typography>User Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <Divider />
            <ResetModal />
            <Divider />
          </List>
        </AccordionDetails>
      </StyledAccordion>
    </div>
  );
};

export default UserAccordion;
