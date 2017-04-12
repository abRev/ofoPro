var express = require('express');
var router = express.Router();
var Keys = require('../models/keys');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/lock/:key',function(req,res,next){
	if(!req.params.key){
		res.json({error:true,message:'未传输车牌号'})
	}else{
		Keys.findOne({key:req.params.key}).exec((error,key)=>{
			if(error){
			}
			if(key)
				res.json({error:false,message:"",key:key.key,password:key.password});
			else{
				res.json({error:true,message:"这辆车子还未有人共享密码，在您解锁后麻烦共享一下密码，互惠大家！！！"})
			}
		})
	}
})

router.post('/lock',function(req,res,next){
	if(!req.body.password || !req.body.key){
		res.json({error:true,message:"车牌号或者密码为空"})
	}
	Keys.findOne({key:req.body.key}).exec((err,key)=>{
		if(err){
			return next(err);
		}
		if(key){
			res.json({error:true,message:"这辆车已经有人贡献过密码了！如果密码不对，请您去修改密码界面修改密码，谢谢"})
		}else{
		
	var key = new Keys({
		key:req.body.key,
		password:req.body.password
	});
	key.save((error)=>{
		if(error){
			res.json({error:true,message:error})
		}else{
			res.json({error:false,message:'太感谢您了！！'});
		}
	})
		}
	})

})

module.exports = router;
