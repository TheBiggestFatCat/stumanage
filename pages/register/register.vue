<template>
	<view class="container">
		<view class="top">
			注册
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
		<button @click="register">注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				radio1: 1,
				sex: [{
					text: '教师',
					value: 2
				}, {
					text: '管理员',
					value: 1
				}],
				avatar: ''
			}
		},
		methods: {
			register() {
				const address = getApp().globalData.address
				uni.request({
					url: address + '/Admin/User/addUser',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: 'POST',
					data: {
						userName: this.$data.username,
						password: this.$data.password,
						role: this.$data.radio1
					},
					success(res) {
						if (res.data == 1) {
							uni.showToast({
								title: '注册成功'
							})
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/index/index'
								})
							}, 1000)
						} else {
							uni.showToast({
								title: '注册失败',
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
		background-color: #fff;
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
