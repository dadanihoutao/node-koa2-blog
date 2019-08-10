<template>
    <div class="admin-register">
        <Form class="formInline" size="large" ref="formInline" :model="loginData" :rules="ruleInline">
            <FormItem prop="username">
                <Input type="text" v-model="loginData.username" placeholder="请输入用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="email">
                <Input type="text" v-model="loginData.email" placeholder="请输入邮箱">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
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
                <Button type="primary" @click="handleSubmit('formInline')">注册</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import _ from 'lodash'
export default {
    name: 'register',
    data () {
        return {
            loginData: {
                username: '',
                email: '',
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
                    if (this.loginData.password === this.loginData.duppassword) {
                        let form = _.cloneDeep(this.loginData)
                        delete form.duppassword
                        this.$post('/api/admin/register', this.loginData).then(res => {
                            console.log(res)
                            if (res.code === 200) {
                                this.$Message.success('注册成功')
                            } else {
                                this.$Message.error(res.msg)
                            }
                        })
                    } else {
                        this.$Message.error('两次输入的密码不相同')
                    }
                } else {
                    this.$Message.error('输入有误')
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
