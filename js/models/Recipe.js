export class Recipe {
    constructor(data, request) {
        this._data = data;
        this._id = data.id;
        this._name = data.name;
        this._servings = data.servings;
        this._ingredients = data.ingredients;
        this._time = data.time;
        this._description = data.description;
        this._appliance = data.appliance;
        this._ustensils = data.ustensils;
        this._request = request

    }
    get ingredient() {
        return this._ingredients.ingredient ? this._ingredients.engredient : null;
    }
    get quantity() {
        return this._ingredients.quantity ? this._ingredients.quantity : null;
    }
    get unit() {
        return this._ingredients.unit ? this._ingredients.unit : null;
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
        return this.filterRecipeMethod()
    }

    set request(request) {
        this._request = request;
    }

    get request() {
        return this._request
    }

    // //Methods
    // //Filter 
    filterRecipeMethod() {

        const result = this._data.filter(el => {

            return el.name.toLowerCase().indexOf(this._request.toLowerCase()) !== -1
        });

        return result

    }
}


// return el.name.toLowerCase().indexOf(this._request.toLowerCase()) !== -1