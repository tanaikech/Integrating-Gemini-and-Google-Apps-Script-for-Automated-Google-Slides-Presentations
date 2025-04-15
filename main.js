function onOpen() {
  SlidesApp.getUi().createMenu("Open dialog").addItem("Open dialog", "openDialog").addToUi();
}

function openDialog() {
  const html = HtmlService.createTemplateFromFile("index");
  html.apiKey = PropertiesService.getScriptProperties().getProperty("apiKey") || "";
  SlidesApp.getUi().showModalDialog(html.evaluate().setWidth(1000).setHeight(1000), "Integrating Gemini and Google Apps Script for Automated Google Slides Presentations");
}

function doGemini(obj) {
  try {
    if (obj.apiKey && obj.apiKey != "") {
      PropertiesService.getScriptProperties().setProperty("apiKey", obj.apiKey);
    } else {
      throw new Error("Please set your API key and try again.");
    }
    const presentation = obj.presentationId ? SlidesApp.openById(obj.presentationId) : SlidesApp.getActivePresentation();
    obj.generateImage = obj.generateImage == "true" ? true : false;
    const object = { ...obj, presentation };
    if (obj.func == "generatePresentation") {
      new GeneratePresentation(object).run();
    } else if (obj.func == "replaceImages") {
      new GeneratePresentation(object).replaceTextWithImage();
    }
    return "Done.";
  } catch (e) {
    console.error(e.stack)
    return `Error: ${e.message}`;
  }
}
