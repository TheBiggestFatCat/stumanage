<template>
	<view>
		<view class="avatar">mine</view>
		<view class="username"></view>
	</view>
</template>

<script setup>
	import {
		onShow
	} from "@dcloudio/uni-app"
	import { reactive } from 'vue'
	
	function getData() {
		console.log(getApp().globalData);
		uni.request({
			url: 'http://127.0.0.1:8091/Admin/User/selectUserByName/' + getApp().globalData.username,
			success(res) {
				console.log(res);
			}
		})
	}
	
	onShow(() => {
		console.log('aaa');
		getData()
	})
	
</script>

<style lang="scss">
	page {
		padding: 40rpx;
		box-sizing: border-box;
	}

</style>
