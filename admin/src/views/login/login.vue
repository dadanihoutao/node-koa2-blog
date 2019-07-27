<template>
    <div class="admin-login">
        <h3 class="title">时洋的博客</h3>
        <Form class="formInline" ref="formInline" :model="loginData" :rules="ruleInline">
            <FormItem prop="email">
                <Input type="text" v-model="loginData.email" placeholder="请输入邮箱">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="loginData.password" placeholder="请输入密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
    name: 'login',
    data () {
        return {
            loginData: {
                email: '',
                password: ''
            },
            ruleInline: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blue' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blue' },
                    { type: 'string', min: 6, message: '密码长度不能' }
                ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$post('/login', this.loginData).then(res => {
                        if (res.code === 200) {
                            this.$Message.success('登录成功!')
                            this.$Lockr.set('token', res.token)
                            console.log(res)
                            this.$router.push({path: '/home'})
                        } else {
                            this.$Message.error(res.msg)
                        }
                    })
                } else {
                    this.$Message.error('失败!')
                }
            })
        }
    },
    watch: {}
}
</script>
<style lang="less">
.admin-login {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    .title {
        text-align: center;
        font-size: 30px;
        padding-top: 100px;
    }
    .formInline {
        width: 300px;
        margin: 0 auto;
        padding-top: 100px;
    }
}
</style>
