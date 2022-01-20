const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  const dir = path.resolve(__dirname, '../upload', req.body.uploadId);
  const filepath = path.resolve(dir, `./${req.body.path}`);
  fs.mkdirSync(path.dirname(filepath), {
    recursive: true,
  });
  console.log(dir, filepath);
  const ws = fs.createWriteStream(filepath);
  fs.readdir(dir, { withFileTypes: true }, async (err, dirs) => {
    if (err) {
      next(err);
    }
    try {
      for (let i = 0; i < dirs.length; i++) {
        const element = dirs[i];
        console.log(element.name);
        if (element.isFile && element.name.endsWith('.temp')) {
          const rs = fs.createReadStream(path.resolve(dir, element.name));
          await new Promise((resolve, reject) => {
            rs.pipe(ws, { end: false });
            rs.on('end', resolve);
            rs.on('error', reject);
          });
          fs.unlinkSync(path.resolve(dir, element.name));
        }
      }
      ws.end();
      res.json({
        code: 1,
      });
    } catch (e) {
      next(e);
      return;
    }
  });
};
