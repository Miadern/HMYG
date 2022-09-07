import fly from '../utils/request'
//获取轮播图
export const getGoodsList = (data) => fly.get('/goods/search', data)
