const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const url = require('url');

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
        
        const iconUrl = url.resolve(websiteUrl, iconLink);
        console.log(iconLink)

        const iconResponse = await axios.get(iconUrl, { responseType: 'arraybuffer' });
        const iconData = iconResponse.data;

        const iconPath = path.join(__dirname, '../assets/favicon.ico');

        fs.writeFileSync(iconPath, iconData);

        return iconPath;
    } catch (error) {
        console.error('Failed to fetch favicon:', error.message);
        return null; // Return null if fetching fails
    }
}

module.exports = fetchIcon;