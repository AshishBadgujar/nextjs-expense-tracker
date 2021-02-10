import React,{useEffect,useRef} from 'react';
import {CardContent,CardActionArea,Card, Typography } from '@material-ui/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default function AnguChart({total}) {
    const angu=useRef(null);

    useEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.GaugeChart);
    // Create axis
    let axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 300;
    axis.strictMinMax = true;
    // Set inner radius
    chart.innerRadius = -20;
    // Add ranges
    let range = axis.axisRanges.create();
    range.value = 0;
    range.endValue = 100;
    range.axisFill.fillOpacity = 1;
    range.axisFill.fill = am4core.color("#2ef356");
    range.axisFill.zIndex = - 1;

    let range2 = axis.axisRanges.create();
    range2.value = 100;
    range2.endValue = 200;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = am4core.color("#DBD56E");
    range2.axisFill.zIndex = - 1;

    let range3 = axis.axisRanges.create();
    range3.value = 200;
    range3.endValue = 300;
    range3.axisFill.fillOpacity = 1;
    range3.axisFill.fill = am4core.color("#f3384a");
    range3.axisFill.zIndex = - 1;
    // Add hand
    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.value = total;
   
    hand.pin.disabled = false;
    hand.fill = am4core.color("#2D93AD");
    hand.stroke = am4core.color("#2D93AD");
    // hand.innerRadius = am4core.percent(50);
    // hand.radius = am4core.percent(80);
    // hand.startWidth = 15;

    angu.current = chart;
    return () => {
        chart.dispose();
    };
}, [total]);

    return (
        <Card elevation={0}>
            <CardActionArea>
                <CardContent>
                <Typography variant="h4" align="center">
                    Daily expense meter
                </Typography>
                    <div id="chartdiv" style={{ width: "100%", height: '300px',marginTop:"20px",marginBottom:"20px" }}></div>
                </CardContent>  
            </CardActionArea>
        </Card>
    )
}
