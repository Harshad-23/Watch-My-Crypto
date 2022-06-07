import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../cryptoContext";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import { chartDays } from "../config/data";
import SelectButton from "./selectButton";
Chart.register(CategoryScale);

const StyledContainer = styled("div")(({ theme }) => ({
  width: "75%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,

  "& > div": {
    display: "flex",
    marginTop: 50,
    justifyContent: "space-between",
    width: "100%",
  },
  ".MuiCircularProgress-root": {
    color: theme.palette.mainColor.main,
  },
}));

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const theme = useTheme();
  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line
  }, [currency, days]);

  const up = (ctx, color) =>
    ctx.p0.parsed.y < ctx.p1.parsed.y ? color : undefined;
  const down = (ctx, color) =>
    ctx.p0.parsed.y > ctx.p1.parsed.y ? color : theme.palette.mainColor.main;

  return (
    <>
      <StyledContainer>
        {!historicData ? (
          <CircularProgress size={250} thickness={1} />
        ) : (
          <>
            <Line
              data={{
                labels: historicData?.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData?.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days ) in ${currency}`,
                    borderWidth: 1.5,
                    //borderColor: theme.palette.mainColor.main,
                    segment: {
                      borderColor: (ctx) =>
                        up(ctx, "green") || down(ctx, "red"),
                    },
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1.5,
                    pointStyle: "star",
                    hoverBorderColor: theme.palette.mainColor.main,
                  },
                },
              }}
            />

            <div>
              {chartDays?.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </StyledContainer>
    </>
  );
};

export default CoinInfo;
