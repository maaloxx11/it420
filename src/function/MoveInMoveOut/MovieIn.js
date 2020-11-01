import React, { useState } from "react";
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

	const [renter, setRenter] = useState([]);
	const [renter_id, setRenterID] = useState("");
	const [room_id, setRoomID] = useState("");
	const [room_type, setRoomType] = useState("");
	const handleChange = (event) => {
		setRoomID(event.target.value);
	};
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};
	const searchRenter = () => {
		API.searchRenter({ renter_id })
			.then((resp) => resp.json())
			.then((resp) => setRenter(resp))
			.catch((error) => console.log(error));
	};
	console.log(renter);
	return (
		<div>
			<Container maxWidth="md">
				<h1 align="center">บันทึกข้อมูลการเข้าพัก</h1>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<Grid item xs={12}>
							<TextField
								required
								id="renter_id"
								label="รหัสผู้เช่า"
								value={renter_id}
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
								onChange={(evt) => setRoomType(evt.target.value)}
							>
								<MenuItem value={1}>ห้องเปล่า</MenuItem>
								<MenuItem value={2}>ห้องเปล่า+เฟอร์นิเจอร์</MenuItem>
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
								<MenuItem value={10}>Tenrrrrrrrrrrrrrrr</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
							<FormHelperText></FormHelperText>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={6}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								disableToolbar
								variant="inline"
								format="dd/MM/yyyy"
								margin="normal"
								id="date-picker-inline"
								label="วันเข้าพัก "
								value={selectedDate}
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
