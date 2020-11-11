import React, { useState, useEffect } from "react";
import "date-fns";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PrintIcon from "@material-ui/icons/Print";
import DateFnsUtils from "@date-io/date-fns";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import thLocale from "date-fns/locale/th";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Link } from "react-router-dom";
import FormHelperText from "@material-ui/core/FormHelperText";
function ReportTransition(props) {
	const [selectedDateStart, setSelectedDateStart] = useState(new Date());
	const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());
	const [display, setDisplay] = useState(1);
	const [error, setError] = useState(false);
	const [errordetail, setErrorDetail] = useState("");
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	const handleDateChangeStart = (date) => {
		setSelectedDateStart(date);
	};
	const handleDateChangeEnd = (date) => {
		setSelectedDateEnd(date);
	};
	useEffect(() => {
		if (selectedDateStart.getFullYear() !== selectedDateEnd.getFullYear()) {
			setDisplay(0);
			setError(true);
			setErrorDetail("ปีเริ่มต้นกับปีสิ้นสุดต้องเป็นปีเดียวกัน");
		} else {
			setDisplay(1);
			setError(false);
			setErrorDetail("");
		}
		console.log(selectedDateStart.getFullYear());
		console.log(selectedDateEnd.getFullYear());
	}, [selectedDateStart, selectedDateEnd]);

	const dateClicked = (date) => {
		if (selectedDateStart.getFullYear() !== selectedDateEnd.getFullYear()) {
			setOpen(true);
		} else {
			props.dateStartClicked(selectedDateStart);
			props.dateEndClicked(selectedDateEnd);
		}
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
						<FormHelperText error={error}>{errordetail}</FormHelperText>
					</Grid>
					<Grid item xs={12} sm={6}></Grid>

					<Grid item xs={12} sm={6}>
						<Link to={display ? "createreportts" : "#"}>
							<Button
								variant="contained"
								color="primary"
								size="large"
								display="none"
								startIcon={<PrintIcon />}
								onClick={dateClicked}
							>
								สร้างรายงาน
							</Button>
						</Link>
					</Grid>
					<Dialog
						open={open}
						onClose={handleClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
							แสดงผลการดำเนินการ
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								กรุณาตรวจสอบการระบุช่วงเวลาอีกครั้ง
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} color="primary">
								ปิด
							</Button>
						</DialogActions>
					</Dialog>
				</Grid>
			</Container>
		</div>
	);
}

export default ReportTransition;
