export class Appliances {
    constructor(data, request) {

        this._data = data;
        this._request = request;
        this._arr = [];
        this._arrId = [];
    }
    set data(data) {
        this._data = data;
    }
    get data() {
        return this._data
    }
    set request(request) {
        this.request = request;
    }
    get request() {
        return this._request
    }
    get arr() { return this._arr }

    get getArrayId() {
        return this._arrId;
    }
    get getFilter() {
        return this.filter();
    }

    get appliances() {
        return this.appliancesMethod()
    }

    //*******************Methods */

    appliancesMethod() {


        return [...new Set(this._data)].map(recipe => {


            return recipe.appliance
        })
    }
    filter() {

        return this._data.map(e => {


            const recipeId = e.id;
            if (e.appliance.toLowerCase() === this._request.toLowerCase()) {
                console.log('e:', e)
                this._arrId.push(recipeId);
                return this._arrId;
            }

        });
    }
}