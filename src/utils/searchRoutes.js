export const platforms = [
    {
        id: 'xiaohongshu',
        name: '小红书',
        icon: '📕',
        url: 'https://www.xiaohongshu.com/search_result?keyword={query}',
        color: '#ff2442'
    },
    {
        id: 'bilibili',
        name: '哔哩哔哩',
        icon: '📺',
        url: 'https://search.bilibili.com/all?keyword={query}',
        color: '#00aeec'
    },
    {
        id: 'weibo',
        name: '微博',
        icon: '👁️',
        url: 'https://s.weibo.com/weibo?q={query}',
        color: '#eb192d'
    },
    {
        id: 'douyin',
        name: '抖音',
        icon: '🎵',
        url: 'https://www.douyin.com/search/{query}',
        color: '#000000'
    },
    {
        id: 'baidu',
        name: '百度',
        icon: '🐾',
        url: 'https://www.baidu.com/s?wd={query}',
        color: '#2932e1'
    },
    {
        id: 'google',
        name: 'Google',
        icon: '🔍',
        url: 'https://www.google.com/search?q={query}',
        color: '#4285f4'
    }
];

export const search = (query, platformIds) => {
    if (!query || !platformIds || platformIds.length === 0) return;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    platformIds.forEach(id => {
        const platform = platforms.find(p => p.id === id);
        if (platform) {
            let targetUrl = platform.url.replace('{query}', encodeURIComponent(query));
            
            // Mobile Optimization: Xiaohongshu mobile web is often broken/blocked
            // Fallback to Baidu Site Search for accessibility in China without VPN
            if (id === 'xiaohongshu' && isMobile) {
                targetUrl = `https://www.baidu.com/s?wd=site:xiaohongshu.com+${encodeURIComponent(query)}`;
            }

            window.open(targetUrl, '_blank');
        }
    });
};
