exports.keys ='abcdefg';
exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl': 'nunjucks',
    },
};
exports.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
    // serverUrl: 'https://hn.algolia.com/',
};

// add middleware robot
exports.middleware = [
    'robot'
];
// robot's configurations
exports.robot = {
    ua: [
        /Baiduspider/i,
    ]
};