import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header.js";
import Home from "./Home.js";
import MenuRoom from "./function/Room/RoomMenu.js";
import CreateRoom from "./function/Room/CreateRoom";
import EditRoom from "./function/Room/EditRoom";
import RenterMenu from "./function/Renter/RenterMenu.js";
import CreateRenter from "./function/Renter/CreateRenter.js";
import EditRenter from "./function/Renter/EditRenter.js";
import ServiceRate from "./function/ServiceRate/ServiceRate.js";
import MoveIn from "./function/MoveInMoveOut/MovieIn.js";
import MoveOut from "./function/MoveInMoveOut/MoveOut.js"
import ServiceRecord from "./function/RecordBill/ServiceRecord.js"
import AddBill from "./function/RecordBill/AddBill.js"
import Payment from "./function/Payment/Payment.js"
import Search from "./function/Search/Search.js"
function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Router>
					<div className="app">
						<Switch>
							<Route exact path="/">
								<Header></Header>
								<Home></Home>
							</Route>
							<Route exact path="/roommenu">
								<Header></Header>
								<MenuRoom></MenuRoom>
							</Route>
							<Route exact path="/createroom">
								<Header></Header>
								<CreateRoom></CreateRoom>
							</Route>
							<Route exact path="/editroom">
								<Header></Header>
								<EditRoom></EditRoom>
							</Route>
							<Route exact path="/rentermenu">
								<Header></Header>
								<RenterMenu></RenterMenu>
							</Route>
							<Route exact path="/createrenter">
								<Header></Header>
								<CreateRenter></CreateRenter>
							</Route>
							<Route exact path="/editrenter">
								<Header></Header>
								<EditRenter></EditRenter>
							</Route>
							<Route exact path="/servicerate">
								<Header></Header>
								<ServiceRate></ServiceRate>
							</Route>
							<Route exact path="/movein">
								<Header></Header>
								<MoveIn></MoveIn>
							</Route>
							<Route exact path="/moveout">
								<Header></Header>
								<MoveOut></MoveOut>
							</Route>
							<Route exact path="/servicerecord">
								<Header></Header>
								<ServiceRecord></ServiceRecord>
							</Route>
							<Route exact path="/addbill">
								<Header></Header>
								<AddBill></AddBill>
							</Route>
							<Route exact path="/payment">
								<Header></Header>
								<Payment></Payment>
							</Route>
							<Route exact path="/search">
								<Header></Header>
								<Search></Search>
							</Route>
						</Switch>
					</div>
				</Router>
			</header>
		</div>
	);
}

export default App;
