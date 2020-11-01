import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
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

function CreateRoom(props) {
	const classes = useStyles();

	const [room_id, setRoomID] = useState("");
	const [room_type, setRoomType] = useState("");
	const [electric_meter_new, setEMeterN] = useState("");
	const [water_meter_new, setWMeterN] = useState("");

	const room_status = 0;
	const CreateClicked = () => {
		API.createRoom({
			room_id,
			room_type,
			electric_meter_new,
			water_meter_new,
			room_status,
		})
			.then((resp) => console.log(resp))
			.then(setRoomID(""), setRoomType(""),setEMeterN(""),setWMeterN(""))
			.catch((error) => console.log(error));
	};

	return (
		<div>
			<Container maxWidth="md">
				<h1 align="center">เพิ่มห้องพัก</h1>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="room_id"
							label="รหัสห้องพัก"
							value={room_id}
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
								<MenuItem value={2}>ห้องเปล่า+เฟอร์นิเจอร์</MenuItem>
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
							onChange={(evt) => setEMeterN(evt.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="water_meter"
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
							onClick={CreateClicked}
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

export default CreateRoom;
