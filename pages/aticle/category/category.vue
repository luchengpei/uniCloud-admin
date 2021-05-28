<template>
	<view>
		<uni-table border stripe emptyText="暂无更多数据" :loading="loading">
		    <!-- 表头行 -->
		    <uni-tr>
		        <uni-th align="center">id</uni-th>
		        <uni-th align="center">文章分类</uni-th>
		        <uni-th align="center">缩略图</uni-th>
		        <uni-th align="center">标题</uni-th>
		        <uni-th align="center">小标题</uni-th>
		        <uni-th align="center">点赞数</uni-th>
		        <uni-th align="center">预览数</uni-th>
		        <uni-th align="center">创建时间</uni-th>
		        <uni-th align="center">操作</uni-th>
		    </uni-tr>
		    <!-- 表格数据行 -->
		    <uni-tr v-for="(item,index) in tableList" :key="index">
		        <uni-td align="center">{{item._id}}</uni-td>
		        <uni-td align="center">{{item.category}}</uni-td>
		        <uni-td align="center">
					<image :src="item.img" mode="" class="img" @click="preViewImg(item.img)"></image>
				</uni-td>
		        <uni-td align="center">{{item.title}}</uni-td>
		        <uni-td align="center">{{item.subTitle}}</uni-td>
		        <uni-td align="center">{{item.collectionNum}}</uni-td>
		        <uni-td align="center">{{item.preViewNum}}</uni-td>
		        <uni-td align="center">{{item.createTime}}</uni-td>
		        <uni-td align="center" class="operate">
					<text @click="del(item._id)">删除</text>
					<text @click="edit(item._id)">编辑</text>
				</uni-td>
		    </uni-tr>
		
		</uni-table>
		<view class="pagination">
			<uni-pagination  show-icon="true" :total="total" pageSize="10" @change="paginationChange"></uni-pagination>
		</view>
	</view>
</template>

<script>
	import {formatTime} from '../../../utils/commonFn.js'
	export default {
		data() {
			return {
				tableList:[],
				loading:true,
				total:0
			};
		},
		onLoad() {
			this.getAriticelList()
		},
		methods: {
			//图片放大
			preViewImg(img) {
				const list = [img]
				uni.previewImage({
					urls:list
				})
			},
			//请求列表
			getAriticelList(){
				uniCloud.callFunction({
					name:'aticle',
					data:{
						action:'get',
						params:{
							pageSize:10,
							page:1
						}
					}
				}).then(res=>{
					this.loading = false
					this.tableList = res.result.data
					this.tableList.forEach(row=>{
						row.createTime = formatTime(new Date(row.createTime))
					})
					this.total = res.result.total
					console.log(res,'res2124')
				})
			},
			del(id){
				uni.showModal({
					title:'是否删除',
					content:'删个钩吧删',
					success: (res) => {
						if(res.confirm){
							console.log(787987)
						}
					}
				})
			},
			edit(id){
				
			},
			paginationChange({type,current}){
				console.log(type,current)
			}
		},
	}
</script>

<style lang="scss">
.img{
	width: 50px;
	height: 50px;
}
.operate{
	display: flex;
	height: 79px;
	align-items: center;
	justify-content: space-around;
}
.pagination{
	position: fixed;
	right: 20px;
	bottom: 60px;
}
</style>
