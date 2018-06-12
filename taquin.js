$(document).ready(function () {

// Déclaration des Variables
// Tableau des chiffres du taquin
    let plateau = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, " "]
    ];

    let ligneVide = 3;
    let colVide = 3;

// Exécution des fonctions
    createPlateau();


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
                    // "<td class='col"
                    // + j
                    "<td onclick='permute("
                    + i
                    +","
                    + j
                    + ")'>"
                    // + "'>"
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
    function celluleExiste(i,j) {

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

// Fonction qui permute deux cases
function permute (i,j) {

        // Mise en tampon des coordonnées de la case vide
        let ligneTampon = ligneVide;
        let colTampon = colVide;

        console.log(i,j,ligneVide,colVide);

        if (estPermutable(i,j)) {

            // coordonnées case vide relmplacées par coordonnées cellule cliquée
            ligneVide = i;
            colVide = j;
            plateau [ligneVide][colVide] = plateau [i][j];

            // coordonnées ligne cliquée remplacée par cellule vide
            i = ligneTampon;
            j = colTampon;
            plateau [i][j] = plateau [ligneTampon][colTampon];
        
            console.log(i,j,ligneVide,colVide);
            console.log(plateau [ligneVide][colVide]);
            console.log(plateau [i][j]);
            console.log(plateau);
            // Réécriture du plateau
            // let plateau = [
            //     [1, 2, 3, 4],
            //     [5, 6, 7, 8],
            //     [9, 10, 11, 12],
            //     [13, 14, 15, " "]
            // ];

        }  
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