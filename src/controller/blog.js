const getList = (author, keyword) => {
    // 返回假数据
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1628503240299,
            author: '张三'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1628503240299,
            author: '李四'
        },
        {
            id: 3,
            title: '标题c',
            content: '内容c',
            createTime: 1628503240299,
            author: '王五'
        }
    ]
}

module.exports = {
    getList
}