$(document).ready(function () {
    //Codigo de plugin encontrado en:
    //https://github.com/t0m/select2-bootstrap-css/tree/bootstrap3
    $("#conocer").select2();
    $("#pais").select2();
    //El select2 me cambia el id y el value del html
    //Así que hasta que lo configure no aplicaré el plugin en provincia y localida

    //Reglas validación formulario
    //* Todos los campos con * son requeridos
    $('#validForm').validate({
        rules: {
            nombre: {
                required: true,
                spanishlettersspace: true
            },
            apellidos: {
                required: true,
                spanishlettersspace: true
            },
            //Al terminar de rellenar nombre y apellidos
            //se escriben por defecto en el campo "demandante"
            //Cambia el foco de apellido y llama a rellenaNombre

            //* Teléfono contendrá solo dígitos y un total de 9.
            telefono: {
                required: true,
                digits: true,
                minlength: 9,
                maxlength: 9
            },
            //* Comprobaremos que el usuario no exista previamente en la bbdd
            //  (NIF o email, el CIF no es necesario).

            //* email debe ser un correo electrónico válido
            //  (al menos en apariencia)
            email: {
                required: true,
                email: true,
                remote: "php/validar_email_db.php",
                minlength : 4		
            },
            reemail: {
                required: true,
                equalTo: email
            },
            //* Ponemos requerido a true, pero en realidad SIEMPRE va a haber
            //  una opcion seleccionada, sea por el usuario o la que deje
            //  por defecto
            conocer: {
                required: true
            },
            //* Por defecto estará marcado como demandante Particular
            //  y como Nombre (apartado Datos de facturación) la combinación de
            //  los campos Nombre y Apellidos de la información de contacto.
            //  Si el usuario selecciona como demandante Empresa,
            //  se borrará el contenido del campo “Nombre”,
            //  que pasará a llamarse “Empresa” para que el usuario lo rellene.

            //* Los campos CIF/NIF y Nombre/Empresa adecuarán su label
            //  en función del demandante seleccionado.

            //* Ponemos requerido a true, pero en realidad SIEMPRE va a haber
            //  una opcion seleccionada, sea por el usuario o la que deje
            //  por defecto
            demandante: {
                required: true
            },
            nom_emp: {
                required: true
            },
            cifnif: {
                required: true,
                nifES: function() {
                    if ($("#particular").is(':checked')) {
                        return true;
                    }
                },
                cifES: function() {
                    if ($("#empresa").is(':checked')) {
                        return true;
                    }
                },
                //cifES: true
                remote: "php/validar_nif_db.php"
            },
            direccion: {
                required: true
            },
            //* CP tendrán que ser 5 digitos.
            //  Si son menos se completará con 0 a la izquierda.

            //* Una vez insertado el código postal, se debe seleccionar
            //  la provincia y la localidad de forma automática.
            //  La localidad se rellenará con criterio libre.
            cp: {
                required: true,
                digits: true,
                maxlength: 5,
                //remote: "php/validar_cp_db.php"
                //Función para completar lanzada cuando cambia el foco
            },
            //* Si no encuentra una localidad que corresponda con ese código postal
            //  devuelve un valor de cero que el método "sinlocalidad" detecta para
            //  poder validar o no el campo
            localidad: {
                sinlocalidad:true
            },
            //* Ponemos requerido a true, pero provincia viene definido
            //  por el código postal, y código postal es obligatorio, así
            //  que aunque no saque mensaje SIEMPRE va a ser requerido
            provincia: {
                required: true
            },
            //* Ponemos requerido a true, pero en realidad SIEMPRE va a haber
            //  una opcion seleccionada, sea por el usuario o la que deje
            //  por defecto, en este caso: ESPAÑA
            pais: {
                required: true
            },
            //* El código IBAN debe ser válido

            cod_iban: {
                required: true,
                iban: true
            },
            //* Ponemos requerido a true, pero en realidad SIEMPRE va a haber
            //  una opcion seleccionada, sea por el usuario o la que deje
            //  por defecto
            modo_pago: {
                required: true
            },

            //* El usuario debe tener al menos 4 caracteres,
            //  se rellenará de modo automático con el correo electrónico
            //  y no podrá ser modificado.

            //* Ponemos requerido a true, pero usuario viene definido
            //  por el mail, y mail es obligatorio, así
            //  que aunque no saque mensaje SIEMPRE va a ser requerido
            usuario: {
                required: true,
                minlength: 4
            },
            //* La contraseña se debe forzar a que sea compleja.
            pass: {
                required: true,
                nivelComplejidad: true
            },
            repass: {
                required: true,
                equalTo: pass
            }
        },

        messages: {
            cifnif: {
                remote: "Este NIF ya esta en uso.",
            },
            email: {
                remote: "Este correo ya esta en uso.",
            }
        },

        //* Una vez pulsemos enviar en el formulario se mostrará un aviso
        //  al usuario de que se va a dar de alta y que se le pasará la
        //  primera cuota de 50€, 140€ o 550€ según corresponda (forma de pago).
        //  El usuario podrá cancelar la operación.

        submitHandler: function () {
            var pago;
            if ($("#modo_pago_0").is(':checked')) {
                pago="mensual será de 50€";
            }
            if ($("#modo_pago_1").is(':checked')) {
                pago="trimestral será de 140€";
            }
            if ($("#modo_pago_2").is(':checked')) {
                pago="anual será de 550€";
            }


            var alerta=confirm('Va a ser dado de alta y su próxima cuota de tipo '+pago+' ¿Desea continuar?');
            if(alerta==true){
                alert("Ha sido dado de alta corectamente");
                window.location.href = "index.html";
            }else{
                alert("Ha cancelado la operación");
                window.location.href = "index.html";
            }
        }
    });

    //  Funcion para completar el codigo postal con ceros
    //  y leer los dos primeros digitos para seleccionar la provincia adecuada
    function leeCodPos(){
        var caracteres = $('#cp').val();
        if (caracteres.length > 0 && caracteres.match(/^\d+$/)) {
            while (caracteres.length <= 4) {
                $('#cp').val('0' + caracteres);
                caracteres = $('#cp').val();
            }
        }
        caracteres = caracteres.substring(0, 2);
        $("#provincia").val(caracteres);
    }


    //  Cuando el usuario ha escrito el codigo postal llama a la funcion para seleccionar la provincia
    $('#cp').focusout(function () {
        leeCodPos();
    });


    /*
    //  Si el usuario cambia el select de la provincia, vuelve a leer el código
    //  y selecciona la provincia que corresponda a ese código ignorando la seleccion
    $("#provincia").change(function (evento) {
        leeCodPos();
    })
    */

    //  Funcion para rellenar campo de nombre con nombre y usuario
    function rellenaNombre() {
        var $datosper;
        $datosper = $("#nombre").val() + " " + $("#apellidos").val();
        if ($datosper !== ' ' && $("#particular").is(':checked')) {
            $("#nombre_emp").val($datosper);
        }
    }


    //  Lanza la funcion rellenar campo del nombre del demandante
    //  cuando cambia el foco del nombre
    $('#nombre').focusout(function (event) {
        rellenaNombre();
    });


    //  Lanza la funcion rellenar campo del nombre del demandante
    //  cuando cambia el foco de apellidos
    $('#apellidos').focusout(function (event) {
        rellenaNombre();
    });


    //  Funcion para cambiar el texto de la etiqueta del nombre y del cifnif
    //  según sea el demandante particular o empresa
    $("#empresa").change(function (evento) {
        if ($("#empresa").is(':checked')) {
            $("label[for='nombre_emp']").first().html('Empresa<span class="required"> *</span>');
            $("#nombre_emp").val('');
            $("#nombre_emp").attr("placeholder", "Nombre de la empresa");
            $("label[for='cifnif']").first().html('CIF<span class="required"> *</span>');
            $("#cifnif").val('');
            $("#cifnif").attr('placeholder', 'CIF de la empresa');
        }
    });


    //  Si el usuario cambia el radio check del demandante
    //  y lo vuelve a poner en particular
    $("#particular").change(function (evento) {
        if ($("#particular").is(':checked')) {
            $("label[for='nombre_emp']").first().html('Nombre<span class="required"> *</span>');
            $("#nombre_emp").val('');
            $("#nombre_emp").attr("placeholder", "Nombre del demandante");
            $("label[for='cifnif']").first().html('NIF<span class="required"> *</span>');
            $("#cifnif").val('');
            $("#cifnif").attr("placeholder", "NIF del demandante");
            rellenaNombre();
        }
    });



    //  Funcion para rellenar campo de nombre del usuario con el email
    function rellenaUser() {
        var $nom_user;
        $nom_user = $("#email").val();
        if ($nom_user !== ' '||$nom_user !=null) {
            $("#usuario").val($nom_user);
        }
    }

    //  Lanza la funcion rellenar usuario cuando cambia el foco del mail
    $('#email').focusout(function (event) {
        rellenaUser();
    });


    //  Función para rellenar la localidad mediante el código postal
    //  via ajax, si introducimos un código postal que no exista en la
    //  base de datos, te avisa
    $("#cp").focusout(function() {
        var dato = $(this).val();
        if (dato == ""||dato==00||dato<1000||dato>52999) {
            $("select[id='localidad']").first().html('<option value="0">No existe localidad para ese codigo</option>');
        }else{
            $.ajax({
                type: "POST",
                dataType: "html",
                url: "php/localidad_db.php",
                data: {
                    zip: dato
                },
                success: function(opciones){          
                    $("#localidad").html(opciones);
                }   
            });
        }
    });


    //  Función para gestionar la complejidad de la contraseña mediante
    //  el plugin complexify:
    //  https://github.com/danpalmer/jquery.complexify.js/
    //  https://www.danpalmer.me/jquery-complexify
    $('#pass').focusin(function() {
        $('#pass').complexify({}, function(valid, complexity) {
            $('#nivelComplejidad').val(complexity);
            valorComplejidad=complexity;
            if (complexity < 20) {
                $('#labelComplejidad').html('Contraseña debil');
            } else if (complexity >= 20 && complexity < 40) {
                $('#labelComplejidad').html('Contraseña media');
            } else {
                $('#labelComplejidad').html('Contraseña segura');
            }
        });
    });

});


//  Cuando la barra de navegación de Bootstrap se colapsa,
//  la accion por defecto al clicar en el menú es mantenerlo abierto.
//  Con esta funcion el menú se cierra automáticamente
//  cuando se hace clic en un elemento de menú.
$(document).ready(function () {
    $(".navbar-nav li a").click(function(event) {
        $(".navbar-collapse").collapse('hide');
    });
});


//  Activa el comportamiento scrollspy de bootstrap
//  Los enlaces de la barra de navegación se iluminarán
//  al hacer scroll cuando coincida con su sección 
$('#navbar').scrollspy();