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
function MenuRoom() {
	const classes = useStyles();
	return (
		<div>
			<Container maxWidth="md" align="center">
				<h1>เมนู</h1>
				<Link to="/createroom">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						Function 1
					</Button>
				</Link>
                <Link to="/editroom">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						Function 1
					</Button>
				</Link>
 
			</Container>
		</div>
	);
}

export default MenuRoom;
