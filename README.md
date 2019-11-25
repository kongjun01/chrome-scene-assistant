### 接入方式

1. 判断是否已经安装插件

```
// 判断节点是否存在，不存在说明没有安装插件
document.getElementById("duiba_scenes_ext");
```

2. 与插件通信，修改/清除 Cookie

```
// 修改cookie的值
const editCookie = function() {
		// type: "COOKIE_MODIFY" 为固定值
		const msg = { type: "COOKIE_MODIFY", value: "需要修改的值" };
		window.postMessage(msg, "*");
};

// 删除cookie的值
const invalidCookie = function() {
		// type: "COOKIE_INVALID" 为固定值
		const msg = { type: "COOKIE_INVALID"};
		window.postMessage(msg, "*");
};
```

3. 获取插件保存的Cookie的值

```
// 返回json示例: { isOpenScene: true, cookieName: '_duibaServiceGroupKey', cookieValue: 'test'}
// isOpenScene-是否开启, cookieValue-Cookie的值
document.getElementById("duiba_scenes_ext").innerHTML;
```

