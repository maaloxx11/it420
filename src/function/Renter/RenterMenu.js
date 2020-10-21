import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
	marginButton: {
		margin: theme.spacing(2),
		width: "100%",
	},
}));
function RenterMenu() {
	const classes = useStyles();
	return (
		<div>
			<Container maxWidth="md" align="center">
				<h1>ปรับเปลี่ยนข้อมูลผู้เช่า</h1>
				<Link to="/createrenter">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						เพิ่มข้อมูลผู้เช่า
					</Button>
				</Link>
				<Link to="/editrenter">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						แก้ไขข้อมูลผู้เช่า
					</Button>
				</Link>
			</Container>
		</div>
	);
}

export default RenterMenu;
