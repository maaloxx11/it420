import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ReturnLogin from "../../ReturnLogin.js";
const useStyles = makeStyles((theme) => ({
	marginButton: {
		margin: theme.spacing(2),
		width: "100%",
	},
}));
function MenuRoom() {
	const classes = useStyles();
	return (
		<div>
			<ReturnLogin></ReturnLogin>
			<Container maxWidth="md" align="center">
				<h1>ปรับเปลี่ยนข้อมูลห้องพัก</h1>
				<Link to="/createroom">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						เพิ่มข้อมูลห้องพัก
					</Button>
				</Link>
				<Link to="/editroom">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						แก้ไขข้อมูลห้องพัก
					</Button>
				</Link>
			</Container>
		</div>
	);
}

export default MenuRoom;
