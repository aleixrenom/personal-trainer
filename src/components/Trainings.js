import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

export default function Trainings() {
	const [trainings, setTrainings] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [msg, setMsg] = React.useState('');

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const getTrainings = () => {
		fetch('https://customerrest.herokuapp.com/api/trainings')
		.then(response => response.json())
		.then(data => setTrainings(data.content.map(trainingObject => {
			return {id: trainingObject.links[0].href, ...trainingObject};
		})))
		.catch(err => console.error(err))
	}

	const deleteTraining = (link) => {
		if (window.confirm('Are you sure?'))
		fetch(link, {method: 'DELETE'})
		.then(_ => getTrainings())
		.then(_ => {
			setMsg('Training deleted');
			setOpen(true);
		})
		.catch(err => console.error(err))
	}

	React.useEffect(() => {
		getTrainings();
	}, [])

	const rows = trainings;

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
						onClick={() => deleteTraining(row.row.links[0].href)}
						aria-label="Delete customer"
					>
						<DeleteIcon />
					</IconButton>
				</div>
			),
		},
		{
			field: 'activity',
			headerName: 'Activity',
			width: 130
		},
		{
			field: 'date',
			headerName: 'Date',
			width: 180,
			valueFormatter: (params) => moment(params.value).format("D.M.YYYY hh.mm a"),
		},
		{
			field: 'duration',
			headerName: 'Duration (min)',
			width: 130,
		},
		// {
		// 	field: 'customer',
		// 	headerName: 'Customer',
		// 	width: 130
		// },
	  ];
	
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 450 }}>      
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
