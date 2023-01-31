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

    /**
     * @Override
     */
    main() {
      super();

      // Initialise logging
      if (qx.core.Environment.get("qx.debug")) {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      // Initialise the database, loading it from local storage if possible
      let db = (this.__db = new interviewtest.db.Db());
      db.load();

      // Show what we've loaded
      this.dumpDatabase();

      // Setup the layout of the page
      let doc = this.getRoot();
      let root = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      doc.add(root, { left: 0, top: 0, right: 0, bottom: 0 });

      // Create a toolbar
      root.add(this.__createToolbar());

      // Now the main meetings editor
      let ed = new interviewtest.editors.MeetingsEditor();
      ed.set({
        db: db,
        value: db.getMeetings()
      });
      root.add(ed);
    },

    /**
     * Dumps the database to the console for debugging
     */
    dumpDatabase() {
      console.log("Database contains:");
      this.__db.getPeople().forEach(person => {
        console.log(
          `Person: ${person.getName()} (${person.getEmail()}) - ${person.toUuid()}`
        );
      });
    },

    /**
     * Creates the toolbar
     * @returns {qx.ui.toolbar.ToolBar}
     */
    __createToolbar() {
      let db = this.__db;
      let tb = new qx.ui.toolbar.ToolBar();

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
        this.dumpDatabase();
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
        this.dumpDatabase();
      });
      tb.add(btnResetDb);

      // Reset the database
      let btnSaveDb = new qx.ui.toolbar.Button("Save Database");
      btnSaveDb.addListener("click", () => {
        db.save();
        this.dumpDatabase();
      });
      tb.add(btnSaveDb);

      return tb;
    }
  }
});
