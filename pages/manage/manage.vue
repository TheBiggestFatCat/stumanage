<template>
	<view>
		<uni-table border stripe emptyText="暂无更多数据">
			<uni-tr>
				<uni-th align="center">ID</uni-th>
				<uni-th align="center">教师名</uni-th>
				<uni-th align="center">操作</uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in filteredUsers" :key="index">
				<uni-td align="center">{{item.userId}}</uni-td>
				<uni-td align="center">{{item.userName}}</uni-td>
				<uni-td align="center"><button @click="delUser(item.userId)" style="background-color: red; color: #fff; font-size: 14px; width: 80rpx; height: 60rpx; padding: 0; display: flex; justify-content: center; align-items: center;">删除</button></uni-td>
			</uni-tr>
		</uni-table>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				users: [
					{
						username: '',
					}
				]
			}
		},
		methods: {
			getData() {
				const address = getApp().globalData.address
				const that = this
				uni.request({
					url: address + '/Admin/User/selectAllUser',
					success(res) {
						that.users = res.data
					}
				})
			},
			delUser(userId) {
				const address = getApp().globalData.address
				const that = this
				uni.request({
					url: address + '/Admin/User/deleteUser/' + userId,
					success(res) {
						if (res.data == 1) {
							uni.showToast({
								title: '删除成功'
							})
							that.getData()
						} else {
							uni.showToast({
								title: '删除失败',
								icon: 'error'
							})
						}
					}
				})
			}
		},
		computed: {
			// 筛选身份为教师的用户
			filteredUsers() {
				let filterData = []
				for (let i of this.users) {
					if (i.role == 2) {
						filterData.push(i)
					}
				}
				return filterData
			}
		},
		onShow() {
			this.getData()
		}
	}
</script>

<style>

</style>
