(function() {
    var title = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
    var type = ['palace', 'flat', 'house', 'bungalo'];
    var check = ['12:00', '13:00', '14:00'];
    var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
    var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg", "https://s00.yaplakal.com/pics/pics_original/6/7/4/8380476.jpg", "https://takprosto.cc/wp-content/uploads/p/planirovka-malenkoy-kvartiry/1.jpg", "https://www.remont-f.ru/upload/resize_cache/iblock/b2d/520_400_1/002.JPG", "http://kvartirastudio.ru/design-interior/img/1178-kvartira-38m.jpg", "https://i.ytimg.com/vi/c0fvhMgKtkY/maxresdefault.jpg", "https://interiorsmall.ru/wp-content/uploads/dizayn-kvartiry-meneye-50-m2-48.jpg"];

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    var randomItem = function(items) {
        return items[Math.floor(Math.random()*items.length)];
    };

    var randomArr = function(items) {
        var arr = [];
        for (var i=0; i < Math.ceil(Math.random()*items.length); i++){
            var randomItem = items[Math.floor(Math.random()*items.length)];
            if (arr.indexOf(randomItem) == -1) {
                arr.push(randomItem);
            }
        }
        return arr;
    };

    var randomPhoto = function(items) {
        var arr = [];
        for (var i=0; i < 3; i++){
            var randomItem = items[Math.floor(Math.random()*items.length)];
            if (arr.indexOf(randomItem) == -1) {
                arr.push(randomItem);
            }
        }
        return arr;
    };

    var compileTemplate = function(values, i, photos) {
        var ad = {
            "author": {
                "avatar": "img/avatars/user{{xx}}.png"
            },
            "offer": {
                "title": title[i],
                "address": "{{location.x}}, {{location.y}}",
                "price": getRandomInt(1000, 1000000),
                "type": randomItem(type),
                "rooms": getRandomInt(1,5),
                "guests": getRandomInt(1,3),
                "checkin": randomItem(check),
                "checkout": randomItem(check),
                "features": randomArr(features),
                "description": '',
                "photos": randomPhoto(photos),
                "location": {
                    "x": getRandomInt(300,900),
                    "y": getRandomInt(130,630)
                }
            }
        };

        ad.author.avatar = ad.author.avatar.replace('{{xx}}', values.xx);
        ad.offer.address = ad.offer.address.replace('{{location.x}}', values.location.x);
        ad.offer.address = ad.offer.address.replace('{{location.y}}', values.location.y);
        return ad;
    };

    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var randomIndex = Math.floor(Math.random() * (i + 1));
            var tempValue = array[i];
            array[i] = array[randomIndex];
            array[randomIndex] = tempValue;
        }
        return array;
    }

    var values = [
        {
            xx : '01',
            location: {
                x: 100,
                y: 200
            }
        },
        {
            xx : '02',
            location: {
                x: 300,
                y: 700
            }
        },{
            xx : '03',
            location: {
                x: 400,
                y: 200
            }
        },{
            xx : '04',
            location: {
                x: 600,
                y: 200
            }
        },{
            xx : '05',
            location: {
                x: 700,
                y: 140
            }
        },{
            xx : '06',
            location: {
                x: 165,
                y: 201
            }
        },{
            xx : '07',
            location: {
                x: 450,
                y: 265
            }
        },{
            xx : '08',
            location: {
                x: 165,
                y: 278
            }
        }
    ];


    window.authors = [];

    for(var i=0; i<8; i++) {
        var cloned = Array.from(shuffle(photos));
        authors.push(compileTemplate(values[i],i,cloned));
    }


    window.pins =[];

    var successHandler = function(data){
        pins = data;
        // window.render(pins);
    };

    var errorHandler = function (errorMessage) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
    };

    var url = 'https://holysale.ru/code_and_magic/get_cards.php';
    window.load(successHandler, errorHandler, url);

    var filterPins = function(){
        //изначально все пины нам подходят (поместить все пины в функцию)
        var filteredPins = window.pins;
        //Повесить функцию на event изменения инпутов
        //в этой функции получить все значения и консоль лог их
        var type = document.querySelector('#housing-type').value;
        //отфильтровать
        if(type !== 'any'){
            filteredPins = filteredPins.filter(function (value) {
                return value.offer.type === type;
            });
        }

        var price = document.querySelector('#housing-price').value;

        if(price !== 'any'){
            filteredPins = filteredPins.filter(function (value) {
                var flatPrice = value.offer.price;
                if(flatPrice <= 10000) {
                    flatPrice = "low";
                } else if (flatPrice > 10000 && flatPrice <= 50000) {
                    flatPrice = "middle";
                } else if (flatPrice > 50000 ) {
                    flatPrice = "high";
                }
                return flatPrice === price;
            });
        }

        var rooms = document.querySelector('#housing-rooms').value;
        //отфильтровать
        if(rooms !== 'any'){
            filteredPins = filteredPins.filter(function (value) {
                return value.offer.rooms == rooms;
            });
        }

        var guests = document.querySelector('#housing-guests').value;
        //отфильтровать
        if(guests !== 'any'){
            filteredPins = filteredPins.filter(function (value) {
                return value.offer.guests == guests;
            });
        }

        //найти выбранные
        var selectedFeatures = document.querySelectorAll('#housing-features input:checked');

        //получить выбранные без слова фильтр в массив (загуглить js string.replace)
        if(selectedFeatures.length > 0) {
            filteredPins = filteredPins.filter(function (value) {
                var flatFeatures = value.offer.features;
                // проверить, чтобы все выбранные фичи были в квартире
                for (var i = 0; i < selectedFeatures.length; i++) {
                    if (flatFeatures.indexOf(selectedFeatures[i].value) == -1) {
                        return false;
                    }
                }
                return true;
            });

        }

        //передать отфильтрованные в функцию рендер
        window.render(filteredPins);

    };

    //загуглить как получить все элементы js nodelist
    //загуглить как получить js id node

    var type = document.querySelector('#housing-type');

    type.addEventListener('change', function(evt){
        filterPins();
    });

    var price = document.querySelector('#housing-price');

    price.addEventListener('change', function(evt){
        filterPins();
    });

    var rooms = document.querySelector('#housing-rooms');

    rooms.addEventListener('change', function(evt){
        filterPins();
    });

    var guests = document.querySelector('#housing-guests');

    guests.addEventListener('change', function(evt){
        filterPins();
    });

    var features = document.querySelectorAll('#housing-features input');

    for (var i = 0; i < features.length; i++) {
        features[i].addEventListener('change', function(evt){
            filterPins();
        });

    }


    var SetupDialogElement = document.querySelector('.notice');
    var form = SetupDialogElement.querySelector('.notice__form');

    form.addEventListener('submit', function(evt){
        window.formfff = form;
        evt.preventDefault();
        window.upload(new FormData(form), function(response){
            form.reset();
        });
    });
})();