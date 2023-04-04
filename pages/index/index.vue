<template>
	<view class="container">
		<view class="top">
			学生管理
		</view>
		<view class="title">用户名</view>
		<uni-easyinput class="input" v-model="username" placeholder="" />
		<view class="title">密码</view>
		<uni-easyinput class="input" v-model="password" type="password" placeholder="" />
		<view style="margin-top: 40rpx;">
			<view class="uni-px-5 uni-pb-5">
				<uni-data-checkbox v-model="radio1" :localdata="sex"></uni-data-checkbox>
			</view>
		</view>
		<button @click="login">登录</button>
		<button @click="register">注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				radio1: 2,
				sex: [
					{
					text: '教师',
					value: 2
				}, 
				// {
				// 	text: '管理员',
				// 	value: 1
				// },
				]
			}
		},
		
		methods: {
			// 跳转至注册
			register() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			},
			login() {
				const address = getApp().globalData.address
				const that = this
				uni.request({
					url: address + '/Admin/User/userLogin',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method:'POST',
					data:{
						userName: this.$data.username,
						password: this.$data.password,
						role: this.$data.radio1
					},
					success(res) {
						if (res.data == 1) {
							if (that.radio1 == 2) {
								getApp().globalData.username = that.$data.username
								uni.switchTab({
									url: '/pages/info/info'
								})
							} else {
								uni.redirectTo({
									url: '/pages/manage/manage'
								})
							}
						}
						else {
							uni.showToast({
								title: '登录失败',
								icon: 'error'
							})
						}
					}
				})
			}
		},
	}
</script>

<style>
	page {
		background-image: url('https://mp-a0b6177b-d49d-4c50-a9cf-fdec731bc83a.cdn.bspapp.com/cloudstorage/2f29a7b2-7bd6-4ad7-a6cb-d83a1813abe6.png');
		background-size: cover;
		background-repeat: no-repeat;
	}

	.container {
		padding: 40rpx;
	}

	.top {
		margin-top: 100rpx;
		font-size: 64rpx;
		font-weight: 600rpx;
	}

	.title {
		font-size: 28rpx;
		margin-top: 80rpx;
	}

	.input {
		margin-top: 60rpx;
	}

	button {
		background-color: #2e7dd1;
		color: #fff;
		margin-top: 40rpx;
	}

	image {
		width: 52rpx;
		height: 52rpx;
	}

	.select {
		height: 40rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
	}
</style>
