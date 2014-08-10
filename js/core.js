var searchButton = document.getElementById("search");
var searchWord = document.getElementById('search_word');
var resultUl = document.getElementById("result");

window.addEventListener('push', function(){
    // alert("yes boss");
    // console.log(wordFromLink);
    // if (wordFromLink){
    //     theWord = wordFromLink;
    // }else{
        theWord = localStorage.getItem("selectedWord");
        console.log("idanu thirayendad  = " + theWord);
        // theWord = theWord;
    // }
    resultUl.style.display = 'none';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
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
    // return false;
});

function submitHandler(wordFromLink){
    // Check browser support
    if (typeof(Storage) != "undefined") {
        // Store
        localStorage.setItem("selectedWord", wordFromLink);
        // Retrieve
        alert("set this value " + wordFromLink);
        //console.log(localStorage.getItem("selectedWord"));
        // document.getElementById("result").innerHTML = localStorage.getItem("lastname");
    } else {
        alert("the browser doesn\'t support storage");
    }
    // return false;
}

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
                    resultLi += "<li class='table-view-cell'><a href='result/answer.html' class='navigate-right suggested-word' data-transition='slide-in' onClick='return submitHandler(\""+decodedResp[i]+"\");' data-search-word='"+decodedResp[i]+"'>"+decodedResp[i]+"</a></li>";
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
















