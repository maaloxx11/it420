import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
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
import MoveOut from "./function/MoveInMoveOut/MoveOut.js";
import ServiceRecord from "./function/RecordBill/ServiceRecord.js";
import AddBill from "./function/RecordBill/AddBill.js";
import Payment from "./function/Payment/Payment.js";
import Search from "./function/Search/Search.js";
import Problem from "./function/Problem/Problem.js";
import ProblemMenu from "./function/Problem/ProblemMenu.js";
import ProblemView from "./function/Problem/ProblemView.js";
import ReportMenu from "./function/Report/ReportMenu.js";
import ReportBill from "./function/Report/ReportBill.js";
import ReportTransition from "./function/Report/ReportTransition.js";
import CreateBill from "./function/RecordBill/CreateBill.js";
import CreateBillAll from "./function/RecordBill/CreateBillAll.js";
import CreateReportBill from "./function/Report/CreateReportBill.js";
import CreateReportTs from "./function/Report/CreateReportTs.js";
import Receipt from "./function/Payment/Receipt.js";
import Auth from "./auth.js";
import { CookiesProvider } from "react-cookie";
function App() {

	const [selectedPrice, setSelectedPrice] = useState(null);
	const [selectedRecord, setSelectedRecord] = useState(null);
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedDateStart, setSelectedDateStart] = useState("");
	const [selectedDateEnd, setSelectedDateEnd] = useState("");
	const [selectedRoom, setSelectedRoom] = useState("");
	const [selectedTotal, setSelectedTotal] = useState("");
	const [selectedType, setSelectedType] = useState("");

	const loadPrice = (price) => {
		setSelectedPrice(price);
	};
	const loadRecord = (record) => {
		setSelectedRecord(record);
	};
	const loadDate = (date) => {
		setSelectedDate(date);
	};
	const loadDatest = (datest) => {
		setSelectedDateStart(datest);
	};
	const loadDateed = (datest) => {
		setSelectedDateEnd(datest);
	};
	const loadRoom = (room_id) => {
		setSelectedRoom(room_id);
	};
	const loadTotal = (total) => {
		setSelectedTotal(total);
	};
	const loadType = (type) => {
		setSelectedType(type);
	};

	return (
		<div className="App">
			<header className="App-header">
				<CookiesProvider>
					<Router>
						<div className="app">
							<Switch>
								<Route exact path="/">
									<Header></Header>
									<Home></Home>
								</Route>
								<Route exact path="/login">
									<Auth></Auth>
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
									<ServiceRateMenu priceClicked={loadPrice}></ServiceRateMenu>
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
									<ServiceRecord recordClicked={loadRecord}></ServiceRecord>
								</Route>
								<Route exact path="/addbill/">
									<Header></Header>
									<AddBill servicecharge={selectedRecord}></AddBill>
								</Route>
								<Route exact path="/createbill/:billId">
									<Header></Header>
									<CreateBill servicecharge={selectedRecord}></CreateBill>
								</Route>
								<Route exact path="/createbillall/">
									<Header></Header>
									<CreateBillAll></CreateBillAll>
								</Route>

								<Route exact path="/payment">
									<Header></Header>
									<Payment
										RoomClicked={loadRoom}
										TotalClicked={loadTotal}
										TypeClicked={loadType}
									></Payment>
								</Route>
								<Route exact path="/receipt">
									<Header></Header>
									<Receipt
										room={selectedRoom}
										total={selectedTotal}
										type={selectedType}
									></Receipt>
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
									<ReportBill dateClicked={loadDate}></ReportBill>
								</Route>
								<Route exact path="/createreportbill">
									<Header></Header>
									<CreateReportBill date={selectedDate}></CreateReportBill>
								</Route>
								<Route exact path="/reporttransition">
									<Header></Header>
									<ReportTransition
										dateStartClicked={loadDatest}
										dateEndClicked={loadDateed}
									></ReportTransition>
								</Route>
								<Route exact path="/createreportts">
									<Header></Header>
									<CreateReportTs
										dates={selectedDateStart}
										datee={selectedDateEnd}
									></CreateReportTs>
								</Route>
							</Switch>
						</div>
					</Router>
				</CookiesProvider>
			</header>
		</div>
	);
}


export default App;
