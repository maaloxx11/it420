export class API {
	static createRoom(body) {
		return fetch(`http://127.0.0.1:8000/api/room/`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static createRenter(body) {
		return fetch(`http://127.0.0.1:8000/api/renter/`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static updatePrice(price_id, body) {
		return fetch(`http://127.0.0.1:8000/api/price/${price_id}/`, {
			method: "PUT",
			headers: {
				"content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static searchRenter(renter_id) {
		return fetch(`http://127.0.0.1:8000/api/renter/${renter_id}/`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
			},
		});
	}
	static roomCheck(room_type) {
		return fetch(
			`http://127.0.0.1:8000/api/room/?room_type=${
				room_type.room_type
			}&room_status=${0}`,
			{
				method: "GET",
				headers: {
					"content-Type": "application/json",
				},
			}
		);
	}
	static MoveinCreate(body) {
		return fetch(`http://127.0.0.1:8000/api/transition/`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static searchRoom(room_id) {
		return fetch(`http://127.0.0.1:8000/api/room/${room_id}/`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
			},
		});
	}
	static updateRoomStatus(room_id, body) {
		return fetch(`http://127.0.0.1:8000/api/room/${room_id}/`, {
			method: "PUT",
			headers: {
				"content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static editRoom(room_id, body) {
		return fetch(`http://127.0.0.1:8000/api/room/${room_id}/`, {
			method: "PUT",
			headers: {
				"content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static editRenter(renter_id, body) {
		return fetch(`http://127.0.0.1:8000/api/renter/${renter_id}/`, {
			method: "PUT",
			headers: {
				"content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static CreateServiceCharge(body) {
		return fetch(`http://127.0.0.1:8000/api/servicecharge/`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static searchRenterTs(renter_id) {
		return fetch(
			`http://127.0.0.1:8000/api/transition/?renter_id=${renter_id.renter_id}&move_out_date=true`,
			{
				method: "GET",
				headers: {
					"content-Type": "application/json",
				},
			}
		);
	}
	static searchDebt(room_id) {
		return fetch(
			`http://127.0.0.1:8000/api/servicecharge/?room_id=${room_id}`,
			{
				method: "GET",
				headers: {
					"content-Type": "application/json",
				},
			}
		);
	}
	static updateMoveOut(id, body) {
		return fetch(`http://127.0.0.1:8000/api/transition/${id}/`, {
			method: "PUT",
			headers: {
				"content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static searchServiceCharge() {
		return fetch(`http://127.0.0.1:8000/api/servicecharge/`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
			},
		});
	}

	static Total(room_id) {
		return fetch(
			`http://127.0.0.1:8000/api/room/${room_id}/addservicecharge/`,
			{
				method: "POST",
				headers: {
					"content-Type": "application/json",
				},
			}
		).then((resp) => resp.json());
	}
	static updateRecord(id, body) {
		return fetch(`http://127.0.0.1:8000/api/servicecharge/${id}/`, {
			method: "PUT",
			headers: {
				"content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static searchRenterTsBill(room_id) {
		return fetch(
			`http://127.0.0.1:8000/api/transition/?renter_id=${room_id.room_id}&move_out_date=true`,
			{
				method: "GET",
				headers: {
					"content-Type": "application/json",
				},
			}
		);
	}
	static searchPrice() {
		return fetch("http://127.0.0.1:8000/api/price/", {
			method: "GET",
			headers: {
				"content-Type": "application/json",
			},
		});
	}
	static searchPayment(room_id) {
		return fetch(
			`http://127.0.0.1:8000/api/servicecharge/?room_id=${room_id}&payment_status=1`,
			{
				method: "GET",
				headers: {
					"content-Type": "application/json",
				},
			}
		);
	}
	static searchPriceLate() {
		return fetch(`http://127.0.0.1:8000/api/price/?price_id=late`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
			},
		});
	}
	static PaymentCreate(body) {
		return fetch(`http://127.0.0.1:8000/api/payment/`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static UpdatePaymentStatus(sc_id) {
		return fetch(
			`http://127.0.0.1:8000/api/servicecharge/${sc_id}/updatepaymentstatus/`,
			{
				method: "POST",
				headers: {
					"content-Type": "application/json",
				},
			}
		);
	}
	static searchRoomAll() {
		return fetch(`http://127.0.0.1:8000/api/room/?o=room_type&a=room_status`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
			},
		});
	}
	static searchRenterAll() {
		return fetch(`http://127.0.0.1:8000/api/renter/`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
			},
		});
	}
	static searchTSAll() {
		return fetch(`http://127.0.0.1:8000/api/transition/`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
			},
		});
	}
	static ProblemCreate(body) {
		return fetch(`http://127.0.0.1:8000/api/problem/`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static ViewProblem() {
		return fetch(`http://127.0.0.1:8000/api/problem/`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
			},
		});
	}
}
