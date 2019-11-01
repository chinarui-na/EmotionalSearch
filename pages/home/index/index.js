const app = getApp()
var util = require('../../../utils/util.js')
Component({
	options: {
		addGlobalClass: true,
	},
	lifetimes: {
		attached() {
			this.searchEmo('斗图',false)
		},
		detached() {},
	},
	data: {
		imgs: [],
		hasMore: null,
		start: 0,
		falsepage: 1,
		falseFlag: false,
		CustomBar: app.globalData.CustomBar,
		searchUrl: "https://pic.sogou.com/pics/json.jsp?",
		tipArr: ['Giao哥', '可爱', '李现', '大佬', '王者荣耀', '么么哒'],
		search_info: '',
		pageNum:0,
		topNum:0,
		cangotop:false
	},
	methods: {
		gotoTop:function(e){
			this.setData({
			      topNum:0
			    });
		},
		// 获取滚动条当前位置
		  scrolltoupper:function(e){
		    console.log(e)
		    if (e.detail.scrollTop > 100) {
		      this.setData({
		        cangotop: true
		      });
		    } else {
		      this.setData({
		        cangotop: false
		      });
		    }
		  },
		loadMore(){
			var pageNum = this.data.pageNum
			pageNum += 1
			this.setData({pageNum:pageNum})
			this.searchEmo(this.data.search_info,true)
		},
		tipClick(e) {
			var tipArr = this.data.tipArr
			var choose = tipArr[e.currentTarget.dataset.index]
			this.searchEmo(choose,false)
			this.setData({
				search_info: choose
			})

		},
		inputConfirm(e) {
			this.setData({
				search_info: e.detail.value
			})
			this.searchEmo(e.detail.value,false)
		},
		imgView(e) {
			var imgs = this.data.imgs
			var urls = imgs[e.currentTarget.dataset.index].thumbUrl
			wx.previewImage({
				urls: [urls],
			});
		},
		searchEmo(info,needConcat) {
			var _info = encodeURI(info)
			let searchUrl = "https://interface.chinarui.cn/cashbook/conf/rest/emon/search/" + _info + "/" + this.data.pageNum
			// let searchUrl = "http://127.0.0.1:8128/conf/rest/emon/search/" + _info+ "/" + this.data.pageNum
			let imgReg = /['"]picUrl['"][:]['"]([^'"]+)['"]+/g;
			app.get(searchUrl).then(res => {
				var data = res.data
				var code = data.returnCode
				if (code === 1) {
					app.showTextToast('搜索内容包含敏感信息！')
				} else {
					if (data.data.length == 0) {
						app.showTextToast('搜索无结果 换个关键词试试吧！')
					}
					var imgs = this.data.imgs
					imgs = imgs.concat(data.data)
					if(needConcat){
						this.setData({
							imgs: imgs
						})
					}else{
						this.setData({
							imgs: data.data
						})
					}
					
				}
			}).catch(err => {})
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
