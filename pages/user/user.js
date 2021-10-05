// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userName: 'Finally',
        background: '../../static/bg.svg',
        userImg: '../../static/user.jpg',
        rightIcon: '../../static/chevron-right.svg',
        status: '', //当前qq在线状态
        itemList: [{
                iconPath: '../../static/key.svg',
                name: '使用说明',
                type: 'explain',
                tag: 1
            },
            {
                iconPath: '../../static/message-square.svg',
                name: '建议反馈',
                type: 'feedback',
                tag: 3
            },


            {
                iconPath: '../../static/send.svg',
                name: '版本说明',
                type: 'version',
                tag: 1
            },
            {
                iconPath: '../../static/users.svg',
                name: '联系客服',
                type: 'admin',
                tag: 4
            },
            {
                iconPath: '../../static/award.svg',
                name: '关于我们',
                type: 'myPage',
                tag: 1
            },
            {
                iconPath: '../../static/external-link.svg',
                name: '分享给好友',
                type: 'myPage',
                tag: 2
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},
    // 页面跳转
    navigateTo(e) {
        let address = e.target.dataset.type;
        if (e.target.dataset.tag && e.target.dataset.type) {
            wx.navigateTo({
                url: address + '/' + address
            })
        }
    },
    onShareAppMessage: function (res) {
        return {
            title: 'Finally去水印',
            path: "pages/index/index",
            success(res) {
                console.log(res)
            },
            fail(e) {
                console.log(e)
            }
        }
    },

})