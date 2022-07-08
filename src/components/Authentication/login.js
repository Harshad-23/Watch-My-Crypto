import { useState } from "react";
import { Button, Link, styled, TextField } from "@mui/material";
import {
  ForgotPassword,
  LoginWithEmail,
} from "../../config/firebaseOperations";
import { validateEmail } from "../../config/utils";
import { CryptoState } from "../../cryptoContext";

const StyledDiv = styled("div")(({ theme }) => ({
  marginTop: 4,
  "	.MuiTextField-root": {
    margin: "8px 0",
  },
  "	.MuiButton-root": {
    border: `2px solid ${theme.palette.mainColor.main}`,
    marginTop: 4,
    "&:hover": {
      backgroundColor: theme.palette.mainColor.main,
      color: "black",
      fontWeight: 700,
    },
  },
  ".MuiLink-root": {
    cursor: "pointer",
    textDecoration: "none",
  },
}));

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert, alert } = CryptoState();

  const handleSubmit = () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all Fields",
        type: "error",
      });
      return;
    }
    if (!validateEmail(email)) {
      setAlert({
        open: true,
        message: "Please enter valid Email address",
        type: "error",
      });
      return;
    }
    LoginWithEmail(email.trim(), password)
      .then((result) => {
        setAlert({
          open: true,
          message: `Login Successful. Welcome ${result.user.email}!`,
          type: "success",
        });
        handleClose();
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

  const handleForgotPassword = () => {
    if (!email) {
      setAlert({
        open: true,
        message: "Please enter Email ID to send Password Reset link",
        type: "error",
      });
      return;
    }
    if (!validateEmail(email)) {
      setAlert({
        open: true,
        message: "Please enter valid Email address",
        type: "error",
      });
      return;
    }
    ForgotPassword(email)
      .then(() => {
        setAlert({
          open: true,
          message: `Password Reset link sent successfully to ${email}!`,
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

  return (
    <StyledDiv>
      <TextField
        variant="outlined"
        fullWidth
        error={alert.open && !email}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Enter Email..."
      />
      <TextField
        variant="outlined"
        fullWidth
        error={alert.open && !password}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Enter Password..."
      />
      <Button size="large" fullWidth onClick={(e) => handleSubmit()}>
        Login
      </Button>
      <Link onClick={() => handleForgotPassword()}>Forgot Password?</Link>
    </StyledDiv>
  );
};

export default Login;
