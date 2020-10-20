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

function Home() {
	const classes = useStyles();
	return (
		<div>
			<Container maxWidth="md" align="center">
				<h1>Function</h1>
				<Link to="/roommenu">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						Function 1
					</Button>
				</Link>
				<Link to="/rentermenu">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						Function 2
					</Button>
				</Link>
				<Button
					variant="contained"
					color="primary"
					size="large"
					className={classes.marginButton}
				>
					Function 3
				</Button>

				<Button
					variant="contained"
					color="primary"
					size="large"
					className={classes.marginButton}
				>
					Function 4
				</Button>

				<Button
					variant="contained"
					color="primary"
					size="large"
					className={classes.marginButton}
				>
					Function 5
				</Button>

				<Button
					variant="contained"
					color="primary"
					size="large"
					className={classes.marginButton}
				>
					Function 6
				</Button>

				<Button
					variant="contained"
					color="primary"
					size="large"
					className={classes.marginButton}
				>
					Function 7
				</Button>

				<Button
					variant="contained"
					color="primary"
					size="large"
					className={classes.marginButton}
				>
					Function 8
				</Button>
				<Button
					variant="contained"
					color="primary"
					size="large"
					className={classes.marginButton}
				>
					Function 9
				</Button>
			</Container>
		</div>
	);
}

export default Home;
