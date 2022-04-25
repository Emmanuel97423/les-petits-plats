export class Ustensiles {
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

    get getUstensiles() {
        return this.ustensiles()
    }

    //*******************Methods */

    ustensiles() {

        this._data.map(ustensilesArray => {

            const ustensiles = ustensilesArray.ustensils;
            ustensiles.map(item => {


                if (this._arr.indexOf(item.toLowerCase()) >= 1) {
                    return false;
                } else {
                    this._arr.push(item.toLowerCase());
                }

            })

        })

        return this._arr;

    }
    filter() {

        return this._data.filter(recipe => {

            const recipeId = recipe.id;
            recipe.ustensils.map(ustensile => {
                if (ustensile.toLowerCase() === this._request.toLowerCase()) {
                    this._arrId.push(recipeId);
                    return this._arrId;
                }

            })


        });
    }
}