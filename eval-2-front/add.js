document.querySelector(".js-add-transaction").addEventListener("submit" , async (e) => {
    e.preventDefault();

    const name = e.target.name.value; 
    const montant = e.target.montant.valueAsNumber;

    //Issue: identifiant n'est pas un nombre --'

    //validation joi ici pas necessaire on bloque déjà en html avec le type="number" puis on fait target.montant.valueAsNumber en haut
    // const schema = joi.number().required()
    // const {value, error} = schema.validate(this.value)
    // if(error){
    //     return `<p>Le montant doit correspondre à un nombre</p>` ;
    // }

    const reponse = await fetch("http://localhost:3000/depenses/" , { 
        method : "POST", 
        body : JSON.stringify({name : name, montant: montant}),
        headers : {
            'Content-Type': 'application/json'
        }
     })

    if(reponse.status) e.target.reset()

})
