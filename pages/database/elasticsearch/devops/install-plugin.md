## Mac

在 Mac 下为 Elasticsearch 安装中文分词插件（如：ik 分词器）时，请遵循以下步骤：

确保已安装 Elasticsearch。

如果尚未安装 Elasticsearch，请访问以下链接以获取有关在 Mac 上安装 Elasticsearch 的信息：
https://www.elastic.co/guide/en/elasticsearch/reference/current/targz.html

打开终端。

进入 Elasticsearch 安装目录的 bin 目录。例如，如果您将 Elasticsearch 安装在 /usr/local/elasticsearch 文件夹中，请在终端中输入以下命令：

```bash
cd /usr/local/elasticsearch/bin
```

使用 elasticsearch-plugin 工具安装中文分词插件。为此，请在终端中输入以下命令（以安装 ik 分词器为例）：

```bash
elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/vX.X.X/elasticsearch-analysis-ik-X.X.X.zip
```

请将上述命令中的 vX.X.X 和 X.X.X 替换为与您的 Elasticsearch 版本相对应的插件版本。要找到适合您的版本，请访问以下页面并检查插件的发行说明：
https://github.com/medcl/elasticsearch-analysis-ik/releases

安装插件后，重新启动 Elasticsearch 以使插件生效。首先停止正在运行的 Elasticsearch 进程（如果有），然后重新启动它。如果您使用默认的安装设置，可以通过以下命令启动 Elasticsearch：

```bash
cd /usr/local/elasticsearch
./bin/elasticsearch
```

验证插件是否已成功安装。您可以通过查看 Elasticsearch 日志或查询其节点信息来确认插件是否已成功安装。例如，通过以下命令查询节点信息：

```
curl -X GET "localhost:9200/_nodes?pretty"
```

在返回的 JSON 结果中，搜索插件名称（如 "analysis-ik"）以确认其已安装并处于活动状态。

现在，您已成功在 Mac 下为 Elasticsearch 安装了中文分词插件。接下来，您可以在索引设置中使用 "ik_smart" 或 "ik_max_word" 分词器。

## Ubuntu

在 Ubuntu 下为 Elasticsearch 安装中文分词插件（如：ik 分词器）时，请遵循以下步骤：

确保已安装 Elasticsearch。

如果尚未安装 Elasticsearch，请访问以下链接以获取有关在 Ubuntu 上安装 Elasticsearch 的信息：
https://www.elastic.co/guide/en/elasticsearch/reference/current/deb.html

打开终端。

进入 Elasticsearch 安装目录的 bin 目录。对于 DEB 包安装的 Elasticsearch，通常安装在 /usr/share/elasticsearch 目录下。因此，请在终端中输入以下命令：

```bash
cd /usr/share/elasticsearch/bin
```

使用 elasticsearch-plugin 工具安装中文分词插件。为此，请在终端中输入以下命令（以安装 ik 分词器为例）：

```bash
sudo ./elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/vX.X.X/elasticsearch-analysis-ik-X.X.X.zip
```

请将上述命令中的 vX.X.X 和 X.X.X 替换为与您的 Elasticsearch 版本相对应的插件版本。要找到适合您的版本，请访问以下页面并检查插件的发行说明：
https://github.com/medcl/elasticsearch-analysis-ik/releases

安装插件后，重新启动 Elasticsearch 以使插件生效。首先停止正在运行的 Elasticsearch 进程（如果有），然后重新启动它。如果您使用默认的安装设置，可以通过以下命令启动 Elasticsearch：

Copy code

```bash
sudo systemctl restart elasticsearch.service
```

验证插件是否已成功安装。您可以通过查看 Elasticsearch 日志或查询其节点信息来确认插件是否已成功安装。例如，通过以下命令查询节点信息：

```sql
curl -X GET "localhost:9200/_nodes?pretty"
```

在返回的 JSON 结果中，搜索插件名称（如 "analysis-ik"）以确认其已安装并处于活动状态。

现在，您已成功在 Ubuntu 下为 Elasticsearch 安装了中文分词插件。接下来，您可以在索引设置中使用 "ik_smart" 或 "ik_max_word" 分词器。
