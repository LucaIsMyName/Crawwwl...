
const SiteMapConfig = require('./config');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const urlModule = require('url');

const visitedUrls = new Set();

const crawl = async (url, depth = 0, result = {}) => {
  try {
    // Check if the maximum depth has been reached
    if (depth > SiteMapConfig.maxDepth && SiteMapConfig.maxDepth !== -1) {
      return result; // Return the result object if maximum depth reached
    }

    // Check if the URL has already been visited
    if (visitedUrls.has(url)) {
      return result; // Return the result object if URL has already been visited
    }

    // Mark the URL as visited
    visitedUrls.add(url);

    // Fetch the page content
    const response = await axios.get(url, {
      headers: { 'User-Agent': SiteMapConfig.userAgent }
    });
    const html = response.data;

    // Parse HTML content
    const $ = cheerio.load(html);

    // Extract links
    const links = $('a').map((i, el) => $(el).attr('href')).get();

    // Add the URL and its links to the result object
    result[url] = links;

    // Visit each link recursively
    for (const link of links) {
      // Resolve relative URLs
      const absoluteUrl = urlModule.resolve(url, link);

      // Check if the link is within the same domain and scheme
      if (isSameDomain(url, absoluteUrl)) {
        // Recursively crawl the link and merge the result with the current result object
        result = { ...result, ...(await crawl(absoluteUrl, depth + 1)) };
      }
    }

    return result;
  } catch (error) {
    console.error('Error:', error.message);
    return result; // Return the result object even if an error occurs
  }
};

// Function to check if two URLs belong to the same domain and scheme
const isSameDomain = (url1, url2) => {
  const parsedUrl1 = urlModule.parse(url1);
  const parsedUrl2 = urlModule.parse(url2);

  return (
    parsedUrl1.hostname === parsedUrl2.hostname &&
    parsedUrl1.protocol === parsedUrl2.protocol
  );
};

// Start crawling from the initial URL
crawl(SiteMapConfig.startURL)
  .then((result) => {
    // Write the result to a JSON file
    const now = new Date();
    const formattedDate = now.toISOString().replace(/:/g, '-').replace(/\..+/, ''); // Replace colons with dashes and remove milliseconds
    const filename = `sitemap-${SiteMapConfig.startURL.replace('https://', '')}-${formattedDate}.json`;
    const filePath = path.join(__dirname, 'export', filename);
    fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
    console.log(`Results written to ${filename}.`);
  });
