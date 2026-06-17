// ============================================================
//  DENTSUS V7 XMD — plugins/downloads/downloader.js
//  18 commands
// ============================================================

const { registerPlugin } = global;
const { fetchJson, fetchBuffer, pickRandom } = require('../../lib/utils');
const axios = require('axios');

registerPlugin('ytmp3', async ({ sock, msg, jid, args }) => {
  const url = args[0];
  if (!url) return sock.sendMessage(jid, { text: '❌ Usage: .ytmp3 <lien YouTube>' }, { quoted: msg });
  await sock.sendMessage(jid, { text: '⏳ Téléchargement audio en cours...' }, { quoted: msg });
  try {
    const api = `https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(url)}`;
    const data = await fetchJson(api);
    if (!data?.data?.downloadUrl) throw new Error('URL introuvable');
    const buf = await fetchBuffer(data.data.downloadUrl);
    await sock.sendMessage(jid, {
      audio: buf,
      mimetype: 'audio/mpeg',
      fileName: (data.data.title || 'audio') + '.mp3',
    }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(jid, { text: `❌ Erreur: ${e.message}` }, { quoted: msg });
  }
});

registerPlugin('ytmp4', async ({ sock, msg, jid, args }) => {
  const url = args[0];
  if (!url) return sock.sendMessage(jid, { text: '❌ Usage: .ytmp4 <lien YouTube>' }, { quoted: msg });
  await sock.sendMessage(jid, { text: '⏳ Téléchargement vidéo en cours...' }, { quoted: msg });
  try {
    const api = `https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(url)}`;
    const data = await fetchJson(api);
    if (!data?.data?.downloadUrl) throw new Error('URL introuvable');
    const buf = await fetchBuffer(data.data.downloadUrl);
    await sock.sendMessage(jid, {
      video: buf,
      caption: data.data.title || 'Vidéo YouTube',
      mimetype: 'video/mp4',
    }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(jid, { text: `❌ Erreur: ${e.message}` }, { quoted: msg });
  }
});

registerPlugin('play', async ({ sock, msg, jid, args }) => {
  const query = args.join(' ');
  if (!query) return sock.sendMessage(jid, { text: '❌ Usage: .play <titre chanson>' }, { quoted: msg });
  await sock.sendMessage(jid, { text: `⏳ Recherche de "${query}"...` }, { quoted: msg });
  try {
    const ytSearch = require('yt-search');
    const result = await ytSearch(query);
    const video  = result.videos?.[0];
    if (!video) return sock.sendMessage(jid, { text: '❌ Aucun résultat trouvé.' }, { quoted: msg });
    const api  = `https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(video.url)}`;
    const data = await fetchJson(api);
    if (!data?.data?.downloadUrl) throw new Error('URL introuvable');
    const buf  = await fetchBuffer(data.data.downloadUrl);
    await sock.sendMessage(jid, {
      audio: buf,
      mimetype: 'audio/mpeg',
      fileName: video.title + '.mp3',
    }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(jid, { text: `❌ Erreur: ${e.message}` }, { quoted: msg });
  }
});

registerPlugin('lyrics', async ({ sock, msg, jid, args }) => {
  const query = args.join(' ');
  if (!query) return sock.sendMessage(jid, { text: '❌ Usage: .lyrics <titre - artiste>' }, { quoted: msg });
  try {
    const [title, artist] = query.includes('-') ? query.split('-').map(s => s.trim()) : [query, ''];
    const url  = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist || title)}/${encodeURIComponent(title)}`;
    const data = await fetchJson(url);
    const lyrics = data.lyrics?.trim();
    if (!lyrics) return sock.sendMessage(jid, { text: '❌ Paroles introuvables.' }, { quoted: msg });
    const chunks = lyrics.match(/.{1,3000}/gs) || [lyrics];
    for (const chunk of chunks) {
      await sock.sendMessage(jid, { text: chunk }, { quoted: msg });
    }
  } catch {
    await sock.sendMessage(jid, { text: '❌ Paroles introuvables.' }, { quoted: msg });
  }
});

registerPlugin('tiktok', async ({ sock, msg, jid, args }) => {
  const url = args[0];
  if (!url) return sock.sendMessage(jid, { text: '❌ Usage: .tiktok <lien TikTok>' }, { quoted: msg });
  await sock.sendMessage(jid, { text: '⏳ Téléchargement TikTok...' }, { quoted: msg });
  try {
    const api  = `https://api.siputzx.my.id/api/d/tiktok?url=${encodeURIComponent(url)}`;
    const data = await fetchJson(api);
    if (!data?.data?.video) throw new Error('Vidéo introuvable');
    const buf  = await fetchBuffer(data.data.video);
    await sock.sendMessage(jid, { video: buf, caption: data.data.title || 'TikTok', mimetype: 'video/mp4' }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(jid, { text: `❌ Erreur: ${e.message}` }, { quoted: msg });
  }
});

registerPlugin('instagram', async ({ sock, msg, jid, args }) => {
  const url = args[0];
  if (!url) return sock.sendMessage(jid, { text: '❌ Usage: .instagram <lien>' }, { quoted: msg });
  await sock.sendMessage(jid, { text: '⏳ Téléchargement Instagram...' }, { quoted: msg });
  try {
    const api  = `https://api.siputzx.my.id/api/d/instagram?url=${encodeURIComponent(url)}`;
    const data = await fetchJson(api);
    if (!data?.data) throw new Error('Média introuvable');
    const mediaUrl = Array.isArray(data.data) ? data.data[0] : data.data;
    const buf  = await fetchBuffer(mediaUrl);
    await sock.sendMessage(jid, { image: buf, caption: '📸 Instagram' }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(jid, { text: `❌ Erreur: ${e.message}` }, { quoted: msg });
  }
});

registerPlugin('ig', async ({ sock, msg, jid, args }) => {
  const url = args[0];
  if (!url) return sock.sendMessage(jid, { text: '❌ Usage: .ig <lien Instagram>' }, { quoted: msg });
  // Same as instagram
  const api = `https://api.siputzx.my.id/api/d/instagram?url=${encodeURIComponent(url)}`;
  try {
    const data = await fetchJson(api);
    const mediaUrl = Array.isArray(data?.data) ? data.data[0] : data?.data;
    if (!mediaUrl) throw new Error('Introuvable');
    const buf = await fetchBuffer(mediaUrl);
    await sock.sendMessage(jid, { image: buf, caption: '📸 Instagram' }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(jid, { text: `❌ Erreur: ${e.message}` }, { quoted: msg });
  }
});

registerPlugin('twitter', async ({ sock, msg, jid, args }) => {
  const url = args[0];
  if (!url) return sock.sendMessage(jid, { text: '❌ Usage: .twitter <lien tweet>' }, { quoted: msg });
  await sock.sendMessage(jid, { text: '⏳ Téléchargement Twitter/X...' }, { quoted: msg });
  try {
    const api  = `https://api.siputzx.my.id/api/d/twitter?url=${encodeURIComponent(url)}`;
    const data = await fetchJson(api);
    if (!data?.data?.video) throw new Error('Vidéo introuvable');
    const buf  = await fetchBuffer(data.data.video);
    await sock.sendMessage(jid, { video: buf, caption: '🐦 Twitter/X', mimetype: 'video/mp4' }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(jid, { text: `❌ Erreur: ${e.message}` }, { quoted: msg });
  }
});

registerPlugin('tw', async ({ sock, msg, jid, args }) => {
  return sock.sendMessage(jid, { text: '⬆️ Utilise .twitter <lien>' }, { quoted: msg });
});

registerPlugin('facebook', async ({ sock, msg, jid, args }) => {
  const url = args[0];
  if (!url) return sock.sendMessage(jid, { text: '❌ Usage: .facebook <lien>' }, { quoted: msg });
  await sock.sendMessage(jid, { text: '⏳ Téléchargement Facebook...' }, { quoted: msg });
  try {
    const api  = `https://api.siputzx.my.id/api/d/facebook?url=${encodeURIComponent(url)}`;
    const data = await fetchJson(api);
    if (!data?.data?.video) throw new Error('Vidéo introuvable');
    const buf  = await fetchBuffer(data.data.video);
    await sock.sendMessage(jid, { video: buf, caption: '📘 Facebook', mimetype: 'video/mp4' }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(jid, { text: `❌ Erreur: ${e.message}` }, { quoted: msg });
  }
});

registerPlugin('fb', async ({ sock, msg, jid, args }) => {
  return sock.sendMessage(jid, { text: '⬆️ Utilise .facebook <lien>' }, { quoted: msg });
});

registerPlugin('soundcloud', async ({ sock, msg, jid, args }) => {
  const query = args.join(' ');
  if (!query) return sock.sendMessage(jid, { text: '❌ Usage: .soundcloud <titre>' }, { quoted: msg });
  await sock.sendMessage(jid, { text: `⏳ Recherche SoundCloud: "${query}"...` }, { quoted: msg });
  try {
    const api  = `https://api.siputzx.my.id/api/d/soundcloud?url=${encodeURIComponent(query)}`;
    const data = await fetchJson(api);
    if (!data?.data?.downloadUrl) throw new Error('Audio introuvable');
    const buf  = await fetchBuffer(data.data.downloadUrl);
    await sock.sendMessage(jid, { audio: buf, mimetype: 'audio/mpeg' }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(jid, { text: `❌ Erreur: ${e.message}` }, { quoted: msg });
  }
});

registerPlugin('sc', async ({ sock, msg, jid, args }) => {
  return sock.sendMessage(jid, { text: '⬆️ Utilise .soundcloud <titre>' }, { quoted: msg });
});

registerPlugin('pinterest', async ({ sock, msg, jid, args }) => {
  const query = args.join(' ');
  if (!query) return sock.sendMessage(jid, { text: '❌ Usage: .pinterest <recherche>' }, { quoted: msg });
  try {
    const api  = `https://api.siputzx.my.id/api/s/pinterest?q=${encodeURIComponent(query)}`;
    const data = await fetchJson(api);
    const images = data?.data || [];
    if (!images.length) return sock.sendMessage(jid, { text: '❌ Aucun résultat.' }, { quoted: msg });
    const buf  = await fetchBuffer(pickRandom(images));
    await sock.sendMessage(jid, { image: buf, caption: `📌 Pinterest: ${query}` }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(jid, { text: `❌ Erreur: ${e.message}` }, { quoted: msg });
  }
});

registerPlugin('wallpaper', async ({ sock, msg, jid, args }) => {
  const query = args.join(' ') || 'nature';
  try {
    const url  = `https://source.unsplash.com/1920x1080/?${encodeURIComponent(query)}`;
    const buf  = await fetchBuffer(url);
    await sock.sendMessage(jid, { image: buf, caption: `🖼️ Wallpaper: ${query}` }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(jid, { text: `❌ Erreur: ${e.message}` }, { quoted: msg });
  }
});

registerPlugin('catimg', async ({ sock, msg, jid }) => {
  try {
    const data = await fetchJson('https://api.thecatapi.com/v1/images/search');
    const buf  = await fetchBuffer(data[0].url);
    await sock.sendMessage(jid, { image: buf, caption: '🐱 Miaou !' }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(jid, { text: `❌ Erreur: ${e.message}` }, { quoted: msg });
  }
});

registerPlugin('dogimg', async ({ sock, msg, jid }) => {
  try {
    const data = await fetchJson('https://dog.ceo/api/breeds/image/random');
    const buf  = await fetchBuffer(data.message);
    await sock.sendMessage(jid, { image: buf, caption: '🐶 Woof !' }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(jid, { text: `❌ Erreur: ${e.message}` }, { quoted: msg });
  }
});

registerPlugin('giphy', async ({ sock, msg, jid, args }) => {
  const query = args.join(' ') || 'funny';
  try {
    const api  = `https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${encodeURIComponent(query)}&limit=10`;
    const data = await fetchJson(api);
    const gifs = data?.data || [];
    if (!gifs.length) return sock.sendMessage(jid, { text: '❌ Aucun GIF trouvé.' }, { quoted: msg });
    const gif  = pickRandom(gifs);
    const buf  = await fetchBuffer(gif.images.original.url);
    await sock.sendMessage(jid, { video: buf, gifPlayback: true, caption: `🎬 ${query}` }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(jid, { text: `❌ Erreur: ${e.message}` }, { quoted: msg });
  }
});
