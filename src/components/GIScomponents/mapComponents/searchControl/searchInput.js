import React from "react";
import {Input} from 'antd';
import {qDecorator} from "src/components/Wrapcomponents/queryHoc"

const Search = Input.Search;

@qDecorator("qDecorator")
class searchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLayer: "",
            selectedField: "",
            LayersCol: [],
        };
        //获取选择到的信息(图层ID和字段名称)
        this.props.emitter.addListener('GotSelectedProps', this.setSelectedProps);
        //Layer加载好之后获取Collection
        this.props.emitter.addListener('GotSublayers_2', this.getLayers);
    }


    getLayers = (collection) => {
        this.setState({
            LayersCol: collection
        });
    };


    setSelectedProps = (layerID, fieldName) => {
        this.setState({
            selectedLayer: layerID,
            selectedField: fieldName,
        });
    };
    render() {
        return (
            <Search
                placeholder="请输入需要查询的内容"
                onSearch={value => {
                    let paras = {
                        selectedLayer: this.state.selectedLayer,
                        selectedField: this.state.selectedField,
                        LayersCol: this.state.LayersCol,
                        emitter: this.props.emitter,
                        value: value
                    };
                    this.props.query(paras);
                }}
                style={{width: 200}}
            />

        );
    }
}

export default searchInput;