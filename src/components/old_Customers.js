import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
	table: {
	  minWidth: 650,
	},
  });
  
function Customers() {
	const classes = useStyles();
	const [customers, setCustomers] = React.useState([]);

	const getCustomers = () => {
		fetch('https://customerrest.herokuapp.com/api/customers')
		.then(response => response.json())
		.then(data => setCustomers(data.content))
		.catch(err => console.error(err))
	}

	React.useEffect(() => {
		getCustomers();
	}, [])

	const rows = customers;

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
			<TableHead>
				<TableRow>
				<TableCell>Actions</TableCell>
				<TableCell></TableCell>
				<TableCell>First name</TableCell>
				<TableCell>Last name</TableCell>
				<TableCell>Email</TableCell>
				<TableCell>Phone</TableCell>
				<TableCell>Address</TableCell>
				<TableCell>Postcode</TableCell>
				<TableCell>City</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{rows.map((row) => (
				<TableRow key={row.links[0].href}>
					<TableCell>Actions</TableCell>
					<TableCell>Add training</TableCell>
					<TableCell>{row.firstname}</TableCell>
					<TableCell>{row.lastname}</TableCell>
					<TableCell>{row.email}</TableCell>
					<TableCell>{row.phone}</TableCell>
					<TableCell>{row.streetaddress}</TableCell>
					<TableCell>{row.postcode}</TableCell>
					<TableCell>{row.city}</TableCell>
				</TableRow>
				))}
			</TableBody>
			</Table>
		</TableContainer>
	);
}

export default Customers;