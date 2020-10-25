import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import SearchIcon from "@material-ui/icons/Search";
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const date = today.toISOString().split("T")[0];
function Problem() {
	return (
		<div>
			<Container maxWidth="md">
				<h1 align="center"> เพิ่มข้อมูลเรื่องร้องเรียน-ปัญหา</h1>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField required id="standard-basic" label="รหัสห้องพัก" />

						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SearchIcon />}
						></Button>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							id="standard-full-width"
							label="รายละเอียดเรื่องร้องเรียนปัญหา"
							multiline
							rowsMax={4}
							style={{ margin: 8 }}
							fullWidth
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="standard-basic"
							label="วันที่บันทึกข้อมูล"
							defaultValue={date}
						/>
					</Grid>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6} align="right">
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

export default Problem;
