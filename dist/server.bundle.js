!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("babel-polyfill")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=function(e){return e&&e.__esModule?e:{default:e}}(r),o=i.default.Schema,u=new o({created:{type:Date,required:!0,default:new Date,expires:"365d"},img:{type:String,default:"../../client/img/image.png"},likes:[String],shares:[String],title:{type:String,required:!0},owner:{type:String,required:!0}});t.default=i.default.model("Pin",u)},function(e,t,n){n(2),e.exports=n(5)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}n(2);var i=n(6),o=r(i);n(7);var u=n(8),s=r(u),a=n(0),l=r(a),c=n(9),d=r(c),f=n(1),p=r(f),g=n(10),v=r(g),m=n(11),h=r(m),w=n(12),x=r(w),_=n(13),b=r(_),P=n(14),y=r(P),S=n(15),R=n(17),O=n(21),k=r(O),q=n(22),U=r(q),j=n(23),M=r(j);o.default.polyfill();var C=(0,s.default)(),E=process.cwd();l.default.load();C.use((0,d.default)("tiny")),C.use("/js",s.default.static(E+"/dist/js")),C.use("/styles",s.default.static(E+"/dist/styles")),C.use("/img",s.default.static(E+"/dist/img")),C.use("/fonts",s.default.static(E+"/dist/fonts"));var T=p.default.connection;p.default.Promise=o.default,p.default.connect(process.env.MONGO_URI,{useMongoClient:!0},function(e,t){e?console.error("Failed to connect to database!"):console.log("Connected to database.")});var A=(0,x.default)(v.default);C.use(b.default.urlencoded({extended:!1})),C.use((0,y.default)());var N={secret:process.env.SECRET,resave:!1,saveUninitialized:!1,cookie:{path:"/",httpOnly:!1,maxAge:18e5},store:new A({mongooseConnection:T},function(e){console.error(e)}),name:"id"};C.set("trust proxy",1),N.cookie.secure=!0,N.cookie.httpOnly=!0,C.use((0,v.default)(N)),C.use(h.default.initialize()),C.use(h.default.session()),(0,R.authConfig)(h.default),(0,S.routes)(C,h.default);var I=k.default.createServer(C),L=(0,U.default)(I);(0,M.default)(L);var D=process.env.PORT;I.listen(D,function(){console.log("Server is listening on port "+D+".")})},function(e,t){e.exports=require("es6-promise")},function(e,t){e.exports=require("isomorphic-fetch")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("morgan")},function(e,t){e.exports=require("express-session")},function(e,t){e.exports=require("passport")},function(e,t){e.exports=require("connect-mongo")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("cookie-parser")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.routes=void 0;var r=n(0),i=function(e){return e&&e.__esModule?e:{default:e}}(r),o=n(16),u=process.cwd();i.default.load();t.routes=function(e,t){var n=void 0,r=function(e,t,r){if(e.isAuthenticated())return e.user.github.username?n=e.user.github.username:e.user.twitter.username&&(n=e.user.twitter.username),console.log("USER:",n),r();t.redirect("/login")};e.route("/").get(r,function(e,t){"https"!==e.headers["x-forwarded-proto"]?t.redirect(process.env.APP_URL):t.sendFile(u+"/dist/index.html")}),e.route("/login").get(function(e,t){"https"!==e.headers["x-forwarded-proto"]?t.redirect(process.env.APP_URL+"/login"):t.sendFile(u+"/dist/login.html")}),e.route("/auth/github").get(t.authenticate("github")),e.route("/auth/github/callback").get(t.authenticate("github",{successRedirect:"/",failureRedirect:"/login"})),e.route("/auth/twitter").get(t.authenticate("twitter")),e.route("/auth/twitter/callback").get(t.authenticate("twitter",{successRedirect:"/",failureRedirect:"/login"})),e.route("/api/users/logged").get(function(e,t){n?t.json(n):(console.log("name_view ERROR"),t.json("Stranger"))}),e.route("/logout").get(function(e,t){e.logout(),t.redirect("/login")}),e.route("/api/savePin/:data").post(o.savePin),e.route("/api/deletePin/:data").delete(o.deletePin),e.route("/api/allPins").get(o.allPins),e.route("/api/toggleLikePin/:data").post(o.toggleLikePin),e.use("/api/unpinAll",o.unpinAll)}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.deletePin=t.savePin=t.unpinAll=t.allPins=t.toggleLikePin=void 0;var i=n(0),o=r(i),u=n(3),s=r(u);process.cwd();o.default.load();t.toggleLikePin=function(e,t){var n=JSON.parse(decodeURIComponent(e.params.data)),r=n.title,i=n.img,o=n.owner,u=n.loggedUser;s.default.findOne({title:r,img:i,owner:o},function(e,n){e&&console.error(e),n&&(n.likes.indexOf(u)>=0?n.likes.splice(n.likes.indexOf(u),1):null!==u&&n.likes.push(u),n.save(function(e,n){t.json("Saved"+n)}))})},t.allPins=function(e,t){s.default.find({}).sort({created:"descending"}).exec(function(e,n){e&&console.error(e),n&&t.json(n)})},t.unpinAll=function(e,t){s.default.remove({},function(e,n){t.json("All pins deleted.")})},t.savePin=function(e,t){var n=JSON.parse(decodeURIComponent(e.params.data)),r=n.title,i=n.img,o=n.owner;s.default.findOne({title:r,img:i,owner:o},function(e,n){if(e&&console.error(e),n)t.json("You already pinned this!");else{new s.default({title:r,img:i,owner:o}).save(function(e,n){e&&console.error(e),t.json("Your pin has been saved!")})}})},t.deletePin=function(e,t){var n=JSON.parse(decodeURIComponent(e.params.data)),r=n.title,i=n.img,o=n.owner;s.default.remove({title:r,img:i,owner:o},function(e,n){e&&console.error(e),n&&t.json("Your pin has been deleted.")})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.authConfig=void 0;var r=n(18),i=function(e){return e&&e.__esModule?e:{default:e}}(r),o=n(19).Strategy,u=n(20).Strategy;t.authConfig=function(e){e.serializeUser(function(e,t){t(null,e.id)}),e.deserializeUser(function(e,t){i.default.findById(e,function(e,n){t(e,n)})}),e.use(new u({consumerKey:process.env.TWITTER_CONSUMER_KEY,consumerSecret:process.env.TWITTER_CONSUMER_SECRET,callbackURL:process.env.APP_URL+"/auth/twitter/callback/"},function(e,t,n,r){process.nextTick(function(){i.default.findOne({"twitter.id":n.id},function(e,t){if(e)return r(e);if(t)return r(null,t);var o=new i.default;o.twitter.id=n.id,o.twitter.username=n.username,o.twitter.displayName=n.displayName,o.save(function(e){if(e)throw e;return r(null,o)})})})})),e.use(new o({clientID:process.env.GITHUB_KEY,clientSecret:process.env.GITHUB_SECRET,callbackURL:process.env.APP_URL+"/auth/github/callback/"},function(e,t,n,r){process.nextTick(function(){i.default.findOne({"github.id":n.id},function(e,t){if(e)return r(e);if(t)return r(null,t);var o=new i.default;o.github.id=n.id,o.github.username=n.username,o.github.displayName=n.displayName,o.save(function(e){if(e)throw e;return r(null,o)})})})}))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=r.Schema,o=new i({github:{id:String,displayName:String,username:String,created:{type:Date,required:!0,default:new Date,expires:"365d"}},twitter:{id:String,displayName:String,username:String,created:{type:Date,required:!0,default:new Date,expires:"365d"}}});t.default=r.model("User",o)},function(e,t){e.exports=require("passport-github2")},function(e,t){e.exports=require("passport-twitter")},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("socket.io")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),o=r(i),u=n(3),s=r(u);process.cwd();o.default.load();var a=function(e){e.on("connection",function(t){t.emit("start","Regular communications received..."),t.on("start",function(e){setInterval(function(){s.default.find({}).sort({created:"descending"}).exec(function(e,n){e&&(console.log(e),console.error(e)),n&&(console.log(n),t.emit("updateAllPins",n))})},e)}),e.on("disconnect",function(){console.log("Web Sockets disconnected.")})})};t.default=a}]);