$(document).ready(function () {

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
                lettersonly: true
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
				email: true
					//minlength : 6,
					//remote : "php/validar_email_db.php"
            },
            reemail: {
                required: true,
                equalTo: '#email'
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
            /*
            nom_emp: {
                required: true
            },*/
            cifnif: {
                required: true
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
                maxlength: 5
                //Falta funcion de completar
            },
            localidad: {
                required: true,
                lettersonly: true
            },
            provincia: {
                required: true,
                lettersonly: true
            },
            pais: {
                required: true,
                lettersonly: true
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
                required: true
                //Añadir plugin complexity
            }
        },
    //* Una vez pulsemos enviar en el formulario se mostrará un aviso
    //  al usuario de que se va a dar de alta y que se le pasará la
    //  primera cuota de 50€, 140€ o 550€ según corresponda (forma de pago).
    //  El usuario podrá cancelar la operación.

        /*
        messages: {
            firstName: {
                lettersonly: "Introduce sólo carácteres."
             },
             lastName1: {
                 lettersonly: "Introduce sólo carácteres."
             },
             lastName2: {
                 lettersonly: "Introduce sólo carácteres."
             },
             documentNumber: {
                 remote: "Este DNI ya esta en uso.",
             },
             email: {
                 remote: "Este correo ya esta en uso.",
             }
         },*/
         
        //Captura el envío del formulario una vez que se ha rellenado correctamente
        submitHandler: function () {
            alert('¡Enviado!');
        }
    });


    $('#postal_code').focusout(function () {
        var caracteres = $('#postal_code').val();
        if (caracteres.length > 0 && caracteres.match(/^\d+$/)) {
            while (caracteres.length <= 4) {
                $('#postal_code').val('0'+ caracteres);
                caracteres = $('#postal_code').val();
            }
        }
    });



    function rellenaNombre() {
        var $datosper;
        $datosper = $("#nombre").val() + " " + $("#apellidos").val();
        if ($datosper !== '' && $("#particular").is(':checked')) {
            $("#nombre_emp").val($datosper);
        }
    }


    $('#apellidos').blur(function (event) {
        rellenaNombre();
    });


    $("#empresa").change(function (evento) {
        if ($("#empresa").is(':checked')) {
            $("label[for='nombre_emp']").first().text("Empresa");
            $("#nombre_emp").val('');
            $("#nombre_emp").attr("placeholder", "Nombre de la empresa");
        }
    });

    // Si el usuario cambia el radio check del demandante
    // y lo vuelve a poner en particular
    $("#particular").change(function (evento) {
        if ($("#particular").is(':checked')) {
            $("label[for='nombre_emp']").first().text("Nombre");
            $("#nombre_emp").attr("placeholder", "Nombre");
            rellenaNombre();
        }
    });



});
