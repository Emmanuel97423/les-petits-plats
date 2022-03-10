export class Appliances {
    constructor(data, request) {
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

    get appliances() {
        return this.aplliancesMethod()
    }

    //*******************Methods */

    aplliancesMethod() {
        console.log('Appliances method')

        return this._data.map(recipe => {
            // console.log('appliance:', recipe.appliance);
            return recipe.appliance
        })
    }
}