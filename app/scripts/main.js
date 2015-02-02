$(document).ready(function() {

     //Validación general del formulario
     $("#validForm").validate({

         rules: {
             //- Todos los campos con * son requeridos
             nombre: {
                 required: true
             },
             apellidos: {
                 required: true
             },
             telefono: {
                 required: true,
                 //- Teléfono contendrá solo dígitos y un total de 9.       
                 digits: true,
                 minlength: 9,
                 maxlength: 9
             },
             email: {
                 email: true,
		 required: true,
                 //- Comprobaremos que el usuario no exista previamente en la bbdd(NIF o email, el CIF no es necesario).
                 remote: "php/validar_email_db.php"
             },
	     reemail: {
		 required: true,
		 equalTo: '#email'
	     },
             conocer: {
                 required: true
             },
             demandante: {
                 required: true
             },
             nom_emp: {
                 required: true
             },
             cifnif: {
                 required: true
             },
             direccion: {
                 required: true
             },
             cp: {
                 required: true,
                 //- CP tendrán que ser 5 digitos.Si son menos se completará con 0 a la izquierda.
                 digits: true,
                 maxlength: 5,
                 //Falta funcion de completar
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
             cod_iban: {
                 required: true,
		 iban: true
             },
             modo_pago: {
                 required: true
             },
             usuario: {
                 required: true,
		 minlength: 4
             },
             pass: {
                 required: true
		//Añadir funcion para aumentar complejidad 
             }
         },
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
             },
             tarjetacredito: {
                 creditcardtypes: "Número de tarjeta incorrecto."
             }
         },
         errorPlacement: function(error, element) {
             if (element.is("input:radio")) {
                 //$parent = element.parentsUntil('.form-group','.form-group').parent();
                 //$parent = element.parentsUntil('.fieldset',"label[for^='element.name']").parent();
                 $parent = element.parentsUntil('.fieldset', '.form-group').parent();
                 //console.log($parent);
                 error.insertAfter($parent);
             } else {
                 error.insertAfter(element);
             }
         },
         //Captura el envío del formulario una vez que se ha rellenado correctamente
         submitHandler: function() {
             alert("¡Enviado!");
         }
     });

     $("#postal_code").focusout(function() {
         var caracteres = $("#postal_code").val();
         if (caracteres.length > 0 && caracteres.match(/^\d+$/))
             while (caracteres.length <= 4) {
                 $("#postal_code").val(caracteres + "0");
                 caracteres = $("#postal_code").val();
             }
     });
 });
