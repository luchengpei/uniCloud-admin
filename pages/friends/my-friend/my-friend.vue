<template>
	<view class="wrap">
		<view class="index" v-if="!addOrUpdate">
			<view class="top">
				<text class="btn" @click="become">Be my friend</text>
				<text>大咖都是好朋友吖,未完待续~</text>
			</view>
			<uni-table border stripe emptyText="暂无更多数据" :loading="loading" class="table">
				<uni-tr>
				    <uni-th align="center">index</uni-th>
				    <uni-th align="center">nickName</uni-th>
				    <uni-th align="center">abbreviation</uni-th>
				    <uni-th align="center">picture</uni-th>
				    <uni-th align="center">gameName</uni-th>
				    <uni-th align="center">source</uni-th>
				    <uni-th align="center">knowTime</uni-th>
				    <uni-th align="center">operate</uni-th>
				</uni-tr>
				<uni-tr v-for="(item,index) in friendList" :key="index">
				    <uni-td align="center">{{index+1}}</uni-td>
				    <uni-td align="center">{{item.nickName}}</uni-td>
				    <uni-td align="center">{{item.abbreviation}}</uni-td>
				    <uni-td align="center">
						<image :src="item.picture" mode="" class="img" @click="preViewImg(item.picture)"></image>
					</uni-td>
					 <uni-td align="center">{{item.gameName}}</uni-td>
					<uni-td align="center">{{item.source}}</uni-td>
				    <uni-td align="center">{{item.knowTime}}</uni-td>
				    <uni-td align="center" class="operate">
						<text @click="del(item)">删除</text>
						<text @click="edit(item._id)">编辑</text>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
		<AddOrUpdate v-else @back="back" :id="currentId" ref="detail"/>
		<view class="pagination" v-if="!addOrUpdate">
			<uni-pagination  show-icon="true" :total="total" pageSize="10" @change="paginationChange"></uni-pagination>
		</view>
	</view>
</template>

<script>
	import AddOrUpdate from './add-edit.vue'
	export default {
		components:{
			AddOrUpdate
		},
		data() {
			return {
				loading:false,
				addOrUpdate:false,
				total:0,
				friendList:[],
				currentId:''
			};
		},
		onLoad(){
			this.getFriendList()
		},
		methods: {
			//图片放大
			preViewImg(img) {
				const list = [img]
				uni.previewImage({
					urls:list
				})
			},
			//新增好友
			become(){
				this.addOrUpdate = true
			},
			//返回
			back(){
				this.addOrUpdate = false;
				this.getFriendList()
			},
			//分页
			paginationChange(){
				
			},
			//删除
			del(item){
				uni.showModal({
					title:`是否删除 ${item.nickName}`,
					content:'删个钩吧删',
					success: (res) => {
						if(res.confirm){
							uni.showToast({
								title:'不能删吖',
								icon:'none'
							})
						}
					}
				})
			},
			//编辑
			edit(id){
				this.currentId = id;
				this.addOrUpdate = true;
				this.$nextTick(()=>{
					this.$refs.detail.getDetail()
				})
			},
			//获取列表
			getFriendList(){
				this.loading = true
				this.currentId = ''
				uniCloud.callFunction({
					name:'friends',
					data:{
						action:'get'
					},
					success: (res) => {
						this.loading = false;
						this.total = res.result.total;
						this.friendList = res.result.data;
						this.friendList.forEach(row=>{
							row.picture = row.picture.map(item=>item.url).join(',')
						})
					}
				})
			}
		},
	}
</script>

<style lang="scss">

.index{
	position: relative;
	padding: 10px 0 0 10px;
	.top{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		.btn{
			width: 150px;
			background: pink;
			color:#fff;
			text-align: center;
			line-height: 38px;
			border-radius: 8px;
			margin-right: 20px;
			// left: 0;
			// position: absolute;
			// left: 20px;
			// top:20px
		}
	}
	/deep/ .uni-table-scroll{
		margin-top: 20px;
	}
	.img{
		width: 100%;
		height: 100px;
	}
	.operate{
		display: flex;
		height: 130px;
		align-items: center;
		justify-content: space-around;
	}
	.pagination{
		position: fixed;
		right: 20px;
		bottom: 60px;
	}
}
.pagination{
	// position: fixed;
	// right: 20px;
	// bottom: 60px;
}
</style>
