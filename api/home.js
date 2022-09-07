import fly from '../utils/request'
//获取轮播图
export const getBanners = () => {
  return fly.get('/home/swiperdata')
}
//获取分类导航
export const getNavList = () => {
  return fly.get('/home/catitems')
}
//获取楼层
export const getFloors = () => {
  return fly.get('/home/floordata')
}
