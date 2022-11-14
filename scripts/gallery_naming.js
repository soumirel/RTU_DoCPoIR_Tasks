dives = document.querySelectorAll(".card-text") 
trunc(dives) 
function trunc(divs) { 

    for (i = 0; i < divs.length; i++) { 
        divs.item(i).textContent = truncate(divs.item(i).textContent, 100) 
    }

    function truncate(str, maxlength){ 
        if (str.length>maxlength) { 
            str=str.slice(0,maxlength)+"..." 
        } 
        return str 
    }
}