const path = require('path');
const fs = require('fs');
const log4js = require('log4js');
const Busboy = require('busboy');
const logger = log4js.getLogger('uploadController');

module.exports = function(req, res, next) {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    var now = new Date();
    var year = now.getFullYear();
    var month = `${now.getMonth() + 1}`.padStart(2, '0');
    var day = `${now.getDate()}`.padStart(2, '0');
    var saveTo = path.join(
      __dirname,
      `../upload/${'' + year + month + day}/${now.getTime()}`,
      path.basename(filename),
    );
    var dir = path.dirname(saveTo);
    fs.mkdirSync(dir, {
      recursive: true,
    });
    const writeStream = fs.createWriteStream(saveTo);
    writeStream.on('error', e => {
      next(e);
    });
    file.pipe(writeStream);
    busboy.on('finish', function() {
      res.json({
        success: true,
        data: saveTo.replace(process.cwd(), '').replace(/\\/g, '/'),
      });
    });
  });
  return req.pipe(busboy);
};
