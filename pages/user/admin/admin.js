// pages/user/user.js
const db = wx.cloud.database().collection('t_admin-user')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userNameText: '管理员登录',
        background: '../../../static/bg.svg',
        userImg: '../../../static/users.svg',
        userName: '',
        pwd: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},
    submitUser() {
        if (!this.data.userName || !this.data.pwd) {
            wx.showToast({
                icon: "error",
                title: '输入有误！',
            })
            return
        }
        wx.showLoading({
            title: '登录中',
        })
        setTimeout(function () {
            wx.hideLoading()
            wx.showToast({
                icon: "error",
                title: '密码错误！',
            })
        }, 2000)

    }
})