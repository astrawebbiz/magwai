let headerMain = document.querySelector('.main-header');
let navMain = document.querySelector('.main-nav');
let navToggle = document.querySelector('.main-nav__toggle');
let cardsList = document.querySelector('.cards__list');
let downloadButton = document.querySelector('.cards__more-button');

let modalOpenButtons = document.querySelectorAll('.showModal');
let modalFade = document.querySelector('.modal-fade');
let modalWindow = document.querySelector('.modal');
let modalCloseButton = document.querySelector('.modal__close');

let sendFormButton = document.querySelector('.form__button');
let nameField = document.getElementById('add-name');
let phoneField = document.getElementById('add-phone');

let maxCardsCount = 30;
let step = 5;
let currentCardsCount = 10;

let downloadClick = () => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
  xhr.send();
  xhr.onload = () => (xhr.status !== 200) ? console.log(`Error ${xhr.status}: ${xhr.statusText}`) : loadCards(JSON.parse(xhr.response))
  xhr.onerror = () => console.log("Request failed");
};

downloadButton.addEventListener("click", downloadClick);

let modalOpenClick = () => {
  modalFade.style.display = 'block';
  modalWindow.style.display = 'block';
};

modalOpenButtons.forEach((item) => {
  item.addEventListener("click", modalOpenClick);
});

let modalCloseClick = () => {
  modalFade.style.display = 'none';
  modalWindow.style.display = 'none';
};

modalCloseButton.addEventListener("click", modalCloseClick);

let validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^(\+7|8)?(\d{10})$/;
  return phoneRegex.test(phoneNumber);
}

let validateFormFields = (event) => {
  event.preventDefault();
  let mistake = 0;
  if (nameField.value === '') {
    nameField.classList.add("input--error");
    mistake++;
  }
  if (phoneField.value === '') {
    phoneField.classList.add("input--error");
    mistake++;
  }
  if (!validatePhoneNumber(phoneField.value)) {
    phoneField.classList.add("input--error");
    mistake++;
  }
  if (mistake === 0) {
    document.querySelector('.form').remove();
    document.querySelector('.modal__success').style.display = 'block';
  }
};

sendFormButton.addEventListener("click", validateFormFields);
nameField.addEventListener("change", (e) => {
  e.target.classList.remove("input--error");
});
phoneField.addEventListener("change", (e) => {
  e.target.classList.remove("input--error");
});

let getOneCard = (title, description, userId) => {
  let random = Math.floor(Math.random() * 9 + 1);
  let themes = ['water','bridge','nature','','forest','water','bridge','nature','','forest'];
  let userNames = ['Eugenia','Valeria','Kate','Igor','Alex','Lev','Sasha','Olga','Pavel','Viktor'];
  const date = new Date().toDateString();
  return `<article class="cards__item card">
          <picture class="card__image">
            <source type="image/webp" media="(min-width: 1200px)" srcset="img/p${random}-desktop.webp, img/p${random}-desktop@2x.webp 2x">
            <source type="image/webp" media="(min-width: 768px)" srcset="img/p${random}-tablet.webp, img/p${random}-tablet@2x.webp 2x">
            <source type="image/webp" srcset="img/p${random}-mobile.webp, img/p${random}-mobile@2x.webp 2x">
            <source media="(min-width: 1200px)" srcset="img/p${random}-desktop.jpg, img/p${random}-desktop@2x.jpg 2x">
            <source media="(min-width: 768px)" srcset="img/p${random}-tablet.jpg, img/p${random}-tablet@2x.jpg 2x">
            <img src="img/p${random}-mobile.jpg" srcset="img/p${random}-mobile@2x.jpg 2x" width="329" height="185"
                 alt="${title}">
          </picture>
          <div class="card__wrapper">
              <div class="card__theme">
                ${themes[random]}
              </div>
              <h2 class="card__title">
                ${title}
              </h2>
              <div class="card__description">
                ${description}
              </div>
              <div class="card__information">
                Posted by <span class="card__user">${userNames[userId]}</span>, on <span class="card__date">${date}</span>
              </div>
              <button class="card__continue">Continue reading</button>
          </div>
        </article>`;
}

let loadCards = (cards) => {
  if (currentCardsCount >= maxCardsCount) {
    return;
  }
  let nextCardsPart = cards.slice(currentCardsCount-1, currentCardsCount+step-1);
  currentCardsCount += step;
  (currentCardsCount === maxCardsCount) ? downloadButton.remove() : '';
  let cardsHtml = nextCardsPart.map(card => getOneCard(card.title, card.body, card.userId));
  cardsList.innerHTML = cardsList.innerHTML + cardsHtml.join('');
}

headerMain.classList.remove('main-header--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});
