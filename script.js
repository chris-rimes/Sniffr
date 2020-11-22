const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;
const query = 'dog';

// Unsplash API
let initialCount = 5;
const apiKey = "d1ycUW3RoubfnYFd95rnJ-SRloFDkQxebZh9xw5Kpa8";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${query}&count=${initialCount}&orientation=portrait`;

// Update API with new count
function updateAPIURLWithNewCount (picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&query=${query}&count=${picCount}&orientation=portrait`;
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Add bootstrap card elements to <img>'s
function addCard(image){
  // create elements
  const card = document.createElement('div');
  const cardBody = document.createElement('div'); 
  const like = document.createElement('a'); 
  const dislike = document.createElement('a');

  // add classes to elements
  card.classList.add('card');
  image.classList.add('card-img-top');
  cardBody.classList.add('card-body');
  like.classList.add('btn');
  like.classList.add('btn-light');
  dislike.classList.add('btn');
  dislike.classList.add('btn-light');
  

  // add elements to document
  card.appendChild(image);
  card.appendChild(cardBody);
  cardBody.appendChild(like);
  cardBody.appendChild(dislike);
  imageContainer.appendChild(card);

  like.innerHTML = "<img src='thumb-up.png'></img>"
  dislike.innerHTML = "<img src='thumb-down.png'></img>"
}

  

//  Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    // const item = document.createElement("a");
    // setAttributes(item, {
    //   href: photo.links.html,
    //   target: "_blank",
    // });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    addCard(img);

  });
}

// Get photos from Unsplah API
async function getphotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    // catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getphotos();
  }
});

// On Load
getphotos();
