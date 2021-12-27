// import { ManageIngredient, ManageRecipe } from './Model.js'
import { RecipesView } from './View.js'
import { RecipeModel } from './Model.js';
import recipes from "./db/recipes.js"


//DOM elements
const arrowDown = document.querySelector('.fa-chevron-down');
const dropdown = document.querySelector('.dropdown');
const filterSection = document.querySelector('.filter__btn--blue');
const filterBtn = document.querySelector('.filter__btn--blue button:nth-child(1)')
const arrowUp = document.querySelector('.fa-chevron-up')
const searchInput = document.querySelector('.search__input')
const mainDOM = document.getElementById('main')



//Fetch all Recipes
const recette = new RecipeModel(recipes);
recette.data();
// console.log(recette.obj)
//View
const view = new RecipesView(recette.obj, mainDOM);
view.ui();


//Filter Recipes
searchInput.addEventListener('input', (e) => {
    e.preventDefault()

    const filterRecipe = new RecipeModel(recipes, e.target.value)
    filterRecipe.dataFilter().then((result) => {

        const filterView = new RecipesView(result, mainDOM)
        filterView.ui()

    })

})








//Click arrow down to open filter section
arrowDown.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.style.display = 'flex';
    filterSection.style.width = '40%';
    filterBtn.style.width = '100%'
    filterBtn.style.justifyContent = 'space-between';
    arrowDown.style.display = 'none';
    arrowUp.style.display = 'flex';
    searchInput.placeholder = 'Recherche un ingrédient';
    searchInput.style.opacity = '50%'
    mainDOM.style.marginTop = "-300px"



})
//Click arrow up to close filter section
arrowUp.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.style.display = 'none';
    arrowDown.style.display = 'flex';
    arrowUp.style.display = 'none'
    filterSection.style.width = '12%';
    searchInput.placeholder = 'Ingrédient';
    searchInput.style.opacity = '100%';
    mainDOM.style.marginTop = "50px"

})
//CSS varations
searchInput.addEventListener('focus', (e) => {
    e.preventDefault();
    searchInput.style.opacity = '100%'
})
searchInput.addEventListener('blur', (e) => {
    e.preventDefault();
    searchInput.style.opacity = '50%'
    searchInput.placeholder = 'Recherche un ingrédient';

})