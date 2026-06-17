// ============================================================
//  DENTSUS V7 XMD — plugins/general/menu.js
//  Commands: menu, help, alive, ping, botinfo, owner, repo, donate
// ============================================================

const { registerPlugin } = global;
const { buildMenuText } = require('../../lib/menu');
const { msToHuman } = require('../../lib/utils');
const fs   = require('fs');
const path = require('path');
const config = require('../../config');

const MENU_IMG = path.join(__dirname, '..', '..', 'assets', 'menu.jpg');

registerPlugin('menu', async ({ sock, msg, jid }) => {
  const text = buildMenuText();
  if (fs.existsSync(MENU_IMG)) {
    await sock.sendMessage(jid, { image: fs.readFileSync(MENU_IMG), caption: text }, { quoted: msg });
  } else {
    await sock.sendMessage(jid, { text }, { quoted: msg });
  }
});

registerPlugin('help', async (ctx) => {
  const text = buildMenuText();
  await ctx.reply(text);
});

registerPlugin('alive', async ({ sock, msg, jid }) => {
  const uptime = msToHuman(Date.now() - global.botStartTime);
  await sock.sendMessage(jid, {
    text: `╔══════════════════╗\n` +
          `║  ⚡ *${config.BOT_NAME}*\n` +
          `╚══════════════════╝\n\n` +
          `✅ *Je suis en ligne !*\n\n` +
          `⏱ *Uptime :* ${uptime}\n` +
          `📦 *Plugins :* ${global.plugins.size}\n` +
          `🔧 *Préfixe :* ${config.PREFIX}\n` +
          `👑 *Owner :* ${config.OWNER_NAME}`,
  }, { quoted: msg });
});

registerPlugin('ping', async ({ sock, msg, jid }) => {
  const start = Date.now();
  const sent  = await sock.sendMessage(jid, { text: '🏓 Calcul de la latence...' }, { quoted: msg });
  const ms    = Date.now() - start;
  await sock.sendMessage(jid, { text: `🏓 *Pong!*\n⚡ Latence : *${ms}ms*` }, { quoted: msg });
});

registerPlugin('botinfo', async ({ sock, msg, jid }) => {
  const uptime = msToHuman(Date.now() - global.botStartTime);
  await sock.sendMessage(jid, {
    text: `🤖 *INFORMATIONS DU BOT*\n\n` +
          `📛 *Nom :* ${config.BOT_NAME}\n` +
          `🔖 *Version :* v${config.VERSION}\n` +
          `👑 *Propriétaire :* ${config.OWNER_NAME}\n` +
          `🔧 *Préfixe :* ${config.PREFIX}\n` +
          `📦 *Commandes :* ${global.plugins.size}\n` +
          `⏱ *Uptime :* ${uptime}\n` +
          `🌐 *Sessions :* ${global.sessions.size}\n` +
          `🛠 *Stack :* Node.js + Baileys`,
  }, { quoted: msg });
});

registerPlugin('owner', async ({ sock, msg, jid }) => {
  await sock.sendMessage(jid, {
    text: `👑 *PROPRIÉTAIRE*\n\n` +
          `👤 *Nom :* ${config.OWNER_NAME}\n` +
          `📱 *Numéros :*\n` +
          config.OWNER.map(n => `  • +${n}`).join('\n'),
  }, { quoted: msg });
});

registerPlugin('repo', async (ctx) => {
  await ctx.reply(`📦 *Repo GitHub :*\nhttps://github.com/votre-username/dentsu-xmd-v7`);
});

registerPlugin('donate', async (ctx) => {
  await ctx.reply(`💖 *Soutenir le projet :*\n\nMerci pour ton soutien à *${config.OWNER_NAME}* !\nContacte le propriétaire pour plus d'infos.`);
});

registerPlugin('support', async (ctx) => {
  await ctx.reply(`🆘 *Support :*\nContacte ${config.OWNER_NAME}\nNuméros : ${config.OWNER.map(n => '+' + n).join(' · ')}`);
});

registerPlugin('contact', async (ctx) => {
  await ctx.reply(`📞 *Contact :*\n${config.OWNER.map(n => `wa.me/${n}`).join('\n')}`);
});
