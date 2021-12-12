import React from "react"

import { Button } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";


const profileComplete = (props) => {
    return (
        <div>
            <h1>Way to go!</h1>
            <h2>You've completed your profile.</h2>
            <Button
          color='primary'
          variant='outlined'
          endIcon={<ArrowForwardIcon />}
          onClick={()=>props.viewProfileClick()}
        >
         View Profile
        </Button>
        </div>
    )
}

export default profileComplete;