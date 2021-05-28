'use strict';
const db = uniCloud.database().collection('aticle')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const { action, params } = event
	let res,data;
	switch(action){
		case 'add':
			data = await db.add(params);
		return data
		break;
		case 'get':
		    const { page ,pageSize } = params
			let skip = (page-1)*pageSize
			res = await db.skip(skip).limit(pageSize).get();
			let total = await db.count()
		return {
			data:res.data,
			total:total.total
		}
		break;
		case 'update':
		    delete params._id
			res = await db.doc(event._id).update(params);
			return {
				data:res.data
			}
		break;
		case 'delete':
			res = await db.doc(event._id).remove();
			return {
				data:res.data
			}
		break;
	}
	//返回数据给客户端
};
