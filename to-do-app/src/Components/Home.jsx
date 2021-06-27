import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tab from '../Tabs/Tab.jsx'
import AddTask from './AddTask'
import Api from './Api'
export default function Home() {
  const [allTasks, setAllTasks] = useState([]);
  useEffect(() => {
    Api.Api('GetAllTasks', 'GET')
      .then(data => setAllTasks(data))
  }, [allTasks])
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));
  const classes = useStyles();
  return (
    <div className="App">
      <nav className="bg-info fixed-top" style={{ height: '7%' }}>
      </nav>
      <footer className="navbar fixed-bottom bg-info" style={{ height: '7%' }}>
      </footer>
      <div className={classes.root} style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '5%' }}>
        <Paper elevation={20} style={{ paddingBottom: '38%', width: '70%' }} >
          <h3 className="m-3 d-flex justify-content-center">All Tasks</h3>
          <Tab allTasks={allTasks} />
          <AddTask setAllTasks={setAllTasks} />
        </Paper>
      </div>
    </div>
  )
}