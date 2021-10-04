// pages/myPage/myPage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        qq:'3170495286',
        status: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getQQStatus()
    },
    getQQStatus(e) {
        let that = this;
        wx.request({
            url: 'https://tenapi.cn/qqzx/?qq=' + this.data.qq,
            success(res) {
                console.log(res.data.msg)
                that.setData({
                    status: res.data.msg
                })
            }
        })
    },
})