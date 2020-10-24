import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PrintIcon from '@material-ui/icons/Print';
function ServiceRecord() {
	return (
		<div>
			<Container maxWidth="md">
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">รหัสห้อง</TableCell>
							<TableCell align="center">
								วันที่บันทึกข้อมูลค่าบริการล่าสุด
							</TableCell>
							<TableCell align="center">บันทึกข้อมูลค่าบริการ</TableCell>
							<TableCell align="center">พิมพ์ใบแจ้งหนี้</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow align="center">
							<TableCell component="th" scope="row" align="center">
								601
							</TableCell>
							<TableCell align="center">24/10/2020</TableCell>
							<TableCell align="center">
								<a href="#ๅ">เพิ่มข้อมูลค่าบริการ</a>
							</TableCell>
							<TableCell align="center">
								<a href="#/">พิมพ์ใบแจ้งหนี้</a>
							</TableCell>
						</TableRow>
						<TableRow align="center">
							<TableCell component="th" scope="row" align="center">
								602
							</TableCell>
							<TableCell align="center">24/10/2020</TableCell>
							<TableCell align="center">
								<a href="#-">เพิ่มข้อมูลค่าบริการ</a>
							</TableCell>
							<TableCell align="center">
								<a href="#ภ">พิมพ์ใบแจ้งหนี้</a>
							</TableCell>
						</TableRow>
						<TableRow align="center">
							<TableCell component="th" scope="row" align="center">
								603
							</TableCell>
							<TableCell align="center">24/10/2020</TableCell>
							<TableCell align="center">
								<a href="#พ">เพิ่มข้อมูลค่าบริการ</a>
							</TableCell>
							<TableCell align="center">
								<a href="#ไ">พิมพ์ใบแจ้งหนี้</a>
							</TableCell>
						</TableRow>
						<TableRow align="center">
							<TableCell component="th" scope="row" align="center">
								604
							</TableCell>
							<TableCell align="center">24/10/2020</TableCell>
							<TableCell align="center">
								<a href="#ำ">เพิ่มข้อมูลค่าบริการ</a>
							</TableCell>
							<TableCell align="center">
								<a href="#พ">พิมพ์ใบแจ้งหนี้</a>
							</TableCell>
						</TableRow>
						<TableRow align="center">
							<TableCell component="th" scope="row" align="center">
								605
							</TableCell>
							<TableCell align="center">24/10/2020</TableCell>
							<TableCell align="center">
								<a href="#ะ">เพิ่มข้อมูลค่าบริการ</a>
							</TableCell>
							<TableCell align="center">
								<a href="เ">พิมพ์ใบแจ้งหนี้</a>
							</TableCell>
						</TableRow>
						<TableRow align="center">
							<TableCell component="th" scope="row" align="center">
								606
							</TableCell>
							<TableCell align="center">24/10/2020</TableCell>
							<TableCell align="center">
								<a href="พ#">เพิ่มข้อมูลค่าบริการ</a>
							</TableCell>
							<TableCell align="center">
								<a href="พ">พิมพ์ใบแจ้งหนี้</a>
							</TableCell>
						</TableRow>
						<TableRow align="center">
							<TableCell component="th" scope="row" align="center">
								607
							</TableCell>
							<TableCell align="center">24/10/2020</TableCell>
							<TableCell align="center">
								<a href="#พ">เพิ่มข้อมูลค่าบริการ</a>
							</TableCell>
							<TableCell align="center">
								<a href="พ#">พิมพ์ใบแจ้งหนี้</a>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
                <br></br>
                <Grid item xs={12} align="right">
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<PrintIcon />}
						>
							พิมพ์ใบแจ้งหนี้ทั้งหมด
						</Button>
					</Grid>
			</Container>
		</div>
	);
}

export default ServiceRecord;
