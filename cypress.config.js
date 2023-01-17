const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
// import allureWriter from "@shelex/cypress-allure-plugin/writer";

module.exports = defineConfig({
    // e2e: {
    //     setupNodeEvents(on, config) {
    //         allureWriter(on, config);
    //         return config;
            
    //     }
    // }
    reporter: "cypress-mochawesome-reporter",
    reporterOptions:{
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  }, 
  e2e: {

    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      allureWriter(on, config);
      return config;
      //screenshotOnRunFailure=true;
    },
    
  },
  env: {

    sudan:"testing"
  },
    

});


// module.exports = defineConfig({
//   reporter: 'cypress-mochawesome-reporter', //for html reports
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//       require('cypress-mochawesome-reporter/plugin')(on);
//       allureWriter(on, config);
//       return config;
//       //screenshotOnRunFailure=true;
//     },
//   },
// });
