/**
 * @Author: 时洋
 * @Last Modified by: shiyang
 * @Last Modified time: 2019-07-19 23:40:19
 */
import Vue from 'vue'
import '../../my-theme/index.less'

import {
    Alert,
    AutoComplete,
    Avatar,
    BackTop,
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ButtonGroup,
    Card,
    Carousel,
    CarouselItem,
    Cascader,
    Checkbox,
    CheckboxGroup,
    Circle,
    Col,
    Collapse,
    ColorPicker,
    Content,
    DatePicker,
    Divider,
    Drawer,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Footer,
    Form,
    FormItem,
    Header,
    Icon,
    Input,
    InputNumber,
    Scroll,
    Sider,
    Submenu,
    // Layout,
    LoadingBar,
    Menu,
    MenuGroup,
    MenuItem,
    Message,
    Modal,
    Notice,
    Option,
    OptionGroup,
    Page,
    Panel,
    Poptip,
    Progress,
    Radio,
    RadioGroup,
    Rate,
    Row,
    Select,
    Slider,
    Spin,
    Step,
    Steps,
    Switch,
    Table,
    Tabs,
    TabPane,
    Tag,
    Timeline,
    TimelineItem,
    TimePicker,
    Tooltip,
    Transfer,
    Tree,
    Upload
} from 'iview'
// iview基础模块
const components = {
    Alert,
    AutoComplete,
    Avatar,
    BackTop,
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ButtonGroup,
    Card,
    Carousel,
    CarouselItem,
    Cascader,
    Checkbox,
    CheckboxGroup,
    Col,
    Collapse,
    ColorPicker,
    Content,
    DatePicker,
    Divider,
    Drawer,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Footer,
    Form,
    FormItem,
    Header,
    Icon,
    Input,
    InputNumber,
    Scroll,
    Sider,
    Submenu,
    // Layout,
    LoadingBar,
    Menu,
    MenuGroup,
    MenuItem,
    Message,
    Modal,
    Notice,
    Option,
    OptionGroup,
    Page,
    Panel,
    Poptip,
    Progress,
    Radio,
    RadioGroup,
    Rate,
    Row,
    Select,
    Slider,
    Spin,
    Step,
    Steps,
    Table,
    Tabs,
    TabPane,
    Tag,
    Timeline,
    TimelineItem,
    TimePicker,
    Tooltip,
    Transfer,
    Tree,
    Upload
}

const iviewModule = {
    ...components,
    // 不能和html标签重复的组件，添加别名(除了Switch、Circle在使用中必须是iSwitch、iCircle,其他都可以不加"i")
    iButton: Button,
    iCircle: Circle,
    iCol: Col,
    iContent: Content,
    iForm: Form,
    iFooter: Footer,
    iHeader: Header,
    iInput: Input,
    iMenu: Menu,
    iOption: Option,
    iProgress: Progress,
    iSelect: Select,
    iSwitch: Switch,
    iTable: Table
}
// 循环注册全局组件
Object.keys(iviewModule).forEach((key) => {
    Vue.component(key, iviewModule[key])
})
// Vue.component('yLayout', (resolve) => require([ '@/components/home/layout.vue' ], resolve))
Vue.component('ySingleUpload', (resolve) => require([ '@/components/common/singleUpload.vue' ], resolve))
Vue.component('yImg', (resolve) => require([ '@/components/common/img.vue' ], resolve))
Vue.component('ySpinShow', (resolve) => require([ '@/components/common/spinShow.vue' ], resolve))
Vue.component('yTooltipCell', (resolve) => require([ '@/components/common/tooltipCell.vue' ], resolve))

// 将iview模块挂载到vue对象上去
Vue.prototype.$Loading = LoadingBar
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.prototype.$Notice = Notice
Vue.prototype.$Spin = Spin
