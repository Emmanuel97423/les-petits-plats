//Classes
import { RecipeCard, ingredientsDropdown, Tags } from './view/View.js'
import { RecipeApi } from "./api/Api.js"
import { RecipesFactory } from "./factories/RecipesFactory.js"

// Data
import data from '../../data/recipes.js'

//Application
class App {
    constructor() {
        //DOM elements
        this._$mainDOM = document.getElementById('main');
        this._$searchInput = document.querySelector('.search__input');
        this._$searchInputGlobal = document.getElementById('search__global')
        this._$arrowDown = document.querySelector('.fa-chevron-down');
        this._$arrowUp = document.querySelector('.fa-chevron-up')
        this._$dropdown = document.querySelector('.dropdown');
        this._$dropdownList = document.querySelector('.dropdown__tag--links');
        this._$filterSection = document.querySelector('.filter__btn--blue');
        this._$filterBtnBlue = document.querySelector('.filter__btn--blue button:nth-child(1)');
        this._$recipeCard = document.querySelectorAll('.card');
        //Data
        this._recipesApi = new RecipeApi(data);
        //Input Button
        this._$searchInputIngredient = document.getElementById('input__ingredient');
        //Tags
        this._$tagSelect = document.querySelector('.tags');


    };

    async main() {
        //Call api
        const recipesData = await this._recipesApi.get();
        //Ui all Recipes
        recipesData.map(recipe => {
            new RecipesFactory(recipe, 'global');
            const template = new RecipeCard(recipe);
            template.ui();
            this._$mainDOM.appendChild(template.ui());
        });
        //Filter Recipes
        this._$searchInput.addEventListener('input', async (e) => {
            e.preventDefault();
            this._$mainDOM.innerHTML = '';
            const recipesInputData = await this._recipesApi.get();
            const result = new RecipesFactory(recipesInputData, 'global', e.target.value);
            if (result.filter) {
                result.filter.map(recipe => {

                    const templateInput = new RecipeCard(recipe)
                    this._$mainDOM.appendChild(templateInput.ui())

                });
            }
        });

        // Tags section
        this._$searchInputIngredient.addEventListener('input', (e) => {
            e.preventDefault();
            console.log('value', e.target.value);
            this._$dropdownList.innerHTML = `<li>${e.target.value}</li>`;
            this._$mainDOM.style.marginTop = "50px";

        })
        //Filter Ingredients
        this._$searchInputIngredient.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const tag = new Tags(e.target.value);
                this._$tagSelect.innerHTML = '';
                this._$tagSelect.appendChild(tag.getUi);
                const filterIngredients = new RecipesFactory(recipesData, "ingrédients", e.target.value)
                let arrRecipe = [];
                const resultIng = filterIngredients.filter.map(i => {


                    return recipesData.filter(recipe => {

                        if (recipe.id === i) {
                            // console.log('recipe:', recipe)
                            arrRecipe.push(recipe)
                            console.log('arrRecipe:', arrRecipe)
                            this._$mainDOM.innerHTML = "";
                            arrRecipe.map(n => {
                                const templateIngredientsResult = new RecipeCard(n);
                                this._$mainDOM.appendChild(templateIngredientsResult.ui())
                            })

                        }


                    })
                });
                // console.log('resultIng:', resultIng)
                return resultIng



                // .map(ingredient => {
                //     const templateFilterIngredients = new RecipeCard(ingredient);
                //     this._$mainDOM.innerHTML = '';
                //     this._$mainDOM.appendChild(templateFilterIngredients.getUi)
                // })

            }
        })
        const $chevronDown = this._$filterBtnBlue.childNodes[3];
        //Click arrow down to open filter section
        $chevronDown.addEventListener('click', (e) => {
            e.preventDefault();
            //CSS Manipulation
            this._$dropdown.style.display = 'flex';
            this._$filterSection.style.width = '40%';
            this._$filterBtnBlue.style.width = '100%'
            this._$filterBtnBlue.style.justifyContent = 'space-between';
            this._$arrowDown.style.display = 'none';
            this._$arrowUp.style.display = 'flex';
            this._$searchInput.placeholder = 'Recherche un ingrédient';
            this._$searchInput.style.opacity = '50%'
            this._$mainDOM.style.marginTop = "-300px"

            //Filter ingredients

            const ingredients = new RecipesFactory(recipesData, 'ingredients');
            const ingFilter = ingredients.filter;
            ingFilter.map(i => {
                const templateIng = new ingredientsDropdown(i);
                this._$dropdownList.appendChild(templateIng.ui());
            });

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

    };

};

const app = new App();
app.main();







