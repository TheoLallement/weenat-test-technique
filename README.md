# weenat-test-technique

Test technique, disponible sur une GithubPage [ici](https://theolallement.github.io/weenat-test-technique/)
|

### Choix d'implémentation

- **gitmoji :** alternative au conventionnal commit avec des emojis
- **Déploiement :** github page car permet de montrer un exemple de Github Actions
- **Accessibilité :** Travail basique au niveau de l'accessibilité (tabulation, role, aria-label, etc.), surement possibilité d'améliorer mais étant précisé que l'UI était peu important, pas de travail supplémentaire
- **Utilisation de composants HTML natifs :** form, button (submit et reset),
  dialog; Choix de rester sur de l'HTML classique pour simplifier la gestion des évènements et erreurs, dans un projet plus conséquent chaque élément aurait été repris pour etre 100% customisé

### Difficultés rencontrées

- **gestion de l'édition/addition d'un article sur le meme article :**
  Difficulté sur la gestion de la réactivité et du data flow afin de conserver la réactivité sans trop alourdir le code

### Améliorations possibles

- **CSS :** différents points possible pour améliorer le code et l'interface
  - retravail des variables css pour séparer fonctionnellement les variables (couleurs et fonction par exemple)
  - création d'utilitaire pour gérer et uniformiser espacements / largeur d'éléments (façon grille bootstrap par exemple)
- **CICD :** ajout de la gestion d'une release et release note ([gitmoji-changelog](https://github.com/frinyvonnick/gitmoji-changelog) par exemple)
- **UX :** ajout d'une "vraie" validation de formulaire avec des messages d'erreurs au niveau des inputs (avec [aync-validator](https://github.com/yiminghe/async-validator) par exemple)

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
