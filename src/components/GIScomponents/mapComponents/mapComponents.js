import React from 'react';
import {WebMapView} from './webMapview';
import SearchControl from './searchControl/searchControl';


export class mapComponents extends React.Component {

    render() {
        return (
            <div>
                <div className="main">
                    <WebMapView
                        emitter={this.props.emitter}
                        webmap={this.props.webmap}
                        mapImageLayer={this.props.mapImageLayer}
                    />
                    <SearchControl
                        emitter={this.props.emitter}
                    />
                </div>
            </div>
        );
    }
}

export default mapComponents;
