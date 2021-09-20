import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, IconButton } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
    dialog: {
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        textAlign: 'center',
        backgroundColor: 'green',
        color:'white',
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
}))

export default function Spinner(props) {

    const { spinner, setSpinner } = props;
    const classes = useStyles()

    return (
        <Dialog classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                Loading ...
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                    <CircularProgress />
            </DialogContent>
            {/* <DialogActions className={classes.dialogAction}>
                <Controls.Button
                    text="No"
                    color="default"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
                <Controls.Button
                    text="Yes"
                    color="secondary"
                    onClick={confirmDialog.onConfirm} />
            </DialogActions> */}
        </Dialog>
    )
}
