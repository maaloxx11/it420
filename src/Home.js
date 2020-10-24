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
						จัดการทะเบียนห้องพัก
					</Button>
				</Link>
				<Link to="/rentermenu">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						จัดการทะเบียนผู้เช่า
					</Button>
				</Link>
				<Link to="/servicerate">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						กำหนดอัตราค่าบริการ
					</Button>
				</Link>
				<Link to="/movein">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						บันทึกการเข้าพัก
					</Button>
				</Link>
				<Link to="/moveout">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						บันทึกการย้ายออก
					</Button>
				</Link>
				<Link to="/servicerecord">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						บันทึกการใช้บริการ และจัดพิมพ์ใบแจ้งหนี้
					</Button>
				</Link>
				<Link to="/payment">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						รับชำระค่าบริการ
					</Button>
				</Link>
				<Link to="/search">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						สืบค้นข้อมูล
					</Button>
				</Link>
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
