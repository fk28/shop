//index.js
//获取应用实例
import { request } from "../../request/index.js";
const app = getApp()

wx-Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    catesList:[],
    //楼层数据
    floorList:[]
  },
  onLoad:function(options){
  //  wx.request({
  //   url: 'http://api.zbztb.cn/api/public/v1/home/swiperdata',
  //    success: (result) => {
  //     this.setData({
  //       swiperList:result.data.message
  //     });
  //   },
  //   fail: () => {},
  //   complete: () => {}
    

  //   })
  //加载轮播图
  this.getSwiperList();
  //加载导航数组
  this.getCateList();
  //加载楼层
  this.getFloorList();
   },
   getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result=>{
      this.setData({
           //swiperList:result.data.message
           swiperList:result
             });
    })
   },
   getCateList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
           //catesList:result.data.message
           catesList:result
             });
    })
   },
   getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
      this.setData({
           //floorList:result.data.message
           floorList:result
             });
    })
   }
   
})
