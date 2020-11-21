import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { API } from "../../api-service";
import { Redirect } from "react-router-dom";
import ReturnHome from "../../ReturnHome.js";
function ServiceRate(props) {
	const [price_num, setNewPrice] = useState("");
	const [errorPrice, setErrorPrice] = useState(false);
	const [errorPriceDetail, setErrorPriceDeatail] = useState("");
	const [open, setOpen] = useState(false);
	const [openDetail, setOpenDetail] = useState("");
	const [price_description, setPrice_description] = useState("");
	const [openConfirm, setOpenConfirm] = useState(false);
	const handleOpen = () => {
		setOpenConfirm(true);
	};
	const handleClose = () => {
		setOpen(false);
		setOpenConfirm(false);
	};
	useEffect(() => {
		if (!/^[0-9]/.test(price_num) && price_num !== "") {
			setErrorPrice(true);
			setErrorPriceDeatail("ค่า่บริการต้องเป็นตัวเลขเท่านั้น");
		} else {
			setErrorPrice(false);
			setErrorPriceDeatail("");
		}
		if (price_description === "" && props.price !== null) {
			setPrice_description(props.price.price_description);
		}
	}, [price_num, price_description, props]);

	const UpdateClicked = () => {
		if (price_num !== "" && errorPrice !== true) {
			API.updatePrice(props.price.price_id, { price_num, price_description })
				.then((resp) => console.log(resp))
				.catch((error) => console.log(error));
			setNewPrice("");
			setOpen(true);
			setOpenDetail("แก้ไขอัตรค่าบริการเสร็จสิ้น");
		} else {
			setOpen(true);
			setOpenDetail("กรุณาตรวจสอบการกรอกข้อมูลอีกครั้ง");
		}
	};

	return (
		<div>
			{props.price ? (
				<Container maxWidth="md">
					<h1 align="center">กำหนดอัตรค่าบริการ</h1>
					<Grid container spacing={3} align="center">
						<Grid item xs={12} sm={6}>
							<TextField
								disabled
								required
								id="electric_meter"
								label={"ค่า" + props.price.price_description + "เก่า"}
								value={props.price.price_num}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="water_meter"
								label={"ค่า" + props.price.price_description + "ใหม่"}
								value={price_num}
								error={errorPrice}
								helperText={errorPriceDetail}
								onChange={(evt) => setNewPrice(evt.target.value)}
							/>
						</Grid>
						<Grid item xs={6}>
							<ReturnHome></ReturnHome>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant="contained"
								color="primary"
								size="large"
								startIcon={<SaveIcon />}
								onClick={handleOpen}
								style={{ backgroundColor: "green" }}
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
							ยืนยันการแก้ไขอัตราค่าบริการ
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								ยืนยันการแก้ไขอัตราค่าบริการ
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
							<Button onClick={UpdateClicked} color="primary">
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
						<DialogTitle id="alert-dialog-title">
							แสดงผลการดำเนินการ
						</DialogTitle>
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
			) : (
				<Redirect to="/serviceratemenu" />
			)}
		</div>
	);
}

export default ServiceRate;
