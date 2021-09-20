import React from 'react'
import {Dashboard,Event,Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    sidebar: {
        width: '50px',
        height: 'calc(100vh - 50px)',
        backgroundColor: '#253053',
        position: 'fixed',
        top: '50',
        left: '0',
        overflowX: 'hidden',
        transition: '0.5s',
        '&:hover': {
            width: '160px',
            color: 'white'
        },
    },
    sidebarWrapper: {
        padding: '5px',
        color: '#fff'
    
    },
    sidebarMenu: {
        marginBottom: '10px'
    },
    sidebarList: {
        listStyle: 'none',
        padding: '5px'
    },
    sidebarListItem: {
        padding: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '10px',
        marginBottom: '10px',
        fontSize: '18px',
        color:'#fff',
        '&:hover': {
            backgroundColor: '#fff',
            color: '#253053'
        },
        '&:active': {
            backgroundColor: '#fff',
            color: '#253053'
        }
    },
    sidebarIcon: {
        marginRight: '15px',
        fontSize: '20px !important'
    }
  });

function SideMenu() {
    const classes = useStyles();

    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebarWrapper}>
                <div className={classes.sidebarMenu}>
                    <ul className={classes.sidebarList}>
                    <Link to="/" className="link">
                        <li className={classes.sidebarListItem}>
                            <Dashboard className={classes.sidebarIcon}/>
                            Dashboard
                        </li>
                        </Link>
                        <Link to="/calendar" className="link">
                        <li className={classes.sidebarListItem}>
                            <Event className={classes.sidebarIcon}/>
                            Calendar
                        </li>
                        </Link>
                        <Link to="/settings" className="link">
                            <li className={classes.sidebarListItem}>
                            <Settings className={classes.sidebarIcon}/>
                            Settings
                        </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideMenu
