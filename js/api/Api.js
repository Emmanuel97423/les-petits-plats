

class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {


        this._url = url
    }
    async get() {
        return this._url
    }
    // async get() {
    //     return fetch(this._url, {
    //     })
    //         .then(res => res.json())
    //         .then(res => res.data)
    //         .catch(err => console.log('an error occurs', err))
    // }
}


export class RecipeApi extends Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url)
    }

    async getRecipe() {
        return await this.get()
    }
}