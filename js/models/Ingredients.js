export class Ingredients {
    constructor(data, request) {
        this._data = data;
        this._request = request;
    }
    set data(data) {
        this._data = data;
    }
    get data() {
        return this._data;
    }

    set request(request) {
        this._request = request;
    }
    get request() {
        return this._request;
    }

    get getIngredients() {
        return this.ingredients();
    }

    ingredients() {
        return this._data.map(n => {
            const ingredients = n.ingredients;

            return ingredients.map(i => {
                const listItem = i.ingredient;

                return listItem;
            })
            // return ingredients
        })
    }

}