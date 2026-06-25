/**
 * SHEHBAZ-MD - Sticker Plugin
 * Convert image/video to WhatsApp sticker using wa-sticker-formatter
 */

import { cmd } from '../lib/command.js';
import * as baileys from '@whiskeysockets/baileys';
import { Sticker, StickerTypes } from 'wa-sticker-formatter';
import config from '../setting.js';

const { downloadMediaMessage, getContentType } = baileys;

cmd({
    pattern: 'sticker',
    alias: ['s', 'stiker', 'stc'],
    category: 'general',
    desc: 'Convert image/video to sticker',
    args: '[reply to media]'
}, async (sock, msg, data) => {
    const { from, reply, args } = data;

    const ctx = msg.message?.extendedTextMessage?.contextInfo;

    let targetMsg = msg;
    if (ctx?.quotedMessage) {
        targetMsg = {
            key: {
                remoteJid: from,
                id: ctx.stanzaId,
                participant: ctx.participant,
                fromMe: false
            },
            message: ctx.quotedMessage
        };
    }

    const msgType = getContentType(targetMsg.message);
    const hasMedia = ['imageMessage', 'videoMessage', 'stickerMessage'].includes(msgType);

    if (!hasMedia) {
        return reply('📎 Reply to an *image* or *video* with *.sticker*\n\nOr send media with *.sticker* as caption.');
    }

    await reply('⏳ Creating sticker...');

    try {
        const buffer = await downloadMediaMessage(targetMsg, 'buffer', {}, {
            logger: undefined,
            reuploadRequest: sock.updateMediaMessage
        });

        const packName = config.STICKER_NAME || config.BOT_NAME || '𝗠𝖤𝑁𝑻𝐀𝐋-𝐉𝐔𝐓𝐓-𝐗-𝗠𝗨𝘋𝐒𝐈𝐑-𝒁𝑰𝑫𝑰-ᴹᴰ';
        const authorName = config.OWNER_NAME || '𝗠𝖤𝑁𝑻𝐀𝐋-𝐉𝐔𝐓𝐓-𝐗-𝗠𝗨𝘋𝐒𝐈𝐑-𝒁𝑰𝑫𝑰-ᴹᴰ';
        const isAnimated = msgType === 'videoMessage'
            || targetMsg.message?.imageMessage?.mimetype?.includes('gif');

        const sticker = new Sticker(buffer, {
            pack: packName,
            author: authorName,
            type: isAnimated ? StickerTypes.FULL : StickerTypes.DEFAULT,
            quality: 70
        });

        const stickerBuffer = await sticker.toBuffer();
        await sock.sendMessage(from, { sticker: stickerBuffer }, { quoted: msg });
    } catch (err) {
        await reply(`❌ Failed to create sticker: ${err.message}`);
    }
});

cmd({
    pattern: 'take',
    alias: ['steal', 'copysticker'],
    category: 'general',
    desc: 'Rename sticker (change pack/author name)',
    args: '[reply to sticker]'
}, async (sock, msg, data) => {
    const { from, reply, args } = data;

    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    let targetMsg = msg;
    if (ctx?.quotedMessage) {
        targetMsg = {
            key: { remoteJid: from, id: ctx.stanzaId, participant: ctx.participant, fromMe: false },
            message: ctx.quotedMessage
        };
    }

    const msgType = getContentType(targetMsg.message);
    if (msgType !== 'stickerMessage') return reply('📎 Reply to a *sticker* with *.take*');

    try {
        const buffer = await downloadMediaMessage(targetMsg, 'buffer', {}, {
            logger: undefined,
            reuploadRequest: sock.updateMediaMessage
        });

        const [packName, authorName] = args.join(' ').split('|').map(s => s?.trim());

        const sticker = new Sticker(buffer, {
            pack: packName || config.STICKER_NAME || 'ISHAQ-MD',
            author: authorName || config.OWNER_NAME || 'ISHAQ-MD',
            type: StickerTypes.DEFAULT,
            quality: 90
        });

        const stickerBuffer = await sticker.toBuffer();
        await sock.sendMessage(from, { sticker: stickerBuffer }, { quoted: msg });
    } catch (err) {
        await reply(`❌ Error: ${err.message}`);
    }
});
