import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
function ReturnHome() {
	return (
		<div>
			<Link to="/">
				<Button
					variant="contained"
					color="primary"
					size="large"
					startIcon={<HomeIcon />}
				>
					กลับสู่หน้าหลัก
				</Button>
			</Link>
		</div>
	);
}

export default ReturnHome;
