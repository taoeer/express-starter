const path = require('path');
const fs = require('fs');
const log4js = require('log4js');
const Busboy = require('busboy');
const logger = log4js.getLogger('uploadController');

module.exports = function (req, res, next) {
  var busboy = new Busboy({ headers: req.headers });
  var filePath;
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    var now = new Date();
    var year = now.getFullYear();
    var month = `${now.getMonth() + 1}`.padStart(2, '0');
    var day = `${now.getDate()}`.padStart(2, '0');
    filePath = path.join(
      __dirname,
      `../upload/${'' + year + month + day}/${now.getTime()}`,
      path.basename(filename),
    );
    var dir = path.dirname(filePath);

    fs.mkdirSync(dir, {
      recursive: true,
    });
    const writeStream = fs.createWriteStream(filePath);
    writeStream.on('error', (e) => {
      next(e);
    });
    file.pipe(writeStream);
  });
  busboy.on('finish', function () {
    res.json({
      code: 1,
      success: true,
      data: filePath.replace(process.cwd(), ''),
    });
  });
  return req.pipe(busboy);
};
