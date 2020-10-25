import React, { useState } from "react";
import "date-fns";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PrintIcon from "@material-ui/icons/Print";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(0),
		minWidth: 170,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));
function ReportBill() {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};
	return (
		<div>
			<Container maxWidth="md">
				<h1 align="center"> รายงานสรุปยอดค่าเช่า(รายเดือน)</h1>
				<Grid container spacing={3}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="MM/yyyy"
							margin="normal"
							id="date-picker-inline"
							label="ระบุเดือน/ปี "
							value={selectedDate}
							onChange={handleDateChange}
							KeyboardButtonProps={{
								"aria-label": "change date",
							}}
						/>
					</MuiPickersUtilsProvider>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<PrintIcon />}
						>
							พิมพ์รายงาน
						</Button>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default ReportBill;
