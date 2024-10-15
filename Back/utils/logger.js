const logger = (req, res, next) => {
    // Ignorar las solicitudes OPTIONS y favicon.ico
    if (req.method !== 'OPTIONS' && req.url !== '/favicon.ico') {
        console.log(`Request: ${req.method}  ${req.url}`);
    }
    next();
}

module.exports=logger
