import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import { API } from "../../api-service";

function ServiceRate(props) {
	const [price_num, setNewPrice] = useState("");
	let price_description = props.price.price_description
	const UpdateClicked = () => {
		API.updatePrice(props.price.price_id, { price_num,price_description })
			.then((resp) => console.log(resp))
			.catch((error) => console.log(error));
	};

	return (
		<div>
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
							onChange={(evt) => setNewPrice(evt.target.value)}
						/>
					</Grid>
					<Grid item xs={6}></Grid>
					<Grid item xs={6}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SaveIcon />}
							onClick={UpdateClicked}
						>
							บันทึก
						</Button>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default ServiceRate;
