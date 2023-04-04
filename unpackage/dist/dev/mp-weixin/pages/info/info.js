"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      students: [],
      items: [],
      filterData: [],
      filterText: "",
      grade: [],
      stuId: 0,
      showPicture: [],
      bigpic: ""
    };
  },
  computed: {
    // 根据搜索信息展示
    filteredItems() {
      let filterData = [];
      for (let i of this.items) {
        let arr = Object.values(i);
        for (let j in arr) {
          if (filterData[filterData.length - 1] == i) {
            break;
          }
          if (j != 0) {
            if (arr[j] == null) {
              arr[j] = "";
            }
            if (arr[j].toString().indexOf(this.filterText) !== -1) {
              filterData.push(i);
            }
          }
        }
      }
      return filterData;
    }
  },
  onShow() {
    this.getData();
  },
  methods: {
    // 查看大图
    showbigpic(url) {
      this.bigpic = url;
      this.$refs.popup3.open();
    },
    // 打开弹窗
    openGrade(stuId) {
      const address = getApp().globalData.address;
      const that = this;
      this.stuId = stuId;
      this.$refs.popup.open();
      common_vendor.index.request({
        url: address + "/Admin/Result/selectResultByStuId/",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          stuId
        },
        success(res) {
          that.grade = res.data;
        }
      });
    },
    openPicture(picture) {
      getApp().globalData.address;
      this.$refs.popup2.open();
      if (picture !== null) {
        this.showPicture = picture.split(",");
      } else {
        this.showPicture = "";
      }
    },
    // 初始获取数据
    getData() {
      const address = getApp().globalData.address;
      const that = this;
      common_vendor.index.request({
        url: address + "/Admin/Students/selectAllStudents",
        success(res) {
          for (let i of res.data) {
            if (i.photo == null) {
              i.photo = "";
            }
          }
          that.$data.items = res.data;
        }
      });
    },
    // 添加成绩
    addGrade() {
      const address = getApp().globalData.address;
      const that = this;
      common_vendor.index.request({
        url: address + "/Admin/Result/addResult",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          stuId: that.stuId,
          lessonName: "课程名",
          result: 0,
          point: 0
        },
        success(res) {
          if (res.data == 1) {
            common_vendor.index.request({
              url: address + "/Admin/Result/selectResultByStuId/",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              data: {
                stuId: that.stuId
              },
              success(res2) {
                that.grade = res2.data;
              }
            });
          }
        }
      });
    },
    alterGrade(resultId, index) {
      const address = getApp().globalData.address;
      const that = this;
      common_vendor.index.request({
        url: address + "/Admin/Result/alterResult",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          stuId: that.stuId,
          lessonName: that.grade[index].lessonName,
          result: that.grade[index].result,
          point: that.grade[index].point,
          resultId
        }
      });
    },
    delGrade(resultId) {
      const address = getApp().globalData.address;
      const that = this;
      common_vendor.index.request({
        url: address + "/Admin/Result/deleteResult/" + resultId,
        success(res) {
          if (res.data == 1) {
            common_vendor.index.request({
              url: address + "/Admin/Result/selectResultByStuId/",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              data: {
                stuId: that.stuId
              },
              success(res2) {
                that.grade = res2.data;
              }
            });
          } else {
            common_vendor.index.showToast({
              title: "删除失败",
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
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_easyinput2 + _easycom_uni_collapse_item2 + _easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2 + _easycom_uni_popup2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_th = () => "../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../uni_modules/uni-table/components/uni-table/uni-table.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_collapse_item + _easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.filterText = $event),
    b: common_vendor.p({
      placeholder: "搜索",
      modelValue: $data.filterText
    }),
    c: common_vendor.f($options.filteredItems, (item, index, i0) => {
      return {
        a: common_vendor.t(item.stuName),
        b: common_vendor.t(item.studentId),
        c: common_vendor.t(item.className),
        d: common_vendor.t(item.college),
        e: item.photo.split(",")[0],
        f: common_vendor.t(item.school),
        g: common_vendor.t(item.assistant),
        h: common_vendor.t(item.award),
        i: common_vendor.t(item.scholarship),
        j: common_vendor.t(item.poor == 1 ? "是" : "否"),
        k: common_vendor.o(($event) => $options.openGrade(item.stuId), index),
        l: common_vendor.o(($event) => $options.openPicture(item.photo), index),
        m: "8d5dfdbc-1-" + i0,
        n: index
      };
    }),
    d: common_vendor.p({
      title: "更多"
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
      align: "center"
    }),
    i: common_vendor.f($data.grade, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.alterGrade(item.resultId, index), index),
        b: "8d5dfdbc-11-" + i0 + "," + ("8d5dfdbc-10-" + i0),
        c: common_vendor.o(($event) => item.lessonName = $event, index),
        d: common_vendor.p({
          modelValue: item.lessonName
        }),
        e: "8d5dfdbc-10-" + i0 + "," + ("8d5dfdbc-9-" + i0),
        f: common_vendor.o(($event) => $options.alterGrade(item.resultId, index), index),
        g: "8d5dfdbc-13-" + i0 + "," + ("8d5dfdbc-12-" + i0),
        h: common_vendor.o(($event) => item.result = $event, index),
        i: common_vendor.p({
          type: "number",
          modelValue: item.result
        }),
        j: "8d5dfdbc-12-" + i0 + "," + ("8d5dfdbc-9-" + i0),
        k: common_vendor.o(($event) => $options.alterGrade(item.resultId, index), index),
        l: "8d5dfdbc-15-" + i0 + "," + ("8d5dfdbc-14-" + i0),
        m: common_vendor.o(($event) => item.point = $event, index),
        n: common_vendor.p({
          type: "number",
          modelValue: item.point
        }),
        o: "8d5dfdbc-14-" + i0 + "," + ("8d5dfdbc-9-" + i0),
        p: common_vendor.o(($event) => $options.delGrade(item.resultId), index),
        q: "8d5dfdbc-16-" + i0 + "," + ("8d5dfdbc-9-" + i0),
        r: index,
        s: "8d5dfdbc-9-" + i0 + ",8d5dfdbc-3"
      };
    }),
    j: common_vendor.p({
      align: "center"
    }),
    k: common_vendor.p({
      align: "center"
    }),
    l: common_vendor.p({
      align: "center"
    }),
    m: common_vendor.p({
      align: "center"
    }),
    n: common_vendor.p({
      border: true,
      stripe: true,
      emptyText: "暂无成绩"
    }),
    o: common_vendor.o((...args) => $options.addGrade && $options.addGrade(...args)),
    p: common_vendor.sr("popup", "8d5dfdbc-2"),
    q: common_vendor.p({
      type: "center"
    }),
    r: common_vendor.f($data.showPicture, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.showbigpic(item), index),
        b: index,
        c: item
      };
    }),
    s: common_vendor.sr("popup2", "8d5dfdbc-17"),
    t: common_vendor.p({
      type: "center"
    }),
    v: $data.bigpic,
    w: common_vendor.sr("popup3", "8d5dfdbc-18"),
    x: common_vendor.p({
      type: "center"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/WebProjects/stumanage/pages/info/info.vue"]]);
wx.createPage(MiniProgramPage);
