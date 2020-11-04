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
		minWidth: 210,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

function MovieIn() {
	const classes = useStyles();
	const [date, setSelectedDate] = useState(new Date());
	const [renter, setRenter] = useState("");
	const [renter_id, setRenterID] = useState("");
	const [room_id, setRoomID] = useState("");
	const [room_type, setRoomType] = useState("");
	const [rooms, setRoom] = useState([]);
	const [errorSearch, setErrorSearch] = useState(false);
	const [errorSearchDetail, setErrorSearchDeatail] = useState("");


	useEffect(() => {
		if (room_type !== "") {
			API.roomCheck({ room_type })
				.then((resp) => resp.json())
				.then((resp) => setRoom(resp))
				.catch((error) => console.log(error));
		}
		if (renter.detail === "Not found.") {
			setErrorSearch(true)
			setErrorSearchDeatail("ไม่พบข้อมูลในระบบ")
		}
	}, [room_type, renter]);

	const handleChange = (evt) => {
		setRoomID(evt.target.value);
	};

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const handleRoomType = (evt) => {
		setRoomType(evt.target.value);
		setRoomID("");
	};

	const room_status = 1;

	const searchRenter = () => {
		setErrorSearch(false)
		setErrorSearchDeatail("")
		API.searchRenter( renter_id)
			.then((resp) => resp.json())
			.then((resp) => setRenter(resp))
			.catch((error) => console.log(error));
	};
	const CreateMoveIn = () => {
		API.MoveinCreate({
			room_id,
			renter_id,
			move_in_date,
		})
			.then((resp) => console.log(resp))
			.then(API.updateRoomStatus(room_id, { room_id, room_status, room_type }))
			.then(API.CreateServiceCharge({ room_id }))
			.then(setRenterID(""), setRoomID(""), setRoomType(""))
			.catch((error) => console.log(error));
	};

	let move_in_date =
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

	return (
		<div>
			<Container maxWidth="md">
				<h1 align="center">บันทึกข้อมูลการเข้าพัก</h1>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<Grid item xs={12}>
							<TextField
								required
								error={errorSearch}
								id="renter_id"
								label="รหัสผู้เช่า"
								value={renter_id}
								helperText={errorSearchDetail}
								onChange={(evt) => setRenterID(evt.target.value)}
							/>
						
							<Button
								variant="contained"
								color="primary"
								size="large"
								startIcon={<SearchIcon />}
								onClick={searchRenter}
							></Button>
						</Grid>
						<br></br>
					</Grid>

					<Grid key={renter.renter_id} item xs={12} sm={6}>
						<TextField
							disabled
							id="name"
							label="ชื่อผู้เช่า"
							value={renter.firstname}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<FormControl className={classes.formControl}>
							<InputLabel id="room_type">ประเภทห้องที่เข้าพัก</InputLabel>

							<Select
								labelId="room_type_s"
								id="room_type_select"
								value={room_type}
								onChange={handleRoomType}
							>
								<MenuItem value={1}>ห้องเปล่า</MenuItem>
								<MenuItem value={2}>ห้องเฟอร์นิเจอร์</MenuItem>
								<MenuItem value={3}>ห้องแอร์</MenuItem>
								<MenuItem value={4}>ห้องเฟอร์นิเจอร์+แอร์</MenuItem>
							</Select>

							<FormHelperText></FormHelperText>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={6}>
						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">
								ห้องที่ต้องการเข้าพัก
							</InputLabel>

							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={room_id}
								onChange={handleChange}
							>
								{rooms.map((room) => {
									return (
										<MenuItem key={room.room_id} value={room.room_id}>
											{room.room_id}
										</MenuItem>
									);
								})}
							</Select>

							<FormHelperText></FormHelperText>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={6}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								disableToolbar
								variant="inline"
								format="yyyy/MM/dd"
								margin="normal"
								id="date-picker-inline"
								label="วันเข้าพัก "
								value={date}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									"aria-label": "change date",
								}}
							/>
						</MuiPickersUtilsProvider>
					</Grid>

					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}></Grid>

					<Grid item xs={12} sm={6}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SaveIcon />}
							onClick={CreateMoveIn}
						>
							บันทึก
						</Button>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default MovieIn;
