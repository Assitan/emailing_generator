Générateur de newsletters
==================

__Projet en développement__: Il faut avoir NodeJS installé sur son environnement. Pour démarrer l'application, taper `grunt serve` dans la console.

__Projet en production__: Il se trouve à l'adresse suivante (pour le moment) : [](http://)

## Documentation

Naviguer dans le menu pour choisir un template. On retrouve le code html correspondant dans la zone à gauche.

Les `trackings`, les `couleurs` et le `surtitre` sont stockés en LocalStorage. Il suffit donc de cliquer sur les boutons (ou écrire le code couleur dans la zone d'input, ne pas oublier le # ) et de cliquer sur le surtitre pour modifier.

Lorsque l'on clique sur `copier dans le code HTML`, le code est ajouté à la zone située dans l'onglet __Code HTML__ et les codes relatifs à __AngularJS__ sont supprimés. On peut alors copier le code et le mettre dans l'éditeur de notre choix pour continuer la newsletter.

Ne pas oublier de changer le `[TITLE]` dans la zone. Il faudra re-cliquer sur le bouton pour charger les  modifications.


###Todo:

- Enregistrer sur son ordinateur le template modifié en cliquant sur le bouton `Générer`.

- Améliorer la navigation du choix des templates

- Permettre de charger des images et de leur attribuer un nom et un lien.

- Refactoring.



