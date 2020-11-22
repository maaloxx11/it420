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
import { Redirect } from "react-router-dom";
import ReturnHome from "../../ReturnHome.js";
import { useCookies } from "react-cookie";
function Receipt(props) {
	const [room_id, setRoom] = useState("");
	const [total, setTotal] = useState(0);
	const [late, setLate] = useState(0);
	const [type, setType] = useState("");
	const [token] = useCookies(["mr-token"]);
	const [typeprice, setTypePrice] = useState(null);
	const [sv, setSV] = useState(null);
	const date = new Date();
	useEffect(() => {
		if (token["mr-token"]) {
			if (props.room !== "" && room_id === "") {
				setRoom(props.room);
				setTotal(Number(props.total));
				API.searchPaymentRecipt(room_id, token["mr-token"])
					.then((resp) => resp.json())
					.then((resp) => setSV(resp))
					.catch((error) => console.log(error));
				setType(props.type);
			}
			if (type !== "" && typeprice === null) {
				API.searchPriceRoom(type, token["mr-token"])
					.then((resp) => resp.json())
					.then((resp) => setTypePrice(resp))
					.catch((error) => console.log(error));
			}
			if (total !== 0 && typeprice !== null && sv !== null) {
				setLate(
					total -
						Number(sv[0].price_electric_meter) -
						Number(sv[0].price_water_meter) -
						Number(typeprice[0].price_num)
				);
			}
		}
	}, [props, room_id, total, sv, type, typeprice, token]);
	function print() {
		window.print();
	}

	let payment_date =
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

	return (
		<div>
			{props.room ? (
				<Container maxWidth="md" align="center">
					<h1 align="center">ใบเสร็จชำระค่าห้อง</h1>
					<h3 align="center">นิรันดร์อพาร์เม้นท์</h3>
					<h4 align="right">ห้องเลขที่ {room_id}</h4>
					<h4 align="right">จัดทำวันที่ {payment_date}</h4>
					{typeprice ? (
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="left">รายการ</TableCell>
									<TableCell align="right">ราคา(บาท)</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell component="th" scope="row" align="left">
										ค่าห้อง
									</TableCell>

									<TableCell align="right">
										<NumberFormat
											value={typeprice[0].price_num}
											displayType={"text"}
											thousandSeparator={true}
										/>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell component="th" scope="row" align="left">
										ค่าน้ำ
									</TableCell>
									<TableCell align="right">
										<NumberFormat
											value={sv[0].price_electric_meter}
											displayType={"text"}
											thousandSeparator={true}
										/>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell component="th" scope="row" align="left">
										ค่าไฟ
									</TableCell>
									<TableCell align="right">
										<NumberFormat
											value={sv[0].price_water_meter}
											displayType={"text"}
											thousandSeparator={true}
										/>
									</TableCell>
								</TableRow>
								{late ? (
									<TableRow>
										<TableCell component="th" scope="row" align="left">
											ค่าปรับ
										</TableCell>
										<TableCell align="right">
											<NumberFormat
												value={late}
												displayType={"text"}
												thousandSeparator={true}
											/>
										</TableCell>
									</TableRow>
								) : null}
								<TableRow>
									<TableCell component="th" scope="row" align="right">
										<h3>รวมทั้งสิ้น</h3>
									</TableCell>
									<TableCell align="right">
										<NumberFormat
											value={total}
											displayType={"text"}
											thousandSeparator={true}
										/>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					) : null}
					<br></br>
					<Box display="block" displayPrint="none" m={1}>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6}>
								<ReturnHome></ReturnHome>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Button
									variant="contained"
									color="primary"
									size="large"
									startIcon={<PrintIcon />}
									onClick={print}
								>
									พิมพ์ใบเสร็จ
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Container>
			) : (
				<Redirect to="/payment" />
			)}
		</div>
	);
}

export default Receipt;
