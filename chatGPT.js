function dispMsg(){
	alert('Hello')
}

function getValues(){
	var promptMsg = ""
	promptMsg = promptMsg + document.getElementById("apiName").value;
	promptMsg = promptMsg + document.getElementById("endPoint").value;
	promptMsg = promptMsg + document.getElementById("response").value;
	alert("getValues " + promptMsg)
}

function chSend() {

	document.getElementById("code").value = "Generating script";
	var apiKey = document.getElementById("apiKey").value;

	var promptMsg = "API Name : Nationalize \nEndpoint : https://api.nationalize.io/?name=nathaniel\nResponse : \n{\"country\":[{\"country_id\":\"GH\",\"probability\":0.224},{\"country_id\":\"PH\",\"probability\":0.084},{\"country_id\":\"NG\",\"probability\":0.073},{\"country_id\":\"US\",\"probability\":0.061},{\"country_id\":\"NE\",\"probability\":0.034}],\"name\":\"nathaniel\"}\n\nQ : Generate Karate automation script \nA : \nFeature: Nationalize\n\n  Scenario: Verify success status code of Nationalize\n    Given url 'https://api.nationalize.io/?name=nathaniel'\n    When method get\n    Then status 200\n\n  Scenario: Verify success response values of Nationalize\n    Given url 'https://api.nationalize.io/?name=nathaniel'\n    When method get\n    Then status 200\n    Then match response.['name'] contains 'nathaniel'\n\n  Scenario: Verify response format\n    Given url 'https://api.nationalize.io/?name=nathaniel'\n    When method get\n    Then status 200\n    And match response == { \"name\":'#string', \"country\": '#[]'}\n\n0816981\n\n"
	promptMsg = promptMsg + "API Name : " + document.getElementById("apiName").value + "\n";
	promptMsg = promptMsg + "Endpoint : " + document.getElementById("endPoint").value + "\n";
	promptMsg = promptMsg + "Response : " + document.getElementById("response").value + "\n";
	promptMsg = promptMsg + "Q : Generate Karate automation script \nA : \n";
	// alert(promptMsg)

  var sQuestion = promptMsg;

  var oHttp = new XMLHttpRequest();
  oHttp.open("POST", "https://api.openai.com/v1/completions");
  oHttp.setRequestHeader("Accept", "application/json");
  oHttp.setRequestHeader("Content-Type", "application/json");
  // oHttp.setRequestHeader("OpenAI-Organization","org-MnDXT8akexdY1wooQKSoZmHH")
  oHttp.setRequestHeader("Authorization", "Bearer " + apiKey);

  oHttp.onreadystatechange = function () {
    if (oHttp.readyState === 4) {
      //console.log(oHttp.status);
      var oJson = {}
      // if (txtOutput.value != "") txtOutput.value += "\n";

      var txtOutput="";

      try {
        oJson = JSON.parse(oHttp.responseText);
      } catch (ex) {
        txtOutput += "Error: " + ex.message
      }

      if (oJson.error && oJson.error.message) {
        txtOutput += "Error: " + oJson.error.message;
      } else if (oJson.choices && oJson.choices[0].text) {
        var s = oJson.choices[0].text;

        // if (selLang.value != "en-US") {
        //   var a = s.split("?\n");
        //   if (a.length == 2) {
        //     s = a[1];
        //   }
        // }

        if (s == "") s = "No response";
        txtOutput += "" + s;
        document.getElementById("code").value = txtOutput;
        // TextToSpeech(s);
      }      
    }
  };

  var sModel = "code-davinci-002";
  var iMaxTokens = 2048;
  var sUserId = "1";
  var dTemperature = 0.5;  

  var data = {
    model: sModel,
    prompt: sQuestion,
    max_tokens: iMaxTokens,
    user: sUserId,
    temperature: dTemperature,
    frequency_penalty: 0.0, //Number between -2.0 and 2.0 
                               //Positive values decrease the model's likelihood 
                               //to repeat the same line verbatim.
    presence_penalty: 0.0, //Number between -2.0 and 2.0. 
                               //Positive values increase the model's likelihood 
                               //to talk about new topics.
    stop: ["0816981"]        //Up to 4 sequences where the API will stop 
                               //generating further tokens. The returned text 
                               //will not contain the stop sequence.
  }

  oHttp.send(JSON.stringify(data));


  // if (txtOutput.value != "") txtOutput.value += "\n";
  // txtOutput.value += "Me: " + sQuestion;
  // txtMsg.value = "";
}
