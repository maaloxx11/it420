import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { API } from "./api-service.js";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
function Auth() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [token, setToken] = useCookies(["mr-token"]);
	useEffect(() => {
		if (token["mr-token"]) window.location.href = "/";
	}, [token]);
	const loginClicked = () => {
		API.loginUser({ username, password })
			.then((resp) => setToken("mr-token", resp.token))
			.catch((error) => console.error(error));
	};
	return (
		<div>
			{token["mr-token"] ? (
				<Redirect to="/"></Redirect>
			) : (
				<Container maxWidth="sm">
					<Grid container spacing={3} align="center">
						<Grid item xs={12}>
							<h1>LOGIN</h1>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								id="standard-required"
								label="Username"
								value={username}
								onChange={(evt) => setUsername(evt.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								id="standard-password-input"
								label="Password"
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={(evt) => setPassword(evt.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="contained"
								color="primary"
								onClick={loginClicked}
							>
								Login
							</Button>
						</Grid>
					</Grid>
				</Container>
			)}
		</div>
	);
}

export default Auth;
