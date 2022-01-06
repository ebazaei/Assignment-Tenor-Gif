const show=document.getElementById('result');
const btnsearch= document.getElementById('btnsearch');
const filedsearch= document.getElementById('filedsearch');
btnsearch.addEventListener('click', searchInTenor);
const massage404 = '<p>Sorry, we have a problem</p>';
show.innerHTML="Load Photos Here van Tenor, please input your word & Search";


function searchInTenor(){
    let http = new XMLHttpRequest();
    let searchWord = filedsearch.value;
    show.innerHTML="";

    http.open('GET', `https://api.tenor.com/v1/search?q=${searchWord}&key=CPWXTB0SQTTM`, true);

    http.onload = function (){

        if(http.status === 200){
            
            let responseResult = JSON.parse(http.responseText);
            let responseTenors = responseResult.results;           
            
            responseTenors.forEach ((photo)  => {
                show.innerHTML+=`<div class="info"><img src=${photo.media[0].gif.url} class="info-image"></div>`;
            });

        } else if (http.status === 404){
            show.innerHTML = massage404;
        } 

    }

    http.send();
}
