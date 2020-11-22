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
import { Link } from "react-router-dom";
import ReturnHome from "../../ReturnHome.js";
import { useCookies } from "react-cookie";
import ReturnLogin from "../../ReturnLogin.js";
function Payment(props) {
	const date = new Date();
	const [token] = useCookies(["mr-token"]);
	const [room_id, setRoomID] = useState("");
	const [servicecharge, setSV] = useState(null);
	const [room, setRoom] = useState(null);
	const [room_type, setRoomType] = useState("");
	const [room_typeid, setRoomTypeid] = useState("");
	const [dead_line, setDeadline] = useState("");
	const [total_payment, setPaymentTotal] = useState("");
	const [pricelate, setPricelate] = useState(null);
	const [sc_id, setID] = useState("");
	const [errorRoomID, setErrorRoomID] = useState(false);
	const [errorRoomIDDetail, setErrorRoomIDDeatail] = useState("");
	const [open, setOpen] = useState(false);
	const [openDetail, setOpenDetail] = useState("");
	const [receipts, setReceipts] = useState(0);
	const [openConfirm, setOpenConfirm] = useState(false);
	const handleOpen = () => {
		setOpenConfirm(true);
	};
	const handleClose = () => {
		setOpen(false);
		if (openDetail === "บันทึกข้อมูลการชำระค่าบริการเสร็จสิ้น") {
			setRoomID("");
			Reset();
		}
		setOpenConfirm(false);
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
		date.getFullYear() +
		"-" +
		("0" + (date.getMonth() + 2)).slice(-2) +
		"-" +
		16;

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
			setErrorRoomIDDeatail("หมายเลขห้องต้องเป็นตัวเลขเท่านั้น");
		} else {
			API.searchPayment(room_id, token["mr-token"])
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
		if (token["mr-token"]) {
			if (servicecharge !== null) {
				if (servicecharge.length > 0) {
					setErrorRoomID(false);
					setErrorRoomIDDeatail("");
					API.searchRoom(room_id, token["mr-token"])
						.then((resp) => resp.json())
						.then((resp) => setRoom(resp))
						.catch((error) => console.log(error));
					setDeadline(servicecharge[0].deadline_date);
					API.searchPriceLate(token["mr-token"])
						.then((resp) => resp.json())
						.then((resp) => setPricelate(resp))
						.catch((error) => console.log(error));
					setID(servicecharge[0].id);
				} else {
					setErrorRoomID(true);
					setErrorRoomIDDeatail("ไม่พบข้อมูลค่าบริการค้างชำระในระบบ");
				}
			}
		}
	}, [servicecharge, room_id, token]);

	useEffect(() => {
		if (room !== null) {
			setRoomType(room_def[room.room_type]);
			setRoomTypeid(room.room_type);
		}
		if (dead_line !== "" && pricelate !== null) {
			if (payment_date <= dead_line) {
				setPaymentTotal(servicecharge[0].total);
			} else if (payment_date > max_late_date) {
				setPaymentTotal(servicecharge[0].total + 1000);
			} else {
				setPaymentTotal(
					servicecharge[0].total + late_date * pricelate.price_num
				);
			}
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
			setReceipts(1);
			API.PaymentCreate(
				{
					sc_id,
					total_payment,
					payment_date,
				},
				token["mr-token"]
			);
			API.UpdatePaymentStatus(sc_id, token["mr-token"]);
			setOpen(true);
			setOpenDetail("บันทึกข้อมูลการชำระค่าบริการเสร็จสิ้น");
		} else {
			setOpen(true);
			setOpenDetail("กรุณาตรวจสอบการกรอกข้อมูลอีกครั้ง");
		}
	};

	const createReceipts = () => {
		props.RoomClicked(room_id);
		props.TotalClicked(total_payment);
		props.TypeClicked(room_typeid);
	};

	return (
		<div>
			<ReturnLogin></ReturnLogin>
			<Container maxWidth="md">
				<h1 align="center">รับชำระค่าบริการ</h1>

				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="room_id"
							label="หมายเลขห้องพัก"
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
						ยืนยันการบันทึกการชำระค่าบริการ
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							ยืนยันการบันทึกการชำระค่าบริการ
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
						<Button onClick={CreatePayment} color="primary">
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
						{receipts ? (
							<Link to="/receipt">
								<Button onClick={createReceipts} color="primary">
									พิมพ์ใบเสร็จ
								</Button>
							</Link>
						) : null}
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
