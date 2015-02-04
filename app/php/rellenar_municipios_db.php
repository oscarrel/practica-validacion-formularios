<?php
// Datos de conexion para mi base de datos
$dbinfo = "mysql:dbname=oscar_validacion;host=localhost";
$user = "oscar_root";
$pass = "oscar_root";

// Intentamos conectar
try {
    // Conectamos a la BBDD 
    $db = new PDO($dbinfo, $user, $pass);
    // Inicializamos la conexion como utf8 para que coja correctamente caracteres españoles como la ñ
    $db->exec('SET CHARACTER SET utf8');
} catch (Exception $e) {
    echo "La conexi&oacute;n ha fallado: " . $e->getMessage();
}

// Si hemos recibido una variable CP
if (isset($_REQUEST['cp'])) {
    // Si su longuitud es mayor o igual a 2, cogemos los 2 primeros caracteres en la variable cp
    if (strlen($_REQUEST['cp']) >= 2){
        $cp = substr($_REQUEST['cp'], 0, 2);
    } else {
    // Sino asignamos directamente el valor a la variable cp        
        $cp = $_REQUEST['cp'];
    }

    // Preparamos y lanzamos la consulta
    $sql = $db->prepare("SELECT t_municipios FROM municipios WHERE CodProv=?");
    $sql->bindParam(1, $cp, PDO::PARAM_STR);
    $sql->execute();

    // Declaramos una variable para almacer si todo fue bien o no, y lo comprobamos asignado
    $valid;
    if ($sql->rowCount() > 0) {
        $valid= 'true';
    } else {
       $valid='false';
    }

    // Recorremos la consulta y devolvemos los options y los valores devueltos en la consulta       
    while($okey = $sql->fetch()){
        echo '<option value="'.$okey[0].'">' . $okey[0] . "</option>";
    }

// Liberamos recursos (BBDD y consulta)
$sql=null;
$db=null;
}
?>