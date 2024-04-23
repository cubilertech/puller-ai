import React , {useState} from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/base/FormControl';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
export default function ContextMenu(props) {
    console.log("props" , props)
  const id = 'simple-popper';
  const [value , setValue] = useState(props.label)
  const updateNode = () => {
    props.handleNodeLabelChange(props.id , value)
  }
  return (
    <Modal
        open={true}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <TextField id="filled-basic" label="Change node label" variant="filled" value={value} autoFocus onChange={(eve) => setValue(eve.target.value)} />
            <Button onClick={() => updateNode()}>Update Node</Button>
        </Box>
    </Modal>
  );
}

