const app = getApp()
Component({
    options: {
        addGlobalClass: true,
        CustomBar: app.globalData.CustomBar,

    },
    data: {},
    methods: {
        trashSort() {
            wx.navigateToMiniProgram({
                appId: 'wxb1d395a44c5bb865', // 要跳转的小程序的appid
                path: 'pages/index/index', // 跳转的目标页面
                extarData: {
                    open: 'auth'
                },
                success(res) {
                    // 打开成功  
                }
            })
        },
        cashbook() {
            wx.navigateToMiniProgram({
                appId: 'wx46c041a9735acfd8', // 要跳转的小程序的appid
                path: 'pages/index/index', // 跳转的目标页面
                extarData: {
                    open: 'auth'
                },
                success(res) {
                    // 打开成功  
                }
            })
        },
        fontCreate() {
            wx.navigateToMiniProgram({
                appId: 'wx2f7b7ce056589d1b', // 要跳转的小程序的appid
                path: 'pages/fontImage/index', // 跳转的目标页面
                extarData: {
                    open: 'auth'
                },
                success(res) {
                    // 打开成功  
                }
            })
        },
        showQrcode() {
            wx.previewImage({
                urls: ['http://img.chinarui.cn/pay4me.jpg'],
                current: 'http://img.chinarui.cn/pay4me.jpg' // 当前显示图片的http链接      
            })
        }
    }
})