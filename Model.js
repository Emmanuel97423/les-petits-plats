import recipes from "./db/recipes.js"

// const recipes = './db/recipes.js'

class Recipe {
    constructor( )
    async getData() {
        try {
            const result = recipes.map(recipe => {
                // console.log('recipe:', recipe.ingredients)
                return recipe
            })
            return result
        } catch (error) {
            console.error(error);
        }
    }
}

class Ingredient {
    // constructor(recipes) {
    //     this._recipes = recipes;
    // }

    async getData() {
        try {
            const result = recipes.map(recipe => {

                // console.log('recipe:', recipe.ingredients)
                return recipe.ingredients

            })

            return result

        } catch (error) {
            console.error(error);

        }
        // try {
        //     //Fetch dataB
        //     let result = await fetch(recipes, {
        //         method: 'GET',
        //         headers: {
        //             "Content-Type": "application/json",
        //         }
        //     })
        //     let dataRecipes = await result.json();
        //     console.log('dataRecipes:', dataRecipes)
        // } catch (err) {
        //     console.error(err)
        // }
    }

}
class Appareil {

}
class Ustensiles {

}

class Factory {
    fetchData() {
        const factoryData = this.makeData();
        return factoryData.getData()

    }
}

export class ManageIngredient extends Factory {
    makeData() {
        return new Ingredient
    }
}

export class ManageRecipe extends Factory {
    makeData() {
        return new Recipe
    }
}