import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: '#fff',
      color:'#253053',
      fontSize: '20px',
      top: '0',
      zIndex: '999',
  
    },
    labelStyling: {
        textAlign: 'center',
      },
  
}))
  
export default function Home() {
    const classes = useStyles();

    return (
        <div className="home">
            <h2 className={classes.labelStyling}>Welcome to Sai Avighna Dental Clinic</h2>
         </div>
    )
}
