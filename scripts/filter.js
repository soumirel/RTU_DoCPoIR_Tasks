
var min = 0;
var max = 1000;

function getCoords(elem) {
	let coords = elem.getBoundingClientRect();
	return {
		top : coords.top + window.pageYOffset,
		left : coords.left + window.pageXOffset,
		leftX: coords.left,
		rigth : coords.left + window.pageXOffset + coords.width,
		bottom : coords.top + window.pageYOffset + coords.height,
		width : coords.width
	}
}

function moveRange (elem) {
	var coords = getCoords(elem);

	var colorRange = elem.parentElement.children[1];
	var f;
	var value;

	var parent = {}
		parent.element = elem.parentElement;
		parent.coords = getCoords(parent.element);

	var block2 = {}
	if (elem.classList.contains('block-min')) {
		block2.element = elem.parentElement.children[2];
		block2.coords = getCoords(block2.element);
		f=0;
	} else {
		block2.element = elem.parentElement.children[0];
		block2.coords = getCoords(block2.element);
		f=1;
	}

    var indicator = document.createElement('div');
    if (elem.children.length){
       	elem.innerHTML = '';
    }
	elem.appendChild(indicator);

	document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener('touchend', onMouseUp);

    elem.ondragstart = function(){
        return false;
    }

	function onMouseMove(e) {

        e.preventDefault();

        if (e.touches === undefined) {
        	var pos = e.clientX;
        } else {
        	var pos = e.targetTouches[0].clientX;
        }

        let newLeft = pos - parent.coords.leftX;
        let rigthEdge = parent.coords.width - (coords.width+1);

        if (newLeft<0) {
        	newLeft = 0;
        } else if (newLeft > rigthEdge) {
        	newLeft = rigthEdge;
        }
        if (f == 0 && pos > block2.coords.left-block2.coords.width) {
        	newLeft = block2.coords.left - block2.coords.width - parent.coords.leftX;
        } else if (f == 1 && pos < block2.coords.rigth + 5) {
        	newLeft = block2.coords.rigth - block2.coords.left;
        }

    	elem.style.left = newLeft + 'px';

    	let rangeMin = +document.querySelector('.filter number:first-child').innerHTML;
    	let rangeMax = +document.querySelector('.filter number:last-child').innerHTML;
        if(f==0) {
            value = (newLeft / (parent.coords.width / (rangeMax - rangeMin)) + rangeMin).toFixed();
            min = value;
        } else {
            value = (newLeft / (parent.coords.width / (rangeMax - rangeMin))+ 0.3 + rangeMin).toFixed();
            max = value;
        }

    	indicator.style.position = 'absolute';
    	indicator.style.fontSize = "14px";
    	indicator.style.left = - coords.width/2 + "px";
    	indicator.style.top = parseFloat(window.getComputedStyle(elem).getPropertyValue('top')) - 10 +"px";

    	if (value <= rangeMin){
    		indicator.innerHTML= "";
    	} else if (value >= rangeMax) {
    		indicator.innerHTML= "";
    	} else {
    		indicator.innerHTML = value;
    	}


    	if (f == 0) {
	    	colorRange.style.left = newLeft + coords.width + "px";
	    	colorRange.style.width = block2.coords.left - getCoords(elem).left - coords.width + "px";
    	}  else {
    		colorRange.style.left = block2.coords.left - parent.coords.leftX + "px";
    		colorRange.style.width = getCoords(elem).left - block2.coords.left + "px";
    	}    
	}

	function onMouseUp() {
	    document.removeEventListener('mouseup', onMouseUp);
	    document.removeEventListener('mousemove', onMouseMove);
	    document.removeEventListener('touchend', onMouseUp);
	    document.removeEventListener('touchmove', onMouseMove);
	}
}

var submitBtn = document.querySelector('.submit-filter-btn');
submitBtn.addEventListener('click', applyFilter);

var boxes = document.querySelectorAll(".box");

function applyFilter() {
    for (i = 0; i < boxes.length; i++) 
    {
        let currentPrice = boxes[i].querySelector(".price").textContent;
        currentPrice = parseInt(currentPrice.slice(0, -1));
        if (currentPrice < min || currentPrice > max) {
            boxes[i].style.display = "none";
        } else {
            boxes[i].style.display = "block";
        }
        
    }
}

