import React, { Fragment, useState } from "react";
import "date-fns";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import thLocale from "date-fns/locale/th";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import PrintIcon from "@material-ui/icons/Print";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Link } from "react-router-dom";
function ReportBill(props) {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};
	console.log(selectedDate);
	const dateClicked = (date) => {
		props.dateClicked(selectedDate);
	};
	return (
		<Fragment>
			<Container maxWidth="md">
				<h1 align="center"> รายงานสรุปยอดค่าเช่า(รายเดือน)</h1>
				<Grid container spacing={3}>
					<MuiPickersUtilsProvider utils={DateFnsUtils} locale={thLocale}>
						<DatePicker
							variant="inline"
							openTo="year"
							views={["year", "month"]}
							label="เดือน/ปี"
							value={selectedDate}
							onChange={handleDateChange}
						/>
					</MuiPickersUtilsProvider>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}>
						<Link to="createreportbill">
							<Button
								variant="contained"
								color="primary"
								size="large"
								startIcon={<PrintIcon />}
								onClick={dateClicked}
							>
								สร้างรายงาน
							</Button>
						</Link>
					</Grid>
				</Grid>
			</Container>
		</Fragment>
	);
}

export default ReportBill;
