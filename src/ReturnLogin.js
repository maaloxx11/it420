import React from "react";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
function ReturnLogin() {
	const [token] = useCookies(["mr-token"]);
	return (
		<div>{token["mr-token"] ? null : <Redirect to="/login"></Redirect>}</div>
	);
}

export default ReturnLogin;
