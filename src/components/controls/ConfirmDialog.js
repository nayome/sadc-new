import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles } from '@material-ui/core'
import Controls from "./Controls";


const useStyles = makeStyles(theme => ({
    dialog: {
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        textAlign: 'center',
        backgroundColor: 'red',
        color:'white',
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
}))

export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props;
    const classes = useStyles()

    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                {confirmDialog.title}
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Controls.Button
                    text="No"
                    color="default"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
                <Controls.Button
                    text="Yes"
                    color="secondary"
                    onClick={confirmDialog.onConfirm} />
            </DialogActions>
        </Dialog>
    )
}
