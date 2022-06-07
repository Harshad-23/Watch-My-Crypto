import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import AliceCarousel from "react-alice-carousel";
import { CryptoState } from "../cryptoContext";
import { numberWithCommas } from "../config/utils";
import { TrendingCoins } from "../config/api";

const CarouselItem = styled(Link)(() => ({
  display: "flex",
  fontWeight: "bold",
  flexDirection: "column",
  alignItems: "center",
  textTransform: "uppercase",
  img: {
    marginBottom: 10,
    marginTop: 20,
  },
}));
const StyledCarousel = styled("div")(() => ({
  height: "50%",
  display: "flex",
  alignItems: "center",
}));

const Carousal = () => {
  const { currency, symbol } = CryptoState();
  const [trending, setTrending] = useState([]);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line
  }, [currency]);

  const items = trending.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;
    return (
      <CarouselItem to={`/coins/${coin.id}`}>
        <img src={coin?.image} alt={coin.name} height="80" />
        <span>{coin?.symbol}</span>
        <span>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
        <span style={{ color: profit > 0 ? "green" : "red" }}>
          {profit && "+"} {coin?.price_change_percentage_24h.toFixed(2)}%
        </span>
      </CarouselItem>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    768: {
      items: 5,
    },
  };
  return (
    <>
      <StyledCarousel>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1200}
          animationDuration={1800}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          autoPlay
          items={items}
        />
      </StyledCarousel>
    </>
  );
};

export default Carousal;
