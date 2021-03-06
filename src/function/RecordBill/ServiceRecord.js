import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { API } from "../../api-service";
import { Link } from "react-router-dom";
import ReturnLogin from "../../ReturnLogin.js";
import { useCookies } from "react-cookie";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
function ServiceRecord(props) {
	const [token] = useCookies(["mr-token"]);
	const [records, SetRecord] = useState([]);
	useEffect(() => {
		if (token["mr-token"]) {
			API.searchServiceCharge(token["mr-token"])
				.then((resp) => resp.json())
				.then((resp) => SetRecord(resp))
				.catch((error) => console.log(error));
		}
	}, [token]);
	console.log(token["mr-token"]);
	const recordClicked = (servicecharge) => (evt) => {
		props.recordClicked(servicecharge);
	};
	let debt_status = { 1: "มียอดค้างชำระ", 0: "ไม่มียอดค้างชำระ" };
	return (
		<div>
			<ReturnLogin></ReturnLogin>

			<Container maxWidth="md">
				<h1 align="center">บันทึกการใช้บริการ และจัดพิมพ์ใบแจ้งหนี้</h1>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">หมายเลขห้อง</TableCell>
							<TableCell align="center">
								วันที่บันทึกข้อมูลค่าบริการล่าสุด
							</TableCell>
							<TableCell align="left">สถานะการชำระเงิน</TableCell>
							<TableCell align="center">บันทึกข้อมูลค่าบริการ</TableCell>
							<TableCell align="center">สร้างใบแจ้งหนี้</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{records.map((servicecharge) => {
							return (
								<TableRow key={servicecharge.id}>
									<TableCell component="th" scope="row" align="center">
										{servicecharge.room_id}
									</TableCell>
									<TableCell align="center">{servicecharge.add_date}</TableCell>
									<TableCell align="left">
										{debt_status[servicecharge.payment_status]}
									</TableCell>
									<TableCell align="center">
										<Link to={`/addbill/`}>
											<span onClick={recordClicked(servicecharge)}>
												เพิ่มข้อมูลค่าบริการ
											</span>
										</Link>
									</TableCell>
									<TableCell align="center">
										<Link to={`/createbill/${servicecharge.room_id}`}>
											<span onClick={recordClicked(servicecharge)}>
												สร้างใบแจ้งหนี้
											</span>
										</Link>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
				<br></br>
				<Grid item xs={12} align="right">
					<Link to="/addbill/">
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<PlaylistAddIcon />}
						>
							บันทึกข้อมูลค่าบริการ
						</Button>
					</Link>
					<p></p>
					<Link to="/createbillall/">
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<PostAddIcon />}
						>
							สร้างใบแจ้งหนี้ทั้งหมด
						</Button>
					</Link>
				</Grid>
			</Container>
		</div>
	);
}

export default ServiceRecord;
