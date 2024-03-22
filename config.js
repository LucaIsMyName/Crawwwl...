const SiteMapConfig = {
    startURL: "https://www.brot-fuer-die-welt.at",
    maxDepth: 7, // Maximum depth to crawl for links, -1 for no limit
    concurrency: 5, // Number of requests to run concurrently
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36", // The user agent to use for requests
    allowedDomains: 'www.brot-fuer-die-welt.at', // Only visit URLs from these domains
    disallowedPaths: [
        "/cdn-cgi/",
        "cloudlfare.com/",
        "google.com/",
    ], 
    // URL paths to ignore
    allowedSchemes: ["http", "https"], // Only visit URLs with these schemes
    maxRequests: -1, // Maximum number of requests to make, -1 for no limit
    requestInterval: 0, // Number of milliseconds to wait between requests
    timeout: 10000, // Request timeout in milliseconds
};

module.exports = SiteMapConfig;
