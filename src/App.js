import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header.js";
import Home from "./Home.js";
import MenuRoom from "./function/Room/RoomMenu.js";
import CreateRoom from "./function/Room/CreateRoom";
import EditRoom from "./function/Room/EditRoom";
import RenterMenu from "./function/Renter/RenterMenu.js";
import CreateRenter from "./function/Renter/CreateRenter.js";
import EditRenter from "./function/Renter/EditRenter.js";
import ServiceRateMenu from "./function/ServiceRate/ServiceRateMenu.js";
import ServiceRate from "./function/ServiceRate/ServiceRate.js";
import MoveIn from "./function/MoveInMoveOut/MovieIn.js";
import MoveOut from "./function/MoveInMoveOut/MoveOut.js"
import ServiceRecord from "./function/RecordBill/ServiceRecord.js"
import AddBill from "./function/RecordBill/AddBill.js"
import Payment from "./function/Payment/Payment.js"
import Search from "./function/Search/Search.js"
import Problem from "./function/Problem/Problem.js"
import ProblemMenu from "./function/Problem/ProblemMenu.js"
import ProblemView from "./function/Problem/ProblemView.js"
import ReportMenu from "./function/Report/ReportMenu.js"
import ReportBill from "./function/Report/ReportBill.js"
import ReportTransition from "./function/Report/ReportTransition.js"

function App() {
	const [selectedPrice,setSelectedPrice] = useState(null);
	const loadPrice = (price) => {
		setSelectedPrice(price);
		console.log(price)
	};
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
							<Route exact path="/serviceratemenu">
								<Header></Header>
								<ServiceRateMenu 
								priceClicked={loadPrice}></ServiceRateMenu>
							</Route>
							<Route exact path="/servicerate/:servicerateId">
								<Header></Header>
								<ServiceRate price={selectedPrice}></ServiceRate>
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
							<Route exact path="/problem">
								<Header></Header>
								<Problem></Problem>
							</Route>
							<Route exact path="/problemmenu">
								<Header></Header>
								<ProblemMenu></ProblemMenu>
							</Route>
							<Route exact path="/problemview">
								<Header></Header>
								<ProblemView></ProblemView>
							</Route>
							<Route exact path="/reportmenu">
								<Header></Header>
								<ReportMenu></ReportMenu>
							</Route>
							<Route exact path="/reportbill">
								<Header></Header>
								<ReportBill></ReportBill>
							</Route>
							<Route exact path="/reporttransition">
								<Header></Header>
								<ReportTransition></ReportTransition>
							</Route>
						</Switch>
					</div>
				</Router>
			</header>
		</div>
	);
}

export default App;
