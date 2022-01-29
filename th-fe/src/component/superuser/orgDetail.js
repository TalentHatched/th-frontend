import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";
import axios from "axios";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const OrgDetail = (props) => {
  const [orgDetail, setOrgDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`api/userAdminOrg/${props.orgId}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((detail) => {
        setOrgDetail(detail.data);
      });
  }, [props.orgId]);

  const convertDate = (date) => {
    let splitDate = date.split(" ");
    return splitDate[0];
  };

  const onAdminCardClick = (info) => {
    props.viewApplicantClick(info);
  };

  return (
    <div>
      <div>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => props.handleReturnClick("")}>
          Back to Organization List
        </Button>
      </div>
      <Typography variant='h5' style={{ textAlign: "center" }}>
        {props.orgData.orgName}
      </Typography>
      {orgDetail.data && orgDetail.data.length ? (
        <div>
          {orgDetail.data.map((user) => {
            return (
              <Card>
                <CardContent>
                  <Typography variant='h5'>
                    {user.userFirstName} {user.userLastName}
                  </Typography>
                  <Typography>{user.userEmail}</Typography>
                  <Typography>
                    Active since: {convertDate(user.registrationDate)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size='small' onClick={() => onAdminCardClick(user)}>
                    View Linked Applicants
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default OrgDetail;