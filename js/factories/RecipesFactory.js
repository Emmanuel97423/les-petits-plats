import { Recipe } from '../models/recipe.js'


export class RecipesFactory {
    constructor(data, input, request) {
        // console.log('data:', data)
        this._data = data;
        this._request = request;
        this._input = input;



    }
    set data(data) {
        this._data = data;
    }
    get data() { return this._data; }

    set request(request) {
        this._request = request;
    }
    get request() { return this._request; }

    set input(input) {
        this._input = input;
    }
    get input() { return this._input; }

    get filter() {
        if (this._input === 'global' || this._request) {
            // if (this._request) {
            return this.filterRecipe()
            // }
            // return new Recipe(this._data)
        } else {
            return false
        }
        // return this.filterRecipe()
    }


    filterRecipe() {
        // console.log('this._data:', this._data)
        // console.log('filterRecipe')
        const recipe = new Recipe(this._data, this._request)
        const result = recipe.getFilterRecipes


        // console.log('recipeFilter:', recipeFilter)
        return result;
    }
}


// export class RecipesFactory {
//     constructor(data, type) {
//         // Si le type correspond à l'ancienne API, alors retourne moi l'ancien formattage
//         if (type === 'oldApi') {
//             return new OldMovie(data)
//             // Sinon retourne moi le nouveau formattage
//         } else if (type === 'newApi') {
//             return new Movie(data)
//             // Une bonne pratique est de throw une erreur si le format n'est pas reconnu
//         } else if (type === 'externalApi') {
//             return new ExternalMovie(data)
//         } else {
//             throw 'Unknown type format'
//         }
//     }
// }