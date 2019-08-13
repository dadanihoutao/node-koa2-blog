<template>
    <div class="admin-category-update">
        <Form ref="form" class="form" :model="form" label-position="left" :rules="ruleInline" :label-width="100" >
            <FormItem label="分类名称" prop="name">
                <Input v-model="form.name"></Input>
            </FormItem>
            <FormItem label="分类关键字" prop="key">
                <Input v-model="form.key"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit()">提交</Button>
                <Button @click="handleReset()" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
    data () {
        return {
            form: {
                name: '',
                key: '',
                id: ''
            },
            ruleInline: {
                name: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' }
                ],
                key: [
                    { required: true, message: '请输入关键字', trigger: 'blur' }
                ]
            }
        }
    },
    created () {
        this.getDetail()
    },
    methods: {
        getDetail () {
            this.$get('/api/category/detail/' + this.$route.query.id).then(res => {
                if (res.code === 200) {
                    this.form = res.data
                } else {
                    this.$Message.error(res.msg)
                }
            })
        },
        handleSubmit () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let params = { key: this.form.key, name: this.form.name }
                    let id = this.form.id
                    this.$put('/api/category/update/' + id, params).then(res => {
                        if (res.code === 200) {
                            this.$Message.success('更新成功')
                            this.$router.go(-1)
                        } else {
                            this.$Message.error(res.msg)
                        }
                    })
                }
            })
        },
        handleReset () {
            this.form = {
                name: '',
                key: ''
            }
        }
    }
}
</script>
<style lang="less">
.admin-category-update {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 30px;
    .form {
        width: 600px;
    }
}
</style>
