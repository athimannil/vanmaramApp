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
                    // resultLi += "<li class='table-view-cell'><a class='navigate-right suggested-word' data-transition='slide-in' onClick='return submitHandler(\""+decodedResp[i]+"\");' data-search-word='"+decodedResp[i]+"'>"+decodedResp[i]+"</a></li>";
                    // <a class="navigate-right" href="inbox.html" data-transition="slide-in" ontouchstart="logAlert('randamathedu');">
                    resultLi += "<li class='table-view-cell'><a href='answer.html' class='navigate-right suggested-word' data-transition='slide-in' ontouchstart='getSearchValue(\""+decodedResp[i]+"\");' data-search-word='"+decodedResp[i]+"'>"+decodedResp[i]+"</a></li>";
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
function getSearchValue (selectedWord) {
    if (typeof (localStorage) == 'undefined') {
        console.log('Your browser does not support HTML5 localStorage.Try upgrading.');
    } else {
        try {
            localStorage.setItem("name", selectedWord); //saves to the database, "key", "value"
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
            }
        }
        // localStorage.removeItem("name"); //deletes the matching item from the database
    }
}
// Only needed if you want to fire a callback
window.addEventListener('push', pushCallBack);
function pushCallBack () {
    var theWord = localStorage.getItem('name');
    if (theWord) {
        var listResult = document.getElementById("list-result");
        /*if (wordFromLink){
            theWord = wordFromLink;
            search_word.value = wordFromLink;
        }else{
            theWord = searchWord.value;
        }*/
        // console.log("koooooooy");
        console.log("call back word "+ localStorage.getItem('name'));
        listResult.style.display = 'none';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                // loadingSign.style.display = 'none';
                listResult.style.display = 'block';
                var decodedResp = JSON.parse(xmlhttp.responseText);
                var resultLi = '';
                for (i=0; i<decodedResp.length; i++){
                    resultLi += "<li class='table-view-cell'>" + decodedResp[i] + "</li>";
                }
                listResult.innerHTML = resultLi;
            }
        };
        xmlhttp.open("GET","http://www.vanmaram.com/json_result.php?en="+theWord,true);
        xmlhttp.send();
        localStorage.removeItem("name");
    }
}
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