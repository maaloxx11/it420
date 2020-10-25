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
function ProblemMenu() {
	const classes = useStyles();
	return (
		<div>
			<Container maxWidth="md" align="center">
				<h1>จัดการเรื่องร้องเรียน-ปัญหา</h1>
				<Link to="/problem">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						เพิ่มข้อมูลเรื่องร้องเรียน-ปัญหา
					</Button>
				</Link>
				<Link to="/problemview">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						ดูข้อมูลเรื่องร้องเรียน-ปัญหา
					</Button>
				</Link>
			</Container>
		</div>
	);
}

export default ProblemMenu;
