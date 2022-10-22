import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as uuid from 'uuid'

@Injectable()
export class FilesService {
    upload(file: Express.Multer.File){
        try{
            
            let filePath = path.resolve(__dirname, '../../../', 'assets')
            
            let fileName = uuid.v4() + file.originalname
            
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
            return fileName
        }
        catch(e){
            console.log(e);
                
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    update(file: Express.Multer.File, lastFile: string){
        try{
            if(fs.existsSync(path.resolve(__dirname, '../../', 'assets', lastFile))) {
                fs.unlinkSync(path.resolve(__dirname, '../../', 'assets', lastFile))
            }
            let filePath = path.resolve(__dirname, '../../', 'assets')
            let fileName = uuid.v4() + file.originalname
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName
        }
        catch(e){
            console.log(e);
                
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}