import React, { useState } from "react";
import "date-fns";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PrintIcon from "@material-ui/icons/Print";
import DateFnsUtils from "@date-io/date-fns";
import thLocale from "date-fns/locale/th";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Link } from "react-router-dom";

function ReportTransition(props) {
	const [selectedDateStart, setSelectedDateStart] = useState(new Date());
	const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());

	const handleDateChangeStart = (date) => {
		setSelectedDateStart(date);
	};
	const handleDateChangeEnd = (date) => {
		setSelectedDateEnd(date);
	};
	const dateClicked = (date) => {
		props.dateStartClicked(selectedDateStart);
		props.dateEndClicked(selectedDateEnd);
	};
	return (
		<div>
			<Container maxWidth="md">
				<h1 align="center">
					{" "}
					รายงานแสดงการเข้าพักและย้ายออก(ตามช่วงเวลาที่กำหนด)
				</h1>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<MuiPickersUtilsProvider utils={DateFnsUtils} locale={thLocale}>
							<DatePicker
								variant="inline"
								openTo="year"
								views={["year", "month"]}
								label="เดือน/ปี เริ่มต้น"
								value={selectedDateStart}
								onChange={handleDateChangeStart}
							/>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid item xs={12} sm={6}>
						<MuiPickersUtilsProvider utils={DateFnsUtils} locale={thLocale}>
							<DatePicker
								variant="inline"
								openTo="year"
								views={["year", "month"]}
								label="เดือน/ปี สิ้นสุด"
								value={selectedDateEnd}
								onChange={handleDateChangeEnd}
							/>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid item xs={12} sm={6}></Grid>

					<Grid item xs={12} sm={6}>
						<Link to="createreportts">
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
		</div>
	);
}

export default ReportTransition;
