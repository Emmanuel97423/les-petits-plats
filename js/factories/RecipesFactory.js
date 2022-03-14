import { Recipe } from '../models/recipe.js';
import { Ingredients } from '../models/ingredients.js';
import { Appliances } from '../models/Appliances.js';


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

    //**************************Getter Data filter 

    get filter() {

        if (this._input === 'global' && this._request) {
            return this.filterRecipe();
        }
        // else if (this._input === 'RecipesByDescription') {
        //     return this.filterRecipeByDescription();
        // }
        else if (this._input === 'ingredients' && this._request) {
            return this.filterIngredients();
        } else if (this._input === 'appliances') {
            return
            return this.filterAppliances();
        }
    };

    //****************************************Getter listing ingredients

    get tagsList() {
        if (this._input === 'ingredients') {
            return this.tagListIngredients();
        } else if (this._input === 'appliances') {
            return this.tagListAppliances();
        }
    };

    //*****************************************Filter Recipes Method

    filterRecipe() {
        //Call Recipe Classe
        const recipe = new Recipe(this._data, this._request);

        return recipe.getFilterRecipes;



    };


    //***************************************Filter Ingredients method

    filterIngredients() {
        //Call ingredients Classe
        const ingredient = new Ingredients(this._data, this._request);
        ingredient.getFilter;
        // ingredient.getArrayId;
        return ingredient.getArrayId
    };

    //***************************************listing all ingrédients method

    tagListIngredients() {
        const listIngredient = new Ingredients(this._data, this._request);
        return listIngredient.getIngredients;
    }
    //Filter by aplliance
    tagListAppliances() {
        const listAppliance = new Appliances(this._data);
        return listAppliance.appliances

    }

};
