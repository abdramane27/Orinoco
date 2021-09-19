//-----------Déclarer la fonction pour obtenir les produits--------------------
function getProducts() {
    var headers = new Headers();

var options = { method: 'GET',
               headers: headers,
               mode: 'cors',
               cache: 'default' };
//----api cameras-----
fetch('http://localhost:3000/api/cameras', options)
.then(function(response) {
    if(response.ok) {
        response.json().then(function(data) {
        showProducts(data);
        });
      } else {
        console.log('Mauvaise réponse du réseau');
      }
})
.catch(function(error) {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
  });
    
}
//---------fonction qui affiche les produits--------------------
function showProducts(products) {
    console.log(products)
    let domElement = document.querySelector(".container-products")
    for(let product of products){
        domElement.innerHTML +=`
        <div class="card text-center">
         <div class="card-picture">
         <img src="${product.imageUrl}" alt="photo"/>
         </div>
         <a href="article.html?${product._id}" >
         <div class="info">
         <h4>${product.name}</h4>
         <p>${product.description}</p>
         <button>Voir l'article</button>
         </div>
         </div>
         </a>
        
         `;
    }
}

    
getProducts();