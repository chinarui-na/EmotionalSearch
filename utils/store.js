// store.js
const state = {
  userId: 'qqq',
  server:'http://172.16.2.229:8180',
  ip:'http://172.16.2.229',
  port:'8180',
  HTTP: 'http://172.16.2.229:8180'
  // server: 'http://127.0.0.1:9090/cash/'
};

function commit(key, val) {
  if (!key) {
    return
  }

  state[key] = val;
  // 通知订阅者，待补充
}

module.exports = {
  state, commit
};
