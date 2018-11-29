(function(){
    // Превью аватара
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    var avatar = document.querySelector('.notice__photo');
    var fileChooser = avatar.querySelector('.upload input[type=file]');
    var preview = document.querySelector('.preview');

    fileChooser.addEventListener('change', function(){
        var file = fileChooser.files[0];
        var fileName = file.name.toLowerCase();

        var matches = FILE_TYPES.some(function(it){
            return fileName.endsWith(it);
        });

        if(matches){
            var reader = new FileReader();

            reader.addEventListener('load', function(){
                preview.src = reader.result;
            });

            reader.readAsDataURL(file);
        }
    });

    // Превью сразу нескольких фото для загрузки в объявление
    var photo = document.querySelector('.form__photo-container');
    var photoChooser = photo.querySelector('.upload input[type=file]');

        var createPhotoPreviewElem = function (src) {
            var image = document.createElement('img');
            image.classList.add('photo-preview');
            image.src = src.target.result;

            photo.appendChild(image);
        };

        var renderPhotos = function () {

            for (var i = 0; i < photoChooser.files.length; i++) {
                var file = photoChooser.files[i];
                var fileName = file.name.toLowerCase();

                var matches = FILE_TYPES.some(function (it) {
                    return fileName.endsWith(it);
                });
                console.log(fileName, matches);
                if (matches) {
                    var reader = new FileReader();

                    reader.addEventListener('load', createPhotoPreviewElem);

                    reader.readAsDataURL(file);
                }
            }
        };
    photoChooser.addEventListener('change', renderPhotos);


})();