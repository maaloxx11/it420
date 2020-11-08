import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import SearchIcon from "@material-ui/icons/Search";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { API } from "../../api-service";

function Problem() {
	const date = new Date();
	let problem_date =
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	const [room_id, SetRoomID] = useState("");
	const [room, SetRoom] = useState(null);
	const [promblem_description, SetDescription] = useState("");
	const [errorRoomID, setErrorRoomID] = useState(false);
	const [errorRoomIDDetail, setErrorRoomIDDeatail] = useState("");
	const [open, setOpen] = useState(false);
	const [openDetail, setOpenDetail] = useState("");

	const handleClose = () => {
		setOpen(false);
	};
	const SearchRoom = () => {
		if (!/^[0-9]/.test(room_id) && room_id !== "") {
			setErrorRoomID(true);
			setErrorRoomIDDeatail("รหัสห้องต้องเป็นตัวเลขเท่านั้น");
		} else {
			API.searchRoom(room_id)
				.then((resp) => resp.json())
				.then((resp) => SetRoom(resp))
				.catch((error) => console.log(error));
			setErrorRoomID(false);
			setErrorRoomIDDeatail("");
		}
	};
	useEffect(() => {
		if (room !== null && room_id !== "") {
			if (room.detail === "Not found.") {
				setErrorRoomID(true);
				setErrorRoomIDDeatail("ไม่พบข้อมูลรหัสห้องพักในระบบ");
			} else {
				setErrorRoomID(false);
				setErrorRoomIDDeatail("");
			}
		}
	}, [room, room_id]);
	const Submit = () => {
		if (room_id !== "" && promblem_description !== "" && problem_date !== "") {
			API.ProblemCreate({ room_id, promblem_description, problem_date });
			setOpen(true);
			setOpenDetail("บันทึกข้อมูลเรื่องร้องเรียน-ปัญหาเสร็จสิ้น");
		} else {
			setOpen(true);
			setOpenDetail("กรุณาตรวจสอบการกรอกข้อมูลอีกครั้ง");
		}
	};
	console.log(room);
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
							error={errorRoomID}
							helperText={errorRoomIDDetail}
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
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">แสดงผลการดำเนินการ</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{openDetail}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							ปิด
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</div>
	);
}

export default Problem;
