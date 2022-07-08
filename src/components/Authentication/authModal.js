import { useState } from "react";
import {
  styled,
  Tab,
  Tabs,
  Box,
  Modal,
  Fade,
  Button,
  Backdrop,
} from "@mui/material";
import GoogleButton from "react-google-button";
import { CryptoState } from "../../cryptoContext";
import { LoginWithGoogle } from "../../config/firebaseOperations";
import Login from "./login";
import SignUp from "./signup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const StyledBox = styled(Box)(() => ({
  img: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    height: 60,
  },
  span: {
    display: "flex",
    justifyContent: "center",
    margin: 4,
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${theme.palette.mainColor.main}`,
  marginLeft: 5,
  "&:hover": {
    backgroundColor: theme.palette.mainColor.main,
    border: `1px solid ${theme.palette.mainColor.main}`,
    color: "black",
    fontWeight: 700,
  },
  [theme.breakpoints.down("sm")]: {
    width: "30%",
  },
}));

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { setAlert } = CryptoState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const signWithGoogle = () => {
    LoginWithGoogle()
      .then((result) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${result.user.email}!`,
          type: "success",
        });

        handleClose();
      })
      .catch((err) => {
        setAlert({
          open: true,
          message: err.message,
          type: "error",
        });
        return;
      });
  };

  return (
    <div>
      <LoginButton variant="outlined" onClick={handleOpen}>
        Login
      </LoginButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <StyledBox sx={style}>
            <img src="/images/cryptologo2-purple.webp" alt="logo" />
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                aria-label="basic tabs example"
                textColor="secondary"
                indicatorColor="secondary"
                color="info"
                onChange={handleChange}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </Box>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}
            <Box>
              <span>OR</span>
              <GoogleButton
                style={{
                  width: "100%",
                  borderRadius: 5,
                }}
                onClick={() => signWithGoogle()}
              />
            </Box>
          </StyledBox>
        </Fade>
      </Modal>
    </div>
  );
}
