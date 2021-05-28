<template>
	<view class="index">
		<view class="back" @click="back">
			<uni-icons type="arrowleft" size="30"></uni-icons>
			<text class="text">返回</text>
		</view>
		<view class="form">
			<uni-forms :value="formData" ref="form" :rules="rules">
				<uni-forms-item label="nickName" name="nickName" required>
					<uni-easyinput type="text" v-model="formData.nickName" placeholder="请输入昵称" />
				</uni-forms-item>
				<uni-forms-item label="abbreviation" name="abbreviation" required>
					<uni-easyinput type="text" v-model="formData.abbreviation" placeholder="请输入别名" />
				</uni-forms-item>
				<uni-forms-item label="gameName" name="gameName" required>
					<uni-easyinput type="text" v-model="formData.gameName" placeholder="请输入游戏id" />
				</uni-forms-item>
				<uni-forms-item label="source" name="source" required>
					<uni-easyinput type="text" v-model="formData.source" placeholder="请输入认识来源" />
				</uni-forms-item>
				<uni-forms-item label="picture" name="picture" required>
					<uni-file-picker v-model="formData.picture" mode="grid"  :image-styles="imageStyles"
						:limit="1" @delete="delePic" @success="success" 
						/>
				</uni-forms-item>
				<uni-forms-item label="knowTime" name="knowTime" required>
					<uni-datetime-picker v-model="formData.knowTime"></uni-datetime-picker>
				</uni-forms-item>
				<button @click="submitForm" class="btn">Submit</button>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			id:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				formData: {
					nickName: '',
					abbreviation: '',
					gameName: '',
					source: '',
					knowTime: '',
					picture: []
				},
				rules: {
					nickName: {
						rules: [{
							required: true,
							errorMessage: '请输入昵称'
						}]
					},
					abbreviation: {
						rules: [{
							required: true,
							errorMessage: '请输入别名'
						}]
					},
					gameName: {
						rules: [{
							required: true,
							errorMessage: '请输入游戏id'
						}]
					},
					source: {
						rules: [{
							required: true,
							errorMessage: '请输入认识来源'
						}]
					},
					picture: {
						rules: [{
							required: true,
							errorMessage: '图片不能为空'
						}]
					},
					knowTime: {
						rules: [{
							required: true,
							errorMessage: '日期不能为空'
						}]
					}
				},
				imageStyles: {
					"height": 60, // 边框高度
					"width": 60, // 边框宽度
					"border": { // 如果为 Boolean 值，可以控制边框显示与否
						"color": "#eee", // 边框颜色
						"width": "1px", // 边框宽度
						"style": "solid", // 边框样式
						"radius": "20%" // 边框圆角，支持百分比
					}
				}
			}
		},
		methods: {
			back() {
				this.$emit('back')
			},
			//获取具体某一个
			getDetail(){
				uni.showLoading({
					title:'加载中ing...'
				})
				uniCloud.callFunction({
					name:'friends',
					data:{
						action:'detail',
						params:{
							id:this.id
						}
					},
					success: (res) => {
						uni.hideLoading()
						this.formData = {...this.formData,...res.result.data[0]}
					}
				})
			},
			//提交
			submitForm(form) {
				// 手动提交表单
				this.$refs.form.submit().then((res) => {
					uni.showLoading({
						title:'正在提交...'
					})
					if(this.id){
						res.id = this.id
						this.handleRequest(res,'edit')
					}else{
						this.handleRequest(res,'add')
					}
				})
			},
			//统一新增编辑请求
			handleRequest(params,action){
				uniCloud.callFunction({
					name:'friends',
					data:{
						params,
						action:action,
					},
					success: (result) => {
						uni.hideLoading()
						if(result.requestId){
							uni.showToast({
								title:this.id?'修改成功啦':'成为好友啦',
								icon:'success',
								success: () => {
									this.$emit('back')
								}
							})
						}
					}
				})
			},
			// 上传成功
			success(e) {
				this.formData.picture = []
				let filePath = e.tempFilePaths[0]
				this.uploadImg(filePath)
			},
			uploadImg(filePath){
				uniCloud.uploadFile({
					cloudPath: filePath,
					filePath,
					success: (res) => {
						this.formData.picture.push({
							url:res.fileID
						})
						console.log(this.formData.picture,'pic')
					}
				})
			},
			delePic(e) {
				this.formData.picture = []
			}
		},
	}
</script>

<style lang="scss" scoped>
	.index {
		.back {
			display: flex;
			align-items: center;
		}
		.form{
			width: 400px;
			margin: 0 auto;
			margin-top: 20px;
			.btn{
				background: pink;
				color:white
			}
		}
	}
</style>
