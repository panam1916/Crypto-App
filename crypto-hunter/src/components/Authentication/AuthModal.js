import { useState } from "react";
import { Modal, Backdrop, Fade, Button, Tab, Tabs, AppBar, Box } from "@mui/material";
import { styled } from "@mui/system";
import Signup from "./Signup";
import Login from "./Login";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword , signInWithRedirect} from "firebase/auth";
import firebaseConfig from "../firebaseConfig";

const ModalContent = styled('div')(({ theme }) => ({
  width: 400,
  backgroundColor: theme.palette.background.paper,
  color: "white",
  borderRadius: 10,
}));

const GoogleBox = styled(Box)(({ theme }) => ({
  padding: 24,
  paddingTop: 0,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  gap: 20,
  fontSize: 20,
}));

function AuthModal() {
  const [open, setOpen] = useState(false);
  const { setAlert } = CryptoState();
  const [value, setValue] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("auth");
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });
        console.log(res);

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
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <ModalContent>
            <AppBar
              position="static"
              style={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <GoogleBox>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </GoogleBox>
          </ModalContent>
        </Fade>
      </Modal>
    </div>
  );
}

export default AuthModal;
