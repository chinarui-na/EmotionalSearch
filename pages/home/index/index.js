const app = getApp()
var util = require('../../../utils/util.js')
Component({
    options: {
        addGlobalClass: true,
    },
    lifetimes: {
        attached() {
            this.searchEmo('斗图')
        },
        detached() {},
    },
    data: {
        imgs: null,
        hasMore: null,
        start: 0,
        falsepage: 1,
        falseFlag: false,
        CustomBar: app.globalData.CustomBar,
        searchUrl: "https://pic.sogou.com/pics/json.jsp?",
        tipArr:['阿Giao','可爱','李现','大佬','王者荣耀','么么哒'],
        search_info:''
    },
    methods: {
        tipClick(e){
            var tipArr = this.data.tipArr
            var choose = tipArr[e.currentTarget.dataset.index]
            this.searchEmo(choose)
            this.setData({search_info:choose})

        },
        inputConfirm(e) {
            this.searchEmo(e.detail.value)
        },
        imgView(e) {
            var imgs = this.data.imgs
            var urls = imgs[e.currentTarget.dataset.index].thumbUrl
            console.log(urls)
            // app.post("http://172.16.3.113:8128/conf/rest/emon/isOk/",urls).then(res=>{
            //     console.log(res.data)
            //     if(res.data.returnCode === 1 )
            //         urls = 'http://img.chinarui.cn/22226362af11a5b0204ad3cd6ae59b34.jpg'
            // })
            wx.previewImage({
                urls: [urls],
            });
        },
        searchEmo(info) {
            var _info = encodeURI(info+'表情')
            // let searchUrl = "https://pic.sogou.com/pics/json.jsp?query="+_info+"&st=5&start=0&xml_len=60&callback=data&reqFrom=wap_result&"
            let searchUrl = "https://interface.chinarui.cn/cashbook/conf/rest/emon/search/" + _info
            // let searchUrl = "http://172.16.3.113:8128/conf/rest/emon/search/" + _info
            // let searchUrl = 'https://pic.sogou.com/pics?query='+ _info +'&mode=1&start=100&reqType=ajax&reqFrom=result&tn=0'
            let imgReg = /['"]picUrl['"][:]['"]([^'"]+)['"]+/g;
            console.log(searchUrl)
            app.get(searchUrl).then(res => {
                console.log(res)
                var data = res.data
                // let imgData = data.match(imgReg);
                // imgData = imgData.map(function(item) {
                //     if (item.indexOf("https") == "-1") {
                //         item = "https" + item.slice(14, -1);
                //     } else {
                //         item = item.slice(10, -1);
                //     }
                //     return item;
                // })
                // console.log(imgData)
                // for(var key in imgData){
                //     app.get(imgData[key]).then(res=>{
                //         if(res.statusCode !== 200){
                //             console.log(res.statusCode)
                //             console.log(imgData[key])
                //             imgData[key] = 'http://img.chinarui.cn/trash_share_display.jpg'
                //         }
                //     }).catch(err=>{
                //         console.log(err)
                //     })
                // }
                this.setData({ imgs: data})
            }).catch(err => {
            })
        },
        search() {
            wx.navigateTo({
                url: '/pages/home/search/search'
            })
        }
    }
})
function getURL(url) {
        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.Status != 200)
                alert("不存在");
            return xmlhttp.Status == 200;
        }
        return false;
    }
