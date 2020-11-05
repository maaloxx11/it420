import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { API } from "../../api-service";
function CreateReportBill(props) {
	let date = props.date;
	const date_now = new Date();
	const [payments, SetPayment] = useState(null);
	const [svl, SetSV] = useState(null);
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = new Date(year, month, 0).getDate();

	useEffect(() => {
		API.SearchDateBill(year, month, day)
			.then((resp) => resp.json())
			.then((resp) => SetPayment(resp))
			.catch((error) => console.log(error));
		API.searchServiceCharge()
			.then((resp) => resp.json())
			.then((resp) => SetSV(resp))
			.catch((error) => console.log(error));
	}, [year, month, day]);
	console.log(payments);
	let moth_th = {
		0: "มกราคม",
		1: "กุมภาพันธ์",
		2: "มีนาคม",
		3: "เมษายน",
		4: "พฤษภาคม",
		5: "มิถุนายน",
		6: "กรกฎาคม",
		7: "สิงหาคม",
		8: "กันยายน ",
		9: "ตุลาคม",
		10: "พฤศจิกายน",
		11: "ธันวาคม",
	};
	let add_date =
		date_now.getFullYear() +
		"/" +
		(date_now.getMonth() + 1) +
		"/" +
		date_now.getDate();
    const a = []
	return (
		<div>
			<Container maxWidth="md">
				<Grid container spacing={3}>
					<Grid item xs={2}>
						<span>
							พิมพ์วันที่ : <br></br> {add_date}
						</span>
					</Grid>
					<Grid item xs={10}>
						<h2 align="center"> รายงานแสดงสรุปยอดค่าเช่ารายเดือน</h2>
					</Grid>
					<Grid item xs={2}></Grid>
					<Grid item xs={10}>
						<p align="center">
							ประจำเดือน : {moth_th[date.getMonth()]} ค.ศ. {date.getFullYear()}{" "}
						</p>
					</Grid>

					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell align="center">ห้อง</TableCell>
								<TableCell align="right">ค่าเช่ารายเดือน</TableCell>
							</TableRow>
						</TableHead>
						{payments && svl ? (
							<TableBody>
								{payments.map((payment) => {
									return (
										<TableRow key={payment.id}>
											<TableCell component="th" scope="row"></TableCell>
											{svl
												.filter((sv) => sv.id === payment.sc_id)
												.map((filteredSV) => (
													<TableCell align="center" key={filteredSV.id}>
														{filteredSV.room_id}
													</TableCell>
												))}
											<TableCell align="right">
												{payment.total_payment}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						) : null}
					</Table>
				</Grid>
			</Container>
		</div>
	);
}

export default CreateReportBill;
