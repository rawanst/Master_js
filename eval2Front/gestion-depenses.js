const tableDepenses = "http://localhost:3000/depenses"
window.addEventListener("DOMContentLoaded"  , async() => {

    const reponse = await fetch(tableDepenses)
    const depenses = await reponse.json(); 

    let totalDepense = 0;
    const depensePositive = depenses.filter( depense => depense.montant > 0);
    for(let i = 0 ; i < depensePositive.length; i++){
        totalDepense += depensePositive[i].montant;
    }
    
    let totalRecette = 0
    const depenseNegative = depenses.filter( depense => depense.montant < 0);
    for(let i = 0 ; i < depenseNegative.length; i++){
        totalRecette += depenseNegative[i].montant;
    }

    document.querySelector(".js-list-tache").innerHTML = genererFormsTaches(depenses);

    document.querySelector(".js-compteur").innerHTML = totalDepense + totalRecette;
    document.querySelector(".js-compteur-depenses").innerHTML = totalDepense;
    document.querySelector(".js-compteur-recette").innerHTML = totalRecette;

    document.querySelector(".js-list-tache").addEventListener("click" , async e => {
        e.preventDefault();
        if(e.target.className.includes("btn")){
            const form = e.target.parentNode;
            const action = e.target.value ;
            if(action == "modifier"){
                const data = {
                    id : id,
                    name : form.name.value,
                    montant : form.montant.value
                }
                const options = { method : "PUT" , body : JSON.stringify(data) , headers : {'Content-Type': 'application/json'} }
                await fetch(tableDepenses+id , options)
            }else if(action == "supprimer"){
                const options = {method : "DELETE"}
                console.log(tableDepenses+id+" "+options)
                await fetch(tableDepenses+id , options);
            }
        }
    })
})

function genererFormsTaches(data){

    if(data.length === 0) return "<p>Veuillez ajouter des tâches</p>";

    return data.map( d => {
        return `
            <form class="d-flex my-3">
                <div class="headerList col">${d.id}</div>
                <div class="headerList col-sm-3"><input type="text" name="name" class="form-input" value=${d.name}></div>
                <div class="headerList col-sm-2"><input type="text" name="montant" class="form-input" value=${d.montant}></div>
                <div class="headerList col-sm-5">
                    <input type="submit" class="btn btn-primary mx-3" value="modifier">
                    <input type="submit" class="btn btn-danger" value="supprimer">
                </div>
            </form>
        `
    } ).join("")
}