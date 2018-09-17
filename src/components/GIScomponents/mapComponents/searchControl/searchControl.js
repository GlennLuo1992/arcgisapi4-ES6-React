import React from "react";
import SearchReItem from "./searchReItem/searchReItem";
import SearchInput from "./searchInput";
import SearchSelect from "./searchSelect"

export class searchControl extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="search_controls">
                    <SearchSelect emitter={this.props.emitter}/>
                    <SearchInput  emitter={this.props.emitter}/>
                </div>
                <SearchReItem emitter={this.props.emitter}/>
            </div>
        );
    }
}

export default searchControl;