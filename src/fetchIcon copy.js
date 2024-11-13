const axios = require('axios');
const path = require('path');
const fs = require('fs');
const url = require('url');
const cheerio = require('cheerio');

async function fetchIcon(websiteUrl) {
  try {
    const { data: html } = await axios.get(websiteUrl);
    const $ = cheerio.load(html);

    const iconLinks = [
      $('link[rel="icon"]').attr('href'),
      $('link[rel="shortcut icon"]').attr('href'),
      $('link[rel="apple-touch-icon"]').attr('href'),
      $('link[rel="icon shortcut"]').attr('href'),
      '/favicon.ico'
    ];

    const iconLink = iconLinks.find(link => link);

    if (!iconLink) {
      throw new Error('No favicon found');
    }

    const iconUrl = iconLink.startsWith('http') ? iconLink : url.resolve(websiteUrl, iconLink);
    const iconPath = await saveFaviconToFile(iconUrl);
    return iconPath;

  } catch (error) {
    console.error('Failed to fetch favicon:', error.message);
    return null;
  }
}

async function saveFaviconToFile(iconUrl) {
  try {
    const iconResponse = await axios.get(iconUrl, { responseType: 'arraybuffer' });
    const contentType = iconResponse.headers['content-type'];
    if (!contentType || !contentType.startsWith('image')) {
      throw new Error('Fetched content is not an image');
    }

    const iconData = iconResponse.data;
    if (!iconData || iconData.length === 0) {
      throw new Error('Fetched icon data is empty');
    }

    const iconPath = path.join(__dirname, 'assets', 'favicon.ico');

    if (!fs.existsSync(path.dirname(iconPath))) {
      fs.mkdirSync(path.dirname(iconPath), { recursive: true });
    }

    fs.writeFileSync(iconPath, iconData);
    return iconPath;

  } catch (error) {
    console.error('Failed to save favicon:', error.message);
    return null;
  }
}

module.exports = fetchIcon;
