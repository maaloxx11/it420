import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { API } from "../../api-service";
import { useCookies } from "react-cookie";
import ReturnLogin from "../../ReturnLogin.js";
const useStyles = makeStyles((theme) => ({
	marginButton: {
		margin: theme.spacing(2),
		width: "100%",
	},
}));
function ServiceRateMenu(props) {
	const [token] = useCookies(["mr-token"]);
	const [prices, setPrice] = useState([]);
	useEffect(() => {
		if (token["mr-token"]) {
			API.searchPrice(token["mr-token"])
				.then((resp) => resp.json())
				.then((resp) => setPrice(resp))
				.catch((error) => console.log(error));
		}
	}, [token]);
	const priceClicked = (price) => (evt) => {
		props.priceClicked(price);
	};
	const classes = useStyles();
	return (
		<div>
			<ReturnLogin></ReturnLogin>
			<Container maxWidth="md" align="center">
				<h1>ปรับเปลี่ยนอัตราค่าบริการ</h1>
				{prices.map((price) => {
					return (
						<div key={price.price_id} className="movie-item">
							<Link to={`/servicerate/${price.price_id}`}>
								<Button
									variant="contained"
									color="primary"
									size="large"
									className={classes.marginButton}
									onClick={priceClicked(price)}
								>
									{price.price_description}
								</Button>
							</Link>
						</div>
					);
				})}
			</Container>
		</div>
	);
}

export default ServiceRateMenu;
