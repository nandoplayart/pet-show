import { diskStorage } from 'multer';
import { AVATAR_DIRECTORY, SUPORT_FILE_FORMAT_LIST } from "../utils/const";


export const FileInterceptorFilterExtensionsFile = (req,file,cb) =>{
    const extension = file.mimetype;
    if(!SUPORT_FILE_FORMAT_LIST.includes(extension)){
        return cb(null, false);
    }
    return cb(null, true);
}


export const FileInterceptorFilterStorage = ()=>{
    return diskStorage({
        destination: AVATAR_DIRECTORY,
        filename:(req,file,cb) =>{
            const fileName = `${req.params["id"]}-${file.originalname}`;
            return cb(null,fileName);
        }
    })
}