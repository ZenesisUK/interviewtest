/**
 * Manages a small database for the test
 */
qx.Class.define("interviewtest.db.Db", {
  extend: qx.core.Object,

  construct() {
    super();
    this.__people = [];
    this.__rooms = [];
  },

  members: {
    // @type {interviewtest.db.Person[]} people in the database
    __people: null,

    // @type {interviewtest.db.Room[]} rooms in the database
    __rooms: null,

    /**
     * Returns the people; you can manipulate this array directly, and then use `save` to persist your changes
     *
     * @returns {interviewtest.db.Person[]}
     */
    getPeople() {
      return this.__people;
    },

    /**
     * Returns the rooms; you can manipulate this array directly, and then use `save` to persist your changes
     *
     * @returns {interviewtest.db.Room[]}
     */
    getRooms() {
      return this.__rooms;
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
      this.__people = [];
      data.people.forEach(data => {
        let person = new interviewtest.db.Person();
        person.loadFromJson(data);
        this.__people.push(person);
      });
      this.__rooms = [];
      data.rooms.forEach(data => {
        let room = new interviewtest.db.Room();
        room.loadFromJson(data);
        this.__rooms.push(room);
      });
    },

    /**
     * Saves the database into raw JSON
     *
     * @returns {Object} the JSON
     */
    saveToJson() {
      return {
        people: this.__people.map(person => person.saveToJson()),
        rooms: this.__rooms.map(room => room.saveToJson())
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
      ]
    }
  }
});
