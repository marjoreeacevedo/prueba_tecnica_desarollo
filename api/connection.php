<?php
function connectdb(){
  $conn_string= "host=localhost port=5432 dbname=test user=root password=root";

  $dbconn=pg_connect($conn_string) or die('Error: '. pg_last_error());

  if(!$dbconn){
    echo "Error: Could not connect";
  }else{
    return $dbconn;
  }
}

 ?>
