import { Module } from '@nestjs/common'
import { FilesService } from './fileLoader.service'

@Module({
    providers: [FilesService],
    exports: [FilesService],
})
export class FilesModule {}