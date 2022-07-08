import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import {
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Link,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { SingleCoin } from "../config/api";

import CoinInfo from "../components/coinInfo";
import MarketDetails from "../components/marketDetails";
import ErrorPage from "./errorPage";
import { CryptoState } from "../cryptoContext";
import { BookmarkAdded, BookmarkAdd } from "@mui/icons-material";
import {
  AddToWatchList,
  RemoveFromWatchlist,
} from "../config/firebaseOperations";

const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled("div")(({ theme }) => ({
  width: "35%",
  [theme.breakpoints.down("md")]: {
    width: ["100%", "!important"],
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
  ".MuiIconButton-root": {},

  ".MuiChip-outlined": {
    zIndex: 99,
    marginBottom: 20,
    marginTop: 5,
    border: `2px solid ${theme.palette.mainColor.main}`,
  },

  img: {
    marginBottom: 20,
  },

  ".MuiTypography-button": {
    fontWeight: 700,
  },
  ".MuiTypography-subtitle1": {
    width: "100%",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  span: {
    display: "flex",
  },
  //Typography "h6"
  heading: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: 8,
    marginRight: 20,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem",
    },
  },
  ".MuiButton-root": {
    border: `1px solid ${theme.palette.mainColor.main}`,
    "&:hover": {
      backgroundColor: theme.palette.mainColor.main,
      color: "black",
      fontWeight: 700,
    },
  },
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  backgroundColor: theme.palette.mainColor.main,
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [error, setError] = useState();

  const { user, watchlist, setAlert } = CryptoState();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      setError(error.response.status);
    }
  };
  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inWatchlist = watchlist.includes(coin?.id);

  const removeFromWatchlist = async () => {
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

  const addToWatchList = async () => {
    //console.log(coin.market_data.current_price["inr"]);
    await AddToWatchList(coin, user, watchlist)
      .then(() => {
        setAlert({
          open: true,
          message: `${coin.name} Added to the Watchlist!`,
          type: "success",
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

  if (!coin && !error) return <StyledLinearProgress />;
  if (error) return <ErrorPage query="coin" />;

  return (
    <StyledContainer>
      <Sidebar>
        <div style={{ position: "relative" }}>
          <img src={coin?.image.large} alt={coin?.name} height="200" />
          {user && (
            <Tooltip
              title={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            >
              <IconButton
                onClick={inWatchlist ? removeFromWatchlist : addToWatchList}
                sx={{
                  position: "absolute",
                  "&:hover": {
                    color: inWatchlist ? "#f44336" : "#66bb6a",
                  },
                }}
                color={inWatchlist ? "success" : "default"}
              >
                {inWatchlist ? (
                  <BookmarkAdded fontSize="large" />
                ) : (
                  <BookmarkAdd fontSize="large" />
                )}
              </IconButton>
            </Tooltip>
          )}
        </div>
        <Link
          href={coin?.links?.homepage?.[0]}
          target="_blank"
          rel="noopener noreferrer"
          variant="h3"
          underline="none"
          textAlign="center"
        >
          {coin?.name}
        </Link>
        <Chip
          variant="outlined"
          clickable
          label={
            <Typography variant="button">{`Rank #${coin?.market_cap_rank}`}</Typography>
          }
        />
        <Typography variant="subtitle1">
          {parse(coin?.description.en.split(". ")[0])}
        </Typography>
        <MarketDetails coin={coin} />
        {user && (
          <Button
            sx={{ width: "90%" }}
            onClick={inWatchlist ? removeFromWatchlist : addToWatchList}
          >
            {inWatchlist ? "Remove from WatchList" : "Add to WatchList"}
          </Button>
        )}
      </Sidebar>
      {/* Chart */}
      <CoinInfo coin={coin} />
    </StyledContainer>
  );
};

export default CoinPage;
