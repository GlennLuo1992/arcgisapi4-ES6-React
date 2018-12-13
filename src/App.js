import React from "react";

import {Layout, Menu} from 'antd';
const {Header, Content, Sider} = Layout;

import MapImageLayer from "esri/layers/MapImageLayer";
import WebMap from "esri/WebMap";
import TocControl from "./components/GIScomponents/tocControl";
import MapComponents from "./components/GIScomponents/mapComponents/mapComponents"
import {EventEmitter} from "fbemitter";

const emitter = new EventEmitter();


const mapImageLayer = new MapImageLayer({
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer"
});

const webmap = new WebMap({
    basemap: "satellite",
    layers: [mapImageLayer]
});

export class App extends React.Component{

    render() {
        return (
            <div>
                <Layout className="layout">
                    <Header>
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider id="LayerControl" width={240} style={{background: '#fff'}}>
                            <TocControl
                                mapImageLayer={mapImageLayer}
                                emitter={emitter}
                            />
                        </Sider>
                        <Content style={{background: '#fff', padding: 0, margin: 0}}>
                            <MapComponents
                                webmap={webmap}
                                mapImageLayer={mapImageLayer}
                                emitter={emitter}
                            />
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }

}