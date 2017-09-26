import Cake from '../models/cake';

export let cakeDetail = async (ctx)=>{
    console.log(ctx.params.id)
    try{
        let res = await Cake.findOne({_id: ctx.params.id,$or:[{isRemoved:false},{isRemoved:{$exists:false}}]})
        console.log(res)
        if(res){
            ctx.status = 200
            ctx.body = {
                data: res
            }
        }else{
            ctx.status = 503
            ctx.body = {
                err: "数据不存在"
            }
            console.log(ctx.body)
        }
        
    }catch(err){
        ctx.status = 500,
        ctx.body = {
            msg: err
        }
    }
    
}

export let cakeList = async (ctx)=>{
    console.log(ctx.request.query)
    let { limit=10, skip=0, options,projections={}} = ctx.request.query;
    console.log(options);
    let total = await Cake.find({$and:[options,{$or:[{isRemoved:false},{isRemoved:{$exists:false}}]}]},projections).count()
    let arr = await Cake.find({$and:[options,{$or:[{isRemoved:false},{isRemoved:{$exists:false}}]}]},projections)
    .populate('category','name')
    .limit(parseInt(limit))
    .skip(parseInt(skip))
    .sort({updatedAt:-1});
    ctx.body = {
        data: arr,
        total
    }
}

export let cakeInsert = async (ctx)=>{
    let obj = {
            cover:'',
            pictures:[],
            name:'',
            description:'',
            price: 0,
            standards:[],
            isPromotion: false,
            promotionUrl: '',
            sales: 0,
            onSale: false,
            category: ''
    }
    obj = Object.assign(obj, ctx.request.body)
    let cake = await new Cake(obj).save()
    ctx.body = {
        data: cake
    }
}
export let cakeUpdate = async (ctx)=>{

    let obj = ctx.request.body;
    delete obj._id
    delete obj.isRemoved
    let result = await Cake.update({ _id: ctx.params.id }, { $set: obj});
    // let data = Cake.findById(ctx.params.id)
    // let cake = Cake.findById(ctx.request.body)
    if(result.ok){
        ctx.status = 200;
        ctx.body = {
            result
        }
    }else{
        ctx.status = 400;
        ctx.body = {
            result
        }
    }
    
}

export let cakeDelete = async (ctx)=>{
    let arr = await Cake.update({_id: ctx.params.id},{$set:{isRemoved: true}})
    ctx.body = {
        data: arr
    }
}

export let cakeInsertMany = async (ctx)=>{
    let arr = require('../../data/cakes.js')
    let cake = Cake.insertMany(arr)
    ctx.body = {
        data: cake
    }
}