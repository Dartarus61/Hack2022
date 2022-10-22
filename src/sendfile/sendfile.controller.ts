import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs'
import * as path from 'path'


@Controller('sendfile')
export class SendfileController {

    @Get('/image/:fileName')
    getPicture(@Param('fileName')fileName:string,@Res()res:Response) {
        return res.sendFile(path.resolve(__dirname,"../../assets/image",fileName))
    }

    @Get('/video/:fileName')
    getVideo(@Param('fileName')fileName:string,@Res()res:Response) {
        return res.sendFile(path.resolve(__dirname,"../../assets/video",fileName))
    }

    @Get('/html/:fileName')
    getHtml(@Param('fileName')fileName:string,@Res()res:Response) {
        return res.sendFile(path.resolve(__dirname,"../../assets/html",fileName))
    }
}
