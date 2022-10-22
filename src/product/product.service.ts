import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EExtentionType, FilesService } from 'src/fileLoader/fileLoader.service';
import { EPublished } from 'src/models/case.model';
import { PictureProduct } from 'src/models/pictureProduct.model';
import { EDeliveryMethod, EPaymentMethod, ETypeBuy, Product } from 'src/models/product.model';
import { CreateProductDto } from './dto/CreateProduct.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product)
        private readonly productModel: typeof Product,

        private readonly fileService: FilesService,
        @InjectModel(PictureProduct) private readonly pictureProductModel: typeof PictureProduct
    ){}

    async create(dto: CreateProductDto,files: { video: Express.Multer.File[], picture: Array<Express.Multer.File> }) {
        const video = this.fileService.upload(files.video[0], EExtentionType.VIDEO)
        const picture = await this.createFiles(this.fileService.uploadMany(files.picture, EExtentionType.IMAGE))
        if (Object.values(ETypeBuy).includes(dto.typeBuy) && Object.values(EPaymentMethod).includes(dto.paymentMethod) && Object.values(EDeliveryMethod).includes(dto.deliveryMethod) && Object.values(EPublished).includes(dto.published)) {
            const product= await this.productModel.create({video_dir: video, ...dto, date: new Date(), price: Number(dto.price), minLot: Number(dto.minLot), importozamest: Boolean(dto.importozamest), visible: Boolean(dto.visible)})
            product.$add('pictureProduct',picture)
            return product
        } 
        throw new HttpException('Не соответствие параметрам',HttpStatus.BAD_REQUEST)
    }

    async createFiles(FilesArr:string[]){
        const ArrOfObjectByFiles:PictureProduct[]=[]
        let file:PictureProduct
        for (let i = 0; i < FilesArr.length; i++) {
            file = await this.pictureProductModel.create({dirname:FilesArr[0],name:FilesArr[i]})
            ArrOfObjectByFiles.push(file)
        }
        return ArrOfObjectByFiles
    }

    /* async updateFiles(FilesArr:string[],MainObject:Product){
        const ArrOfObjectByFiles:PictureProduct[]=[]
        let file:PictureProduct
        for (let i = 0; i < FilesArr.length; i++) {
            await MainObject.update({dirname:FilesArr[0],name:FilesArr[i]})
            ArrOfObjectByFiles.push(file)
        }
        return ArrOfObjectByFiles
    } */
    
    async getOne(id: number) {
        const product=await this.productModel.findByPk(id,{include:{all:true}})
        return product
    }
    async getAll() {
        return this.productModel.findAll({include:{all:true}})
        
    }
    async update(id: number, dto: CreateProductDto,files: { video: Express.Multer.File[], picture: Express.Multer.File[] }) {
        const lastProduct = await this.productModel.findByPk(id,{include:{all:true}})
        let video: string | null = null
        let pictures: string[] | null = null
        let onePicture: string | null = null
        if(!lastProduct) throw new HttpException('Продукт не найден',HttpStatus.NOT_FOUND)

        if(files) {
            if (files.video[0]){
                video = this.fileService.update(files.video[0], lastProduct.video_dir, EExtentionType.VIDEO)
            }

            if (files.picture){
                 /* this.fileService.update(files.picture, lastProduct.mainIcon_dir) */
                 for (let i = 0; i < files.picture.length; i++) {
                    onePicture= this.fileService.update(files.picture[i], lastProduct.pictureProduct[i].name, EExtentionType.IMAGE)
                    pictures.push(onePicture)
                 }
                 //this.updateFiles(pictures,lastProduct)
            }
        }

        


    }
    async delete(id: number) {
        const product = await this.productModel.findByPk(id)

        if(!product) {
            throw new HttpException("Company not fount", HttpStatus.NOT_FOUND)
        }

        if(
            !await this.productModel.destroy({
                where: {id}
            })
        ){
            throw new HttpException("Can't delete", HttpStatus.BAD_REQUEST)
        }

        return product
    }
}
