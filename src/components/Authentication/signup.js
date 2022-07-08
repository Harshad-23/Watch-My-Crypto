import { Button, styled, TextField } from "@mui/material";
import { useState } from "react";
import { SignUpWithEmail } from "../../config/firebaseOperations";
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
}));

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
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
    if (password !== confirmPassword) {
      setAlert({ open: true, message: "Password do not match", type: "error" });
      return;
    }
    SignUpWithEmail(email.trim(), password)
      .then((result) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${result.user.email}!`,
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
      <TextField
        variant="outlined"
        fullWidth
        type="password"
        error={alert.open}
        value={confirmPassword}
        onChange={(e) => setconfirmPassword(e.target.value)}
        label="Confirm Password..."
      />
      <Button size="large" fullWidth onClick={(e) => handleSubmit()}>
        Sign up
      </Button>
    </StyledDiv>
  );
};

export default SignUp;
