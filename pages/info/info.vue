<template>
	<!-- <view class="bg"></view> -->
	<view>
		<view style="padding: 20rpx; background-color: #fff;">
			<uni-easyinput v-model="filterText" placeholder="搜索"></uni-easyinput>
		</view>
		<view class="grayline"></view>
<!-- 		<uni-table border stripe emptyText="暂无更多数据">
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
		</uni-table> -->
		<view class="stuinfo" v-for="(item, index) in filteredItems" :key="index">
			<view class="line1"><span>姓名</span><span class="big">{{item.stuName}}</span></view>
			<view class="grayline"></view>
			<view class="flex">
				<view class="stu-left">
					<view class="three"><span>学号</span><span class="gray" style="margin-left: 40rpx; position: relative; top: 2rpx;">{{item.studentId}}</span></view>
					<view class="three"><span>班级</span><span class="gray" style="margin-left: 40rpx; position: relative; top: 2rpx;">{{item.className}}</span></view>
					<view class="three"><span>学院</span><span class="gray" style="margin-left: 40rpx; position: relative; top: 2rpx;">{{item.college}}</span></view>
				</view>
				<view class="stu-right">
					<img class="rightimg" :src="item.photo.split(',')[0]" alt="">
				</view>
			</view>
			<view class="grayline" style="margin-top: 18rpx;"></view>
			<uni-collapse-item title="更多">
				<view class="line" style="margin-top: 20rpx;"><span class="gray">学校</span><span class="gray">{{item.school}}</span></view>
				<view class="line"><span class="gray">辅导员</span><span class="gray">{{item.assistant}}</span></view>
				<view class="line"><span class="gray">获奖记录</span><span class="gray">{{item.award}}</span></view>
				<view class="line"><span class="gray">曾获奖学金</span><span class="gray">{{item.scholarship}}</span></view>
				<view class="line"><span class="gray">是否贫困生</span><span class="gray">{{item.poor == 1 ? '是': '否'}}</span></view>
				<view class="line"><span class="gray">成绩详情</span><view class="button" style="background-color: #2979ff;" @click="openGrade(item.stuId)">详情</view></view>
				<view class="line"><span class="gray">图片资料</span><view class="button" style="background-color: #2979ff;" @click="openPicture(item.photo)">详情</view></view>
			</uni-collapse-item>
	</view>
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
		
		<uni-popup ref="popup2" type="center">
			<view class="pic-title">图片详情</view>
			<view class="pictures">
				<img @click="showbigpic(item)" class="picture" v-for="(item, index) in showPicture" :key="index" :src="item" alt="">
			</view>
		</uni-popup>
		
		<uni-popup ref="popup3" type="center">
			<img class="bigpic" style="width: 700rpx; height: 700rpx;" :src="bigpic" alt="">
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
				stuId: 0,
				showPicture: [],
				bigpic: ''
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
							if (arr[j] == null) {
								arr[j] = ''
							}
							if (arr[j].toString().indexOf(this.filterText) !== -1) {
								filterData.push(i)
							}
						}
					}
				}
				return filterData
			},
		},
		onShow() {
			this.getData()
		},
		methods: {
			// 查看大图
			showbigpic(url) {
				this.bigpic = url
				this.$refs.popup3.open()
			},
			// 打开弹窗
			openGrade(stuId) {
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
			openPicture(picture) {
				const address = getApp().globalData.address
				this.$refs.popup2.open()
				if (picture !== null) {
					this.showPicture = picture.split(',')
				} else {
					this.showPicture = ''
				}
			},
			// 初始获取数据
			getData() {
				const address = getApp().globalData.address
				const that = this
				uni.request({
					url: address + '/Admin/Students/selectAllStudents',
					success(res) {
						for (let i of res.data) {
							if (i.photo == null) {
								i.photo = ''
							}
						}
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
		
		page {
			background-image: url('https://mp-a0b6177b-d49d-4c50-a9cf-fdec731bc83a.cdn.bspapp.com/cloudstorage/2f29a7b2-7bd6-4ad7-a6cb-d83a1813abe6.png');
			background-size: cover;
			background-repeat: no-repeat;
		}
		
		.bg {
			position: fixed;
			width: 100vw;
			height: 100vh;
			background-image: url('https://mp-a0b6177b-d49d-4c50-a9cf-fdec731bc83a.cdn.bspapp.com/cloudstorage/2f29a7b2-7bd6-4ad7-a6cb-d83a1813abe6.png');
			background-size: cover;
			background-repeat: no-repeat;
		}
		
	
		.box {
			@include flex;
		}
	
		.button {
			background-color: $uni-primary;
			color: #fff;
			padding: 18rpx 40rpx;
			margin: 0 5px;
			border-radius: 5px;
		}
		
		.stuinfo {
			background-color: #fff;
		}
		
		.flex {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		
		.rightimg {
			width: 150rpx;
			height: 210rpx;
			padding: 12px 16px 8px 16px;
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
		
		.gray {
			font-size: 14px;
			color: #3b3b3b;
		}

		.big {
			font-size: 20px;
			font-weight: 600;
			color: #0839a1;
		}
		
		.three {
			padding: 12px 16px 8px 16px;
			display: flex;
			align-items: center;
		}
		
		.line {
			padding: 12px 16px 8px 16px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		
		.line1 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20px 16px 20px 16px;
		}
		
		.grayline {
			width: calc(100% - 32px);
			margin: 0 auto;
			border-bottom: 1px solid #dadada;
		}
		
		.pic-title {
			padding: 40rpx 50rpx 30rpx 50rpx;
			background-color: #fff;
		}
		
		.pictures {
			padding: 30rpx;
			background-color: #fff;
			height: 600rpx;
			width: 600rpx;
			display: flex;
			flex-flow: row wrap;
		}
		
		.picture {
			width: calc(33.3% - 20rpx);
			height: calc(33.3% - 20rpx);
			margin: 10rpx;
		}
</style>
