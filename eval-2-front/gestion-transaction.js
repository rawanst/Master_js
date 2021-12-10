const dbDepenses = "http://localhost:3000/depenses/";
window.addEventListener("DOMContentLoaded"  , async() => {

    const reponse = await fetch(dbDepenses)
    const depenses = await reponse.json()
    const allResults = genererAllResults(depenses);
    
    //affiche la liste des transactions
    document.querySelector(".js-list-transaction").innerHTML = allResults.list;

    //affiche le nombre total de transactions
    document.querySelector(".js-compteur-total").innerHTML = allResults.total;

    //nombre total de depenses et recettes
    document.querySelector(".js-compteur-depenses").innerHTML = allResults.depenses;
    document.querySelector(".js-compteur-recettes").innerHTML = allResults.recettes;
    
    //Issue: UPDATE DELETE don't work 
    document.querySelector(".js-list-transaction").addEventListener("click" , async e => {
        e.preventDefault();
        if(e.target.className.includes("btn")){
            const form = e.target.parentNode;
            const action = e.target.value ;
            const id = form.id.value;
            if(action == "modifier"){
                const data = {
                    id: id,
                    name : form.name.value,
                    montant : form.montant.valueAsNumber
                }         
                const options = { method : "PUT" , body : JSON.stringify(data) , headers : {'Content-Type': 'application/json'} }
                await fetch(dbDepenses+id , options)
            }else if(action == "supprimer"){
                const options = {method : "DELETE"}
                await fetch(dbDepenses+id , options);
            }
        }
    })
})
function genererAllResults(depenses){
    let results = {
        list: {},
        total: 0,
        depenses: 0,
        recettes: 0
    };

    if( depenses.length == 0){
        results.list = `<p>Aucune transactions</p>`
        return results;
    }
    else{
        results.list = depenses.map(d => {
            return `
                <form class="d-flex my-3">
                    <div class="col"><p name="id" class="form-input">${d.id}</div>
                    <div class="col-2"><input type="text" name="name" class="form-input" value=${d.name}></div>
                    <div class="col-3"><input type="number" name="montant" class="form-input" value=${d.montant}></div>
                    <div class="col-5">
                        <input type="submit" class="btn btn-primary mx-3" value="modifier">
                        <input type="submit" class="btn btn-danger" value="supprimer">
                    </div>
                </form>
            `
        }).join("")

        depenses.forEach(d => {
            if( d.montant < 0){
                results.depenses += d.montant
            }
            else if ( d.montant > 0){
                results.recettes += d.montant
            }
        });
        results.total = results.depenses + results.recettes
        return results;
    }
}