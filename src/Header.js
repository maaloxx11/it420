import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import ApartmentIcon from "@material-ui/icons/Apartment";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AssignmentReturnedIcon from "@material-ui/icons/AssignmentReturned";
import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";
import { useCookies } from "react-cookie";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

export default function PersistentDrawerLeft() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [token, setToken, deleteToken] = useCookies(["mr-token"]);
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const LogOut = () => {
		deleteToken(["mr-token"]);
	};

	return (
		<div className={classes.root}>
			<Box display="block" displayPrint="none" m={1}>
				<CssBaseline />
				<AppBar
					position="fixed"
					color="primary"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>

						<Typography variant="h6" color="inherit">
							<NavLink
								to="/"
								underline="none"
								activeStyle={{ color: "white", textDecoration: "none" }}
							>
								นิรันดร์อะพาร์ทเมนต์
							</NavLink>
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === "ltr" ? (
								<ChevronLeftIcon />
							) : (
								<ChevronRightIcon />
							)}
						</IconButton>
					</div>

					<Divider />
					<Link
						to="/roommenu"
						underline="none"
						style={{ color: "black", textDecoration: "none" }}
					>
						<ListItem button>
							<ListItemIcon>
								<ApartmentIcon />
							</ListItemIcon>
							<ListItemText primary="จัดการทะเบียนห้องพัก" />
						</ListItem>
					</Link>
					<Divider />
					<Link
						to="/rentermenu"
						underline="none"
						style={{ color: "black", textDecoration: "none" }}
					>
						<ListItem button>
							<ListItemIcon>
								<AssignmentIndIcon />
							</ListItemIcon>
							<ListItemText primary="จัดการทะเบียนผู้เช่า" />
						</ListItem>
					</Link>
					<Divider />
					<Link
						to="/serviceratemenu"
						underline="none"
						style={{ color: "black", textDecoration: "none" }}
					>
						<ListItem button>
							<ListItemIcon>
								<MonetizationOnIcon />
							</ListItemIcon>
							<ListItemText primary="กำหนดอัตราค่าบริการ" />
						</ListItem>
					</Link>
					<Divider />
					<Link
						to="/movein"
						underline="none"
						style={{ color: "black", textDecoration: "none" }}
					>
						<ListItem button>
							<ListItemIcon>
								<AssignmentReturnedIcon />
							</ListItemIcon>
							<ListItemText primary="บันทึกการเข้าพัก" />
						</ListItem>
					</Link>
					<Divider />
					<Link
						to="/moveout"
						underline="none"
						style={{ color: "black", textDecoration: "none" }}
					>
						<ListItem button>
							<ListItemIcon>
								<AssignmentReturnIcon />
							</ListItemIcon>
							<ListItemText primary="บันทึกการย้ายออก" />
						</ListItem>
					</Link>
					<Divider />
					<Link
						to="/servicerecord"
						underline="none"
						style={{ color: "black", textDecoration: "none" }}
					>
						<ListItem button>
							<ListItemIcon>
								<ReceiptIcon />
							</ListItemIcon>
							<ListItemText primary="บันทึกการใช้บริการ และจัดพิมพ์ใบแจ้งหนี้" />
						</ListItem>
					</Link>
					<Divider />
					<Link
						to="/payment"
						underline="none"
						style={{ color: "black", textDecoration: "none" }}
					>
						<ListItem button>
							<ListItemIcon>
								<AccountBalanceWalletIcon />
							</ListItemIcon>
							<ListItemText primary="รับชำระค่าบริการ" />
						</ListItem>
					</Link>
					<Divider />
					<Link
						to="/search"
						underline="none"
						style={{ color: "black", textDecoration: "none" }}
					>
						<ListItem button>
							<ListItemIcon>
								<FindInPageIcon />
							</ListItemIcon>
							<ListItemText primary="สืบค้นข้อมูล" />
						</ListItem>
					</Link>
					<Divider />
					<Link
						to="/problemmenu"
						underline="none"
						style={{ color: "black", textDecoration: "none" }}
					>
						<ListItem button>
							<ListItemIcon>
								<ReportProblemIcon />
							</ListItemIcon>
							<ListItemText primary="จัดการเรื่องร้องเรียน-ปัญหา" />
						</ListItem>
					</Link>
					<Divider />
					<Link
						to="/reportmenu"
						underline="none"
						style={{ color: "black", textDecoration: "none" }}
					>
						<ListItem button>
							<ListItemIcon>
								<LocalPrintshopIcon />
							</ListItemIcon>
							<ListItemText primary="จัดพิมพ์รายงานแสดงผลการดำเนินงาน" />
						</ListItem>
					</Link>

					<ListItem button onClick={LogOut}>
						<ListItemIcon style={{ color: "red" }}>
							<ExitToAppIcon />
						</ListItemIcon>
						<ListItemText primary="ออดจากระบบ" style={{ color: "red" }} />
					</ListItem>
				</Drawer>
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open,
					})}
				>
					<br></br>
				</main>
			</Box>
		</div>
	);
}
