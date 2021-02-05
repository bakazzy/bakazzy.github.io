<!--浏览器搞笑标题-->
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        document.title = 'ヽ(●-`Д´-)ノ别走';
        clearTimeout(titleTime);
    }
    else {
        document.title = 'ヾ(Ő∀Ő3)ノ好哦！' + OriginTitle;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});