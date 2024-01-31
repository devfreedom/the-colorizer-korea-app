const path = require('path');
const fs = require('fs');
const multer = require('multer');
const randomstring = require("randomstring");

// [REFACTORED] Use memory storage instead of disk storage
/*
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // [주의] path 모듈을 활용해 절대 경로를 기반으로 추가적인 상대 경로를 조합해주어야 합니다.
    //       - 현재 working directory는 /back/src/routers/ 입니다.
    //       - working directory의 절대 경로에다가 ../uploads/ 라는 상대 경로를 추가해줍니다.
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + randomstring.generate() + ".jpg")
  }
})
*/

let storage = multer.memoryStorage();

// [SECURITY] Inspect the MIME type of the incoming file and authorize JPEG only
// [보안] 업로드된 파일의 MIME type을 감지해서 JPEG 형식의 이미지 파일만 받아들입니다.
let upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpg|jpeg/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    } else {
      cb('JPG 파일만 업로드 가능합니다.');
    }
  },
});

const uploadProfileImg = async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;

    if(!currentUserId){
      throw new Error("현재 로그인한 사용자를 알 수 없습니다.");
    }

    // 사용자가 업로드한 파일이 multer storage에 저장이 되어 있으므로 이 데이터를 객체 변수에 담아 mongoose가 다룰 수 있도록 해줍니다.
    // [주의] path 모듈을 활용해 절대 경로를 기반으로 추가적인 상대 경로를 조합해주어야 합니다.
    //       - 현재 working directory는 /back/src/routers/ 입니다.
    //       - working directory의 절대 경로에다가 ../uploads/ 라는 상대 경로를 추가해줍니다.
    //       - multer의 storage와 같은 경로를 사용해야 합니다.
    const fileObject = {
      file: {
        data: fs.readFileSync(path.join(__dirname, '../uploads/') + req.file.filename),
        contentType: 'image/jpg',
      }
    }
    
    // Hex 형식으로 Buffer에 들어있는 이미지 데이터를 base64 형식으로 바꿔줍니다.
    const imgBase64 = new Buffer.from(fileObject["file"]["data"]).toString('base64');

    // mongoose를 사용해서 이미지 데이터 객체를 사용자 계정 document에 포함시켜줍니다.
    const uploadedFile = await UserModel.findOneAndUpdate({ id: currentUserId }, { imgBase64: imgBase64 }, { returnOriginal: false });

    if (uploadedFile.error) {
      throw new Error(uploadedFile.error);
    }

    // [TO-DO] REFACTOR: Use memory storage 

    /*
    // 파일이 정상적으로 DB에 저장이 되었다면 multer storage에 보관되어 있는 임시 파일을 삭제해줍니다.
    // 그렇지 않으면 임시 파일이 uploads 폴더에 계속 쌓이게 됩니다.
    // 파일 삭제에 사용되는 fs.unlink는 callback-style API이므로 결과를 적절하게 비동기적으로 핸들링해줍니다.
    const clearMulterStorage = fs.unlink(path.join(__dirname, '../uploads/') + req.file.filename, function resultHandler (err) {
      if (err) {
          console.log("업로드된 임시 파일 삭제에 실패했습니다: ", err);
      } else {
          console.log("업로드된 임시 파일을 삭제했습니다.");
      }
    });
    */
    
    res.status(200).json(imgBase64);
    return;
  }
  catch(error){
    next(error);
  }
};

export { storage, upload, uploadProfileImg };