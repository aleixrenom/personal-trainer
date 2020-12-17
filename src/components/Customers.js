import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Customers() {
	const [customers, setCustomers] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [msg, setMsg] = React.useState('');

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const getCustomers = () => {
		fetch('https://customerrest.herokuapp.com/api/customers')
		.then(response => response.json())
		.then(data => setCustomers(data.content.map(customerObject => {
			return {id: customerObject.links[0].href, ...customerObject};
		})))
		.catch(err => console.error(err))
	}

	const addCustomer = (customer) => {
		fetch('https://customerrest.herokuapp.com/api/customers',
		{
			method: 'POST',
			headers: {'Content-type':'application/json'},
			body: JSON.stringify(customer)
		}
		)
		.then(_ => getCustomers())
		.then(_ => {
			setMsg('Customer added');
			setOpen(true);
		})
		.catch(err => console.error(err))
	}

	const editCustomer = (link, customer) => {
		fetch(link,
		{
			method: 'PUT',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(customer)
		})
		.then(_ => getCustomers())
		.then(_ => {
			setMsg('Customer updated');
			setOpen(true);
		})
		.catch(err => console.error(err))
	}

	const deleteCustomer = (link) => {
		if (window.confirm('Are you sure?'))
		fetch(link, {method: 'DELETE'})
		.then(_ => getCustomers())
		.then(_ => {
			setMsg('Customer deleted');
			setOpen(true);
		})
		.catch(err => console.error(err))
	}

	const addTraining = (training) => {
		fetch('https://customerrest.herokuapp.com/api/trainings',
		{
			method: 'POST',
			headers: {'Content-type':'application/json'},
			body: JSON.stringify(training)
		}
		)
		.then(_ => getCustomers())
		.then(_ => {
			setMsg('Training added');
			setOpen(true);
		})
		.catch(err => console.error(err))
	}

	React.useEffect(() => {
		getCustomers();
	}, [])

	const rows = customers;

	const columns = [
		{
			field: 'actions',
			headerName: 'Actions',
			width: 130,
			sortable: false,
			renderCell: (row) => (
				<div style={{display: 'flex', flexDirection: 'row'}}>
					<IconButton
						color="primary"
						onClick={() => deleteCustomer(row.row.links[0].href)}
						aria-label="Delete customer"
					>
						<DeleteIcon />
					</IconButton>
					<EditCustomer editCustomer={editCustomer} customer={row.row} />
				</div>
			),
		},
		{
			field: '',
			headerName: '',
			width: 140,
			sortable: false,
			renderCell: (row) => (
				<div>
					<AddTraining addTraining={addTraining} customer={row.row} />
				</div>
			),
		},
		{
			field: 'firstname',
			headerName: 'First name',
			width: 130
		},
		{
			field: 'lastname',
			headerName: 'Last Name',
			width: 130
		},
		{
			field: 'email',
			headerName: 'Email',
			width: 130
		},
		{
			field: 'phone',
			headerName: 'Phone',
			width: 130
		},
		{
			field: 'streetaddress',
			headerName: 'Address',
			width: 130
		},
		{
			field: 'postcode',
			headerName: 'Postcode',
			width: 130
		},
		{
			field: 'city',
			headerName: 'City',
			width: 130
		},
	  ];
	
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 450 }}>      
		<AddCustomer addCustomer={addCustomer} />
    	<DataGrid rows={rows} columns={columns} pageSize={6} disableSelectionOnClick />
		<Snackbar
			open={open}
			autoHideDuration={3000}
			onClose={handleClose}
			message={msg}
		/>
    </div>
  );
}
