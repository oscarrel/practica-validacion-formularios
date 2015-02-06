$(document).ready(function () {
    $("#conocer").select2();
    $("#pais").select2();
    //El select2 me cambia el id y el value del html
    //Así que hasta que lo configure no aplicaré el plugin aqui
    //$("#provincia").select2();

    //Reglas validación formulario
    //* Todos los campos con * son requeridos
    $('#validForm').validate({
        rules: {
            nombre: {
                required: true,
                lettersonly: true
            },
            apellidos: {
                required: true,
                lettersspace: true
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
                remote: "php/validar_email_db.php"
                //minlength : 6,		
            },
            reemail: {
                required: true,
                equalTo: email
            },
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
            localidad: {
                required: true
            },
            provincia: {
                required: true
            },
            pais: {
                required: true
            },
            //* El código IBAN debe ser válido

            cod_iban: {
                required: true,
                iban: true
            },
            modo_pago: {
                required: true
            },

            //* El usuario debe tener al menos 4 caracteres,
            //  se rellenará de modo automático con el correo electrónico
            //  y no podrá ser modificado.
            usuario: {
                required: true,
                minlength: 4
            },
            //* La contraseña se debe forzar a que sea compleja.
            pass: {
                required: true,
                complexify: true
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
            var opcionp = parseInt($('#modo_pago').val());
            var pago;
            if (opcionp==1){
                pago="mensual será de 50€";
            }else if(opcionp==2){
                pago="trimestral será de 140€";
            }else{
                pago="anual será de 550€";
            }
            alert('Dado de alta correctamente, su próxima cuota de tipo '+pago+' ¿Desea continuar?', 'Alert Dialog');
        }





    });

    //  Funcion para completar el codigo postal con ceros
    $('#cp').focusout(function () {
        var caracteres = $('#cp').val();
        if (caracteres.length > 0 && caracteres.match(/^\d+$/)) {
            while (caracteres.length <= 4) {
                $('#cp').val('0' + caracteres);
                caracteres = $('#cp').val();
            }
        }
        caracteres = caracteres.substring(0, 2);
        $("#provincia").val(caracteres);
    });


/*    // Funcion para cambiar la provincia en funcion de los dos primeros digitos del codigo postal
    $("#cp").change(function () {
        if ($(this).val() != "") {
            var dato = $(this).val();
            if (dato.length >= 2) {
                dato = dato.substring(0, 2);
            }
            $("#provincia").val(dato);
        }
    });*/

    //  Funcion para rellenar campo de nombre con nombre y usuario
    function rellenaNombre() {
        var $datosper;
        $datosper = $("#nombre").val() + " " + $("#apellidos").val();
        if ($datosper !== ' ' && $("#particular").is(':checked')) {
            $("#nombre_emp").val($datosper);
        }
    }

    //  Lanza la funcion rellenar campo del nombre del demandante cuando cambia el foco
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

    //https://github.com/t0m/select2-bootstrap-css/tree/bootstrap3


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

/*
    $('#password').focusin(function() {
        $('#password').complexify({}, function(valid, complexity){
            $('#progressBar').val(complexity);
        });
}); */


$("#cp").focusout(function() {
    var dato = $(this).val();
    if (dato == ""||dato==00||dato<1000||dato>52999) {
        $("select[id='localidad']").first().html('<option>No existe localidad para ese codigo</option>');
    }else{
        $.ajax({
            type: "POST",
            dataType: "html",
            url: "php/localidad_db.php",
            data: {
                zip: dato
            },
            success: function(opciones){
                //$("#localidad").html(opciones);
                $("select[id='localidad']").html(opciones);
            }   
        });
    }
});








});