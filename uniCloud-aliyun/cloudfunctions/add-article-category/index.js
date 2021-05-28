'use strict';
const db = uniCloud.database()
const categoryCollection = db.collection('articl-category')
const aticleCollection = db.collection('aticle')
const dbCmd = db.command;  
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res 
	const type = event.action
	switch(type){
		case 'add':
		res = await categoryCollection.add(event.params);
		break;
		case 'get':
		let page = event.page || 1
		let pageSize = event.pageSize || 10
		let skip = (page-1)*pageSize
		res = await categoryCollection.skip(skip).limit(pageSize).get();
		break;
		case 'delete':
		res = await categoryCollection.where({_id:event.id}).remove();
		await aticleCollection.where({
			categoryId:event.id
		}).remove()
		break;
		case 'edit' :
		let _id = event.params._id
		let params = event.params
		delete params._id
		res = await categoryCollection.doc(_id).update({...params});
		break;
		case 'detail':
		res = await categoryCollection.doc(event.params).get()
		
		break;
		case 'total':
		res = await categoryCollection.get();
		break;
	}
	
	//返回数据给客户端
	return res
};
