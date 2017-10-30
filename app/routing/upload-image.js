const ImageModel    = require('../../app/models/image');

module.exports = async function(req, res, next) {
  if (req.file) {
    if(req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {
      let fileName = `${ req.body.wordid }.${ /image\/(\w+)/.exec(req.file.mimetype)[1] }`;
      res.locals.setNewWord = true;

      fs.rename(`${ req.file.destination }${ req.file.filename }`, `./public/images/${ fileName }`, e => {
        if (e) { return; }
        let newImage = new ImageModel();

        newImage.location = 'local';
        newImage.src      = `/images/${ fileName }`;
        newImage.wordid   = req.body.wordid;
        newImage.word     = req.body.word;
        newImage.username = res.locals.user.local.username;

        newImage.save(e => {
          if (e) {
            console.log(e);
          } else {
            console.log(`Uploaded: ${ req.body.wordid }`);
          }
        });
      });
    } else {
      fs.unlink(`${ req.file.destination }${ req.file.filename }`, e => {});
    }
  } else {
    console.log('You sent nowt…');
  }

  next();
};
