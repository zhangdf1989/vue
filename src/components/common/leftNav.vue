<template>
    <div class="left-nav">
      <ul>
        <li>
          <router-link to="/">
            <i class="icon iconfont icon-goumai"></i>
            <div>收银</div>
          </router-link>

        </li>
        <li>
          <router-link to="/shop">
            <i class="icon iconfont icon-dianpu"></i>
            <div>店铺</div>
          </router-link>

        </li>
        <li>
         <router-link to="/goods">
           <i class="icon iconfont icon-hanbao"></i>
           <div>商品</div>
         </router-link>

        </li>
        <li>
          <i class="icon iconfont icon-huiyuanqia"></i>
          <div>会员</div>
        </li>
        <li>
          <i class="icon iconfont icon-tongji"></i>
          <div>统计</div>
        </li>
        <li>
          <i class="icon iconfont icon-zuanshi"></i>
          <div>设置</div>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'leftNav'
}
</script>

<style>
.left-nav{
  color: #fff;
  font-size: 10px;
  height: 100%;
  background-color: #1d8ce0;
  float: left;
  width: 5%;
}
  .iconfont{
    font-size: 24px;
  }
  .left-nav ul{
    padding: 0px;
    margin: 0px;
  }
  .left-nav li{
    list-style: none;
    text-align: center;
    border-bottom: 1px solid #20a0ff;
    padding: 10px;
  }
  a{
    color: #fff;
    text-decoration: none;
  }
</style>
