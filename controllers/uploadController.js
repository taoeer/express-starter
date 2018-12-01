const path = require('path');
const fs = require('fs');
const log4js = require('log4js');
const Busboy = require('busboy');
const logger = log4js.getLogger('uploadController');

module.exports = function (req, res, next) {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    var saveTo = path.join(__dirname, '../upload', path.basename(filename));
    var dir = path.dirname(saveTo);
    try {
      fs.mkdirSync(dir)
    } catch (e) {
    }
    const writeStream = fs.createWriteStream(saveTo);
    writeStream.on('error', (e) => {
      console.log('headersSent', req.headersSent);
      console.log('error:',e);
      next(e);
    });
    file.pipe(writeStream);
    busboy.on('finish', function() {
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks! " + path.posix.resolve(saveTo).replace(/\\|\//g, path.sep));
    });
  });
  return req.pipe(busboy);
}
