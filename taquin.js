$(document).ready(function () {

    // Déclaration des Variables
    let plateauRef = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
    ];

    // Tableau des chiffres du taquin
    let plateau = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
    ];

//*************************************************************//
//               JQuery - Manipulation du DOM
// *************************************************************//
//     initialisePlateau(plateauRef);


    $('#initial').on('click',function () {
        $('#initial').off('click');
        $('#initial').hide();
        for (let i = 0; i < plateauRef.length; i++) {
            for (let j = 0; j < plateauRef.length; j++) {
                $(".row" + i + " .cas" + j).append(plateauRef[i][j]);
                    chercheCaseVide();
                $('.row' + i + ' .cas' + j).click(function () {
                    $('#info').empty();
                    permute(i,j);
                })
            }
        }
        $('#melange').click(function () {
            $('#info').empty();
            melangeAleatoire();
        });

        $('#permute').click(function () {
            $('#info').empty();
            permuteAleatoire(50);
        });

        $('#recharge').click(function () {
            $('#info').empty();
            $('td').empty();
            // initialisePlateau();
        });

        $('#resolvable').click(function(){
            $('#info').empty();
            compareParite(plateau);
        })


    });

//*************************************************************//
//                    JavaScript - Factory
//*************************************************************//

    // initialise selon le tableau initial
    // function initialisePlateau() {
    //     for (let i = 0; i < plateauRef.length; i++) {
    //         for (let j = 0; j < plateauRef.length; j++) {
    //             $('"#"+1').text('plateauRef[i][j]');
    //             chercheCaseVide();
    //         }
    //     }
    // };

    // Re-affichage du plateau après jeu
    function redessinePlateau() {
        for (let i = 0; i < plateau.length; i++) {
            for (let j = 0; j < plateau.length; j++) {
                $('.row' + i + ' .cas' + j).html(plateau[i][j]);
                chercheCaseVide();
            }
        }
    };

    // Cherche quelle est la table vide
    function chercheCaseVide () {
        let objet;
        for (let i = 0; i < plateau.length; i++) {
            for (let j = 0; j < plateau.length; j++) {
                if (plateau[i][j] === 16) {
                    $('.row' + i + ' .cas' + j).addClass("celluleVide");
                    objet = {"i":i,"j":j};
                } else {
                    $('.row' + i + ' .cas' + j).removeClass("celluleVide");
                }
            }
        } return objet;
    };

    // Teste si la cellule est vide (la cellule vide est le 16)
    function celluleEstVide(i,j) {

        if (celluleExiste(i,j) && plateau[i][j] === 16) {
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

      if ((celluleEstVide(i,j-1)) // gauche
            || (celluleEstVide(i,j+1))// droite
            || (celluleEstVide(i-1,j)) // haut
            || (celluleEstVide(i+1,j))) // bas
            {
                return true;
            }
        return false;
    };

    // Permute une cellule pleine avec une cellule vide
    function permute(i, j) {

        // où est la case vide ?
        let caseVide = chercheCaseVide(); // retourne un objet
        let newcaseVide = plateau[caseVide.i][caseVide.j]; // récupére la valeur de la cellule vide : nomVariable.clé car objet

        // permuter
        if(estPermutable(i,j) === true){
            plateau[caseVide.i][caseVide.j] = plateau[i][j];
            plateau[i][j]= newcaseVide;
            redessinePlateau();
            plateauGagnant ();
        }
    };

    //*************************************************************//
    //   Mélange aléatoire total - pas forcément résolvable
    //*************************************************************//

    // Mélange le tableau aléatoirement
    function melangeAleatoire() {

        let tabSimple = [];
        for (let i = 0; i < plateauRef.length; i++) {
            for (let j = 0; j < plateauRef.length; j++) {
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
        creeTableau2D(tabSimple);
        redessinePlateau();
    }

    // Refait un tableau multidimentionnel avec un tableau simple
    function creeTableau2D (tabSimple)  {

        for (let i = 0; i < plateau.length; i++) {
            for (let j = 0; j < plateau.length; j++) {
                let k = plateau.length*i + j;
                plateau[i][j] = tabSimple[k];
            }
        } return plateau;
    }

    //*************************************************************//
    //   Mélange aléatoire sur tableau de reférénce - résolvable
    //*************************************************************//

    // Crée un nombre aléatoire
    function creeNombreAleatoire(min, max) {
        let x = Math.floor(Math.random() * (max - min) + min);
        return x;
    }

    // Permute 50 fois le tableau en vérifiant si le mouvement est possible
    function permuteAleatoire(nbFois) {

        for (let a = 1; a <= nbFois; a++) {

            do {
                i = creeNombreAleatoire(0, plateau.length);
                j = creeNombreAleatoire(0, plateau.length);

            } while (estPermutable(i, j) === false);

            // console.log(a);
            // console.log(plateau[i][j]);
            permute(i, j);
        }
    }

    //*************************************************************//
    //   Tester si le mélange du taquin est résolvable
    //*************************************************************//

    // Crée un tableau 1D avec un tableau 2D en remplacant la case vide par 16
    function creeTableau1D(plateau2D) {
        let tabSimple = [];
        for (let i = 0; i < plateau2D.length; i++) {
            for (let j = 0; j < plateau2D.length; j++) {
                tabSimple.push(plateau2D[i][j]);
            }
        }
        return tabSimple;
    }

    // Calcule la parité de la case vide
    function pariteCaseVide () {

        let i = chercheCaseVide().i;
        let j = chercheCaseVide().j;
        // console.log(i,j);
        if ((i+j)%2 === 0){
            console.log("Case vide : Paire");
            return true;
        } else
            console.log("Case vide : Impaire");
            return false;
    }

    // Tri le tableau mélangé et en verifie sa parité
    function triParSelection(plateau) {

        let tmp;
        let k;
        let compteur = 0;

        let plateauTest = creeTableau1D(plateau);

        console.log("Nouveau tableau 1D à trier : " + plateauTest);
        for(let x = 0; x < plateauTest.length; x++) {
            k = x;
            for(let y = x+1; y < plateauTest.length; y++) {

                if(plateauTest[y] < plateauTest[k]) {
                    k=y;
                }
            }
            if (k !== x) {
                tmp = plateauTest[k];
                plateauTest[k] =plateauTest[x];
                plateauTest[x] = tmp;
                compteur++;
                // console.log(tabSimple);
            }
        }
        console.log("Nombre de permutations : " + compteur);
        if (compteur%2 === 0){
            console.log("Plateau : Paire");
            return true;
        } else
            console.log("Plateau : Impaire");
            return false;
    };

    // Compare les parités de la case vide et du tableau mélangé
    function compareParite () {

        if (pariteCaseVide()===triParSelection(plateau)) {
            // console.log("Le jeu est résolvable");
            $('#info').html("<div class='alert alert-info'>Le jeu est résolvable</div>");
        } else
            // console.log("Le jeu n'est pas résolvable. Remélanger");
            $('#info').html("<div class='alert alert-info'>Le jeu n'est pas résolvable. Remélanger</div>");

    }

    // Vérifie si le plateau en cours est gagnant
    function plateauGagnant () {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (plateau[i][j] !== plateauRef[i][j]) {
                    return false;
                }
            }
        }
        $('#info').append("<div class='alert alert-info'>BRAVO VOUS AVEZ GAGNÉ !</div>");
    };

    // // Get the modal
    //     var modal = document.getElementById('myModal');
    //
    // // Get the button that opens the modal
    //     var btn = document.getElementById("myBtn");
    //
    // // Get the <span> element that closes the modal
    //     var span = document.getElementsByClassName("close")[0];
    //
    // // When the user clicks the button, open the modal
    //     btn.onclick = function() {
    //         modal.style.display = "block";
    //     }
    //
    // // When the user clicks on <span> (x), close the modal
    //     span.onclick = function() {
    //         modal.style.display = "none";
    //     }
    //
    // // When the user clicks anywhere outside of the modal, close it
    //     window.onclick = function(event) {
    //         if (event.target == modal) {
    //             modal.style.display = "none";
    //         }
    //     }


});// Fin du document pas touche