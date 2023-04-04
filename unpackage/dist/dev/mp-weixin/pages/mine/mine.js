"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    function getData() {
      console.log(getApp().globalData);
      common_vendor.index.request({
        url: "http://127.0.0.1:8091/Admin/User/selectUserByName/" + getApp().globalData.username,
        success(res) {
          console.log(res);
        }
      });
    }
    common_vendor.onShow(() => {
      console.log("aaa");
      getData();
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WebProjects/stumanage/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
