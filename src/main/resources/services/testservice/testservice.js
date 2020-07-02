var counter = 0;

// NOTE: This service can be accessed like this 
// http://<host>:<port>/_/service/com.intervest.wapp.web/testservice
exports.get = function(req) {
  counter++;

  return {
    body: {
      time: new Date(),
      counter: counter
    },
    contentType: 'application/json'
  };

};


/*
// how to call service in the another app
// Reference: https://buildmedia.readthedocs.org/media/pdf/xp/6.12/xp.pdf (66page)
  <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <content-type>
    <display-name>Custom Selector</display-name>
    <super-type>base:structured</super-type>
    <form>
    <input name="my-custom-selector" type="CustomSelector">
    <label>My Custom Selector</label>
    <occurrences minimum="0" maximum="0"/>
    <config>
      <service>com.myapplication.app:my-custom-selector-service</service>
    </config>
    </input>
    </form>
  </content-type>
*/
