var outArea;

document.addEventListener("load", ()=>{outArea = document.querySelector("textarea.out")}, 1);


setTimeout(()=>{
    if(window.location.href.split("#")[1] !== undefined)
    {
        var frag = window.location.href.split("#")[1].split("?")[0].split("=");
        var frag0 = frag[0].toLowerCase();
        var el = document.getElementById("r" + frag0);
        if(el)
        {
            el.setAttribute("checked", false);
            var el0 = document.getElementsByClassName(frag0 + "-input")[0]
            if(el0)
            {
                if(frag[1])
                {
                    el0.value = decodeURIComponent(frag[1])
                }
                el0.focus()
            }
        }
    }
}, 1)

function parseTweetID(i)
{
    return i.includes("twitter.") ? ("" + i).split("?")[0].split("#")[0].split("/status/")[1] : i
}


function toggleTweetVancedOpt()
{
    var vancedopt = document.getElementById("vanced-opt");
    if(vancedopt.hidden)
    {
        vancedopt.hidden = false;
    }else {
        vancedopt.hidden = true;
    }
}

function copyElement(element)
{
    if(element.value.length <= 0) {element.value = "⠀";}
    element.select()
    element.setSelectionRange(0, 99999)
    document.execCommand("copy")
}


function generateTweetURL(text, via, hashtags, urls, usecard, handle, title, desc, imgurl, url0)
{
    var url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text);

    if(via.length >= 1)
		{
		    url += "&via=" + encodeURIComponent(via)
        }
        
		if(hashtags.length >= 3)
		{
            url += "&hashtags="
			for(var hashtag = 0; hashtag<(hashtags.length-1); hashtag++)
			{
			    url += encodeURIComponent(hashtags[hashtag])
				if(hashtag < hashtags.length-2)
				{
				    url += ","
				}
			}
        }

        if(usecard)
        {

            if(url0.length <= 0)
            {
                if(urls.length <= 0)
                {
                    url0 = imgurl;
                }else {
                    url0 = urls;
                }
            }

            if(title.length <= 0)
            {
                alert('Please specify a title for the card!');
            }

            if(desc.length <= 0)
            {
                alert('Please specify a description for the card!');
            }

            if(imgurl.length <= 0)
            {
                alert('Please specify an URL to an image for the card!');
            }

            if(handle.length <= 0)
            {
                handle = "TimTrayler";
            }

            urls = "https://www.shanox.de/twittercardimg.php?user="
                + encodeURIComponent(handle) + "&title="
                + encodeURIComponent(title) +"&desc="
                + encodeURIComponent(desc) + "&imgurl="
                + encodeURIComponent(imgurl) + "&url="
                + encodeURIComponent(url0);
        }

		if(urls.length >= 1)
		{
			url += "&url=" + encodeURIComponent(urls)
        }

        return url;
}


function generateFollowURL(idorscreenname)
{
    var url = "https://twitter.com/intent/follow?";
    if(idorscreenname.startsWith("@") || !(/\d/.test(idorscreenname)))
    {
        url += "screen_name=" + idorscreenname.replace("@", "");
    }else {
        url += "user_id=" + idorscreenname
    }
    return url;
}


function generateLikeURL(idorurl)
{
    return "https://twitter.com/intent/like?tweet_id=" + parseTweetID(idorurl);
}


function generateRetweetURL(idorurl)
{
    return "https://twitter.com/intent/retweet?tweet_id=" + parseTweetID(idorurl);
}


function generateDMURL(id, txt)
{
    var url = "https://twitter.com/messages/compose?recipient_id=" + id.replace(/[^0-9]/g, "");
    if(("" + txt).length > 0)
    {
        url += "&text=" + encodeURIComponent(txt);
    }
    return url
}


function onTweetInputChange(e)
{
    if(document.querySelector("#rtweet").checked)
    {
		var via = document.querySelector("#via-label").value;
		var hashtags = (document.querySelector("#hashtags").value + ",").split(",")
        var urls = document.querySelector("#url").value;
        const usecard = document.querySelector("#usecard").checked;
        var handle = document.querySelector("#card-handle").value;
        var title = document.querySelector("#card-title").value;
        var desc = document.querySelector("#card-desc").value;
        var imgurl = document.querySelector("#card-imgurl").value;
        var url0 = document.querySelector("#card-url").value;
		
        outArea.value = generateTweetURL(e.value, via, hashtags, urls, usecard, url, handle, title, desc, imgurl, url0);
    }
}

function onFollowChange(e)
{
    if(document.querySelector("#rfollow").checked)
    {
        outArea.value = generateTweetURL(e.value);
    }
}

function onLikeChange(e)
{
    if(document.querySelector("#rlike").checked)
    {
        outArea.value = generateLikeURL(e.value);
    }
}


function onRetweetChange(e)
{
    if(document.querySelector("#rretweet").checked)
    {
        outArea.value = generateRetweetURL(e.value);
    }
}

function onDMChange(e)
{
    if(document.querySelector("#rdm").checked)
    {
        outArea.value = generateDMURL(e.value, document.querySelector("#dm-text").value);
    }
}

function toggleTweetCardSet()
{
    var cardset = document.querySelector("#cardset");
    if(cardset.hidden)
    {
        cardset.hidden = false;
    }else {
        cardset.hidden = true;
    }
}

function openUserIDHelpWindow()
{
    window.open("https://tweeterid.com/", "userid-help-popup", "height=500,width=550");
}

function openOut()
{
    window.open(outArea.value, "result-open", "width=300,height=300")
}

function copyOut()
{
    copyElement(outArea)
    alert('Copied "{}"'.replace("{}", outArea.value))
}
