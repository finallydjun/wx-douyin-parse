// pages/user/feedback/feedback.js
const db = wx.cloud.database().collection('t_feedback')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        requestID: '',
        // appid: '',
        // openid: '',
        unionid: '',
        feedText: '',
        contactText: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(db)
        let that = this
        wx.cloud.callFunction({
            // 云函数名称
            name: 'getUserinfo',
            // 传给云函数的参数
            success: function (res) {
                console.log(res)
                that.setData({
                    requestID: res.requestID,
                    // appid: res.result.appid,
                    // openid: res.result.openid,
                    unionid: res.result.unionid
                })
            },
            fail: console.error
        })

    },

    getUserInfo() {
        console.log(this.data)
        let that = this;
        if (this.data.feedText === '') {
            wx.showToast({
                icon: 'error',
                title: '建议不能为空',
            })
            return
        }
        db.add({
            data: {
                requestID: this.data.requestID,
                // appid: this.data.appid,
                // openid: this.data.openid,
                unionid: this.data.unionid,
                feedText: this.data.feedText,
                contactText: this.data.contactText,
            },
            success(res) {
                console.log(res)
                wx.showLoading({
                    title: '正在提交表单',
                })
                setTimeout(function () {
                    wx.hideLoading()
                    wx.showToast({
                        icon: 'success',
                        title: '提交成功！',
                    })
                }, 2000)
                that.setData({
                    feedText: '',
                    contactText: ''
                })
            },
            fail(e) {
                wx.showToast({
                    icon: 'error',
                    title: '提交失败！',
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log('onshow')
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log('onHide')
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