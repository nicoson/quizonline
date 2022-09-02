var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Empty' });
});

router.get('/client/regist', function(req, res, next) {
  res.render('cli-regist', { title: 'Regist' });
});

router.get('/client/battlefield', function(req, res, next) {
  res.render('cli-battlefield', { title: 'Game' });
});

router.get('/client/battlereport', function(req, res, next) {
  res.render('cli-battlereport', { title: 'Game' });
});

router.get('/client/entrance', function(req, res, next) {
  res.render('cli-entrance', { title: 'Entrance' });
});

router.get('/admin/regist', function(req, res, next) {
  res.render('adm-regist', { title: 'Portal' });
});

router.get('/admin/portal', function(req, res, next) {
  res.render('adm-portal', { title: 'Portal' });
});

router.get('/admin/honerroll', function(req, res, next) {
  res.render('adm-honerroll', { title: 'Honer Roll' });
});

router.get('/admin/duyouqianqiu', function(req, res, next) {
  res.render('adm-duyouqianqiu', { title: 'duyouqianqiu' });
});

router.get('/admin/dashboard/duyouqianqiu', function(req, res, next) {
  res.render('adm-dashboard-duyouqianqiu', { title: 'Dashboard' });
});

router.get('/admin/dashboard/bingfengwangzuo', function(req, res, next) {
  res.render('adm-dashboard-bingfengwangzuo', { title: 'Dashboard' });
});

module.exports = router;
