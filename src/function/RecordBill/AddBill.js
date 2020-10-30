import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(0),
		minWidth: 170,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const date = today.toISOString().split("T")[0];
function AddBill() {
	const classes = useStyles();
	const [age, setAge] = React.useState("");

	const handleChange = (event) => {
		setAge(event.target.value);
	};
	return (
		<div>
			<Container maxWidth="md">
				<h1 align="center">บันทึกค่าบริการ</h1>

				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">รหัสห้องพัก</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={age}
								onChange={handleChange}
							>
								<MenuItem value={10}>609</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
							<FormHelperText></FormHelperText>
						</FormControl>
					</Grid>
                    <Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="standard-basic"
							label="วันที่บันทึกข้อมูลล่าสุด"
							defaultValue={"2020-9-24"}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField disabled id="standard-basic" label="ประเภทห้องพัก" defaultValue={"1"}/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="standard-basic"
							label="มิเตอร์ไฟฟ้าปัจจุบัน"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="standard-basic"
							label="มิเตอร์น้ำประปาปัจจุบัน"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="standard-basic"
							label="กำหนดชำระ"
							defaultValue={"2020-11-5"}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled
							id="standard-basic"
							label="วันที่บันทึกข้อมูลปัจจุบัน"
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

export default AddBill;
