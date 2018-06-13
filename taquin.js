$(document).ready(function () {

// Déclaration des Variables

// Tableau des chiffres du taquin
    let plateau = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, " "]
    ];

//*************************************************************//
//               JQuery - Manipulation du DOM
// *************************************************************//

    $('#initial').on('click',function () {
        $('#initial').off('click');
        for (let i = 0; i < plateau.length; i++) {
            for (let j = 0; j < plateau.length; j++) {
                $(".row" + i + " .cas" + j).append(plateau[i][j]);
                $('.row' + i + ' .cas' + j).click(function () {
                    permute(i,j);
                })
            }
        }
        $('#melange').click(function () {
            // melangeAleatoire(plateau);
        })
    });

//*************************************************************//
//                    JavaScript - Factory
//*************************************************************//

    function redessinePlateau() {
        for (let i = 0; i < plateau.length; i++) {
            for (let j = 0; j < plateau.length; j++) {
                $('.row' + i + ' .cas' + j).html(plateau[i][j]);
            }
        }
    };

    function redessinePlateauAleatoire(tabSimple) {
        for (let i = 0; i < tabSimple.length; i++) {
                console.log(tabSimple[i]);
            $('.cas' + i).html(tabSimple[i]);
        }
    };

    // Cherche quelle est la table vide
    function chercheCaseVide () {
        for (let i = 0; i < plateau.length; i++) {
            for (let j = 0; j < plateau.length; j++) {
                if (plateau[i][j] === " ") {
                    return {"i":i,"j":j};
                }
            }
        }
    };

    // Teste si la cellule est vide
    function celluleEstVide(i,j) {

        if (celluleExiste(i,j) && plateau[i][j] === " ") {
            return true;
        }
        return false;
    };

    // Teste si la cellule existe
    function celluleExiste(i,j) {

        if ((i >= 0 && i < plateau.length) && (j >= 0 && j < plateau.length)) {
            return true;
        }
        return false;
    };

    // Teste si la cellule est permutable (qu'elle est pleine et voisine de la vide)
    function estPermutable(i,j) {

      if ((celluleExiste(i,j-1) && celluleEstVide(i,j-1)) // gauche
            || (celluleExiste(i,j+1) && celluleEstVide(i,j+1))// droite
            || (celluleExiste(i-1,j) && celluleEstVide(i-1,j)) // haut
            || (celluleExiste(i+1,j) && celluleEstVide(i+1,j))) // bas
            {
                return true;
            }
        return false;
    };

    // Permute une cellule pleine avec une cellule vide
    function permute(i, j) {
        // où est la case vide ?
        let caseVide = chercheCaseVide(); // retourne un objet

        // est-ce permutable ?
        let casePerm = estPermutable(i,j);

        //récupère la valeur de la cellule pleine
        let casePleine = plateau[i][j];

        //récupére la valeur de la cellule vide
        let newcaseVide = plateau[caseVide.i][caseVide.j]; // nomVariable.clé car objet

        // permuter
        if(casePerm === true){
            plateau[i][j]= newcaseVide;
            plateau[caseVide.i][caseVide.j] = casePleine ;
            redessinePlateau();
        }
    };

//*************************************************************//
//                 Zône de tests !!! DANGER
//*************************************************************//

    // permuteAleatoire();

    creeNombreAleatoire(0,16)

    // Crée un nombre aléatoire
    function creeNombreAleatoire(min, max) {
        let x = Math.floor(Math.random() * (max - min) + min);
        // return x;
        console.log(x);
    }

    // Permute 50 fois le tableau
    function permuteAleatoire() {


        // génération de x et y alétoire

        // lancer 50 fois la fonction permute avec les x et y aléatoire générés
        for (let a = 0; a <= 50; a++) {

            let x;
            let y;

            permute(x,y);
        }
    }

    // Mélange le tableau aléatoirement
    function melangeAleatoire(plateau) {

        let tabSimple = [];
        for (let i = 0; i < plateau.length; i++) {
            for (let j = 0; j < plateau.length; j++) {
                tabSimple.push(plateau[i][j]);
            }
        }
        // console.log(tabSimple);

            for (var x = tabSimple.length - 1; x > 0; x--) {
                var rand = Math.floor(Math.random() * (x + 1));
                var temp = tabSimple[x];

                tabSimple[x] = tabSimple[rand];
                tabSimple[rand] = temp;
            }
            //console.log(tabSimple);
            redessinePlateauAleatoire(tabSimple);
        }



});// Fin du document pas touche