import React from 'react';
import ReactDom from 'react-dom';
// import MyComponent from '../src/index'
// import { ListForm } from '../src/index'
import { ListForm } from '../dist/antd-jason.js'
import axios from 'axios'
// import '../node_modules/antd/dist/antd.less';
import '../src/components/List/style/antdStyle/index.min.css'
// console.log(ListForm)

function service(data) {
    return axios.post(`/api/getList`, data).then(res => {
        return res.data
    }).catch(error => {
        throw error
    })
}

function submit(data) {
    return axios.post(`/api/search`, data).then(res => {
        return res.data
    }).catch(error => {
        throw error
    })
}
class Demo extends React.Component {
    constructor(props) {
        super(props)
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
    }
    render() {
        return (
            <div>
                <h1>组件预览：</h1>
                <ListForm
                    showSelectOption={this.selectData}
                    formType={this.formType}
                    onSubmit={this.submitData} />
            </div>
        )
    }
}

ReactDom.render(<Demo />, document.getElementById('root'));