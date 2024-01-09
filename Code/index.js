// declaration of variables
const navbar = document.getElementById("nav");
const brandName = document.getElementById("brand");
const searchKey = document.getElementById("searchKey");
const searchBtn = document.getElementById("searchBtn");
const searchQuery = document.getElementById("searchQuery");
const column1 = document.getElementById("col-1");
const column2 = document.getElementById("col-2");
const column3 = document.getElementById("col-3");
const errorGrid = document.getElementById("errorGrid");
const modalBody = document.getElementById("modalBody");
const imageViewLink = document.getElementById("imageViewLink");

var orderByValue = '';

// APIs.
API_KEY = "Your_API_KEy";
apiUrl = "https://api.unsplash.com/photos/?client_id="+API_KEY+"&per_page=300";
searchUrl = "https://api.unsplash.com/search/photos/?client_id="+API_KEY+"&query=";

imageURLS = [];

window.onload = (event) => {
    fetchData();
}

const fetchData = async () => {

    var tempUrl = apiUrl;

    if(orderByValue != '') {
        tempUrl += ('&order_by='+orderByValue);
    }

    const response = await (fetch(apiUrl).catch(handleError));
    const myJson = await response.json();

    var imageArrays = myJson;

    imageArrays.forEach(element => {
        imageURLS.push(element.urls.small);
    });

    displayImage();

}

var handleError = function(err) {
    console.warn(err);
    errorGrid.innerHTML = "<h4>Unable to fetch data "+err+"</h5>";
}

function displayImage() {
    errorGrid.innerHTML = "";
    if(imageURLS.length == 0) {
        errorGrid.innerHTML = "<h4>Unable to fetch data.</h5>";
        return;
    }

    column1.innerHTML = "";
    column2.innerHTML = "";
    column3.innerHTML = "";

    imageURLS.forEach((url,index) => {
        // dynamic image tag 
        var image = document.createElement('img');
        image.src = url;
        image.className="pt-4";
        image.setAttribute("width", "100%");
        image.setAttribute("onclick","displayFullImage(this.src)");

        if( (index + 1) % 3 == 0 ) {
            column1.appendChild(image);
        }
        if( (index + 2) % 4 == 0 ) {
            column2.appendChild(image);
        }
        if( (index + 3) % 5 == 0 ) {
            column3.appendChild(image);
        }
        
    });

}

function displayFullImage(src) {

    // dynamic image tag 
    var image = document.createElement('img');
    image.src = src;
    image.className="mt-3";
    image.setAttribute("width", "100%");

    modalBody.innerHTML = "";
    modalBody.appendChild(image);

    imageViewLink.href=src;

    var myModal = new bootstrap.Modal(document.getElementById('modal'), {});
    myModal.show();
}

searchBtn.addEventListener("click",function() {

    if(searchKey.value != ''){
        fetchSearchData(searchKey.value);
    }

});

const fetchSearchData = async (key) => {

    imageURLS = [];

    var orderbyvar = orderByValue; 
    var tempUrl = searchUrl + key;

    if(orderbyvar != '') {
        tempUrl += ("&order_by="+orderbyvar);
    }

    searchQuery.innerHTML = searchKey.value;
    
    let response = await (fetch(tempUrl).catch(handleError));
    let myJson = await response.json();
    tempUrl += "&per_page="+myJson.total;

    response = await (fetch(tempUrl).catch(handleError));
    myJson = await response.json();

    console.log(myJson);

    var imageArrays = myJson.results;

    imageArrays.forEach(element => {
        imageURLS.push(element.urls.regular);
    });

    displayImage();

}

function orderBy() {
    orderByValue = document.getElementById("orderby").value;
    imageURLS = [];

    if(searchKey.value != '') {
        fetchSearchData(searchKey.value);
    }else {
        fetchData();
    }
}
document.addEventListener('DOMContentLoaded', function () {
    // Crear elementos de descripción
    var descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'container mt-3';
  
    var descriptionRow = document.createElement('div');
    descriptionRow.className = 'row';
  
    var descriptionCol = document.createElement('div');
    descriptionCol.className = 'col-lg-12';
  
    var descriptions = {
      'english': '<p>This web page is used for an image search engine, solely for visualization and download purposes.</p>',
      'spanish': '<p>Esta página web se utiliza para un motor de búsqueda de imágenes, únicamente con fines de visualización y descarga.</p>',
      'french': '<p>Cette page web est utilisée pour un moteur de recherche d\'images, uniquement à des fins de visualisation et de téléchargement.</p>'
    };
  
    var selectedDescriptionId = 'description-english';
  
    // Crear elementos de descripción
    var descriptionEnglish = document.createElement('div');
    descriptionEnglish.id = 'description-english';
    descriptionEnglish.innerHTML = descriptions['english'];
  
    var descriptionSpanish = document.createElement('div');
    descriptionSpanish.id = 'description-spanish';
    descriptionSpanish.style.display = 'none';
    descriptionSpanish.innerHTML = descriptions['spanish'];
  
    var descriptionFrench = document.createElement('div');
    descriptionFrench.id = 'description-french';
    descriptionFrench.style.display = 'none';
    descriptionFrench.innerHTML = descriptions['french'];
  
    descriptionCol.appendChild(descriptionEnglish);
    descriptionCol.appendChild(descriptionSpanish);
    descriptionCol.appendChild(descriptionFrench);
  
    descriptionRow.appendChild(descriptionCol);
    descriptionContainer.appendChild(descriptionRow);
  
    // Crear botones de idioma
    var languageButtonsContainer = document.createElement('div');
    languageButtonsContainer.className = 'btn-group';
    languageButtonsContainer.setAttribute('role', 'group');
  
    var languages = ['english', 'spanish', 'french'];
  
    languages.forEach(function (language) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn btn-secondary language-btn';
      button.setAttribute('data-language', language);
      button.innerHTML = language.charAt(0).toUpperCase() + language.slice(1);
      languageButtonsContainer.appendChild(button);
    });
  
    // Encontrar el elemento <nav> en el documento
    var navElement = document.querySelector('nav');
  
    // Insertar elementos después del elemento <nav>
    navElement.insertAdjacentElement('afterend', descriptionContainer);
    navElement.insertAdjacentElement('afterend', languageButtonsContainer);
  
    // Agregar eventos de clic a los botones de idioma
    var languageButtons = document.querySelectorAll('.language-btn');
  
    languageButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Ocultar todas las descripciones
        [descriptionEnglish, descriptionSpanish, descriptionFrench].forEach(function (description) {
          description.style.display = 'none';
        });
  
        // Obtener el idioma seleccionado del botón
        var selectedLanguage = button.getAttribute('data-language');
  
        // Mostrar la descripción correspondiente al idioma seleccionado
        var selectedDescription = document.getElementById('description-' + selectedLanguage);
        if (selectedDescription) {
          selectedDescription.style.display = 'block';
          selectedDescriptionId = selectedDescription.id;
        }
      });
    });
  });
  