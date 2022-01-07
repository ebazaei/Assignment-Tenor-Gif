//Get access to show Place In Html page for display result
const show=document.getElementById('showPlaceInHtml');
//Get access to button 
const btnsearch= document.getElementById('btnsearch');
//Access the field that displays the word
const filedsearch= document.getElementById('filedsearch');
//Attach a click event & adding function( by click op button , searchInTenor function is work )
btnsearch.addEventListener('click', searchInTenor);
//This message will be displayed if the connection(status) to the API is not complete and correct.
const massage404 = '<p>Sorry, we have a problem</p>';
//This message will be displayed in Html before searching.
show.innerHTML="Load Photos Here van Tenor, please input your word & Search";

//start Function
function searchInTenor(){
    //XMLHttpRequest object is to interact with Tenor server
    let http = new XMLHttpRequest();
    //Access the word entered (value) by the user within the search field(in filedsearch)
    let searchWord = filedsearch.value;
    /*Empty the contents of the previously searched results, if we do not empty it, with 
    each search, instead of the new results, the old results will still be displayed and 
    the new results will be placed after the old results.*/
    show.innerHTML="";
    /*open tenor api link ... Here in the first part(GET) we say that we want to get information 
    and in the second part(API link) we put the link. In the link, we put ${searchWord} to say what word we are 
    looking for photos subject, then we announce our key that we received from the Tenor, then we define 
    the desired number of photos to display and in the third part(True) we say that the asynchronous... 
    relationship We want*/
    http.open('GET', `https://api.tenor.com/v1/search?q=${searchWord}&key=CPWXTB0SQTTM&limit=12`, true);

    /* A callback function (In this function, we will give the necessary instructions to the program to do 
    what it should do in case of access or lack of access to API -  What to do when the response is ready */
    http.onload = function (){
        //Request finished. Do processing here :
        //If the API access (status) is established correctly and completely (The number 200 means perfect status) ...
        if(http.status === 200){
            
            //convert all data :Parse the data with JSON & parse, and the data becomes a JavaScript object , Before converting the data are in the form of strings
            let responseResult = JSON.parse(http.responseText);
            let responseTenors = responseResult.results;           
            //Create a loop to check all API data and print photos respectively by...
            responseTenors.forEach ((photo)  => {
                /*Here, at each stage of the code review by the loop, the corresponding image link is received 
                and placed inside the template code (showPlaceInHtml). 
                Due to the use of equal sign and addition together (+=), each time 
                the loop is performed, new information is added to the previously found information.*/
                show.innerHTML += `<div class="info"><img src=${photo.media[0].gif.url} class="info-image"></div>`;
            });
        //If the API access (status) is not established correctly and Not completely (The number 404 means bad status of not found ...) ...
        } else if (http.status === 404){
            //show Error messege
            show.innerHTML = massage404;
        } 

    }
    //sends the request to the server
    http.send();
}
