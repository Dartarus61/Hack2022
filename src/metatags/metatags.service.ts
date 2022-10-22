import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TagsCompany } from 'src/models/companyTags.model';
import { MetaTegs } from 'src/models/metaTegs.model';
import { TagsProduct } from 'src/models/productTags.model';
import { CreateTagsDto } from './dto/createTags.dto';

@Injectable()
export class MetatagsService {
    constructor(@InjectModel(MetaTegs) private MetaTegsModel:typeof MetaTegs,
    @InjectModel(TagsCompany) private TagsCompanyModel: typeof TagsCompany,
    @InjectModel(TagsProduct) private TagsProductModel: typeof TagsProduct){}


    async unlinkProduct(id: number, tags: number[]) {
        let post:TagsProduct
        for (let i = 0; i < tags.length; i++) {
            post = await this.TagsProductModel.findOne({where:{companyId:id,metaTegsId:tags[i]}})
            if (post) await post.destroy()
            
        }
        return post
    }
    async unlinkCompany(id: number, tags: number[]) {
        let post:TagsCompany
        for (let i = 0; i < tags.length; i++) {
            post = await this.TagsCompanyModel.findOne({where:{companyId:id,metaTegsId:tags[i]}})
            if (post) await post.destroy()
            
        }
        return post
    }
    async linkProduct(id: number, tags: number[]) {
        let post:TagsProduct=null
        for (let i = 0; i < tags.length; i++) {
            post = await this.TagsProductModel.create({companyId:id,metaTegsId:tags[i]})
            console.log(post);
            
        }
        return post
    }
    async linkCompany(id: number, tags: number[]) {
        let post:TagsCompany=null
        for (let i = 0; i < tags.length; i++) {
            post = await this.TagsCompanyModel.create({companyId:id,metaTegsId:tags[i]})
            console.log(post);
            
        }
        return post
    }
    async createTags(dto: CreateTagsDto) {
        return this.MetaTegsModel.create({name:dto.name})
    }
}
