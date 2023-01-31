/**
 * Manages a small database for the test
 */
qx.Class.define("interviewtest.db.Db", {
  extend: qx.core.Object,

  construct() {
    super();
    this.__people = new qx.data.Array();
    this.__rooms = new qx.data.Array();
    this.__meetings = new qx.data.Array();
  },

  events: {
    changePeople: "qx.event.type.Data",
    changeRooms: "qx.event.type.Data",
    changeMeetings: "qx.event.type.Data"
  },

  members: {
    // @type {qx.data.Array<interviewtest.db.Person>} people in the database
    __people: null,

    // @type {qx.data.Array<interviewtest.db.Room>} rooms in the database
    __rooms: null,

    // @type {qx.data.Array<interviewtest.db.Meeting>} booked meetings in the database
    __meetings: null,

    /**
     * Returns the people; you can manipulate this array directly, and then use `save` to persist your changes
     *
     * @returns {qx.data.Array<interviewtest.db.Person>}
     */
    getPeople() {
      return this.__people;
    },

    /**
     * Returns the rooms; you can manipulate this array directly, and then use `save` to persist your changes
     *
     * @returns {qx.data.Array<interviewtest.db.Room>}
     */
    getRooms() {
      return this.__rooms;
    },

    /**
     * Returns the rooms; you can manipulate this array directly, and then use `save` to persist your changes
     *
     * @returns {qx.data.Array<interviewtest.db.Meeting>}
     */
    getMeetings() {
      return this.__meetings;
    },

    /**
     * Wipes the database and starts with a fresh bootstrap
     */
    reset() {
      this.loadFromJson(interviewtest.db.Db.BOOTSTRAP_DATA);
    },

    /**
     * Loads the database from the browser's local storage
     *
     * @returns {Boolean} true if the data was loaded
     */
    load() {
      let storage = qx.bom.Storage.getLocal();
      let data = storage.getItem("interviewtest-db");
      if (!data) {
        this.loadFromJson(interviewtest.db.Db.BOOTSTRAP_DATA);
        return false;
      } else {
        this.loadFromJson(data);
        return true;
      }
    },

    /**
     * Saves the database to the browser's local storage
     *
     * @returns {Boolean} true if the data was loaded
     */
    save() {
      let storage = qx.bom.Storage.getLocal();
      let data = this.saveToJson();
      storage.setItem("interviewtest-db", data);
    },

    /**
     * Reads the database from JSON
     *
     * @param {Object} data the raw JSON
     */
    loadFromJson(data) {
      this.__people.removeAll();
      if (data.people) {
        data.people.forEach(data => {
          let person = new interviewtest.db.Person();
          person.loadFromJson(data);
          this.__people.push(person);
        });
      }
      this.__rooms.removeAll();
      if (data.rooms) {
        data.rooms.forEach(data => {
          let room = new interviewtest.db.Room();
          room.loadFromJson(data);
          this.__rooms.push(room);
        });
      }
      this.__meetings.removeAll();
      if (data.meetings) {
        data.meetings.forEach(data => {
          let meeting = new interviewtest.db.Meeting();
          meeting.loadFromJson(data);
          this.__meetings.push(meeting);
        });
      }
    },

    /**
     * Saves the database into raw JSON
     *
     * @returns {Object} the JSON
     */
    saveToJson() {
      return {
        people: this.__people.map(person => person.saveToJson()).toArray(),
        rooms: this.__rooms.map(room => room.saveToJson()).toArray(),
        meetings: this.__meetings.map(meeting => meeting.saveToJson()).toArray()
      };
    }
  },

  statics: {
    // This is used to bootstrap the database if there is nothing in the local storage
    BOOTSTRAP_DATA: {
      people: [
        {
          name: "John Lennon",
          email: "john@thebeatles.co.uk"
        },
        {
          name: "Paul McCartney",
          email: "paul@thebeatles.co.uk"
        },
        {
          name: "George Harrison",
          email: "george@thebeatles.co.uk"
        },
        {
          name: "Ringo Starr",
          email: "ringo@thebeatles.co.uk"
        }
      ],
      rooms: [
        {
          name: "Board Room",
          maxPeople: 40
        },
        {
          name: "Main Meeting Room",
          maxPeople: 5
        },
        {
          name: "Small Meeting Room",
          maxPeople: 3
        },
        {
          name: "Huddle Meeting Room",
          maxPeople: 2
        }
      ],
      meetings: [
        {
          roomName: "Board Room",
          people: ["John Lennon", "Paul McCartney"]
        },
        {
          roomName: "Huddle Meeting Room",
          people: ["George Harrison", "Ringo Starr"]
        }
      ]
    }
  }
});
