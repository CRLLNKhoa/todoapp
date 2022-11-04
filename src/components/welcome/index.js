import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import "./welcome.css";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "8px",
};

function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/home");
      }
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignInGG = () => {};

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/home");
        const variant = "success";
        enqueueSnackbar("Login success! ", { variant });
      })
      .catch((err) => {
        const variant = "error";
        enqueueSnackbar("Wrong email or password! ", { variant });
      });
  };

  const handleRegister = () => {
    if (registerInfo.password !== registerInfo.confirmPassword) {
      const variant = "warning";
      enqueueSnackbar("Please confirm that password the same!", { variant });
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      registerInfo.email,
      registerInfo.password
    )
      .then(() => {
        navigate("/");
        const variant = "success";
        enqueueSnackbar("Register success! ", { variant });
        setIsRegister(false);
      })
      .catch((err) => alert("Sai mk r tk ngu"));
  };

  return (
    <div className="wrapper">
     <div className="welcome">
        <div className="login">
          <button className="btn-login" onClick={handleOpen}>
            <EmailIcon sx={{ color: "red" }} />
            <p>Continue with email</p>
          </button>
          <button className="btn-login">
            <GoogleIcon sx={{ color: "yellow" }} />
            <p>Continue with Google</p>
          </button>
        </div>
     </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="login-register-container">
            {isRegister ? (
              <div className="form-register">
                <Typography fontWeight='bold' sx={{marginBottom: '10px'}} >REGISTER</Typography>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  required
                  type="email"
                  value={registerInfo.email}
                  onChange={(e) =>
                    setRegisterInfo({ ...registerInfo, email: e.target.value })
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  required
                  type="password"
                  value={registerInfo.password}
                  onChange={(e) =>
                    setRegisterInfo({
                      ...registerInfo,
                      password: e.target.value,
                    })
                  }
                  sx={{margin: '20px 0'}}
                />
                <TextField
                  id="outlined-basic"
                  label="Confirm Password"
                  variant="outlined"
                  required
                  type="password"
                  value={registerInfo.confirmPassword}
                  onChange={(e) =>
                    setRegisterInfo({
                      ...registerInfo,
                      confirmPassword: e.target.value,
                    })
                  }
                  autoComplete='off'
                  sx={{margin: '0 0 20px 0'}}
                />
                <button className="button-3" onClick={handleRegister}>
                  Register
                </button>
                <button className="btn-back button-12" onClick={() => setIsRegister(false)}>Go back</button>
              </div>
            ) : (
              <div className="form-login">
                <Typography
                  sx={{ marginBottom: "10px" }}
                  fontWeight="bold"
                  gutterBottom
                >
                  LOGIN
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Account"
                  variant="outlined"
                  required
                  type="email"
                  onChange={handleEmailChange}
                  value={email}
                />
                <TextField
                  id="margin-none"
                  label="Password"
                  variant="outlined"
                  type="password"
                  required
                  onChange={handlePasswordChange}
                  value={password}
                  sx={{ margin: "20px 0" }}
                />
                <button className="button-10" onClick={handleSignIn}>
                  Sigin
                </button>
                <button
                  className="button-3"
                  onClick={() => setIsRegister(true)}
                >
                  Create account
                </button>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Welcome;
