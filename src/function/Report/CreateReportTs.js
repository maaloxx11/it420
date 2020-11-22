import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { API } from "../../api-service";
import Button from "@material-ui/core/Button";
import PrintIcon from "@material-ui/icons/Print";
import Box from "@material-ui/core/Box";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import ReturnHome from "../../ReturnHome.js";
function CreateReportTs(props) {
	function print() {
		window.print();
	}
	const [token] = useCookies(["mr-token"]);
	const date_now = new Date();
	const [tsl, SetTS] = useState(null);
	const [monthstartshow, SetStart] = useState("");
	const [monthendshow, SetEnd] = useState("");
	const [year, Setyear] = useState("");
	const [month_st, Setmonth_st] = useState("");
	const [month_ed, Setmonth_ed] = useState("");

	let day = new Date(year, month_ed, 0).getDate();
	let add_date =
		date_now.getFullYear() +
		"/" +
		(date_now.getMonth() + 1) +
		"/" +
		date_now.getDate();
	let moth_th_full = {
		0: "มกราคม",
		1: "กุมภาพันธ์",
		2: "มีนาคม",
		3: "เมษายน",
		4: "พฤษภาคม",
		5: "มิถุนายน",
		6: "กรกฎาคม",
		7: "สิงหาคม",
		8: "กันยายน ",
		9: "ตุลาคม",
		10: "พฤศจิกายน",
		11: "ธันวาคม",
	};

	useEffect(() => {
		if (token["mr-token"]) {
			if (props.dates !== "" && props.datee !== "") {
				if (year === "") {
					Setyear(props.dates.getFullYear());
					Setmonth_st(props.dates.getMonth() + 1);
					Setmonth_ed(props.datee.getMonth() + 1);
				}
				if ((year !== "", month_st !== "", month_ed !== "")) {
					if (tsl === null) {
						API.SearchDateTS(year, month_st, month_ed, day, token["mr-token"])
							.then((resp) => resp.json())
							.then((resp) => SetTS(resp))
							.catch((error) => console.log(error));
					}
					if (month_st !== null && month_ed !== null) {
						SetStart(moth_th_full[month_st - 1]);
						if (month_st !== month_ed) {
							SetEnd("    -    " + moth_th_full[month_ed - 1]);
						}
					}
				}
			}
		}
	}, [year, month_st, month_ed, day, props, moth_th_full, tsl, token]);

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

	var move_in = [];
	if (tsl !== null) {
		for (var i of tsl) {
			let date = new Date(i.move_in_date);
			let month = moth_th[date.getMonth()];
			let list = {
				id: i.id,
				month: month,
			};
			move_in.push(list);
		}
	}
	var counts_move_in = move_in.reduce((p, c) => {
		var name = c.month;
		if (!p.hasOwnProperty(name)) {
			p[name] = 0;
		}
		p[name]++;
		return p;
	}, {});

	var countsExtended_movein = Object.keys(counts_move_in).map((k) => {
		return { month: k, count: counts_move_in[k] };
	});
	var move_out = [];
	if (tsl !== null) {
		for (var l of tsl) {
			if (l.move_out_date !== null) {
				let date = new Date(l.move_out_date);
				let month = moth_th[date.getMonth()];
				let list = {
					id: l.id,
					month: month,
				};
				move_out.push(list);
			}
		}
	}
	var counts_move_out = move_out.reduce((p, c) => {
		var name = c.month;
		if (!p.hasOwnProperty(name)) {
			p[name] = 0;
		}
		p[name]++;
		return p;
	}, {});

	var countsExtended_moveout = Object.keys(counts_move_out).map((k) => {
		return { month: k, count: counts_move_out[k] };
	});
	var m_in = 0;
	var m_out = 0;
	countsExtended_movein.map((movein) => {
		m_in = movein.count + m_in;
		return m_in;
	});
	countsExtended_moveout.map((moveout) => {
		m_out = moveout.count + m_out;
		return m_out;
	});
	return (
		<div>
			{props.dates ? (
				<Container maxWidth="md">
					<Grid container spacing={3}>
						<Grid item xs={2}>
							<span>
								พิมพ์วันที่ : <br></br> {add_date}
							</span>
						</Grid>
						<Grid item xs={10}>
							<h2 align="center"> รายงานแสดงจำนวนคนเข้าพัก-ย้ายออก</h2>
						</Grid>
						<Grid item xs={2}></Grid>
						<Grid item xs={10}>
							<p align="center">
								เดือน {monthstartshow} {monthendshow} ค.ศ. {year}
							</p>
						</Grid>

						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>เดือน</TableCell>
									<TableCell align="right">จำนวนคนเข้าพัก</TableCell>
									<TableCell align="right">จำนวนคนย้ายออก</TableCell>
								</TableRow>
							</TableHead>
							{countsExtended_movein && countsExtended_moveout ? (
								<TableBody>
									{countsExtended_movein.map((movein) => {
										return (
											<TableRow key={movein.month}>
												<TableCell component="th" scope="row">
													{movein.month}
												</TableCell>

												<TableCell align="right">{movein.count}</TableCell>

												{countsExtended_moveout
													.filter((moveout) => moveout.month === movein.month)
													.map((filteredout) => (
														<TableCell align="right" key={filteredout.month}>
															{filteredout.count}
														</TableCell>
													))}
											</TableRow>
										);
									})}
									<TableRow>
										<TableCell></TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="right"></TableCell>
									</TableRow>
									<TableRow>
										<TableCell>สรุปยอดจำนวนคนเข้าพัก</TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="right">{m_in}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>สรุปยอดจำนวนคนย้ายออก</TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="right">{m_out}</TableCell>
									</TableRow>
								</TableBody>
							) : null}
						</Table>
					</Grid>
					<br></br>
					<Box display="block" displayPrint="none" m={1}>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6}>
								<ReturnHome></ReturnHome>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Button
									variant="contained"
									color="primary"
									size="large"
									startIcon={<PrintIcon />}
									onClick={print}
								>
									พิมพ์รายงาน
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Container>
			) : (
				<Redirect to="/reporttransition"></Redirect>
			)}
		</div>
	);
}

export default CreateReportTs;
