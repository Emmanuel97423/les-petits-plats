

// const recipes = './db/recipes.js'

export class RecipeModel {
    constructor(obj, request) {

        this._obj = obj
        this._request = request
    }
    get obj() {
        return this._obj
    }

    set obj(newRecipe) {
        this._obj = newRecipe

    }

    data() {
        try {
            const result = this._obj.map(n => {
                return n
            })
            return result
        } catch (error) {
            console.error(error);
        }
    }
    async dataFilter() {
        const filterResult = this._obj.filter((el) => {
            // console.log('el:', el.name)
            return el.name.toLowerCase().indexOf(this._request.toLowerCase()) !== -1
        })
        // console.log('filterResult:', filterResult)
        return filterResult

    }

}

// class Ingredient {
//     // constructor(recipes) {
//     //     this._recipes = recipes;
//     // }

//     async getData() {
//         try {
//             const result = recipes.map(recipe => {

//                 // console.log('recipe:', recipe.ingredients)
//                 return recipe.ingredients

//             })

//             return result

//         } catch (error) {
//             console.error(error);

//         }
//         // try {
//         //     //Fetch dataB
//         //     let result = await fetch(recipes, {
//         //         method: 'GET',
//         //         headers: {
//         //             "Content-Type": "application/json",
//         //         }
//         //     })
//         //     let dataRecipes = await result.json();
//         //     console.log('dataRecipes:', dataRecipes)
//         // } catch (err) {
//         //     console.error(err)
//         // }
//     }

// }
// class Appareil {

// }
// class Ustensiles {

// }

// class Factory {
//     fetchData() {
//         const factoryData = this.makeData();
//         return factoryData.getData()

//     }
// }

// export class ManageIngredient extends Factory {
//     makeData() {
//         return new Ingredient
//     }
// }

// export class ManageRecipe extends Factory {
//     makeData() {
//         return new Recipe
//     }
// }