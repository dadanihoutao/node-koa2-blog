<template>
    <div class="admin-category-create">
        <Form ref="form" class="form" :model="form" :rules="ruleInline" label-position="left" :label-width="100" >
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
                key: ''
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
    created () {},
    methods: {
        handleSubmit () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$post('/api/category/add', this.form).then(res => {
                        if (res.code === 200) {
                            this.$Message.success('添加成功')
                            this.handleReset()
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
.admin-category-create {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 30px;
    .form {
        width: 600px;
    }
}
</style>
