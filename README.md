# Moto Solo Lite

Application web libre (AGPL-3.0) et minimaliste pour la moto, pensée pour le **téléphone uniquement** (portrait et paysage) : tableau de bord GPS, carte OpenStreetMap, navigation guidée et enregistrement de trajets. Elle se compose d'une seule page (`index.html`) et de quelques fichiers d'installation, sans compte, sans serveur et sans OBD.

> Projet personnel et indépendant. Il n'est lié ni à MOTO-HUB ADV-SOLO ni à ses auteurs.

Version actuelle : **7** (indiquée en bas du panneau « Plus »).

## Fonctionnalités

- **Tableau de bord** : vitesse GPS en grand, distance, durée, vitesse max et inclinaison, sur un écran qui ne défile jamais.
- **Carte OpenStreetMap** avec ta position, ton trajet tracé en rouge et l'itinéraire en bleu.
- **Orientation cap en haut** : la carte tourne avec ton cap (bouton **Cap ↑ / Nord ↑** pour choisir).
- **Recentrage automatique** quand tu commences à rouler, après un déplacement manuel de la carte (12 s) et au démarrage d'un trajet ou d'un itinéraire.
- **Navigation guidée** : recherche d'adresse, itinéraire, prochaine manœuvre, distance restante, heure d'arrivée, annonces vocales en français, recalcul automatique si tu quittes l'itinéraire.
- **Enregistrement de trajets** : historique enregistré sur le téléphone, export au format GPX.
- **Inclinaison et force G** mesurées avec les capteurs du téléphone (à fixer sur le guidage, puis remise à zéro à l'arrêt).
- **Installable comme une application** (icône, plein écran), et interface disponible même sans réseau.
- **Mode jour / nuit**, écran maintenu allumé pendant un trajet ou un guidage.

## Écrans

| Écran | Contenu |
|---|---|
| Principal | Vitesse, 4 indicateurs, carte, boutons **Démarrer/Arrêter**, **Destination**, **Suivi/Recentrer**, **Plus** |
| Destination | Recherche d'adresse ou de lieu, choix du résultat |
| Plus | Altitude, inclinaison max, force G max, capteurs, voix, jour/nuit, accès aux trajets |
| Mes trajets | Historique, export GPX, suppression |

La recherche de destination et les réglages sont à utiliser **à l'arrêt**. L'écran principal est conçu pour être consulté d'un coup d'œil.

## Mise en ligne avec GitHub Pages

1. Crée un dépôt **public** sur GitHub (par exemple `Nav-mot_`).
2. Envoie **tous les fichiers** (`index.html`, `manifest.webmanifest`, `sw.js` et les cinq icônes, voir « Structure du projet ») à la racine du dépôt : « Add file » ▸ « Upload files », puis « Commit changes ». Les noms doivent être exacts.
3. Dans « Settings » ▸ « Pages », choisis « Deploy from a branch », la branche `main` et le dossier `/ (root)`, puis enregistre.
4. Après quelques minutes, le site est disponible à `https://<ton-pseudo>.github.io/<nom-du-depot>/` (si le dépôt s'appelle `<ton-pseudo>.github.io`, l'adresse est simplement `https://<ton-pseudo>.github.io/`).
5. Sur le téléphone, ouvre l'adresse dans Chrome puis menu ⋮ ▸ « Installer l'application » (ou « Ajouter à l'écran d'accueil »). L'application s'ouvre ensuite en plein écran, avec son icône.

Pour mettre à jour, remplace `index.html` par la nouvelle version (même nom) et recharge la page, au besoin en navigation privée pour éviter le cache.

Le GPS et les capteurs exigent une adresse en **HTTPS** : ouvrir le fichier directement depuis le téléphone ne suffit pas.

## Utilisation

1. Autorise la localisation quand le navigateur la demande.
2. Facultatif : dans « Plus », active l'inclinaison, fixe le téléphone sur le guidon puis « Mettre l'inclinaison à zéro » à l'arrêt.
3. Choisis ta destination dans « Destination » et touche un résultat pour lancer le guidage.
4. Appuie sur **Démarrer** pour enregistrer le trajet, puis sur **Arrêter** à l'arrivée.
5. Retrouve et exporte tes trajets dans « Plus » ▸ « Mes trajets ».

## Limites connues

- **Itinéraires pour voiture** : le service de calcul utilisé n'a pas de profil moto (pas de routes sinueuses, pas d'évitement d'autoroute).
- **Connexion obligatoire** pour la carte, la recherche et les itinéraires : seule l'interface s'ouvre sans réseau.
- **Écran allumé obligatoire** : une page web ne guide plus quand l'écran se verrouille ou que le navigateur passe en arrière-plan.
- **Inclinaison** : elle se mesure avec les capteurs du téléphone, fixé sur le guidon **écran vers toi** (portrait ou paysage). Fais « Plus » ▸ « Mettre l'inclinaison à zéro » à l'arrêt, moto droite. Des vibrations ou une fixation qui bouge faussent la mesure.
- **Cap** : fourni par le GPS, mis à jour seulement au-dessus d'environ 6 km/h.
- **Noms de rues** : ils tournent avec la carte et peuvent apparaître à l'envers.
- **Services gratuits partagés** : sans garantie de disponibilité, avec des limites de débit (voir plus bas).

## Services tiers et licences

L'application charge ou appelle les services suivants :

| Service | Usage | Remarque |
|---|---|---|
| [Leaflet](https://leafletjs.com) 1.9.4 (cdnjs) | Affichage de la carte | Licence BSD-2-Clause |
| [OpenStreetMap](https://www.openstreetmap.org/copyright) (`tile.openstreetmap.org`) | Fond de carte | Données © contributeurs OpenStreetMap (ODbL), attribution affichée sur la carte. Convient à un usage personnel : voir la [politique d'utilisation des tuiles](https://operations.osmfoundation.org/policies/tiles/) |
| [Nominatim](https://nominatim.org) | Recherche d'adresse | Une requête par seconde maximum, pas d'autocomplétion (la recherche se lance au bouton) |
| [OSRM](https://project-osrm.org) (serveur de démonstration) | Calcul d'itinéraire | Usage non commercial et modéré, sans garantie |
| Google Fonts (Barlow, Barlow Condensed) | Polices | Les polices de secours du système prennent le relais si elles ne se chargent pas |

Pour un usage intensif, remplace les tuiles, la recherche et le routage par un fournisseur dédié (ou ta propre instance).

## Confidentialité

- Aucune donnée n'est envoyée à un serveur du projet : il n'y en a pas.
- Les **trajets sont enregistrés uniquement dans le navigateur du téléphone** (`localStorage`). Vider les données du site ou désinstaller l'application les efface : exporte-les en GPX pour les conserver.
- Les services tiers ci-dessus reçoivent les requêtes nécessaires à leur fonctionnement (zone de carte affichée, adresse recherchée, points de départ et d'arrivée de l'itinéraire, ainsi que l'adresse IP).

## Dépannage

| Problème | Piste |
|---|---|
| Page 404 | Vérifie l'adresse : si le dépôt n'est pas nommé `<pseudo>.github.io`, elle se termine par `/<nom-du-depot>/`. Vérifie aussi que le fichier s'appelle bien `index.html` et que Pages est activé. |
| Pas de position | Active la localisation précise du téléphone, autorise-la pour le site (Chrome ⋮ ▸ « Infos sur le site » ▸ « Autorisations »), rouvre le lien directement dans Chrome, sors à l'air libre, puis appuie sur « Suivi » pour réessayer. La pastille en bas à gauche de la carte indique la cause. |
| Carte grise ou vide | Vérifie la connexion internet. Si la carte affiche « Carte indisponible », la bibliothèque Leaflet n'a pas pu se charger. |
| Inclinaison à 0° ou figée | Sur iPhone, appuie sur « Activer l'inclinaison » dans « Plus » (ou sur « Démarrer »). Sur Android, autorise les capteurs de mouvement pour le site (Chrome ⋮ ▸ « Infos sur le site » ▸ « Autorisations »). Vérifie que le téléphone est bien fixé écran vers toi, puis fais la remise à zéro à l'arrêt. |
| Ancienne version affichée | Recharge en navigation privée, ou attends 1 à 2 minutes après l'envoi du fichier. |

## Sécurité

Ne manipule pas le téléphone en roulant. Prépare la destination à l'arrêt, fixe solidement l'appareil et respecte le code de la route. Les itinéraires, les annonces vocales et les mesures d'inclinaison sont **indicatifs** : ils peuvent être inexacts, et tu restes responsable de ta conduite.

## Structure du projet

```
index.html            # toute l'application (HTML, CSS, JavaScript)
manifest.webmanifest  # nom, icônes et affichage de l'application installée
sw.js                 # service worker : démarrage plus fiable, mises à jour immédiates
icon.svg              # silhouette de moto (source)
icon-192.png          # icône
icon-512.png          # icône
icon-maskable-512.png # icône adaptative Android
apple-touch-icon.png  # icône iPhone
README.md             # ce fichier
```

L'icône est un dessin original de roadster sportif, sans logo ni marque : le projet n'est affilié à aucun constructeur.

## Licence

Moto Solo Lite est publié sous licence **GNU Affero General Public License v3.0 ou ultérieure** (AGPL-3.0-or-later).

- Tu peux utiliser, étudier, modifier et redistribuer ce code.
- Toute version modifiée que tu redistribues, ou que tu proposes en ligne à d'autres personnes, doit rester sous AGPL-3.0 et rendre son code source accessible.
- Le programme est fourni **sans aucune garantie**.

Texte complet de la licence : <https://www.gnu.org/licenses/agpl-3.0.html>

Copyright (C) 2026 kemk
