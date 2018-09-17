import React from "react";
import {Cascader} from 'antd';

let initOptions = [];
const promisetest = function (name) {
    return new Promise((resolve, reject) => {
        if (name === 'Y') {
            let result = "yes";
            resolve(result);
        }
        else {
            let result = "no";
            reject(result);
        }
    })
};

export class searchSelect extends React.Component {
    constructor(props) {
        super(props);
        this.props.emitter.addListener('GotSublayers_1', this.initOptions);
        this.props.emitter.addListener('tocDisplayOnChange', this.toc2changeOptions);
        this.state = {
            options: []
        }
    }


    //初始化Options选项
    initOptions = (collection) => {
        collection.forEach(function (sublayer) {
            let option = {
                value: "",
                label: "",
                children: []
            };

            option.value = sublayer.id;
            option.label = sublayer.title;
            let childrenLists = [];
            let featureLayer = sublayer.createFeatureLayer();
            featureLayer.load().then(layer => {
                layer.fields.forEach(function (field) {
                        let childrenOption = {
                            value: "",
                            label: ""
                        };
                        childrenOption.value = field.name;
                        childrenOption.label = field.name;
                        childrenLists.push(childrenOption)
                    }
                );
            });
            option.children = childrenLists;
            initOptions.push(option);
        });
        this.setState({
            options: initOptions
        });
    };

    //toc图层选择控制Options选项
    toc2changeOptions = (willInvisiableLayers = []) => {
        let resultOptions = initOptions.clone();
        console.log(willInvisiableLayers);
        if (initOptions.length !== 0) {
            initOptions.forEach(function (option) {
                willInvisiableLayers.forEach(function (undisplayedID) {
                    if (option.value.toString() === undisplayedID.toString()) {
                        resultOptions.remove(option);
                    }
                });
            })
        }
        this.setState({
            options: resultOptions
        });
    };

    //选择好了需要查询的图层和字段
    onChange = (value) => {
        this.props.emitter.emit('GotSelectedProps', value[0], value[1]);
        promisetest('Y').then(result => console.log(result));
    };

    render() {
        return (
            <Cascader style={{width: 200}} options={this.state.options} onChange={this.onChange}
                      placeholder="请选择图层和字段" allowClear={false}/>
        );
    }
}

export default searchSelect;