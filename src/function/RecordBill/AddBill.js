import React, { useState, useEffect } from "react";
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
import { API } from "../../api-service";
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(0),
		minWidth: 170,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

function AddBill(props) {
	let room_def = {
		1: "ห้องเปล่า",
		2: "ห้องเฟอร์นิเจอร์",
		3: "ห้องแอร์",
		4: "ห้องเฟอร์นิเจอร์+แอร์",
	};
	const date = new Date();
	const classes = useStyles();
	const [room_id, setRoomId] = useState("");
	const [id, setId] = useState("");
	const [electric_meter_new, setEMeterN] = useState("");
	const [electric_meter_old, setEMeterO] = useState("");
	const [water_meter_new, setWMeterN] = useState("");
	const [water_meter_old, setWMeterO] = useState("");
	const [adddatelast, setAddDateLast] = useState("");
	const [room_type, setRoomType] = useState("");
	const [room_typedef, setRoomTypeDef] = useState("");
	const [servicecharges, setServiceCharge] = useState([]);
	const [Selservicecharges, setSelServiceCharge] = useState(null);
	const [sendTotal, setsendTotal] = useState(false);
	const [room, setRoom] = useState(null);
	let room_status = 1;
	useEffect(() => {
		API.searchServiceCharge()
			.then((resp) => resp.json())
			.then((resp) => setServiceCharge(resp))
			.catch((error) => console.log(error));
		if (props.servicecharge !== null && room_id === "") {
			setRoomId(parseInt(props.servicecharge.room_id));
			setAddDateLast(props.servicecharge.add_date);
			setSelServiceCharge(props.servicecharge);
		}
		if (room_id !== "") {
			API.searchRoom(room_id)
				.then((resp) => resp.json())
				.then((resp) => setRoom(resp))
				.catch((error) => console.log(error));
		}
	}, [props, room_id]);

	useEffect(() => {
		if (room !== null) {
			setRoomTypeDef(room_def[room.room_type]);
			setRoomType(room.room_type);
			setEMeterO(room.electric_meter_new);
			setWMeterO(room.water_meter_new);
			setAddDateLast(Selservicecharges.add_date);
			setId(Selservicecharges.id);
		}
		if (sendTotal === true) {
			API.Total(room_id);
			Reset();
		}
	}, [room, room_def, Selservicecharges, sendTotal, room_id]);

	const handleChange = (evt) => {
		setRoomId("");
		setRoomId(evt.target.value);
	};
	const handleClicked = (servicecharge) => (evt) => {
		setSelServiceCharge(servicecharge);
	};
	let add_date =
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

	var deadline_date;
	if (date.getMonth() + 1 === 12) {
		deadline_date = date.getFullYear() + "-" + 1 + "-" + 5;
	} else {
		deadline_date = date.getFullYear() + "-" + (date.getMonth() + 2) + "-" + 5;
	}
	const Reset = () => {
		setRoomType("");
		setRoomId("");
		setWMeterO("");
		setWMeterN("");
		setEMeterN("");
		setRoom(null);
		setEMeterO("");
		setAddDateLast("");
		setRoomTypeDef("");
		setServiceCharge([]);
		setSelServiceCharge(null);
		setsendTotal(false);
	};

	const CreateBill = () => {
		API.editRoom(room_id, {
			room_id,
			room_status,
			room_type,
			water_meter_new,
			water_meter_old,
			electric_meter_new,
			electric_meter_old,
		});
		API.updateRecord(id, { id, room_id, add_date, deadline_date });
		setsendTotal(true);
	};

	return (
		<div>
			<Container maxWidth="md">
				<h1 align="center">บันทึกค่าบริการ</h1>

				<Grid container spacing={3}>
					<Grid item xs={12}>
						<FormControl className={classes.formControl}>
							<InputLabel id="room_id">รหัสห้องพัก</InputLabel>
							<Select
								labelId="room_id_sel"
								id="room_id"
								value={room_id}
								onChange={handleChange}
							>
								<MenuItem value={room_id}>รหัสห้องพัก</MenuItem>
								{servicecharges.map((servicecharge) => {
									return (
										<MenuItem
											key={servicecharge.id}
											value={servicecharge.room_id}
											onClick={handleClicked(servicecharge)}
										>
											{servicecharge.room_id}
										</MenuItem>
									);
								})}
							</Select>
							<FormHelperText></FormHelperText>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="roomtype"
							label="ประเภทห้องพัก"
							value={room_typedef}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="last_save"
							label="วันที่บันทึกข้อมูลล่าสุด"
							value={adddatelast}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="old_ele"
							label="มิเตอร์ไฟฟ้าเก่า"
							value={electric_meter_old}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="new_ele"
							label="มิเตอร์ไฟฟ้าใหม่"
							value={electric_meter_new}
							onChange={(evt) => setEMeterN(evt.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="old_water"
							label="มิเตอร์น้ำประปาเก่า"
							value={water_meter_old}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="new_water"
							label="มิเตอร์น้ำประปาใหม่"
							value={water_meter_new}
							onChange={(evt) => setWMeterN(evt.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="dead_line"
							label="กำหนดชำระ"
							value={deadline_date}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="present_date"
							format="yyyy-MM-dd"
							label="วันที่บันทึกข้อมูลปัจจุบัน"
							defaultValue={add_date}
						/>
					</Grid>
					<Grid item xs={12} sm={6}></Grid>

					<Grid item xs={12} sm={6}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SaveIcon />}
							onClick={CreateBill}
						>
							บันทึก
						</Button>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default AddBill;
