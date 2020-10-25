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
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">รหัสห้อง</TableCell>
							<TableCell align="center">
								วันที่บันทึกข้อมูล
							</TableCell>
							<TableCell align="center">รายละเอียดเรื่องร้องเรียน-ปัญหา</TableCell>
						</TableRow>
					</TableHead>
					
				</Table>

			</Container>
		</div>
	);
}

export default ProblemView;
