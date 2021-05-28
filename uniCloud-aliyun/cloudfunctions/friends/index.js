'use strict';
const collection = uniCloud.database().collection('friend')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const { action, params } = event;
	let data ,total,res;
	//返回数据给客户端
	switch(action){
		case 'add':
			data = await collection.add(params)
			return data
			break;
		case 'get':
			 res = await collection.get();
			total = await collection.count();
			return {
				data:res.data,
				total:total.total
			}
			break;
		case 'detail':
		   res = await collection.where({_id:params.id}).get();
		   return {
			   data:res.data
		   }
		   break;
		 case 'edit':
		   let cloneParams = JSON.parse(JSON.stringify(params));
		   delete params.id;
		   data = await collection.where({_id:cloneParams.id}).update(params);
		   return data;
		   break;
	}
};
