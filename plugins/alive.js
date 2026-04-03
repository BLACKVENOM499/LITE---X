const os = require('os');

module.exports = {
    pattern: "alive",
    desc: "Check if the bot is active",
    react: "👋",
    category: "main",
    filename: __filename,

    execute: async (conn, mek, m, { from, reply }) => {
        try {
            // Calculate Uptime
            const uptime = runtime(process.uptime());
            
            // System Information
            const ram = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
            const freeRam = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);

            const statusText = `*Hello! I am Active* 🚀\n\n` +
                `*🤖 Bot:* Gemini-MD\n` +
                `*⏱️ Uptime:* ${uptime}\n` +
                `*📟 RAM:* ${freeRam}GB / ${ram}GB\n` +
                `*📶 Status:* Stable\n\n` +
                `_Type .menu to see all commands._`;

            // Sending with a nice image (Replace URL with your own)
            await conn.sendMessage(from, {
                image: { url: "https://telegra.ph/file/your-image-id.jpg" }, // Add a direct image link here
                caption: statusText
            }, { quoted: mek });

        } catch (error) {
            console.error("Alive Command Error:", error);
            await reply(`❌ Error checking status: ${error.message}`);
        }
    }
};

/**
 * Formats seconds into a readable string
 */
function runtime(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    
    const dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
