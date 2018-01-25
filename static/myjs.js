$(document).ready(function(){


var mymap = L.map('mapid').setView([28.6596 ,77.2317], 13);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic2F1bXlhLWJhbG9kaSIsImEiOiJjamJ4YWE2NWoyaXBwMnFrMXhmNDZ0eTd6In0.NN8hGk1M_e-vljzUGP8_DA'
}).addTo(mymap);
   
   // document.getElementById("val").addEventListener("click",click1);




function decode(data) {
  let x = document.createElement("abc");
  x.fontSize = "0px";
  x.innerHTML = data;
  return x.innerHTML;
}
  
    
        if(data != "") {
        data = decode(data);
        //console.log(data);
        //console.log(typeof(data));
        var data2=data.substr(1,data.length-2);
        //console.log(data2);
        data = JSON.parse(data2);
        //console.log(typeof(data));
        
        }
        //console.log("ddsj");
       
        // console.log(up_val,down_val);
        if(data[0].up_or_down==1)// up route
       
      {  

        var start=data[0].node;
        for(var k =0;k<data.length;k++)
          {
            // console.log("jkdfb");
            var marker = L.marker([data[k].latitude,data[k].longitude]).addTo(mymap);
  // console.log(data[k]);
            var circle = L.circle([data[k].latitude,data[k].longitude], {
              
            color: 'grey',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 200
            }).addTo(mymap);
            circle.bindPopup("Revenue generated: ");
            
            marker.bindPopup("Location: "+data[k].location.toString()+"<br>Time: "+data[k].timet+"<br>Instantaneous Speed of Bus : "+data[k].speed_bus_data.toPrecision(3)+" Km/hr "+"<br>Google API Expected Speed : "+((data[k].speed_google*3.6).toPrecision(3))+" Km/hr ").openPopup();
            // console.log(k);

            
  // console.log(k);
            if(data[k].node<=13 && data[k].node>start)
            {
              
               
              var latlngs = [[data[k].latitude,data[k].longitude],[data[k-1].latitude,data[k-1].longitude]];
                          // console.log(data[k].latitude,data[k].longitude,data[k].speed_google, latlngs);
              // console.log(data[k-1].dist);
              //console.log(data[k-1].speed_google);
              var polyline = L.polyline(latlngs, {color: color_display(data[k].diff,data[k-1].dist*16/data[k-1].speed_google), weight: 6}).addTo(mymap);

              
              // console.log("dgd");

              polyline.bindPopup(" ETA from Google API - "+(data[k-1].dist*16/data[k-1].speed_google).toPrecision(3)+" min"+"<br>Time Taken by Bus- "+data[k].diff+" min").openPopup();
              // console.log("dgd");

              // marker.bindPopup(tim1.v+"\n"+api[i-64][]).openPopup();
              }
              // console.log(k);
          }

      }

      else
      {
          var start=data[0].node;
        for(var k =0;k<data.length;k++)
          {
            // console.log("jkdfb");
            var marker = L.marker([data[k].latitude,data[k].longitude]).addTo(mymap);
  // console.log(data[k]);
            var circle = L.circle([data[k].latitude,data[k].longitude], {
              
            color: 'grey',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 200
            }).addTo(mymap);
            circle.bindPopup("Revenue generated: ");
            
            marker.bindPopup("Location: "+data[k].location.toString()+"<br>Time: "+data[k].timet+"<br>Instantaneous Speed of Bus : "+data[k].speed_bus_data.toPrecision(3)+" Km/hr "+"<br>Google API Expected Speed : "+((data[k].speed_google*3.6).toPrecision(3))+" Km/hr ").openPopup();
            // console.log(k);

            
  // console.log(k);
            if(data[k].node>1)
            {
              
               
              var latlngs = [[data[k].latitude,data[k].longitude],[data[k+1].latitude,data[k+1].longitude]];
                          // console.log(data[k].latitude,data[k].longitude,data[k].speed_google, latlngs);
              // console.log(data[k-1].dist);
              //console.log(data[k+1].diff);
              var polyline = L.polyline(latlngs, {color: color_display(data[k+1].diff,data[k+1].dist*16/data[k].speed_google), weight: 6}).addTo(mymap);

              
              // console.log("dgd");

              polyline.bindPopup(" ETA from Google API - "+(data[k+1].dist*16/data[k].speed_google).toPrecision(3)+" min"+"<br>Time Taken by Bus- "+data[k+1].diff+" min").openPopup();
              // console.log("dgd");

              // marker.bindPopup(tim1.v+"\n"+api[i-64][]).openPopup();
              }
              // console.log(k);
          }


      }



function color_display(a,b)
{

    if (a<b)
    {
        return 'green';
    }
    else
    {
        if(a-b>10)
            return 'brown';
        if(a-b>5)
            return 'red';
        else
            return 'yellow';
    }
}




});
