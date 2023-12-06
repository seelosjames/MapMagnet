function table(data) {

  var table;
  var dataset = [];

  updateTable(data);

  function formatTableData(data) {
    var tabledata = [];

    data.forEach(d => (
      tabledata.push(
        {
          "ID": d.id,
          "Position Title": d.PositionTitle,
          "Department": d.DepartmentName,
          "Location": d.PositionLocationDisplay,
          "Min Salary": parseFloat(d.PositionRemuneration[0].MinimumRange),
          "Max Salary": parseFloat(d.PositionRemuneration[0].MaximumRange),
          "Schedule": d.PositionSchedule[0].Name,
          "Open Date": new Date(d.PositionStartDate).toLocaleDateString(),
          "Closing Date": new Date(d.PositionEndDate).toLocaleDateString(),
          "Travel": d.TravelPercentage,
          "Remote": d.RemoteIndicator,
          "Relocation": d.Relocation == "True" ? true : false,
          "Telework": d.TeleworkEligible,
          "URL": "<a target='_blank' rel='noopener noreferrer' href='"+d.PositionURI+"'>"+d.PositionURI+"</a>"
        }
      )
    ));
    
    return tabledata;

  }

  // Function to update the word cloud with new data
  function updateTable(newData) {
    dataset = formatTableData(newData);
    
    if(table && typeof table.destroy === 'function'){ 
      table.destroy();
    }

    table = new Tabulator("#bottom-container", {
      data: dataset,             //load row data from array
      layout: "fitColumns",      //fit columns to width of table
      responsiveLayout: "hide",  //hide columns that don't fit on the table
      addRowPos: "top",          //when adding a new row, add it to the top of the table
      history: true,             //allow undo and redo actions on the table
      pagination: "local",       //paginate the data
      paginationSize: 5,         //allow 7 rows per page of data
      paginationCounter: "rows", //display count of paginated rows in footer
      movableColumns: true,
      initialSort:[              //set the initial sort order of the data
          {column:"id", dir:"asc"},
      ],
      columnDefaults:{
          tooltip:true,         //show tool tips on cells
      },
      columns:[                 //define the table columns
        {title:"ID", field:"ID"},
        {title:"Position Title", field:"Position Title", headerFilter:"input"},
        {title:"Department", field:"Department", headerFilter:true},
        {title:"Location", field:"Location", headerFilter:"list", headerFilterParams:{values:{"Multiple Locations":"Multiple Locations", "":""}, clearable:true}},
        {title:"Min Salary", field:"Min Salary", hozAlign:"center", headerFilter:"number", headerFilterPlaceholder:"Maximum", headerFilterFunc:">="},
        {title:"Max Salary", field:"Max Salary", hozAlign:"center", headerFilter:"number", headerFilterPlaceholder:"Maximum", headerFilterFunc:"<="},
        {title:"Schedule", field:"Schedule", hozAlign:"center", headerFilter:"list", headerFilterParams:{values:{"Full-time":"Full-time", "Part-time":"Part-time", "Shift work":"Shift work", "Intermittent":"Intermittent", "Job sharing":"Job sharing", "Multiple schedules":"Multiple schedules", "":""}, clearable:true}},
        {title:"Open Date", field:"Open Date", sorter:"date", hozAlign:"center", headerFilter:"input"},
        {title:"Closing Date", field:"Closing Date", sorter:"date", hozAlign:"center", headerFilter:"input"},
        {title:"Travel", field:"Travel", headerFilter:"list", headerFilterParams:{values:{"Not required":"Not required", "Occasional travel":"Occasional travel", "25% or less":"25% or less", "50% or less":"50% or less", "75% or less":"75% or less", "76% or greater":"76% or greater", "":""}, clearable:true}},
        {title:"Remote", field:"Remote", sorter:"boolean", hozAlign:"center", formatter:"tickCross", headerFilter:"tickCross", headerFilterParams:{"tristate":true}},
        {title:"Telework", field:"Telework", sorter:"boolean", hozAlign:"center", formatter:"tickCross", headerFilter:"tickCross", headerFilterParams:{"tristate":true}},
        {title:"Relocation", field:"Relocation", sorter:"boolean", hozAlign:"center", formatter:"tickCross", headerFilter:"tickCross", headerFilterParams:{"tristate":true}},
        {title:"URL", field:"URL", editor:false, formatter:"html"},
      ],
    });
  }

  // Expose the updateWordCloud function if you want to update the word cloud externally
  this.updateTable = updateTable;

}


