import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ReturnHome from "../../ReturnHome.js";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { API } from "../../api-service.js";
import ReturnLogin from "../../ReturnLogin.js";
import { useCookies } from "react-cookie";
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(0),
		minWidth: 170,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

function CreateRoom(props) {
	const [token] = useCookies(["mr-token"]);
	const classes = useStyles();
	const [room_id, setRoomID] = useState("");
	const [room_type, setRoomType] = useState("");
	const [electric_meter_new, setEMeterN] = useState("");
	const [water_meter_new, setWMeterN] = useState("");
	const [errorRoomID, setErrorRoomID] = useState(false);
	const [errorRoomIDDetail, setErrorRoomIDDeatail] = useState("");
	const [errorEM, setErrorEM] = useState(false);
	const [errorEMDetail, setErrorEMDeatail] = useState("");
	const [errorWM, setErrorWM] = useState(false);
	const [errorWMDetail, setErrorWMDeatail] = useState("");
	const [room, setRoom] = useState(null);
	const [open, setOpen] = useState(false);

	const [openDetail, setOpenDetail] = useState("");
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
			if (!/^[0-9]/.test(room_id) && room_id !== "") {
				setErrorRoomID(true);
				setErrorRoomIDDeatail("หมายเลขห้องพักห้องต้องเป็นตัวเลขเท่านั้น");
			} else {
				setErrorRoomID(false);
				setErrorRoomIDDeatail("");
				API.searchRoom(room_id, token["mr-token"])
					.then((resp) => resp.json())
					.then((resp) => setRoom(resp))
					.catch((error) => console.log(error));
			}
			if (!/^[0-9]/.test(electric_meter_new) && electric_meter_new !== "") {
				setErrorEM(true);
				setErrorEMDeatail("เลขมิเตอร์ไฟฟ้าต้องเป็นตัวเลขเท่านั้น");
			} else if (
				Number(electric_meter_new) < 0 ||
				(Number(electric_meter_new) > 9999 && electric_meter_new !== "")
			) {
				setErrorEM(true);
				setErrorEMDeatail("เลขมิเตอร์ไฟฟ้าต้องอยู่ระหว่าง0-9999");
			} else {
				setErrorEM(false);
				setErrorEMDeatail("");
			}
			if (!/^[0-9]/.test(water_meter_new) && water_meter_new !== "") {
				setErrorWM(true);
				setErrorWMDeatail("เลขมิเตอร์น้ำต้องเป็นตัวเลขเท่านั้น");
			} else if (
				Number(water_meter_new) < 0 ||
				(Number(water_meter_new) > 9999 && water_meter_new !== "")
			) {
				setErrorWM(true);
				setErrorWMDeatail("เลขมิเตอร์น้ำต้องอยู่ระหว่าง0-9999");
			} else {
				setErrorWM(false);
				setErrorWMDeatail("");
			}
		}
	}, [room_id, electric_meter_new, water_meter_new, token]);
	useEffect(() => {
		if (room !== null && room !== "") {
			if (room.detail !== "Not found.") {
				setErrorRoomID(true);
				setErrorRoomIDDeatail(
					"มีหมายเลขห้องพักนี้อยู่ในระบบแล้วกรุณาใช้หมายเลขห้องพักอื่น"
				);
			}
		}
	}, [room]);
	const room_status = 0;
	const CreateClicked = () => {
		if (
			room_id !== "" &&
			room_type !== "" &&
			water_meter_new !== "" &&
			electric_meter_new !== "" &&
			errorRoomID !== true &&
			errorEM !== true &&
			errorWM !== true
		) {
			API.createRoom(
				{
					room_id,
					room_type,
					electric_meter_new,
					water_meter_new,
					room_status,
				},
				token["mr-token"]
			)
				.then((resp) => console.log(resp))
				.then(setRoomID(""), setRoomType(""), setEMeterN(""), setWMeterN(""))
				.catch((error) => console.log(error));
			setOpen(true);
			setOpenDetail("บันทึกข้อมูลห้องพักเสร็จสิ้น");
		} else {
			setOpen(true);
			setOpenDetail("กรุณาตรวจสอบการกรอกข้อมูลอีกครั้ง");
		}
	};

	return (
		<div>
			<ReturnLogin></ReturnLogin>
			<Container maxWidth="md">
				<h1 align="center">เพิ่มห้องพัก</h1>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="room_id"
							label="หมายเลขห้องพัก"
							value={room_id}
							error={errorRoomID}
							helperText={errorRoomIDDetail}
							onChange={(evt) => setRoomID(evt.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl className={classes.formControl}>
							<InputLabel id="room_type">ประเภทห้องพัก</InputLabel>
							<Select
								labelId="room_type_s"
								id="room_type_select"
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
							required
							id="electric_meter"
							label="มิเตอร์ไฟฟ้าปัจจุบัน"
							value={electric_meter_new}
							error={errorEM}
							helperText={errorEMDetail}
							onChange={(evt) => setEMeterN(evt.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="water_meter"
							label="มิเตอร์น้ำประปาปัจจุบัน"
							error={errorWM}
							helperText={errorWMDetail}
							value={water_meter_new}
							onChange={(evt) => setWMeterN(evt.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<ReturnHome></ReturnHome>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={handleOpen}
							style={{ backgroundColor: "green" }}
							startIcon={<SaveIcon />}
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
						ยืนยันการเพิ่มข้อมูลห้องพัก
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							ยืนยันการเพิ่มข้อมูลห้องพัก
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
						<Button onClick={CreateClicked} color="primary">
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

export default CreateRoom;
