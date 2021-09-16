import React from 'react';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const ManageFieldForm = (props) => {
  let classes = useStyles();
  const isDelete = props.type === 'Delete' ? true : false;

  return (
    <div style={getModalStyle()} className={classes.paper}>
      <h1>
        {props.type} {props.itemTitle}
      </h1>
      <form>
        <input
          type='text'
          placeholder={props.placeholder}
          onChange={props.onItemChange}
          value={props.item}
          disabled={isDelete}></input>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            props.onClick(props.item);
          }}>
          {props.type}
        </Button>
        <Button color='secondary' variant='outlined' onClick={props.closeModal}>
          Close
        </Button>
      </form>
    </div>
  );
};

export default ManageFieldForm;
