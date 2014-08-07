var searchButton = document.getElementById("search");
var searchWord = document.getElementById('search_word');
// var loadingSign = document.getElementById("loading");
var resultUl = document.getElementById("result");
searchButton.addEventListener('click', function(e){
    e.preventDefault();
    // console.log(searchWord.value);
    // loadingSign.style.display = 'block';
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
    xmlhttp.open("GET","http://www.vanmaram.com/json_result.php?en="+searchWord.value,true);
    xmlhttp.send();
});