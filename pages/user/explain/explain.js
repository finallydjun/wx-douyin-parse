// pages/user/explain/explain.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        itemList:[
            {
                title:'1.如何去水印？',
                content:'打开需要去水印的app，点击分享按钮选择”复制链接“。打开本程序会自动获取复制到的链接，点击粘贴，然后处理即可。'
            },
            {
                title:'2.为什么我解析了还有水印？',
                content:'请检查app中原作者上传的视频本身是否有水印，如果本身有水印暂时无法去除。'
            },
            {
                title:'3.为什么无法下载？',
                content:'如果文件大于10M，无法直接下载。可以复制链接通过其他方式下载。'
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

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