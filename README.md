Générateur de newsletters
==================

Pour voir le projet en dev, il faut avoir NodeJS installé sur son environnement. 
Pour démarrer l'application, taper `grunt serve` dans la console.


## Documentation

Naviguer dans le menu pour choisir un template. On retrouve le code html correspondant dans la zone à gauche.

Les `trackings`, les `couleurs` et le `surtitre` sont stockés en Base de données (FireBase). Il suffit donc de cliquer sur les boutons (ou écrire le code couleur dans la zone d'input, ne pas oublier le # ) et de cliquer sur le surtitre pour modifier.

Lorsque l'on clique sur `copier dans l'onglet Générer`, le code est ajouté à la zone située dans l'onglet __Générer__ et les codes relatifs à __AngularJS__ sont supprimés.

Ne pas oublier de changer le `[TITLE]` dans la zone.

On peut récupérer le code généré par l'application __Mailrox__ dans l'onglet __Récupérer__ en chargeant le ficher `index.html`.

Que l'on soit sur l'onglet __Récupérer__ ou __Générer__, on peut retrouver le rendu des templates à tout moment en cliquant sur la navigation.

Pour l'instant, pour récupérer le code de la bonne version du template, il faut recharger la page puis cliquer sur la version de son choix dans le menu (cela ne se fait pas automatiquement).

