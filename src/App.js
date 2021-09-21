import Topnavbar from "./components/topbar/Topnavbar.js";
import SideMenu from "./components/sidebar/SideMenu.js";
import Dashboard from "./pages/Dashboard/Dashboard";
import Calendar from "./pages/Calendar/Calendar";
import Settings from "./pages/Settings/Settings.js";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterPatient from "./pages/PatientRegistration/RegisterPatient.js";
import {  CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import PatientProfile from "./pages/PatientProfile/PatientProfile.js";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Topnavbar/>
        <div className="container">
          <SideMenu/>
            <Switch>
              <Route exact path="/"><Dashboard/></Route>
              <Route path="/calendar"><Calendar/></Route>
              <Route path="/settings" exact component={Settings}></Route>
              <Route path='/registerPatient' exact component={RegisterPatient} />
              <Route path='/patientDetails' exact component={PatientProfile} />
            </Switch>
        </div>
    </Router>      
    <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
