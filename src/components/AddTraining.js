import React from 'react';
import { 
	Button, 
	TextField, 
	Dialog, 
	DialogActions, 
	DialogContent, 
	DialogTitle,
} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
  } from '@material-ui/pickers';

function AddTraining(props) {
	const [open, setOpen] = React.useState(false);
	const [newTraining, setNewTraining] = React.useState({
		date: '', activity: '', duration: '', customer: '',
	});
	const [selectedDate, setSelectedDate] = React.useState(new Date());

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAdd = () => {	
		const returnTraining = {
			date: selectedDate.toISOString(),
			activity: newTraining.activity,
			duration: newTraining.duration,
			customer: props.customer.links[0].href,
		};
		props.addTraining(returnTraining);
		setNewTraining({
			date: '', activity: '', duration: '', customer: '',
		});
		setOpen(false);
	};

	const inputChanged = (event) => {
		setNewTraining({...newTraining, [event.target.name]: event.target.value});
	};

	return(
		<div>
		<Button 
			color="primary" 
			onClick={handleClickOpen}
			size="small"
		>
			Add training
		</Button>
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Add new training</DialogTitle>
			<DialogContent style={{display: 'flex', flexDirection: 'column'}}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					margin="normal"
					id="date-picker-dialog"
					label="Date"
					format="MM/dd/yyyy"
					value={selectedDate}
					onChange={handleDateChange}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
				<KeyboardTimePicker
					margin="normal"
					id="time-picker"
					label="Time"
					value={selectedDate}
					onChange={handleDateChange}
					KeyboardButtonProps={{
						'aria-label': 'change time',
					}}
				/>
			</MuiPickersUtilsProvider>
				<TextField
					id="name"
					name="duration"
					label="Duration"
					type="time"
					defaultValue="00:00"
					InputLabelProps={{
						shrink: true,
					}}
					inputProps={{
						step: 300, // 5 min
					}}
					onChange={(e) => inputChanged(e)}
				/>
				<TextField
					margin="dense"
					id="name"
					name="activity"
					label="Activity"
					type="text"
					fullWidth
					value={newTraining.activity}
					onChange={(e) => inputChanged(e)}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleAdd} color="primary">
					Add
				</Button>
			</DialogActions>
      	</Dialog>
		</div>
	);	
}

export default AddTraining;