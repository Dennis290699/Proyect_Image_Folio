jQuery(document).ready(function ($) {
    $(".slider-img").on("click", function () {
        $(".slider-img").removeClass("active");
        $(this).addClass("active");
    });

    $(".about-more-button").on("click", function () {
        const personDetails = $(this).closest(".slider-img");
        const modal = personDetails.find(".modal");

        // Realiza una solicitud AJAX para cargar el archivo JSON
        $.getJSON("./js/info.json", function (data) {
            const personInfo = data.personas[personDetails.index()];

            // Asigna la imagen al elemento img en el modal
            modal.find(".modal-image").attr("src", personInfo.imagen);
            modal.find(".modal-first-name").text(personInfo.nombre);
            modal.find(".modal-last-name").text(personInfo.apellido);
            modal.find(".modal-sex").text(personInfo.sexo);
            modal.find(".modal-age").text(personInfo.edad);
            modal.find(".modal-height").text(personInfo.estatura);
            modal.find(".modal-marital-status").text(personInfo.estado_civil);
            modal.find(".modal-about-me").text(personInfo.text_about_me);
            modal.find(".modal-title").text(personInfo.título);
            modal.find(".modal-job-title").text(personInfo.cargo_laboral);
            modal.find(".modal-qualities").text(personInfo.cualidades);
            modal.find(".modal-hobbies").text(personInfo.hobbies);
            modal.find(".modal-pasatiempos").text(personInfo.pasatiempos);

            // Establecer un índice de imagen actual y mostrar la primera imagen.
            let currentImageIndex = 0;
            const modalImage = modal.find(".modal-image");

            function showImage(index) {
                modalImage.css("opacity", 0); // Oculta la imagen
                setTimeout(function () {
                    modalImage.attr("src", personInfo.imagenes[index]);
                    modalImage.css("opacity", 1); // Muestra la nueva imagen
                }, 300); // Espera 500 ms antes de mostrar la nueva imagen (igual al tiempo de transición)
            }

            // Mostrar la primera imagen al abrir el modal.
            showImage(currentImageIndex);

            // Establecer un temporizador para cambiar automáticamente las imágenes cada cierto tiempo.
            const imageChangeInterval = 3000; // Cambia de imagen cada 3 segundos (ajusta el tiempo según tus preferencias).

            function autoChangeImage() {
                currentImageIndex = (currentImageIndex + 1) % personInfo.imagenes.length;
                showImage(currentImageIndex);
            }

            const imageChangeTimer = setInterval(autoChangeImage, imageChangeInterval);

            // Detener el temporizador cuando se cierra el modal.
            modal.on("click", function (e) {
                if (e.target === this) {
                    modal.hide();
                    clearInterval(imageChangeTimer); // Detiene el temporizador al cerrar el modal.
                }
            });

            // Resto del código para mostrar otros detalles de la persona.
            modal.show();
        });
    });

    $(".close-button").on("click", function () {
        $(".modal").hide();
    });
});