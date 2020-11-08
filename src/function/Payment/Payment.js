import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import SearchIcon from "@material-ui/icons/Search";
import { API } from "../../api-service";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
function Payment() {
	const date = new Date();
	const [room_id, setRoomID] = useState("");
	const [servicecharge, setSV] = useState(null);
	const [room, setRoom] = useState(null);
	const [room_type, setRoomType] = useState("");
	const [dead_line, setDeadline] = useState("");
	const [total_payment, setPaymentTotal] = useState("");
	const [pricelate, setPricelate] = useState(null);
	const [sc_id, setID] = useState("");
	const [errorRoomID, setErrorRoomID] = useState(false);
	const [errorRoomIDDetail, setErrorRoomIDDeatail] = useState("");
	const [open, setOpen] = useState(false);
	const [openDetail, setOpenDetail] = useState("");

	const handleClose = () => {
		setOpen(false);
	};
	let payment_date =
		date.getFullYear() +
		"-" +
		("0" + (date.getMonth() + 1)).slice(-2) +
		"-" +
		("0" + date.getDate()).slice(-2);

	let dateline_day = new Date(dead_line);
	let payment_day = new Date(payment_date);

	let room_def = {
		1: "ห้องเปล่า",
		2: "ห้องเฟอร์นิเจอร์",
		3: "ห้องแอร์",
		4: "ห้องเฟอร์นิเจอร์+แอร์",
	};
	let max_late_date =
		date.getFullYear() + "-" + (date.getMonth() + 2) + "-" + 16;

	let late_date = payment_day.getDate() - dateline_day.getDate();
	const Reset = () => {
		setRoom(null);
		setSV(null);
		setDeadline("");
		setRoomType("");
		setPaymentTotal("");
		setPricelate(null);
		setID("");
	};
	const searchsv = () => {
		Reset();
		if (!/^[0-9]/.test(room_id) && room_id !== "") {
			setErrorRoomID(true);
			setErrorRoomIDDeatail("รหัสห้องต้องเป็นตัวเลขเท่านั้น");
		} else {
			API.searchPayment(room_id)
				.then((resp) => resp.json())
				.then((resp) => setSV(resp))
				.catch((error) => console.log(error));
			setErrorRoomID(false);
			setErrorRoomIDDeatail("");
		}
	};
	const IDchange = (evt) => {
		Reset();
		setRoomID(evt.target.value);
	};

	useEffect(() => {
		if (servicecharge !== null) {
			if (servicecharge.length > 0) {
				setErrorRoomID(false);
				setErrorRoomIDDeatail("");
				API.searchRoom(room_id)
					.then((resp) => resp.json())
					.then((resp) => setRoom(resp))
					.catch((error) => console.log(error));
				setDeadline(servicecharge[0].deadline_date);
				API.searchPriceLate()
					.then((resp) => resp.json())
					.then((resp) => setPricelate(resp))
					.catch((error) => console.log(error));
				setID(servicecharge[0].id);
			} else {
				setErrorRoomID(true);
				setErrorRoomIDDeatail("ไม่พบข้อมูลค่าบริการค้างชำระในระบบ");
			}
		}
	}, [servicecharge, room_id]);

	useEffect(() => {
		if (room !== null) {
			setRoomType(room_def[room.room_type]);
		}
		if (dead_line !== "" && pricelate !== null) {
			if (payment_date <= dead_line) {
				console.log("a");
				setPaymentTotal(servicecharge[0].total);
			} else if (payment_date > max_late_date) {
				setPaymentTotal(servicecharge[0].total + 1000);
			} else {
				setPaymentTotal(
					servicecharge[0].total + late_date * pricelate.price_num
				);
			}
			console.log(payment_date);
			console.log(dead_line);
		} else {
		}
	}, [
		room,
		room_def,
		dead_line,
		payment_date,
		servicecharge,
		max_late_date,
		pricelate,
		late_date,
	]);

	const CreatePayment = () => {
		if (sc_id !== "" && total_payment !== "" && payment_date !== "") {
			API.PaymentCreate({
				sc_id,
				total_payment,
				payment_date,
			});
			API.UpdatePaymentStatus(sc_id).then(Reset()).then(setRoomID(""));
			setOpen(true);
			setOpenDetail("บันทึกข้อมูลการชำระค่าบริการเสร็จสิ้น");
		} else {
			setOpen(true);
			setOpenDetail("กรุณาตรวจสอบการกรอกข้อมูลอีกครั้ง");
		}
	};

	return (
		<div>
			<Container maxWidth="md">
				<h1 align="center">รับชำระค่าบริการ</h1>

				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="room_id"
							label="รหัสห้องพัก"
							value={room_id}
							error={errorRoomID}
							helperText={errorRoomIDDetail}
							onChange={IDchange}
						/>

						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SearchIcon />}
							onClick={searchsv}
						></Button>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="room_type"
							label="ประเภทห้องพัก"
							value={room_type}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="dead_line"
							label="กำหนดชำระค่าบริการ"
							value={dead_line}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="total"
							label="ค่าบริการรวม"
							value={total_payment}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="payment_date"
							label="วันที่ชำระค่าบริการ"
							value={payment_date}
						/>
					</Grid>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SaveIcon />}
							onClick={CreatePayment}
						>
							บันทึก
						</Button>
					</Grid>
				</Grid>
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

export default Payment;
