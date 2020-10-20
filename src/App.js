import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header.js";
import Home from "./Home.js";
import MenuRoom from "./function/Room/RoomMenu.js"
import CreateRoom from "./function/Room/CreateRoom"
import EditRoom from "./function/Room/EditRoom"
import RenterMenu from "./function/Renter/RenterMenu.js"
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
						</Switch>
					</div>
				</Router>
			</header>
		</div>
	);
}

export default App;
