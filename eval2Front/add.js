document.querySelector(".js-form-add").addEventListener("submit" , async (e) => {
    e.preventDefault();

    const data = {
        name : e.target.name.value ,
        montant : e.target.montant.valueAsNumber
    }

    const schemaMontant = joi.number().min(1).required()
    const {value , error} = schemaMontant.validate( e.target.montant.value );
    if(error){
        return document.querySelector("p").innerHTML = error.details[0].message;
    } 
    const optionsRequete = { method : "POST" , body : JSON.stringify(data) , headers :  {'Content-Type': 'application/json'}  }
    const reponse = await fetch("http://localhost:3000/depenses" , optionsRequete)

    if(reponse.status) e.target.reset()

})