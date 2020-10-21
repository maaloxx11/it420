import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const date = today.toISOString().split("T")[0];
function ServiceRate() {
	return (
		<div>
			<Container maxWidth="md">
				<h1 align="center">กำหนดอัตรค่าบริการ</h1>
				<Grid container spacing={3} align="center">
					<Grid item xs={12}>
						<TextField id="standard-basic" label="อัตราน้ำประปา(บาท/ยูนิต)" />
					</Grid>
					<Grid item xs={12}>
						<TextField id="standard-basic" label="อัตราค่าไฟฟ้า(บาท/ยูนิต)" />
					</Grid>
					<Grid item xs={12}>
						<TextField
							multiline
							rows={2}
							id="standard-basic"
							label="อัตราค่าปรับเนื่องจากชำระค่าบริการล่าช้า(บาท/วัน)"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField id="standard-basic" label="อัตราค่าสึกหรอ(บาท)" />
					</Grid>
					<Grid item xs={12}>
						<TextField id="standard-basic" label="อัตราค่าทำความสะอาด(บาท)" />
					</Grid>
					<Grid item xs={12}>
						<TextField
							disabled
							id="standard-basic"
							label="วันที่แก้ไขข้อมูลล่าสุด"
							defaultValue={date}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SaveIcon />}
						>
							Save
						</Button>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default ServiceRate;
