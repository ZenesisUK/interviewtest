qx.Class.define("interviewtest.editors.MeetingsEditor", {
  extend: qx.ui.core.Widget,

  construct() {
    super();
    this._setLayout(new qx.ui.layout.HBox(10));

    /*
     * The list of meetings
     */
    let lst = new qx.ui.form.List().set({
      minWidth: 300
    });
    this._add(lst);
    let ctlr = new qx.data.controller.List(null, lst, "roomName");
    let DF = new qx.util.format.DateFormat("dd MMM yyyy HH:mm");
    ctlr.set({
      labelOptions: {
        /**
         * Adds extra information to the item name
         * @param {String} data the original version that the controller was going to provide
         * @param {interviewtest.db.Meeting} model the orginal Meeting object
         * @param {*} source
         * @param {*} target
         */
        converter: function (data, model, source, target) {
          let str = model.getRoomName();
          let when = model.getWhen();
          return when ? str + " " + DF.format(when) : str;
        }
      }
    });

    // Make sure that changes to our "value" property are set in the controller
    this.bind("value", ctlr, "model");

    // Also make sure that we have an up-to-date "currentMeeting" property
    ctlr.addListener("changeSelection", () => {
      let sel = ctlr.getSelection();
      let item = sel.getLength() ? sel.getItem(0) : null;
      this.setCurrentMeeting(item);
    });

    /*
     * Meeting editor
     */
    let ed = (this.__meetingEditor = new interviewtest.editors.MeetingEditor());
    ed.set({
      visibility: "excluded"
    });
    this.bind("db", ed, "db");
    this._add(ed);
  },

  properties: {
    /** Database to use */
    db: {
      nullable: true,
      check: "interviewtest.db.Db",
      event: "changeDb"
    },

    /**
     * The array of meetings to show on screen
     * @type{qx.data.Array<interviewtest.db.Meeting>}
     */
    value: {
      init: null,
      nullable: true,
      check: "qx.data.Array",
      event: "changeValue"
    },

    /** The currently selected meeting in the list  */
    currentMeeting: {
      init: null,
      nullable: true,
      check: "interviewtest.db.Meeting",
      event: "changeCurrentMeeting",
      apply: "_applyCurrentMeeting"
    }
  },

  members: {
    __meetingEditor: null,

    _applyCurrentMeeting(value, oldValue) {
      this.__meetingEditor.set({
        visibility: value ? "visible" : "excluded",
        value: value
      });
    }
  }
});
