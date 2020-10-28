const plugin =require('./config/plugin')
module.exports = {
  title: 'Hans',
  description: 'Hans’s Blog',
  //logo配置
  head: [
    ['link', { rel: 'icon', href: '/1.jpg' }],
    [
      "script",
      `
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?f401324e0b516b3b2b76d99de8fbace6";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
          `
    ]
  ],
  theme: 'reco',
  themeConfig: {
    authorAvatar: '/avatar.png',
    type: 'blog',
    //导航栏配置
    nav: [
      { text: '首页', link: '/', icon: 'reco-home' },
      { text: '关于我', link: '/views/aboutme/', icon: 'reco-account' },
      { text: 'GitHub', link: 'https://github.com/A-hans', target: '_blank', icon: 'reco-github' },
    ],
    // 自动形成侧边导航
    subSidebar: 'auto',
    sidebarDepth: 4,
    //侧边栏配置
    sidebar: {
    },
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: '标签'      // 默认文案 “标签”
      }

    },
    //添加评论
    valineConfig: {
      appId: '6gP1Dav4EvEefc88exAIq6b7-gzGzoHsz',// your appId
      appKey: 'atsLyLLtjjxly41TzJVhamP3', // your appKey
      recordIP: true,
      placeholder: '填写邮箱地址一起交流学习...',
      visitor: true,
    }
  },

}

