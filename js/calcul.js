/*************************************************************
*
*	calcul.js
*		Fonctions et procédures permettant de 
*		calculer le résultat d'une expression 
*		saisie par l'utilisateur
*
*************************************************************/

// Procédure qui convertit et calcul le résultat de l'expression saisie par l'utilisateur //
// Ne reçoit rien //
function calcul() {
	// Déclarations des variables //
	var exp = document.getElementById("inputExp").value;
	var err = false;
	var concat;
	var k = 0;
	var tab = [];
	var operations = ["x","*","/",":","÷","-","+",".", ","];

	// Test du premier et dernier élément de l'expression //
	if(isNaN(exp[0]) || isNaN(exp[exp.length-1])) {
		err = true;
		// appel de la procédure setError //
		setError("Votre expression commence et/ou finit par une opération");
	} else {
		/* Convertit l'expression de chaine de caractères 
		   vers tableau de chaine de caractères */
		for (var i = 0; i < exp.length; i++) {
			var j = i+1;
			if (!isNaN(exp[i])) {
				concat = exp[i];
				while(!isNaN(exp[j]) || exp[j] == "," || exp[j] == ".") {
					concat = concat+exp[j];
					j++;
					i++;
				}
				// push ajoute un élément en dernière position du tableau tab //
				tab.push(concat);				
			} else {
				tab.push(exp[i]);
			}
		}
		// Recherche d'opérations consécutives //
		for (var i = 0; i < tab.length-1; i++) {
			if(isNaN(tab[i]) && isNaN(tab[i+1])) {
				err = true;
				setError("Le tableau contient au moins 2 opérations consécutives");
			}
			if(!operations.includes(tab[i]) && isNaN(tab[i]))
			{
				setError("Caractère interdit");
			}
		}
	}

	/* Si aucune erreur détectée, calculer les multiplications
	   et divisions */
	if (!err) {
		while(k < tab.length-1) {			
			if(tab[k] == "x" || tab[k] == "*") { 			// Multiplications
				tab[k-1] = tab[k-1]*tab[k+1];
				tab[k] = "R";
				tab[k+1] = "R";
			} else if (tab[k] == ":" || tab[k] == "/" || tab[k] == "÷") {	// Divisions
				if(tab[k+1] == "0") {						// Division par zero
					setError("Erreur : division par 0");
					err = true;
					k = tab.length-1;
				} else {									// Calcul de la division
					tab[k-1] = tab[k-1]/tab[k+1];
					tab[k] = "R";
					tab[k+1] = "R";
				}
			} else {
				k++;
			}
			// appel de la procédure moveR //
			moveR(tab);
		}
		k = 0;
	}

	/* Si aucune erreur détectée, calculer les additions
	   et soustractions */
	if(!err) {
		while(k < tab.length-1) {
			if(tab[k] == "+") {								// Additions
				tab[k-1] = Number(tab[k-1])+Number(tab[k+1]);
				tab[k] = "R";
				tab[k+1] = "R";
			} else if (tab[k] == "-") {						// Soustractions
				tab[k-1] = Number(tab[k-1])-Number(tab[k+1]);
				tab[k] = "R";
				tab[k+1] = "R";
			} else {
				k++;
			}
			// appel de la procédure moveR //
			moveR(tab);
		}
		// appel de la procédure setResultat //
		setResultat(tab[0]);
	}

}

// Procédure qui permutte les R avec les valeurs suivantes //
// tab : un tableau passé par référence //
function moveR(tab) {
	for (var i = 0; i < tab.length-2; i++) {
		if (tab[i] == "R") {
			tab[i] = tab[i+2];
			tab[i+2] = "R";
			}
	}
}

// Procédure qui affiche le résultat dans le input id="result" //
// result : une chaine de caractères //
function setResultat(result) {
	document.getElementById("result").value = result;
	document.getElementById("error").textContent = "";
}

// Procédure qui affiche l'erreur dans le span id="error" //
// error : une chaine de caractères //
function setError(error) {
	document.getElementById("result").value = "";
	document.getElementById("error").textContent = error;
}

// clique sur C //
function reset() {
	document.getElementById("result").value = "";
	document.getElementById("error").textContent = "";
	document.getElementById("inputExp").value = "";
}

// clique sur 7 //
function sept() {
	document.getElementById("inputExp").value = document.getElementById("inputExp").value + "7";
}

// clique sur 8 //
function huit() {
	document.getElementById("inputExp").value = document.getElementById("inputExp").value + "8";
}

// clique sur 9 //
function neuf() {
	document.getElementById("inputExp").value = document.getElementById("inputExp").value + "9";
}

// clique sur 4 //
function quatre() {
	document.getElementById("inputExp").value = document.getElementById("inputExp").value + "4";
}

// clique sur 5 //
function cinq() {
	document.getElementById("inputExp").value = document.getElementById("inputExp").value + "5";
}

// clique sur 7 //
function six() {
	document.getElementById("inputExp").value = document.getElementById("inputExp").value + "6";
}

// clique sur - //
function moins() {
	document.getElementById("inputExp").value = document.getElementById("inputExp").value + "-";
}

// clique sur 1 //
function un() {
	document.getElementById("inputExp").value = document.getElementById("inputExp").value + "1";
}

// clique sur 2 //
function deux() {
	document.getElementById("inputExp").value = document.getElementById("inputExp").value + "2";
}

// clique sur 3 //
function trois() {
	document.getElementById("inputExp").value = document.getElementById("inputExp").value + "3";
}

// clique sur x //
function fois() {
	document.getElementById("inputExp").value = document.getElementById("inputExp").value + "x";
}

// clique sur 0 //
function zero() {
	document.getElementById("inputExp").value = document.getElementById("inputExp").value + "0";
}

// clique sur + //
function plus() {
	document.getElementById("inputExp").value = document.getElementById("inputExp").value + "+";
}

// clique sur / //
function divise() {
	document.getElementById("inputExp").value = document.getElementById("inputExp").value + "/";
}

// clique sur . //
function virgule() {
	document.getElementById("inputExp").value = document.getElementById("inputExp").value + ".";
}