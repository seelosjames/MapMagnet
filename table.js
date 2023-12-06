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
          "Min Salary": parseFloat(d.PositionRemuneration[0].MinimumRange).toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
          "Max Salary": parseFloat(d.PositionRemuneration[0].MaximumRange).toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
          "Schedule": d.PositionSchedule[0].Name,
          "Open Date": new Date(d.PositionStartDate).toLocaleDateString(),
          "Closing Date": new Date(d.PositionEndDate).toLocaleDateString(),
          "Travel": d.TravelPercentage,
          "Remote": d.RemoteIndicator ? "True" : "False",
          "Relocation": d.Relocation,
          "Telework": d.TeleworkEligible ? "True" : "False",
          "URL": "<a target='_blank' rel='noopener noreferrer' href='"+d.PositionURI+"'>"+d.PositionURI+"</a>"
        }
      )
    ));
    
    return tabledata;

  }

  // Function to update the word cloud with new data
  function updateTable(newData) {
    console.log("TABLE")
    console.log(newData)
    dataset = formatTableData(newData);
    if(table && typeof table.destroy === 'function'){ 
      table.destroy();
      console.log("destroyed");
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
        {title:"ID", field:"ID", editor:false},
        {title:"Position Title", field:"Position Title", editor:false},
        {title:"Department", field:"Department", editor:false},
        {title:"Location", field:"Location", editor:false},
        {title:"Min Salary", field:"Min Salary", editor:false},
        {title:"Max Salary", field:"Max Salary", editor:false},
        {title:"Schedule", field:"Schedule", editor:false},
        {title:"Open Date", field:"Open Date", editor:false, sorter:"date"},
        {title:"Closing Date", field:"Closing Date", editor:false, sorter:"date"},
        {title:"Travel", field:"Travel", editor:false},
        {title:"Remote", field:"Remote", editor:false, sorter:"boolean"},
        {title:"Telework", field:"Telework", editor:false, sorter:"boolean"},
        {title:"Relocation", field:"Relocation", editor:false, sorter:"boolean"},
        {title:"URL", field:"URL", editor:false, formatter:"html"},
      ],
    });
  }

  // Expose the updateWordCloud function if you want to update the word cloud externally
  this.updateTable = updateTable;

}


