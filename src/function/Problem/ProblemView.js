import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import { API } from "../../api-service";
import { useCookies } from "react-cookie";
import TableBody from "@material-ui/core/TableBody";
import ReturnLogin from "../../ReturnLogin.js";
function ProblemView() {
	const [token] = useCookies(["mr-token"]);
	const [problems, setProblem] = useState(null);
	useEffect(() => {
		if (token["mr-token"]) {
			API.ViewProblem(token["mr-token"])
				.then((resp) => resp.json())
				.then((resp) => setProblem(resp))
				.catch((error) => console.log(error));
		}
	}, [token]);
	return (
		<div>
			<ReturnLogin></ReturnLogin>
			<Container maxWidth="md">
				<h1 align="center"> ดูข้อมูลเรื่องร้องเรียน-ปัญหา</h1>
				{problems ? (
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">หมายเลขห้อง</TableCell>
								<TableCell align="left">วันที่เพิ่มข้อมูล</TableCell>
								<TableCell align="left">รายละเอียด</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{problems.map((problem) => {
								return (
									<TableRow align="center" key={problem.id}>
										<TableCell component="th" scope="row" align="center">
											{problem.room_id}
										</TableCell>
										<TableCell align="left">{problem.problem_date}</TableCell>
										<TableCell align="left">
											{problem.promblem_description}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				) : null}
			</Container>
		</div>
	);
}

export default ProblemView;
