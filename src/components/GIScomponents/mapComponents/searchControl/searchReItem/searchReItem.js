import React from 'react';
import ReactDOM from "react-dom";

class searchReItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            data: [],
            selectedLayer: "",
            selectedField: "",
            visible: false,
            detail: [],

        };
        //当查询异步得到结果后：将结果载入表格
        this.props.emitter.addListener('GotResultData', this.setData);
    }

    //异步获得查询结果
    setData = (data = [], selectedField, render) => {
        this.setState({
            data: data,
            selectedField: selectedField
        });
        let Render = render;
        ReactDOM.unmountComponentAtNode(document.querySelector("#searchReItem"));
        ReactDOM.render(<Render data={this.state.data}
                                selectedField={this.state.selectedField}/>
            , document.querySelector("#searchReItem"));
        document.querySelector("#searchReItem").style.visibility = "visible";
    };

    render() {
        return (
            <div>
                <div className="results-container" id="searchReItem"/>
            </div>
        );
    }
}

export default searchReItem;