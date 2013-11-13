var factor1Digits = 4;
var factor2Digits = 2;

window.onload = function() {

    var factor1 = getRandomInt(1, Math.pow(10, factor1Digits) - 1);
    var factor2 = getRandomInt(1, Math.pow(10, factor2Digits) - 1);
    var result = factor1 * factor2;

    var factor1Array = String(factor1).split('');
    var factor2Array = String(factor2).split('');
    var resultArray = String(result).split('');
    var maxRowLength = resultArray.length;

    var array = [];
    array.push(factor1Array.slice(0));
    array.push(factor2Array.slice(0));

    while (array[0].length < maxRowLength) {
        array[0].unshift('');
    }
    while (array[1].length < maxRowLength) {
        array[1].unshift('');
    }

    var factor1ArrayRev = factor1Array.slice(0);
    factor1ArrayRev.reverse();
    var factor2ArrayRev = factor2Array.slice(0);
    factor2ArrayRev.reverse();

    var rows = factor2ArrayRev.map(function(val2, index2, arr2) {
            var reminder = 0;
            var tmp = factor1ArrayRev.map(function(val1, index1, arr1) {
                var multiple = (val1 * val2) + reminder;
                reminder = (multiple - (multiple % 10)) / 10;
                return multiple % 10;
            });
            if (reminder > 0) {
                tmp.push(reminder);
            }
            tmp.reverse();
            for(i = 1; i <= index2; i++) {
                tmp.push(0);
            }
            while (tmp.length < maxRowLength) {
                tmp.unshift('');
            }
            return tmp;
        });

    rows.forEach(function(arr) {
        array.push(arr);
    });

    array.push(resultArray.slice(0));

    /*
    console.log("factor1: " + factor1Array);
    console.log("factor2: " + factor2Array);
    console.log("result:");
    array.map(function(val) {
        console.log("  " + val);
    });
    console.log(Number(array[2].join('')));
    console.log(Number(array[3].join('')));
    console.log(Number(array[2].join('')) + Number(array[3].join('')));
    console.log(String(Number(array[2].join('')) + Number(array[3].join(''))));
    console.log(String(Number(array[2].join('')) + Number(array[3].join(''))).split(''));
    */

    var row = document.querySelector("table").insertRow(-1);
    array[0].forEach(function(digit) {
        row.insertCell(-1).innerHTML = digit;
    });
    row = document.querySelector("table").insertRow(-1);
    array[1].forEach(function(digit) {
        row.insertCell(-1).innerHTML = digit;
    });
    array.slice(2).forEach(function(val, index) {
        var row = document.querySelector("table").insertRow(-1);
        val.forEach(function(digit) {
            row.insertCell(-1).innerHTML = "<input type='text' answer='"+ digit +"'/>";
        });
    });


    var inputs = [].slice.call(document.querySelectorAll('input'));

    inputs.forEach(function(elm) {
        elm.onkeyup = function() {
            if (this.value === '') {
                this.classList.toggle('wrong', false);
                return;
            }

            if (this.value != this.getAttribute('answer')) {
                this.classList.toggle('wrong', true);
                return;
            } else {
                this.classList.toggle('wrong', false);
            }
        };
    });
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

