(function() {
    var POST_URL = 'https://holysale.ru/code_and_magic/save.php';
    var GET_URL = 'https://holysale.ru/code_and_magic/get_cards.php';

    window.upload = function(data, onSuccess){
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function(){
            onSuccess(xhr.response);
        });

        xhr.open('POST', POST_URL);
        xhr.send(data);
    };


    window.load = function(onSuccess, onError, url){
        url = url || GET_URL;
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function(){
            if(xhr.status === 200){
                onSuccess(xhr.response);
            } else {
                onError('Стутус ответа: ' + xhr.status + ' ' + xhr.statusText);
            }
        });
        xhr.addEventListener('error', function(){
            onError('Произошла ошибка соединения');
        });
        xhr.addEventListener('timeout', function(){
            onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        });

        xhr.timeout = 10000;

        xhr.open('GET', GET_URL);
        xhr.send();
    };

})();

