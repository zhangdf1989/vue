<template>
    <div class="pos">
      <el-row>
        <el-col :span="7" class="pos-order" id="order-list">
          <el-tabs type="card">
            <el-tab-pane label="点餐" style="width: 100%">
              <el-table :data="tableData" border>
                <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                <el-table-column prop="count" label="数量" width="70"></el-table-column>
                <el-table-column prop="price" label="金额" width="70"></el-table-column>
                <el-table-column label="操作" width="100" fixed="right">
                  <template scope="scope">
                    <el-button type="text" size="small" @click="orderDel(scope.row )">删除</el-button>
                    <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="text-align: left;background-color: #fff;padding: 10px; border-bottom: 1px solid #d3dce6;">
                <small>数量： </small>{{totalCount}}   &nbsp;&nbsp;&nbsp;&nbsp;    <small>金额：</small>{{totalMoney}}元
              </div>
              <div class="div-btn">
                <el-button type="warning" @click="GdClick">挂单</el-button>
                <el-button type="danger" @click="Delete">删除</el-button>
                <el-button type="success" @click="checkout">结账</el-button>

              </div>
            </el-tab-pane>
            <el-tab-pane label="挂单">
              <el-table :data="GdData" border>
                <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                <el-table-column prop="count" label="数量" width="70"></el-table-column>
                <el-table-column prop="price" label="金额" width="70"></el-table-column>
                <el-table-column label="操作" width="100" fixed="right"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="外卖">
              外卖
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="17">
          <div class="often-goods">
            <div class="title">常用商品</div>
            <div class="often-goods-list">
              <ul>
                <li v-for="item of oftenGoods" :key="item.goodsId" @click="addOrderList(item)">
                  <span>{{item.goodsName}}</span>
                  <span class="o-price">￥{{item.price}}元</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-type">
            <el-tabs>
              <el-tab-pane label="汉堡">

                <div>
                  <ul class="cookList">
                    <li v-for="type of type0Goods" :key="type.goodId" @click="addOrderList(type)">
                      <span class="foodImg"><img :src="type.goodsImg" width="100%"></span>
                      <span class="foodName">{{type.goodsName}}</span>
                      <span class="foodPrice">￥{{type.price}}.00元</span>
                    </li>
                  </ul>
                </div>

              </el-tab-pane>
              <el-tab-pane label="小食">
                <div>
                  <ul class="cookList">
                    <li v-for="type of type1Goods" :key="type.goodId" @click="addOrderList(type)">
                      <span class="foodImg"><img :src="type.goodsImg" width="100%"></span>
                      <span class="foodName">{{type.goodsName}}</span>
                      <span class="foodPrice">￥{{type.price}}.00元</span>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="饮料">
                <div>
                  <ul class="cookList">
                    <li v-for="type of type2Goods" :key="type.goodId" @click="addOrderList(type)">
                      <span class="foodImg"><img :src="type.goodsImg" width="100%"></span>
                      <span class="foodName">{{type.goodsName}}</span>
                      <span class="foodPrice">￥{{type.price}}.00元</span>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="套餐">
                <div>
                  <ul class="cookList">
                    <li v-for="type of type3Goods" :key="type.goodId" @click="addOrderList(type)">
                      <span class="foodImg"><img :src="type.goodsImg" width="100%"></span>
                      <span class="foodName">{{type.goodsName}}</span>
                      <span class="foodPrice">￥{{type.price}}.00元</span>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>

        </el-col>
      </el-row>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'pos',
  data () {
    return {
      tableData: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalMoney: 0,
      totalCount: 0,
      GdData: []
    }
  },
  mounted: function () {
    let orderHeight = document.body.clientHeight
    document.getElementById('order-list').style.height = orderHeight + 'px'
  },
  methods: {
    orderDel: function (goods) {
      this.tableData = this.tableData.filter(o => o.goodsId !== goods.goodsId)
      this.getAllMoney()
    },
    Delete: function () {
      this.tableData = []
      this.getAllMoney()
    },
    addOrderList: function (goods) {
      this.totalMoney = 0
      this.totalCount = 0
      // 商品是否存在于列表中
      let isHave = false
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId === goods.goodsId) {
          isHave = true
        }
      }

      // 根据判断的值编写业务逻辑
      if (isHave) {
        // 改变商品数量
        let arr = this.tableData.filter(a => a.goodsId === goods.goodsId)
        arr[0].count++
      } else {
        let newGoods = {goodsId: goods.goodsId, goodsName: goods.goodsName, price: goods.price, count: 1}
        this.tableData.push(newGoods)
      }
      this.getAllMoney()
    },
    checkout: function () {
      if (this.totalCount !== 0) {
        this.tableData = []
        this.totalCount = 0
        this.totalMoney = 0
        this.$message({
          message: '结账成功',
          type: 'success'
        })
      } else {
        this.$message.error('购物列表为空，不能进行结账')
      }
    },
    GdClick: function () {
      if (this.tableData != '') {
        this.GdData = this.tableData
        this.tableData = []
        this.totalCount = 0
        this.totalMoney = 0
        this.$message({
          message: '挂单成功',
          type: 'success'
        })
      } else {
        this.$message.error('购物列表为空，不能进行挂单')
      }
    },
    getAllMoney: function () {
      this.totalMoney = 0
      this.totalCount = 0
      if (this.tableData) {
        // 计算汇总价格
        this.tableData.forEach((element) => {
          this.totalCount += element.count;
          this.totalMoney = this.totalMoney + (element.price * element.count);
        })
      }
    }
  },
  created () {
    axios.get('http://jspang.com/DemoApi/oftenGoods.php')
      .then(response => {
        console.log(response)
        this.oftenGoods = response.data
      })
      .catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })

      axios.get('http://jspang.com/DemoApi/typeGoods.php')
        .then(response => {
          this.type0Goods = response.data[0]
          this.type1Goods = response.data[1]
          this.type2Goods = response.data[2]
          this.type3Goods = response.data[3]
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，不能访问')
        })
  }
}
</script>

<style scoped>
.pos-order{
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
}
  .div-btn{
    margin-top: 10px;
  }
  .title{
    height: 20px;
    border-bottom: 1px solid #d3dce6;
    background-color: #f9fafc;
    padding: 10px;
    text-align: left;
  }
  .often-goods-list ul li{
    list-style: none;
    float: left;
    border: 1px solid #e5e9f2;
    padding: 10px;
    margin: 10px;
    background-color: #fff;
    cursor: pointer;
  }
  .often-goods-list .o-price{
    color: #58b7ff;
  }
  .goods-type{
    clear: both;
  }
.cookList li{
  list-style: none;
  width:23%;
  border:1px solid #E5E9F2;
  height: auto;
  overflow: hidden;
  background-color:#fff;
  padding: 2px;
  float:left;
  margin: 2px;
  cursor: pointer;
}
.cookList li span{

  display: block;
  float:left;
}
.foodImg{
  width: 40%;
}
.foodName{
  font-size: 18px;
  padding-left: 10px;
  color:brown;

}
.foodPrice{
  font-size: 16px;
  padding-left: 10px;
  padding-top:10px;
}
</style>
<style>
  .el-tabs__nav-scroll{
    background-color: #fff;
  }
</style>
