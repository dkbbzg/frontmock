var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 删除单个角色， 角色管理
router.post('/deleteInfoRole.la', (req, res) => {
  res.header('tokenUuid', 'deleteInfoRole');
  res.json(true)
})

// 批量删除角色， 角色管理
router.post('/deleteRoles.la', (req, res) => {
  res.header('tokenUuid', 'deleteRoles');
  res.json(true)
})

module.exports = router;
