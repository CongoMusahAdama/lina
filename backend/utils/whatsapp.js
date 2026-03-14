/**
 * Sends a WhatsApp message using CallMeBot API
 * @param {string} message - The message to send
 */
const sendWhatsAppNotification = async (message) => {
    const phone = process.env.CALLMEBOT_PHONE || process.env.ADMIN_PHONE;
    const apiKey = process.env.CALLMEBOT_API_KEY;

    if (!phone || !apiKey) {
        console.warn('WhatsApp notification skipped: CALLMEBOT_PHONE or CALLMEBOT_API_KEY missing in .env');
        return;
    }

    // Ensure phone starts with +
    const formattedPhone = phone.startsWith('+') ? phone : `+233${phone.startsWith('0') ? phone.slice(1) : phone}`;

    try {
        const url = `https://api.callmebot.com/whatsapp.php?phone=${formattedPhone}&text=${encodeURIComponent(message)}&apikey=${apiKey}`;
        const response = await fetch(url);
        
        if (response.ok) {
            console.log('WhatsApp notification sent successfully');
        } else {
            const errorText = await response.text();
            console.error('Failed to send WhatsApp notification:', errorText);
        }
    } catch (error) {
        console.error('Failed to send WhatsApp notification:', error.message);
    }
};

module.exports = sendWhatsAppNotification;
