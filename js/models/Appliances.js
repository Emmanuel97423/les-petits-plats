export class Appliances {
    contructor(data, request) {
        this._data = data;
        this._request = request;
    }
    set data(data) {
        this._data = data;
    }
    get data() {
        return this._data
    }
    set request(request) {
        this.request = request; data;
    }
    get request() {
        return this._request
    }
}