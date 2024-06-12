
const commonData = {
  devicePixelRatio: 2,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {   
    title: {
      display: true,
      color:'black',
      font: function (context){
        return getTitleFontStyle(context)
      },
      padding: {
        bottom: 10,
        top: 5,
      },
    },
    legend: {      
      display: false,
    },
    tooltip: {
      callbacks: {
        title: function (context) {
          // Return the custom x-axis label without 'X:' prefix
          return getCustomXLabel(context);
        },
      },
      titleFont:
      {
        size:getSize('tooltip')
      },
      bodyFont:
      {
        size:getSize('tooltip')
      }
    },
  },
  scales: {
    y: {
      grid: {
        display: false, // Hide y-axis grid lines
      },
      ticks: {
        // Include a dollar sign in the ticks
        callback: function (value, index, ticks) {
          if (value >= 10000000) {
            return `${value / 10000000} C`;
          } else if (value >= 100000) {
            return `${value / 100000} L`;
          } else if (value >= 1000) {
            return `${value / 1000} K`;
          }
          return Math.floor(value) === value ? value : ""; // Display only whole numbers
        },
        color: "black",
        font: function (context){
          return getLabelFontStyle(context)
        }
      },
    },
    x: {
      grid: {
        display: true, // Hide x-axis grid lines
      },
      ticks: {
        color: "black",
        font: function (context){
          return getLabelFontStyle(context)
        }
      },
    },
  },
};
export const subscriptionOption = {
  ...commonData,
  plugins: {
    ...commonData.plugins,
    title: { ...commonData.plugins.title, text: "Subscription" },
  },
};
export const redemptionOption = {
  ...commonData,
  plugins: {
    ...commonData.plugins,
    title: { ...commonData.plugins.title, text: "Redemption" },
  },
};
export const switchSubscriptionOption = {
  ...commonData,
  plugins: {
    ...commonData.plugins,
    title: { ...commonData.plugins.title, text: "Switch Subscription" },
  },
};
export const switchRedemptionOption = {
  ...commonData,
  plugins: {
    ...commonData.plugins,
    title: { ...commonData.plugins.title, text: "Switch Redemption" },
  },
};

export const barChartFileOption = {
  ...commonData,
};

export const pieChartFileOption = {
  devicePixelRatio:2,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {    
    legend: {
      display: false,
    },
    tooltip: {
      title:{
        display:false
      },
      callbacks: {
        label: function (context) {
          // Return the custom x-axis label without 'X:' prefix
          return `${context.label} : ${context.formattedValue}`;
        },
      },
    },
  },
};

function getCustomXLabel(context) {
  // Replace this with your custom logic to get the x-axis label based on the index
  var label = context[0].label;
  if (label === "Cash-Ind") {
    return "CASH-INDIVIDUAL";
  } else if (label === "Cash-Omni") {
    return "CASH-OMNIBUS";
  } else return label;
}
function getSize (type){
  let size;
  if(window.innerWidth >= 1800 && window.innerHeight >= 1200)
  {
   type === 'label' ? size = 16 : size = 18;
  }
  else if(window.innerWidth >= 1600 && window.innerHeight >= 1000)
    {
      type === 'label' ? size = 14 : size = 16;
    }
  else if(window.innerWidth >= 1400 && window.innerHeight >= 800)
    {
      type === 'label' ? size = 12 : size = 14;
    }
  else {
    type === 'label' ? size = 10 : size = 12;
  }
  return size;
}
function getLabelFontStyle(context) {      
    return {
      size:getSize('label'),
      family: "montserrat",
    }
}
function getTitleFontStyle(context) {

  return {
    size:getSize('title'),
    family: "montserrat",
    weight:500
  }
}
