// pages/goods_list/goods_list.js
/*
1 用户上滑页面 滚动条触底 开始加载下一页数据
  1 找到滚动条触底事件
  2 判断还有没有下一页数据
    1 获取到总页数 只有总条数
    总页数 = Math.ceil(总页数/页容量)
           = Math.ceil(23/10)=3
    2 获取到当前的页码
    3 判断一下 当前的页码是否大于等于总页数
      表示没有下一页数据
  3 加入没有下一页数据 弹出一个提示
  4 假如还有下一页数据 加载下一页数据
    1 当前的页码++
    2 重新发送请求
    3 数据请求回来 要对data中的数组进行拼接而不是全部替换！！！

2 下拉刷新页面
  1 触发下拉刷新事件 需在页面json文件中开启一个配置项
    找到触发下来刷新的事件
  2 重置 数据 数组  
  3 重置页码 设置为1
  4 重新发送请求
  5 数据请求回来 需要手动关闭等待效果
*/

import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/rumtime';
Page({

  data:{
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goods_list:[]
  },
  //接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10,
  },
  //总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },
  //获取商品列表数据
  async getGoodsList(){
    const res=await request({url:"/goods/search",data:this.QueryParams});
    Console.log(res);
    const total = res.total
    //计算总页数
    this.totalPages = math.ceil(total/this.QueryParams.pagesize)
    console.log(this.totalPages)
    this.setDate({
      //goodsList:res.goods 
      //拼接数组
      goodslist:[...this.data.goodslist,...res.goods]
      
    })
    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
  },
  //标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    //1获取被点击的标题索引
    const {index}=e.detail;
    //2 修改源数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    //3 赋值到data中
    this.setData({
      tabs
    })
  },
  // 页面上滑 滚动条触底事件
  onReachBottom(){
   // console.log("页面触底");
   // 1 判断还有没有下一页数据
   if(this.QueryParams.pagenum>=this.totalPages){
     //没有下一页数据
     //console.log("没有下一页数据")
     wx.wx.showToast({
       title: '没有下一页数据',
     });
       
   }else{
     //还有下一页数据
     //console.log("还有下一页数据")
     this.QueryParams.pagenum++;
     this.getGoodsList();
   }
  },
   //下来刷新事件
   onPullDownRefresh(){
     console.log()
     //1重置数据
     this.setDate({
       goodslist:[]
     })
     //2 重置页码
     this.QueryParams.pagenum=1;
     //3 发送请求
     this.getGoodsList();
   }
})