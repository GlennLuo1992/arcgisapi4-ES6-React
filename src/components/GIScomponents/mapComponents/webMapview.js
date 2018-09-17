import MapView from "esri/views/MapView";
import React from "react";
import IdentifyTask from "esri/tasks/IdentifyTask";
import IdentifyParameters from "esri/tasks/support/IdentifyParameters";
import arrayUtils from "dojo/_base/array"


//identifyTask
const identifyTask = new IdentifyTask();
//Identify的相关参数类
const params = new IdentifyParameters();
//视图
const view = new MapView();

export class WebMapView extends React.Component {


    componentDidMount() {

        view.map = this.props.webmap;
        view.container = this.mapDiv;
        view.ui.move("zoom", "bottom-right");
        this.onComponentLoad(view);
        view.on("click", function () {
            document.getElementById("searchReItem").style.visibility = "hidden";
        });

        view.when(() => {
            identifyTask.url = this.props.mapImageLayer.url;
            params.tolerance = 3;
            params.layerIds = [0, 1, 2, 3];
            params.layerOption = "top";
            params.width = view.width;
            params.height = view.height;
            view.on("click", this.executeIdentifyTask);
        });

    }

    onComponentLoad = (view) => {
        this.props.mapImageLayer.when(() => {
            view.goTo({target: this.props.mapImageLayer.fullExtent});//组件加载好之后有一个镜头移动的效果
        });
    };

    // Executes each time the view is clicked
    executeIdentifyTask = (event) => {
        console.log(event);
        // Set the geometry to the location of the view click
        params.geometry = event.mapPoint;
        params.mapExtent = view.extent;
        document.getElementById("MapView").style.cursor = "wait";

        // This function returns a promise that resolves to an array of features
        // A custom popupTemplate is set for each feature based on the layer it
        // originates from
        identifyTask.execute(params).then(function (response) {

            let results = response.results;

            return arrayUtils.map(results, function (result) {

                let feature = result.feature;
                let layerName = result.layerName;
                let attribute = feature.attributes;
                let content = "";
                feature.attributes.layerName = layerName;

                Object.keys(attribute).forEach(key => {
                    content += "<b>" + key + "</b>:&ensp;" + attribute[key] + "<br>"
                });

                feature.popupTemplate = {
                    title: layerName,
                    content: content
                };

                return feature;
            });
        }).then(showPopup); // Send the array of features to showPopup()

        // Shows the results of the Identify in a popup once the promise is resolved
        function showPopup(response) {
            if (response.length > 0) {
                view.popup.open({
                    features: response,
                    location: event.mapPoint
                });
            }
            document.getElementById("MapView").style.cursor = "auto";
        }
    };


    render() {
        return (
            <div className="webmap" align="center" id="MapView"
                 ref={
                     element => this.mapDiv = element
                 }>
            </div>
        );
    }
}