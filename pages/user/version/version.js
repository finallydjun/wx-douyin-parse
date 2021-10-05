// pages/user/version/version.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        updataList:[
            {
                dateTime:'2021-10-05',
                version:'1.0.3',
                contentList:[
                    '添加自动更新功能',
                    '集成云开发添加建议反馈功能'
                ]
            },
            {
                dateTime:'2021-10-04',
                version:'1.0.2',
                contentList:[
                    '添加一键分享功能',
                    '添加版本时间线查看页面',
                    '修改正则表达式截取错误的问题',
                    '优化提示信息，增强用户体验',
                    '优化代码逻辑，检测剪切板是否包含链接',
                ]
            },
            {
                dateTime:'2021-10-01',
                version:'1.0.1',
                contentList:[
                    '集成Ten▪Api数据',
                    '初次提交代码并上线'
                ]
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