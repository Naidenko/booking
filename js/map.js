(function(){
        var dialogHandler = document.querySelector('.map__pin--main');

    dialogHandler.addEventListener('mousedown', function (evt){
        evt.preventDefault();

        var startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };

        var onMouseMove = function(moveEvt) {
            moveEvt.preventDefault();

            var shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };

            dialogHandler.style.top = (dialogHandler.offsetTop - shift.y) + 'px';
            dialogHandler.style.left = (dialogHandler.offsetLeft - shift.x) + 'px';
            locationY = (dialogHandler.offsetTop - shift.y) - PIN_HEIGHT;
            locationX = (dialogHandler.offsetLeft - shift.x) - PIN_WIDTH/2;
            labelAddress(locationY, locationX);


            //Ограничение передвижения пина по размерам карты
            if((dialogHandler.offsetTop - shift.y) < 130){
                dialogHandler.style.top = 130 + 'px';
            }
            if((dialogHandler.offsetTop - shift.y) > 630){
                dialogHandler.style.top = 630 + 'px';
            }
            if((dialogHandler.offsetLeft - shift.x) < (0 + PIN_WIDTH)){
                dialogHandler.style.left = (0 + PIN_WIDTH) + 'px';
            }
            if((dialogHandler.offsetLeft - shift.x) > (1200 - PIN_WIDTH)){
                dialogHandler.style.left = (1200 - PIN_WIDTH) + 'px';
            }

            //Ограничение координат по размерам карты
            if(locationY < 130){
                locationY = 130;
            }
            if(locationY > 630){
                locationY = 630;
            }
            if(locationX < (0 + PIN_WIDTH)){
                locationX = (0 + PIN_WIDTH);
            }
            if(locationX > (1200 - PIN_WIDTH)){
                locationX = (1200 - PIN_WIDTH);
            }
        };

        var onMouseUp = function(upEvt){
            upEvt.preventDefault();

            labelAddress(locationY, locationX);

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
})();