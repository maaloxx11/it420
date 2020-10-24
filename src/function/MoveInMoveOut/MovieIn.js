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
function MovieIn() {
	return (
		<div>
			<Container maxWidth="md">
				<h1 align="center">แก้ไขข้อมูลห้องพัก</h1>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField required id="standard-basic" label="รหัสผู้เช่า" />

						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SearchIcon />}
						></Button>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							required
							id="standard-basic"
							label="ชื่อผู้เช่า"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="standard-basic"
							label="รหัสห้องที่ต้องการเข้าพัก"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="standard-basic"
							label="ราคาห้อง"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="standard-basic"
							label="เข้าพักวันที่"
							defaultValue={date}
						/>
					</Grid>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}>
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

export default MovieIn;
