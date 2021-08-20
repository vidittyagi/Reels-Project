import React, { useContext, useState } from "react";
import { firebaseDB, firebaseStorage } from "../config/firebase";
import { AuthContext } from "../context/AuthProvider";
import logo  from "../logo.png";
import BackupSharpIcon from '@material-ui/icons/BackupSharp';
import { Link } from "react-router-dom";
import {
  TextField,
  Grid,
  Button,
  Paper,
  Card,
  CardContent,
  CardActions,
  Container,
  CardMedia,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";


const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState("");
  const { signUp } = useContext(AuthContext);

  const handleFileSubmit = (event) => {
    let fileObject = event.target.files[0];
    setProfileImage(fileObject);
  };

  const handleSignUp = async () => {
    try {
      let response = await signUp(email, password);
      let uid = response.user.uid;
      //   you are signed up
      const uploadPhotoObject = firebaseStorage
        .ref(`/profilePhotos/${uid}/image.jpg`)
        .put(profileImage);
      //   console.log(uploadPhotoObject);
      uploadPhotoObject.on("state_changed", fun1, fun2, fun3);
      // to track the progress of the upload
      function fun1(snapshot) {
        // bytes transferred
        // totoal bytes
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      }
      // if indicates a error !!
      function fun2(error) {
        console.log(error);
      }
      // it indicates success of the upload !!
      async function fun3() {
        let profileImageUrl =
          await uploadPhotoObject.snapshot.ref.getDownloadURL();
        // db me collection => document => {username , email , profileImageUrl};
        firebaseDB.collection("users").doc(uid).set({
          email: email,
          userId: uid,
          username: username,
          profileImageUrl: profileImageUrl,
          postsCreated:[]
        });
        props.history.push("/");
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  let useStyles = makeStyles({
    centerDivs: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      width: "100vw",
    },
    carousal: { height: "10rem", backgroundColor: "lightgray" },
    fullWidth: {
      width: "100%",
    },
    centerElements: {
      display: "flex",
      flexDirection: "column",
    },
    mb: {
      marginBottom: "1rem",
    },
    padding: {
      paddingTop: "1rem",
      paddingBottom: "1rem",
    },
    alignCenter: {
      justifyContent: "center",
    },
  });
  let classes = useStyles();

  return (
    <div>
      <Container>
        <Grid container spacing={2} style={{justifyContent : "space-around"}}>
          <Grid item sm={6}>
            <Card variant="outlined" className={classes.mb}>
              <CardMedia
              image={logo}
              style={{ height: "5rem", backgroundSize: "contain" }}
              ></CardMedia>
              <CardContent className = {classes.centerElements}>

              <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                  className = {classes.mb}
                ></TextField>

                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  size="small"
                  onChange={(e) => setPassword(e.target.value)}
                  className = {classes.mb}
                ></TextField>

                 <TextField
                  label="Name"
                  type="name"
                  variant="outlined"
                  value={username}
                  size="medium"
                  onChange={(e) => setUsername(e.target.value)}
                  className = {classes.mb}
                ></TextField>

              <CardActions>
              <input
        accept="image/*"
        className={classes.input}
        onChange={(e) => {
          handleFileSubmit(e);
        }}
        type="file"
      />
      <label variant="contained">
        <Button variant="contained" color="primary"
        startIcon={<BackupSharpIcon></BackupSharpIcon>}>
          Upload Profile Picture
        </Button>
      </label>
              </CardActions>

                <CardActions>
                  <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSignUp}
                  className={classes.fullWidth}
                >
                  Sign Up
                </Button>
              </CardActions>
              <Typography
                style={{ color: "red" }}
                variant="h5"
                >{message}</Typography>
              </CardContent>
            </Card>

            <Card variant="outlined" className={classes.padding}>
              <Typography style={{ textAlign: "center" }}>
                Don't have an account ?
                <Button variant="contained" color="primary">
                  <Link style={{ color: "white" }} to="/login">
                    Login
                  </Link>
                </Button>
              </Typography>
            </Card>

          </Grid>
        </Grid>




      </Container>
    </div>
    // <>
    //   <h1>Signup Page</h1>
    //   <div>
    //     <div>
    //       Username
    //       <input
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //       ></input>
    //     </div>
    //     <div>
    //       Email
    //       <input
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       ></input>
    //     </div>
    //     <div>
    //       Password
    //       <input
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       ></input>
    //     </div>
    //     <div>
    //       Profile Image
    //       <input
    //         type="file"
    //         accept="image/*"
    //         onChange={(e) => {
    //           handleFileSubmit(e);
    //         }}
    //       ></input>
    //     </div>
    //   </div>
    //   <button onClick={handleSignUp}>SignUp</button>
    //   <h2 style={{ color: "red" }}>{message}</h2>{" "}
    // </>
  );
};

export default Signup;
