import React from "react";
import {Card, List, Modal} from "antd";

export class resultList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            selectedField: this.props.selectedField,
            visible: false,
            detail: [],
        };
    }

    showModal = (item) => {
        let content = [];
        Object.keys(item).forEach(key => {
            content.push(<p><b>{key}</b> : {item[key]}</p>)
        });
        this.setState({
            visible: true,
            detail: content
        });
    };


    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <Card>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item[this.state.selectedField]}
                            />
                            <a onClick={e => {
                                e.preventDefault();
                                this.showModal(item);
                            }}>详情</a>
                        </List.Item>
                    )}
                />
                <Modal
                    footer={null}
                    title="详细信息"
                    visible={this.state.visible}
                    cancelText="取消"
                    closable={true}
                    onCancel={this.handleCancel}
                >
                    {this.state.detail}
                </Modal>
            </Card>
        );
    }
}

export default resultList;