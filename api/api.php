<?php

    function encodeURIComponent($str) {
        $revert = array('%21'=>'!', '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')');
        return strtr(rawurlencode($str), $revert);
    }

    function str_contains(String $haystack, String $needle)
    {
        return !(strpos($haystack, $needle) === false);
    }

    function parseTweetID($idorurl)
    {
        return str_contains($idorurl, "twitter.") ? explode("/status/", strtolower(explode("#", explode("?", $idorurl)[0])[0]))[1] : $idorurl;
    }

    function generateTweetURL(String $text, String $via, array $hashtags, String $urls, Bool $usecard, String $handle, String $title,
                                String $desc, String $imgurl, String $url0)
    {

        $url = "https://twitter.com/intent/tweet?text=" . encodeURIComponent($text);

        if(strlen($via) >= 1)
            {
                $url .= "&via=" . encodeURIComponent($via);
            }
            
            if(count($hashtags) >= 3)
            {
                $url .= "&hashtags=";
                for($hashtag = 0; $hashtag<(count($hashtags)-1); $hashtag++)
                {
                    $url .= encodeURIComponent($hashtags[$hashtag]);
                    if($hashtag < count($hashtags)-2)
                    {
                        $url .= ",";
                    }
                }
            }
    
            if($usecard)
            {
    
                if(strlen($url0) <= 0)
                {
                    if(strlen($urls) <= 0)
                    {
                        $url0 = $imgurl;
                    }else {
                        $url0 = $urls;
                    }
                }
    
                if(strlen($title) <= 0)
                {
                    return 0;
                }
    
                if(strlen($desc) <= 0)
                {
                    return 0;
                }
    
                if(strlen($imgurl) <= 0)
                {
                    return 0;
                }
    
                if(strlen($handle) <= 0)
                {
                    return 0;
                }
    
                $urls .= "https://www.shanox.de/twittercardimg.php?user="
                    . encodeURIComponent($handle) . "&title="
                    . encodeURIComponent($title) . "&desc="
                    . encodeURIComponent($desc) . "&imgurl="
                    . encodeURIComponent($imgurl) . "&url="
                    . encodeURIComponent($url0);
            }
    
            if(strlen($urls) >= 1)
            {
                $url .= "&url=" . encodeURIComponent($urls);
            }
            
            return strlen($text) < 1 ? 0 : $url;
    }

    function generateFollowURL($idorscreenname)
    {
        $url = "https://twitter.com/intent/follow?";
        if(substr($idorscreenname, 0, strlen("@")) === "@")
        {
            $url = $url . "screen_name=" . str_replace("@", "", $idorscreenname);;
        }else {
            $url = $url . "user_id=" . $idorscreenname;
        }
        return strlen($text) > 0 ? 0 : $url;
    }


function generateLikeURL($idorurl)
{
    return strlen($text) > 0 ? 0 : "https://twitter.com/intent/like?tweet_id=" . parseTweetID($idorurl);
}


function generateRetweetURL($idorurl)
{
    return strlen($text) > 0 ? 0 : "https://twitter.com/intent/retweet?tweet_id=" . parseTweetID($idorurl);
}


function generateDMURL($id, $txt)
{
    $url = "https://twitter.com/messages/compose?recipient_id=" . $id;
    if(strlen($txt) > 0)
    {
        $url = $url . "&text=" + encodeURIComponent($txt);
    }
    return strlen($text) > 0 ? 0 : $url;
}
?>