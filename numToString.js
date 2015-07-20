var converter = (function() {
    // Number system
    var bigNumbers = {
            "0": "",
            "1": "Thousand",
            "2": "Lakh",
            "3": "Crore",
            "4": "Arab",
            "5": "Kharab",
            "6": "Neel",
            "7": "Padm",
            "8": "Shankh"
        },

        units = {
            "1": "One",
            "2": "Two",
            "3": "Three",
            "4": "Four",
            "5": "Five",
            "6": "Six",
            "7": "Seven",
            "8": "Eight",
            "9": "Nine"
        },

        teens = {
            "0": "Ten",
            "1": "Eleven",
            "2": "Twelve",
            "3": "Thirteen",
            "4": "Fourteen",
            "5": "Fifteen",
            "6": "Sixteen",
            "7": "Seventeen",
            "8": "Eighteen",
            "9": "Nineteen"
        },

        tens = {
            "2": "Twenty",
            "3": "Thirty",
            "4": "Forty",
            "5": "Fifty",
            "6": "Sixty",
            "7": "Seventy",
            "8": "Eighty",
            "9": "Ninety"

        },

        hundred = "Hundred";

    /*Main convertion function*/
    var convertToWord = function(str) {

        var pattern = /^[1-9]+[0-9]*$/;
        if (!pattern.test(str)) {
            throw "Type error";
        }

        if(str.length > 19)
        	throw "Number range exceeded"
        var arr = chunker(str);
        return arr.map(function(a, i) {
            return convertNN_NNN(a, i) + " " + bigNumbers[i];
        }).reverse().toString();
    }

    /*
    	Converts 1 to 3 digit number to words with memoization.
	*/
    var convertNN_NNN = function(str, index) {
        var num = parseInt(str);
        var result;
        var memoize = function(num, res) {
            convertNN_NNN[num] = res;
        }

        if (convertNN_NNN[num]) return convertNN_NNN[num];


        if (num > 99) {
            var hundi = parseInt(num / 100);
            var rest = num - hundi * 100;
            result = units[hundi] + " " + hundred + (index == 0 ? " and " : " ") + (rest > 0 ? convertNN_NNN(rest) : "");
            memoize(num, result);
            return result;
        } else {
            if (num < 10) {
                result = units[num];
                memoize(num, result)
                return result;
            }
            var tunis = parseInt(num / 10);
            if (num < 20) {
                result = teens[num % 10];
                memoize(num, result);
                return result;
            }
            rest = num - tunis * 10;
            result = tens[tunis] + " " + (rest > 0 ? convertNN_NNN(rest) : "") + " ";
            memoize(num, result);
            return result;
        }
    }

    /*
		Splits the number in groups of 2 except the least signifact 3 digits
    */
    function chunker(str) {
        var len = str.length;
        if (len < 3)
            return [str];

        var result = [];
        result.push(str.substring(len - 3, len));
        str = str.slice(0, len - 3);

        for (var i = str.length - 1; i >= 0; i = i - 2) {
            if (i == 0)
                result.push(str.slice(0, 1));
            else
                result.push(str.slice(i - 1, i + 1));
        }
        return result;
    }


    return {
        convert: convertToWord
    }

})();

document.addEventListener('DOMContentLoaded', function() {
    var text = document.getElementById('convertNumber')
    document.getElementById('submit').addEventListener('click', function(e) {
        try {
            var res = converter.convert(text.value.trim());
            document.getElementById('output').innerHTML = res;
        } catch (e) {
            alert(e);
        }
    })
})
