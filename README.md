# HopBot

Un simple bot [Discord](https://discord.com) développé à titre d'apprentissage en [Node.js](https://nodejs.org) avec module [Discord.js](https://discord.js.org).

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Assurez-vous d'avoir [Node.js](https://nodejs.org) installé ( [version 18.16.1 LTS](https://nodejs.org) ou plus récent )
3. Exécutez la commande `npm install` pour installer les dépendances.

## Configuration

Avant d'exécuter l'application, vous devez configurer les paramètres dans le fichier `settings.json`. Assurez-vous de fournir les valeurs appropriées pour les champs suivants :
```json
{
  "bot": {
    "status": "🥕",
    "guilde": "",
    "colors": {
      "primary": "#5bc0de",
      "success": "#5cb85c",
      "warning": "#f0ad4e",
      "danger": "#d9534f"
    }
  },
  "api": {
    "discord": "",
    "blagues": "",
    "yiffy": ""
  }
}
```

- **status :** Statut par défaut affiché par le bot.
- **guilde :** ID de votre serveur Discord.
- **colors :** Configuration des différentes couleurs d'embed.
- **discord :** Votre jeton d'API Discord.
- **blagues :** Votre jeton d'API "blagues-api.fr".
- **yiffy :** Votre jeton d'API "yiff.rest".

## Utilisation

Exécutez la commande `node index.js` pour démarrer l'application.  

## Fonctionnalités

 - **/ASCII :** Transforme votre message en texte ASCII ( utilise le module `figlet` ).
 - **/Joke :** Affiche une blague ( de la catégorie de votre choix ) depuis l'API : [blagues-api.fr](https://www.blagues-api.fr).
 - **/Love :** Calcul votre pourcentage de compatibilité amoureuse avec un utilisateur.
 - **/Ping :** Affiche le ping du bot. 
 - **/Rand :** Affiche un jeté de dés sur une plage configurable ( défaut /100 ).
 - **/React :** Affiche une image de type furry ou weeb de la catégorie de votre choix depuis les API : [yiff.rest](https://yiff.rest/) et [nekos.best](https://nekos.best/).
 - **/Restart :** Redémarre le bot.
 - **/Say :** Affiche votre message depuis le bot.
 - **/Uptime :** Affiche la durée depuis laquelle le bot est en ligne.
