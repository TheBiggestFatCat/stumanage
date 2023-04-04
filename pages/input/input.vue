<template>
	<view>
		<view class="bg"></view>
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
		
		<view class="picture-body">
			<view class="picture" v-for="(item, index) in goodPicture" :key="index">
				<view class="x" @click="cancelPic(index)">
					<uni-icons type="closeempty" size="12" color="#fff"></uni-icons>
				</view>
				<!-- <img class="pic" :src="item" alt=""> -->
				<img class="pic" :src="item" alt="">
				
			</view>
			<view class="picture" id="empty-pic" @click="addPic" v-if="goodPicture.length < 9">
				<uni-icons type="plus-filled" size="20" color="#949494"></uni-icons>
				<view>在这里上</view>
				<view>传图片</view>
			</view>
		</view>
		
		<button class="btn" @click="submit">提交</button>
		<view class="btm">

		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				goodPicture: [],
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
					}
				}
			}

		},
		methods: {
			submit() {
				const address = getApp().globalData.address
				this.formData.photo = this.goodPicture.join(",")
				console.log(this.formData.photo);
				const that = this
				this.$refs.form.validate().then(res => {
					console.log(res);
					res.photo = that.formData.photo
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
								that.goodPicture = []
								
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
			},
			addPic() {
				const goodPic = this.goodPicture.join(",")
				const that = this
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
									that.goodPicture.push(res.fileID)
									console.log(that.goodPicture);
									that.$forceUpdate()
								},
								fail(err) {
									console.log(err);
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
				
			},
			// 删除图片
			cancelPic(index) {
				this.goodPicture.splice(index, 1)
				this.$forceUpdate()
			}
		}
	}
</script>
<style lang="scss">
	.uni-mt-5 {
		margin-top: 5px;
	}
	
	.bg {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background-image: url('https://mp-a0b6177b-d49d-4c50-a9cf-fdec731bc83a.cdn.bspapp.com/cloudstorage/2f29a7b2-7bd6-4ad7-a6cb-d83a1813abe6.png');
		background-size: cover;
		background-repeat: no-repeat;

	}

	.btn {
		background-color: #1d9dff;
		color: #fff;
		margin: 40rpx 100rpx 40rpx 100rpx;
	}

	.btm {
		height: 100rpx;
	}
	

	.picture-body {
		display: flex;
		flex-flow: row wrap;
		justify-content: left;
		padding: 20rpx;
	}

	.picture {
		position: relative;
		margin-right: 10rpx;
		border-radius: 10rpx;
		width: calc(33.33% - 10rpx);
		height: 210rpx;
		margin-top: 10rpx;
		display: inline-block;
		overflow: hidden;
	}
	
	.x {
		position: absolute;
		right: 0;
		top: 0;
		width: 40rpx;
		height: 40rpx;
		background-color: rgba(72, 72, 72, 0.3);
		font-weight: 600;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.pic {
		width: 100%;
		height: 100%;
	}
	#empty-pic {
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		background-color: #e6e6e6;
		font-size: 14px;
		font-weight: 600;
		line-height: 130%;
		color: #949494;
	}
</style>
