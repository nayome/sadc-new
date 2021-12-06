import Topnavbar from "./components/topbar/Topnavbar.js";
import SideMenu from "./components/sidebar/SideMenu.js";
import Dashboard from "./pages/Dashboard/Dashboard";
import Calendar from "./pages/Calendar/Calendar.js";
import Settings from "./pages/Settings/Settings.js";
import RegisterPatient from "./pages/PatientRegistration/RegisterPatient.js";
import PatientProfile from "./pages/PatientProfile/PatientProfile.js";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {  CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import {AppBar, Grid} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Login from "./pages/Login.js";
import {ReactSession} from 'react-client-session';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getUser, removeUserSession, setUserSession } from './Utils/Common';
import Home from './pages/Home/Home.js';
import { AppContext } from "./lib/contextLib";
//admin@saiavighnadental.com
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
  const [isAuthenticated, userHasAuthenticated] = useState(false);
// const [authLoading, setAuthLoading] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  function handleLogout() {
    userHasAuthenticated(false);
    removeUserSession();
  }


  
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
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
                      {isAuthenticated ? (  
                        <div className={classes.divStyling}>
                          <Topnavbar/>
                          <Button variant="text" color="primary" href="/login" onClick={handleLogout}>Logout</Button>                            
                        </div>
                        ) : (
                          <Button variant="text" color="primary" href="/login">Login</Button>                            
                         )} 
                    </Grid>
                </Grid>
            </Toolbar> 
        </AppBar>
        <div className={classes.bodyStyling}>
        { isAuthenticated ? (
            <div className={classes.container}>
            <SideMenu/>
              <Switch>
                <PublicRoute exact path="/"><Home/></PublicRoute>
                <PublicRoute path="/login" component={Login} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/calendar" component={Calendar} />
                <PrivateRoute path="/settings" exact component={Settings}/>
                <PrivateRoute path='/registerPatient' exact component={RegisterPatient}/>
                <PrivateRoute path='/patientDetails' exact component={PatientProfile} />
              </Switch>

          </div>
        ) : (
          <Login/>
         )
        }  
       </div>
      </div>
      </Router>
      </AppContext.Provider>
    <CssBaseline />
    </ThemeProvider>
  )
}

export default App;
