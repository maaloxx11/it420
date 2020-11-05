import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { API } from "../../api-service";

function CreateReportTs(props) {
	console.log(props.datee);
	console.log(props.dates);
	let datestart = props.dates;
	let dateeend = props.datee;
	const date_now = new Date();
	const [tsl, SetTS] = useState(null);
	let year = datestart.getFullYear();
	let month_st = datestart.getMonth() + 1;
	let month_ed = dateeend.getMonth() + 1;
	let day = new Date(year, month_ed, 0).getDate();
	let add_date =
		date_now.getFullYear() +
		"/" +
		(date_now.getMonth() + 1) +
		"/" +
		date_now.getDate();

	useEffect(() => {
		API.SearchDateTS(year, month_st, month_ed, day)
			.then((resp) => resp.json())
			.then((resp) => SetTS(resp))
            .catch((error) => console.log(error));
        
	}, [year, month_st, month_ed, day]);
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
		for (var i of tsl) {
            if(i.move_out_date !== null){
			let date = new Date(i.move_out_date);
			let month = moth_th[date.getMonth()];
			let list = {
				id: i.id,
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
    
	console.log(countsExtended_movein);
	console.log(countsExtended_moveout);
	return (
		<div>
			<Container maxWidth="md">
				<Grid container spacing={3}>
					<Grid item xs={2}>
						<span>
							พิมพ์วันที่ : <br></br> {add_date}
						</span>
					</Grid>
					<Grid item xs={10}>
						<h2 align="center"> รายงานแสดงช่วงเวลาที่มีการเข้าพัก-ย้ายออก</h2>
					</Grid>
					<Grid item xs={2}></Grid>
					<Grid item xs={10}>
						<p align="center">aaa</p>
					</Grid>

					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell align="center">ห้อง</TableCell>
								<TableCell align="right">ค่าเช่ารายเดือน</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							<TableRow>
								<TableCell component="th" scope="row"></TableCell>

								<TableCell align="center"></TableCell>

								<TableCell align="right">a</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Grid>
			</Container>
			;
		</div>
	);
}

export default CreateReportTs;
