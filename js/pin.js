(function() {
    window.PIN_WIDTH = 40;
    window.PIN_HEIGHT = 40;

    window.similarListPin = document.querySelector('.map__pins');
    var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

    var renderPin = function (author) {
        var pinElement = similarPinTemplate.cloneNode(true);

        pinElement.style.left = author.offer.location.x - PIN_WIDTH / 2 + 'px';
        pinElement.style.top = author.offer.location.y - PIN_HEIGHT + 'px';
        pinElement.children[0].src = author.author.avatar;
        pinElement.children[0].alt = author.offer.title;
        // pinElement.dataset.index = i;
        pinElement.classList.add('pin__button');


        pinElement.addEventListener('click', function () {
            var previousCard = document.querySelector('.map__card');
            if (previousCard) {
                previousCard.remove();
            }
            fragmentCard.appendChild(renderCard(author));
            var elementBefore = similarListCard.querySelector('.map__filters-container');
            similarListCard.insertBefore(fragmentCard, elementBefore);

            var popupCard = document.querySelector('.map__card');
            var popupClose = popupCard.querySelector('.popup__close');


            popupClose.addEventListener('click', function () {
                popupCard.remove();
            });
        });

        return pinElement;
    };

    var mainPin = document.querySelector('.map__pin--main');

    var firstLoad = function () {
        activePage();
        labelAddress(600, 400);

        window.load(successHandler, errorHandler);
        mainPin.removeEventListener('mouseup', firstLoad);
    };

    mainPin.addEventListener('mouseup', firstLoad);

    var successHandler = function (authors) {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < authors.length; i++) {
            fragment.appendChild(renderPin(authors[i]));
        }
        similarListPin.appendChild(fragment);
    };

    var errorHandler = function (errorMessage) {
        var node = document.createElement('div');
        node.style = 'z-index; 100; margin: 0 auto; text-align: center; background-color: red;'
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
    };

    function translateType(type) {
        switch (type) {
            case 'palace':
                return 'Дворец';
            case 'flat':
                return 'Квартира';
            case 'bungalo':
                return 'Бунгало';
            case 'house':
                return 'Дом';
            default:
                return type;
        }
    }

    var similarListCard = document.querySelector('.map');
    var similarCardTemplate = document.querySelector('template').content.querySelector('.map__card');

    var renderCard = function (card) {
        var cardElement = similarCardTemplate.cloneNode(true);

        cardElement.querySelector('.popup__avatar').src = card.author.avatar;

        cardElement.querySelector('.popup__title').textContent = card.offer.title;
        cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
        cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
        cardElement.querySelector('.popup__type').textContent = translateType(card.offer.type);
        cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
        cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ' ,выезд до ' + card.offer.checkout;
        removeChilds(cardElement.querySelector('.popup__features'));                // Удаляем иконки удобств, выведенные по умолчанию
        cardElement.querySelector('.popup__features').appendChild(generateIconsFeatures(card.offer.features));
        cardElement.querySelector('.popup__description').textContent = card.offer.description;

        function removeChilds(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }

        // Создаем иконку удобств
        function createIconFeature(feature) {
            var iconFeature = document.createElement('li');
            iconFeature.classList.add('feature');
            iconFeature.classList.add('feature--' + feature);
            var spanFeature = document.createElement('span');
            iconFeature.appendChild(spanFeature);
            spanFeature.classList.add('feature__image');
            spanFeature.classList.add('feature__image--' + feature);
            return iconFeature;
        }

        // Проходим по всему массиву
        function generateIconsFeatures(arrayFeatures) {
            var fragment = document.createDocumentFragment();
            for (var i = 0; i < arrayFeatures.length; i++) {
                var feature = createIconFeature(arrayFeatures[i]);
                fragment.appendChild(feature);
            }
            return fragment;
        }


        //формируется список фото
        for (var i = 0; i < card.offer.photos.length; i++) {

            var photoLi = cardElement.querySelector('.popup__photos').children[0].cloneNode(true);

            photoLi.children[0].src = card.offer.photos[i];
            cardElement.querySelector('.popup__photos').appendChild(photoLi);

        }
        cardElement.querySelector('.popup__photos').children[0].remove();
        return cardElement;

    };
    var fragmentCard = document.createDocumentFragment();

    var similarList = document.querySelector('.map__pins');

    window.render = function (data) {
        var pins = similarList.querySelectorAll('.pin__button');
        for (var i = 0; i < pins.length; i++) {
            pins[i].remove();
        }
        for (var i = 0; i < data.length; i++) {
            similarList.appendChild(renderPin(data[i]));
        }
    };
})();