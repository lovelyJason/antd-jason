方便开发者开发重复UI,减少网络请求以及页面组件堆叠的大量代码

## 特性

1.致力于组件的高内聚,低耦合,代码的复用性

2.快速开发通用的后台管理模块,全部组件基于antd的二次开发

3.布局灵活,自动响应式

4.若无必要,只需传入网络请求函数,自动加入请求队列,自动处理错误反馈

## 快速开始

```jsx
import { ListForm,ListTable } from 'antd-jason'
import { connect } from 'react-redux'

const store = ListForm.listFormStore

class Plugin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
        // 表单字段类型
        this.formType = [
            { control: 1, label: '日结单号', id: 'odd' },
            { control: 2, label: '影院名称', id: 'cinemaName' },
            { control: 1, label: '影院Id', id: 'cinemaId' },
            { control: 2, label: '所属院线', id: 'cinemaChain' },
        ]
        // 下拉选项的数据,每一项如果需要网络请求,传入对象,否则传入数组
        this.selectData = [
            null, [{ value: '影院1', name: '影院1', id: 1 }, { value: '影院2', name: '影院2', id: 2 }], null, { ajax: service, data: {} }
        ]
        // 查询筛选项的结果
        this.submitData = { ajax: submit }
    }
 
    getTableData(list) {
        this.setState({ list }, function () {
            console.log(list)
            this.props.form.setFieldsValue({'odd': '1511541'})
        })
    }
  	// 绑定antd form api
    getFormApis(func) {
        // this.listForm = func
    }
    render() {
        // const { getFieldDecorator } = this.listForm
        return (
            <div>
                <header>info</header>
                <ListForm
                    showSelectOption={this.selectData}
                    formType={this.formType}
                    onSubmit={this.submitData}
                    export={false}
                    getTableData={this.getTableData.bind(this)} 
                >
                    
                </ListForm>
                

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.listForm)
    return {
        form: state.listForm
    }
}
// export default Plugin
export default connect(mapStateToProps, null)(Plugin)

// 要在路由中导入Provieder并传递store
```

## api

- ListForm组件

  适用于根据筛选项的不同渲染表格数据的通用列表页,不用再花费大量精力收集表单值,完全配置式的写法

|       参数       |                             说明                             |          类型           | 默认值 |
| :--------------: | :----------------------------------------------------------: | :---------------------: | :----: |
|     formType     |               表单控件类型,1为Input,2为Select                |                         |   是   |
| showSelectOption |          自动发送ajax请求或者设置固定值给Select组件          |          Array          |   否   |
|   getTableData   |   筛选查询按钮自动触发该回调,参数一为表格渲染所需的数据源    | function(list,callback) |   是   |
|     onSubmit     | 筛选查询网络请求的参数,已经自动搜集了fieldsValue进行了提交,也可手动传入 |         Object          |   是   |
|   getFormApis    | 如有必要调用antd的表单api,如setFieldsValue,validateFields等,可以通过该函数获取,将form对象传入回调 |     function(apis)      |   否   |

注意: 组件自身状态依赖于redux.获取组件原生的antd form api还可通过react-redux的connect将form api映射到props上,如

```jsx
const mapStateToProps = (state) => {
    console.log(state.listForm)
    return {
        form: state.listForm
    }
}
// export default Com
export default connect(mapStateToProps, null)(Com)
```

此时就可以通过this.props调用组件内部api
