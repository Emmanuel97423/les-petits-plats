export class Recipe {
    constructor(data, request) {
        this._data = data;
        this._request = request;
    }
    get recipes() {
        return this._data;
    }
    get data() {
        return this._data;
    }
    set data(data) {
        this._data = data;
    }
    get getFilterRecipes() {
        return this.filter();
    }
    set request(request) {
        this._request = request;
    }
    get request() {
        return this._request;
    }
    // Methods
    // Filter
    filter() {
        let arr = [];
        for (let i = 0; i < this._data.length; i++) {
            if (this._data[i].name.toLowerCase().indexOf(this._request.toLowerCase()) !== -1) {
                arr.push(this._data[i]);
            } else if (this._data[i].description.toLowerCase().indexOf(this._request.toLowerCase()) !== -1) {
                arr.push(this._data[i]);
            } else if (this._data[i].ingredients) {
                for (let n = 0; n < this._data[i].ingredients.length; n++) {
                    if (this._data[i].ingredients[n].ingredient.toLowerCase().indexOf(this._request.toLowerCase()) !== -1) {
                        arr.push(this._data[i]);
                    };
                };
            };
        };
        return [...new Set(arr)];
    }
}
