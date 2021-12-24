export class Recipes {
    constructor(recipe, elementDOM) {
        console.log('recipe:', recipe)
        this._recipe = recipe
        this._elementDOM = elementDOM
    }

    ui() {
        let htmlTemplate = "";
        this._recipe.forEach(n => {
            console.log('n:', n)
            htmlTemplate += `
    <div class="card">
            <!-- <img src="#" alt=""> -->
            <svg viewBox="0 0 380 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5C0 2.23858 2.23858 0 5 0H375C377.761 0 380 2.23858 380 5V178H0V5Z" fill="#C7BEBE" />
            </svg>


            <div class="card__container">
                <div class="card__container--title">
                    <h3>Limonade de coco</h3>
                    <i class="far fa-clock"><span>10 min</span></i>
                </div>
                <div class="card__container--list">
                    <ul>
                        <li><span>Lait de coco: </span>400ml</li>
                        <li><span>Jus de citron: </span>2</li>
                        <li><span>Créme de coco: </span>4 cuillières</li>
                        <li><span>Sucre: </span>20g</li>
                        <li><span>Glaçon: </span>2</li>
                    </ul>
                    <div class="card__container--text">
                        <p>Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le
                            jus de 2 citrons et le sucre.
                            Mixer jusqu'à avoir la consistence désirée</p>
                    </div>
                </div>

            </div>

        </div>
    `
            elemenDOM.innerHTML = htmlTemplate
        })
    }

}