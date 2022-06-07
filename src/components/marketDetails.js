import { Divider, styled, Tooltip, Typography } from "@mui/material";
import { fullDate, numberWithCommas } from "../config/utils";
import { CryptoState } from "../cryptoContext";

const MarketData = styled("div")(({ theme }) => ({
  alignSelf: "start",
  //alignItems: "flex-start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-around",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  "& > div": {
    //this is flex div
    display: "flex",

    [theme.breakpoints.down("lg")]: {
      display: "inline-block",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  ".MuiTypography-caption": {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 1,
    },
  },
}));

const RightDiv = styled("div")(({ theme }) => ({
  marginLeft: "auto",
  textAlign: "right",
  [theme.breakpoints.down("lg")]: {
    textAlign: "left",
  },
  ".MuiTypography-body1, .MuiTypography-h6, .MuiTypography-body2": {
    textAlign: "right",
    [theme.breakpoints.between("sm", "md")]: {
      textAlign: "left",
    },
  },
  "> div": {
    [theme.breakpoints.down("sm")]: {
      //flexDirection: "column",
    },
  },
}));

const MarketDetails = ({ coin }) => {
  const { currency, symbol } = CryptoState();

  const PriceChangePerin1hr =
    coin?.market_data.price_change_percentage_1h_in_currency[
      currency.toLowerCase()
    ].toFixed(2) > 0;
  const ATLChangePer =
    coin?.market_data.atl_change_percentage[currency.toLowerCase()].toFixed(1) >
    0;
  const ATHChangePer =
    coin?.market_data.ath_change_percentage[currency.toLowerCase()].toFixed(1) >
    0;
  return (
    <MarketData>
      {/* flex div start*/}
      <div>
        <div>
          <Typography variant="body1">Current Price</Typography>
          <div style={{ display: "flex" }}>
            <Typography variant="h6">
              {symbol}{" "}
              {numberWithCommas(
                parseFloat(
                  coin?.market_data?.current_price[
                    currency.toLowerCase()
                  ].toFixed(2)
                )
              )}
            </Typography>
            <Tooltip title="Price Change % in 1 hour">
              <Typography
                variant="caption"
                mt={1}
                ml={1}
                sx={{
                  color: PriceChangePerin1hr > 0 ? "rgb(14, 203, 129)" : "red",
                }}
              >
                {PriceChangePerin1hr && "+"}
                {parseFloat(
                  coin?.market_data.price_change_percentage_1h_in_currency[
                    currency.toLowerCase()
                  ].toFixed(2)
                )}
                %
              </Typography>
            </Tooltip>
          </div>
        </div>
        <RightDiv>
          <Typography variant="body1">Circulating Supply</Typography>
          <Typography variant="h6">
            {numberWithCommas(
              parseFloat(coin?.market_data?.circulating_supply?.toFixed(0))
            )}
          </Typography>
        </RightDiv>
      </div>
      {/* flex div end*/}
      <Divider sx={{ mt: 2, mb: 2 }} variant="fullWidth" />
      {/* flex div start*/}
      <div>
        <div>
          <Typography variant="body1">Market Cap</Typography>
          <Typography variant="h6" sx={{ marginRight: 1 }}>
            {symbol}{" "}
            {numberWithCommas(
              coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)
            )}
            M
          </Typography>
        </div>
        <RightDiv>
          <Typography variant="body1">Total Supply</Typography>
          <Typography variant="h6">
            {numberWithCommas(coin?.market_data?.total_supply?.toFixed(0))}
          </Typography>
        </RightDiv>
      </div>
      {/* flex div end*/}
      <Divider sx={{ mt: 2, mb: 2 }} variant="fullWidth" />
      {/* flex div start*/}
      <div>
        <div>
          <Typography variant="body1">All Time High</Typography>
          <div style={{ display: "flex" }}>
            <Typography variant="h6">
              {symbol}{" "}
              {numberWithCommas(
                parseFloat(
                  coin?.market_data?.ath[currency.toLowerCase()].toFixed(2)
                )
              )}
            </Typography>
            <Typography
              variant="caption"
              mt={1}
              ml={1}
              sx={{
                color: ATHChangePer > 0 ? "rgb(14, 203, 129)" : "red",
              }}
            >
              {ATHChangePer && "+"}
              {parseFloat(
                coin?.market_data.ath_change_percentage[
                  currency.toLowerCase()
                ].toFixed(1)
              )}
              %
            </Typography>
          </div>
          <Typography variant="body2">
            on {fullDate(coin?.market_data.ath_date[currency.toLowerCase()])}
          </Typography>
        </div>
        <RightDiv>
          <Typography variant="body1">All Time Low</Typography>
          <div style={{ display: "flex" }}>
            <Typography variant="h6">
              {symbol}{" "}
              {numberWithCommas(
                parseFloat(
                  coin?.market_data?.atl[currency.toLowerCase()].toFixed(2)
                )
              )}
            </Typography>
            <Typography
              variant="caption"
              mt={1}
              ml={1}
              sx={{
                color: ATLChangePer > 0 ? "rgb(14, 203, 129)" : "red",
              }}
            >
              {ATLChangePer && "+"}
              {parseFloat(
                coin?.market_data.atl_change_percentage[
                  currency.toLowerCase()
                ].toFixed(1)
              )}
              %
            </Typography>
          </div>
          <Typography variant="body2">
            on {fullDate(coin?.market_data.atl_date[currency.toLowerCase()])}
          </Typography>
        </RightDiv>
      </div>
      {/* flex div end*/}
    </MarketData>
  );
};

export default MarketDetails;
