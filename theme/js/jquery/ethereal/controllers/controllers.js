//determino el objeto etherealk
var ethereal = $(document).ethereal();
//configurar mi ethereal
ethereal.config({
    urlView: "http://www.ethereal.pro/theme/js/jquery/ethereal/views/"
});
//Creacion de controllador de lista
//jQuery("#lista-nombres").empty();
ethereal.controller({
    controller: "lista_nombres",
    view: "lista-ul",
    url: "http://" + document.domain + "/inicio/mostrarnombres",
    //json: [{names: "Luis"}],
    type: "POST",
    parent: "#lista-nombres",
    onEvent: {
        click: "#names",
        keypress: "#iPlug",
        mouseout: "#animales"
    },
    params: {id: "1"},
    done: function (dataJson, view, id) {
    },
    fail: function () {
    },
    beforeSend: function () {
    },
    always: function () {
    }
});

//console.log(eth);