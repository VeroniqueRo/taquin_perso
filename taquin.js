$(document).ready(function () {

// Déclaration des Variables
// Tableau des chiffres du taquin
    let plateau = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, " "]
    ];

// Exécution des fonctions
// createPlateau();
    chercheCaseVide(plateau);

//*************************************************************//
//               JQuery - Manipulation du DOM
// *************************************************************//

// Crée le plateau de jeu initial



    $('#initial').on('click',function () {
        $('#initial').off('click');
        for (let i = 0; i < plateau.length; i++) {
            for (let j = 0; j < plateau[i].length; j++) {
                $(".row" + i + " .case" + j).append(plateau[i][j]);
                $('.row' + i + ' .case' + j).click(function () {
                    permute(i,j);
                })
            }
        }
    });

//*************************************************************//
//                    JavaScript - Factory
//*************************************************************//

    function draw() {
        for (let i = 0; i < plateau.length; i++) {
            for (let j = 0; j < plateau.length; j++) {
                $('.row' + i + ' .cas' + j).html( plateau[i][j]);

            }
        }
    };

    // Cherche quelle est la table vide
    function chercheCaseVide () {
        for (let i = 0; i < plateau.length; i++) {
            for (let j = 0; j < plateau[i].length; j++) {

                if (plateau[i][j] === " ") {
                    return {"i":i,"j":j};
                }
            }
        }
    };

    // Teste si la cellule est vide
    function celluleEstVide(i,j) {

        if (plateau[i][j] === " ") {
            $("this").addClass("celluleVide");
            return true;
        }
        return false;
    };

    // Teste si la cellule existe
    function celluleExiste(i,j) {

        if ((i > 0 && i <= plateau.length) && (j > 0 && j <= plateau.length)) {
            return true;
        }
        return false;
    };

    // Teste si la cellule est permutable (qu'elle est pleine et voisine de la vide)
    function estPermutable(i,j) {

        if (celluleEstVide(i,j)) {
            return false;

        } else if ((celluleExiste(i,j-1) && celluleEstVide(i,j-1)) // gauche
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
        let emptyCase = chercheCaseVide(); // retourne un objet

        // est-ce permutable ?
        let casePerm = estPermutable(i,j);

        //récupère la valeur de la cellule pleine
        let fullCase = plateau[i][j];

        //récupére la valeur de la cellule vide
        let newEmptyCase = plateau[emptyCase.i][emptyCase.j]; // nomVariable.clé car objet

        // permuter
        if(casePerm === true){
            plateau[i][j]= newEmptyCase;
            plateau[emptyCase.i][emptyCase.j] = fullCase ;
            draw();
        }
    };
});// Fin du document pas touche