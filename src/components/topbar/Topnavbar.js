import React, { useState } from "react";
import {  Grid, IconButton, makeStyles } from '@material-ui/core'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";

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


export default function Topnavbar(props) {
    // let history = useHistory();
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const history = useHistory();

    const handleAdd= () => {
        console.log(history.location.pathname )
        if(history.location.pathname === '/registerPatient') {
            console.log("am here")
            history.push({
                pathname: '/',
              });  
            history.goBack();
        } else {
            history.push({
                pathname: '/registerPatient',
              });      
        }
    }

    const callSearch = (searchText) => {
        axios.get(
            `http://ec2-13-232-74-29.ap-south-1.compute.amazonaws.com:9090/ws/rest/IntegrationAPI/patients/search/${searchText}`, { headers: {
                    searchBy: 'Key',
                    }}
        )
        .then(response => {
            console.log(response)    
            if (response.data === "")
            {
                setOptions([{"firstName":"+ Add new patient"}]);
            }
            else 
            {
                setOptions(response.data.patinetSearchData);
                // console.log("iam here in else ",options)
            }
        })
        .catch(error => {
            console.log(error)
        })

    }

    React.useEffect(() => {
        console.log("ran effect top nav bar")
        if (inputValue === '') {
            setOptions([]);
            return;
        }
        else {
            callSearch(inputValue)
        }
    }, [inputValue]);
    


    return (

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
                        value={inputValue}
                        options={options}
                        // getOptionLabel={(option) =>( option.firstName
                        // )}
                        filterOptions={(options) => options}
                        filterSelectedOptions
                        renderOption={(option) => (
                          <React.Fragment>
                            {option.firstName} { (options.patientId && option.patientId)}                          
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
                            if(value.firstName === "+ Add new patient"){
                                console.log(inputValue)
                                    history.push({
                                        pathname: '/registerPatient',
                                        state: {detail: inputValue},
                                    });      
                            } else {
                                console.log(value.patientId)
                                history.push({
                                    pathname: '/patientDetails',
                                    state: {detail: value.patientId},
                                  });  
                                setInputValue("");
                                setOptions([]);
                            }
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
                </Grid>
    )
}
