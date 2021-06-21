import React, { Component, useEffect, useState } from 'react'
// import Api from './Api.jsx'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tab from '../Tabs/Tab.jsx'
import AddTask from './AddTask'
export default function Home() {
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
  const [AllTasks, setAllTasks] = useState([]);
  const [TaskIDToDelete, setTaskIDToDelete] = useState(0);
  useEffect(() => {
    
  }, [AllTasks])
  return (
    <div className="App">
      <nav className="bg-info fixed-top" style={{ height: '7%' }}>
      </nav>
      <footer className="navbar fixed-bottom bg-info" style={{ height: '7%' }}>
      </footer>
      <div className={classes.root} style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '5%' }}>
        <Paper elevation={20} style={{ paddingBottom: '38%', width: '70%' }} >
          <h3 className="m-3 d-flex justify-content-center">All Tasks</h3>
          {console.log(AllTasks, 'AllTasksHome1')}
          <Tab setAllTasks={setAllTasks} />
          <AddTask setAllTasks={setAllTasks} />
          {console.log(AllTasks, 'AllTasksHome2')}

        </Paper>
      </div>
    </div>
  )
}