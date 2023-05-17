import React from 'react';
import { IconButton, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { get } from 'lodash';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const Modal = (props) => {
  const onClose = get(props, 'onClose', null);
  const container = get(props, 'container', null)

  return (
    <Dialog
      open={get(props, 'open', false)}
      onClose={onClose}
      maxWidth='xl'
      disableScrollLock={true}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      sx={{ ...get(props, 'sxDialog', undefined) }}
    >
      <DialogTitle sx={{ fontFamily: 'sans-serif', fontSize: { lg: 23, md: 20, sm: 20, xs: 20 }, id: 'draggable-dialog-title', cursor: 'move', backgroundColor: 'rgba(25, 120, 180, 0.8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
        {get(props, 'title', '')}
      </DialogTitle>
      <DialogContent sx={{ m: 0, p: 0, ...get(props, 'sxContent', undefined) }}>
        {
          container !== null ? React.createElement(get(props, 'container'), {
            ...get(props, 'containerProps', {}),
            onClose
          }) : <></>
        }
      </DialogContent>
    </Dialog>
  );
}

export default Modal;