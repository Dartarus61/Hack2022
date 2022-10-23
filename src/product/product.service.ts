import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getNormObject } from 'src/company/company.service';
import { EExtentionType, FilesService } from 'src/fileLoader/fileLoader.service';
import { EPublished } from 'src/models/case.model';
import { PictureProduct } from 'src/models/pictureProduct.model';
import { EDeliveryMethod, EPaymentMethod, ETypeBuy, Product } from 'src/models/product.model';
import { ECrudOperation } from 'src/models/moderator.model';
import { ModeratorService } from 'src/moderator/moderator.service';
import { CreateProductDto } from './dto/CreateProduct.dto';

@Injectable()
export class ProductService {
    
    constructor(
        @InjectModel(Product)
        private readonly productModel: typeof Product,

        private readonly fileService: FilesService,

        @InjectModel(PictureProduct) private readonly pictureProductModel: typeof PictureProduct,

        private readonly moderatorService:ModeratorService
    ){}

    async create(dto: CreateProductDto,files: { video: Express.Multer.File[], picture: Array<Express.Multer.File> }) {
        
        if (Object.values(ETypeBuy).includes(dto.typeBuy) && Object.values(EPaymentMethod).includes(dto.paymentMethod) && Object.values(EDeliveryMethod).includes(dto.deliveryMethod) && Object.values(EPublished).includes(dto.published)) {
            const video = this.fileService.upload(files.video[0], EExtentionType.VIDEO)
            const picture = await this.createFiles(this.fileService.uploadMany(files.picture, EExtentionType.IMAGE))
            const product= await this.productModel.create({video_dir: video, ...dto, date: new Date(), price: Number(dto.price), minLot: Number(dto.minLot), importozamest: Boolean(dto.importozamest), visible: Boolean(dto.visible)})
            product.$add('pictureProduct',picture)

            let sendJSON=getNormObject(product)
        delete sendJSON.id
        
        const moderatable= await this.moderatorService.create(sendJSON,ECrudOperation.CREATE,'company')
        console.log(moderatable);
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

    async updateFiles(FilesArr:string[],MainObject:Product){
        const ArrOfObjectByFiles:PictureProduct[]=[]
        let file:PictureProduct
        for (let i = 0; i < FilesArr.length; i++) {
            file = await this.pictureProductModel.create({dirname:FilesArr[0],name:FilesArr[i]})
            ArrOfObjectByFiles.push(file)
        }
        return ArrOfObjectByFiles
    }
    
    async getOne(id: number) {
        const product=await this.productModel.findByPk(id,{include:{all:true}})
        return product
    }
    async getAll() {
        return this.productModel.findAll({include:{all:true}})
        
    }
    async update(id: number, dto: CreateProductDto,files: { video: Express.Multer.File[], picture: Express.Multer.File[] }) {
        const lastProduct = await this.productModel.findByPk(id,{include:{all:true}})
        console.log(lastProduct);
        
        for (let i = 0; i < lastProduct.pictureProduct.length; i++) {
            await lastProduct.pictureProduct[i].destroy()
        }
        let video: string | null = null
        let pictures: string[] | null = null
        let onePicture: string | null = null
        if(!lastProduct) throw new HttpException('Продукт не найден',HttpStatus.NOT_FOUND)

        if(files) {
            if (files.video[0]){
                video = this.fileService.update(files.video[0], lastProduct.video_dir, EExtentionType.VIDEO)
            }

            if (files.picture){
                 for (let i = 0; i < files.picture.length; i++) {
                    onePicture= this.fileService.update(files.picture[i], lastProduct.pictureProduct[i].name, EExtentionType.IMAGE)
                    pictures.push(onePicture)
                 }
                 let newPictures = await this.updateFiles(pictures,lastProduct)
                 await lastProduct.$add('pictureProduct',newPictures)
                
            }
        }
        return lastProduct
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
        this.fileService.deleteFile(product.video_dir,EExtentionType.VIDEO)
        const allpicture = await this.pictureProductModel.findAll({where:{productId:id}})
        for (let i = 0; i < allpicture.length; i++) {
            this.fileService.deleteFile(allpicture[i].name,EExtentionType.IMAGE)
            await allpicture[i].destroy()
        }
        return product
    }

    async updateStatus(id: number,status:EPublished) {
        const product= await this.productModel.findByPk(id) 
        const newProduct = await product.update({published:status})
        return newProduct
    }

    async findByName(name: string) {
       const product = await this.productModel.findOne({where:{name},include:{all:true}})
    }
}
