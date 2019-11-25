### 接入方式

1. 判断是否安装插件

```
// 判断节点是否存在，不存在说明没有安装插件
document.getElementById("duiba_scenes_ext");
```

2. 与插件通信，修改Cookie

```
const editCookie = function() {
		// type: "COOKIE_CHANGE" 为固定值
    const msg = { type: "COOKIE_CHANGE", value: "需要修改的值" };
    window.postMessage(msg, "*");
};
```

### 安装插件


### 如何使用插件
