<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Inicio extends CI_Controller {

    //cargar la vista
    public function index() {
        //header 
        $this->load->view('recursos/header_view');
        $this->load->view('inicio_view');
        $this->load->view('recursos/footer_view');
    }

    //funcion para imprimir json
    public function mostrarNombres() {

        $dataNombre = array(
            array("names" => "Luis"),
            array("names" => "Fernando"),
            array("names" => "Jose"),
            array("names" => "Maria"),
            array("names" => "Linda"),
            array("names" => "Erica"),
            array("names" => "Leonardo")
        );

        echo json_encode($dataNombre, JSON_FORCE_OBJECT);
    }

    //funcion para imprimir json
    public function mostrarAnimales() {
        $dataNombre = array(
            array("names" => "Jirafas"),
            array("names" => "Elefante"),
            array("names" => "Cocodrilo"),
            array("names" => "Gato"),
            array("names" => "Perro"),
            array("names" => "Ratón"),
            array("names" => "Leon")
        );

        echo json_encode($dataNombre, JSON_FORCE_OBJECT);
    }

}
