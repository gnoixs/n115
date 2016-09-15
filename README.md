#11选5

##初始化项目
	mkdir c5f11 && cd c5f11 
	express -e
	cd . && npm install

##静态服务器
	npm install http-server --save
	http-server -a localhost -p 3000

##bower 
	npm install bower --save
	bower init
	touch .bowerrc
	bower install ionic --save
	bower install angular-resource --save
	bower install jquery --save

##gulp
	npm install gulp --save
	npm install npm install gulp-concat gulp-clean-css gulp-rename gulp-uglify gulp-jshint gulp-imagemin gulp-sass gulp-notify gulp-clean gulp-cache merge-stream readable-stream --save-dev
	touch gulpfile.js

##分配目录
	[11c5]
	    ├── bin
	    │   └── www
	    ├── configs 
	    │   └── gulp.cf.json
	    ├── node_modules                                                                      
	    ├── public                                        
	    │   ├── build
	    │   ├── libs
	    │   └── src
	    │       ├── fonts
	    │       ├── imgs
	    │       ├── sass
	    │       └── scripts
	    ├── routes
	    │   ├── index.js
	    │   └── users.js
	    ├── test
	    │   ├── e2e
	    │   └── unit
	    ├── views
	    │   ├── error.ejs
	    │   └── index.ejs
	    ├── .bowerrc
	    ├── .gitignore
	    ├── app.js
	    ├── bower.json
	    ├── gulpfile.js                                       
	    ├── package.json
	    └── README.md

##启动
	npm install && bower install
	npm start
	http://localhost:3000


#接口路径都在index.ejs下，所需数据格式均在public/src/datas下