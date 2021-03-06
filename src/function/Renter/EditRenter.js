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
import { API } from "../../api-service.js";
import ReturnHome from "../../ReturnHome.js";
import ReturnLogin from "../../ReturnLogin.js";
import { useCookies } from "react-cookie";
function EditRenter() {
	const [token] = useCookies(["mr-token"]);
	const [renter, setRenter] = useState(null);
	const [renter_id, setRenterID] = useState("");
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [telephone, setTelephone] = useState("");
	const [errorRenterID, setErrorRenterID] = useState(false);
	const [errorRenterIDDetail, setErrorRenterIDDeatail] = useState("");
	const [errorTel, setErrorTel] = useState(false);
	const [errorTelDetail, setErrorTelDeatail] = useState("");
	const [open, setOpen] = useState(false);
	const [openDetail, setOpenDetail] = useState("");
	const [openConfirm, setOpenConfirm] = useState(false);
	const handleOpen = () => {
		setOpenConfirm(true);
	};
	const date1 = new Date();
	let date =
		date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
	const handleClose = () => {
		setOpen(false);
		setOpenConfirm(false);
	};
	const Reset = () => {
		setFirstName("");
		setLastName("");
		setAddress("");
		setTelephone("");
	};
	const searchRenter = () => {
		setRenter(null);
		Reset();
		if (!/^[0-9]/.test(renter_id) && renter_id !== "") {
			setErrorRenterID(true);
			setErrorRenterIDDeatail("หมายเลขผู้เช่าต้องเป็นตัวเลขเท่านั้น");
		} else {
			API.searchRenter(renter_id, token["mr-token"])
				.then((resp) => resp.json())
				.then((resp) => setRenter(resp))
				.catch((error) => console.log(error));
			setErrorRenterID(false);
			setErrorRenterIDDeatail("");
		}
	};
	useEffect(() => {
		if (renter !== null && renter_id !== "") {
			if (renter.detail === "Not found.") {
				Reset();
				setErrorRenterID(true);
				setErrorRenterIDDeatail("ไม่พบข้อมูลผู้เช่าในระบบ");
			} else {
				setFirstName(renter.firstname);
				setLastName(renter.lastname);
				setAddress(renter.address);
				setTelephone(renter.telephone);
				setErrorRenterID(false);
				setErrorRenterIDDeatail("");
			}
		}
		if (!/^[0-9]/.test(telephone) && telephone !== "") {
			setErrorTel(true);
			setErrorTelDeatail("หมายเลขโทรศัพท์ต้องเป็นตัวเลขเท่านั้น");
		} else {
			setErrorTel(false);
			setErrorTelDeatail("");
		}
	}, [renter, renter_id, telephone]);
	const EditRenter = () => {
		if (
			renter_id !== "" &&
			firstname !== "" &&
			lastname !== "" &&
			address !== "" &&
			errorRenterID !== true &&
			errorTel !== true
		) {
			API.editRenter(
				renter_id,
				{
					renter_id,
					firstname,
					lastname,
					address,
					telephone,
					date,
				},
				token["mr-token"]
			).catch((error) => console.log(error));
			Reset();
			setRenterID("");
			setRenter(null);
			setOpen(true);
			setOpenDetail("แก้ไขข้อมูลผู้เช่าเสร็จสิ้น");
		} else {
			setOpen(true);
			setOpenDetail("กรุณาตรวจสอบการกรอกข้อมูลอีกครั้ง");
		}
	};

	return (
		<div>
			<ReturnLogin></ReturnLogin>
			<Container maxWidth="md">
				<h1 align="center">แก้ไขข้อมูลผู้เช่า</h1>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							required
							id="renter_id"
							label="หมายเลขผู้เช่า"
							error={errorRenterID}
							helperText={errorRenterIDDetail}
							value={renter_id}
							onChange={(evt) => setRenterID(evt.target.value)}
						/>
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SearchIcon />}
							onClick={searchRenter}
						></Button>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="firstname"
							label="ชื่อผูู้เช่า"
							value={firstname}
							onChange={(evt) => setFirstName(evt.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="lastname"
							label="นามสกุลผู้เช่า"
							value={lastname}
							onChange={(evt) => setLastName(evt.target.value)}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							id="address"
							label="ที่อยู่ผู้เช่า"
							multiline
							rowsMax={4}
							style={{ margin: 8 }}
							fullWidth
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
							value={address}
							onChange={(evt) => setAddress(evt.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="telephone"
							label="เบอร์โทร"
							value={telephone}
							error={errorTel}
							helperText={errorTelDetail}
							onChange={(evt) => setTelephone(evt.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="present_date"
							format="yyyy-MM-dd"
							label="วันที่บันทึกข้อมูลปัจจุบัน"
							defaultValue={date}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<ReturnHome></ReturnHome>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SaveIcon />}
							style={{ backgroundColor: "green" }}
							onClick={handleOpen}
						>
							บันทึก
						</Button>
					</Grid>
				</Grid>
				<Dialog
					open={openConfirm}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						ยืนยันการแก้ไขข้อมูลผู้เช่า
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							ยืนยันการแก้ไขข้อมูลผู้เช่า
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handleClose}
							color="primary"
							style={{ color: "red" }}
						>
							ยกเลิก
						</Button>
						<Button onClick={EditRenter} color="primary">
							ยืนยัน
						</Button>
					</DialogActions>
				</Dialog>
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

export default EditRenter;
