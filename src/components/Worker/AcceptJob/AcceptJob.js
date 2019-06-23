import React from 'react';
import { FirebaseContext } from '../../../firebase';
import {toTitleCase} from '../../../utils';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },

}));

 function AcceptJob(props) {
    const {firebase, user} = React.useContext(FirebaseContext);
    const [job, setJob] = React.useState(false);
    const jobID = props.match.params.jobID;
    const workerID = props.match.params.workerID;

    const classes = useStyles();

    React.useEffect(() => {
       firebase.getJobData(jobID).then(job => {
           
        setJob(job.data);
        if (!job.data.available.includes(workerID)) {
            //axios.post()
            console.log("posting new available worker", workerID);
        }
        //console.log(job,"JOB DATA", job.data);
       });
       
    }, []);
    




    console.log(jobID, workerID);

    return (!job ?
        //the job data hasn't been loaded yet
        (
        <div  style={{textAlign: 'center'}}>
            <CircularProgress className={classes.progress} />
            <br/>
            Loading...
        </div>)
    :   
    //we have job data to show 
        (
        <div className="center flex flex-column">
            <p>You've applied to:</p>
            <h1>{toTitleCase(job['name'])}</h1>
            <br/>
            <h4>Details:</h4>
            <p>{job.description}</p>
            <br/>
            <p>At a pay rate of {job.hourly ? 
                <>${job.rate} per hour for {job.hours} hours.<br/>
                Total: <b>${job.rate * job.hours}</b></>
                : 
                <><b>${job.rate}</b> for the day</>}.</p>
            <hr/>
            <hr/>
            <h3>Thank You For Applying To This Job</h3>
        <p>You'll be notified soon if the hirer selects you to work2day.
            <br/>
            -
            <br/>
            You can safely close this window
        </p>
           
        </div>
        )
    )
    
}
export default AcceptJob;

