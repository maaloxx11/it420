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
}
