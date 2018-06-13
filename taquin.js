$(document).ready(function () {

// Déclaration des Variables
    let taillePlateau = 4;
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

    // Fonction qui permute une cellule pleine avec une cellule vide
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
});// Fin du document pas touche