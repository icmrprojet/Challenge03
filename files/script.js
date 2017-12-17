//variable globales en majuscules
//alert("debug");

var tableau=[];
var VIDE=1;
var JOUEUR1=0;
var JOUEUR2=2;
var WIDTH=3, HEIGHT=3;
var SIZE=WIDTH*HEIGHT;
var indiceT=0;
var t=1;
var tj=0;
var winner=0;
var joueurencours;
var totalCases=0;
var scores;

function nouvellePartie(){
	for (var cnt=0; cnt< SIZE; cnt++){
	 	tableau[cnt]= 1;
	}
	joueurencours=JOUEUR1;
	var texte = document.createTextNode("");
	msg.appendChild(texte);
}

// --------------------------------------------------------
var container;
function newContainer(){
	container= document.createElement("section");
	for (var i=0; i<9 ; i++){
		var caseDiv = document.createElement("div");
		var caseI =document.createElement("i");
		caseDiv.id ="caseDiv-" +i;
		caseI.id= "caseI-"+ i;
		caseDiv.classList.add("case");
		caseDiv.addEventListener("click", quandjeClick);
		if (i%2){
			caseDiv.classList.add("color1");
			caseI.classList.add("fa");
			caseDiv.onmouseover = function(){
				this.classList.remove("color1");
				this.classList.add("colorOver");
			}
			caseDiv.onmouseout = function(){
				this.classList.remove("colorOver");
				this.classList.add("color1");
			}
		}else{
			caseDiv.classList.add("color2");
			caseI.classList.add("fa");
			caseDiv.onmouseover = function(){
				this.classList.remove("color2");
				this.classList.add("colorOver");
			}
			caseDiv.onmouseout = function(){
				this.classList.remove("colorOver");
				this.classList.add("color2");
			}
		}
		caseDiv.appendChild(caseI);
		container.appendChild(caseDiv);

	}
}
newContainer();
// ------------------------------------------------------
document.body.appendChild(container);
var divCta = document.createElement("div");
divCta.id="divCta";
var ctaJouer = document.createElement("div");
ctaJouer.id="ctaJouer";
var ctaJouerTexte = document.createTextNode("Nouvelle Partie ?");
ctaJouer.appendChild(ctaJouerTexte);
document.body.appendChild(divCta);
divCta.appendChild(ctaJouer);
// ------------------------------------------------------
var message = document.createElement("div");
message.id="msg";
var messageTexte = document.createTextNode("");
message.appendChild(messageTexte);
// ------------------------------------------------------
var scoring = document.createElement("div");
scoring.id="score";
var scoringTexte = document.createTextNode("JOUEUR 1 * * * Les scores * * * JOUEUR 2");
scoring.appendChild(scoringTexte);
// ------------------------------------------------------


ctaJouer.onclick=function(){
	reset();
	nouvellePartie();
	var ctaJouer= document.getElementById("ctaJouer");
	document.body.style.backgroundColor="green";
	divCta.style.display="none";
	ctaJouer.style.display="none";
}


function reset(){
joueurencours=0;
indiceT=0;
t=1;
tj=0;
winner=0;
totalCases=0;
document.body.innerHTML = '';
newContainer();
document.body.appendChild(container);
document.body.appendChild(divCta);
divCta.appendChild(ctaJouer);
divCta.style.textAlign="center";
document.body.appendChild(message).innerHTML="";
}


function quandjeClick(e){
	if(winner==0){
		var indiceT = e.target.id.split("-")[1];
		var Ijouee="caseI-"+indiceT;
		//console.log(Ijouee);
		caseIcoJouee=document.getElementById(Ijouee);
		//console.log(caseIcoJouee);
		if (tableau[indiceT] == 1 ){	
			if (joueurencours==JOUEUR1){
				e.target.classList.toggle("colorJOUEUR1");
				caseIcoJouee.classList.add("fa-circle");

			}else{
				e.target.classList.add("colorJOUEUR2");
				caseIcoJouee.classList.add("fa-times");
			}	
		tableau[indiceT]=joueurencours; // on remplit la case avec la valeur du Joueurencours
		nouveauTour();
		}

	}
	if(winner==1 || winner==2){
		console.log("winner==" +winner);
		var ctaJouer= document.getElementById("ctaJouer");
		divCta.style.display="block";
		ctaJouer.style.display="block";
	}
}

function nouveauTour(){
	testLignes();
	if (winner==1){
		//console.log("a gagne")
		document.body.style.backgroundColor="red";
	}else{
		if (joueurencours==JOUEUR1){
			joueurencours=JOUEUR2;
		}else{
			joueurencours=JOUEUR1;
		}
	}
	totalCases=totalCases + 1;
	if (winner==0  && totalCases==9){
		var texte = document.createTextNode("AUCUN GAGNANT");
		msg.appendChild(texte);
		scoring.appendChild(scoringTexte);
		container.style.backgroundColor="red";
		divCta.style.display="block";
		ctaJouer.style.display="block";
	}
}


////  Les 4 tests gagnants  

//Testlignes
function testLignes(){
var totLigne0=0;
var totLigne1=0;
var totLigne2=0;
	for (var cnt=0; cnt<3; cnt++){
	    totLigne0 = totLigne0+tableau[cnt];  
	}
	for (var cnt=3; cnt<6; cnt++){
	    totLigne1 = totLigne1+tableau[cnt];
	}
	for (var cnt=6; cnt<9; cnt++){
	    totLigne2 = totLigne2+tableau[cnt];
	}
	if (totLigne0==0 || totLigne1==0 || totLigne2== 0){
		winner=1;
		var texte = document.createTextNode("JOUEUR1 est le gagnant en ligne");
		msg.appendChild(texte);
		var scores= "*** 1 *** * * * * Les scores * * * *** 0 ***";
		console.log ("scores=" +scores);
		document.body.appendChild(scoring).innerHTML="JOUEUR 1 * * * Les scores * * * JOUEUR 2" + "<br>" + scores;
	}else{
		if (totLigne0==6 || totLigne1==6 || totLigne2==6){
		winner=1;
		var texte = document.createTextNode("JOUEUR2 est le gagnant en ligne");
		msg.appendChild(texte);
		}else{
			winner=0;
			testColonnes();
		}
	}
}

//TestColonnes
function testColonnes(){
var totCol0=0;
var totCol1=0;
var totCol2=0;
	for (var cnt=0; cnt<3; cnt++){
		i=cnt*3;
	    totCol0 = totCol0+tableau[i]; 
	}
	for (var cnt=0; cnt<3; cnt++){
		i=cnt*3+1; 
	    totCol1 = totCol1+tableau[i]; 
	}
	for (var cnt=0; cnt<3; cnt++){
		i=cnt*3+2;
	    totCol2 = totCol2+tableau[i]; 
	}
	if (totCol0==0 || totCol1==0 || totCol2== 0){
		winner=1;
		var texte = document.createTextNode("JOUEUR1 est le gagnant en colonne");
		msg.appendChild(texte);
	}else{
		if (totCol0==6 || totCol1==6 || totCol2==6){
		winner=1;
		var texte = document.createTextNode("JOUEUR2 est le gagnant en colonne");
		msg.appendChild(texte);
		}else{
			winner=0;
			testDiag1();
		}
	}
}

//test si diagonale1 gagnante
function testDiag1(){
var totDiag1=0;
	for (var cnt=0; cnt<3; cnt++){
		i=cnt*(3+1);
	    totDiag1 = totDiag1+tableau[i]; 
	}
	if (totDiag1==0){
		var texte = document.createTextNode("JOUEUR1 est le gagnant en diagonale 1");
		msg.appendChild(texte);
		winner=1;
	}else{
		if (totDiag1==6){
		var texte = document.createTextNode("JOUEUR2 est le gagnant en diagonale 1");
		msg.appendChild(texte);
		winner=1;
		}else{
			winner=0;
			testDiag2();
		}
	}
}

//test si diagonale2 gagnante
function testDiag2(){
var totDiag2=0;
	for (var cnt=0; cnt<3; cnt++){
		i=cnt*(3-1)+(3-1);
	    totDiag2 = totDiag2+tableau[i]; 
	}
	if (totDiag2==0){
		var texte = document.createTextNode("JOUEUR1 est le gagnant en diagonale 2");
		msg.appendChild(texte);
		winner=1;
	}else{
		if (totDiag2==6){
		var texte = document.createTextNode("JOUEUR2 est le gagnant en diagonale 2");
		msg.appendChild(texte);
		winner=1;
		}
	}
}