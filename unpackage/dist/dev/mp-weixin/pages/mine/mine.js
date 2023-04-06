"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const state = common_vendor.reactive({
      userinfo: {
        picture: "https://mp-a0b6177b-d49d-4c50-a9cf-fdec731bc83a.cdn.bspapp.com/cloudstorage/60f46d0d-2016-48f1-b34d-dea391ac2e22.png"
      },
      alter: false,
      password: ""
    });
    function getData() {
      common_vendor.index.request({
        url: "http://127.0.0.1:8091/Admin/User/selectUserByName/" + getApp().globalData.username,
        success(res) {
          console.log(res);
          if (res.data.picture == null) {
            res.data.picture = "https://mp-a0b6177b-d49d-4c50-a9cf-fdec731bc83a.cdn.bspapp.com/cloudstorage/502f164c-1727-4181-954f-a1cd16da4dcd.png";
          }
          state.userinfo = res.data;
        }
      });
    }
    function alterPassword() {
      common_vendor.index.request({
        url: "http://127.0.0.1:8091/Admin/User/alterUser",
        method: "POST",
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
            common_vendor.index.showToast({
              title: "修改成功"
            });
            getData();
          } else {
            common_vendor.index.showToast({
              title: "修改失败",
              icon: "error"
            });
          }
          state.alter = false;
        }
      });
    }
    function addPic() {
      common_vendor.index.chooseImage({
        count: 1,
        success(res) {
          if (res.tempFilePaths.length > 0) {
            let filePath = res.tempFilePaths[0];
            common_vendor.index.showLoading({
              title: "上传中..",
              mask: true
            });
            common_vendor.Es.uploadFile({
              filePath,
              cloudPath: "a.png",
              onUploadProgress: function(progressEvent) {
                console.log(progressEvent);
                Math.round(
                  progressEvent.loaded * 100 / progressEvent.total
                );
              },
              success(res2) {
                common_vendor.index.request({
                  url: "http://127.0.0.1:8091/Admin/User/alterUser",
                  method: "POST",
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    userId: getApp().globalData.userid,
                    password: state.userinfo.password,
                    picture: res2.fileID
                  },
                  success(res3) {
                    console.log(res3);
                    if (res3.data == 1) {
                      common_vendor.index.showToast({
                        title: "修改成功"
                      });
                      getData();
                    } else {
                      common_vendor.index.showToast({
                        title: "修改失败",
                        icon: "error"
                      });
                    }
                    state.alter = false;
                  }
                });
                getData();
              },
              fail(err) {
                console.log(err);
                common_vendor.index.showToast({
                  title: "上传失败",
                  icon: "error"
                });
                common_vendor.index.hideLoading();
              },
              complete() {
                common_vendor.index.hideLoading();
              }
            });
          }
        }
      });
    }
    common_vendor.onShow(() => {
      getData();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: state.userinfo.picture,
        b: common_vendor.t(state.userinfo.userName),
        c: common_vendor.p({
          type: "plusempty",
          size: "16"
        }),
        d: common_vendor.p({
          type: "right",
          size: "16"
        }),
        e: common_vendor.o(addPic),
        f: state.alter == false
      }, state.alter == false ? {
        g: common_vendor.p({
          type: "compose",
          size: "16"
        }),
        h: common_vendor.p({
          type: "right",
          size: "16"
        }),
        i: common_vendor.o(($event) => state.alter = true)
      } : {}, {
        j: state.alter == true
      }, state.alter == true ? {
        k: state.password,
        l: common_vendor.o(($event) => state.password = $event.detail.value),
        m: common_vendor.o(alterPassword)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WebProjects/stumanage/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
