import React from 'react'
import { Table } from 'antd'
import './style/table.scss'

class ListTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    componentDidMount() {
    }
    // 分页配置
    paginationConfig() {
        const self = this
        return {
            defaultPageSize: 10,
            total: this.state.total,
            current: this.state.currentPage,
            showQuickJumper: true,
            showSizeChanger: true,
            onChange(current) {
                self.setState({ currentPage: current }, () => {
                    self.getSource()
                })
            },
            showTotal(total) {
                return `共有${total}条`
            },
            onShowSizeChange(current, pageSize) {
                self.pageSize = pageSize
                self.setState({ currentPage: 1 }, () => {
                    self.getSource()
                })
            }
        }
    }
    render() {
        const dataSource = this.props.dataSource
        return (
            <div className="list-table">
                <Table
                    rowKey={record => record.id}
                    bordered
                    loading={dataSource.length === 0}
                    // columns={this.renderColumn()}
                    pagination={this.paginationConfig()}
                    {...this.props}
                />
            </div>
        )
    }
}

export default ListTable