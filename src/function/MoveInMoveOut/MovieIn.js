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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { API } from "../../api-service";
import ReturnHome from "../../ReturnHome.js";
import { useCookies } from "react-cookie";
import ReturnLogin from "../../ReturnLogin.js";
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
	const [token] = useCookies(["mr-token"]);
	const [date, setSelectedDate] = useState(new Date());
	const [renter, setRenter] = useState("");
	const [renter_id, setRenterID] = useState("");
	const [room_id, setRoomID] = useState("");
	const [room_type, setRoomType] = useState("");
	const [rooms, setRoom] = useState([]);
	const [errorRenterID, setErrorRenterID] = useState(false);
	const [errorRenterIDDetail, setErrorRenterIDDeatail] = useState("");
	const [errorRoom, setErrorRoom] = useState(false);
	const [errorRoomDetail, setErrorRoomDeatail] = useState("");
	const [open, setOpen] = useState(false);
	const [openDetail, setOpenDetail] = useState("");
	const [sendTotal, setsendTotal] = useState(false);
	const [openConfirm, setOpenConfirm] = useState(false);
	const handleOpen = () => {
		setOpenConfirm(true);
	};
	const handleClose = () => {
		setOpen(false);
		setOpenConfirm(false);
	};
	useEffect(() => {
		if (token["mr-token"]) {
			if (room_type !== "") {
				API.roomCheck({ room_type }, token["mr-token"])
					.then((resp) => resp.json())
					.then((resp) => setRoom(resp))
					.catch((error) => console.log(error));
			}

			if (renter.detail === "Not found.") {
				setErrorRenterID(true);
				setErrorRenterIDDeatail("ไม่พบข้อมูลในระบบ");
			} else {
				setErrorRenterID(false);
				setErrorRenterIDDeatail("");
			}
		}
	}, [room_type, renter, token]);
	useEffect(() => {
		if (token["mr-token"]) {
			if (room_type !== "" && rooms.length === 0) {
				setErrorRoom(true);
				setErrorRoomDeatail("ไม่พบห้องว่างในระบบกรุณาเลือกประเภทห้องใหม่");
			} else {
				setErrorRoom(false);
				setErrorRoomDeatail("");
			}
			if (sendTotal === true) {
				API.UpdateTotalFirst(room_id, token["mr-token"]);
				console.log(room_id);
			}
		}
	}, [room_type, rooms, sendTotal, room_id, token]);

	const handleChange = (evt) => {
		setRoomID(evt.target.value);
	};
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	let deadline_date =
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	console.log(deadline_date);
	const handleRoomType = (evt) => {
		setRoomType(evt.target.value);
		setRoomID("");
	};
	console.log(errorRoomDetail);
	const room_status = 1;

	const searchRenter = () => {
		setErrorRenterID(false);
		setErrorRenterIDDeatail("");

		if (!/^[0-9]/.test(renter_id) && renter_id !== "") {
			setErrorRenterID(true);
			setErrorRenterIDDeatail("หมายเลขผู้เช่าต้องเป็นตัวเลขเท่านั้น");
		} else {
			API.searchRenter(renter_id, token["mr-token"])
				.then((resp) => resp.json())
				.then((resp) => setRenter(resp))
				.catch((error) => console.log(error));
			setErrorRenterID(false);
			setErrorRenterIDDeatail("");
		}
	};
	const CreateMoveIn = () => {
		if (room_id !== "" && errorRenterID !== true && renter_id !== "") {
			API.MoveinCreate(
				{
					room_id,
					renter_id,
					move_in_date,
				},
				token["mr-token"]
			)
				.then(
					API.updateRoomStatus(
						room_id,
						{ room_id, room_status, room_type },
						token["mr-token"]
					)
				)
				.then(
					API.CreateServiceCharge({ room_id, deadline_date }, token["mr-token"])
				)
				.then(setRenterID(""), setRoomType(""))
				.catch((error) => console.log(error));
			setsendTotal(true);
			setOpen(true);
			setOpenDetail("บันทึกข้อมูลการเข้าพักเสร็จสิ้น");
		} else {
			setOpen(true);
			setOpenDetail("กรุณาตรวจสอบการกรอกข้อมูลอีกครั้ง");
		}
	};

	let move_in_date =
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

	return (
		<div>
			<ReturnLogin></ReturnLogin>
			<Container maxWidth="md">
				<h1 align="center">บันทึกข้อมูลการเข้าพัก</h1>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<Grid item xs={12}>
							<TextField
								required
								id="renter_id"
								label="หมายเลขผู้เช่า"
								value={renter_id}
								error={errorRenterID}
								helperText={errorRenterIDDetail}
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

							<FormHelperText error={errorRoom}>
								{errorRoomDetail}
							</FormHelperText>
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
					<Grid item xs={12} sm={6}>
						<ReturnHome></ReturnHome>
					</Grid>

					<Grid item xs={12} sm={6}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SaveIcon />}
							onClick={handleOpen}
							style={{ backgroundColor: "green" }}
						>
							บันทึก
						</Button>
					</Grid>
				</Grid>
				<Dialog
					open={openConfirm}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						ยืนยันการบันทึกการเข้าพัก
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							ยืนยันการบันทึกการเข้าพัก
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handleClose}
							color="primary"
							style={{ color: "red" }}
						>
							ยกเลิก
						</Button>
						<Button onClick={CreateMoveIn} color="primary">
							ยืนยัน
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">แสดงผลการดำเนินการ</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{openDetail}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							ปิด
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</div>
	);
}

export default MovieIn;
