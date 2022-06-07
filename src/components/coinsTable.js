import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  LinearProgress,
  Pagination,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { CoinList } from "../config/api";
import { CryptoState } from "../cryptoContext";
import { numberWithCommas } from "../config/utils";

const StyledContainer = styled(Container)(({ theme }) => ({
  textAlign: "center",
  ".MuiTypography-h4": { margin: 18 },
  ".MuiTextField-root": { marginBottom: 15, width: "100%" },
  " .MuiLinearProgress-root": {
    backgroundColor: theme.palette.mainColor.main,
  },
  ".MuiTable-root": {
    minWidth: 800,
    borderCollapse: "unset",
  },

  ".MuiTableContainer-root": {
    [theme.breakpoints.down("md")]: {
      maxHeight: 500,
    },
  },
  "& .MuiPagination-root": {
    paddingTop: 15,
    paddingBottom: 15,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  "& .MuiPaginationItem-root": {
    color: theme.palette.mainColor.main,
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  ".MuiTableCell-root": {
    backgroundColor: theme.palette.mainColor.main,
    color: "black",
    fontWeight: "700",
    fontSize: "1rem",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#16171a",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#131111",
  },
  ".MuiTableCell-body": {
    [theme.breakpoints.down("sm")]: {
      padding: "4px 15px",
    },
  },
}));

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <>
      <StyledContainer>
        <Typography variant="h4">
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value) & setPage(1)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress />
          ) : (
            <Table stickyHeader>
              <StyledTableHead>
                <TableRow>
                  <TableCell
                    key="Coin"
                    sx={{ position: "sticky", left: 0, zIndex: 99 }}
                  >
                    Coin
                  </TableCell>
                  {[
                    "",
                    "Price",
                    "24h Price(%)",
                    "market Cap",
                    "24h Market Cap(%)",
                  ].map((head) => (
                    <TableCell
                      key={head}
                      align={head === "Coin" ? "inherit" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    const MarketCapProfit =
                      row.market_cap_change_percentage_24h > 0;
                    return (
                      <StyledTableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            position: "sticky",
                            left: 0,
                            backgroundColor: "#16171a",
                            paddingRight: 0,
                            width: 50,
                          }}
                        >
                          <img src={row?.image} alt={row.name} height="50" />
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            paddingLeft: 5,
                            gap: 20,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgray" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color:
                              MarketCapProfit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {MarketCapProfit && "+"}
                          {row.market_cap_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={parseInt((handleSearch()?.length / 10).toFixed(0))}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 470);
          }}
        />
      </StyledContainer>
    </>
  );
};

export default CoinsTable;
