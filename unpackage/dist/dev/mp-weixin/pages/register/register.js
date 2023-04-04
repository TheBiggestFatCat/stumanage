"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      username: "",
      password: "",
      radio1: 2,
      sex: [
        {
          text: "教师",
          value: 2
        }
        // {
        // 	text: '管理员',
        // 	value: 1
        // },
      ],
      avatar: ""
    };
  },
  methods: {
    register() {
      const address = getApp().globalData.address;
      common_vendor.index.request({
        url: address + "/Admin/User/addUser",
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
            common_vendor.index.showToast({
              title: "注册成功"
            });
            setTimeout(() => {
              common_vendor.index.redirectTo({
                url: "/pages/index/index"
              });
            }, 1e3);
          } else {
            common_vendor.index.showToast({
              title: "注册失败",
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
    g: common_vendor.o((...args) => $options.register && $options.register(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/WebProjects/stumanage/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
