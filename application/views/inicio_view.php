<input type="button" value="Click Mostrar Nombres" id="names"/>
<input type="button" value="Click Mostrar Animales" id="animales"/>
<input type="button" value="Click Ejecutar Etereral" id="plug"/>
<input type="text" id="iPlug"/>
<br />
<ul class="dataNombre">

</ul>
<!--Controller lista-->
<script type="text/javascript" src="<?php echo base_url("theme/js/jquery/ethereal/controllers"); ?>/controllers.js"></script>
<!--parent de lista-->
<div id="lista-nombres">
    <h4>Listado de nombres</h4>
</div>
<div class="lista-animales">
    <h4>Listado de Animales</h4>
</div>
<div id="parent">
    <h4>Listado de click</h4>
</div>
<script>
    $(document).ready(function () {
       
        $('#plug').on('click', function () {
           // mostrarDad();
        });
    });
    function mostrarDad() {
        $.get("http://" + document.domain + "/inicio/mostrarnombres")
                .done(function (data) {
                    $.each(data, function (i, datos) {
                        $('#parent').append('<p>' + datos.names + '</p>');
                        $('#parent').append('<p>' + datos.names + '</p>');
                        $('#parent').append('<p>' + datos.names + '</p>');
                    });
                })
                .fail(function () {
                })
                .always(function () {
                });
    }
</script>
