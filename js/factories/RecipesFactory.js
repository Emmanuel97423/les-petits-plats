import { Recipe } from '../models/recipe.js'
import { Ingredients } from '../models/ingredients.js'


export class RecipesFactory {
    constructor(data, input, request) {
        this._data = data;
        this._request = request;
        this._input = input;
    }
    set data(data) { this._data = data };
    get data() { return this._data };

    set request(request) { this._request = request };
    get request() { return this._request };

    set input(input) { this._input = input };
    get input() { return this._input };

    //Data filter
    get filter() {
        if (this._input === 'global' || this._request) {
            return this.filterRecipe();
        } else if (this._input === 'ingredients') {
            return this.filterIngredients();
        };
    };
    //Filter Method
    filterRecipe() {
        //Call Recipe Classe
        const recipe = new Recipe(this._data, this._request);
        const result = recipe.getFilterRecipes;
        return result;
    };

    filterIngredients() {
        //Call ingredients Classe
        const ingredient = new Ingredients(this._data, this._request);
        const resultIngredients = ingredient.getIngredients;
        // console.log('resultIngredients:', resultIngredients)
        return resultIngredients

    };
};
