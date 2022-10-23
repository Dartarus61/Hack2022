import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as uuid from 'uuid'

export enum EExtentionType {
    VIDEO = "VIDEO",
    IMAGE = "IMAGE",
    HTML = "HTML" 
}

@Injectable()
export class FilesService {
    upload(file: Express.Multer.File, extanrionPath: EExtentionType){
        try{
            
            let filePath = path.resolve(__dirname, '../../', 'assets', extanrionPath)
            
            let fileName = uuid.v4() + file.originalname
            
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
            return fileName
        }
        catch(e){
            console.log(e);
                
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    update(file: Express.Multer.File, lastFile: string, extanrionPath: EExtentionType){
        try{
            if(fs.existsSync(path.resolve(__dirname, '../../../', 'assets', extanrionPath, lastFile))) {
                fs.unlinkSync(path.resolve(__dirname, '../../../', 'assets', extanrionPath,  lastFile))
            }
            let filePath = path.resolve(__dirname, '../../../', 'assets', extanrionPath)
            let fileName = uuid.v4() + file.originalname
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName
        }
        catch(e){
            console.log(e);
                
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    uploadMany(files: Express.Multer.File[], extanrionPath: EExtentionType){
        try{
            let filePath = path.resolve(__dirname, '../../../', 'assets', extanrionPath)
            let fileName:string=''
            const masReturn:any[]=[]
            masReturn.push(filePath)
            for (let index = 0; index < files.length; index++) {
                fileName= uuid.v4() + files[index].originalname
                console.log(fileName);
                masReturn.push(fileName)
                fs.writeFileSync(path.join(filePath, fileName), files[index].buffer)
                
            }
            return masReturn
        }
        catch(e){
            console.log(e);
                
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    deleteFile(filename:string,extanrionPath: EExtentionType) {
        try {
            let filePath = path.resolve(__dirname, '../../../', 'assets', extanrionPath,filename)
            fs.unlinkSync(filePath)
        } catch (error) {
            console.error(error);
            
        }
    }

}