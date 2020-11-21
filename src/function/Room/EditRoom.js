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
import { API } from "../../api-service.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReturnHome from "../../ReturnHome.js";
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(0),
		minWidth: 170,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

function EditRoom() {
	const classes = useStyles();
	const [room_id, setRoomID] = useState("");
	const [room, setRoom] = useState(null);
	const [room_type, setRoomType] = useState("");
	const [electric_meter_new, setEMeterN] = useState("");
	const [electric_meter_old, setEMeterO] = useState("");
	const [water_meter_new, setWMeterN] = useState("");
	const [water_meter_old, setWMeterO] = useState("");
	const [room_status, setRoomStatus] = useState("");
	const [errorRoomID, setErrorRoomID] = useState(false);
	const [errorRoomIDDetail, setErrorRoomIDDeatail] = useState("");
	const [errorEM, setErrorEM] = useState(false);
	const [errorEMDetail, setErrorEMDeatail] = useState("");
	const [errorWM, setErrorWM] = useState(false);
	const [errorWMDetail, setErrorWMDeatail] = useState("");
	const [open, setOpen] = useState(false);
	const [openDetail, setOpenDetail] = useState("");
	const [openConfirm, setOpenConfirm] = useState(false);
	const handleOpen = () => {
		setOpenConfirm(true);
	};
	const searchRoomID = () => {
		setRoom(null);
		setEMeterO("");
		setWMeterO("");
		setRoomStatus("");
		if (!/^[0-9]/.test(room_id) && room_id !== "") {
			setErrorRoomID(true);
			setErrorRoomIDDeatail("หมายเลขห้องต้องเป็นตัวเลขเท่านั้น");
		} else {
			API.searchRoom(room_id)
				.then((resp) => resp.json())
				.then((resp) => setRoom(resp))
				.catch((error) => console.log(error));
			setErrorRoomID(false);
			setErrorRoomIDDeatail("");
		}
	};
	useEffect(() => {
		if (room !== null && room_id !== "") {
			if (room.detail === "Not found.") {
				setErrorRoomID(true);
				setErrorRoomIDDeatail("ไม่พบข้อมูลหมายเลขห้องพักในระบบ");
				setEMeterO("");
				setWMeterO("");
				setRoomStatus("");
			} else {
				setEMeterO(room.electric_meter_new);
				setWMeterO(room.water_meter_new);
				setRoomStatus(room.room_status);
				setRoomType(room.room_type);
				setErrorRoomID(false);
				setErrorRoomIDDeatail("");
			}
		}
		if (!/^[0-9]/.test(electric_meter_new) && electric_meter_new !== "") {
			setErrorEM(true);
			setErrorEMDeatail("เลขมิเตอร์ไฟฟ้าต้องเป็นตัวเลขเท่านั้น");
		} else {
			setErrorEM(false);
			setErrorEMDeatail("");
		}
		if (!/^[0-9]/.test(water_meter_new) && water_meter_new !== "") {
			setErrorWM(true);
			setErrorWMDeatail("เลขมิเตอร์น้ำต้องเป็นตัวเลขเท่านั้น");
		} else {
			setErrorWM(false);
			setErrorWMDeatail("");
		}
	}, [room, room_id, water_meter_new, electric_meter_new]);
	const handleClose = () => {
		setOpen(false);
		setOpenConfirm(false);
	};

	const EditRoom = () => {
		if (
			room_id !== "" &&
			room_type !== "" &&
			water_meter_new !== "" &&
			electric_meter_new !== "" &&
			errorRoomID !== true &&
			errorEM !== true &&
			errorWM !== true
		) {
			API.editRoom(room_id, {
				room_id,
				room_status,
				room_type,
				water_meter_new,
				electric_meter_new,
			})
				.then((resp) => console.log(resp))
				.then(
					setRoomType(""),
					setRoomID(""),
					setWMeterO(""),
					setWMeterN(""),
					setEMeterN(""),
					setRoom(null),
					setEMeterO("")
				)
				.catch((error) => console.log(error));
			setOpen(true);
			setOpenDetail("แก้ไขข้อมูลห้องพักเสร็จสิ้น");
		} else {
			setOpen(true);
			setOpenDetail("กรุณาตรวจสอบการกรอกข้อมูลอีกครั้ง");
		}
	};
	return (
		<div>
			<Container maxWidth="md">
				<h1 align="center">แก้ไขข้อมูลห้องพัก</h1>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="standard-basic"
							label="หมายเลขห้องพัก"
							error={errorRoomID}
							helperText={errorRoomIDDetail}
							value={room_id}
							onChange={(evt) => setRoomID(evt.target.value)}
						/>

						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SearchIcon />}
							onClick={searchRoomID}
						></Button>
					</Grid>

					<Grid item xs={12} sm={6}>
						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">
								ประเภทห้องพัก
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={room_type}
								onChange={(evt) => setRoomType(evt.target.value)}
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
						<TextField
							disabled
							required
							id="electric_meter_old"
							label="มิเตอร์ไฟฟ้าเก่า"
							value={electric_meter_old}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="electric_meter_new"
							label="มิเตอร์ไฟฟ้าปัจจุบัน"
							error={errorEM}
							helperText={errorEMDetail}
							value={electric_meter_new}
							onChange={(evt) => setEMeterN(evt.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							required
							id="water_meter_old"
							label="มิเตอร์น้ำประปาเก่า"
							value={water_meter_old}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="water_meter_new"
							label="มิเตอร์น้ำประปาปัจจุบัน"
							error={errorWM}
							helperText={errorWMDetail}
							value={water_meter_new}
							onChange={(evt) => setWMeterN(evt.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={6}><ReturnHome></ReturnHome></Grid>
					<Grid item xs={12} sm={6}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SaveIcon />}
							style={{ backgroundColor : "green" }}
							onClick={handleOpen}
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
						ยืนยันการแก้ไขข้อมูลห้องพัก
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							ยืนยันการแก้ไขข้อมูลห้องพัก
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
						<Button onClick={EditRoom} color="primary">
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

export default EditRoom;
