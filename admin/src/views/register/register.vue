<template>
    <div class="admin-register">
        <Form class="formInline" size="large" ref="formInline" :model="loginData" :rules="ruleInline">
            <FormItem prop="username">
                <Input type="text" v-model="loginData.username" placeholder="请输入用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="loginData.password" placeholder="请输入密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="duppassword">
                <Input type="password" v-model="loginData.duppassword" placeholder="确认密码">
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
    name: 'register',
    data () {
        return {
            loginData: {
                username: '',
                password: '',
                duppassword: ''
            },
            ruleInline: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blue' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blue' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位' }
                ],
                duppassword: [
                    { required: true, message: '请输入密码', trigger: 'blue' }
                ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('成功!')
                } else {
                    this.$Message.error('失败!')
                }
            })
        }
    }
}
</script>
<style lang="less">
.admin-register {
    width: 100%;
    height: 100%;
    .formInline {
        width: 300px;
        margin: 0 auto;
        padding-top: 100px;
    }
}
</style>
