import multer from 'multer';
import express,{Request,Response,NextFunction} from 'express'
const {v1:uuid} = require('uuid');

const MIME_TYPE_MAP :{[key: string]:any}= {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

export const fileUpload = multer({
  limits: { fileSize: 500000 },
  storage: multer.diskStorage({
    destination: (req:Request, file, cb) => {
      cb(null, './uploads/images');
    },
    filename: (req:any, file:any, cb:any) => {
      // let file.mimetype:{'image/png':string,'image/jpeg':string,'image/jpg':string};
      const ext = MIME_TYPE_MAP[file.mimetype ];
      cb(null, uuid() + '.' + ext);
    }
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error :any = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  }
});



// module.exports = fileUpload;
