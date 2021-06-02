import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

export default function ConfirmDialog(params) {
    const { title, children, open, setOpen, onConfirm, item, index } = params;
    return (
        <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="confirm-dialog"
        >
        <DialogTitle id="confirm-dialog">{title}</DialogTitle>
        <DialogContent><Box fontWeight="fontWeightBold">{children}</Box></DialogContent>
        <DialogActions>
            <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpen(false)}
            >
            No
            </Button>
            <Button
            variant="contained"
            onClick={() => {
                setOpen(false);
                onConfirm(item,index);
            }}
            >
            Yes
            </Button>
        </DialogActions>
        </Dialog>
    );
};
