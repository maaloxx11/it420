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
	const searchRoomID = () => {
		API.searchRoom(room_id)
			.then((resp) => resp.json())
			.then((resp) => setRoom(resp))
			.catch((error) => console.log(error));
	};
	useEffect(() => {
		if (room !== null) {
			setEMeterO(room.electric_meter_new);
			setWMeterO(room.water_meter_new);
			setRoomStatus(room.room_status);
		}
	}, [room]);
	const EditRoom = () => {
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
							label="รหัสห้องพัก"
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
							value={water_meter_new}
							onChange={(evt) => setWMeterN(evt.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SaveIcon />}
							onClick={EditRoom}
						>
							บันทึก
						</Button>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default EditRoom;
