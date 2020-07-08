<template>
  <div class="login_wrapper">
    <div class="login">
      <div class="login_header">登录</div>
      <div class="login_form">
        <van-field v-model="username"
                   placeholder="请输入用户名"
                   left-icon="user-circle-o"
        />
        <van-field type="password"
                   v-model="password"
                   placeholder="请输入密码"
                   icon-prefix="zcbf"
                   left-icon="mima"/>
        <van-button type="primary" size="large"
                    @click="loginBefore">登录
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'vant';

  export default {
    name: "login",
    data() {
      return {
        username: 'lilu',
        password: '123456',
      };
    },
    created(){
    },
    mounted(){
    },
    methods: {
      //登录前验证
      loginBefore() {
        Toast.loading({
          message: '登录中...',
          forbidClick: true,
          loadingType: 'spinner',
        });
        if(this.username != '' || this.password != ''){
          setTimeout(()=>{
            this.login();
          },2000);
        }else{
          console.log('dasda')
        }
      },

      //登录
      login(){
        localStorage.setItem('token',this.username);
        if (localStorage.getItem('redirect')) { //如果存在参数
          let redirect = localStorage.getItem('redirect');
          this.$router.push(redirect);//则跳转至进入登录页前的路由
        } else {
          this.$router.replace('/home');//否则跳转至首页
        }
      }
    },
  }
</script>

<style scoped lang="less">
.login_wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c3e50;
  font-size: 1.6rem;
  .login{
    width: 35rem;
    height: 40rem;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    .login_form{
      width: 100%;
      height: 60%;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .van-button--large{
        width: 90%;
      }
    }
  }
}
</style>
