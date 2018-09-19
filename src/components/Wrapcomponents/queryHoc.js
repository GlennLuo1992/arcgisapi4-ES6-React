import React from "react";
import {message} from "antd";
import ResultList from "../GIScomponents/mapComponents/searchControl/searchReItem/resultList";
import QueryTask from "esri/tasks/QueryTask";
import Query from "esri/tasks/support/Query";

/*query所需参数：
*paras = ｛selectedLayer：需要被查询的图层id
  selectedField：需要被查询的字段名称
  LayersCol：sublayer的collection
  emitter：全局emitter
  value：查询关键字｝
  */
export function qDecorator(msg) {
    return (WrappedComponent) => {
        return class queryHoc extends React.Component {
            doQuery = (paras) => {
                message.config({
                    top: 40
                });
                message.loading('正在查询中...');
                let Url = "";
                let data = [];
                let selectedLayer = paras.selectedLayer;
                let selectedField = paras.selectedField;
                let LayersCol = paras.LayersCol;
                let emmiter = paras.emitter;

                if (selectedLayer !== "" && selectedField !== "") {
                    LayersCol.forEach(sublayer => {
                        if (sublayer.id === selectedLayer) {
                            Url = sublayer.url;
                        }
                    });
                    let queryTask = new QueryTask({
                        url: Url
                    });
                    let query = new Query();
                    query.returnGeometry = true;
                    query.outFields = ["*"];
                    query.where = selectedField + " like '%" + paras.value + "%'";
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
                // do something with this component
                console.log(msg);
                return (<WrappedComponent query={this.doQuery} {...this.props} />)
            }
        }
    }
}