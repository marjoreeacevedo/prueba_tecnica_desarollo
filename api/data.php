<?php
require_once("connection.php");
require_once("accessControl.php");
$conn=connectdb();
if($_SERVER['REQUEST_METHOD']=='GET'){
   $query='SELECT * FROM motivos_es_gt';
    $list =pg_query($query);
    $row = pg_fetch_assoc($list);
    $res=array();
    while($row= pg_fetch_assoc($list)){
      $res[]=$row;
    }

    pg_close($conn);
    $result=array(
      'status'=>'200',
      'data'=>$res
    );
    echo json_encode($result);
    exit();
}

if($_SERVER['REQUEST_METHOD']=='POST'){
  $datos= json_decode(file_get_contents("php://input"),true);
  $row = array("motivo"=>intval($datos["motivo"]), "des_motivo" => $datos["des_motivo"], "estado"=>$datos["estado"], "tipo"=>$datos["tipo"]);
  $res = pg_insert($conn,'motivos_es_gt',$row);
  if($res){
    $result=array(
      'status'=>'200',
      'msj'=>"success"
    );
    pg_close($conn);
    echo json_encode($result);
  }
   exit();
}

if($_SERVER['REQUEST_METHOD']=='PUT'){
  $datos= json_decode(file_get_contents("php://input"),true);
  $row = array("des_motivo" => $datos["des_motivo"], "estado"=>$datos["estado"], "tipo"=>$datos["tipo"]);
  $condition = array("motivo"=>intval($datos["motivo"]));
  $res = pg_update($conn,'motivos_es_gt',$row,$condition);
  if($res){
    $result=array(
      'status'=>'200',
      'msj'=>"success"
    );
    pg_close($conn);
    echo json_encode($result);
  }
   exit();
}

if($_SERVER['REQUEST_METHOD']=='DELETE'){
  $condition = array("motivo"=>intval($_GET['motivo']));
  $res = pg_delete($conn,'motivos_es_gt',$condition);
  if($res){
    $result=array(
      'status'=>'200',
      'msj'=>"success"
    );
    pg_close($conn);
    echo json_encode($result);
  }
   exit();
}


 ?>
