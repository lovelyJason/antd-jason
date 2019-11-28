import React from 'react'
import { Form, Input, Select, TreeSelect, Button, Row, Col, message } from 'antd'
import './style/form.scss'
// import context from './context'
import store from './store'
import { connect } from 'react-redux'

const FormItem = Form.Item

@Form.create()
class ListForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            control: null,
            formItems: null,
            formType: this.props.formType
        }
    }
    static listFormStore = store
    componentDidMount() {
        console.log('form mounted')
        // 导出api
        this.props.getFormApis ? this.props.getFormApis(this.props.form) : void(0)
        // 获取下拉列表
        this.getSelectList()

    }
    componentWillMount() {
        console.log('form willMount')
        const action = {
            type: 'transmit_form_api',
            value: this.props.form
        }
        store.dispatch(action)
    }
    componentDidUpdate() {
        console.log('form updated')
    }
    // 获取select列表
    getSelectList() {
        const showSelectOption = this.props.showSelectOption
        if (!showSelectOption) return
        let formType = JSON.parse(JSON.stringify(this.state.formType))
        showSelectOption.forEach((val, index) => {
            // console.log(val)
            if (val) {
                if (Array.isArray(val)) {
                    // option的数据extend至formType
                    formType[index].list = val
                    this.setState({ formType })
                    return
                }
                let { ajax, data } = val
                ajax(data).then(res => {
                    formType[index].list = [{ id: 1, name: 'zs' }, { id: 2, name: 'ls' }]
                    if (index === formType.length - 1) {
                        this.setState({
                            formType
                        })
                    }
                }).catch(error => {
                    message.error(error.message || '系统异常')
                    // TODO:debugger
                    formType[index].list = [{ id: 1, name: 'zs' }, { id: 2, name: 'ls' }]
                    if (index === formType.length - 1) {
                        this.setState({
                            formType
                        })
                    }
                })


            }
        })
    }
    renderControl(control, index) {
        let Option = null
        // 页面初次挂载时没有经过ajax
        if (control === 2 && this.state.formType[index].list) {
            Option = this.state.formType[index].list.map((val) => {
                return <Select.Option value={val.name} key={val.id}>{val.name}</Select.Option>
            })
        }
        switch (control) {
            case 1:
                return <Input />
            case 2:
                return <Select>{Option}</Select>
            case 3:
                return <TreeSelect />
            default:
                return <Input />
        }
    }
    // debugger
    handleClick() {
        console.log(this.props.form.validateFields)
        this.props.form.validateFields((errors, values) => {
            console.log(errors, values)
            if (errors) return

        })
    }
    onSearch() {
        this.props.form.validateFields((errors, values) => {
            if(errors) return
            let { ajax,data=null } = this.props.onSubmit
            let postData = data ? data : values
            ajax(postData).then(res => {
                // TODO:导出tableData
                res = [{name: 'zs',age: 18,gender: '男'}]
                this.props.getTableData(res)
            }).catch(error => {
                message.error(error.message || '系统异常')
                //TODO:debugger
                let res = [{name: 'zs',age: 18,gender: '男'}]
                this.props.onSearch(res)
            })
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const formType = this.props.formType
        let formItems = formType.map((val, index) => {
            return (
                <Col xs={24} sm={12} md={8} key={index}>
                    <FormItem label={val.label}>
                        {getFieldDecorator(`${val.id}`, {
                            rules: [{ required: true, message: `${val.label}为必填` }]
                        })(
                            this.renderControl(val.control, index)
                        )}
                    </FormItem>
                </Col>
            )
        })
        return (
            <div className="list-form">
                {/* 每行三个表单元素 */}
                <Form {...formItemLayout}>
                    <Row className="row">
                        {/* 动态生成 */}
                        {/* {this.state.formItems} */}
                        {formItems}

                        {/* 隐藏域,如业务id等 */}
                        {this.props.children}
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={this.onSearch.bind(this)} style={{ marginLeft: 20 }}>查询</Button>
                            {
                                this.props.export &&
                                <Button type="primary"  style={{ marginLeft: 20 }}>导出</Button>
                            }
                        </Col>
                    </Row>
                </Form>

            </div>
        )
    }
}

// export default connect(mapStateToProps,mapDispatchToProps)(ListForm)
export default ListForm