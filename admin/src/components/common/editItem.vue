<!--
 * @Author: 时洋
 * @pageName: 'edit-item  编辑排序'
 * @Last Modified by:   时洋
 * @Last Modified time: 2019-03-05 16:58:08
 * @events  @on-change  修改结束后触发
   @props   canEdit 是否可以编辑,默认不可以编辑
            paramName 参数名
            row 排序所在对象全部数据
            rules 验证规则
            errorMsg 验证出错提示
 -->
<template>
    <div class="editItem">
        <div v-if="!row[`${paramName}Edit`]" class="item-normal">
            <span>{{ row[paramName] }}</span>
            <Button v-if="canEdit" @click="showEdit(row, paramName)" type="text" icon='md-create'></Button>
        </div>
        <div v-else class="item-edit">
            <Form :ref="paramName+row.id" :model="row" @keydown.native.enter.prevent="keyDownEvent">
                <FormItem :prop="paramName" :rules="rules">
                    <Input :size="size" class="item-edit-input" v-model="row[paramName]" @on-enter="edit()" />
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import edit from '@/mixins/edit'
export default {
    name: 'editItem',
    mixins: [edit],
    props: {
        rules: {
            type: Array,
            default: () => { }
        },
        errorMsg: {
            type: String,
            default: '输入有误,请重新输入'
        },
        size: {
            type: String,
            default: 'small'
        }
    },
    methods: {
        edit () {
            this.$refs[this.paramName + this.row.id].validate((valid) => {
                if (valid) {
                    this.$emit('on-change', this.row)
                } else {
                    this.$Message.error(this.errorMsg)
                }
            })
        }
    }
}
</script>
<style lang="less">
.editItem {
    .item-normal {
        display: inline-block;
        width: 100%;
    }
    .item-edit .ivu-form .ivu-form-item {
        margin-bottom: 0;
        .ivu-form-item-error-tip {
            display: none;
        }
    }
}
</style>
