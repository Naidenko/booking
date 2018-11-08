(function(){
    var addForm = document.querySelector('.notice__form');
    var fieldsetAll = addForm.querySelectorAll('fieldset');
    var addressInput = document.querySelector('#address');

    for(var i=0; i<fieldsetAll.length; i++) {
        fieldsetAll[i].disabled = true;
    }

    window.activePage = function() {
        document.querySelector('.map').classList.remove('map--faded');
        addForm.classList.remove('notice__form--disabled');
        for(var i=0; i<fieldsetAll.length; i++) {
            fieldsetAll[i].disabled = false;
        }

    };

    window.labelAddress = function(top, left) {
        addressInput.value = top +', ' + left;
    };
})();