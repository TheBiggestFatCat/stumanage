<template>
	<view>
		<view class="avatar">
			<image class="user-avatar" :src="state.userinfo.picture" mode=""></image>
			<p class="username">{{state.userinfo.userName}}</p>
				<view class="alter" @click="addPic">
					<span><uni-icons type="plusempty" size="16"></uni-icons>上传头像</span>
					<span><uni-icons type="right" size="16"></uni-icons></span>
				</view>
			<view class="grayline"></view>
				<view class="alter" @click="state.alter=true" v-if="state.alter==false">
					<span><uni-icons type="compose" size="16"></uni-icons>修改密码</span>
					<span><uni-icons type="right" size="16"></uni-icons></span>
				</view>
				<view class="alter-password" v-if="state.alter==true">
					<input type="text" v-model="state.password" class="input" name="" placeholder="请输入新密码">
					<button style="margin-top: 100rpx;" @click="alterPassword" size="mini">确定</button>
				</view>
		</view>
	</view>
	
	<uni-popup></uni-popup>
</template>

<script setup>
	import {
		onShow
	} from "@dcloudio/uni-app"
	
	import { reactive } from 'vue'
	
	const state = reactive({
		userinfo: {
			picture: 'https://mp-a0b6177b-d49d-4c50-a9cf-fdec731bc83a.cdn.bspapp.com/cloudstorage/60f46d0d-2016-48f1-b34d-dea391ac2e22.png'
		},
		alter: false,
		password: ''
	})
	
	function getData() {
		uni.request({
			url: 'http://127.0.0.1:8091/Admin/User/selectUserByName/' + getApp().globalData.username,
			success(res) {
				console.log(res);
				if (res.data.picture == null) {
					res.data.picture = 'https://mp-a0b6177b-d49d-4c50-a9cf-fdec731bc83a.cdn.bspapp.com/cloudstorage/502f164c-1727-4181-954f-a1cd16da4dcd.png'
				}
				state.userinfo = res.data
			}
		})
	}
	
	function alterPassword() {
		uni.request({
			url: 'http://127.0.0.1:8091/Admin/User/alterUser',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: {
				userId: getApp().globalData.userid,
				password: state.password,
				picture: state.userinfo.picture
			},
			success(res) {
				console.log(res);
				if (res.data == 1) {
					uni.showToast({
						title: '修改成功',
					})
					getData()
				} else {
					uni.showToast({
						title: '修改失败',
						icon: 'error'
					})
				}
				state.alter = false
			}
			
		})
	}
	
	function addPic() {
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
							uni.request({
								url: 'http://127.0.0.1:8091/Admin/User/alterUser',
								method: 'POST',
								header: {
									"Content-Type": "application/x-www-form-urlencoded"
								},
								data: {
									userId: getApp().globalData.userid,
									password: state.userinfo.password,
									picture: res.fileID
								},
								success(res) {
									console.log(res);
									if (res.data == 1) {
										uni.showToast({
											title: '修改成功',
										})
										getData()
									} else {
										uni.showToast({
											title: '修改失败',
											icon: 'error'
										})
									}
									state.alter = false
								}
								
							})
							getData()
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
		
	}
	
	onShow(() => {
		getData()
	})
	
</script>

<style lang="scss">
	page {
		font-size: 14px;
		padding: 40rpx;
		box-sizing: border-box;
		background-image: url('https://mp-a0b6177b-d49d-4c50-a9cf-fdec731bc83a.cdn.bspapp.com/cloudstorage/2f29a7b2-7bd6-4ad7-a6cb-d83a1813abe6.png');
		background-size: cover;
		background-repeat: no-repeat;
	} 
	
	.avatar {
		text-align: center;
	}
	
	.user-avatar {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		background-color: #ccc;
	}
	
	.input {
		text-align: left;
		padding: 10px;
		border-bottom: 1px solid #e3e3e3;
		width: 60%;
		margin: 0 auto;
	}
	
	.username {
		text-align: center;
		padding: 30rpx;
		font-size: 18px;
		font-weight: 600;
	}
	
	.altername {
		text-align: center;
	}
	
	.alter {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 48rpx 30rpx 48rpx;
		background-color: #fff;
	}

	.grayline {
		width: 80%;
		margin: 0 auto;
		border-bottom: 1px solid #e6e6e6;
	}
</style>
