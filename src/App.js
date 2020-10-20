import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header.js";
import Home from "./Home.js";
import MenuApartment from "./function/Apartment/MenuApartMent.js"
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
							<Route exact path="/menuapm">
								<Header></Header>
								<MenuApartment></MenuApartment>
							</Route>
							<Route exact path="/createroom">
								<Header></Header>
								<h1>A</h1>
							</Route>
						</Switch>
					</div>
				</Router>
			</header>
		</div>
	);
}

export default App;
