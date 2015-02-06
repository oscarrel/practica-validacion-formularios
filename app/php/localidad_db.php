<?php
/* Descomentaríamos la siguiente línea para mostrar errores de php en el fichero: */
// ini_set('display_errors', '1');
/* Definimos los parámetros de conexión con la bbdd: */
$dbinfo = "mysql:dbname=validacion;host=localhost";
$user = "root";
$pass = "oscar0";
//Nos intentamos conectar:
try {
    /* conectamos con bbdd e inicializamos conexión como UTF8 */
    $db = new PDO($dbinfo, $user, $pass);
    $db->exec('SET CHARACTER SET utf8');
} catch (Exception $e) {
    echo "La conexi&oacute;n ha fallado: " . $e->getMessage();
}

if (isset($_POST['zip'])) {
    $cp = $_POST['zip'];
    $sql = $db->prepare("SELECT Municipio,CodPostal FROM t_municipios WHERE CodPostal=?");
    $sql->bindParam(1, $cp);
    $sql->execute();

    while ($okey=$sql->fetch()) {
        $opciones.= "<option value='{$okey['CodPostal']}'>{$okey['Municipio']}</option>";
    }
    echo $opciones;
}
$sql=null;
$db = null;
?>
