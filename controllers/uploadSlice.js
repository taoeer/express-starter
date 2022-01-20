const path = require('path');
const fs = require('fs');
const Busboy = require('busboy');

module.exports = (req, res) => {
  var busboy = new Busboy({ headers: req.headers });
  const data = {};
  busboy.on('file', (name, file, info) => {
    const filePath = path.resolve(
      __dirname,
      '../upload',
      data.uploadId,
      `${data.sliceSeq}.temp`,

    );

    fs.mkdirSync(path.dirname(filePath), {
      recursive: true,
    });
    const ws = fs.createWriteStream(filePath);
    file.pipe(ws);
  });

  busboy.on('field', (name, val, info) => {
    data[name] = val;
  });

  busboy.on('finish', function () {
    res.json({
      code: 1,
      success: true,
    });
  });
  return req.pipe(busboy);
};
