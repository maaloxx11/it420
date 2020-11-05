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

	let moth_th = {
		0: "ม.ค.",
		1: "ก.พ.",
		2: "มี.ค.",
		3: "เม.ย.",
		4: "พ.ค",
		5: "มิ.ย.",
		6: "ก.ค.",
		7: "ส.ค.",
		8: "ก.ย. ",
		9: "ต.ค",
		10: "พ.ย.",
		11: "ธ.ค.",
	};

	var dic_month = [];
	if (tsl !== null) {
		for (var i of tsl) {
			let date = new Date(i.move_in_date);
			let month = moth_th[date.getMonth()];
			let list = {
				id: i.id,
				month: month,
			};
			dic_month.push(list);
			console.log(typeof i.move_in_date);
		}
	}
	var counts = dic_month.reduce((p, c) => {
		var name = c.month;
		if (!p.hasOwnProperty(name)) {
			p[name] = 0;
		}
		p[name]++;
		return p;
	}, {});
	var countsExtended = Object.keys(counts).map((k) => {
		return { month: k, count: counts[k] };
	});
	if (countsExtended !== null) {
		for (var i of countsExtended) {
			
			console.log(i.month);
		}
	}

	console.log(countsExtended);
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
