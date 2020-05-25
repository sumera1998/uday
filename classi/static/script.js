'use strict';
var textInput = document.querySelector('input');
var inputWrap = textInput.parentElement ;
var inputWidth = parseInt(getComputedStyle(inputWrap).width);
var svgText = Snap('.line');
var qCurve = inputWidth / 2;  // For correct curving on diff screen sizes
var textPath = svgText.path("M0 0 " + inputWidth + " 0");
var textDown = function(){
    textPath.animate({d:"M0 0 Q" + qCurve + " 40 " + inputWidth + " 0"},150,mina.easeout);
};
var textUp = function(){
  textPath.animate({d:"M0 0 Q" + qCurve + " -30 " + inputWidth + " 0"},150,mina.easeout);
};
var textSame = function(){
  textPath.animate({d:"M0 0 " + inputWidth + " 0"},200,mina.easein);
};
var textRun = function(){
  setTimeout(textDown, 200 );
  setTimeout(textUp, 400 );
  setTimeout(textSame, 600 );
};

(function(){
    textInput.addEventListener('focus', function(){
      var parentDiv = this.parentElement;
      parentDiv.classList.add('active');
      textRun();
    });
})();

document.getElementById('textual')
	.addEventListener("keyup", function(event) {
	event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("clickable").click();
    }
});

var btn = document.querySelector("button");
var i = 0;
window.onload = function(){
btn.onclick = function() {
		console.log(document.getElementById('textual').value);
		console.log(document.getElementById('level').value);
		var skoring = $("#textual").val();
		var skoring1 = $("#level").val();

		console.log(skoring);
		console.log(skoring1);
		window.location.href = '/result/'+skoring+'/'+skoring1;
		this.innerText = i;
		this.classList.remove("finished");
		this.classList.add("loading");

		var inter = setInterval(function() {
				btn.innerText = i++;
				btn.classList.remove('percent-' + (i - 1));
				btn.classList.add('percent-' + i);
				if (i === 100) {
						btn.classList.remove("loading");
						btn.classList.add("finished");
						btn.innerText = '';
						clearInterval(inter);
						i = 0;
						btn.classList.remove('percent-100');
				}
		}, 30);
}}
