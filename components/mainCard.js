import React,{useEffect,useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CardActions,Typography,CardContent,CardActionArea,Card, Box, Divider } from '@material-ui/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const useStyles = makeStyles((theme) => ({
  root:{
    margin:20,
  },
   CardAction:{
       backgroundColor:"red",
       height:5,
       padding:0
   },
   CardContent:{
     display:"flex",
     flexDirection:"column",
     justifyContent:"space-around",
     alignItems:'center',
   }
  }));

export default function MainCard({heading,total,catData}) {
  const classes=useStyles();
  const chartDom = useRef(null);

    useEffect(() => {
      let chart = am4core.create(heading, am4charts.PieChart);
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "amount";
      pieSeries.dataFields.category = "category";

      // Let's cut a hole in our Pie chart the size of 30% the radius
      chart.innerRadius = am4core.percent(30);

      // Put a thick white border around each Slice
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      pieSeries.slices.template
        // change the cursor on hover to make it apparent the object can be interacted with
        .cursorOverStyle = [
          {
            "property": "cursor",
            "value": "pointer"
          }
        ];

      pieSeries.alignLabels = false;
      pieSeries.labels.template.bent = true;
      pieSeries.labels.template.radius = 3;
      pieSeries.labels.template.padding(0,0,0,0);

      pieSeries.ticks.template.disabled = true;

      // Create a base filter effect (as if it's not there) for the hover to return to
      let shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
      shadow.opacity = 0;

      // Create hover state
      let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

      // Slightly shift the shadow and make it more prominent on hover
      let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
      hoverShadow.opacity = 0.7;
      hoverShadow.blur = 5;

      // Add a legend
      // chart.legend = new am4charts.Legend();

      chart.data = catData;
      chartDom.current=chart;
      return () => {
        chart.dispose();
      };
    }, [catData])
    
    return (
        <Card className={classes.root} elevation={0} >
        <CardActionArea>
            <CardContent className={classes.CardContent}>
              <Box>
                <Typography variant="h4">
                  {heading}
                </Typography>
                <Divider/>
                <Typography variant="h4">
                  ₹ {total} 
                </Typography>
              </Box>
              <Box>
                <div id={heading} style={{ width: "100%", height: '300px' }}></div>
              </Box>
            </CardContent>
          </CardActionArea>
      </Card>
    )
}
