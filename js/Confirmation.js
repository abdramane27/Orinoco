let order_id = localStorage.getItem('responseId');
console.log(order_id);

let order_name = localStorage.getItem('responseName');
console.log(order_name);

let order_fname = localStorage.getItem('responseFname');
console.log(order_fname);

let order_adress = localStorage.getItem('responseAdress');
console.log(order_adress);

let order_email = localStorage.getItem('responseMail');
console.log(order_email);

let order_city = localStorage.getItem('responseCity');
console.log(order_city);

let order_Price = localStorage.getItem('prixTotal')

const afficherConfirm =()=>{
let showConfirm = document.querySelector(".container-confirm");

let structureConfirm =`<div class="ref">
<h3>Référence : ${order_id}</h3>
</div>
<div class="resume text-center"><p>Merci <span>${order_name} ${order_fname}</span> pour votre commande chez Orinoco !</br>

Un e-mail de confirmation vous sera très prochainement envoyé à l'adresse <span>${order_email}</span></br>
contenant le résumé de votre commande et les informations de livraison à votre adresse
<span>${order_adress}</span> à <span>${order_city}</span> !</p></div>

<div class="rappel text-center"><h4 class="price">Montant total de votre commande : <span>${order_Price /100},00€</span></h4></div>

`;
showConfirm.insertAdjacentHTML("afterend", structureConfirm);


};
afficherConfirm()

localStorage.clear();
