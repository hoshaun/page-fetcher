const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const path = process.argv[3];

new Promise((resolve, reject) => {
  request.get(url, (err, res, body) => {
    if (res.statusCode === 200) {
      resolve(storeFile(path, body));
    } else if (err) {
      reject(err);
    }
    reject('rejected');
  });
});

const storeFile = function(path, content) {
  const bytes = content.length;
  fs.writeFile(`${path}`, content, err => {
    if (err) {
      console.error(err);
    }
    console.log(`Downloaded and saved ${bytes} bytes to ${path}`);
  });
};