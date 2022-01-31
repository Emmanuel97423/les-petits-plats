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
        this._request = request;
        this._arr = [];
        this._arrId = [];

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
        return this.filterRecipeMethodByTitle();
    }
    get getFilterRecipesByDescription() {
        return this.filterRecipeMethodByDescription()
    }

    set request(request) {
        this._request = request;
    }

    get request() {
        return this._request;
    }

    // Methods
    // Filter By title
    filterRecipeMethodByTitle() {

        const result = this._data.filter(el => {
            const recipeId = el.id;
            // return el.name.toLowerCase() === this._request.toLowerCase();
            return el.name.toLowerCase().indexOf(this._request.toLowerCase()) !== -1;

            // if (el.name.toLowerCase() === this._request.toLowerCase()) {
            //     this._arrId.push(recipeId);
            //     console.log('recipeId:', recipeId)
            //     console.log('this._arrId:', this._arrId)
            //     return this._arrId;
            // }

            // if (el.name) {
            //     // return el.name.toLowerCase() === this._request.toLowerCase()
            //     // return el.name.toLowerCase().indexOf(this._request.toLowerCase()) !== -1;

            //     if (el.name.toLowerCase() == this._request.toLowerCase()) {
            //         this._arrId.push(recipeId);
            //         console.log('recipeId:', recipeId)
            //         console.log('this._arrId:', this._arrId)
            //         return this._arrId;
            //     }
            // }


        });

        return result;

    }

    // Filter by description
    filterRecipeMethodByDescription() {
        return this._data.filter(el => {
            if (el.description) {

                // return el.description.toLowerCase() === this._request.toLowerCase()

                return el.description.toLowerCase().indexOf(this._request.toLowerCase()) !== -1;
            }
        })

    }
}
