import { useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  styled,
  Typography,
  TextField,
} from "@mui/material";
import { LockReset, PersonRemove, Unsubscribe } from "@mui/icons-material";
import { CryptoState } from "../../cryptoContext";
import {
  DeleteAccount,
  DeleteDocument,
  ResetPassword,
  UpdateEmail,
} from "../../config/firebaseOperations";
import { validateEmail } from "../../config/utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledBox = styled(Box)(({ theme }) => ({
  ".MuiAlert-standard": {
    marginTop: 10,
    marginBottom: 10,
  },
  "	.MuiTextField-root": {
    margin: "15px 0",
  },
  "> div": {
    display: "flex",
    justifyContent: "end",
    gap: 10,
  },
  [theme.breakpoints.down("sm")]: {
    width: 350,
  },
}));

export default function ResetModal() {
  const [open, setOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [changeMailOpen, setChangeMailOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const { user, setAlert, alert } = CryptoState();
  const [email, setEmail] = useState(user.email.toString());
  const disabled =
    user.providerData[0].providerId === "google.com" ? true : false;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelOpen = () => setDelOpen(true);
  const handleDelClose = () => setDelOpen(false);

  const handleChangeMailOpen = () => setChangeMailOpen(true);
  const handleChangeMailClose = () => setChangeMailOpen(false);

  const handleSubmit = () => {
    if (!email) {
      setAlert({
        open: true,
        message: "Please enter Email ID",
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
    ResetPassword(email)
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

  const handleDeleteUser = () => {
    DeleteDocument(user.uid);
    DeleteAccount(user)
      .then(() => {
        setAlert({
          open: true,
          message: `Account Deleted Successfully!`,
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

  const handleEmailChange = () => {
    if (!newEmail) {
      setAlert({
        open: true,
        message: "Please enter Email ID",
        type: "error",
      });
      return;
    }
    if (!validateEmail(newEmail)) {
      setAlert({
        open: true,
        message: "Please enter valid Email address",
        type: "error",
      });
      return;
    }
    UpdateEmail(user, newEmail)
      .then(() => {
        setAlert({
          open: true,
          message: `Email Address Changed Successfully!`,
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
    <div>
      <ListItem
        disablePadding
        disabled={disabled}
        onClick={!disabled ? handleOpen : null}
      >
        <ListItemButton>
          <ListItemIcon>
            <LockReset />
          </ListItemIcon>
          <ListItemText>Reset Password</ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding onClick={handleChangeMailOpen}>
        <ListItemButton>
          <ListItemIcon>
            <Unsubscribe />
          </ListItemIcon>
          <ListItemText>Change Email</ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding onClick={handleDelOpen}>
        <ListItemButton>
          <ListItemIcon>
            <PersonRemove />
          </ListItemIcon>
          <ListItemText>Delete Account</ListItemText>
        </ListItemButton>
      </ListItem>

      {/* Reset Password Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Reset Password
          </Typography>
          <Divider />
          <Alert severity="info">
            <AlertTitle>Note</AlertTitle>
            Password Reset link will be sent to your Email address, Please check
            Email for further instructions
          </Alert>
          <TextField
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            error={alert.open && !email}
            onChange={(e) => setEmail(e.target.value)}
            label="Enter Email..."
          />
          <div>
            <Button size="large" onClick={(e) => handleClose()}>
              Cancel
            </Button>
            <Button
              size="large"
              variant="contained"
              color="info"
              onClick={(e) => handleSubmit()}
            >
              Continue
            </Button>
          </div>
        </StyledBox>
      </Modal>

      {/* Delete User Modal */}
      <Modal
        open={delOpen}
        onClose={handleDelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete User
          </Typography>
          <Divider />
          <Alert severity="error">
            <AlertTitle>Warning</AlertTitle>
            After you delete an account, it's permanently deleted. Accounts
            can't be <strong>undeleted</strong>.
          </Alert>
          <div>
            <Button size="large" onClick={(e) => handleDelClose()}>
              Cancel
            </Button>
            <Button
              size="large"
              variant="contained"
              color="error"
              onClick={(e) => handleDeleteUser()}
            >
              Continue
            </Button>
          </div>
        </StyledBox>
      </Modal>

      {/* Change User Email Modal */}
      <Modal
        open={changeMailOpen}
        onClose={handleChangeMailClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Email
          </Typography>
          <Divider />
          <Alert severity="warning">
            <AlertTitle>Note</AlertTitle>
            All of your User Data will be moved to new Email address. You can't
            login with your <strong>old Email</strong>.
          </Alert>
          <TextField
            variant="outlined"
            fullWidth
            type="email"
            error={alert.open && !newEmail}
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            label="Enter New Email..."
          />
          <div>
            <Button size="large" onClick={(e) => handleChangeMailClose()}>
              Cancel
            </Button>
            <Button
              size="large"
              variant="contained"
              color="success"
              onClick={(e) => handleEmailChange()}
            >
              Reset
            </Button>
          </div>
        </StyledBox>
      </Modal>
    </div>
  );
}
