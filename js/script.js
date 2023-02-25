
const modal = document.querySelector('.modal');
const activeImage = document.querySelector('#active-image');
const overlay = document.querySelector('.overlay');
const closeIcon = document.querySelector('#close');
const left1 = document.querySelector('#left')
const right1 = document.querySelector('#right')
let imageId = 0;
function displayImage(e) {
    activeImage.src = e.target.src;
    modal.style.display = 'block';
    overlay.style.display = 'block';
    imageId = Number(e.target.id.split('-').slice(-1))
    console.log(imageId)
    
}


function closeImage() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

closeIcon.addEventListener('click', closeImage);

overlay.addEventListener('click', closeImage);



document.addEventListener('DOMContentLoaded', async () => {
    let url = 'https://picsum.photos/v2/list/?page=3&limit=13';
    let result = await fetch(url).then((response) => { return response.json() }).catch(() => console.log('Error'))
    display(result)
    const imgs = document.querySelectorAll('.image img');
    imgs.forEach(img => img.addEventListener('click', displayImage));
    console.log(result)
})

function display(data) {
    let gallery = document.querySelector('.gallery');
    let text = '';
    data.forEach((element, index) => {
        let block = `
            <div class = "image"> 
            <img id = "img-${index+1}"src = "${element.download_url}">
            </div>`
        text += block;
    });
    gallery.innerHTML = text;

}



function left(){
    let count = document.querySelectorAll('.image').length

    imageId -= 1;
    if (imageId < 1) {
        imageId = count;
    }
    activeImage.src = document.getElementById(`img-${imageId}`).src;

}

function right() {
    let count = document.querySelectorAll('.image').length

    imageId += 1;
    if (imageId > count) {
        imageId = 1;
    }
    activeImage.src = document.getElementById(`img-${imageId}`).src;
    
}


left1.addEventListener('click', left);

right1.addEventListener('click', right);

document.onkeydown = function(e) {
    switch (e.key) {
        case 'ArrowLeft':
            left()
            break;
        case 'ArrowRight':
             right()
            break;
        case 'Escape':
             closeImage()
            break;  
    }
}
