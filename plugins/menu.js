/**
 * 𝗠𝖤𝑁𝑻𝐀𝐋-𝐉𝐔𝐓𝐓-𝐗-𝗠𝗨𝘋𝐒𝐈𝐑-𝒁𝑰𝑫𝑰-ᴹᴰ-MINI - Menu Plugin with Channel Forward
 */

import { cmd } from '../lib/command.js';
import commandRegistry from '../lib/commandRegistry.js';
import config from '../setting.js';

const MENU_IMAGE = process.env.MAIN_IMG || config.MAIN_IMG || 'https://files.catbox.moe/cikirz.png';
const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbCpCAQFy728iWgzex1d';
const CHANNEL_POST = 'https://whatsapp.com/channel/0029VbCpCAQFy728iWgzex1d/314';

// ── Unicode Bold Converter ───────────────────────────────────────────
const BL = ['𝗮','𝗯','𝗰','𝗱','𝗲','𝗳','𝗴','𝗵','𝗶','𝗷','𝗸','𝗹','𝗺','𝗻','𝗼','𝗽','𝗾','𝗿','𝘀','𝘁','𝘂','𝘃','𝘄','𝘅','𝘆','𝘇'];
const BU = ['𝗔','𝗕','𝗖','𝗗','𝗘','𝗙','𝗚','𝗛','𝗜','𝗝','𝗞','𝗟','𝗠','𝗡','𝗢','𝗣','𝗤','𝗥','𝗦','𝗧','𝗨','𝗩','𝗪','𝗫','𝗬','𝗭'];
const LOW = 'abcdefghijklmnopqrstuvwxyz';
const UPP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function bold(str) {
    return [...String(str)].map(c => {
        const li = LOW.indexOf(c); if (li !== -1) return BL[li];
        const ui = UPP.indexOf(c); if (ui !== -1) return BU[ui];
        return c;
    }).join('');
}

// ── Loading Emojis ───────────────────────────────────────────────────
const loadEmojis = ['⏳', '⌛', '🚀', '✨'];

// ── Get Uptime ──────────────────────────────────────────────────────
function getUptime() {
    const s = Math.floor(process.uptime());
    const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60);
    if (d > 0) return `${d}d ${h}h ${m}m`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
}

cmd({
    pattern: 'menu',
    alias: ['help', 'cmds'],
    category: 'info',
    desc: 'Bot command menu with channel forward'
}, async (sock, msg, data) => {
    const { from, reply, sender, prefix, msgKey } = data;
    const p = prefix || config.PREFIX || '.';
    const botName = config.BOT_NAME || '𝗠𝖤𝑁𝑻𝐀𝐋-𝐉𝐔𝐓𝐓-𝐗-𝗠𝗨𝘋𝐒𝐈𝐑-𝒁𝑰𝑫𝑰-ᴹᴰ';
    const mode = config.MODE === 'private' ? bold('Private 🔐') : bold('Public 🌍');
    const userName = msg.pushName || sender || 'User';

    // ── Send Loading Reactions ──────────────────────────────────────
    for (const emoji of loadEmojis) {
        await sock.sendMessage(from, { react: { text: emoji, key: msgKey } }).catch(() => {});
    }

    // ── Build Menu Text ─────────────────────────────────────────────
    const menuText = 
`╭━━━〔 ${bold("𝗠𝖤𝑁𝑻𝐀𝐋-𝐉𝐔𝐓𝐓-𝐗-𝗠𝗨𝘋𝐒𝐈𝐑-𝒁𝑰𝑫𝑰-ᴹᴰ")} 〕━━━┈⊷
┃ 👤 ${bold("User:")} ${userName}
┃ 🤖 ${bold("Status:")} ${bold("Online ✅")}
┃ ⚙️ ${bold("Mode:")} ${mode}
┃ ⏱️ ${bold("Uptime:")} ${getUptime()}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈⊷

╭━━━〔 📋 *COMMANDS* 〕━━━┈⊷
┃ ⋄ .ping - Check speed
┃ ⋄ .owner - Bot owner
┃ ⋄ .ai - AI chat
┃ ⋄ .antilink - Anti-link
┃ ⋄ .anticall - Anti-call
┃ ⋄ .antidelete - Anti-delete
┃ ⋄ .autostatus - Auto status
┃ ⋄ .autoreacts - Auto reacts
┃ ⋄ .kick - Kick member
┃ ⋄ .private/.public - Toggle mode
┃ ⋄ .hidetag - Hidden tag all
┃ ⋄ .tagall - Tag all
┃ ⋄ .setname - Set bot name
┃ ⋄ .insta - Instagram download
┃ ⋄ .tiktok - TikTok download
┃ ⋄ .song - Audio download
┃ ⋄ .video - Video download
┃ ⋄ .joke - Random joke
┃ ⋄ .meme - Random meme
┃ ⋄ .vv - View-once download
┃ ⋄ .dp - Profile picture
┃ ⋄ .groupinfo - Group info
┃ ⋄ .gdrive - Google Drive
┃ ⋄ .mf - MediaFire
┃ ⋄ .translate - Translate text
┃ ⋄ .apk - APK download
┃ ⋄ .character - Character analysis
┃ ⋄ .emojimix - Mix emojis
┃ ⋄ .facebook - Facebook download
┃ ⋄ .hack - Fake hack
┃ ⋄ .accept - Accept join requests
┃ ⋄ .kickoffline - Kick offline
┃ ⋄ .antistatus - Anti-status share
┃ ⋄ .addcmd - Add custom command (Owner)
┃ ⋄ .delcmd - Delete custom command (Owner)
┃ ⋄ .listcmd - List custom commands
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━┈⊷

╔══❰📥 ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ ❱══╗
║ ─ ғᴀᴄᴇʙᴏᴏᴋ
║ ─ ᴍᴇᴅɪᴀғɪʀᴇ
║ ─ ᴛɪᴋᴛᴏᴋ
║ ─ ᴛᴡɪᴛᴛᴇʀ
║ ─ ɪɴsᴛᴀ
║ ─ ᴀᴘᴋ
║ ─ ɪᴍɢ
║ ─ ᴛᴛ2
║ ─ ᴘɪɴs
║ ─ ᴀᴘᴋ2
║ ─ ғʙ2
║ ─ ᴘɪɴᴛᴇʀᴇsᴛ
║ ─ sᴘᴏᴛɪғʏ
║ ─ ᴘʟᴀʏ
║ ─ ᴘʟᴀʏ2
║ ─ ᴀᴜᴅɪᴏ
║ ─ ᴠɪᴅᴇᴏ
║ ─ ᴠɪᴅᴇᴏ2
║ ─ ʏᴛᴍᴘ3
║ ─ ʏᴛᴍᴘ4
║ ─ sᴏɴɢ
║ ─ ᴅᴀʀᴀᴍᴀ
║ ─ ɢᴅʀɪᴠᴇ
║ ─ ssᴡᴇʙ
║ ─ ᴀɪᴀʀᴛ
║ ─ ᴛɪᴋs
║ ─ sᴘʟᴀʏ
║ ─ sᴘᴏᴛɪғʏᴘʟᴀʏ
╚══════════════════╝

╔══❰ 👥 ɢʀᴏᴜᴘ ᴍᴇɴᴜ ❱══╗
║ ─ ɢʀᴏᴜᴘʟɪɴᴋ
║ ─ ᴋɪᴄᴋᴀʟʟ
║ ─ ᴋɪᴄᴋᴀʟʟ2
║ ─ ᴋɪᴄᴋᴀʟʟ3
║ ─ ᴀᴅᴅ
║ ─ ʀᴇᴍᴏᴠᴇ
║ ─ ᴋɪᴄᴋ
║ ─ ᴘʀᴏᴍᴏᴛᴇ
║ ─ ᴅᴇᴍᴏᴛᴇ
║ ─ ᴅɪsᴍɪss
║ ─ ʀᴇᴠᴏᴋᴇ
║ ─ sᴇᴛɢᴏᴏᴅʙʏᴇ
║ ─ sᴇᴛᴡᴇʟᴄᴏᴍᴇ
║ ─ ᴅᴇʟᴇᴛᴇ
║ ─ ɢᴇᴛᴘɪᴄ
║ ─ ɢɪɴғᴏ
║ ─ ᴅɪsᴀᴘᴘᴇᴀʀ ᴏɴ
║ ─ ᴅɪsᴀᴘᴘᴇᴀʀ ᴏғғ
║ ─ ᴅɪsᴀᴘᴘᴇᴀʀ 7ᴅ,24ʜ
║ ─ ᴀʟʟʀᴇǫ
║ ─ ᴜᴘᴅᴀᴛᴇɢɴᴀᴍᴇ
║ ─ ᴜᴘᴅᴀᴛᴇɢᴅᴇsᴄ
║ ─ ᴊᴏɪɴʀᴇǫᴜᴇsᴛs
║ ─ sᴇɴᴅᴅᴍ
║ ─ ɴɪᴋᴀʟ
║ ─ ᴍᴜᴛᴇ
║ ─ ᴜɴᴍᴜᴛᴇ
║ ─ ʟᴏᴄᴋɢᴄ
║ ─ ᴜɴʟᴏᴄᴋɢᴄ
║ ─ ɪɴᴠɪᴛᴇ
║ ─ ᴛᴀɢ
║ ─ ʜɪᴅᴇᴛᴀɢ
║ ─ ᴛᴀɢᴀʟʟ
║ ─ ᴛᴀɢᴀᴅᴍɪɴs
║ ─ ᵃᵘᵗᵒᵃᵖᵖʳᵒᵛᵉ
╚══════════════════╝

╔══❰💞 ʀᴇᴀᴄᴛɪᴏɴs ᴍᴇɴᴜ ❱══╗
║ ─ ʙᴜʟʟʏ @ᴛᴀɢ
║ ─ ᴄᴜᴅᴅʟᴇ @ᴛᴀɢ
║ ─ ᴄʀʏ @ᴛᴀɢ
║ ─ ʜᴜɢ @ᴛᴀɢ
║ ─ ᴀᴡᴏᴏ @ᴛᴀɢ
║ ─ ᴋɪss @ᴛᴀɢ
║ ─ ʟɪᴄᴋ @ᴛᴀɢ
║ ─ ᴘᴀᴛ @ᴛᴀɢ
║ ─ sᴍᴜɢ @ᴛᴀɢ
║ ─ ʙᴏɴᴋ @ᴛᴀɢ
║ ─ ʏᴇᴇᴛ @ᴛᴀɢ
║ ─ ʙʟᴜsʜ @ᴛᴀɢ
║ ─ sᴍɪʟᴇ @ᴛᴀɢ
║ ─ ᴡᴀᴠᴇ @ᴛᴀɢ
║ ─ ʜɪɢʜғɪᴠᴇ @ᴛᴀɢ
║ ─ ʜᴀɴᴅʜᴏʟᴅ @ᴛᴀɢ
║ ─ ɴᴏᴍ @ᴛᴀɢ
║ ─ ʙɪᴛᴇ @ᴛᴀɢ
║ ─ ɢʟᴏᴍᴘ @ᴛᴀɢ
║ ─ sʟᴀᴘ @ᴛᴀɢ
║ ─ ᴋɪʟʟ @ᴛᴀɢ
║ ─ ʜᴀᴘᴘʏ @ᴛᴀɢ
║ ─ ᴡɪɴᴋ @ᴛᴀɢ
║ ─ ᴘᴏᴋᴇ @ᴛᴀɢ
║ ─ ᴅᴀɴᴄᴇ @ᴛᴀɢ
║ ─ ᴄʀɪɴɢᴇ @ᴛᴀɢ
╚══════════════════╝

╔══❰ 🎨 ʟᴏɢᴏ ᴍᴇɴᴜ ❱═══╗
║ ─ ɴᴇᴏɴʟɪɢʜᴛ
║ ─ ᴘʀᴏғɪʟᴇᴄᴀʀᴅ
║ ─ ʙʟᴀᴄᴋᴘɪɴᴋ
║ ─ ᴅʀᴀɢᴏɴʙᴀʟʟ
║ ─ 3ᴅᴄᴏᴍɪᴄ
║ ─ ᴀᴍᴇʀɪᴄᴀ
║ ─ ɴᴀʀᴜᴛᴏ
║ ─ sᴀᴅɢɪʀʟ
║ ─ ᴄʟᴏᴜᴅs
║ ─ ғᴜᴛᴜʀɪsᴛɪᴄ
║ ─ 3ᴅᴘᴀᴘᴇʀ
║ ─ ᴇʀᴀsᴇʀ
║ ─ sᴜɴsᴇᴛ
║ ─ ʟᴇᴀғ
║ ─ ɢᴀʟᴀxʏ
║ ─ sᴀɴs
║ ─ ʙᴏᴏᴍ
║ ─ ʜᴀᴄᴋᴇʀ
║ ─ ᴅᴇᴠɪʟᴡɪɴɢs
║ ─ ɴɪɢᴇʀɪᴀ
║ ─ ʙᴜʟʙ
║ ─ ᴀɴɢᴇʟᴡɪɴɢs
║ ─ ᴢᴏᴅɪᴀᴄ
║ ─ ʟᴜxᴜʀʏ
║ ─ ᴘᴀɪɴᴛ
║ ─ ғʀᴏᴢᴇɴ
║ ─ ᴄᴀsᴛʟᴇ
║ ─ ᴛᴀᴛᴏᴏ
║ ─ ᴠᴀʟᴏʀᴀɴᴛ
║ ─ ʙᴇᴀʀ
║ ─ ᴛʏᴘᴏɢʀᴀᴘʜʏ
║ ─ ʙɪʀᴛʜᴅᴀʏ
╚══════════════════╝

╔══❰ 👑 ᴏᴡɴᴇʀ ᴍᴇɴᴜ ❱══╗
║ ─ ᴏᴡɴᴇʀ
║ ─ ᴍᴇɴᴜ
║ ─ ᴍᴇɴᴜ2
║ ─ ᴠᴠ
║ ─ ʙɪᴏ
║ ─ ʟɪsᴛᴄᴍᴅ
║ ─ ᴀʟʟᴍᴇɴᴜ
║ ─ ʀᴇᴘᴏ
║ ─ ʙʟᴏᴄᴋ
║ ─ ᴜɴʙʟᴏᴄᴋ
║ ─ ғᴜʟʟᴘᴘ
║ ─ sᴇᴛᴘᴘ
║ ─ ʀᴇsᴛᴀʀᴛ
║ ─ sʜᴜᴛᴅᴏᴡɴ
║ ─ ᴜᴘᴅᴀᴛᴇᴄᴍᴅ
║ ─ ᴀʟɪᴠᴇ
║ ─ ᴘɪɴɢ
║ ─ ɢᴊɪᴅ
║ ─ ᴊɪᴅ
║ ─ ᴄᴜʀʀᴇɴᴄʏ
║ ─ ᴄᴏᴜɴᴛʀʏ
║ ─ ғᴀᴋᴇᴄʜᴀᴛ
║ ─ 𝚒𝚙𝚑𝚘𝚗𝚎𝚌𝚑𝚊𝚝
║ ─ ʷᵉˡᶜᵒᵐᵉⁱᵐᵍ
║ ─ ʸᵗᶜᵒᵐᵐᵉⁿᵗ
╚══════════════════╝

╔═══❰ 😄 ғᴜɴ ᴍᴇɴᴜ ❱═══╗
║ ─ sʜᴀᴘᴀʀ
║ ─ ʀᴀᴛᴇ
║ ─ ɪɴsᴜʟᴛ
║ ─ ʜᴀᴄᴋ
║ ─ sʜɪᴘ
║ ─ ᴄʜᴀʀᴀᴄᴛᴇʀ
║ ─ ᴘɪᴄᴋᴜᴘ
║ ─ ᴊᴏᴋᴇ
║ ─ ʜʀᴛ
║ ─ ʜᴘʏ
║ ─ sʏᴅ
║ ─ ᴀɴɢᴇʀ
║ ─ sʜʏ
║ ─ ᴋɪss
║ ─ ᴍᴏɴ
║ ─ ᴄᴜɴғᴜᴢᴇᴅ
║ ─ sᴇᴛᴘᴘ
║ ─ ʜᴀɴᴅ
║ ─ ɴɪᴋᴀʟ
║ ─ ʜᴏʟᴅ
║ ─ ʜᴜɢ
║ ─ ʜɪғɪ
║ ─ ᴘᴏᴋᴇ
║ ─ ʀᴏsᴇᴅᴀʏ
╚══════════════════╝

╔══❰ 🔄 ᴄᴏɴᴠᴇʀᴛ ᴍᴇɴᴜ ❱══╗
║ ─ sᴛɪᴄᴋᴇʀ
║ ─ sᴛɪᴄᴋᴇʀ2
║ ─ ᴇᴍᴏᴊɪᴍɪx
║ ─ ғᴀɴᴄʏ
║ ─ ᴛᴀᴋᴇ
║ ─ ᴛᴏᴍᴘ3
║ ─ ᴛʀᴛ
║ ─ ʙᴀsᴇ64
║ ─ ᴜɴʙᴀsᴇ64
║ ─ ʙɪɴᴀʀʏ
║ ─ ᴅʙɪɴᴀʀʏ
║ ─ ᴛɪɴʏᴜʀʟ
║ ─ ᴜʀʟᴅᴇᴄᴏᴅᴇ
║ ─ ᴜʀʟᴇɴᴄᴏᴅᴇ
║ ─ ᴜʀʟ
║ ─ ʀᴇᴘᴇᴀᴛ
║ ─ ᴀsᴋ
║ ─ ʀᴇᴀᴅᴍᴏʀᴇ
║ ─ ᴄᴏʟᴏʀɪᴢᴇ
╚══════════════════╝

╔════❰ 🤖 ᴀɪ ᴍᴇɴᴜ ❱═══╗
║ ─ ᴀɪ
║ ─ ɢᴘᴛ3
║ ─ ɢᴘᴛ2
║ ─ ɢᴘᴛᴍɪɴɪ
║ ─ ɢᴘᴛ
║ ─ ᴍᴇᴛᴀ
║ ─ ʙʟᴀᴄᴋʙᴏx
║ ─ ʟᴜᴍᴀ
║ ─ ᴅᴊ
║ ─ ᴅᴇᴇᴘsᴇᴇᴋ
║ ─ ISHAQ
║ ─ ɢᴘᴛ4
║ ─ ʙɪɴɢ
║ ─ ɪᴍᴀɢɪɴᴇ
║ ─ ɪᴍᴀɢɪɴᴇ2
║ ─ ᴄᴏᴘɪʟᴏᴛ
║ ─ ʙᴀʀᴅ
║ ─ ғᴇʟᴏ
║ ─ ɢɪᴛᴀ
╚══════════════════╝

╔═══❰ 🏠 ᴍᴀɪɴ ᴍᴇɴᴜ ❱═══╗
║ ─ ᴘɪɴɢ
║ ─ ᴘɪɴɢ2
║ ─ sᴘᴇᴇᴅ
║ ─ ʟɪᴠᴇ
║ ─ ᴀʟɪᴠᴇ
║ ─ ʀᴜɴᴛɪᴍᴇ
║ ─ ᴜᴘᴛɪᴍᴇ
║ ─ ʀᴇᴘᴏ
║ ─ ᴏᴡɴᴇʀ
║ ─ ᴍᴇɴᴜ
║ ─ ᴍᴇɴᴜ2
║ ─ ʀᴇsᴛᴀʀᴛ
╚══════════════════╝

╔══❰ 🎎 ᴀɴɪᴍᴇ ᴍᴇɴᴜ ❱══╗
║ ─ ғᴀᴄᴋ
║ ─ ᴛʀᴜᴛʜ
║ ─ ᴅᴀʀᴇ
║ ─ ᴅᴏɢ
║ ─ ᴀᴡᴏᴏ
║ ─ ɢᴀʀʟ
║ ─ ᴡᴀɪғᴜ
║ ─ ɴᴇᴋᴏ
║ ─ ᴍᴇɢɴᴜᴍɪɴ
║ ─ ᴍᴀɪᴅ
║ ─ ʟᴏʟɪ
║ ─ ᴀɴɪᴍᴇɢɪʀʟ
║ ─ ᴀɴɪᴍᴇɢɪʀʟ1
║ ─ ᴀɴɪᴍᴇɢɪʀʟ2
║ ─ ᴀɴɪᴍᴇɢɪʀʟ3
║ ─ ᴀɴɪᴍᴇɢɪʀʟ4
║ ─ ᴀɴɪᴍᴇɢɪʀʟ5
║ ─ ᴀɴɪᴍᴇ1
║ ─ ᴀɴɪᴍᴇ2
║ ─ ᴀɴɪᴍᴇ3
║ ─ ᴀɴɪᴍᴇ4
║ ─ ᴀɴɪᴍᴇ5
║ ─ ᴀɴɪᴍᴇɴᴇᴡs
║ ─ ғᴏxɢɪʀʟ
║ ─ ɴᴀʀᴜᴛᴏ
╚══════════════════╝

╔══❰ 📌 ᴏᴛʜᴇʀ ᴍᴇɴᴜ ❱══╗
║ ─ ᴛɪᴍᴇɴᴏᴡ
║ ─ ᴅᴀᴛᴇ
║ ─ ᴄᴏᴜɴᴛ
║ ─ ᴄᴀʟᴄᴜʟᴀᴛᴇ
║ ─ ᴄᴏᴜɴᴛx
║ ─ ғʟɪᴘ
║ ─ ᴄᴏɪɴғʟɪᴘ
║ ─ ʀᴄᴏʟᴏʀ
║ ─ ʀᴏʟʟ
║ ─ ғᴀᴄᴛ
║ ─ ᴄᴘᴘ
║ ─ ʀᴡ
║ ─ ᴘᴀɪʀ
║ ─ ᴘᴀɪʀ2
║ ─ ᴘᴀɪʀ3
║ ─ ғᴀɴᴄʏ
║ ─ ʟᴏɢᴏ [ᴛᴇxᴛ]
║ ─ ᴅᴇғɪɴᴇ
║ ─ ɴᴇᴡs
║ ─ ᴍᴏᴠɪᴇ
║ ─ ᴡᴇᴀᴛʜᴇʀ
║ ─ sʀᴇᴘᴏ
║ ─ ɪɴsᴜʟᴛ
║ ─ sᴀᴠᴇ
║ ─ ᴡɪᴋɪᴘᴇᴅɪᴀ
║ ─ ɢᴘᴀss
║ ─ ɢɪᴛʜᴜʙsᴛᴀʟᴋ
║ ─ ʏᴛs
║ ─ ʏᴛᴠ
║ ─ ᴡᴀᴛᴇʀᴍᴀʀᴋ
║ ─ ᶠᵒʳʷᵃʳᵈ
║ ─ ᶠᵒʳʷᵃʳᵈᵃˡˡ
║ ─ ᶠᵒʳʷᵃʳᵈᵍʳᵒᵘᵖ
║ ─ sᴀᴠᴇ
╚══════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━┈⊷
📢 *JOIN OUR CHANNEL* 🔔
${bold("Channel Link:")}
${CHANNEL_LINK}

${bold("Channel Post:")}
${CHANNEL_POST}

━━━━━━━━━━━━━━━━━━━━━━━━━━━┈⊷
> *Powered by ${bold("𝗠𝖤𝑁𝑻𝐀𝐋-𝐉𝐔𝐓𝐓-𝐗-𝗠𝗨𝘋𝐒𝐈𝐑-𝒁𝑰𝑫𝑰-ᴹᴰ")}*
> *ᴠᴇʀsɪᴏɴ 4.5.6*`;

    try {
        // ── Send with Channel Forward Context ──────────────────────
        await sock.sendMessage(from, {
            image: { url: MENU_IMAGE },
            caption: menuText,
            contextInfo: {
                mentionedJid: [sender + '@s.whatsapp.net'],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '0029VbCpCAQFy728iWgzex1d',
                    newsletterName: '𝗠𝖤𝑁𝑻𝐀𝐋-𝐉𝐔𝐓𝐓-𝐗-𝗠𝗨𝘋𝐒𝐈𝐑-𝒁𝑰𝑫𝑰-ᴹᴰ',
                    serverId: 1
                }
            }
        });
    } catch (e) {
        // ── Fallback: Send without image ──────────────────────────
        await sock.sendMessage(from, {
            text: menuText,
            contextInfo: {
                mentionedJid: [sender + '@s.whatsapp.net'],
                forwardingScore: 999,
                isForwarded: true
            }
        });
    }
});