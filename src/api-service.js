export class API {
	static createRoom(body, token) {
		return fetch(`http://127.0.0.1:8000/api/room/`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static createRenter(body, token) {
		return fetch(`http://127.0.0.1:8000/api/renter/`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static updatePrice(price_id, body, token) {
		return fetch(`http://127.0.0.1:8000/api/price/${price_id}/`, {
			method: "PUT",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(body, token),
		}).then((resp) => resp.json());
	}
	static searchRenter(renter_id, token) {
		return fetch(`http://127.0.0.1:8000/api/renter/${renter_id}/`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		});
	}
	static roomCheck(room_type, token) {
		return fetch(
			`http://127.0.0.1:8000/api/room/?room_type=${
				room_type.room_type
			}&room_status=${0}`,
			{
				method: "GET",
				headers: {
					"content-Type": "application/json",
					Authorization: `Token ${token}`,
				},
			}
		);
	}
	static MoveinCreate(body, token) {
		return fetch(`http://127.0.0.1:8000/api/transition/`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static searchRoom(room_id, token) {
		return fetch(`http://127.0.0.1:8000/api/room/${room_id}/`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		});
	}
	static updateRoomStatus(room_id, body, token) {
		return fetch(`http://127.0.0.1:8000/api/room/${room_id}/`, {
			method: "PUT",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static editRoom(room_id, body, token) {
		return fetch(`http://127.0.0.1:8000/api/room/${room_id}/`, {
			method: "PUT",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static editRenter(renter_id, body, token) {
		return fetch(`http://127.0.0.1:8000/api/renter/${renter_id}/`, {
			method: "PUT",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static CreateServiceCharge(body, token) {
		return fetch(`http://127.0.0.1:8000/api/servicecharge/`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static searchRenterTs(renter_id, token) {
		return fetch(
			`http://127.0.0.1:8000/api/transition/?renter_id=${renter_id.renter_id}&move_out_date=true`,
			{
				method: "GET",
				headers: {
					"content-Type": "application/json",
					Authorization: `Token ${token}`,
				},
			}
		);
	}
	static searchDebt(room_id, token) {
		return fetch(
			`http://127.0.0.1:8000/api/servicecharge/?room_id=${room_id}`,
			{
				method: "GET",
				headers: {
					"content-Type": "application/json",
					Authorization: `Token ${token}`,
				},
			}
		);
	}
	static updateMoveOut(id, body, token) {
		return fetch(`http://127.0.0.1:8000/api/transition/${id}/`, {
			method: "PUT",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(body, token),
		}).then((resp) => resp.json());
	}
	static searchServiceCharge(token) {
		return fetch(`http://127.0.0.1:8000/api/servicecharge/?status=1`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		});
	}
	static searchServiceChargeBill(token) {
		return fetch(`http://127.0.0.1:8000/api/servicecharge/`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		});
	}

	static Total(room_id, token) {
		return fetch(
			`http://127.0.0.1:8000/api/room/${room_id}/addservicecharge/`,
			{
				method: "POST",
				headers: {
					"content-Type": "application/json",
					Authorization: `Token ${token}`,
				},
			}
		).then((resp) => resp.json());
	}
	static updateRecord(id, body, token) {
		return fetch(`http://127.0.0.1:8000/api/servicecharge/${id}/`, {
			method: "PUT",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static searchRenterTsBill(room_id, token) {
		return fetch(
			`http://127.0.0.1:8000/api/transition/?renter_id=${room_id.room_id}&move_out_date=true`,
			{
				method: "GET",
				headers: {
					"content-Type": "application/json",
					Authorization: `Token ${token}`,
				},
			}
		);
	}
	static searchPrice(token) {
		return fetch("http://127.0.0.1:8000/api/price/", {
			method: "GET",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		});
	}
	static searchPayment(room_id, token) {
		return fetch(
			`http://127.0.0.1:8000/api/servicecharge/?room_id=${room_id}&payment_status=1`,
			{
				method: "GET",
				headers: {
					"content-Type": "application/json",
					Authorization: `Token ${token}`,
				},
			}
		);
	}
	static searchPriceLate(token) {
		return fetch(`http://127.0.0.1:8000/api/price/?price_id=late`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		});
	}
	static PaymentCreate(body, token) {
		return fetch(`http://127.0.0.1:8000/api/payment/`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static UpdatePaymentStatus(sc_id, token) {
		return fetch(
			`http://127.0.0.1:8000/api/servicecharge/${sc_id}/updatepaymentstatus/`,
			{
				method: "POST",
				headers: {
					"content-Type": "application/json",
					Authorization: `Token ${token}`,
				},
			}
		);
	}
	static searchRoomAll(token) {
		return fetch(`http://127.0.0.1:8000/api/room/?o=room_type&a=room_status`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		});
	}
	static searchRenterAll(token) {
		return fetch(`http://127.0.0.1:8000/api/renter/`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		});
	}
	static searchTSAll(token) {
		return fetch(`http://127.0.0.1:8000/api/transition/`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		});
	}
	static ProblemCreate(body, token) {
		return fetch(`http://127.0.0.1:8000/api/problem/`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
	static ViewProblem(token) {
		return fetch(`http://127.0.0.1:8000/api/problem/`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		});
	}

	static SearchDateBill(year, month, date, token) {
		return fetch(
			`http://127.0.0.1:8000/api/payment/?start_date=${year}-${
				month - 1
			}-26&end_date=${year}-${month}-25`,
			{
				method: "GET",
				headers: {
					"content-Type": "application/json",
					Authorization: `Token ${token}`,
				},
			}
		);
	}
	static SearchDateTS(year, month_st, month_ed, date, token) {
		return fetch(
			`http://127.0.0.1:8000/api/transition/?start_date=${year}-${month_st}-1&end_date=${year}-${month_ed}-${date}`,
			{
				method: "GET",
				headers: {
					"content-Type": "application/json",
					Authorization: `Token ${token}`,
				},
			}
		);
	}
	static UpdateSVStatus(room_id, token) {
		return fetch(
			`http://127.0.0.1:8000/api/room/${room_id}/updateservicestatus/`,
			{
				method: "POST",
				headers: {
					"content-Type": "application/json",
					Authorization: `Token ${token}`,
				},
			}
		).then((resp) => resp.json());
	}
	static UpdateTotalFirst(room_id, token) {
		return fetch(`http://127.0.0.1:8000/api/room/${room_id}/updatetoatal/`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		}).then((resp) => resp.json());
	}
	static UpdateRoomStatusMoveout(room_id, token) {
		return fetch(
			`http://127.0.0.1:8000/api/room/${room_id}/updateroomstatus/`,
			{
				method: "POST",
				headers: {
					"content-Type": "application/json",
					Authorization: `Token ${token}`,
				},
			}
		).then((resp) => resp.json());
	}
	static searchPriceRoom(price_id, token) {
		return fetch(`http://127.0.0.1:8000/api/price/?price_id=${price_id}`, {
			method: "GET",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
		});
	}
	static searchPaymentRecipt(room_id, token) {
		return fetch(
			`http://127.0.0.1:8000/api/servicecharge/?room_id=${room_id}&status=1`,
			{
				method: "GET",
				headers: {
					"content-Type": "application/json",
					Authorization: `Token ${token}`,
				},
			}
		);
	}
	static loginUser(body, token) {
		return fetch(`http://127.0.0.1:8000/auth/`, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
	}
}
