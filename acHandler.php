<?php

    // for FormData reqeust
    $searchKey = $_POST['keyword'];

    // for text/plain request
    // $str_json = file_get_contents('php://input');
    // echo $str_json;
    
    $data = unserialize(file_get_contents("./towns.txt"));
    $matchData ='';
    
    if($searchKey!=''){
        foreach($data as $town){
            if(preg_match("/^$searchKey.*/i",$town)){
                $matchData = $matchData . $town . " ";
            }
        }
        print_r($matchData);
    }
?>

