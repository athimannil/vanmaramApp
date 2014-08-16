var searchButton = document.getElementById("search");
var searchWord = document.getElementById('search_word');
var resultUl = document.getElementById("result");
var listResult = document.getElementById("list-result");

// auto suggest
searchWord.onkeyup = function(e){
    if(e.keyCode == 13){
        return;
    }
    if (searchWord.value){
        resultUl.style.display = 'none';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                resultUl.style.display = 'block';
                var decodedResp = JSON.parse(xmlhttp.responseText);
                var resultLi = '';
                for (i=0; i<decodedResp.length; i++){
                    resultLi += "<li class='table-view-cell'><a class='navigate-right suggested-word' data-transition='slide-in' onClick='return submitHandler(\""+decodedResp[i]+"\");' data-search-word='"+decodedResp[i]+"'>"+decodedResp[i]+"</a></li>";
                }
                resultUl.innerHTML = resultLi;
            }
        };
        xmlhttp.open("GET","http://www.vanmaram.com/ajax_json_suggestion.php?en="+searchWord.value,true);
        xmlhttp.send();
    }else{
        resultUl.style.display = 'none';
    }
};

// search result
var submitHandler = function(wordFromLink) {
    if (wordFromLink){
        theWord = wordFromLink;
        search_word.value = wordFromLink;
    }else{
        theWord = searchWord.value;
    }

    resultUl.style.display = 'none';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            // loadingSign.style.display = 'none';
            resultUl.style.display = 'block';
            var decodedResp = JSON.parse(xmlhttp.responseText);
            var resultLi = '';
            for (i=0; i<decodedResp.length; i++){
                resultLi += "<li class='table-view-cell'>" + decodedResp[i] + "</li>";
            }
            resultUl.innerHTML = resultLi;
        }
    };
    xmlhttp.open("GET","http://www.vanmaram.com/json_result.php?en="+theWord,true);
    xmlhttp.send();
    return false;
};