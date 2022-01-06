export class Ingredients {
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
    get arr() { return this._arr; }

    get getFilter() {
        return this.filter();
    }

    get getArrayId() {
        return this._arrId;
    }
    //List ingredients method
    ingredients() {

        // console.log(this._data.length)
        this._data.map(n => {
            const ingredients = n.ingredients;

            ingredients.map(i => {

                const ingredient = i.ingredient;

                if (this._arr.indexOf(ingredient.toLowerCase()) >= 1) {
                    return false;
                } else {
                    this._arr.push(ingredient.toLowerCase());
                }

            })

        })
        // console.log('arr:', this._arr);
        return this._arr;
    }


    // Filter
    filter() {


        return this._data.map(e => {

            const recipeId = e.id


            return e.ingredients.filter(i => {

                // return i.ingredient.toLowerCase().indexOf(this._request.toLowerCase()) !== -1;

                if (i.ingredient.toLowerCase().indexOf(this._request.toLowerCase()) !== -1) {
                    console.log('i.ingredient:', i.ingredient)
                    // console.log('this._request:', this._request)

                    this._arrId.push(recipeId)

                    return this._arrId;



                }


            })


        })



        // const result = this._data.filter(e => {

        //     e.ingredients.map(i => {
        //         console.log('i:', i)

        //     })

        //     e.ingredient === 'coco'
        // })
        // console.log('result:', result)
        // return this._data.map(n => {
        //     console.log('n:', n.ingredients)

        // })
    }

}