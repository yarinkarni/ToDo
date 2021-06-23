import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
let url = 'http://localhost:60812/'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    height: '100%'
  },
}));
const TabToDo = ({ AllTasks }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [dense] = useState(false);
  const handleUpdate = e => {
    async function fetchApi() {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ TaskDate: e.TaskDate, TaskText: e.TaskText, TaskDone: !e.TaskDone, TaskID: e.TaskID })
      };
      await fetch('http://localhost:60812/UpdateTasks', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
        });
    } fetchApi()
  }
  const handleDelete = e => {
    async function fetchApi() {
      await fetch(url + 'DeleteTasks/' + e,
        {
          method: 'DELETE'
        }
      )
        .then(m => m.json())
        .then(() => {
          console.log(AllTasks)
        })
    } fetchApi()
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example">
          <Tab label="undone" {...a11yProps(0)} />
          <Tab label="done" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid >
            <List dense={dense} >
              {AllTasks.map(item => (
                !item.TaskDone ?
                  <ListItem button
                    onClick={() => handleUpdate(item)}
                    key={item.TaskID} >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.TaskText}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete"
                        onClick={() => {
                          handleDelete(item.TaskID)
                        }}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  : null
              ))}
            </List>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <List dense={dense} >
            {AllTasks.map(item => (
              item.TaskDone ?
                <ListItem button
                  onClick={() => handleUpdate(item)}
                  key={item.TaskID} >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText style={{ textDecoration: 'line-through' }}
                    primary={item.TaskText}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete"
                      onClick={() => handleDelete(item.TaskID)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                : null
            ))}
          </List>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
export default TabToDo;