const count = 10;
const apiKey = 'P2xCvzWLqPIJpR3Epxb8_x3dfuUgMpYBllQEKauK2Zg';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById('images');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];


function ImageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

async function DisplayPhotos() {
    totalImages = photosArray.length;
    imagesLoaded = 0;
    photosArray.forEach((photos) => {

        console.log(photos);
        const item = document.createElement('a');
        item.setAttribute('href', photos.links.html);
        item.setAttribute('target', '_blank');

        const img = document.createElement('img');
        img.setAttribute('src', photos.urls.regular);
        img.setAttribute('alt', photos.alt_description);
        img.setAttribute('title', photos.alt_description);

        item.appendChild(img);
        imageContainer.appendChild(item);

        img.addEventListener('load', ImageLoaded);
    });
}

async function GetPhoto() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        DisplayPhotos();
    } catch (error) {
        console.log('Snap!!! something went wrong');
    }
}


window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        GetPhoto();
        ready = false;
    }
});

GetPhoto();