//-----------------trouver un article avec son id ----------
const idProduct = window.location.search.replace("?","");
console.log(idProduct)

let selectedProduct="";
let idForm;
let idFormQuantity;

fetch(`http://localhost:3000/api/cameras/${idProduct}`).then(function(response){

if (response.ok){
    response.json().then(function(data) {
        selectedProduct = data;
         showDetailProducts(data)
       });
}else{
    alert("impossible de récupérer les données")

}}
).catch(function(error) {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
  });

 
  function showDetailProducts(product) {
    let domElement = document.querySelector(".container_article")
     let lensesHtml = `
     <label class="lenses-section marge">Lentilles :</label>
     <select class="option_lentilles">
     </select>`;

     let quantityHtml = `
   <label class="marge">Quantité :</label>
  <button class="btn" onclick="decrement()">
  -
 </button>
  <input type="number" readonly value="1" id="field-quantity">
 <button class="btn" onclick="increment()">
  +
 </button>
</div>
`;
  
        let html =`
        <div class="card_1">
         <img src="${product.imageUrl}" alt="photo"/>
         </div>
         <div class="card2">
         <h4 class="marge">${product.name}</h4>
         <p class="marge">Ref : ${product._id}</p>
         <p class="marge">${product.description}</p>
         ${lensesHtml}
         ${quantityHtml}

         </div>
         <div class="endcard text-center">
         <h4>Prix :</h4>
         <p class="price">${product.price /100},00 €</p>
         <button class="ajout">Ajouter au panier</button>
         </div>
          `;
          domElement.innerHTML=html;

    
    

    
    
//-----adaption aux option des lentilles par article---------------
const choixlentilles = product.lenses;
let = structureOptions = []

//----boucle pour gérer les choix--------
for (let j = 0; j < choixlentilles.length;j++){
    structureOptions = structureOptions +
    `
    <option value="${choixlentilles[j]}">${choixlentilles[j]}</option>
    `;
}
//-------Affichage en html du choix des lentilles--------------------
const positionChoix1 = document.querySelector(".option_lentilles");
positionChoix1.innerHTML = structureOptions;
console.log(positionChoix1);
  //--------sélection du bouton ajouter au panier ------------
  const btn_envoyerPanier = document.querySelector(".ajout");
 idForm= document.querySelector(".option_lentilles");
 idFormQuantity = document.querySelector("#field-quantity");
  //-------envoie du panier---------------------
  btn_envoyerPanier.addEventListener("click", (event)=>{
      event.preventDefault();
  
  //----------Variable choix utilisateur--------
      const choixForm = idForm.value;
      const choixForm1 = idFormQuantity.value;
      console.log(choixForm);
  
  //-------------Récuparations des données du panier-----------
  let products ={
      name :product.name,
      id :product._id,
      imageUrl :product.imageUrl,
      lenses : choixForm,
      quantity : choixForm1,
      price : product.price,
     
  }
  
  console.log(products);
  
  //----------stockage des donnés dans le localStorage----------------------
  
  let productInTheLocalStorgage=JSON.parse(localStorage.getItem("products"));
  
  if(productInTheLocalStorgage){
      productInTheLocalStorgage.push(products);
      localStorage.setItem("products", JSON.stringify(productInTheLocalStorgage));
  
  }
  else{
      productInTheLocalStorgage=[];
      productInTheLocalStorgage.push(products);
      localStorage.setItem("products", JSON.stringify(productInTheLocalStorgage));
      console.log(productInTheLocalStorgage);
  }

   let confirmed= confirm ("Produit ajouté dans le panier avec succés. Souhaitez-vous voir votre panier ? ")
   if (confirmed){
       location.href="./index-panier.html"
   }
   console.log(confirmed);
  });





}

 idFormQuantity = document.querySelector("#field-quantity");

//------gestion bouton quantity----------------------------
function increment(){
    let val = document.querySelector("#field-quantity").value;
    document.querySelector("#field-quantity").value = parseInt(val) + 1;
  };
  
  function decrement(){
    let val = document.querySelector("#field-quantity").value;
    if(parseInt(val) >= 2){
       document.querySelector("#field-quantity").value = parseInt(val) - 1;
    };
  }

