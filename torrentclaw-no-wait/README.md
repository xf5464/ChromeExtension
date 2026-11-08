# TorrentClaw 磁力链接免等待

Chrome 扩展。在 TorrentClaw 点击「打开磁力链接」或「复制磁力链接」时，跳过网站的前端倒计时，直接执行网站原来的操作。Chrome 仍可能询问是否打开本机的磁力链接处理程序。

## 安装

1. 在 Chrome 地址栏打开 `chrome://extensions/`。
2. 开启右上角的「开发者模式」，点击「加载已解压的扩展程序」。
3. 选择本目录 `C:\projects\ChromeExtension\torrentclaw-no-wait`（里面有 `manifest.json`）。
4. 刷新 TorrentClaw 页面，再点击磁力链接。

扩展仅在 `https://torrentclaw.com/` 生效。它识别网站的磁力等待模块，保留原有的链接生成和风险检查。站点更新后如果模块无法识别，网站会沿用原有流程。
