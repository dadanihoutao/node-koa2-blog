<template>
    <div class="admin-category-create">
        <Form class="form" :model="form" label-position="left" :label-width="100" >
            <FormItem label="分类名称">
                <Input v-model="form.name"></Input>
            </FormItem>
            <FormItem label="分类关键字">
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
            }
        }
    },
    created () {},
    methods: {
        handleSubmit () {
            this.$post('/api/category/add', this.form).then(res => {
                if (res.code === 200) {
                    this.$Message.success('添加成功')
                    this.handleReset()
                } else {
                    this.$Message.error(res.msg)
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
