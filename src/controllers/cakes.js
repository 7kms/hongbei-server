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
    let arr = await Cake.find().populate('category','name').limit(parseInt(limit)).skip(parseInt(skip));
    ctx.body = {
        data: arr
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