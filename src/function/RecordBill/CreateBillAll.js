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
function CreateBillAll() {
	const date = new Date();
	let add_date =
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	let room_def = {
		1: "ห้องเปล่า",
		2: "ห้องเฟอร์นิเจอร์",
		3: "ห้องแอร์",
		4: "ห้องเฟอร์นิเจอร์+แอร์",
	};

	const [rooms, SetRoom] = useState(null);
	const [prices, SetPrice] = useState(null);
	const [svs, SetSV] = useState(null);

	useEffect(() => {
		if (rooms === null) {
			API.searchRoomAll()
				.then((resp) => resp.json())
				.then((resp) => SetRoom(resp))
				.catch((error) => console.log(error));
		}
		if (svs === null) {
			API.searchServiceCharge()
				.then((resp) => resp.json())
				.then((resp) => SetSV(resp))
				.catch((error) => console.log(error));
		}

		if (prices === null) {
			API.searchPrice()
				.then((resp) => resp.json())
				.then((resp) => SetPrice(resp))
				.catch((error) => console.log(error));
		}
	}, [svs, rooms, room_def, prices]);

	function print() {
		window.print();
	}
	return (
		<div>
			{rooms && prices && svs ? (
				<Container maxWidth="md" align="center">
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
					{svs.map((sv) => {
						return (
							<div key={sv.id}>
								<h1 align="center">ใบแจ้งหนี้</h1>
								<h3 align="center">นิรันดร์อพาร์เม้นท์</h3>
								<h4 align="right">ห้องเลขที่ {sv.room_id}</h4>
								<h4 align="right">จัดทำวันที่ {add_date}</h4>
								<Table aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell align="left">รายการ</TableCell>
											<TableCell align="right">ราคา(บาท)</TableCell>
										</TableRow>
									</TableHead>
									{rooms
										.filter((room) => room.room_id === sv.room_id)
										.map((ftroom) => (
											<TableBody key={ftroom.room_id}>
												<TableRow>
													<TableCell component="th" scope="row" align="left">
														ค่าห้องประเภท {room_def[ftroom.room_type]}
													</TableCell>
													{prices
														.filter(
															(price) =>
																Number(price.price_id) === ftroom.room_type
														)
														.map((filteredPrice) => (
															<TableCell
																align="right"
																key={filteredPrice.price_id}
															>
																<NumberFormat
																	value={filteredPrice.price_num}
																	displayType={"text"}
																	thousandSeparator={true}
																/>
															</TableCell>
														))}
												</TableRow>

												<TableRow>
													<TableCell component="th" scope="row" align="left">
														ค่าน้ำ มิเตอร์ก่อน = {ftroom.water_meter_old}{" "}
														มิเตอร์หลัง = {ftroom.water_meter_new}
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
														ค่าไฟ มิเตอร์ก่อน = {ftroom.electric_meter_old}{" "}
														มิเตอร์หลัง = {ftroom.electric_meter_new}
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
										))}
								</Table>
								{prices
									.filter((price) => price.price_id === "late")
									.map((filteredPrice) => (
										<p align="left" key={filteredPrice.price_id}>
											หมายเหตุ <br></br>กรุณาชำระเงินภายในวันที่ 5 ของทุกเดือน
											<br></br>
											ถ้าหากเกินปรับ {filteredPrice.price_num} บาทต่อวัน 
										</p>
									))}
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
					})}
					<br></br>
				</Container>
			) : null}
		</div>
	);
}

export default CreateBillAll;
