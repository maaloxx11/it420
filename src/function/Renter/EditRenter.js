import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import SearchIcon from "@material-ui/icons/Search";
import { API } from "../../api-service.js";
function EditRenter() {
	const [renter, setRenter] = useState(null);
	const [renter_id, setRenterID] = useState("");
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [telephone, setTelephone] = useState("");
	const searchRenter = () => {
		API.searchRenter({ renter_id })
			.then((resp) => resp.json())
			.then((resp) => setRenter(resp))
			.catch((error) => console.log(error));
	};
	useEffect(() => {
		if (renter !== null) {
			setFirstName(renter.firstname);
			setLastName(renter.lastname);
			setAddress(renter.address);
			setTelephone(renter.telephone);
		}
	}, [renter]);
	const EditRenter = () => {
		API.editRenter(renter_id, {
			renter_id,
			firstname,
			lastname,
			address,
			telephone,
		})
			.then((resp) => console.log(resp))
			.then(
				setRenterID(""),
				setFirstName(""),
				setLastName(""),
				setAddress(""),
				setTelephone(""),
				setRenter(null),
			)
			.catch((error) => console.log(error));
	};
	return (
		<div>
			<Container maxWidth="md">
				<h1 align="center">แก้ไขข้อมูลผู้เช่า</h1>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							required
							id="renter_id"
							label="รหัสผู้เช่า"
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
							onChange={(evt) => setTelephone(evt.target.value)}
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
							onClick={EditRenter}
						>
							บันทึก
						</Button>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default EditRenter;
