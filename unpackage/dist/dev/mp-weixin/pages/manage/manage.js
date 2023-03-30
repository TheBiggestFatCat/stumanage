"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      users: [
        {
          username: ""
        }
      ]
    };
  },
  methods: {
    getData() {
      const address = getApp().globalData.address;
      const that = this;
      common_vendor.index.request({
        url: address + "/Admin/User/selectAllUser",
        success(res) {
          that.users = res.data;
        }
      });
    },
    delUser(userId) {
      const address = getApp().globalData.address;
      const that = this;
      common_vendor.index.request({
        url: address + "/Admin/User/deleteUser/" + userId,
        success(res) {
          if (res.data == 1) {
            common_vendor.index.showToast({
              title: "删除成功"
            });
            that.getData();
          } else {
            common_vendor.index.showToast({
              title: "删除失败",
              icon: "error"
            });
          }
        }
      });
    }
  },
  computed: {
    // 筛选身份为教师的用户
    filteredUsers() {
      let filterData = [];
      for (let i of this.users) {
        if (i.role == 2) {
          filterData.push(i);
        }
      }
      return filterData;
    }
  },
  onShow() {
    this.getData();
  }
};
if (!Array) {
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  (_easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2)();
}
const _easycom_uni_th = () => "../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../uni_modules/uni-table/components/uni-table/uni-table.js";
if (!Math) {
  (_easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      align: "center"
    }),
    b: common_vendor.p({
      align: "center"
    }),
    c: common_vendor.p({
      align: "center"
    }),
    d: common_vendor.f($options.filteredUsers, (item, index, i0) => {
      return {
        a: common_vendor.t(item.userId),
        b: "fd8998fc-6-" + i0 + "," + ("fd8998fc-5-" + i0),
        c: common_vendor.t(item.userName),
        d: "fd8998fc-7-" + i0 + "," + ("fd8998fc-5-" + i0),
        e: common_vendor.o(($event) => $options.delUser(item.userId), index),
        f: "fd8998fc-8-" + i0 + "," + ("fd8998fc-5-" + i0),
        g: index,
        h: "fd8998fc-5-" + i0 + ",fd8998fc-0"
      };
    }),
    e: common_vendor.p({
      align: "center"
    }),
    f: common_vendor.p({
      align: "center"
    }),
    g: common_vendor.p({
      align: "center"
    }),
    h: common_vendor.p({
      border: true,
      stripe: true,
      emptyText: "暂无更多数据"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/WebProjects/stumanage/pages/manage/manage.vue"]]);
wx.createPage(MiniProgramPage);
