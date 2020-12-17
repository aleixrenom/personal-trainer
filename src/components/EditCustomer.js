import React from 'react';
import { 
	Button,
	IconButton,
	TextField, 
	Dialog, 
	DialogActions, 
	DialogContent, 
	DialogTitle, 
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

function EditCustomer(props) {
	const [open, setOpen] = React.useState(false);
	const [customer, setCustomer] = React.useState({
		firstname:'', lastname:'', email:'', phone:'', streetaddress:'', postcode:'', city:'',
	});

	const handleClickOpen = () => {
		setCustomer({
			firstname: props.customer.firstname, 
			lastname: props.customer.lastname, 
			email: props.customer.email, 
			phone: props.customer.phone, 
			streetaddress: props.customer.streetaddress, 
			postcode: props.customer.postcode, 
			city: props.customer.city,
		});
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAccept = () => {
		props.editCustomer(props.customer.links[0].href, customer);
		setCustomer({
			firstname:'', lastname:'', email:'', phone:'', streetaddress:'', postcode:'', city:'',
		});
		setOpen(false);
	};

	const inputChanged = (event) => {
		setCustomer({...customer, [event.target.name]: event.target.value})
	};

	return(
		<div>
		<IconButton
			color="primary"
			onClick={handleClickOpen}
			aria-label="Edit customer"
		>
			<EditIcon />
		</IconButton>
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					name="firstname"
					label="First name"
					type="text"
					fullWidth
					value={customer.firstname}
					onChange={(e) => inputChanged(e)}
				/>
				<TextField
					margin="dense"
					id="name"
					name="lastname"
					label="Last name"
					type="text"
					fullWidth
					value={customer.lastname}
					onChange={(e) => inputChanged(e)}
				/>
				<TextField
					margin="dense"
					id="name"
					name="email"
					label="Email"
					type="email"
					fullWidth
					value={customer.email}
					onChange={(e) => inputChanged(e)}
				/>
				<TextField
					margin="dense"
					id="name"
					name="phone"
					label="Phone"
					type="tel"
					fullWidth
					value={customer.phone}
					onChange={(e) => inputChanged(e)}
				/>
				<TextField
					margin="dense"
					id="name"
					name="streetaddress"
					label="Address"
					type="text"
					fullWidth
					value={customer.streetaddress}
					onChange={(e) => inputChanged(e)}
				/>
				<TextField
					margin="dense"
					id="name"
					name="postcode"
					label="Postcode"
					type="text"
					fullWidth
					value={customer.postcode}
					onChange={(e) => inputChanged(e)}
				/>
				<TextField
					margin="dense"
					id="name"
					name="city"
					label="City"
					type="text"
					fullWidth
					value={customer.city}
					onChange={(e) => inputChanged(e)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleAccept} color="primary">
					Accept
				</Button>
			</DialogActions>
      	</Dialog>
		</div>
	);	
}

export default EditCustomer;