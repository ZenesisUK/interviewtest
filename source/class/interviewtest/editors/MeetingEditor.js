qx.Class.define("interviewtest.editors.MeetingEditor", {
  extend: qx.ui.core.Widget,

  construct() {
    super();
    this._setLayout(new qx.ui.layout.Grid(5, 5));

    // valueController will make sure that changes to the Meeting object will be
    //  reflected in the widgets and vice versa
    let valueController = new qx.data.controller.Object();
    this.bind("value", valueController, "model");

    /*
     * Room Name
     */
    this._add(new qx.ui.basic.Label("Room Name : "), { row: 0, column: 0 });

    let cbo = new qx.ui.form.ComboBox();
    this._add(cbo, { row: 0, column: 1 });

    // This list controller will make sure that the drop down list is always up to date
    let ctlr = new qx.data.controller.List(null, cbo, "roomName");
    this.bind("db.rooms", ctlr, "model");

    valueController.addTarget(cbo, "value", "roomName", true);
  },

  properties: {
    /** Database to use */
    db: {
      nullable: true,
      check: "interviewtest.db.Db",
      event: "changeDb"
    },

    /** The meeting being edited */
    value: {
      init: null,
      nullable: true,
      check: "interviewtest.db.Meeting",
      event: "changeValue"
    }
  },

  members: {}
});
