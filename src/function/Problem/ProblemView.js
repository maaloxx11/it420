import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PrintIcon from "@material-ui/icons/Print";
function ProblemView() {
	return (
		<div>
			<Container maxWidth="md">
            <h1 align="center"> ดูข้อมูลเรื่องร้องเรียน-ปัญหา</h1>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">รหัสห้อง</TableCell>
							<TableCell align="center">
								วันที่บันทึกข้อมูล
							</TableCell>
							<TableCell align="center">รายละเอียดเรื่องร้องเรียน-ปัญหา</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="center">601</TableCell>
							<TableCell align="center">
								2020-10-25
							</TableCell>
							<TableCell align="center">แอร์ไม่เย็น</TableCell>
						</TableRow>
					</TableHead>
					
				</Table>

			</Container>
		</div>
	);
}

export default ProblemView;
