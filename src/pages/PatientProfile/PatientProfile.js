import React,{useState} from 'react';
import "./patientProfile.css";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EventNoteIcon from '@material-ui/icons/EventNote';
import HistoryIcon from '@material-ui/icons/History';
import Avatar from '@material-ui/core/Avatar';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import ConfirmDialog from '../../components/controls/ConfirmDialog';
import PatientHistory from "./PatientHistory";
import PatientNotes from "./PatientNotes";
import Notification from "../../components/controls/Notification";
import PatientAppointment from "./PatientAppointment";
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles({
    root: {
        flexGrow:1,
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'left',
    },
    sideMenu: {
        width: '19%',
        borderRight: '1px solid #ccc',
        maxWidth: '280px',
        position: 'fixed',
        padding: '0px',
        top: '89px',
        left: '50px',
        bottom: '0',
        overflowY: 'scroll',
        display:'grid',
        gap:'0px',
    },
    sideMenu_topWrapper: {
        width: '100%',
        height: '75px',
        borderBottom: '3px solid #253053',
        borderTop: '3px solid #253053',
        paddingLeft: '8px',
        paddingTop: '8px',
        paddingBottom: '8px',
        display:'flex',
        gap: '8px',
        position: 'relative',
        // zIndex: '1',
        background: 'white',
        maxWidth: '280px',
        borderRight: '1px solid #ccc',
        overflow: 'hidden',
        alignItems: 'center',
        marginBottom: '10px',
        },

    sidebarWrapper: {
        padding: '5px',
        color: '#fff'
    
    },
    sidebarMenu: {
        marginBottom: '5px',
    },
    sidebarList: {
        listStyle: 'none',
        paddingInlineStart: '1px',
        marginBlockStart: '1px',
    },
    sidebarListItem: {
        padding: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '10px',
        marginBottom: '10px',
        fontSize: '15px',
        color:'#253053',
        '&:hover': {
            backgroundColor: '#253053',
            color: '#fff'
        },
    },
    sidebarListItemActive: {
        padding: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '10px',
        marginBottom: '10px',
        fontSize: '15px',
        color:'#fff',
        backgroundColor:'#253053',
    },
    sidebarIcon: {
        marginRight: '15px',
        fontSize: '20px !important'
    },
    sidebarListItemDelete: {
        padding: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '10px',
        marginBottom: '10px',
        fontSize: '15px',
        color:'red',
        '&:hover': {
            backgroundColor: 'red',
            color: '#fff'
        },
        '&:active': {
            backgroundColor: 'red',
            color: '#fff'
        }
    },
    styling: {
        fontSize: '15px',
        display: 'flex',
        gap: '10px', 
    },
    h6styling: {
        fontSize: '10px',
        display: 'flex',
        gap: '10px', 
    },
    container: {
        border: '1px solid black',
        margin: '5px',
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        
    }
  });

  
  
  

function PatientProfile() {
    const classes = useStyles();
    const location = useLocation();
    const [data, setData] = useState(null);
    const [apptsList, setApptsList] = useState([]);
    const [notes, setNotes] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [toggleState, setToggleState] = useState(0);
    const [notify, setNotify] = useState({isOpen: false, message:'',type:''});
    const history = useHistory();

  
    const toggleTab = (index) => {
        console.log(index);
      setToggleState(index);
    };
 
    useEffect(() => {
        console.log("in usefect")
        const fetchData = async () => {
            console.log("in fetch")
            const respGlobal = await axios(`http://ec2-3-139-74-141.us-east-2.compute.amazonaws.com:9090/ws/rest/IntegrationAPI/patients/${location.state.detail}`);
            console.log(respGlobal);

            setData(respGlobal.data);
            setApptsList(respGlobal.data.appointments);
            setNotes(respGlobal.data.patientNotes);
            console.log(data, apptsList,notes);   
        };    
        fetchData()
      }, [location]);

    
      const onDelete = id => {
        console.log("can delete")
       // 23
       
       axios.get(`http://ec2-3-139-74-141.us-east-2.compute.amazonaws.com:9090/ws/rest/IntegrationAPI/patients/delete/${location.state.detail}`)
       .then(response => {
        console.log(response)
        setNotify({isOpen:true,message:'Patient Deleted Successfully',type:'success'})
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        history.push({
            pathname: '/',
          });
      })
      .catch(error => {
        console.log(error)
        setNotify({isOpen:true,message:'Patient Delete failed',type:'error'})
      })
    }



    return (
        <div className="patientProfile">
            <div className={classes.root}>
                <div className="menu-div">
                    <div className={classes.sidebarMenu}>
                    <ul className={classes.sidebarList}>
                    <li>
                        <div className={classes.sideMenu_topWrapper}>
                        <div>
                            <Avatar src="/broken-image.jpg" />
                        </div>
                        <div>
                            <div className={classes.styling}>
                                <label>{data && data.firstName}</label>
                                <label>{data && data.lastName}</label>
                            </div>
                            <div className={classes.h6styling}>
                                <label>{data && (data.gender == "Female" ? 'F':'M')}</label>
                                <label>{data && data.contactNumber}</label>
                            </div>
                        </div>
                        </div>
                    </li>
                    <li className={toggleState === 0 ? classes.sidebarListItemActive : classes.sidebarListItem} 
                        onClick={() => toggleTab(0)}>
                        <HistoryIcon className={classes.sidebarIcon}/>
                        Patient History
                    </li>
                    <li className={toggleState === 1 ? classes.sidebarListItemActive : classes.sidebarListItem} 
                        onClick={() => toggleTab(1)}>
                        <EventNoteIcon className={classes.sidebarIcon}/>
                        Add Notes
                    </li>
                    <li className={toggleState === 2 ? classes.sidebarListItemActive : classes.sidebarListItem} 
                        onClick={() => toggleTab(2)}>
                        <AddIcon className={classes.sidebarIcon}/>
                        Add Apointment
                    </li>
                    <li className={classes.sidebarListItemDelete} 
                        onClick={() => {
                            // console.log("clicked me")
                            setConfirmDialog({
                                isOpen: true,
                                title: 'Are you sure to delete this patient?',
                                subTitle: "You can't undo this operation",
                                onConfirm: () => { onDelete(data.patientId) }
                            })
                        }}>
                        <DeleteIcon className={classes.sidebarIcon} />
                        Delete Patient
                    </li>
                </ul> 
            </div>
                </div>
                <div className="content-tabs">
                    <div className={toggleState === 0 ? "content  active-content" : "content"}>
                        <PatientHistory
                            appointmentsList={apptsList}
                            notes={notes}
                        />
                        </div>
                    <div className={toggleState === 1 ? "content  active-content" : "content"}>
                        <PatientNotes
                            recordForEdit={data && data.patientId}
                        />
                    </div>
                    <div className={toggleState === 2 ? "content  active-content" : "content"}>
                        <PatientAppointment
                            recordForEdit={data && data.patientId}
                        />
                    </div>

                </div>
            </div>
            
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

            <Notification
                    notify={notify}
                    setNotify={setNotify}
                />

        </div>   
    )
}

export default PatientProfile




