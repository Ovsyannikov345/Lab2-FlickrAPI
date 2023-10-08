const apiUrl = 'https://api.flickr.com/services/rest/';
const apiKey = '0a3b174ab3f2f028848d25478f512da7';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const clearInput = document.getElementById('clear-input');

const gallery = document.querySelector('.gallery');

window.addEventListener("DOMContentLoaded", () => {
    searchInput.focus();
})

searchButton.addEventListener('click', () => {
    searchPhotos();
});

searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchPhotos();
    }
});

clearInput.addEventListener('click', () => {
    searchInput.value = '';
});

function getRandomPhotos() {

    const randomUrl = `${apiUrl}?method=flickr.photos.getRecent&api_key=${apiKey}&per_page=12&format=json&nojsoncallback=1&safe_search=1`;

    fetch(randomUrl)
        .then((response) => response.json())
        .then((data) => {
            const photos = data.photos.photo;        
            photos.forEach((photo) => {
                const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                const imageAlt = photo.title;
                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = imageAlt;

                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');
                galleryItem.appendChild(image);

                gallery.appendChild(galleryItem);
            });
        })
        .catch((error) => {
            console.error('Error while loading images:', error);
        });
}

function searchPhotos() {
    const searchText = searchInput.value;
    if (searchText.trim() === '') {
        return;
    }

    gallery.innerHTML = '';

    const url = `${apiUrl}?method=flickr.photos.search&api_key=${apiKey}&text=${searchText}&per_page=12&format=json&nojsoncallback=1&safe_search=1`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const photos = data.photos.photo;
            photos.forEach((photo) => {
                const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                const imageAlt = photo.title;
                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = imageAlt;

                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');
                galleryItem.appendChild(image);

                gallery.appendChild(galleryItem);
            });
        })
        .catch((error) => {
            console.error('Error while loading images:', error);
        });
}

getRandomPhotos();