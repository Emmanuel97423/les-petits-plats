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
        return this.filter();
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
    filter() {



        return this._data.filter((el) => {


            if (el.name.toLowerCase().indexOf(this._request.toLowerCase()) !== -1 || el.description.toLowerCase().indexOf(this._request.toLowerCase()) !== -1) {

                return el
            }
            // else if (el.description.toLowerCase().indexOf(this._request.toLowerCase()) !== -1) {
            //     arr.push(el)

            // }




            // if (el.name) {
            //     return el.name.toLowerCase().indexOf(this._request.toLowerCase()) !== -1;
            // } else if (el.description) {
            //     console.log('el.description:', el.description)
            //     return el.description.toLowerCase().indexOf(this._request.toLowerCase()) !== -1
            // }

        })


        // let arr = [];

        // return this._data.map(recipe => {
        //     // console.log('recipe:', recipe)

        //     return recipe.filter((el) => {
        //         return el.toLowerCase().indexOf(this_request.toLowerCase()) !== -1
        //     })

        // if (recipe.name.toLowerCase().indexOf(this._request.toLowerCase()) !== -1) {
        //     this._array.push(recipe);
        // } else if (recipe.description.toLowerCase().indexOf(this._request.toLowerCase()) !== -1) {
        //     this._array.push(recipe);
        // }
        // console.log('arr:', [...new Set(arr)])
        // console.log('this._array:', this._array)
        // return this._array;







    }


}
