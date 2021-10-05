// pages/index/index.js
Page({
    onLoad() {
        this.getOneText();
    },
    onShow() {
        this.getIsCopy()
    },
    onHide() {
        console.log('hide')
    },
    /**
     * 页面的初始数据
     */
    data: {
        isparsing:false,//是否解析成功
        background: ['https://tenapi.cn/acg', 'https://tenapi.cn/acg', 'https://tenapi.cn/acg'],
        indicatorDots: true,
        vertical: false,
        autoplay: false,
        interval: 2000,
        duration: 500,
        inputUrl: '',
        videoUrl: '',
        oneText: '',
        tipsList: [{
                name: '本站公告:',
                content: '如果解析不出来可能就是接口G了!'
            },
            {
                name: '目前支持:',
                content: '抖音/皮皮虾/火山/微视/微博/绿洲/最右/轻视频/instagram/哔哩哔哩/快手/全民小视频/皮皮搞笑/全民k歌/巴塞电影/陌陌/Before避风/开眼/Vue Vlog/小咖秀/西瓜视频/逗拍/虎牙/6间房/新片场/Acfun/美拍'
            },
            {
                name: '温馨提示:',
                content: '粘贴视频地址时无需删除文案 但如果视频链接正确但解析失败请删掉文案后重试!'
            },
        ]
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
    // 获取一言数据
    getOneText() {
        // 一言
        let that = this;
        wx.request({
            url: 'https://tenapi.cn/yiyan/?format=text', //仅为示例，并非真实的接口地址
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    oneText: res.data
                })
            }
        })
    },
    // 解析短链接
    parsing(e) {
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
                url: 'https://tenapi.cn/video/?url=' + urls[0], //仅为示例，并非真实的接口地址
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
                        let videoAddress = res.data.url.replace("http:", "https:")
                        that.setData({
                            videoUrl: videoAddress
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
    // 下载视频
    downLoadVideo(e) {
        if (this.data.videoUrl == '') {
            wx.showToast({
                icon: "error",
                title: '当前还未解析！',
            })
            return
        }
        wx.showLoading({
            title: '下载中。。。'
        })
        wx.downloadFile({
            url: this.data.videoUrl, //仅为示例，并非真实的资源
            success(res) {
                wx.saveVideoToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success(res) {
                        console.log(res)
                        wx.showToast({
                            icon: "success",
                            title: '下载成功!',
                        })
                    },
                    fail(e) {
                        console.log(e)
                        wx.showToast({
                            icon: "error",
                            title: '下载失败!',
                        })
                    }
                })
            },
            fail(res) {
                console.log(res)
            }
        })
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
    //复制地址栏无水印链接
    copyVideoUrl(e) {
        if (this.data.videoUrl == '') {
            wx.showToast({
                icon: "error",
                title: '当前还未解析！',
            })
            return
        }
        let that = this;
        wx.setClipboardData({
            data: that.data.videoUrl,
            success(res) {
                console.log(res)
                wx.showToast({
                    icon: "success",
                    title: '复制成功！',
                })
            },
            fail(e) {
                console.log(e)
            }
        })
    },
    // 轮播图部分-----------------------------
    changeIndicatorDots() {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    onShareAppMessage() {
        return {
            title: 'Finally去水印',
            path: "pages/index/index",
        }
    },
    changeAutoplay() {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange(e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange(e) {
        this.setData({
            duration: e.detail.value
        })
    }
})