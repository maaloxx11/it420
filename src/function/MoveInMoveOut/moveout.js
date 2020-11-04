import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import { API } from "../../api-service";
import "date-fns";
import {
	MuiPickersUtilsProvider,
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
	print: {
		pageBreakAfter: "auto",
	},
}));

function MovieOut() {
	const classes = useStyles();
	const [renter_id, setRenterID] = useState("");
	const [room_id, setRoomID] = useState("");
	const [id, setID] = useState("");
	const [renter, setRenter] = useState(null);
	const [service, setServicecharge] = useState(null);
	const [firstname, setFirstname] = useState("");
	const [move_in, setMovein] = useState("");
	const [debt, setDebt] = useState("");
	const [date, setSelectedDate] = useState(new Date());
	const [rooms, setRoom] = useState([]);
	const [Selroom, setSelRoom] = useState(null);
	const Reset = () => {
		setRoomID("");
		setRenter(null);
		setServicecharge(null);
		setFirstname("");
		setRoom([]);
		setDebt("");
		setMovein("");
	};

	const handleChange = (event) => {
		setRoomID(event.target.value);
	};
	const UpdateMoveOut = () => {
		API.updateMoveOut(id, {
			room_id,
			renter_id,
			move_in_date,
			move_out_date,
		})
			.then(Reset())
			.then(setRenterID(""))
			.catch((error) => console.log(error));
	};
	let move_out_date =
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

	let move_in1 = new Date(move_in);

	let move_in_date =
		move_in1.getFullYear() +
		"-" +
		(move_in1.getMonth() + 1) +
		"-" +
		move_in1.getDate();

	let debt_status = { 1: "คุณมียอดค้างชำระ", 0: "คุณไม่มียอดค้างชำระ" };

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};
	const searchRenterTs = () => {
		Reset();
		API.searchRenterTs({ renter_id })
			.then((resp) => resp.json())
			.then((resp) => setRoom(resp))
			.then(
				API.searchRenter(renter_id)
					.then((resp) => resp.json())
					.then((resp) => setRenter(resp))
					.catch((error) => console.log(error))
			)
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		if (renter !== null) {
			setFirstname(renter.firstname);
		}
		if (room_id !== "") {
			setID(Selroom.id);
			setMovein(Selroom.move_in_date);
			API.searchPayment(room_id)
				.then((resp) => resp.json())
				.then((resp) => setServicecharge(resp))
				.catch((error) => console.log(error));
		}
	}, [renter, room_id, rooms, Selroom]);

	useEffect(() => {
		if (service !== null && service.length > 0) {
			setDebt("คุณมียอดค้าชำระ");
		} else if (service !== null) {
			setDebt("คุณไม่มียอดค้าชำระ");
		}
	}, [service, debt_status]);
	const handleRoomChange = (evt) => {
		setRoomID(evt.target.value);
	};
	const handleClicked = (room) => (evt) => {
		setSelRoom(room);
	};

	return (
		<div>
			<Container maxWidth="md">
				<h1 align="center">บันทึกข้อมูลการย้ายออก</h1>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="standard-basic"
							label="รหัสผู้เช่า"
							value={renter_id}
							onChange={(evt) => setRenterID(evt.target.value)}
						/>

						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SearchIcon />}
							onClick={searchRenterTs}
						></Button>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="firstname"
							label="ชื่อผู้เช่า"
							value={firstname}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">
								ห้องที่ต้องการย้ายออก
							</InputLabel>
							{rooms ? (
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={room_id}
									onChange={handleChange}
								>
									{rooms.map((room) => {
										return (
											<MenuItem
												key={room.room_id}
												value={room.room_id}
												onClick={handleClicked(room)}
											>
												{room.room_id}
											</MenuItem>
										);
									})}
								</Select>
							) : (
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={room_id}
									onChange={handleRoomChange}
								>
									<MenuItem value={""}></MenuItem>
								</Select>
							)}
							<FormHelperText></FormHelperText>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="debt"
							label="สถานะยอดค้างชำระ"
							value={debt}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="move_in_date"
							label="วันเข้าพัก"
							value={move_in}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								disableToolbar
								variant="inline"
								format="yyyy-MM-dd"
								margin="normal"
								id="date-picker-inline"
								label="วันย้ายออก "
								value={date}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									"aria-label": "change date",
								}}
							/>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SaveIcon />}
							onClick={UpdateMoveOut}
						>
							บันทึก
						</Button>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default MovieOut;
