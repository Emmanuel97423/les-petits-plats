

import { RecipeCard } from './template/RecipeCard.js'

import { RecipeApi } from "./api/Api.js"
import { RecipesFactory } from "./factories/RecipesFactory.js"

// const recipesJSON = '../data/recipes.json'
import data from '../../data/recipes.js'


class App {
    constructor() {
        //DOM elements
        this._$mainDOM = document.getElementById('main');
        this._$searchInput = document.querySelector('.search__input');
        this._$searchInputGlobal = document.getElementById('search__global')
        this._$arrowDown = document.querySelector('.fa-chevron-down');
        this._$arrowUp = document.querySelector('.fa-chevron-up')
        this._$dropdown = document.querySelector('.dropdown');
        this._$filterSection = document.querySelector('.filter__btn--blue');
        this._$filterBtn = document.querySelector('.filter__btn--blue button:nth-child(1)');
        this._$recipeCard = document.querySelectorAll('.card');
        //Data
        this._recipesApi = new RecipeApi(data);
    };

    async main() {

        //Call api
        const recipesData = await this._recipesApi.get();

        recipesData.map(recipe => {
            new RecipesFactory(recipe, 'global')
            const template = new RecipeCard(recipe)
            template.ui()
            // this._$mainDOM.innerHTML = template
            this._$mainDOM.appendChild(template.ui())
        });

        // //Filter Recipes
        this._$searchInput.addEventListener('input', async (e) => {
            e.preventDefault()
            this._$mainDOM.innerHTML = '';

            const recipesInputData = await this._recipesApi.get()
            const result = new RecipesFactory(recipesInputData, 'global', e.target.value)
            result.filter.map(recipe => {
                const templateInput = new RecipeCard(recipe)
                this._$mainDOM.appendChild(templateInput.ui())
                // this._$mainDOM.innerHTML = templateInput.getUi
            });
        });

        //Click arrow down to open filter section
        this._$arrowDown.addEventListener('click', (e) => {

            e.preventDefault();
            this._$dropdown.style.display = 'flex';
            this._$filterSection.style.width = '40%';
            this._$filterBtn.style.width = '100%'
            this._$filterBtn.style.justifyContent = 'space-between';
            this._$arrowDown.style.display = 'none';
            this._$arrowUp.style.display = 'flex';
            this._$searchInput.placeholder = 'Recherche un ingrédient';
            this._$searchInput.style.opacity = '50%'
            this._$mainDOM.style.marginTop = "-300px"



        });
        //Click arrow up to close filter section
        this._$arrowUp.addEventListener('click', (e) => {
            e.preventDefault();
            this._$dropdown.style.display = 'none';
            this._$arrowDown.style.display = 'flex';
            this._$arrowUp.style.display = 'none'
            this._$filterSection.style.width = '12%';
            this._$searchInput.placeholder = 'Ingrédient';
            this._$searchInputGlobal.placeholder = 'Recherche un ingrédient'
            this._$searchInput.style.opacity = '100%';
            this._$mainDOM.style.marginTop = "50px"

        });
        //CSS varations
        this._$searchInput.addEventListener('focus', (e) => {
            e.preventDefault();
            this._$searchInput.style.opacity = '100%'
        });
        this._$searchInput.addEventListener('blur', (e) => {
            e.preventDefault();
            this._$searchInput.style.opacity = '50%'
            this._$searchInput.placeholder = 'Recherche un ingrédient';

        });

    }

}

const app = new App();
app.main();

// //Fetch all Recipes
// const recette = new RecipeModel(recipes);
// recette.data();
// // console.log(recette.obj)
// //View
// const view = new RecipesView(recette.obj, mainDOM);
// view.ui();


// //Filter Recipes
// searchInput.addEventListener('input', (e) => {
//     e.preventDefault()

//     const filterRecipe = new RecipeModel(recipes, e.target.value)
//     filterRecipe.dataFilter().then((result) => {

//         const filterView = new RecipesView(result, mainDOM)
//         filterView.ui()

//     })

// })

// //Ingredient
// const ing = new Ingredient(recipes)
// ing.data().then((result) => {
//     console.log(result)
// })






