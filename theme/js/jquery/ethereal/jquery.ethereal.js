/* 
 * Copyright (c) 2015 YARA WEB-DEVELOPER
 * 
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * Ethereal
 * V. 1.0
 * 
 */
(function () {
    /*
     * 
     * @param urlView Es la url donde se encuentran alamacenadas las vistas
     */
    var conf_ = {
        urlView: ""
    };
    /*Variable para registrar controladores en el sistema
     */
    var controllers = new Array();
    //métodos de etereal ethereal
    var methods = {
        init: function (conf_user) {
            //opciones sin parametros
            conf_ = $.extend(conf_, conf_user);
            return this;
        }
    };
    /**
     * Inicializador de ethereal
     * Determina los métodos que se ejecutarán
     */
    $.fn.ethereal = function (method) {
        // Si existe la función la llamamos
        if (methods[method]) {
            return methods[ method ]
                    .apply(this,
                            Array.prototype.slice.call(arguments, 1)
                            );
        } else if (typeof method === 'object' || !method) {
            //Si no se pasa ningún parámetro o el parámetro es 
            //un objeto de configuración llamamos al inicializador	
            return methods.init.apply(this, arguments);
        } else {
            //En el resto de los casos mostramos un error
            $.error('La función ' + method
                    + ' no existe en $.ethereal');
        }
    };
    /**
     * Configuraciones como:
     * urlView: url del dominio donde se van a almacenar las vistas de la aplicacion
     */
    $.fn.ethereal().config = function (conf_user) {
//configuraciones principales para ejcutar ethereal
        conf_ = $.extend(conf_, conf_user);
        //ejecutar basicos
        return this;
    };
    /**
     *     
     * Creacion de un controller   
     * @param Object conf_controller
     * @returns $ Object
     */
    $.fn.ethereal().controller = function (conf_controller) {
//realzar extends
//var data = _getData(conf_controller);
        var _conf_controller;
        this.each(function () {
            //Datos de ejecucion ethereal
            var _conf_ejecucion = {
                controller: null,
                view: null,
                url: null,
                json: null,
                type: "GET",
                parent: null,
                add: true,
                onEvent: null,
                params: {},
                done: function () {
                },
                fail: function () {
                },
                beforeSend: function () {
                }
            };
            //variable de configuracion del controlador
            _conf_controller = $.extend(_conf_ejecucion, conf_controller);
            //console.log(conf_controller);
            //recgistrar controller
            controllers[_conf_controller.controller] = _conf_controller;
            if (_conf_controller.onEvent !== null && _conf_controller.parent === null) {
                //alert("tienes un evento ;)");
                _addEvent(_conf_controller);
            } else {
                if (!_conf_controller.add) {
                    _addEvent(_conf_controller);
                } else {
                    if (_conf_controller.onEvent !== null && _conf_controller.parent !== null) {
                        //registrar los eventos
                        _addEvent(_conf_controller);
                    }
                    if (_conf_controller.json) {
                        _mostrarData(_conf_controller.json, _conf_controller);
                    } else {
                        getData(_conf_controller);
                    }
                }
            }
            //console.log(conf_controller);
            //this['dataController'] = _conf_controller;
            //console.log(_conf_controller);
        });
        //retornar datos
        //console.log(controllers);
        return this;
    };
    /**
     * 
     * @param {type} _conf_controller
     * @returns {jquery.ethereal_L11}
     */
    function _addEvent(_conf_controller) {
        //variable de controlador
        //car de controller
        var _conf_ejecucion = {
            controller: null,
            view: null,
            url: null,
            type: "GET",
            parent: null,
            add: true,
            onEvent: null,
            params: {},
            done: function () {
            },
            fail: function () {
            },
            beforeSend: function () {
            }
        };
        var conf_controller = $.extend(_conf_ejecucion, _conf_controller);
        //obtener la configuracion de los controladores
        //variables de los eventos
        var events = new Array();
        //var click = controller.onEvent.click;
        // console.log(controller.onEvent);
        $.each(conf_controller.onEvent, function (i, event) {
            //configuracion del evento
            var controller = new Object(_conf_controller);
            controller.add = true;
            //verificar si llama un evnto adicional
            if($.isArray(event)){
                alert("putos"); 
            }
            var _con_event = event.split('~');
            var _aditional_event = null;
            //console.log(i);
            if (_con_event[1]) {
            }
            //realizar los eventos
            events[i] = function () {
                getData(controller);
                //_aditional_event();
            };
            //console.log(_con_event);
            $(_con_event[0]).on(events);
        });
        //function para ejecutar los click
        /*if (click) {
         //si esta enviando más de un dato de array
         if ($.isArray(click)) {
         //iterar el array
         $.each(click, function (pos, data) {
         //si es un objeto
         if ($.isPlainObject(data)) {
         alert("Objeto");
         //objetos del click
         var event_click = {
         obj: null,
         view: controller.view,
         parent: controller.parent,
         done: function () {
         }
         };
         //combinar los eventos
         var _event = $.extend(event_click, data);
         //cambiar los objetos del controlador
         controller.view = _event.view;
         controller.parent = _event.parent;
         
         jQuery(event_click.obj).on('click', function () {
         getData(controller);
         console.log(controller);
         //ejecutar el callback
         event_click.done();
         });
         //console.log(_conf_controller);
         } else { //de lo contrario
         $(data).on('click', function () {
         getData(controller);
         });
         }
         //console.log(data);
         });
         } else {
         jQuery(click).on('click', function () {
         getData(controller);
         });
         }
         }*/

    }


    /******- ---------------Funciones propias del plugin----------------------*******/
    /**
     * Funcion get data para determinar el tipo de solicitud
     * @param javascriptObject _conf_controller
     */
    function getData(_conf_controller) {
        //data
        //Variable de solicitud
        var dataRequest = null;
        //obtener la para ejecutar la solicitud
        dataRequest = $.ajax({
            url: _conf_controller.url,
            type: _conf_controller.type,
            data: _conf_controller.params,
            dataType: "json",
            beforeSend: _conf_controller.beforeSend()
        });
        //console.log(_conf_data_json);
        dataRequest.done(function (data) {
            //alert("perfecto");
            //alert data
            //return data;
            //console.log(_conf_controller);
            _mostrarData(data, _conf_controller);
        });
        //creacion de perfeco
        dataRequest.fail(function (data) {
            //console.log(data.status);
            if (data.status === 404)
                $.error('Ethereal no puedo acceder a la url especificada');
        });
        return this;
    }

    /**
     * Funcion para iterar la vista y mostrar los datos
     * 
     * @param Object datos Es el json de los datos que se van a iterar
     */
    function _mostrarData(datos, _conf_controller) {
        //
        if (_conf_controller.view !== null) {

            //objeto para obtener la vista
            var viewRequest = $.post(conf_.urlView + _conf_controller.view + ".html");
//objeto de success
            viewRequest.done(function (views) {
                //buscar la vista de los datos
                var source = views;
                //Realizar el templte de los datso
                var template = Handlebars.compile(source);
                //convertir el htlml
                var html = $(template(datos));
                //tratar los html
                html.removeAttr('type');
                html.attr('id', _conf_controller.controller + "-view");
                //si existe se añade los datos
                if (_conf_controller.add === true) {
                    //si hay un parent
                    if (_conf_controller.parent !== null) {
                        //obtener parent
                        /*var parent = $(_conf_controller.parent).length;
                         if (parent > 0) {
                         $(_conf_controller.parent).append(html);
                         console.log(parent);
                         } else {
                         $('body').append("<div class='" + _conf_controller.parent + "'></div>").append(html);
                         }*/
                        $(_conf_controller.parent).append(html);
                        //console.log(_conf_controller);
                    } else {
                        $('body').append(html);
                    }
                }
                //ejecutar callback de done
                if ($.isFunction(_conf_controller.done)) {
                    //ejecutar el callback
                    _conf_controller.done(datos, html, _conf_controller.controller + "-view");
                }
                return html;
            });
            //objeto fail
            viewRequest.fail(function (dataView) {
                if ($.isFunction(_conf_controller.fail)) {
                    //ejecutar callback
                    _conf_controller.fail();
                }
                if (dataView.status === 404)
                    $.error('Ethereal no puedo encontrar la vista especificada');
            });
            //vista
        } else {
            //ejecutar callback de done
            if ($.isFunction(_conf_controller.done)) {
                //ejecutar el callback
                _conf_controller.done(datos, _conf_controller.controller + "-view");
            }
        }
        return this;
    }
})($);