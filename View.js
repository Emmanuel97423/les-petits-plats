export class RecipesView {
    constructor(recipe, elementDOM) {
        // console.log('recipe:', recipe)


        this._recipe = recipe
        this._elementDOM = elementDOM
    }

    get recipe() {
        return this._recipe
    }
    set recipe(newRecipe) {
        this._recipe = newRecipe
    }

    get elementDOM() {
        return this._elementDOM
    }
    set elementDOM(newElementDOM) {
        this._elementDOM = newElementDOM
    }

    ui() {
        let htmlTemplate = "";

        this._recipe.map(n => {
            // console.log('n:', n)
            let ingredientTemplate = "";
            let ingredients = n.ingredients
            ingredients.forEach(i => {
                // console.log('i:', i)
                if (i.unit) {
                    ingredientTemplate += `<li><span>${i.ingredient}: </span>${i.quantity} ${i.unit}</li>`
                } else {
                    ingredientTemplate += `<li><span>${i.ingredient}: </span>${i.quantity}</li>`
                }

            })


            htmlTemplate += `
    <div class="card">
            <!-- <img src="#" alt=""> -->
            <svg viewBox="0 0 380 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5C0 2.23858 2.23858 0 5 0H375C377.761 0 380 2.23858 380 5V178H0V5Z" fill="#C7BEBE" />
            </svg>


            <div class="card__container">
                <div class="card__container--title">
                    <h3>${n.name}</h3>
                    <i class="far fa-clock"><span> ${n.time}</span></i>
                </div>
                <div class="card__container--list">
                    <ul>
                       ${ingredientTemplate}
                    </ul>
                    <div class="card__container--text">
                        <p>${n.description}</p>
                    </div>
                </div>

            </div>

        </div>
    `
            this._elementDOM.innerHTML = htmlTemplate

        })
    }

}