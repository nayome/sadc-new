import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './patientProfile.css';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
      },
      header: {
          height: '72px',
          backgroundColor: '#253053',
          color: '#fff',
          fontSize: '18px',
          borderTopLeftRadius:'4px',
          borderTopRightRadius:'4px',
          display: 'flex',
          gap: '20px',
      },
      content: {
        backgroundColor: '#fff',
      },
      buttonStyle: {
          border: 'none',
          backgroundColor: '#253053',
          color: '#fff',
          fontSize: '18px',
          height: '72px',
          padding: '20px',
          '&:hover':{
            color: '#253053',
            backgroundColor: '#fff',
    
          }
      },
      listStyling: {
          margin:'20px',
          border:'1px solid gainsboro',
          borderRadius: '4px',
          padding:'10px',
          display:'flex',
          flexDirection: 'row',
          gap:'10px',
      },

      listStylingNotes: {
        margin:'20px',
        marginTop:'0px',
        border:'1px solid gainsboro',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        padding:'10px',
        display:'flex',
    },
      textStyling: {
        padding:'5px',
      },
      textStyling2: {
          fontWeight:'500',
          fontSize: '18px',
      },
      avatar: {
        backgroundColor: theme.palette.grey[50],
        border: `1px solid ${theme.palette.info.main}`,
        color: theme.palette.info.main,
      },
      headerStyling: {
        margin:'20px',   
      },
      titleBar: {
          height: '60px',
          backgroundColor: 'gainsboro',
          margin:'20px', 
          marginBottom:'0px',
          padding: '10px',  
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
        },
        tabpanelbg:{
         backgroundColor:"#FFFFFF",
        }
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={1}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function PatientHistory(props) {
    const { appointmentsList, notes } = props;
    const classes = useStyles();
    const [tabValue, setTabValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };
    console.log("i am here in history", {appointmentsList},{notes});

    const formatDate = (string) => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }
    
    const getAptsLabel = () => {
        var count = (appointmentsList && appointmentsList ? appointmentsList.length: 0)
        return (count + " Appointments")
    }

    const getNotesLabel = () => {
        var count = (notes && notes ? notes.length: 0)
        return (count + " Notes")
    }

    return (
        <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: '#253053' }}>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label={getAptsLabel()} {...a11yProps(0)} />
            <Tab label={getNotesLabel()} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        
        <TabPanel value={tabValue} index={0} className={classes.tabpanelbg}>
                <div className={tabValue === 0 ? "content  active-content" : "content"}>
                { appointmentsList &&
                    appointmentsList.map(item => (
                        <div>
                            <div className={classes.headerStyling}>On {formatDate(item.date)}</div>
                            <div className={classes.listStyling}>
                            <Avatar className={classes.avatar}>
                                <EventAvailableIcon/>
                            </Avatar>
                            <div className={classes.textStyling}>
                                <div>Appointment at {item.slot}</div>
                                <div>{item.reason}</div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </TabPanel>
        <TabPanel value={tabValue} index={1} className={classes.tabpanelbg}>
          <div className={tabValue === 1 ? "content  active-content" : "content"}>
          { notes &&  notes.map(item => (
                <div>
                    <div className={classes.headerStyling}>On {formatDate(item.appointmentDate)}</div>
                        <div className={classes.titleBar}>
                            <Avatar className={classes.avatar}>
                                <EditIcon/>
                            </Avatar>
                        </div>
                        <div className={classes.listStylingNotes}>
                        <div className={classes.textStyling}>
                            <div className={classes.textStyling2}>
                                Treatment Notes
                            </div>
                            <div>{item.note}</div>
                        </div>
                </div>
            </div>
            ))}
            </div>
        </TabPanel>
      </div>
    )
}
