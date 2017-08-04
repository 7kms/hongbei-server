import Cake from '../models/cake';

export let cakeDetail = async (ctx)=>{
    console.log(ctx.params.id)
    let arr = await Cake.findOne({_id: ctx.params.id})
    ctx.body = {
        data: arr
    }
}

export let cakeList = async (ctx)=>{
    console.log(ctx.query)
    let { limit=10, skip=0 } = ctx.query;
    let arr = await Cake.find().limit(parseInt(limit)).skip(parseInt(skip));
    ctx.body = {
        data: arr
    }
}

export let cakeInsert = async (ctx)=>{
    let obj = {
            cover:'',
            pictures:[],
            name:'baijiud',
            description:'it is nice',
            price: 188,
            standard:[],
            isPromotion: false,
            promotionUrl: '',
            sales: 18,
            category: 'jiusss'
    }
    let cake = await new Cake(obj).save()
    ctx.body = {
        data: cake
    }
}
export let cakeUpdate = async (ctx)=>{

    let obj = ctx.request.body.data;
    delete obj._id
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
    let arr = await Cake.remove({_id: ctx.params.id})
    ctx.body = {
        data: arr
    }
}