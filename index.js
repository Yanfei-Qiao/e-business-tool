let http=require('http');
let fs = require("fs");
let cheerio = require("cheerio");
let request = require("request");
let mkdirp = require('mkdirp');

let links=require('./links'); 	//商品编号
let result1s = [];				//存储下架结果
let result2s = [];				//存储未下架商品
let dir = './downImg';			//存储图片

let download = function(url, dir, filename){
    request.head(url, function(err, res, body){
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};

for(let i = 0; i < links.length; i++){
	http.get('http://gz.17zwd.com/item.htm?GID='+links[i],function(req,res){ 
	    var html='';  
	    req.on('data',function(data){  
	        html+=data;  
	    });  
	    req.on('end',function(){
	    	var pos = html.indexOf("out-of-stock")
	    	// console.log(pos)
	    	if(pos<0){
	    		result2s.push(links[i]);
	    		let newdir = './downImg/' + links[i];
	    		mkdirp(newdir, function(err) {
				    if(err){
				        console.log(err);
				    }
				});
	    		let $ = cheerio.load(html);
	    		$('.goods-page-small-container img').each(function() {
		            var src = $(this).attr('src').replace('50x50','400x400');
		            src = 'http:' + src
		            console.log('正在下载' + src);
		            download(src, newdir, Math.floor(Math.random()*100000) + src.substr(-4,4));
		            console.log('下载完成');
		    	})
	    	} else {
	    		result1s.push(links[i]);
	    		
		    }
	    	if(result1s.length + result2s.length == links.length){
	    		console.dir('下架商品有：' + result1s);
	    	}
	    });  
	});  
}



// let imgUrl = "http://s0.hao123img.com/res/img/logo/logonew.png";
// http.get(imgUrl, function(res){
//     var imgData = "";
//     res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
//     res.on("data", function(chunk){
//         imgData+=chunk;
//         // console.dir(imgData);
//     });

//     res.on("end", function(){
//         fs.writeFile("./downImg/logonew.png", imgData, "binary", function(err){
//             if(err){
//             	// console.dir(err)
//                 console.log("down fail")
//             }
//             console.log("down success");
//         });
//     });
// });