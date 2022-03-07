//Classes
import { RecipeCard, ingredientsDropdown, Tags } from './view/View.js'
import { RecipeApi } from "./api/Api.js"
import { RecipesFactory } from "./factories/RecipesFactory.js"

// Data
import data from '../../data/recipes.js';

//Application
class App {
    constructor() {
        //Ui

        //DOM elements
        this._$mainDOM = document.getElementById('main');
        this._$searchInput = document.querySelector('.search__input');
        this._$searchInputGlobal = document.getElementById('search__global');
        this._$arrowDown = document.querySelector('.fa-chevron-down');
        this._$arrowUp = document.querySelector('.fa-chevron-up');
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
        this._$tagDOM = document.querySelector('.tags');
        this._tagsSelected = [];
        //btn green
        this._btnAppliance = document.querySelector('.filter__btn--green');
        // console.log('this._btnAppliance:', this._btnAppliance.childNodes[1].childNodes[3]);

        //Arrays datas
        this._arrRecipeByIng = [];
        this._selectedRecipes = [];

    };
    //Getters
    get getDropdownShow() {
        return this.dropDownShow();
    };
    get getRecipesData() {
        return this.recipesData();
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
        //Filter Recipes global search input
        this._$searchInput.addEventListener('input', async (e) => {
            e.preventDefault();
            this._arrRecipeByIng = [];
            this._selectedRecipes = [];
            if (e.target.value.length > 2) {

                this._$mainDOM.innerHTML = '';
                const recipesInputData = await this._recipesApi.get();
                const result = new RecipesFactory(recipesInputData, 'global', e.target.value);

                if (result.filter) {
                    //Filter By title
                    result.filter.map(recipe => {
                        this._selectedRecipes.push(recipe);
                        const templateInput = new RecipeCard(recipe);
                        this._$mainDOM.appendChild(templateInput.ui());

                    });

                };
                if (result.filter.length === 0) {
                    console.log(' Aucune recette')
                    this._$mainDOM.innerHTML = `<h4>« Aucune recette ne correspond à votre critère… vous pouvez
chercher « tarte aux pommes », « poisson ».</h4>`;
                };

            }
        });

        // Tags section
        // this._$searchInputIngredient.addEventListener('input', (e) => {
        //     e.preventDefault();
        //     this._$dropdownList.innerHTML = `<li>${e.target.value}</li>`;
        //     this._$mainDOM.style.marginTop = "50px";
        // })
        //Filter Ingredients button
        this._$searchInputIngredient.addEventListener('input', (e) => {

            e.preventDefault();
            let arrItemSelected = [];
            if (this._selectedRecipes.length > 0) {

                console.log('hello tableau non vide')
                //Filter ingredients
                const ingredients = new RecipesFactory(this._selectedRecipes, 'ingredients');
                // this._arrRecipeByIng = [];
                ingredients.getListIngredients.filter(n => {

                    if (n.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
                        arrItemSelected.push(n);
                        this._$dropdownList.innerHTML = '';
                        this._$mainDOM.style.marginTop = "50px";
                        [...new Set(arrItemSelected)].map(item => {

                            const templateIng = new ingredientsDropdown(item);
                            this._$dropdownList.appendChild(templateIng.ui());
                        });
                    };
                });
                console.log('this._selectedRecipes:', this._selectedRecipes)
                this.listingSearchDropdown(this._selectedRecipes, 'ingredients');
            } else if (e.target.value && this._selectedRecipes.length === 0) {
                console.log('hello tableau vide')
                const ingredientsArrNull = new RecipesFactory(recipesData, 'ingredients');
                // this._arrRecipeByIng = [];
                ingredientsArrNull.getListIngredients.filter(n => {
                    if (n.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
                        arrItemSelected.push(n);
                        this._$dropdownList.innerHTML = '';
                        this._$mainDOM.style.marginTop = "50px";
                        [...new Set(arrItemSelected)].map(item => {

                            const templateIng = new ingredientsDropdown(item);
                            this._$dropdownList.appendChild(templateIng.ui());
                        });
                    };
                    this.listingSearchDropdown(recipesData, 'ingredients');
                });
            } else if (!e.target.value) {
                // this.dropdownShow();
                console.log('liste vide')
                this._$dropdownList.innerHTML = '';
                // //Filter ingredients
                // const ingredients = new RecipesFactory([...new Set(arrItemSelected)], 'ingredients');
                // // console.log('this._arrRecipeByIng:', this._arrRecipeByIng)
                // ingredients.getListIngredients.map(i => {
                //     const templateIng = new ingredientsDropdown(i);
                //     this._$dropdownList.appendChild(templateIng.ui());
                // })
            };
        });
        // const $chevronDown = this._$filterBtnBlue.childNodes[3];
        //Click into filter section ingredients
        this._$searchInputIngredient.addEventListener('click', (e) => {
            e.preventDefault();
            this.dropdownShow();
            //Filter ingredients
            if (this._selectedRecipes.length > 0) {
                console.log('Tableau de recette non vide')
                //Map recipes for export ingredients 
                const i = new RecipesFactory(this._selectedRecipes, 'ingredients');
                [...new Set(i.getListIngredients)].map((ingred) => {
                    const templateIng = new ingredientsDropdown(ingred);
                    this._$dropdownList.appendChild(templateIng.ui());
                })
                this.listingSearchDropdown(this._selectedRecipes, 'ingredients');

            } else if (this._selectedRecipes.length === 0) {
                console.log('Tableau de recette vide')
                const n = new RecipesFactory(recipesData, 'ingredients');
                [...new Set(n.getListIngredients)].map(i => {


                    const templateIng = new ingredientsDropdown(i);
                    this._$dropdownList.appendChild(templateIng.ui());
                });
                this.listingSearchDropdown(recipesData, 'ingredients');
            };
        });
        //show dropdown with arrow buttons
        this._$arrowDown.addEventListener('click', (e) => {
            e.preventDefault();
            this.dropdownShow();

            console.log('this._selectedRecipe:', this._selectedRecipes)
            if (this._selectedRecipes.length === 0) {

                this._$mainDOM.style.marginTop = "-1176px"
                const ingredients = new RecipesFactory(recipesData, 'ingredients');
                ingredients.getListIngredients.map(i => {
                    const templateIng = new ingredientsDropdown(i);
                    this._$dropdownList.appendChild(templateIng.ui());
                });
                this.listingSearchDropdown(recipesData, 'ingredients');
            } else if (this._selectedRecipes.length > 0) {

                this._$mainDOM.style.marginTop = "-300px"
                const ingredients = new RecipesFactory(this._selectedRecipes, 'ingredients');

                ingredients.getListIngredients.map(i => {
                    // console.log('i:', i)
                    const templateIng = new ingredientsDropdown(i);
                    this._$dropdownList.appendChild(templateIng.ui());
                });
                this.listingSearchDropdown(this._selectedRecipes, 'ingredients');
            }

        })
        //Click arrow up to close filter section
        this._$arrowUp.addEventListener('click', (e) => {
            e.preventDefault();
            this.dropdownHide();
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
    //methods
    //DropDown show
    dropdownShow() {
        this._$dropdownList.innerHTML = '';
        this._$dropdown.style.display = 'flex';
        this._$filterSection.style.width = '40%';
        this._$filterBtnBlue.style.width = '100%'
        this._$filterBtnBlue.style.justifyContent = 'space-between';
        this._$arrowDown.style.display = 'none';
        this._$arrowUp.style.display = 'flex';
        this._$searchInput.placeholder = 'Recherche un ingrédient';
        this._$searchInput.style.opacity = '50%'
        // this._$mainDOM.style.marginTop = "-300px"

    };
    //dropdown hide button
    dropdownHide() {
        this._$dropdownList.innerHTML = '';
        this._$dropdown.style.display = 'none';
        this._$arrowDown.style.display = 'flex';
        this._$arrowUp.style.display = 'none'
        this._$filterSection.style.width = '12%';
        this._$searchInput.placeholder = 'Ingrédient';
        this._$searchInputGlobal.placeholder = 'Recherche un ingrédient';
        this._$searchInput.style.opacity = '100%';
        this._$mainDOM.style.marginTop = "50px";
    };
    //listing search
    listingSearchDropdown(data, section) {
        console.log('section:', section)

        this._$dropdownList.childNodes.forEach(i => {

            i.addEventListener('click', (e) => {
                console.log('e:', e)

                e.preventDefault();
                this._$mainDOM.innerHTML = null;
                console.log('this._$mainDOM.innerHTML:', this._$mainDOM.innerHTML)// console.log('e.target:', e.target.innerText)
                const filterIngredientsDropdown = new RecipesFactory(data, section, e.target.innerText)

                filterIngredientsDropdown.filter.map(i => {
                    data.filter(recipe => {
                        let arr = [];
                        if (recipe.id === i) {
                            arr.push(recipe);
                            arr.map(n => {
                                const templateIngredientsResult = new RecipeCard(n);
                                this._$mainDOM.appendChild(templateIngredientsResult.ui());
                            });
                        };
                    });
                })
            })
        })
    };
    async recipesData() {
        const recipesData = await this._recipesApi.get();
        return recipesData;
    };
};
const app = new App();
app.main();







