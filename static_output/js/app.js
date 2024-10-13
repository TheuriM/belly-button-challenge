// Build the metadata panel
function metaPanel(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata; 

    // Filter the metadata for the object with the desired sample number
    let sampleNumber = metadata.filter(sampleObj => sampleObj.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    let PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata

    PANEL.html("");
    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (let i = 0; i < sampleNumber.length; i++) {
      Object.entries(sampleNumber[i]).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    }
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    sampleData = data.samples;

    // Filter the samples for the object with the desired sample number
    let numberArray = samplesData.filter(sampleObj => sampleObj.id == sample);


    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = resultArray[0].otu_ids;
    let otu_labels = resultArray[0].otu_labels;
    let sample_values = resultArray[0].sample_values;

    // Build a Bubble Chart
    let bubbleData = {
      mode: "markers",
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "purple"
      }
    };

    // creating the bubble chart layout
    let bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" },
      hovermode: "x"
      };

    // Render the Bubble Chart
      Plotly.newPlot("bubble",  bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
      let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barData = {
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    };
    // Create bar layout
    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      height: 500,
      width: 400,
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", [barData], barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let  names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown =  d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach((sample) =>{
      dropdown.append("option").text(sample).property('value', sample)
    });

    // Get the first sample from the list
    let  firstSample = names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSampleSample);
    buildMetadata(firstSampleSample)
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
