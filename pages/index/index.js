// pages/index/index.js
var store = require('../../utils/store.js');

Page({
    data: {
        currentTab: "home"
    },
    navChange(e) {
        this.setData({
            currentTab: e.currentTarget.dataset.cur
        })
    },
    onChange(e) {
        console.log(`验证码：${e.detail.value}`)
    },
    onLoad: function(options) {},
    onShareAppMessage: function(res) {
        return {
            title: '一天不斗图，我就浑身难受!',
            path: '/pages/index/index',
            imageUrl: 'http://img.chinarui.cn/emoji_share.jpeg', //用户分享出去的自定义图片大小为5:4,
            success: function(res) {
                console.log(res)
            },
            fail: function(res) {
                console.log(res)
            },
        }
    },
})