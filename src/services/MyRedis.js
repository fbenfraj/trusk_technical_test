const Redis = require("ioredis");

class MyRedis {
  constructor(host, port) {
    this.host = host || "127.0.0.1";
    this.port = port || 6379;
    this.MyRedis = new Redis({ host, port });
  }

  async put(key, value) {
    return await this.MyRedis.setex(key, 3600, value);
  }

  async getIfExists(key) {
    if (key === "employees_names") {
      const names = await this.MyRedis.get(key);
      if (names !== null) {
        return await this.MyRedis.get(key);
      } else {
        return {
          names: [],
        };
      }
    }
    if (key === "trucks_infos") {
      const trucks = await this.MyRedis.get(key);
      if (trucks !== null) {
        return await this.MyRedis.get(key);
      } else {
        return {
          trucks: [],
        };
      }
    }
    return await this.MyRedis.get(key);
  }

  async flush() {
    return await this.MyRedis.flushall();
  }

  async containsData() {
    const trusker_name = await this.getIfExists("trusker_name");
    if (trusker_name !== null) return true;
    else return false;
  }

  async getCachedInfos() {
    const trusker_name = await this.getIfExists("trusker_name");
    const society_name = await this.getIfExists("society_name");
    const employees_number = await this.getIfExists("employees_number");
    const employees_names = await this.getIfExists("employees_names");
    const trucks_number = await this.getIfExists("trucks_number");
    const trucks_infos = await this.getIfExists("trucks_infos");

    return {
      trusker_name,
      society_name,
      employees_number,
      employees_names,
      trucks_number,
      trucks_infos,
    };
  }
}

const myRedis = new MyRedis(process.env.REDIS_HOST, process.env.REDIT_PORT);

module.exports = { myRedis };
