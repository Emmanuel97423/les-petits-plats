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

            if (e.target.value.length > 2) {

                const recipesInputData = await this._recipesApi.get();
                const result = new RecipesFactory(recipesInputData, 'global', e.target.value);
                const recipeByDesc = new RecipesFactory(recipesData, 'RecipesByDescription', e.target.value);
                let arrRecipeByIng = [];

                if (result.filter && recipeByDesc.filter) {


                    this._arrRecipeByIng = [];

                    //Filter By title
                    [...new Set(result.filter)].map(recipe => {
                        this._$mainDOM.innerHTML = '';

                        const templateInput = new RecipeCard(recipe);
                        this._$mainDOM.appendChild(templateInput.ui());
                    });
                    //Filter By description
                    [...new Set(recipeByDesc.filter)].map(recipe => {
                        console.log('recipe:', recipe)
                        // this._$mainDOM.innerHTML = '';

                        arrRecipeByIng.push(recipe);
                        this._arrRecipeByIng.push(recipe);
                        // console.log('this._arrRecipeByIng:', [...new Set(this._arrRecipeByIng)])
                        const templateInputDesc = new RecipeCard(recipe);
                        this._$mainDOM.appendChild(templateInputDesc.ui());
                    });
                    //Filter by ingredients
                    const recipeByIng = new RecipesFactory(recipesData, "ingredients", e.target.value);
                    // let arrRecipeByIng = [];
                    // this._arrRecipeByIng = [];
                    recipeByIng.filter.map(i => {
                        recipesData.filter(recipe => {
                            if (recipe.id === i) {
                                arrRecipeByIng.push(recipe);
                                this._arrRecipeByIng.push(recipe);
                                this._$mainDOM.innerHTML = "";
                                arrRecipeByIng.map(n => {
                                    const templateIngredientsResult = new RecipeCard(n);
                                    this._$mainDOM.appendChild(templateIngredientsResult.ui());
                                });
                            };
                        });
                    });
                    if (result.filter.length === 0 && recipeByDesc.filter.length === 0) {
                        console.log(' Aucune recette')
                        this._$mainDOM.innerHTML = `<h4>« Aucune recette ne correspond à votre critère… vous pouvez
chercher « tarte aux pommes », « poisson ».</h4>`;
                    };
                }
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
            if (e.target.value && this._arrRecipeByIng.length > 0) {
                console.log('hello tableau non vide')
                //Filter ingredients
                const ingredients = new RecipesFactory(this._arrRecipeByIng, 'ingredients');
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
            } else if (e.target.value && this._arrRecipeByIng.length === 0) {
                const ingredientsArrNull = new RecipesFactory(recipesData, 'ingredients');
                // this._arrRecipeByIng = [];
                ingredientsArrNull.getListIngredients.filter(n => {
                    if (n.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
                        arrItemSelected.push(n);
                        this._$dropdownList.innerHTML = '';
                        this._$mainDOM.style.marginTop = "50px";
                        [...new Set(arrItemSelected)].map(item => {
                            console.log('item:', item)
                            const templateIng = new ingredientsDropdown(item);
                            this._$dropdownList.appendChild(templateIng.ui());
                        });
                    };
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
            if (this._arrRecipeByIng.length > 0) {
                console.log('Tableau de recette non vide')
                const i = new RecipesFactory(this._arrRecipeByIng, 'ingredients', e.target.value);
                console.log('this._arrRecipeByIng:', this._arrRecipeByIng);
                [...new Set(i.getListIngredients)].map(i => {

                    const templateIng = new ingredientsDropdown(i);
                    this._$dropdownList.appendChild(templateIng.ui());
                });
                this.listingSearchDropdown(this._arrRecipeByIng, 'ingredients');
            } else if (this._arrRecipeByIng.length === 0) {
                console.log('Tableau de recette vide')
                const n = new RecipesFactory(recipesData, 'ingredients');
                [...new Set(n.getListIngredients)].map(i => {
                    console.log('i:', i)

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
            // console.log('recipesData:', recipesData)
            // console.log('this._arrRecipeByIng:', this._arrRecipeByIng)
            if (this._arrRecipeByIng.length === 0) {
                this._$mainDOM.style.marginTop = "-1176px"
                const ingredients = new RecipesFactory(recipesData, 'ingredients');
                ingredients.getListIngredients.map(i => {
                    const templateIng = new ingredientsDropdown(i);
                    this._$dropdownList.appendChild(templateIng.ui());
                });
                this.listingSearchDropdown(recipesData, 'ingredients');
            } else if (this._arrRecipeByIng.length > 0) {
                this._$mainDOM.style.marginTop = "-300px"
                const ingredients = new RecipesFactory(this._arrRecipeByIng, 'ingredients');

                ingredients.getListIngredients.map(i => {
                    // console.log('i:', i)
                    const templateIng = new ingredientsDropdown(i);
                    this._$dropdownList.appendChild(templateIng.ui());
                });
                this.listingSearchDropdown(this._arrRecipeByIng, 'ingredients');
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

        this._$dropdownList.childNodes.forEach(i => {
            i.addEventListener('click', (e) => {
                e.preventDefault();
                this._$mainDOM.innerHTML = '';
                console.log('this._$mainDOM.innerHTML:', this._$mainDOM.innerHTML)
                // console.log('e.target:', e.target.innerText)
                const filterIngredientsDropdown = new RecipesFactory(data, section, e.target.innerText);
                [...new Set(filterIngredientsDropdown.filter)].map(i => {
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







