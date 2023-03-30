<template>
	<view>
		<uni-easyinput v-model="filterText" placeholder="搜索"></uni-easyinput>
		<uni-table border stripe emptyText="暂无更多数据">
			<uni-tr>
				<uni-th align="center">学号</uni-th>
				<uni-th align="center">姓名</uni-th>
				<uni-th align="center">学校</uni-th>
				<uni-th align="center">学院</uni-th>
				<uni-th align="center">班级</uni-th>
				<uni-th align="center">辅导员</uni-th>
				<uni-th align="center">获奖记录</uni-th>
				<uni-th align="center">曾获奖学金</uni-th>
				<uni-th align="center">是否贫困生</uni-th>
				<uni-th align="center">成绩</uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in filteredItems" :key="index">
				<uni-td align="center">{{item.studentId}}</uni-td>
				<uni-td align="center">{{item.stuName}}</uni-td>
				<uni-td align="center">{{item.school}}</uni-td>
				<uni-td align="center">{{item.college}}</uni-td>
				<uni-td align="center">{{item.className}}</uni-td>
				<uni-td align="center">{{item.assistant}}</uni-td>
				<uni-td align="center">{{item.award}}</uni-td>
				<uni-td align="center">{{item.scholarship}}</uni-td>
				<uni-td align="center">{{item.poor == 1 ? '是': '否'}}</uni-td>
				<uni-td align="center"><button class="button" style="background-color: #2979ff;" type="primary" @click="open(item.stuId)"><text class="button-text">查看</text></button></uni-td>
			</uni-tr>
		</uni-table>
		<view>
		<uni-popup ref="popup" type="center">
				<view class="popup-title">
					成绩详情
				</view>
			<scroll-view scroll-y="true" class="gradebody">
				<uni-table border stripe emptyText="暂无成绩">
					<uni-tr>
						<uni-th align="center">科目</uni-th>
						<uni-th align="center">成绩</uni-th>
						<uni-th align="center">绩点</uni-th>
						<uni-th align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in grade" :key="index">
						<uni-td align="center"><uni-easyinput @blur="alterGrade(item.resultId, index)" v-model="item.lessonName"></uni-easyinput></uni-td>
						<uni-td align="center"><uni-easyinput type="number" @blur="alterGrade(item.resultId, index)" v-model="item.result"></uni-easyinput></uni-td>
						<uni-td align="center"><uni-easyinput type="number" @blur="alterGrade(item.resultId, index)" v-model="item.point"></uni-easyinput></uni-td>
						<uni-td align="center"><button @click="delGrade(item.resultId)" style="background-color: red; color: #fff; font-size: 14px; width: 80rpx; height: 60rpx; padding: 0; display: flex; justify-content: center; align-items: center;">删除</button></uni-td>
					</uni-tr>
				</uni-table>
				<button @click="addGrade">添加</button>
			</scroll-view>
		</uni-popup>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				students: [],
				items: [],
				filterData: [],
				filterText: '',
				grade: [],
				stuId: 0
			}
		},
		computed: {
			// 根据搜索信息展示
			filteredItems() {
				let filterData = []
				for (let i of this.items) {
					let arr = Object.values(i)
					for (let j in arr) {
						if (filterData[filterData.length - 1] == i) {
							break
						}
						if (j != 0) {
							if (arr[j].toString().indexOf(this.filterText) !== -1) {
								filterData.push(i)
							}
						}
					}
				}
				return filterData
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			// 打开弹窗
			open(stuId) {
				const address = getApp().globalData.address
				const that = this
				this.stuId = stuId
				this.$refs.popup.open()
				uni.request({
					url: address + '/Admin/Result/selectResultByStuId/',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method:'POST',
					data:{
						stuId
					},
					success(res) {
						that.grade = res.data
					}
				})
			},
			// 初始获取数据
			getData() {
				const address = getApp().globalData.address
				const that = this
				uni.request({
					url: address + '/Admin/Students/selectAllStudents',
					success(res) {
						that.$data.items = res.data
					}
				})
			},
			// 添加成绩
			addGrade() {
				const address = getApp().globalData.address
				const that = this
				uni.request({
					url: address + '/Admin/Result/addResult',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method:'POST',
					data:{
						stuId: that.stuId,
						lessonName: '课程名',
						result: 0,
						point: 0,
					},
					success(res) {
						if (res.data == 1) {
							uni.request({
								url: address + '/Admin/Result/selectResultByStuId/',
								header: {
									"Content-Type": "application/x-www-form-urlencoded"
								},
								method:'POST',
								data:{
									stuId: that.stuId
								},
								success(res) {
									that.grade = res.data
								}
							})
						}
					}
				})
			},
			alterGrade(resultId, index) {
				const address = getApp().globalData.address
				const that = this
				uni.request({
					url: address + '/Admin/Result/alterResult',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method:'POST',
					data:{
						stuId: that.stuId,
						lessonName: that.grade[index].lessonName,
						result: that.grade[index].result,
						point: that.grade[index].point,
						resultId
					}
				})
			},
			delGrade(resultId) {
				const address = getApp().globalData.address
				const that = this
				uni.request({
					url: address + '/Admin/Result/deleteResult/' + resultId,
					success(res) {
						if (res.data == 1) {
							uni.request({
								url: address + '/Admin/Result/selectResultByStuId/',
								header: {
									"Content-Type": "application/x-www-form-urlencoded"
								},
								method:'POST',
								data:{
									stuId: that.stuId
								},
								success(res) {
									that.grade = res.data
								}
							})
						} else {
							uni.showToast({
								title: '删除失败',
								icon: 'error'
							})
						}
					}
				})
			}
		}
	}
</script>
<style lang="scss">
		@mixin flex {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
		}
	
		@mixin height {
			/* #ifndef APP-NVUE */
			height: 100%;
			/* #endif */
			/* #ifdef APP-NVUE */
			flex: 1;
			/* #endif */
		}
	
		.box {
			@include flex;
		}
	
		.button {
			@include flex;
			align-items: center;
			justify-content: center;
			flex: 1;
			height: 35px;
			margin: 0 5px;
			border-radius: 5px;
		}
	
		.button-text {
			color: #fff;
			font-size: 12px;
		}
		
		.gradebody {
			width: 700rpx;
			height: 800rpx;
			background-color: #fff;
		}
		
		.popup-title {
			background-color: #fff;
			margin: 0 auto;
			padding: 30rpx;
			width: 700rpx;
			border-bottom: 1px solid #dedede;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
		}

</style>
