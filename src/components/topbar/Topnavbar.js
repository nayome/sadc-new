import React, { useState } from "react";
import {  AppBar, Toolbar, Grid, IconButton, makeStyles } from '@material-ui/core'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory({forceRefresh:true});


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
        color:'#253053',
        fontSize: '20px',
        top: '0',
        zIndex: '999',
    },
    gridCotainer: {
        padding: '4px 24px 4px 4px',
    },
}))


export default function Header() {
    // let history = useHistory();
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
     
    const handleAdd= () => {
        console.log("add")
        history.push('/registerPatient'); // <--- The page you want to redirect your user to.

    }


    React.useEffect(() => {
        console.log("ran effect")
        if (inputValue === '') {
            setOptions([]);
            return undefined;
          }
      
          axios.get(
              `http://ec2-3-139-74-141.us-east-2.compute.amazonaws.com:9090/ws/rest/IntegrationAPI/patients/search/${inputValue}`, { headers: {
                       searchBy: 'Key',
                     }}
            )
            .then(response => {
              console.log(response)
      
              if (response.data === "")
              {
                  setOptions([]);
              }
              else 
              {
                  setOptions(response.data.patinetSearchData);
              }
            })
            .catch(error => {
              console.log(error)
            })
            return () => {
            ;
          };
  
    }, [inputValue]);
    


    return (
        <AppBar position="sticky" className={classes.root}>
            <Toolbar className={classes.gridCotainer}>
                <Grid container
                    alignItems="center">
                    <Grid item>
                        <IconButton onClick={handleAdd}>
                            <AddCircleOutline fontSize="small" color="primary"/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={options}
                        getOptionLabel={(option) => option.firstName}
                        renderOption={(option) => (
                          <React.Fragment>
                            {option.firstName} ({option.patientId})                          
                            </React.Fragment>
                        )}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Patient"
                            margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                        )}
                        onChange={(event, value) => {
                            console.log("i am un change")
                            console.log(value)
                            console.log(value.patientId)
                            // options.filter${inputValue}
                            history.push({
                                pathname: '/patientDetails',
                                state: {detail: value.patientId},
                              });
                            // history.push('/patientDetails/',value.patientId); // <--- The page you want to redirect your user to.
                        }} // prints the selected value
                        onInputChange={(event, newInputValue) => {
                            if(event.type === "change")
                            {
                                setInputValue(newInputValue);
                                console.log(event.type + newInputValue)
                            }
                        }}/>
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                        Sai Avighna Dental Clinic
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
