import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { API } from "../../api-service";
import { add } from "date-fns";
const useStyles = makeStyles((theme) => ({
	marginButton: {
		margin: theme.spacing(2),
		width: "100%",
	},
}));

function ReportMenu() {
	const [tsl, setTS] = useState(null);
	useEffect(() => {
		API.searchTSAll()
			.then((resp) => resp.json())
			.then((resp) => setTS(resp))
			.catch((error) => console.log(error));
	}, []);






	const classes = useStyles();
	return (
		<div>
			<Container maxWidth="md" align="center">
				<h1>จัดพิมพ์รายงานแสดงผลการดำเนินงาน</h1>
				<Link to="/reportbill">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						รายงานสรุปยอดค่าเช่า(รายเดือน)
					</Button>
				</Link>
				<Link to="/reporttransition">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.marginButton}
					>
						รายงานแสดงการเข้าพักและย้ายออก(ตามช่วงเวลาที่กำหนด)
					</Button>
				</Link>
			</Container>
		</div>
	);
}

export default ReportMenu;
