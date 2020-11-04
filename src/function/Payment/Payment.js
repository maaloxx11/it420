import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import SearchIcon from "@material-ui/icons/Search";
import { API } from "../../api-service";

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

	let payment_date =
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

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
		API.searchPayment(room_id)
			.then((resp) => resp.json())
			.then((resp) => setSV(resp))
			.catch((error) => console.log(error));
	};
	const IDchange = (evt) => {
		Reset();
		setRoomID(evt.target.value);
	};
	useEffect(() => {
		if (servicecharge !== null && servicecharge.length > 0) {
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
		}
	}, [servicecharge, room_id]);

	useEffect(() => {
		if (room !== null) {
			setRoomType(room_def[room.room_type]);
		}
		if (dead_line !== "" && pricelate !== null) {
			if (payment_date < dead_line) {
				setPaymentTotal(servicecharge[0].total);
			} else if (payment_date > max_late_date) {
				setPaymentTotal(servicecharge[0].total + 1000);
			} else {
				setPaymentTotal(
					servicecharge[0].total + late_date * pricelate.price_num
				);
			}
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
		API.PaymentCreate({
			sc_id,
			total_payment,
			payment_date,
		});
		API.UpdatePaymentStatus(sc_id).then(Reset()).then(setRoomID(""));
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
							Save
						</Button>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default Payment;
