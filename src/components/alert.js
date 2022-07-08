import { Snackbar } from "@mui/material";
import { CryptoState } from "../cryptoContext";
import MuiAlert from "@mui/material/Alert";

const Alert = () => {
  const { alert, setAlert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };
  return (
    <>
      <Snackbar
        open={alert.open}
        //anchorOrigin="bottom center"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={(e) => handleClose()}
      >
        <MuiAlert elevation={6} variant="filled" severity={alert.type}>
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Alert;
