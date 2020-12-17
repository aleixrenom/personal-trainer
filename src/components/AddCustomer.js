import React from 'react';
import { 
	Button, 
	TextField, 
	Dialog, 
	DialogActions, 
	DialogContent, 
	DialogContentText, 
	DialogTitle, 
} from '@material-ui/core';

function AddCustomer(props) {
	const [open, setOpen] = React.useState(false);
	const [newCustomer, setNewCustomer] = React.useState({
		firstname:'', lastname:'', email:'', phone:'', streetaddress:'', postcode:'', city:'',
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAdd = () => {
		props.addCustomer(newCustomer);
		setNewCustomer({
			firstname:'', lastname:'', email:'', phone:'', streetaddress:'', postcode:'', city:'',
		});
		setOpen(false);
	};

	const inputChanged = (event) => {
		setNewCustomer({...newCustomer, [event.target.name]: event.target.value})
	};

	return(
		<div>
		<Button 
			variant="outlined" 
			color="primary" 
			onClick={handleClickOpen}
			size="small"
			style={{margin:10, width: 180}}
		>
			Add new customer
		</Button>
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Add new customer</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					name="firstname"
					label="First name"
					type="text"
					fullWidth
					value={newCustomer.firstname}
					onChange={(e) => inputChanged(e)}
				/>
				<TextField
					margin="dense"
					id="name"
					name="lastname"
					label="Last name"
					type="text"
					fullWidth
					value={newCustomer.lastname}
					onChange={(e) => inputChanged(e)}
				/>
				<TextField
					margin="dense"
					id="name"
					name="email"
					label="Email"
					type="email"
					fullWidth
					value={newCustomer.email}
					onChange={(e) => inputChanged(e)}
				/>
				<TextField
					margin="dense"
					id="name"
					name="phone"
					label="Phone"
					type="tel"
					fullWidth
					value={newCustomer.phone}
					onChange={(e) => inputChanged(e)}
				/>
				<TextField
					margin="dense"
					id="name"
					name="streetaddress"
					label="Address"
					type="text"
					fullWidth
					value={newCustomer.streetaddress}
					onChange={(e) => inputChanged(e)}
				/>
				<TextField
					margin="dense"
					id="name"
					name="postcode"
					label="Postcode"
					type="text"
					fullWidth
					value={newCustomer.postcode}
					onChange={(e) => inputChanged(e)}
				/>
				<TextField
					margin="dense"
					id="name"
					name="city"
					label="City"
					type="text"
					fullWidth
					value={newCustomer.city}
					onChange={(e) => inputChanged(e)}
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

export default AddCustomer;