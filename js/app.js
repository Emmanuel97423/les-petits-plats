//Classes
import { RecipeCard, ingredientsDropdown, AppliancesDropdown, Tags, UstensilesDropdown } from './view/View.js'
import { RecipeApi } from "./api/Api.js"
import { RecipesFactory } from "./factories/RecipesFactory.js"

// Data
import data from '../../data/recipes.js';

//Application
class App {
    constructor() {
        //Ui

        //*******************************DOM elements*************

        this._$mainDOM = document.getElementById('main');
        this._$searchInput = document.querySelector('.search__input');
        this._$searchInputGlobal = document.getElementById('search__global');

        this._$arrowDown = document.querySelector('.fa-chevron-down');
        this._$arrowUp = document.querySelector('.fa-chevron-up');
        this._$arrowDownAppliances = document.querySelector('.fa-chevron-down--appliances');
        this._$arrowUpAppliances = document.querySelector('.fa-chevron-up--appliances');
        this._$arrowDownUstensiles = document.querySelector('.fa-chevron-down--ustensiles');
        this._$arrowUpUstensiles = document.querySelector('.fa-chevron-up--ustensiles');

        this._$dropdown = document.querySelector('.dropdown');
        this._$dropdownAppliances = document.querySelector('.dropdown__appliances');
        this._$dropdownUstensiles = document.querySelector('.dropdown__ustensiles');

        this._$dropdownList = document.querySelector('.dropdown__tag--links');
        this._$dropdownListAppliances = document.querySelector('.dropdown__tag--links--appliances');
        this._$dropdownListUstensiles = document.querySelector('.dropdown__tag--links--ustensiles');

        this._$filterSectionIngredients = document.querySelector('.filter__btn--blue');
        this._$filterBtnBlue = document.querySelector('.filter__btn--blue button:nth-child(1)');
        this._$filterSectionAppliances = document.querySelector('.filter__btn--green');
        this._$filterBtnGreen = document.querySelector('.filter__btn--green button:nth-child(1)');
        this._$filterSectionUstensiles = document.querySelector('.filter__btn--red');
        this._$filterBtnRed = document.querySelector('.filter__btn--red button:nth-child(1)');

        this._$recipeCard = document.querySelectorAll('.card');

        //**********************************Data******************

        this._recipesApi = new RecipeApi(data);

        //*********************************Input Button***********

        this._$searchInputIngredient = document.getElementById('input__ingredient');
        this._$searchInputAppliances = document.getElementById('input__appliances');
        this._$searchInputUstensiles = document.getElementById('input__ustensiles');

        //*******************************Tags*******************

        this._$tagDOM = document.querySelector('.tags__section');
        this._tagsSelected = [];

        //******************************btn green

        // this._btnAppliance = document.querySelector('.filter__btn--green');
        // console.log('this._btnAppliance:', this._btnAppliance.childNodes[1].childNodes[3]);


        //**********************************Arrays datas***********************

        // this._arrRecipeByIng = [];
        this._selectedRecipes = [];
        this._selectedIngredients = [];
        this._selectedUstensiles = [];

        //******************** Tags */
        // this._$iconClosedTagDOM.addEventListener('click', (e) => {
        //     this.closeTag(e)
        // })
        /*******************Global request */
        this._globalRequest = "";
        //************item list selected */
        this._arrItemSelected = [];
        //***** tag list arr */
        this._tagListArr = [];




    }
    //Getters
    // get getDropdownShow() {
    //     return this.dropDownShow();
    // };
    // get getRecipesData() {
    //     return this.recipesData();
    // };
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

        //********************************Filter Recipes global search input******************************************

        this.searchGlobal();

        //******************************* Click into filter section ****************************************

        //************************ ingredients */

        this._$searchInputIngredient.addEventListener('click', (e) => {
            e.preventDefault();
            this.dropdownShow('ingredients');
            this.dropdownHide('appliances');
            //Filter ingredients

            this.dropdownToggleMethod('ingredients')

        });
        this._$searchInputIngredient.addEventListener('input', (e) => {
            e.preventDefault();
            this.dropdownHide('appliances');
            this.dropdownInputMethod(e.target.value, 'ingredients');

        });

        //********************Appliances */

        this._$searchInputAppliances.addEventListener('click', (e) => {
            e.preventDefault();
            this.dropdownShow('appliances');
            this.dropdownHide('ingredients');
            //Filter ingredients

            this.dropdownToggleMethod('appliances')

        });
        this._$searchInputAppliances.addEventListener('input', (e) => {
            e.preventDefault();
            this.dropdownInputMethod(e.target.value, 'appliances');

        });
        //***************************** Filter Ingredients button Listen Input ****************************************


        // const $chevronDown = this._$filterBtnBlue.childNodes[3];

        //***********************************show dropdown with arrow buttons*****************

        this._$arrowDown.addEventListener('click', (e) => {
            e.preventDefault();
            this.dropdownShow('ingredients');
            this.dropdownToggleMethod('ingredients')
            // if (this._selectedRecipes.length === 0) {

            //     this._$mainDOM.style.marginTop = "-1176px"
            //     const ingredients = new RecipesFactory(recipesData, 'ingredients');
            //     ingredients.tagsList.map(i => {
            //         const templateIng = new ingredientsDropdown(i);
            //         this._$dropdownList.appendChild(templateIng.ui());
            //     });
            //     this.listingSearchDropdown(recipesData, 'ingredients');
            // } else if (this._selectedRecipes.length > 0) {

            //     this._$mainDOM.style.marginTop = "-300px"
            //     const ingredients = new RecipesFactory(this._selectedRecipes, 'ingredients');

            //     ingredients.tagsList.map(i => {
            //         // console.log('i:', i)
            //         const templateIng = new ingredientsDropdown(i);
            //         this._$dropdownList.appendChild(templateIng.ui());
            //     });
            //     this.listingSearchDropdown(this._selectedRecipes, 'ingredients');
            // }

        });
        this._$arrowDownAppliances.addEventListener('click', (e) => {
            e.preventDefault();
            this.dropdownShow('appliances');
            if (this._selectedRecipes.length === 0) {
                // this._$mainDOM.style.marginTop = "-1176px";
                const appliances = new RecipesFactory(recipesData, 'appliances');


                [...new Set(appliances.tagsList)].map(i => {

                    const templateAppliance = new AppliancesDropdown(i);
                    this._$dropdownListAppliances.appendChild(templateAppliance.ui());
                });
                this.listingSearchDropdown(recipesData, 'appliances');
            } else if (this._selectedRecipes.length > 0) {

                this._$mainDOM.style.marginTop = "-300px"
                const appliances = new RecipesFactory(this._selectedRecipes, 'appliances');

                [...new Set(appliances.tagsList)].map(i => {
                    // console.log('i:', i)
                    const templateIng = new AppliancesDropdown(i);
                    this._$dropdownListAppliances.appendChild(templateIng.ui());
                });
                this.listingSearchDropdown(this._selectedRecipes, 'appliances');
            }

        });
        this._$arrowDownUstensiles.addEventListener('click', (e) => {


            e.preventDefault();
            this.dropdownShow('ustensiles');
            if (this._selectedRecipes.length === 0) {
                // this._$mainDOM.style.marginTop = "-1176px";
                const ustensiles = new RecipesFactory(recipesData, 'ustensiles');
                [...new Set(ustensiles.tagsList)].map(ustensileTag => {
                    console.log('ustensileTag:', ustensileTag)

                    const templateUstensiles = new UstensilesDropdown(ustensileTag);
                    this._$dropdownListUstensiles.appendChild(templateUstensiles.ui());
                });
                this.listingSearchDropdown(recipesData, 'ustensiles');
            } else if (this._selectedRecipes.length > 0) {

                this._$mainDOM.style.marginTop = "-300px"
                const ustensiles = new RecipesFactory(this._selectedRecipes, 'ustensiles');

                [...new Set(ustensiles.tagsList)].map(ustensileTag => {
                    // console.log('i:', i)
                    const templateUstensiles = new UstensilesDropdown(ustensileTag);
                    this._$dropdownListUstensiles.appendChild(templateUstensiles.ui());
                });
                this.listingSearchDropdown(this._selectedRecipes, 'ustensiles');
            }
            return
            if (this._selectedRecipes.length === 0) {

                // this._$mainDOM.style.marginTop = "-1176px";
                const ustensiles = new RecipesFactory(recipesData, 'ustensiles');
                return this.dropdownToggleMethod("ustensiles");




                [...new Set(ustensiles.tagsList)].map(i => {
                    const templateUstensiles = new UstensilesDropdown(i);
                    this._$dropdownListUstensiles.appendChild(templateUstensiles.ui());
                });


            } else if (this._selectedRecipes.length > 0) {

                // this._$mainDOM.style.marginTop = "-300px"
                // const appliances = new RecipesFactory(this._selectedRecipes, 'appliances');

                // [...new Set(appliances.tagsList)].map(i => {
                //     // console.log('i:', i)
                //     const templateIng = new AppliancesDropdown(i);
                //     this._$dropdownListAppliances.appendChild(templateIng.ui());
                // });
                // this.listingSearchDropdown(this._selectedRecipes, 'appliances');
            }

        });


        //********************Click arrow up to close filter section*************************

        this._$arrowUp.addEventListener('click', (e) => {
            e.preventDefault();
            this.dropdownHide('ingredients');
        });

        this._$arrowUpAppliances.addEventListener('click', (e) => {

            e.preventDefault();
            this.dropdownHide('appliances');
        });

        //*********************************CSS varations***********************************

        this._$searchInput.addEventListener('focus', (e) => {
            e.preventDefault();
            this._$searchInput.style.opacity = '100%'
        });
        this._$searchInput.addEventListener('blur', (e) => {
            e.preventDefault();
            this._$searchInput.style.opacity = '50%'
            this._$searchInput.placeholder = 'Recherche un ingrédient';
        });
        // tagsCloseIcon = null;
        // this.closeTag();

    }
    //********************************************   methods    **************************************************
    //**************Close Tags**** */
    async searchGlobal() {
        this._$searchInput.addEventListener('input', async (e) => {
            e.preventDefault();
            // this._arrRecipeByIng = [];
            this._selectedRecipes = [];

            if (e.target.value.length > 2) {
                this.dropdownHide('ingredients');
                this.dropdownHide('appliances');
                this._$tagDOM.innerHTML = '';
                this._tagsSelected = [];

                // if (this._selectedRecipes.length > 0) {
                //     console.log('this._selectedRecipes:', this._selectedRecipes)

                // }

                this._$mainDOM.innerHTML = '';
                const recipesInputData = await this._recipesApi.get();

                this._selectedRecipes = recipesInputData

                const result = new RecipesFactory(this._selectedRecipes, 'global', e.target.value);
                this._globalRequest = e.target.value

                if (result.filter) {

                    this._selectedRecipes = [];

                    //Filter By title
                    result.filter.map(recipe => {
                        this._selectedRecipes.push(recipe);
                        const templateInput = new RecipeCard(recipe);
                        this._$mainDOM.appendChild(templateInput.ui());

                    });

                }
                if (result.filter.length === 0) {
                    console.log(' Aucune recette')
                    this._$mainDOM.innerHTML = `<h4>« Aucune recette ne correspond à votre critère… vous pouvez
chercher « tarte aux pommes », « poisson ».</h4>`;
                }

            }
        });
    }
    closeTag() {
        // const recipesData = await this._recipesApi.get();
        const tagsCloseIcon = document.querySelectorAll('.fa-times-circle');


        tagsCloseIcon.forEach((closeTag) => {
            closeTag.addEventListener('click', (e) => {
                console.log('e:', e.target.previousSibling.innerText)
                // textElementIngredient(closeTag);
                if (this._tagsSelected.length === 0) {
                    closeTag.parentNode.remove();
                    // this._tagsSelected = [];
                    this._$mainDOM.innerHTML = "";
                    this._selectedRecipes = [];
                    this.recipesData().then((recipe) => {
                        recipe.map(recipe => {
                            this._selectedRecipes.push(recipe);
                            new RecipesFactory(recipe, 'global', this._globalRequest);
                            const template = new RecipeCard(recipe);
                            template.ui();
                            this._$mainDOM.appendChild(template.ui());
                        });
                    });
                    this.dropdownToggleMethod('ingredients');
                    this.dropdownHide('ingredients');

                } else if (this._tagsSelected.length >= 1) {

                    closeTag.parentNode.remove();

                    const result = this._tagsSelected.filter(tag => {

                        return tag.toLowerCase() !== closeTag.previousSibling.innerText.toLowerCase()

                    });

                    this._tagsSelected = [...new Set(result)];
                    this._tagsSelected.map(tag => {
                        this.recipesData().then((result) => {

                            const recipes = new RecipesFactory(result, 'global', tag);


                            if (recipes.filter !== 'undefined') {
                                this._$mainDOM.innerHTML = '';

                                this._selectedRecipes = [];

                                recipes.filter.map(recipe => {
                                    this._selectedRecipes.push(recipe);
                                    const template = new RecipeCard(recipe);
                                    template.ui();
                                    this._$mainDOM.appendChild(template.ui());
                                });
                                this.dropdownToggleMethod('ingredients');
                                this.dropdownHide('ingredients');
                            }
                        })
                    });


                }

                // hideTagSelected(e);
            });
        });


        // else if (this._tagsSelected.length === 0) {
        //     console.log('this._tagsSelected.length:', this._tagsSelected.length)

        //     recipesData.map(recipe => {
        //         new RecipesFactory(recipe, 'global');
        //         const template = new RecipeCard(recipe);
        //         template.ui();
        //         this._$mainDOM.appendChild(template.ui());
        //     });
        // };

        // const textElementIngredient = (el) => {
        //     console.log('this._tagsSelected.length:', this._tagsSelected.length)






        // };
        //****** hide selected tag */
        // const hideTagSelected = (tag) => {
        // console.log('tag:', tag.target.previousSibling.innerText)
        // console.log('this._arrItemSelected:', this._arrItemSelected)
        // }


        // // console.log('Tags', [...new Set(this._tagsSelected)])
        // tagsCloseIcon = document.querySelectorAll('.fa-times-circle');
        // this._$textTag = document.querySelectorAll('.tag > p')
        // console.log('this._$textTag:', this._$textTag);

        // // console.log('tagsCloseIcon:', tagsCloseIcon);
        // tagsCloseIcon.forEach((icon) => {


        //     icon.addEventListener('click', (e) => {
        //         let tagsSelected;
        //         // console.log('e:', e.target);
        //         // console.log('index:', index);
        //         this._$textTag.forEach(text => {

        //             // console.log('this._tagsSelected.indexOf(text.innerText):', [...new Set(this._tagsSelected)].indexOf(text.innerText))
        //             // console.log('text:', text.innerText);
        //             tagsSelected = [...new Set(this._tagsSelected)].filter(item => {

        //                 return item.toLowerCase() !== text.innerText.toLowerCase()
        //                 // console.log('item.indexOf(text.innerText) === 1:', item.indexOf(text.innerText) === -1)
        //                 // return item.indexOf(text.innerText) === 1;





        //             });

        //         });

        //         this._tagsSelected = tagsSelected
        //         console.log('tagsSelected:', tagsSelected)

        //     });


        // })
        // if (tagsCloseIcon.length > 1) {

        //     tagsCloseIcon.NodeList.map(icon => {
        //         console.log('icon:', icon)
        //         icon.addEventListener('click', (e) => {
        //             console.log('click', e.target.value)
        //         })

        //     })
        // } if (tagsCloseIcon.length < 1) {
        //     tagsCloseIcon.addEventListener('click', (e) => {
        //         console.log('click', e.target.value)
        //     })
        // }
        // console.log('Tags', [...new Set(this._tagsSelected)]);

        // console.log('this._tagsSelected:', this._tagsSelected)
        // const closeTagClass = new Tags();
        // closeTagClass.getCloseTag
        // console.log('closeTagClass.getCloseTag:', closeTagClass.getCloseTag)
        // if (closeTagClass.getCloseTag) {

        //     console.log('close tag app')
        // }
    }
    //*************************DropDown show*****************************************************************************************
    dropdownShow(section) {
        if (section === 'ingredients') {
            this._$dropdownList.innerHTML = '';
            this._$dropdown.style.display = 'flex';
            this._$filterSectionIngredients.style.width = '40%';
            this._$filterBtnBlue.style.width = '100%'
            this._$filterBtnBlue.style.justifyContent = 'space-between';
            this._$arrowDown.style.display = 'none';
            this._$arrowUp.style.display = 'flex';
            // this._$searchInput.placeholder = 'Recherche un ingrédient';
            // this._$searchInput.style.opacity = '50%'
            // this._$mainDOM.style.marginTop = "-300px"
        } else if (section === 'appliances') {
            this._$dropdownListAppliances.innerHTML = '';
            this._$dropdownAppliances.style.display = 'flex';
            this._$filterSectionAppliances.style.width = '40%';
            this._$filterBtnGreen.style.width = '100%'
            this._$filterBtnGreen.style.justifyContent = 'space-between';
            this._$arrowDownAppliances.style.display = 'none';
            this._$arrowUpAppliances.style.display = 'flex';
        }
        else if (section === 'ustensiles') {
            this._$dropdownListUstensiles.innerHTML = '';
            this._$dropdownUstensiles.style.display = 'flex';
            this._$filterSectionUstensiles.style.width = '40%';
            this._$filterBtnRed.style.width = '100%'
            this._$filterBtnRed.style.justifyContent = 'space-between';
            this._$arrowDownUstensiles.style.display = 'none';
            this._$arrowUpUstensiles.style.display = 'flex';
        }



    }

    //************************* dropdown hide button**********************************************************************************

    dropdownHide(section) {

        if (section === 'ingredients') {
            this._$dropdownList.innerHTML = '';
            this._$dropdown.style.display = 'none';
            this._$arrowDown.style.display = 'flex';
            this._$arrowUp.style.display = 'none';
            this._$filterSectionIngredients.style.width = '12%';
            // this._$searchInput.placeholder = 'Ingrédient';
            // this._$searchInputGlobal.placeholder = 'Recherche un ingrédient';
            // this._$searchInput.style.opacity = '100%';
            this._$mainDOM.style.marginTop = "50px";
        } else if (section === 'appliances') {
            this._$dropdownListAppliances.innerHTML = '';
            this._$dropdownAppliances.style.display = 'none';
            this._$arrowDownAppliances.style.display = 'flex';
            this._$arrowUpAppliances.style.display = 'none';
            this._$filterSectionAppliances.style.width = '12%';
            // this._$searchInput.placeholder = 'Ingrédient';
            // this._$searchInputGlobal.placeholder = 'Recherche un ingrédient';
            // this._$searchInput.style.opacity = '100%';
            this._$mainDOM.style.marginTop = "50px";
        }


    }


    //******************listing search method in dropdown*********************************************************************

    listingSearchDropdown(data, section) {

        let dropdown = "";
        if (section === 'ingredients') {
            dropdown = this._$dropdownList;
        } else if (section === 'appliances') {
            dropdown = this._$dropdownListAppliances;
        } else if (section === 'ustensiles') {
            dropdown = this._$dropdownListUstensiles;
        }
        //*******************Listener tag****************************************************************************************

        dropdown.childNodes.forEach(i => {

            i.addEventListener('click', (e) => {
                e.preventDefault();
                this._$mainDOM.innerHTML = null;
                let tagTemp = e.target.innerText;

                //**********Check if tags empty*********************************************************************
                if (this._tagsSelected.length === 0) {
                    this._tagListArr.filter(tag => {
                        return tag !== tagTemp;
                    });
                    this._tagsSelected.push(tagTemp);
                    //*Tags classes*************************************/
                    if (section === "appliances") {
                        const tagsTemplateAppliances = new Tags(this._tagsSelected, "appliances");
                        this._$tagDOM.appendChild(tagsTemplateAppliances.getUi);
                        this.closeTag();
                    } else if (section === "ingredients") {
                        const tagsTemplateIngredients = new Tags(this._tagsSelected, "ingredients");
                        this._$tagDOM.appendChild(tagsTemplateIngredients.getUi);
                        this.closeTag();
                    }
                    else if (section === "ustensiles") {
                        // let ustensilesTempArray = [];

                        // const tagsTemplateUstensiles = new Tags(this._tagsSelected, "ustensiles");
                        // this._$tagDOM.appendChild(tagsTemplateUstensiles.getUi);
                        // this._selectedUstensiles.filter(ustensile => {
                        //     if (ustensile.toLowerCase() !== tagTemp.toLowerCase()) {
                        //         ustensilesTempArray.push(ustensile);
                        //     }
                        // });
                        // this._selectedUstensiles = ustensilesTempArray;
                        // this.dropdownToggleMethod("ustensiles", tagTemp)
                        // this.closeTag();
                        // if (this._selectedRecipes.length === 0) {

                        //     /*Card UI****/

                        //     const recipeFactory = new RecipesFactory(data, section, tagTemp);
                        //     recipeFactory.filter.map(ustensile => {
                        //         console.log('ustensile:', ustensile)

                        //     });

                        // recipeFactory.filter.map(i => {

                        // data.filter(recipe => {
                        //     if (recipe.id === i) {
                        //         this._selectedRecipes.push(recipe);
                        //         this._$mainDOM.innerHTML = null;
                        //         [...new Set(this._selectedRecipes)].map(n => {
                        //             const templateIngredientsResult = new RecipeCard(n);
                        //             this._$mainDOM.appendChild(templateIngredientsResult.ui());
                        //         });
                        //     }
                        // });
                        // });
                    }


                }
                if (this._selectedRecipes.length === 0) {
                    /*Card UI****/
                    const filterIngredientsDropdown = new RecipesFactory(data, section, tagTemp)
                    filterIngredientsDropdown.filter.map(i => {
                        data.filter(recipe => {
                            if (recipe.id === i) {
                                this._selectedRecipes.push(recipe);
                                this._$mainDOM.innerHTML = null;
                                [...new Set(this._selectedRecipes)].map(n => {
                                    const templateIngredientsResult = new RecipeCard(n);
                                    this._$mainDOM.appendChild(templateIngredientsResult.ui());
                                });
                            }
                        });
                    });

                    // this.dropdownToggleMethod(section, tagTemp);




                } else if (this._selectedRecipes.length > 0) {

                    const filterIngredientByTag = new RecipesFactory(this._selectedRecipes, section, tagTemp);

                    filterIngredientByTag.filter.map(id => {
                        this._selectedRecipes.filter(recipe => {

                            if (recipe.id === id) {

                                this._selectedRecipes = [];
                                this._selectedRecipes.push(recipe);
                                this._$mainDOM.innerHTML = '';
                                this.dropdownToggleMethod(section, tagTemp);
                                [...new Set(this._selectedRecipes)].map(n => {

                                    const templateIngredientsResult = new RecipeCard(n);
                                    this._$mainDOM.appendChild(templateIngredientsResult.ui());
                                });
                            } else {
                                return
                            }
                        });

                    });


                }

            } else if (this._tagsSelected.length > 0) {

                this._tagsSelected.filter(el => {
                    if (el === tagTemp) {
                        return;
                    } else {
                        this._tagsSelected.push(tagTemp);
                        this._$tagDOM.innerHTML = "";
                        [...new Set(this._tagsSelected)].map(tag => {
                            //*Tags classes*************************************/
                            if (section === "appliances") {
                                const tagsTemplateAppliances = new Tags(tag, "appliances");
                                this._$tagDOM.appendChild(tagsTemplateAppliances.getUi);
                                this.closeTag();
                            } else if (section === "ingredients") {
                                const tagsTemplateIngredients = new Tags(tag, "ingredients");
                                this._$tagDOM.appendChild(tagsTemplateIngredients.getUi);
                                this.closeTag();
                            } else if (section === "ustensiles") {
                                const tagsTemplateUstensiles = new Tags(tag, "ustensiles");
                                this._$tagDOM.appendChild(tagsTemplateUstensiles.getUi);
                                this.closeTag();
                            }
                            // const tagsTemplate = new Tags(tag);
                            // this._$tagDOM.appendChild(tagsTemplate.getUi);
                            // this.closeTag();
                        });
                    }
                });

                //*******************Recipes Card ui******************************************************************************
                const filterIngredientsDropdown = new RecipesFactory(this._selectedRecipes, section, tagTemp)
                filterIngredientsDropdown.filter.map(i => {
                    this._selectedRecipes.filter(recipe => {

                        if (recipe.id === i) {

                            this._selectedRecipes = [];

                            this._selectedRecipes.push(recipe);

                            this._$mainDOM.innerHTML = null;
                            this.dropdownToggleMethod(section, tagTemp);
                            [...new Set(this._selectedRecipes)].map(n => {

                                const templateIngredientsResult = new RecipeCard(n);
                                this._$mainDOM.appendChild(templateIngredientsResult.ui());
                            });
                        } else {
                            return
                        }
                    });
                });

            }




            // console.log('this._$mainDOM.innerHTML:', this._$mainDOM.innerHTML)// console.log('e.target:', e.target.innerText)

        });
    });
}

    //********************Dropdown toggle method *********************************/

    async dropdownToggleMethod(section, tagClicked) {



    if (this._selectedRecipes.length > 0) {
        // this._selectedRecipes = []
        //Map recipes for export ingredients 
        const i = new RecipesFactory(this._selectedRecipes, section);

        this._$dropdownList.innerHTML = '';
        this._$dropdownListAppliances.innerHTML = '';

        this._tagListArr = [];

        [...new Set(i.tagsList)].map((ingred) => {
            this._tagListArr.push(ingred);
            // this._$dropdownList
            if (section === 'ingredients') {
                const templateIng = new ingredientsDropdown(ingred);
                this._$dropdownList.appendChild(templateIng.ui());
            } else if (section === 'appliances') {
                const templateAppliance = new AppliancesDropdown(ingred);
                this._$dropdownListAppliances.appendChild(templateAppliance.ui());
            }
        });
        this.listingSearchDropdown(this._selectedRecipes, section);

    } else if (this._selectedRecipes.length === 0) {

        const allRecipesData = await this._recipesApi.get()
        const n = new RecipesFactory(allRecipesData, section);
        // if (section === 'ustensiles') {
        //     if (this._selectedUstensiles.length > 0) {
        //         [...new Set(n.filter)].map(ustensile => {
        //             this._selectedUstensiles.push(ustensile);

        //         });

        //         if (tagClicked) {
        //             let ustensilesTempArray = [];
        //             this._$dropdownListUstensiles.innerHTML = "";
        //             [...new Set(this._selectedUstensiles)].filter(ustensile => {
        //                 if (ustensile.toLowerCase() !== tagClicked.toLowerCase()) {
        //                     ustensilesTempArray.push(ustensile);
        //                 }
        //             });
        //             this._selectedUstensiles = [];
        //             [...new Set(ustensilesTempArray)].map(ustensile => {
        //                 const templateUstensiles = new UstensilesDropdown(ustensile);
        //                 this._$dropdownListUstensiles.appendChild(templateUstensiles.ui());
        //             })

        //         } else {
        //             this._selectedUstensiles.map(ustensile => {
        //                 const templateUstensiles = new UstensilesDropdown(ustensile);
        //                 this._$dropdownListUstensiles.appendChild(templateUstensiles.ui());
        //             })
        //         }

        //     } else {

        //         [...new Set(n.filter)].map(ustensile => {
        //             this._selectedUstensiles.push(ustensile);
        //         });
        //         this._selectedUstensiles.map(ustensile => {
        //             const templateUstensiles = new UstensilesDropdown(ustensile);
        //             this._$dropdownListUstensiles.appendChild(templateUstensiles.ui());
        //         })
        //     }

        // }
        this._tagListArr = [];

        /*Listing tags*/

        [...new Set(n.tagsList)].map(i => {
            this._tagListArr.push(i)

            if (section === 'ingredients') {
                const templateIng = new ingredientsDropdown(i);
                this._$dropdownList.appendChild(templateIng.ui());
            } else if (section === 'appliances') {
                const templateAppliance = new AppliancesDropdown(i);
                this._$dropdownListAppliances.appendChild(templateAppliance.ui());
            }


        });


        this.listingSearchDropdown(allRecipesData, section);
    }
}


    //*************************Dropdown input method *********************************/

    async dropdownInputMethod(e, section) {


    // let this._arrItemSelected = [];
    this._arrItemSelected = []
    if (this._selectedRecipes.length > 0) {

        console.log('hello tableau non vide');
        //*********************Filter ingredients********************************
        const ingredients = new RecipesFactory(this._selectedRecipes, section);

        // this._arrRecipeByIng = [];
        ingredients.tagsList.filter(n => {


            if (n.toLowerCase().indexOf(e.toLowerCase()) !== -1) {


                this._arrItemSelected.push(n);
                this._$dropdownList.innerHTML = '';
                this._$dropdownListAppliances.innerHTML = '';
                this._$mainDOM.style.marginTop = "50px";
                [...new Set(this._arrItemSelected)].map(item => {

                    if (section === 'ingredients') {
                        const templateIng = new ingredientsDropdown(item);
                        this._$dropdownList.appendChild(templateIng.ui());
                    }
                    else if (section === 'appliances') {
                        const templateAppliance = new AppliancesDropdown(item);
                        this._$dropdownListAppliances.appendChild(templateAppliance.ui());
                    }
                });
            } else {
                return

            }
        });
        this.listingSearchDropdown(this._selectedRecipes, section);
    } else if (e && this._selectedRecipes.length === 0) {

        console.log('hello tableau vide')
        const allRecipesData = await this._recipesApi.get()
        const ingredientsArrNull = new RecipesFactory(allRecipesData, section);
        // this._arrRecipeByIng = [];
        this._arrItemSelected = []
        ingredientsArrNull.tagsList.filter(n => {

            if (n.toLowerCase().indexOf(e.toLowerCase()) !== -1) {

                this._arrItemSelected.push(n);

                this._$dropdownList.innerHTML = '';
                this._$dropdownListAppliances.innerHTML = '';
                this._$mainDOM.style.marginTop = "50px";
                [...new Set(this._arrItemSelected)].map(item => {

                    if (section === 'ingredients') {
                        const templateIng = new ingredientsDropdown(item);
                        this._$dropdownList.appendChild(templateIng.ui());
                    }
                    else if (section === 'appliances') {
                        const templateAppliance = new AppliancesDropdown(item);
                        this._$dropdownListAppliances.appendChild(templateAppliance.ui());
                    }
                });
                this.listingSearchDropdown(allRecipesData, section);
            } else {
                this._arrItemSelected = []

            }

        });
    }
    else if (!e) {
        // this.dropdownShow();
        console.log('liste vide')
        this._$dropdownList.innerHTML = '';
        const recipesData = await this._recipesApi.get();
        this._selectedRecipes = recipesData;

        const n = new RecipesFactory(this._selectedRecipes, 'ingredients');
        [...new Set(n.tagsList)].map(i => {
            const templateIng = new ingredientsDropdown(i);
            this._$dropdownList.appendChild(templateIng.ui());
        });

    }
}

    //********************************fetching Data********************** */

    async recipesData() {
    const recipesData = await this._recipesApi.get();
    return recipesData;
}
}
const app = new App();
app.main();







