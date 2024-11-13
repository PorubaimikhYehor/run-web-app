const { nativeImage } = require('electron');
const axios = require('axios');

/**
 * find web site icon in secret google archives...
 * @param {string} websiteUrl web site url
 * @returns {Promise<Electron.NativeImage | null>} web site icon
 */
async function fetchIcon(websiteUrl) {
  try {
    const response = await axios.get(
      `https://www.google.com/s2/favicons?domain_url=${websiteUrl.split('?')[0]}&sz=128`,
      { responseType: 'arraybuffer' });
    return nativeImage.createFromBuffer(response.data);
  } catch (error) {
    return (console.error('Failed to fetch favicon:', error.message), null);
  }
}

module.exports = fetchIcon;