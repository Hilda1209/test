import axios from "axios";
 const base={
     url:'https://group-zk.hz-yunsha.com'//接口路径
 }
 export function getgoods(params){
     return axios({
         url: `${base.url}/shop/goods/findGoodsListDdzp`,
         method:'get',
         params:params
     })
 }