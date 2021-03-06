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
    get getFilterByTag() {
        return this.filterByTag();
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
        let recipeArr = [];

        this._data.filter((el) => {


            if (el.name.toLowerCase().indexOf(this._request.toLowerCase()) !== -1 || el.description.toLowerCase().indexOf(this._request.toLowerCase()) !== -1) {
                recipeArr.push(el);


            }
            else if (el.ingredients.length > 0) {


                el.ingredients.filter(ingr => {


                    if (ingr.ingredient.toLowerCase().indexOf(this._request.toLowerCase()) !== -1) {

                        recipeArr.push(el)


                    }

                })
            }




        });

        return recipeArr;


    }
    filterByTag() {
        console.log('hello filter by tag')
        return this._data.filter((el) => {
            console.log('el:', el)
            if (el.name.toLowerCase().indexOf(this._request.toLowerCase()) !== -1 || el.description.toLowerCase().indexOf(this._request.toLowerCase()) !== -1) {
                return el
            }


        })
    }


}
