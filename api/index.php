<?php

    error_reporting(0);

    require_once('api.php');


    function tweet()
    {
        $text = $_GET["text"] ?: $_POST["text"] ?: "";
        $via = $_GET["via"] ?: $_POST["via"] ?: "";
        $hashtags = explode(",", $_GET["hashtags"]) ?: $_POST["hashtags"] ?: ""; 
        $urls = $_GET["tweet-url"] ?: $_POST["tweet-url"] ?: "";
        $usecard = ($_GET["card"] ?: $_POST["card"]) == "true" ?: "";
        $handle = $_GET["card-handle"] ?: $_POST["card-handle"] ?: "";
        $title = $_GET["card-title"] ?: $_POST["card-title"] ?: "";
        $desc = $_GET["card-desc"] ?: $_POST["card-desc"] ?: "";
        $imgurl = $_GET["card-img"] ?: $_POST["card-img"] ?: "";
        $url0 = $_GET["card-url"] ?: $_POST["card-url"] ?: "";

        return generateTweetURL($text, $via, $hashtags, $urls, $usecard, $handle, $title, $desc, $imgurl, $url0);
    }
    

    function follow()
    {
        return generateFollowURL($_GET["user"] ?: $_POST["user"] ?: "");
    }

    function like()
    {
        return generateLikeURL($_GET["tweet"] ?: $_POST["tweet"] ?: "");
    }

    function retweet()
    {
        return generateRetweetURL($_GET["tweet"] ?: $_POST["tweet"] ?: "");
    }

    function dm()
    {
        return generateDMURL($_GET["userid"] ?: $_POST["userid"] ?: "", $_GET["text"] ?: $_POST["text"] ?: "");
    }


    $type = $_GET["type"];
    $r = "";

    switch(strtolower($type))
    {
        case "tweet":
            $r = tweet();
            break;

        case "follow":
            $r = follow();
            break;

        case "like":
            $r = like();
            break;

        case "retweet":
            $r = retweet();
            break;

        case "dm":
            $r = dm();
            break;

        default:
            $r = 0;
            break;
    }

    if(is_numeric($r))
    {
        echo json_encode(array("url"=>"", "error"=>$r));
    }else {
        echo json_encode(array("url"=>$r, "error"=>NULL));
    }

?>