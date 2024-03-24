# Crawwwl...

This Node.js script crawls a website and generates a sitemap in JSON format containing all the crawled URLs and their respective links. It recursively crawls all accessible pages within the website, including those not directly linked from the homepage.

## Installation

Clone this repository:
```bash
git clone https://github.com/LucaIsMyName/Crawwwl...
```

Install Dependencies
```bash
npm install
```

## Usage

- Configure the crawler settings in the config.js file:
 - startURL: The URL of the website to crawl.
 - maxDepth: Maximum depth to crawl for links (set to -1 for unlimited depth).
 - userAgent: User agent string to use for requests.
 - allowedDomains: Array of allowed domains to crawl.
 - disallowedPaths: Array of URL paths to ignore.
 - allowedSchemes: Array of allowed URL schemes.
- Run the crawler script:
  - `node crawwwl.js`