<template>
	<view>
		<view class="container">
			<input type="text" placeholder="请输入商品名称..." v-model="goodName" class="title">
			<view class="line">
				
			</view>
			<view class="picture-body">
				<view class="picture" v-for="(item, index) in photo" :key="index">
					<view class="x" @click="cancelPic(index)">
						<uni-icons type="closeempty" size="12" color="#fff"></uni-icons>
					</view>
					<img class="pic" :src="item" alt="">
				</view>
				<view class="picture" id="empty-pic" @click="addPic" v-if="goodPicture.length < 9">
					<uni-icons type="plus-filled" size="20" color="#949494"></uni-icons>
					<view>在这里上</view>
					<view>传图片</view>
				</view>
			</view>
			<view class="price" style="margin-top: 40rpx;">
				<view>
					<img src="@/static/images/money.png" style="width: 40rpx; height: 40rpx; position: relative; top: 8rpx;" alt="">
					预售价格
				</view>
				<view style="position: relative; top: 2rpx; color: red; margin-right: 20rpx; display: flex; align-items: center; width: 100rpx; justify-content: space-between;">
					¥<input style="position: relative; bottom: 1px; left: 4rpx;" type="text" v-model="goodPrice">
					<!-- <uni-icons type="right" size="16" color="#949494"></uni-icons> -->
				</view>	
			</view>
			<button class="btn" @click="publish">发布</button>
		</view>
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<uni-section title="学号" type="line" padding>
				<uni-forms-item name="studentId">
					<uni-easyinput v-model="formData.studentId" name="studentId" placeholder="请输入内容"></uni-easyinput>
				</uni-forms-item>
			</uni-section>

			<uni-section title="学生姓名" type="line" padding>
				<uni-forms-item name="stuName">
					<uni-easyinput v-model="formData.stuName" name="stuName" placeholder="请输入内容"></uni-easyinput>
				</uni-forms-item>
			</uni-section>

			<uni-section title="学校" type="line" padding>
				<uni-forms-item name="school">
					<uni-easyinput v-model="formData.school" name="school" placeholder="请输入内容"></uni-easyinput>
				</uni-forms-item>
			</uni-section>

			<uni-section title="学院" type="line" padding>
				<uni-forms-item name="college">
					<uni-easyinput v-model="formData.college" name="college" placeholder="请输入内容"></uni-easyinput>
				</uni-forms-item>
			</uni-section>

			<uni-section title="班级" type="line" padding>
				<uni-forms-item name="className">。
					<uni-easyinput v-model="formData.className" name="className" placeholder="请输入内容"></uni-easyinput>
				</uni-forms-item>
			</uni-section>

			<uni-section title="辅导员" type="line" padding>
				<uni-forms-item name="assistant">
					<uni-easyinput v-model="formData.assistant" name="assistant" placeholder="请输入内容"></uni-easyinput>
				</uni-forms-item>
			</uni-section>

			<uni-section title="获奖记录" type="line" padding>
				<uni-forms-item name="award">
					<uni-easyinput v-model="formData.award" name="award" placeholder="请输入内容"></uni-easyinput>
				</uni-forms-item>
			</uni-section>

			<uni-section title="曾获奖学金" type="line" padding>
				<uni-forms-item name="scholarship">
					<uni-easyinput v-model="formData.scholarship" name="scholarship" type="textarea"
						placeholder="请输入内容"></uni-easyinput>
				</uni-forms-item>
			</uni-section>
			<uni-section title="是否贫困生" type="line" padding>
				<view class="uni-px-5 uni-pb-5">
					<uni-forms-item name="poor">
						<uni-data-checkbox v-model="formData.poor" :localdata="poor"></uni-data-checkbox>
					</uni-forms-item>
				</view>
			</uni-section>
		</uni-forms>
		<button class="btn" @click="submit">提交</button>
		<view class="btm">

		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				poor: [{
					text: '不是',
					value: 0
				}, {
					text: '是',
					value: 1
				}],
				formData: {
					studentId: '',
					stuName: '',
					school: '',
					college: '',
					className: '',
					assistant: '',
					award: '',
					scholarship: '',
					poor: '',
					photo: ''
				},
				rules: {
					studentId: {
						rules: [{
							required: true,
							errorMessage: '学号为必填项'
						}]
					},
					stuName: {
						rules: [{
							required: true,
							errorMessage: '姓名为必填项'
						}]
					},
					school: {
						rules: [{
							required: true,
							errorMessage: '学校为必填项'
						}]
					},
					college: {
						rules: [{
							required: true,
							errorMessage: '学院为必填项'
						}]
					},
					className: {
						rules: [{
							required: true,
							errorMessage: '班级为必填项'
						}]
					},
					assistant: {
						rules: [{
							required: true,
							errorMessage: '辅导员为必填项'
						}]
					},
					poor: {
						rules: [{
							required: true,
							errorMessage: '是否贫困生为必填项'
						}]
					},
				}
			}

		},
		onLoad() {},
		onReady() {},
		methods: {
			submit() {
				const address = getApp().globalData.address
				const that = this
				this.$refs.form.validate().then(res => {
					uni.request({
						url: address + '/Admin/Students/addStudents',
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						method: 'POST',
						data: res,
						success(res) {
							if (res.statusCode == 200) {
								uni.showToast({
									title: '提交成功'
								})
							} else {
								uni.showToast({
									title: '提交失败',
									icon: 'error'
								})
							}
							that.$data.formData = {}
						},
						fail() {
							uni.showToast({
								title: '提交失败',
								icon: 'error'
							})
						}
					})
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			}
		},
	},
	setup() {
		// data
		import {
			getCurrentInstance,
		} from "vue";
		let {
			ctx: that,
			proxy
		} = getCurrentInstance()
		
		
		let time = new Date()
		let goodName = ''
		const goodProducterId = getApp().globalData.userid
		let goodPicture = []
		const goodDate = time.toLocaleDateString()
		let goodPrice = 0
		let goodText = ''
		
		// 发布
		const publish = () => {
			const goodPic = goodPicture.join(",")
			console.log(goodPic);
			uni.request({
				url: 'http://127.0.0.1:3000/good/addgood',
				method: 'POST',
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				data: {
					goodName,
					goodProducterId,
					goodPicture: goodPic,
					goodDate,
					goodPrice,
					goodText
				},
				success(res) {
					console.log(res);
					uni.showToast({
						title: '发布成功',
					})
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/home3/home3'
						})
					}, 1500)
				}, 
				fail(err) {
					console.log(err);
				}
			})
		}
		
		// 上传图片
		const addPic = () => {
			const goodPic = goodPicture.join(",")
			console.log(goodPic);
			uni.chooseImage({
				count: 1,
				success(res) {
					if (res.tempFilePaths.length > 0) {
						let filePath = res.tempFilePaths[0]
						uni.showLoading({
							title: '上传中..',
							mask: true
						})
						//进行上传操作
						// callback方式，与promise方式二选一即可
						uniCloud.uploadFile({
							filePath: filePath,
							cloudPath: 'a.png',
							onUploadProgress: function(progressEvent) {
								console.log(progressEvent);
								var percentCompleted = Math.round(
									(progressEvent.loaded * 100) / progressEvent.total
								);
							},
							success(res) {
								goodPicture.push(res.fileID)
								that.$forceUpdate()
							},
							fail() {
								uni.showToast({
									title: '上传失败',
									icon: 'error'
								})
								uni.hideLoading()
							},
							complete() {
								uni.hideLoading()
							}
						});
		
					}
				}
			});
		
		}
		
		// 删除图片
		const cancelPic = (index) => {
			goodPicture.splice(index, 1)
			that.$forceUpdate()
		}
	}
</script>
<style lang="scss">
	.uni-mt-5 {
		margin-top: 5px;
	}

	.btn {
		background-color: #1d9dff;
		color: #fff;
		margin: 40rpx 100rpx 40rpx 100rpx;
	}

	.btm {
		height: 100rpx;
	}

	page {
		background-color: #fff;
	}
</style>
