MOCK MOCK!
---
version alpha

###quick start
```
git clone repo
cd folder root
npm install
npm start
```    
###usage  
1. go to  `localhost:3000` in your Chrome, add path & json  
2. request your path, default host is `127.0.0.1` or `localhost`
3. all method is support, but only return your json    


###path support
* path parameter `/user/:id` => `/user/1024`  
* query are ignored `/user?name=stephenw` same as `/user`  


### config.js contains your fallback host info 
###caution  
* `MOCK MOCK!` would use your 80 port, so need `sudo` permission.
* dashboard is on `localhost:3000`
* it's better to change your `host` file to ensure mock server & fallback host in same domain, so the cookies can works