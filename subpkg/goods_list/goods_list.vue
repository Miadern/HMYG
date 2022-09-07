<template>
  <view>
    <van-card :thumb-link="`/subpkg/goods_detail/goods_detail?id=${item.goods_id}`"
      :thumb="item.goods_small_logo||defaultPic" v-for="item in goodsList" :key="item.goods_id"
      :price="item.goods_price|toFixed" :title="item.goods_name" />
  </view>
</template>

<script>
  import toast from '@/utils/toast.js'
  import {
    getGoodsList
  } from '@/api/goodsList.js'
  export default {
    data() {
      return {
        queryDate: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        flag: false
      }
    },
    methods: {
      //获取商品列表
      async getGoodsList(cb) {
        this.flag = true
        const {
          goods,
          total
        } = await getGoodsList(this.queryDate)
        this.flag = false
        this.goodsList = [...this.goodsList, ...goods]
        this.total = total
        cb && cb()
      }

    },
    onLoad({
      query
    }) {
      this.queryDate.query = query
      this.getGoodsList()
    },
    onPullDownRefresh() {
      this.queryDate = {
        query: this.queryDate.query,
        cid: '',
        pagenum: 1,
        pagesize: 10
      }
      this.goodsList = []
      this.total = 0
      this.getGoodsList(
        () => {
          uni.stopPullDownRefresh()
        })
    },
    onReachBottom() {
      if (this.flag) return
      if (this.queryDate.pagesize * this.queryDate.pagenum >= this.total) return toast.err('没有更多了~')
      this.queryDate.pagenum++
      this.getGoodsList()
    }
  }
</script>

<style lang="scss">

</style>
