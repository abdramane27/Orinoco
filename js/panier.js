
//-------Récupération des données dans le localStorage------------------
let productInTheLocalStorgage=JSON.parse(localStorage.getItem("products"));
console.log(productInTheLocalStorgage);

//----------------Affichage du panier vide----------------
function basketEmpty(){
    if(productInTheLocalStorgage === null){
    var x =document.getElementById("basket");
    x.setAttribute("style", "display:none");

    var x =document.getElementById("final")
    x.setAttribute("style", "display:none");
    
    let empty = document.querySelector(".bloc_principal")
    empty.innerHTML='<h3 class="empty text-center">Votre panier est vide</h3>';

    
    }
    };
    basketEmpty()
 
let html= document.querySelector(".table-article");
let totalPrice = 0;
let i = 0;

//-------gestion du tableau d'article--------------//

for (let product of productInTheLocalStorgage ){

//-------Gestion du montant total--------------------//
totalPrice += parseInt(product.quantity) * parseInt(product.price);

//-------------Affichage tableau articles------------------
 let elm = `

       
<tr>
<td><img width="100" src="${product.imageUrl}" /></td>
<td>${product.name}</td>
<td>${product.lenses}</td>
<td text-center>${product.quantity}</td>
<td class="price">${parseInt(product.quantity) * parseInt(product.price /100)},00€ </td>
<td><button class="btn" onclick="deleteProduct(${i})"><i class="fas fa-trash-alt"></i></button></td>
</tr>
<tbody>
</tbody>
`;
html.innerHTML += elm; 

i++;
}

let totalPriceSet = document.querySelector(".totalPrix");
totalPriceSet.innerHTML =`<h3 class="price">Montant total : ${totalPrice/100},00€</h3>`

function deleteProduct(index){
productInTheLocalStorgage.splice(index, 1);

localStorage.setItem('products', JSON.stringify(productInTheLocalStorgage));

location.reload();

console.log(JSON.parse(localStorage.getItem('products')))

}
    


//--------------Affichage formulaire----------------------------------------
const afficherFormulaire =()=>{
    const positionForm = document.querySelector(".container-form");

    const structureForm =`<form  method="POST" class="flex" id="loginform">
                
    <label for="name">Nom</label>
    <input type="text" id="nom" name="lastName" >
    <small id="smallName"></small>

    <label for="surname">Prénom</label>
    <input type="text" id="prenom" name="firstName" >
    <small id="smallSurname"></small>

    <label for="adresse">Adresse</label>
    <input type="text" id="adresse" name="address" >
    <small id="smallAdresse"></small>

    <label for="city">Ville</label>
    <input type="text" id="ville" name="city" >
    <small id="smallCity"></small>

    <label for="email">Email</label>
    <input type="text" id="mail" name="email" >
    
    <small id="smallEmail"></small>
    
    
    <button type="submit" class="send-form text-center">VALIDER MA COMMANDE</button>
    
</form>
    `
    ;

    positionForm.insertAdjacentHTML("afterend", structureForm);
};
afficherFormulaire();


//------Sélection du bouton de validation-----------------
let buttonValidation = document.querySelector(".send-form");
console.log(buttonValidation);
//----------------Recupération des données formulaire-----------------
buttonValidation.addEventListener("click",(e)=>{
    e.preventDefault();
const formValues = {
    lastName : document.querySelector("#nom").value,
 firstName: document.querySelector("#prenom").value,
address : document.querySelector("#adresse").value,
city : document.querySelector("#ville").value,
email : document.querySelector("#mail").value,
}
//-------------Validation des données formulaire------------//


//---------regExp pour trois valeurs du formulaire------------//
const regExpNameSurnameCity = (value) =>{
return /^([A-Za-z àâéèêôùûÀÂÉÈÔÙÛÇ]{2,20})?([-]{0,1})?([A-Za-z àâéèêôùûçÀÂÉÈÔÙÛÇ]{2,20})$/.test(value);
};

//----------------fonction affichage small formulaire---------------

function smallVide(querySelectorId){
    document.querySelector(`#${querySelectorId}`).textContent =""
};

function smallFull(querySelectorId){
    document.querySelector(`#${querySelectorId}`).textContent ="Veuillez bien remplir ce champ"
};

function nameControl(){
const nameForm = formValues.firstName;
if(regExpNameSurnameCity(nameForm)){
smallVide("smallName")
return true;
}else{
    smallFull("smallName")
    alert("Prénom : les chiffres et les symboles ne sont pas autorisés")
    return false 
   
}
};

function surNameControl(){
    const surNameForm = formValues.lastName;
    if(regExpNameSurnameCity(surNameForm)){
    smallVide("smallSurname")
    return true;
    }else{
        smallFull("smallSurname")
        alert("Nom : les chiffres et les symboles ne sont pas autorisés")
        return false
        }
    };

function cityControl(){
    const cityForm = formValues.city;
    if(regExpNameSurnameCity(cityForm)){
        smallVide("smallCity")
    return true;
    }else{
        smallFull("smallCity")
        alert("Ville : les chiffres et les symboles ne sont pas autorisés")
        return false 
    }
    };

function adresseControl(){
        const adresseForm = formValues.address;
        if(/^[a-zA-Z - ,.' 0-9 àâéèêôùûÀÂÉÈÔÙÛÇ]+$/i.test(adresseForm)){
            smallVide("smallAdresse")
        return true;
        }else{
            smallFull("smallAdresse")
            alert("Adresse : les symboles ne sont pas autorisés")
            return false 
        }
        };

        function emailControl(){
            const emailForm = formValues.email;
            if(/^[a-zA-Z.'-_0-9 àâéèêôùûÀÂÉÈÔÙÛÇ]+[@]{1}[a-zA-Z.'-_0-9 àâéèêôùûÀÂÉÈÔÙÛÇ]+[.]{1}[a-z]{2,10}$/i.test(emailForm)){
                smallVide("smallEmail")
            return true;
            }else{
                smallFull("smallEmail")
                alert("Veuillez saisir une adresse mail valide")
                return false 
            }
            };

//------Validation des entreés du formulaire----------
if(nameControl(),surNameControl(),cityControl(),adresseControl(),emailControl()){

    //--------Envoie des données formulaire dans le localstorage aprés vérification---------------------
localStorage.setItem("contact" ,JSON.stringify(formValues));
localStorage.setItem("prixTotal",JSON.stringify(totalPrice));
} else{
    alert("Veuillez bien remplir le formulaire")
};
let pr =[];
for (let product of productInTheLocalStorgage){
    pr.push(product.id);
    
}

const catchData = {
    products : pr,
    contact : formValues,
};
console.log(catchData)
if(nameControl(),surNameControl(),cityControl(),adresseControl(),emailControl()){
//-------------Envoie des données au serveur--------------------
const sendData = fetch("http://localhost:3000/api/cameras/order",{
method: "POST",
body: JSON.stringify(catchData),
headers:{
    "Content-Type": "application/json"
},
})
}
sendData.then(async(response)=>{
try{
    console.log(response);
const allData = await response.json();
  console.log(allData);

if(response.ok){
    console.log(allData.orderId);
    localStorage.setItem("responseId",allData.orderId);
    localStorage.setItem("responseName",allData.contact.lastName);
    localStorage.setItem("responseFname",allData.contact.firstName);
    localStorage.setItem("responseMail",allData.contact.email);
    localStorage.setItem("responseAdress",allData.contact.address);
    localStorage.setItem("responseCity",allData.contact.city);
    
    

//-----------Redirection vers la page confirmation-------------------------

 window.location="index_confirmation.html";

}

}catch{
    console.log(e)
}
})









});


