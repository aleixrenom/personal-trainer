import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import EventIcon from '@material-ui/icons/Event';
import EqualizerIcon from '@material-ui/icons/Equalizer';

import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));

function App() {
  const classes = useStyles();
  const [drawerState, setDrawerState] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerState(open);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
		<ListItem button={true} onClick={() => {setValue(0);}}>
            <ListItemIcon>{<AccountBoxIcon />}</ListItemIcon>
        	<ListItemText primary={'Customers'} />
        </ListItem>
		<ListItem button={true} onClick={() => {setValue(1);}}>
            <ListItemIcon>{<DirectionsRunIcon />}</ListItemIcon>
        	<ListItemText primary={'Trainings'} />
        </ListItem>
		<ListItem button={true} onClick={() => {setValue(2);}}>
            <ListItemIcon>{<EventIcon />}</ListItemIcon>
        	<ListItemText primary={'Calendar'} />
        </ListItem>
		<ListItem button={true} onClick={() => {setValue(3);}}>
            <ListItemIcon>{<EqualizerIcon />}</ListItemIcon>
        	<ListItemText primary={'Statistics'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

			<IconButton 
				edge="start" 
				className={classes.menuButton} 
				color="inherit" 
				aria-label="menu"
				onClick={toggleDrawer(true)}
			>
				<MenuIcon />
			</IconButton>
			<Drawer anchor={'left'} open={drawerState} onClose={toggleDrawer(false)}>
				{list()}
			</Drawer>

        	<Typography variant="h6" className={classes.title}>
        		Personal Trainer
        	</Typography>
        </Toolbar>
      </AppBar>

		<div>
			{
			value === 0 ? (
				<Customers/>
			) :
			value === 1 ?
			(
				<Trainings />
			) :
			value === 2 ?
			(
				<Calendar />
			) :
			(
				<Statistics />
			)
			}
		</div>
    </div>
  );
}

export default App;
