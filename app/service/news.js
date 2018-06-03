const Service = require('egg').Service;

class NewsService extends Service {
  async list(page = 1) {
    // read config
    const {serverUrl, pageSize} = this.config.news; // config/config.default.js

    // use build-in http client to GET hacker-news api
    const {data: idList} = await this.ctx.curl(`${serverUrl}/topstories.json`, {
      enableProxy: true,
      proxy: 'http://localhost:1080',
      data: {
        orderBy: '"$key"',
        startAt: `"${pageSize * (page - 1)}"`,
        endAt: `"${pageSize * page - 1}"`
      },
      dataType: 'json',
      timeout: 10000
    });

    // parallel GET detail
    const newsList = await Promise.all(
      Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, {
          enableProxy: true,
          proxy: 'http://localhost:1080', dataType: 'json'
        });
      })
    );
    return newsList.map(res => res.data);
  }
}

module.exports = NewsService;