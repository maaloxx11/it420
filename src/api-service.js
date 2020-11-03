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
		return fetch(`http://127.0.0.1:8000/api/renter/${renter_id.renter_id}/`, {
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
		}).then((resp) => resp.json())
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
	static DeleteRecord(id) {
		return fetch(`http://127.0.0.1:8000/api/servicecharge/${id}/`, {
			method: "DELETE",
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
}
