"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      username: "",
      password: "",
      radio1: 1,
      sex: [{
        text: "教师",
        value: 2
      }, {
        text: "管理员",
        value: 1
      }]
    };
  },
  methods: {
    // 跳转至注册
    register() {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    },
    login() {
      const address = getApp().globalData.address;
      const that = this;
      common_vendor.index.request({
        url: address + "/Admin/User/userLogin",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          userName: this.$data.username,
          password: this.$data.password,
          role: this.$data.radio1
        },
        success(res) {
          if (res.data == 1) {
            if (that.radio1 == 2) {
              common_vendor.index.switchTab({
                url: "/pages/info/info"
              });
            } else {
              common_vendor.index.redirectTo({
                url: "/pages/manage/manage"
              });
            }
          } else {
            common_vendor.index.showToast({
              title: "登录失败",
              icon: "error"
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  (_easycom_uni_easyinput2 + _easycom_uni_data_checkbox2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_data_checkbox)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.username = $event),
    b: common_vendor.p({
      placeholder: "",
      modelValue: $data.username
    }),
    c: common_vendor.o(($event) => $data.password = $event),
    d: common_vendor.p({
      type: "password",
      placeholder: "",
      modelValue: $data.password
    }),
    e: common_vendor.o(($event) => $data.radio1 = $event),
    f: common_vendor.p({
      localdata: $data.sex,
      modelValue: $data.radio1
    }),
    g: common_vendor.o((...args) => $options.login && $options.login(...args)),
    h: common_vendor.o((...args) => $options.register && $options.register(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/WebProjects/stumanage/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
