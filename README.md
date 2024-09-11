# weenat-test-technique

Test technique, disponible sur une GithubPage [ici](https://theolallement.github.io/weenat-test-technique/)
|

### Fonctionnalités

Cette application montre un exemple de calendrier à affichage mensuel avec une gestion d'évènements basiques.

- changement de mois et d'années avec un input natif afin d'etre accessible sur tous les appareils
- ajout d'un évènement au click sur un jour
- modification du titre de l'évènement lors d'un click sur un évènement
- suppression d'un évènement au click sur le bouton de suppression

### Idées d'améliorations possibles

Fonctionel :

- Gestion de plusieurs calendriers (couleurs différentes pour chaque évènement)
- Dialog pour la confirmation de suppression
- Gestion des heures sur les évènements et tri en fonction des heures
- Gestion des évènements sur plusieurs jours

Technique :

- ajout de tests de composants (Cypress ou Playwright par exemple)
- poussé la séparation Vue/TS plus loin afin de n'avoir aucune référence aux implémentations dans les fichiers .vue (permet de faciliter la migration vers une autre techno par exemple)
- utilisation du SCSS et définition de styles globales plus complets

## Lancement du projet en local

```sh
npm install
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
