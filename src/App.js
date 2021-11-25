import Topnavbar from "./components/topbar/Topnavbar.js";
import SideMenu from "./components/sidebar/SideMenu.js";
import Dashboard from "./pages/Dashboard/Dashboard";
import Calendar from "./pages/Calendar/Calendar.js";
import Settings from "./pages/Settings/Settings.js";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterPatient from "./pages/PatientRegistration/RegisterPatient.js";
import {  CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import PatientProfile from "./pages/PatientProfile/PatientProfile.js";
import {GoogleLogin, GoogleLogout} from "react-google-login";
import React, { useState } from 'react';
import {AppBar, Grid} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
    overrides:{
      MuiAppBar:{
        root:{
          transform:'translateZ(0)'
        }
      }
    },
    props:{
      MuiIconButton:{
        disableRipple:true
      }
    } 
})

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    color:'#253053',
    fontSize: '20px',
    top: '0',
    zIndex: '999',

  },
  title: {
    flexGrow: 1,
  },
  nameStyling: {
    fontSize: '20px',
    fontFamily: 'Roboto'
    },
  contentStyling: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    },
    bodyStyling :{
      top: '50',
      display: 'grid',
    },

    labelStyling: {
      textAlign: 'center',
    },
    container: {
      width: '100%',
      height: '100%'
    },
    divStyling: {
      display: 'flex',
    gap:'10px',
      }
    
}));
function App() {
  const classes = useStyles();
  const [user, setUser] = useState("");

  const responseGoogle = (response) => {
    console.log(response);
    setUser(response.profileObj.name)
  }

  const logout = () => {
    console.log("logged out");
    setUser();
  }



  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div>
          <AppBar position="sticky" className={classes.root}>
            <Toolbar className={classes.gridCotainer}>
                <Grid container
                    alignItems="center">
                    <Grid item className={classes.nameStyling}>
                        Sai Avighna Dental Clinic
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                      {user ? (  
                        <div className={classes.divStyling}>
                          <Topnavbar/>
                          <GoogleLogout
                          clientId="141794738514-c2q27fia1ju4vfm9pe6aenqba3609og4.apps.googleusercontent.com"
                          render={renderProps => (
                            <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</Button>
                          )}
                          buttonText="Logout"
                          onLogoutSuccess={logout}
                        />
                     </div>
                     ) : (
                      <GoogleLogin
                      redirectUri="http://ec2-3-110-123-91.ap-south-1.compute.amazonaws.com:443/"
                      clientId="374829528903-oqnhvjlmmgi5r7d0rfk3qjerhabnovfm.apps.googleusercontent.com"
                      render={renderProps => (
                        <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</Button>
                      )}
                      buttonText="Login"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={'single_host_origin'}
                    />
                            
                     )}
                    </Grid>
                </Grid>
            </Toolbar> 
        </AppBar>
        <div className={classes.bodyStyling}>
        { user ? (
            <div className={classes.container}>
            <SideMenu/>
              <Switch>
                <Route path="/dashboard"><Dashboard/></Route>
                <Route exact path="/"><Calendar/></Route>
                <Route path="/settings" exact component={Settings}></Route>
                <Route path='/registerPatient' exact component={RegisterPatient}/>
                <Route path='/patientDetails' exact component={PatientProfile} />
              </Switch>
          </div>
        ) : (
          <div className={classes.contentStyling}>
            <h2 className={classes.labelStyling}>Welcome to Sai Avighna Dental Clinic</h2>
            <h4 className={classes.labelStyling}>Sign in with Google to get started</h4>
          </div>
        )
        }
       </div>
      </div>
    </Router>
    <CssBaseline />
    </ThemeProvider>
  )
}

export default App;
