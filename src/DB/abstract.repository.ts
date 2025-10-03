import { Model, MongooseUpdateQueryOptions, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery } from "mongoose";





export abstract class AbstractRepository<T> {


constructor(protected model:Model<T>){}




async create(item:Partial<T>){
    const doc=  new this.model(item);
    doc["isNew"] = true;
    return  await doc.save()
}

async getOne(
    filter:RootFilterQuery<T> ,
      projection?:ProjectionType<T> ,
       options?:QueryOptions     ) {


return await this.model.findOne(filter , projection , options)

      }


async exist(
    filter:RootFilterQuery<T> ,
      projection?:ProjectionType<T> ,
       options?:QueryOptions     ) {


return await this.model.findOne(filter , projection , options)

      }




      async update(
        filter:RootFilterQuery <T> ,
        update:UpdateQuery <T> ,
        options?:MongooseUpdateQueryOptions
           )

{
    await this.model.updateOne(filter , update , options)
}




      async delete(
        filter:RootFilterQuery <T> ,
   
           )

{
    await this.model.deleteOne(filter)
}



}






