const path = require('path');
const fs = require('fs');
const log4js = require('log4js');
const Busboy = require('busboy');
const logger = log4js.getLogger('uploadController');

module.exports = function (req, res) {
  var busboy = new Busboy({ headers: req.headers });
  logger.info(req.headers);
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    logger.info('upload files ', fieldname, filename, encoding, mimetype)
    var saveTo = path.join('upload', path.basename(filename));
    file.pipe(fs.createWriteStream(saveTo));
    busboy.on('finish', function() {
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks! " + path.posix.resolve(saveTo).replace(/\\|\//g, path.sep));
    });
  });
  return req.pipe(busboy);
}
