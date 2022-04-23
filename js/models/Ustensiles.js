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
        return this.ustensilesMethod()
    }

    //*******************Methods */

    ustensiles() {

        this._data.map(ustensilesArray => {
            console.log('ustensilesArray:', ustensilesArray)
            const ustensiles = ustensilesArray.ustensils;
            // ustensiles.map(item => {

            //     const ustensile = item.ustensil;

            //     if (this._arr.indexOf(ingredient.toLowerCase()) >= 1) {
            //         return false;
            //     } else {
            //         this._arr.push(ingredient.toLowerCase());
            //     }

            // })

        })
        return this._arr;
    }
    filter() {

        let ustensilesArray = [];
        this._data.map(e => {
            e.ustensils.map(ustensile => {

                ustensilesArray.push(ustensile)
            });
        });
        return ustensilesArray
    }
}