import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import PrintIcon from "@material-ui/icons/Print";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import NumberFormat from "react-number-format";
import { API } from "../../api-service";

function CreateBill(props) {
	let sv = props.servicecharge;
	const date = new Date();
	let add_date =
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	let room_def = {
		1: "ห้องเปล่า",
		2: "ห้องเฟอร์นิเจอร์",
		3: "ห้องแอร์",
		4: "ห้องเฟอร์นิเจอร์+แอร์",
	};
	const [room_id, SetRoomID] = useState("");
	const [room, SetRoom] = useState(null);
	const [room_type, SetRoomType] = useState("");
	const [room_type_int, SetRoomTypeInt] = useState("");
	const [prices, SetPrice] = useState(null);

	useEffect(() => {
		SetRoomID(sv.room_id);

		if (room !== null) {
			SetRoomType(room_def[room.room_type]);
			SetRoomTypeInt(Number(room.room_type));
		}
		if (room === null) {
			API.searchPrice()
				.then((resp) => resp.json())
				.then((resp) => SetPrice(resp))
				.catch((error) => console.log(error));
		}
	}, [sv, room, room_def]);
	useEffect(() => {
		if (room_id !== "") {
			API.searchRoom(room_id)
				.then((resp) => resp.json())
				.then((resp) => SetRoom(resp))
				.catch((error) => console.log(error));
		}
	}, [room_id]);
	function print() {
		window.print();
	}
	return (
		<div>
			{room ? (
				<Container maxWidth="md" align="center">
					<h1 align="center">ใบแจ้งหนี้</h1>
					<h3 align="center">นิรันดร์อพาร์เม้นท์</h3>
					<h4 align="right">ห้องเลขที่ {room_id}</h4>
					<h4 align="right">จัดทำวันที่ {add_date}</h4>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="left">รายการ</TableCell>
								<TableCell align="right">ราคา(บาท)</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{prices ? (
								<TableRow>
									<TableCell component="th" scope="row" align="left">
										ค่าห้องประเภท {room_type}
									</TableCell>
									{prices
										.filter((price) => Number(price.price_id) === room_type_int)
										.map((filteredPrice) => (
											<TableCell align="right" key={filteredPrice.price_id}>
												<NumberFormat
													value={filteredPrice.price_num}
													displayType={"text"}
													thousandSeparator={true}
												/>
											</TableCell>
										))}
								</TableRow>
							) : null}
							<TableRow>
								<TableCell component="th" scope="row" align="left">
									ค่าน้ำ มิเตอร์ก่อน = {room.water_meter_old} มิเตอร์หลัง ={" "}
									{room.water_meter_new}
								</TableCell>
								<TableCell align="right">
									<NumberFormat
										value={sv.price_water_meter}
										displayType={"text"}
										thousandSeparator={true}
									/>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell component="th" scope="row" align="left">
									ค่าไฟ มิเตอร์ก่อน = {room.electric_meter_old} มิเตอร์หลัง ={" "}
									{room.electric_meter_new}
								</TableCell>
								<TableCell align="right">
									<NumberFormat
										value={sv.price_electric_meter}
										displayType={"text"}
										thousandSeparator={true}
									/>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell component="th" scope="row" align="right">
									<h3>รวมทั้งสิ้น</h3>
								</TableCell>
								<TableCell align="right">
									<NumberFormat
										value={sv.total}
										displayType={"text"}
										thousandSeparator={true}
									/>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
					{prices ? (
						<div>
							{prices
								.filter((price) => price.price_id === "late")
								.map((filteredPrice) => (
									<p align="left" key={filteredPrice.price_id}>
										หมายเหตุ <br></br>กรุณาชำระเงินภายในวันที่ 5 ของทุกเดือน
										<br></br>
										ถ้าหากเกินปรับ {filteredPrice.price_num} ต่อวัน
									</p>
								))}
						</div>
					) : null}{" "}
					<br></br>
					<Box display="block" displayPrint="none" m={1}>
						<Grid item xs={12} align="right">
							<Button
								variant="contained"
								color="primary"
								size="large"
								startIcon={<PrintIcon />}
								onClick={print}
							>
								พิมพ์ใบแจ้งหนี้
							</Button>
						</Grid>
					</Box>
				</Container>
			) : null}
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
		</div>
	);
}

export default CreateBill;
