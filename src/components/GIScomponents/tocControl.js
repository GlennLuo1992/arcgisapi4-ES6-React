import React from "react";
import {Checkbox, Menu} from "antd";
const undisplayedLayers=[];


export class TocControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: []
        };
    }

    onChange = (e) => {
        if (e.target.checked === true) {
            let sublayer = this.props.mapImageLayer.findSublayerById(parseInt(e.target.id));
            sublayer.visible = true;
            if (undisplayedLayers.includes(e.target.id)) {
                undisplayedLayers.remove(e.target.id);
            }
            this.props.emitter.emit('tocDisplayOnChange',undisplayedLayers);
        }
        else {
            let sublayer = this.props.mapImageLayer.findSublayerById(parseInt(e.target.id));
            sublayer.visible = false;
            if (undisplayedLayers.includes(e.target.id) === false) {
                undisplayedLayers.push(e.target.id);
            }
            this.props.emitter.emit('tocDisplayOnChange',undisplayedLayers);
        }
    };

    componentDidMount() {
        this.props.mapImageLayer.when(() => {
            let layerCollection = this.props.mapImageLayer.allSublayers;
            let titleList = [];
            let idList = [];
            let items = [];
            layerCollection.forEach(function (sublayer) {
                titleList.push(sublayer.title);
                idList.push(sublayer.id);
            });
            for (let i = 0; i < layerCollection.length; i++) {
                items.push(
                    <Menu.Item key={i + 1}>
                        <Checkbox id={idList[i].toString()} defaultChecked={true} onChange={this.onChange}>
                            {titleList[i]}
                        </Checkbox>
                    </Menu.Item>);
            }
            this.setState({
                menuItems: items
            });
            this.props.emitter.emit('GotSublayers_1',layerCollection);
            this.props.emitter.emit('GotSublayers_2',layerCollection);
        });
    }
    render() {

        return (
            <div>
                <Menu id="toc"
                      mode="inline"
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['sub1']}
                      style={{height: '100%'}}
                >
                    {this.state.menuItems}
                </Menu>
            </div>
        );
    }
}

export default TocControl;