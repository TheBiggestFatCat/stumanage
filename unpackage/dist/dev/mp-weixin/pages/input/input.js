"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      poor: [{
        text: "不是",
        value: 0
      }, {
        text: "是",
        value: 1
      }],
      formData: {
        studentId: "",
        stuName: "",
        school: "",
        college: "",
        className: "",
        assistant: "",
        award: "",
        scholarship: "",
        poor: ""
      },
      rules: {
        studentId: {
          rules: [{
            required: true,
            errorMessage: "学号为必填项"
          }]
        },
        stuName: {
          rules: [{
            required: true,
            errorMessage: "姓名为必填项"
          }]
        },
        school: {
          rules: [{
            required: true,
            errorMessage: "学校为必填项"
          }]
        },
        college: {
          rules: [{
            required: true,
            errorMessage: "学院为必填项"
          }]
        },
        className: {
          rules: [{
            required: true,
            errorMessage: "班级为必填项"
          }]
        },
        assistant: {
          rules: [{
            required: true,
            errorMessage: "辅导员为必填项"
          }]
        },
        poor: {
          rules: [{
            required: true,
            errorMessage: "是否贫困生为必填项"
          }]
        }
      }
    };
  },
  onLoad() {
  },
  onReady() {
  },
  methods: {
    submit() {
      const address = getApp().globalData.address;
      const that = this;
      this.$refs.form.validate().then((res) => {
        common_vendor.index.request({
          url: address + "/Admin/Students/addStudents",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: res,
          success(res2) {
            if (res2.statusCode == 200) {
              common_vendor.index.showToast({
                title: "提交成功"
              });
            } else {
              common_vendor.index.showToast({
                title: "提交失败",
                icon: "error"
              });
            }
            that.$data.formData = {};
          },
          fail() {
            common_vendor.index.showToast({
              title: "提交失败",
              icon: "error"
            });
          }
        });
      }).catch((err) => {
        console.log("表单错误信息：", err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_section2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_section + _easycom_uni_data_checkbox + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData.studentId = $event),
    b: common_vendor.p({
      name: "studentId",
      placeholder: "请输入内容",
      modelValue: $data.formData.studentId
    }),
    c: common_vendor.p({
      name: "studentId"
    }),
    d: common_vendor.p({
      title: "学号",
      type: "line",
      padding: true
    }),
    e: common_vendor.o(($event) => $data.formData.stuName = $event),
    f: common_vendor.p({
      name: "stuName",
      placeholder: "请输入内容",
      modelValue: $data.formData.stuName
    }),
    g: common_vendor.p({
      name: "stuName"
    }),
    h: common_vendor.p({
      title: "学生姓名",
      type: "line",
      padding: true
    }),
    i: common_vendor.o(($event) => $data.formData.school = $event),
    j: common_vendor.p({
      name: "school",
      placeholder: "请输入内容",
      modelValue: $data.formData.school
    }),
    k: common_vendor.p({
      name: "school"
    }),
    l: common_vendor.p({
      title: "学校",
      type: "line",
      padding: true
    }),
    m: common_vendor.o(($event) => $data.formData.college = $event),
    n: common_vendor.p({
      name: "college",
      placeholder: "请输入内容",
      modelValue: $data.formData.college
    }),
    o: common_vendor.p({
      name: "college"
    }),
    p: common_vendor.p({
      title: "学院",
      type: "line",
      padding: true
    }),
    q: common_vendor.o(($event) => $data.formData.className = $event),
    r: common_vendor.p({
      name: "className",
      placeholder: "请输入内容",
      modelValue: $data.formData.className
    }),
    s: common_vendor.p({
      name: "className"
    }),
    t: common_vendor.p({
      title: "班级",
      type: "line",
      padding: true
    }),
    v: common_vendor.o(($event) => $data.formData.assistant = $event),
    w: common_vendor.p({
      name: "assistant",
      placeholder: "请输入内容",
      modelValue: $data.formData.assistant
    }),
    x: common_vendor.p({
      name: "assistant"
    }),
    y: common_vendor.p({
      title: "辅导员",
      type: "line",
      padding: true
    }),
    z: common_vendor.o(($event) => $data.formData.award = $event),
    A: common_vendor.p({
      name: "award",
      placeholder: "请输入内容",
      modelValue: $data.formData.award
    }),
    B: common_vendor.p({
      name: "award"
    }),
    C: common_vendor.p({
      title: "获奖记录",
      type: "line",
      padding: true
    }),
    D: common_vendor.o(($event) => $data.formData.scholarship = $event),
    E: common_vendor.p({
      name: "scholarship",
      type: "textarea",
      placeholder: "请输入内容",
      modelValue: $data.formData.scholarship
    }),
    F: common_vendor.p({
      name: "scholarship"
    }),
    G: common_vendor.p({
      title: "曾获奖学金",
      type: "line",
      padding: true
    }),
    H: common_vendor.o(($event) => $data.formData.poor = $event),
    I: common_vendor.p({
      localdata: $data.poor,
      modelValue: $data.formData.poor
    }),
    J: common_vendor.p({
      name: "poor"
    }),
    K: common_vendor.p({
      title: "是否贫困生",
      type: "line",
      padding: true
    }),
    L: common_vendor.sr("form", "0e395990-0"),
    M: common_vendor.p({
      modelValue: $data.formData,
      rules: $data.rules
    }),
    N: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/WebProjects/stumanage/pages/input/input.vue"]]);
wx.createPage(MiniProgramPage);
