import { useRouter } from "next/router";
import { Box, AppBar, Toolbar, Stack, Alert, AlertTitle, Snackbar } from "@mui/material";
import * as React from "react";
import {
  Grid,
  Typography,
  Button,
  Link,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  IconButton,
  Paper,
} from "@mui/material";

import logo from "../images/logo.svg";
import loginimg from "../images/login.png";
import iconuser from "../images/icon.svg";
import iconpassword from "../images/passwordimg.svg";

import Image from "next/image";
import axios from "axios";
import CustomizedSnackbars from "./SnackBar";

const Login = () => {


  const router = useRouter();

const[Opensnack , setOpenSnack] =  React.useState(false)


  interface LogInDetails {
    Username: String;
    Password: String;
  }

  const [log, setLog] = React.useState<LogInDetails>({
    Username: "",
    Password: "",
  });

  const onchangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setLog({ ...log, Username: event.target.value });
  };
  const onchangePassHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setLog({ ...log, Password: event.target.value });
  };

  const clickHandler = async () => {
    try {
      const { status, data } = await axios.post(
        "http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com/api/sm-login",
        {
          email: log.Username,
          password: log.Password,
        }
      );
      localStorage.setItem("AuthToken", data.Authorization);
        console.log(data.Authorization);
      console.log(status);
      if (status == 200) {
        router.push("/DashBoard");
     
      } else {
        setOpenSnack(true);
 
      }
    } catch (error: any) {
   
       setOpenSnack(true);
      console.log(error);
    }
    finally{
      console.log("finally")
    }
    console.log(log);
  };

  return (
    <Box
      height="100vh"
      sx={{
        background: "#ffcdca",
        height: "100vh",
      }}
    >
      <CustomizedSnackbars
        open={Opensnack}
        setOpen={setOpenSnack}
        type="error"
        message="Please Enter correct Username or Password"
      />
      ;
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <div>
            <Toolbar
              sx={{
                marginLeft: "100px",
                marginTop: "24px",
              }}
            >
              <Image src={logo} alt="logo" />
            </Toolbar>
          </div>
        </Grid>

        <Grid item sm={8}>
          <Toolbar sx={{ marginLeft :"200px" }}>
            <Image
              src={loginimg}
              alt="login"
             
            />
          </Toolbar>
        </Grid>
        <Grid item sm={4}>
          <div>
            <Box>
              <Paper
                elevation={3}
                sx={{
                  // marginLeft:"25px",
                  paddingLeft: "35px",
                  marginTop: "70px",
                  height: "418px",
                  width: "400px",
                  backgroundColor: "white",
                }}
              >
                <Typography
                  variant="h4"
                  align="left"
                  sx={{
                    marginTop: "30px",
                    marginLeft: "30px",
                  }}
                >
                  Log In
                </Typography>
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ marginLeft: "30px", marginBottom: "30px" }}
                >
                  Please login to your account
                </Typography>

                <FormControl
                  variant="outlined"
                  sx={{
                    width: "80%",
                    marginBottom: "20px",
                  }}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    User Id
                  </InputLabel>
                  <OutlinedInput
                    onChange={onchangeHandler}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <Image src={iconuser} alt="login" />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>

                <FormControl
                  variant="outlined"
                  sx={{
                    width: "80%",
                    marginBottom: "20px",
                  }}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type="password"
                    onChange={onchangePassHandler}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                        >
                          <Image src={iconpassword} alt="login" />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>

                <Button
                  variant="contained"
                  onClick={clickHandler}
                  sx={{
                    width: "80%",
                    height: "12%",
                    marginBottom: "20px",
                    backgroundColor: "#F88A12",
                  }}
                >
                  Log In
                </Button>
                <br />
                <Typography
                  variant="body1"
                  align="right"
                  sx={{
                    marginRight: "10%",
                  }}
                >
                  Forgot Password?
                </Typography>
              </Paper>
            </Box>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
