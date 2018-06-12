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
    createPlateau();
    console.log(estPermutable(2,3));
    console.log(permute(2,3,3,3));

    $('rowi').onclick(function () {
        permute(i1,j1,i2,j2)
    }


// Crée le plateau de jeu
    function createPlateau() {

        for (let i = 0; i < plateau.length; i++) {
            $(".plateau").append(
                "<tr class='row"
                + i
                + "'></tr>"
            );

            for (let j = 0; j < plateau[i].length; j++) {
                $(".row" + i).append(
                    "<td class='col"
                    + j
                    + "'>"
                    + plateau[i][j]
                    + "</td>"
                );
            }
        }
    }

// Teste si la cellule est vide
    function celluleEstVide(i,j) {

        if (plateau[i][j] === " ") {
            return true;
        }
        return false;
    }

// Teste si la cellule existe
    function celluleExiste(i, j) {

        if ((i > 0 && i <= plateau.length) && (j > 0 && j <= plateau.length)) {
            return true;
        }
        return false;
    }


// Teste si la cellule est permuttable
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
    }

    // Fonction qui permutte deux cases
    function permute (i1,j1,i2,j2) {

        let caseInitiale1=tableau[i1][j1];
        let caseInitiale2=tableau[i2][j2];
        let newCase1;
        let newCase2;

        if ((estPermuttable(i1,j1) || estPermuttable(i2,j2))) {
            newCase1=i2;
            newCase2=j2;        }

        createPlateau();
    }

    // $('#initial').on('click',function () {
    //
    //     for (let i = 0; i < tuiles.length; i++) {
    //         $(".plateau").append(
    //             "<tr class='row"
    //             +i
    //             +"'></tr>");
    //
    //         for (let j = 0; j < tuiles[i].length; j++) {
    //             $(".row"+i).append(
    //                 "<td class='col"
    //                 +j
    //                 +"'>"
    //                 +tuiles[i][j]
    //                 +"</td>"
    //
    //             );
    //         }
    //     } $('#initial').off('click');
    // });
});