const IFsDesc =[
    {
        url: '/getHomeInfo',
        method: 'POST',
        dataType: 'json' 
    },
    {
        url: '/getHomeSuit/image',
        method: 'GET'
    }
];

module.exports = {
    IFsDesc,

    // only properties below required，do NOT modify this property
    needCheckPropery:['url','method']
}

