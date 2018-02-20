require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;
const fs = require('fs');
const dbx = new Dropbox({ accessToken: 'ThiQM0jxepwAAAAAAAAdelsVqcbWmrTIcQGNep95fRzB7IF9Nyk4ebx64uK-sp5F' });
const Post = require('../app/post/post.model');

module.exports.getUrl = (file, fileContent) => {
  const filenameSplit = file.originalname.split('.');
  const extension = `.${filenameSplit[filenameSplit.length - 1]}`
  return dbx.filesUpload({ path: `/multer/${file.filename}${extension}`, contents: fileContent })
    .then(fileUploaded => {
      const parameters = {
        path: fileUploaded.path_lower,
        settings: {
            requested_visibility: 'public'
          }
      };
      return dbx.sharingCreateSharedLinkWithSettings(parameters)
        .then(response => response.url.split('/s')[1])
    })
    .catch(error => console.log(error));
}