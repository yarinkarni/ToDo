import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Api from './Api'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
const handleUpdate = e => {
  let obj2Send = {
    "TaskDate": e.TaskDate,
    "TaskText": e.TaskText,
    "TaskDone": !e.TaskDone,
    "TaskID": e.TaskID,
  }
  Api.Api('UpdateTasks', 'Put', obj2Send)
}
const handleDelete = e => {
  Api.Api('DeleteTasks/' + e, 'DELETE')
};
const ListAllTasks = ({ allTasks }) => {
  return (
    <Grid >
      <List>
        {allTasks.map(item => (
          <ListItem button
            onClick={() => handleUpdate(item)}
            key={item.TaskID} >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText style={item.TaskDone ? { textDecoration: 'line-through' } : {}}
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
        ))}
      </List>
    </Grid>
  )
}
export default ListAllTasks;