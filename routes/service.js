var express = require('express');
var router = express.Router();
var fs = require("fs");
var QRCode = require('qrcode');


let NameList = {
  aaa: {name: 'kak ka', id:'aaa',score:{duyouqianqiu: 2, bingfengwangzuo: 25}},
  bbb: {name: 'ewewew', id:'bbb',score:{duyouqianqiu: 5, bingfengwangzuo: 40}},
  ccc: {name: 'iilili', id:'ccc',score:{duyouqianqiu: 8, bingfengwangzuo: 30}},
  aa1a: {name: 'kak ka', id:'aaa',score:{duyouqianqiu: 2, bingfengwangzuo: 25}},
  bbb2: {name: 'ewewew', id:'bbb',score:{duyouqianqiu: 5, bingfengwangzuo: 40}},
  ccc3: {name: 'iilili', id:'ccc',score:{duyouqianqiu: 8, bingfengwangzuo: 30}},
  aaa4: {name: 'kak ka', id:'aaa',score:{duyouqianqiu: 2, bingfengwangzuo: 25}},
  bbb5: {name: 'ewewew', id:'bbb',score:{duyouqianqiu: 5, bingfengwangzuo: 40}},
  ccc6: {name: 'iilili', id:'ccc',score:{duyouqianqiu: 8, bingfengwangzuo: 30}},
  aaa7: {name: 'kak ka', id:'aaa',score:{duyouqianqiu: 2, bingfengwangzuo: 25}},
  bbb8: {name: 'ewewew', id:'bbb',score:{duyouqianqiu: 5, bingfengwangzuo: 40}},
  ccc9: {name: 'iilili', id:'ccc',score:{duyouqianqiu: 8, bingfengwangzuo: 30}},
  aaa0: {name: 'kak ka', id:'aaa',score:{duyouqianqiu: 2, bingfengwangzuo: 25}},
  bbb11: {name: 'ewewew', id:'bbb',score:{duyouqianqiu: 5, bingfengwangzuo: 40}},
  c1cc: {name: 'iilili', id:'ccc',score:{duyouqianqiu: 8, bingfengwangzuo: 30}},
  a2aa: {name: 'kak ka', id:'aaa',score:{duyouqianqiu: 2, bingfengwangzuo: 25}},
  b3bb: {name: 'ewewew', id:'bbb',score:{duyouqianqiu: 5, bingfengwangzuo: 40}},
  c4cc: {name: 'iilili', id:'ccc',score:{duyouqianqiu: 8, bingfengwangzuo: 30}},
  a5aa: {name: 'kak ka', id:'aaa',score:{duyouqianqiu: 2, bingfengwangzuo: 25}},
  b6bb: {name: 'ewewew', id:'bbb',score:{duyouqianqiu: 5, bingfengwangzuo: 40}},
  c7cc: {name: 'iilili', id:'ccc',score:{duyouqianqiu: 8, bingfengwangzuo: 30}},
  a8aa: {name: 'kak ka', id:'aaa',score:{duyouqianqiu: 2, bingfengwangzuo: 25}},
  b9bb: {name: 'ewewew', id:'bbb',score:{duyouqianqiu: 5, bingfengwangzuo: 40}},
  c0cc: {name: 'iilili', id:'ccc',score:{duyouqianqiu: 8, bingfengwangzuo: 30}},
  aa1a: {name: 'kak ka', id:'aaa',score:{duyouqianqiu: 2, bingfengwangzuo: 25}},
  bb2b: {name: 'ewewew', id:'bbb',score:{duyouqianqiu: 5, bingfengwangzuo: 40}},
  cc3c: {name: 'iilili', id:'ccc',score:{duyouqianqiu: 8, bingfengwangzuo: 30}},
  aa4a: {name: 'kak ka', id:'aaa',score:{duyouqianqiu: 2, bingfengwangzuo: 25}},
  bb5b: {name: 'ewewew', id:'bbb',score:{duyouqianqiu: 5, bingfengwangzuo: 40}},
  cc6c: {name: 'iilili', id:'ccc',score:{duyouqianqiu: 8, bingfengwangzuo: 30}},
  aa7a: {name: 'kak ka', id:'aaa',score:{duyouqianqiu: 2, bingfengwangzuo: 25}},
  bb8b: {name: 'ewewew', id:'bbb',score:{duyouqianqiu: 5, bingfengwangzuo: 40}},
  cc9c: {name: 'iilili', id:'ccc',score:{duyouqianqiu: 8, bingfengwangzuo: 30}},
  // nixiaohui: {name: '倪晓晖', id:'nixiaohui',score:{duyouqianqiu: 8, bingfengwangzuo: 30}},
}
// setInterval(function(){
//   for(let key in NameList) {
//     NameList[key].score.duyouqianqiu = Math.round(Math.random()*100);
//   }
// },1000);

let PLAYER = {
  duyouqianqiu: {},
  bingfengwangzuo:{}
};
let newPLAYER = {
  duyouqianqiu: [],
  bingfengwangzuo:[]
}
let QB = null;
let warStatus = {
  duyouqianqiu: {
    active: false,  // 战场激活状态：同一时刻，只能开启一个战场，此时用户可以进入该战场
    start: false,   // 战争启动状态：true开启，用户可以战斗；false关闭，用户不可战斗
    timer: null
  },
  bingfengwangzuo: {
    active: false,  // 战场激活状态：同一时刻，只能开启一个战场，此时用户可以进入该战场
    start: false,   // 战争启动状态：true开启，用户可以战斗；false关闭，用户不可战斗
    timer: null
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with services');
});

router.get('/namelist', function(req, res, next) {
  res.send(NameList);
});

router.get('/getquestion', function(req, res, next) {
  res.send(QB);
});

// router.get('/getdata', function(req, res, next) {
//   res.send(QB);
// });

router.get('/registaddress', function(req, res, next) {
  QRCode.toDataURL('http://100.100.156.99:3000/client/regist', function (err, url) {
    console.log(url)
    res.send(url);
  })
});

router.get('/battlefieldaddress', function(req, res, next) {
  QRCode.toDataURL(`http://100.100.156.99:3000/client/battlefield?field=${req.query.field}`, function (err, url) {
    console.log(url)
    res.send(url);
  })
});

router.get('/checkuser', function(req, res, next) {
  let clientid = req.query.id;
  // console.log('check user: ', clientid);
  (NameList[clientid] == undefined) ? res.send(false) : res.send(true);
});

router.get('/getstatusonce', function(req, res, next) {
  res.send(warStatus);
});

router.get('/getstatus', function(req, res, next) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  });

  let field = req.query.field;
  let clientid = req.query.id;
  let name = null;
  if(clientid == undefined){
    clientid = '';
    name = '观众';
  } else if(NameList[clientid] == undefined) {
    return;
  } else {
    name = NameList[clientid].name;
    PLAYER[field][clientid] = name;
    newPLAYER[field].push(`${name}（${clientid}）`);
  }
  console.log(`用户   ${name}（${clientid}）    加入战场！！！`);
  // console.log('player: ',PLAYER);
  // console.log('new player: ',newPLAYER);
  
  // console.log(JSON.stringify(warStatus[req.query.battlefield]), `\n\n`);
  let worker = setInterval(() => {
      res.write(`data: ${JSON.stringify(warStatus)}\n\n`);
  }, 1000);

  req.on('close', () => {
    console.log(`${clientid} Connection closed`);
    console.log(`用户   ${name}（${clientid}）    退出战场！！！`);
    if(field != undefined) {
      delete PLAYER[field][clientid];
    }
    clearInterval(worker);
  });
});

router.get('/getplayerstatus', function(req, res, next) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  });

  let field = req.query.field;
  let data = {
    player: PLAYER[field],
    newplayer: newPLAYER[field]
  };
  res.write(`data: ${JSON.stringify(data)}\n\n`);

  let worker = setInterval(() => {
    // console.log(PLAYER);
    if(newPLAYER[field].length > 0) {
      let data = {
        player: PLAYER[field],
        newplayer: newPLAYER[field]
      };
      res.write(`data: ${JSON.stringify(data)}\n\n`);
      newPLAYER[field] = [];
    }
  }, 1000);

  req.on('close', () => {
    clearInterval(worker);
  });
});

router.post('/changestatus', function(req, res, next) {
  let key = req.body.key;
  let value = req.body.value;
  warStatus[key] = value;
  res.send({
    code: 200
  })
});

router.post('/regist', function(req, res, next) {
  console.log('新用户注册：', req.body.name, '    ', req.body.id);
  if(NameList[req.body.id] == undefined) {
    NameList[req.body.id] = {
      name: req.body.name,
      id: req.body.id,
      score: {
        duyouqianqiu: 0,
        bingfengwangzuo: 0,
      }
    }
    console.log(NameList);
  }
  
  res.send({
    code: 200
  });
});

router.post('/updatescore', function(req, res, next) {
  let id = req.body.id;
  let key = req.body.key;
  let score = req.body.score;
  NameList[id].score[key] += score;
  res.send({
    code: 200,
    score: NameList[id].score[key]
  });
});

// router.get('/game/duyouqianqiu', function(req, res, next) {
//   res.render('registed', { title: 'Registed' });
// });


// 初始化数据
(() => {
  fs.readFile('lab.csv', function (err, data) {
    var table = new Array();
    if (err) {
        console.log(err.stack);
        return;
    }
  
    ConvertToTable(data, function (table) {
      QB = table.slice(1,-1);
      // console.log(table);
      console.log(`题库加载完毕，共  ${QB.length}  道题`);
    })
  });
})()


function ConvertToTable(data, callBack) {
  data = data.toString();
  var table = new Array();
  var rows = new Array();
  rows = data.split("\r\n");
  for (var i = 0; i < rows.length; i++) {
      table.push(rows[i].split(","));
  }
  callBack(table);
}

module.exports = router;
