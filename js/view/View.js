export class RecipeCard {
    constructor(recipes, tags) {

        this._recipes = recipes
        this._tags = tags
    };
    set tags(tags) {
        this.tags = tags;
    }
    get tags() { return this._tags }
    set getRecipes(recipes) {
        this._recipes = recipes;
    };
    get getRecipes() {
        return this._recipes;
    };
    get getUi() {
        return this.ui();
    };

    ui() {
        const $wrapper = document.createElement('div');
        $wrapper.classList.add('card');
        let ingredientTemplate = "";
        let ingredients = this._recipes.ingredients;
        //View of array ingredients
        ingredients.map(i => {
            if (i.unit) {
                ingredientTemplate += `<li><span>${i.ingredient}: </span>${i.quantity} ${i.unit}</li>`;
            } else if (i.quantity) {
                ingredientTemplate += `<li><span>${i.ingredient}: </span>${i.quantity}</li>`;
            } else {
                ingredientTemplate += `<li><span>${i.ingredient}</li>`;
            };

        });
        //View recipe card
        const recipeCard = `
            
                       <!-- <img src="#" alt=""> -->
            <svg viewBox="0 0 380 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5C0 2.23858 2.23858 0 5 0H375C377.761 0 380 2.23858 380 5V178H0V5Z" fill="#C7BEBE" />
            </svg>


            <div class="card__container">
                <div class="card__container--title">
                    <h3>${this._recipes.name}</h3>
                    <i class="far fa-clock"><span> ${this._recipes.time}</span></i>
                </div>
                <div class="card__container--list">
                    <ul>
                        ${ingredientTemplate}
                    </ul>
                    <div class="card__container--text">
                        <p>${this._recipes.description}</p>
                    </div>
                </div>

            </div>
            
        `;
        $wrapper.innerHTML = recipeCard;
        return $wrapper;
    }
}

export class ingredientsDropdown {
    constructor(ingredients) {


        this._ingredients = ingredients;
    }
    set getIngredient(ingredients) {
        this._ingredients = ingredients;
    }
    get getIngredient() {
        return this._ingredients
    }
    get getUi() {
        return this.ui()
    }

    ui() {
        const $dropdown = document.createElement('li');
        // $dropdown.classList.add('dropdown__tag--links');

        const dropdownTemplate = `       
                            ${this._ingredients}                   
        `;

        $dropdown.innerHTML = dropdownTemplate;
        return $dropdown;
    }
}

export class Tags {
    constructor(tag) {


        this._tag = tag;
    }
    set getTag(tag) {
        this._tag = tag;
    }
    get getTag() { return this._tag };

    get getUi() {
        return this.ui()
    }

    ui() {
        const $tagWrapper = document.createElement('div');
        $tagWrapper.classList.add('tag');

        const tagTemplate = `
                <p>${this._tag}</p><i class="far fa-times-circle"></i>
        `;
        $tagWrapper.innerHTML = tagTemplate;

        return $tagWrapper;
    }
}
