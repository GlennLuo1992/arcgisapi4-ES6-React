import React from "react";
import {Input, message} from 'antd';
import QueryTask from "esri/tasks/QueryTask";
import Query from "esri/tasks/support/Query";
import ResultList from "./searchReItem/resultList"

const Search = Input.Search;

export class searchInput extends React.Component {
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

    //执行查询
    doQuery = (value) => {
        message.config({
            top: 40
        });
        message.loading('正在查询中...');
        let Url = "";
        let data = [];
        let selectedLayer = this.state.selectedLayer;
        let selectedField = this.state.selectedField;
        let emmiter = this.props.emitter;
        if (this.state.selectedLayer !== "" && this.state.selectedField !== "") {
            this.state.LayersCol.forEach(sublayer => {
                if (sublayer.id === this.state.selectedLayer) {
                    Url = sublayer.url;
                }
            });
            let queryTask = new QueryTask({
                url: Url
            });
            let query = new Query();
            query.returnGeometry = true;
            query.outFields = ["*"];
            query.where = this.state.selectedField + " like '%" + value + "%'";
            queryTask.execute(query).then(function (results) {
                results.features.forEach(graphic => {
                    data.push(graphic.attributes)
                });
                message.destroy();
                if (data.length !== 0) {
                    emmiter.emit('GotResultData', data, selectedField, ResultList);
                    message.success("查询成功！", 3)
                }
                else {
                    message.warning("查询结果为空!", 3)
                }

            });


        }
        else {
            message.info('请选择需要查询的图层和字段！');
        }
    };

    render() {
        return (
            <Search
                placeholder="请输入需要查询的内容"
                onSearch={this.doQuery}
                style={{width: 200}}
            />

        );
    }
}

export default searchInput;