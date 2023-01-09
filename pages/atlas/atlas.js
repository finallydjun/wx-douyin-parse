// pages/atlas/atlas.js
Page({
    onLoad() {
        this.getUserItems()
    },
    onShow() {
        // this.getIsCopy()
    },
    onHide() {
        console.log('hide')
    },
    /**
     * 页面的初始数据
     */
    data: {
        inputVal: undefined,
        isparsing: false,
        list_show: false,
        imgList: [],
        serachList: [],
    },
    getIsCopy() {
        let that = this;
        wx.getClipboardData({
            success: (option) => {
                console.log(option)
                // const isUrl = /http[s]?:\/\/[\w.]+[\w/]*[\w.]*\??[\w=&:\-+#/%]*[/]*/.exec(option.data)
                const isUrl = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g.exec(option.data)
                // http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))
                console.log(isUrl)
                if (isUrl) {
                    wx.showModal({
                        title: '检测到剪切板有复制链接！',
                        content: '是否解析当前链接：' + isUrl[0],
                        success(res) {
                            if (res.confirm) {
                                that.setData({
                                    inputUrl: isUrl[0]
                                })
                                that.parsing()
                                // wx.setClipboardData({
                                //     data: ' ',
                                //     success(res) {
                                //         wx.hideLoading()
                                //         console.log(res)
                                //     },
                                //     fail(e) {
                                //         console.log(e)
                                //     }
                                // })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                                wx.setClipboardData({
                                    data: ' ',
                                    success(res) {
                                        wx.hideLoading()
                                        console.log(res)
                                    },
                                    fail(e) {
                                        console.log(e)
                                    }
                                })
                            }
                        }
                    })
                }
            },
        })
    },
    onSerach() {
        if (!!this.inputVal) {
            // TODO 搜索逻辑
        } else {
            // 随机筛选逻辑
            this.getUserItems()
        }
    },
    // 页面跳转
    navigateTo(e) {
        wx.navigateTo({
            url: '/pages/atlas/userPic/userPic'
        })
    },
    getUserItems() {
        this.postAction('/producer/listByRand', {
            "pageNum": (Math.random() * 422).toFixed(0),
            "pageSize": 10,
            "channel": "DY",
            "process": "image/resize,400",
        }).then(res => {
            console.log(res)
            try {
                this.setData({
                    imgList: res.data.result,
                })
            } catch {
                this.getUserItems()
            }
        })
    },
    postAction(url, params) {
        let baseUrl = 'https://api.ms4ms.cn'
        return new Promise((resolve, reject) => {
            wx.request({
                url: baseUrl + url,
                method: "POST",
                header: {
                    'content-type': 'application/json', // 默认值
                    'Host': 'api.ms4ms.cn',
                    'sign': '3c9b4d59590ddc71bad925c65540d9f214810d71',
                    'noncestr': '3181ddbaf4f948eac26a7859bb358bb2'
                },
                data: params,
                success(res) {
                    resolve(res.data)
                },
                fail(err) {
                    reject(err)
                }
            })
        })
    },

    parsing() {
        if (this.data.inputUrl == '') {
            wx.showToast({
                icon: "error",
                title: '空的打你屁屁',
            })
            return
        }
        wx.showLoading({
            title: '正在解析！'
        })
        // wx.showToast({
        //     icon: "loading",
        //     title: '正在解析！'
        // })
        let that = this;
        try {
            const urls = /http[s]?:\/\/[\w.]+[\w/]*[\w.]*\??[\w=&:\-+#/%]*[/]*/.exec(this.data.inputUrl)
            wx.request({
                url: 'https://tenapi.cn/images/?url=' + urls[0], //仅为示例，并非真实的接口地址
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success(res) {
                    if (res.data.code === 200) {
                        console.log(res.data)
                        wx.showToast({
                            icon: "success",
                            title: '解析成功！',
                        })
                        that.setData({
                            imgList: res.data.images,
                            isparsing: true,
                        })
                    } else {
                        if (res.data.msg === '解析失败') {
                            wx.showModal({
                                title: '解析失败',
                                content: '视频不存在或接口失效！',
                            })
                        } else {
                            wx.showModal({
                                title: '解析失败',
                                content: res.data.msg,
                            })
                        }
                        wx.hideLoading()
                    }
                },
                fail(e) {
                    wx.showToast({
                        icon: "error",
                        title: '解析失败！',
                    })

                }
            })
        } catch (e) {
            wx.showToast({
                icon: "error",
                title: "检测到输入有误！",
            })
        }
    },
    // 清空输入框
    clearInput(e) {
        if (this.data.inputUrl == '') {
            wx.showToast({
                icon: "error",
                title: "已经是空的了！",
            })
            return
        }
        this.setData({
            inputUrl: ''
        })
        wx.showToast({
            icon: "success",
            title: "欧得KK",
        })
    },
    getIsCopy() {
        let that = this;
        wx.getClipboardData({
            success: (option) => {
                console.log(option)
                // const isUrl = /http[s]?:\/\/[\w.]+[\w/]*[\w.]*\??[\w=&:\-+#/%]*[/]*/.exec(option.data)
                const isUrl = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g.exec(option.data)
                // http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))
                console.log(isUrl)
                if (isUrl) {
                    wx.showModal({
                        title: '检测到剪切板有复制链接！',
                        content: '是否解析当前链接：' + isUrl[0],
                        success(res) {
                            if (res.confirm) {
                                that.setData({
                                    inputUrl: isUrl[0]
                                })
                                that.parsing()
                                // wx.setClipboardData({
                                //     data: ' ',
                                //     success(res) {
                                //         wx.hideLoading()
                                //         console.log(res)
                                //     },
                                //     fail(e) {
                                //         console.log(e)
                                //     }
                                // })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                                wx.setClipboardData({
                                    data: ' ',
                                    success(res) {
                                        wx.hideLoading()
                                        console.log(res)
                                    },
                                    fail(e) {
                                        console.log(e)
                                    }
                                })
                            }
                        }
                    })
                }
            },
        })
    },
    previewImage: function (e) {
        let that = this
        console.log(e.target.dataset)
        var current = e.target.dataset.src;
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: e.target.dataset.demo
        })
    },
    downLoadImgList: function () {
        wx.showLoading({
            title: '下载中。。。'
        })
        this.downloadFile(this.data.imgList).then(res => {
            this.setData({
                list_show: false,
            })
            wx.showToast({
                title: '下载完成'
            })
        }).catch((err) => {
            console.log(err)
        })
    },
    downloadFile(urls) {
        this.setData({
            list_show: true,
        })
        let promise = Promise.resolve()
        urls.forEach((url, index) => {
            promise = promise.then(() => {
                var ever = (10 / urls.length) * 10
                this.setData({
                    currentindex: index + 1,
                    percents: (index + 1) * ever
                })
                return this.downloads(url)
            })
        })
        return promise
    },
    downloads: function (url) {
        let that = this
        return new Promise((resolve, reject) => {
            console.log(url)
            wx.downloadFile({
                url: url,
                success: function (res) {
                    var temp = res.tempFilePath
                    wx.saveImageToPhotosAlbum({
                        filePath: temp,
                        success: function (res) {
                            resolve(res)
                        },
                        fail: function (err) {
                            that.setData({
                                list_show: false,
                            })
                        }
                    })
                },
                fail: function (err) {
                    console.log(err, "err2222")
                    reject(err)
                }
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },


    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})