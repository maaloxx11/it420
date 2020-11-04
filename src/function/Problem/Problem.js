import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import SearchIcon from "@material-ui/icons/Search";
import { API } from "../../api-service";

function Problem() {
	const date = new Date();
	let problem_date =
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	const [room_id, SetRoomID] = useState("");
	const [room, SetRoom] = useState(null);
	const [promblem_description, SetDescription] = useState("");
	const SearchRoom = () => {
		API.searchRoom(room_id)
			.then((resp) => resp.json())
			.then((resp) => SetRoom([resp]))
			.catch((error) => console.log(error));
	};
	const Submit = () => {
		API.ProblemCreate({ room_id, promblem_description, problem_date });
	};
	console.log(room)
	return (
		<div>
			<Container maxWidth="md">
				<h1 align="center"> เพิ่มข้อมูลเรื่องร้องเรียน-ปัญหา</h1>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							required
							id="standard-basic"
							label="รหัสห้องพัก"
							value={room_id}
							onChange={(evt) => SetRoomID(evt.target.value)}
						/>

						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SearchIcon />}
							onClick={SearchRoom}
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
							value={promblem_description}
							onChange={(evt) => SetDescription(evt.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="date"
							label="วันที่บันทึกข้อมูล"
							value={problem_date}
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
							onClick={Submit}
						>
							บันทึก
						</Button>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default Problem;
