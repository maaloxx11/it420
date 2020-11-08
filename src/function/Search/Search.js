import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { API } from "../../api-service";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(0),
		minWidth: 170,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

function Search() {
	const classes = useStyles();
	const [type, setType] = useState("");
	const [rooms, setRoom] = useState(null);
	const [renters, setRenter] = useState(null);
	const [id, setSetID] = useState("");
	const [tsl, setTS] = useState(null);
	const [errorID, setErrorID] = useState(false);
	const [errorIDDetail, setErrorIDDeatail] = useState("");
	const [errorType, setErrorType] = useState(false);
	const [errorTypeDetail, setErrorTypeDeatail] = useState("");
	const handleChange = (event) => {
		setType(event.target.value);
	};
	const SearchClick = () => {
		setRoom(null);
		setRenter(null);
		if (type !== "") {
			setErrorType(false);
			setErrorTypeDeatail("");
			if (id !== "" && !/^[0-9]/.test(id)) {
				setErrorID(true);
				setErrorIDDeatail("รหัสต้องเป็นตัวเลขเท่านั้น");
			} else {
				if (id === "") {
					if (type === 1) {
						API.searchRoomAll()
							.then((resp) => resp.json())
							.then((resp) => setRoom(resp))
							.catch((error) => console.log(error));
					} else if (type === 2) {
						API.searchRenterAll()
							.then((resp) => resp.json())
							.then((resp) => setRenter(resp))
							.catch((error) => console.log(error));
					}
				} else {
					if (type === 1) {
						API.searchRoom(id)
							.then((resp) => resp.json())
							.then((resp) => setRoom([resp]))
							.catch((error) => console.log(error));
					} else if (type === 2) {
						API.searchRenter(id)
							.then((resp) => resp.json())
							.then((resp) => setRenter([resp]))
							.catch((error) => console.log(error));
					}
				}
				setErrorID(false);
				setErrorIDDeatail("");
			}
		} else {
			setErrorType(true);
			setErrorTypeDeatail("กรุณาระบุหัวข้อการสืบค้น");
		}
	};
	useEffect(() => {
		if (renters === null) {
			API.searchTSAll()
				.then((resp) => resp.json())
				.then((resp) => setTS(resp))
				.catch((error) => console.log(error));
		}
	}, [renters]);

	let room_def = {
		1: "ห้องเปล่า",
		2: "ห้องเฟอร์นิเจอร์",
		3: "ห้องแอร์",
		4: "ห้องเฟอร์นิเจอร์+แอร์",
	};
	let status = {
		0: "ว่าง",
		1: "ไม่ว่าง",
	};
	return (
		<div>
			<Container maxWidth="md">
				<h1 align="center">สืบค้นข้อมูล</h1>

				<Grid container spacing={3}>
					<Grid item xs={12} sm={4}>
						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">
								หัวข้อที่ต้องการสืบค้น
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={type}
								onChange={handleChange}
							>
								<MenuItem value={1}>ห้องพัก</MenuItem>
								<MenuItem value={2}>ผู้เช่า</MenuItem>
							</Select>
							<FormHelperText error={errorType}>
								{errorTypeDetail}
							</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							id="standard-basic"
							label="รหัส"
							error={errorID}
							helperText={errorIDDetail}
							value={id}
							onChange={(evt) => setSetID(evt.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SearchIcon />}
							onClick={SearchClick}
						></Button>
					</Grid>
					{rooms ? (
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="center">รหัสห้อง</TableCell>
									<TableCell align="left">ประเภทห้อง</TableCell>
									<TableCell align="left">สถานะ</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rooms.map((room) => {
									return (
										<TableRow align="center" key={room.room_id}>
											<TableCell component="th" scope="row" align="center">
												{room.room_id}
											</TableCell>
											<TableCell align="left">
												{room_def[room.room_type]}
											</TableCell>
											<TableCell align="left">
												{status[room.room_status]}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					) : null}
					{renters ? (
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="center">รหัสผู้เช่า</TableCell>
									<TableCell align="left">ชื่อผู้เช่า</TableCell>
									<TableCell align="left">นามสกุลผู้เช่า</TableCell>
									<TableCell align="left">ที่อยู่ผู้เช่า</TableCell>
									<TableCell align="left">เบอรโทรผู้เช่า</TableCell>
									<TableCell align="center">พักอยู่ห้อง</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{renters.map((renter) => {
									return (
										<TableRow align="center" key={renter.renter_id}>
											<TableCell component="th" scope="row" align="center">
												{renter.renter_id}
											</TableCell>
											<TableCell align="left">{renter.firstname}</TableCell>
											<TableCell align="left">{renter.lastname}</TableCell>
											<TableCell align="left">{renter.address}</TableCell>
											<TableCell align="left">{renter.telephone}</TableCell>
											{tsl
												.filter((ts) => ts.renter_id === renter.renter_id)
												.map((filteredTS) => (
													<TableCell align="center" key={filteredTS.id}>
														{filteredTS.room_id}
													</TableCell>
												))}
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					) : null}
				</Grid>
			</Container>
		</div>
	);
}

export default Search;
