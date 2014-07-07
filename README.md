Générateur de newsletters
==================

__Projet en développement__: Il faut avoir NodeJS installé sur son environnement. Pour démarrer l'application, taper `grunt serve` dans la console.

__Projet en production__: Il se trouve à l'adresse suivante (pour le moment) : [](http://)

## Documentation

Naviguer dans le menu pour choisir un template. On retrouve le code html correspondant dans la zone à gauche.

Les `trackings`, les `couleurs` et le `surtitre` sont stockés en LocalStorage. Il suffit donc de cliquer sur les boutons (ou écrire le code couleur dans la zone d'input, ne pas oublier le # ) et de cliquer sur le surtitre pour modifier.

Lorsque l'on clique sur `copier dans le code HTML`, le code est ajouté à la zone située dans l'onglet __Code HTML__ et les codes relatifs à __AngularJS__ sont supprimés. On peut alors copier le code et le mettre dans l'éditeur de notre choix pour continuer la newsletter.

Ne pas oublier de changer le `[TITLE]` dans la zone. Il faudra re-cliquer sur le bouton pour charger les  modifications.

 ~~On peut récupérer le code généré par l'application __Mailrox__ dans l'onglet __Récupérer__ en chargeant le ficher `index.html`. ~~

 ~~Dans `scripts/generator/emailing.json` on retrouve le fichier json initial de Firebase. ~~

 ~~Pour l'instant, pour récupérer le code de la bonne version du template, il faut recharger la page puis cliquer sur la version de son choix dans le menu (cela ne se fait pas automatiquement). ~~ 

 ~~Par rapport aux routes, cliquer sur __Accueil__ puis recharger la page et enfin cliquer sur la version voulue (on peut vérifier que le bon code est chargé en regardant les `trackings` dans la zone de l'onglet __Générer__). ~~


###Todo:

Enlever la référence au background dans la balise style car la conversion ne se fait pas.

Enregistrer sur son ordinateur le template modifié en cliquant sur le bouton `Générer`.

Améliorer la navigation du choix des templates

Permettre la possibilité de charger des images et de leur attribuer un nom et un lien.

Refacto.



