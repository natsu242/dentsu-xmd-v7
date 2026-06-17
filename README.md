# ⚡ DENTSUS V7 XMD

**WhatsApp Multi-Session Bot — by Natsu Tech**

> 162+ commandes stables | Multi-session | Dashboard web | Plugins hot-reload

---

## 🚀 Lancement rapide

```bash
npm install
npm start
```

Au premier démarrage sans session, le bot affiche un **code de jumelage** dans la console.
Va dans WhatsApp → **Appareils connectés** → **Lier avec un numéro de téléphone**.

---

## 🌐 Multi-Session

Pour connecter plusieurs numéros WhatsApp simultanément, ajoute des variables d'environnement :

```env
SESSION_ID=dentsu~<base64>      ← numéro principal
SESSION_2=dentsu~<base64>       ← 2e numéro
SESSION_3=dentsu~<base64>       ← 3e numéro
```

Chaque session tourne de façon indépendante mais partage les mêmes plugins.

---

## 📦 162+ Commandes par catégorie

| Catégorie | Commandes |
|---|---|
| 🌐 Général (20) | menu, help, alive, ping, botinfo, owner, id, time, date, runtime, version, speed, serverinfo, myinfo, qr, qrcode, repo, donate, support, contact |
| 🎭 Fun (25) | joke, 8ball, flip, dice, love, roast, compliment, quote, fact, truth, dare, wyr, riddle, story, poem, horoscope, trivia, rps, coinflip, password, number, rate, word, slap, hug |
| 🖼️ Sticker/Média (12) | sticker, s, toimg, attp, ttp, blur, grayscale, invert, rotate, circle, resize, meme |
| 📥 Téléchargements (18) | ytmp3, ytmp4, play, lyrics, tiktok, instagram, ig, twitter, tw, facebook, fb, soundcloud, sc, pinterest, wallpaper, catimg, dogimg, giphy |
| 👥 Groupe/Admin (22) | kick, add, promote, demote, mute, unmute, open, close, revoke, setname, setdesc, invite, listmembers, listadmins, tagall, hidetag, groupinfo, antilink, antispam, welcome, setwelcome, goodbye |
| 🤖 IA/Outils (20) | gpt, ask, translate, dictionary, wikipedia, wiki, calculate, calc, currency, shorturl, weather, news, country, github, npm, base64, md5, sha256, color, qrcode |
| 💰 Économie (12) | balance, bal, daily, work, rob, pay, leaderboard, lb, deposit, dep, withdraw, shop |
| 📝 Notes/Rappels (15) | note, notes, listnotes, delnote, todo, listtodo, deltodo, reminder, poll, vote, feedback, report, rules, announce, tagannounce |
| 👑 Propriétaire (18) | broadcast, bc, block, unblock, ban, unban, listblock, eval, restart, shutdown, setprefix, addowner, removeowner, cleardb, update, exec, log, setbotname |

**Total : 162 commandes**

---

## ⚙️ Variables d'environnement

| Variable | Description | Défaut |
|---|---|---|
| `SESSION_ID` | Session principale (commence par `dentsu~`) | *(jumelage)* |
| `SESSION_2` ... `SESSION_10` | Sessions supplémentaires | *(optionnel)* |
| `AUTOREAD_ENABLED` | Lire les messages automatiquement | `false` |
| `AUTOTYPING_ENABLED` | Présence "en train d'écrire" | `false` |
| `AUTORECORD_ENABLED` | Présence "en train d'enregistrer" | `false` |
| `AUTOLIKE_ENABLED` | Liker les statuts automatiquement | `false` |
| `DASHBOARD_PORT` | Port du dashboard web | `3000` |

---

## 🌐 Déploiement

### Render *(recommandé — gratuit)*
1. Push sur GitHub
2. [render.com](https://render.com) → **New** → **Web Service** → connecte ton repo
3. Render détecte automatiquement `render.yaml`
4. Ajoute `SESSION_ID` dans **Environment** → **Environment Variables**
5. Deploy !

### Pterodactyl Panel
1. Crée un server **Node.js**
2. Upload les fichiers (ou `git clone`)
3. Startup command : `npm install && npm start`
4. Ajoute les variables d'environnement dans le panel
5. Start !

### Vercel / Netlify
> ⚠️ **Non recommandé** — ces plateformes sont conçues pour des apps statiques/serverless. Un bot WhatsApp nécessite une connexion persistante (WebSocket). Utilise **Render** ou **Pterodactyl** à la place.

---

## 📁 Structure

```
dentsu-xmd-v7/
├── index.js                    # Point d'entrée multi-session
├── config.js                   # Configuration
├── fetchPlugins.js             # Chargeur de plugins (transparent)
├── dashboard.js                # Dashboard HTTP live
├── render.yaml                 # Config déploiement Render
├── lib/
│   ├── utils.js               # Helpers partagés
│   ├── database.js            # SQLite (économie, notes, settings)
│   └── menu.js                # Générateur de menu
├── plugins/
│   ├── general/               # menu, ping, botinfo...
│   ├── fun/                   # joke, 8ball, trivia...
│   ├── sticker/               # sticker, blur, rotate...
│   ├── downloads/             # ytmp3, tiktok, instagram...
│   ├── group/                 # kick, tagall, antilink...
│   ├── ai/                    # gpt, translate, weather...
│   ├── economy/               # balance, daily, work...
│   ├── owner/                 # broadcast, eval, exec...
│   └── notes/                 # note, todo, poll...
└── assets/
    └── menu.jpg               # Image du menu (optionnel)
```

---

## 🧩 Ajouter un plugin

Crée un fichier dans `plugins/<categorie>/macommande.js` :

```js
const { registerPlugin } = global;

registerPlugin('hello', async ({ sock, msg, jid, pushName }) => {
  await sock.sendMessage(jid, { text: `👋 Bonjour ${pushName} !` }, { quoted: msg });
});
```

Le bot le charge automatiquement (hot-reload actif).

---

## 👑 Propriétaire

- **Nom :** Natsu Tech / Dev
- **Numéros :** +242053323191 · +242065121108
