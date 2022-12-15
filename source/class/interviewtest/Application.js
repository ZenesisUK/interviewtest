/* ************************************************************************

   Copyright: 2022 Zenesis Limited

   License: Proprietary

   Authors: 

************************************************************************ */

/**
 * This is the main application class of "interviewtest"
 *
 * @asset(interviewtest/*)
 */
qx.Class.define("interviewtest.Application", {
  extend: qx.application.Standalone,

  members: {
    // @type{interviewtest.db.Db} the database
    __db: null,

    main: function () {
      super();

      // Initialise logging
      if (qx.core.Environment.get("qx.debug")) {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      // Initialise the database, loading it from local storage if possible
      let db = (this.__db = new interviewtest.db.Db());
      db.load();

      function dumpDatabase() {
        console.log("Database contains:");
        db.getPeople().forEach(person => {
          console.log(
            `Person: ${person.getName()} (${person.getEmail()}) - ${person.toUuid()}`
          );
        });
      }

      // Show what we've loaded
      dumpDatabase();

      // Setup the layout of the page
      let doc = this.getRoot();
      let root = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      doc.add(root, { left: 0, top: 0, right: 0, bottom: 0 });

      // Create a toolbar
      let tb = new qx.ui.toolbar.ToolBar();
      root.add(tb);

      // Simple test of the database - add a person and save
      let btnTest = new qx.ui.toolbar.Button(
        "Add Person",
        "interviewtest/test.png"
      );
      btnTest.addListener("click", () => {
        let people = db.getPeople();
        let person = new interviewtest.db.Person().set({
          name: `Person #${people.length + 1}`,
          email: `person-${people.length + 1}@someplace.co.uk`
        });
        people.push(person);
        db.save();
        dumpDatabase();
      });
      tb.add(btnTest);

      // Reset the database
      let btnResetDb = new qx.ui.toolbar.Button(
        "Reset Database",
        "interviewtest/test.png"
      );
      btnResetDb.addListener("click", () => {
        db.reset();
        db.save();
        dumpDatabase();
      });
      tb.add(btnResetDb);
    }
  }
});
