qx.Class.define("interviewtest.db.Meeting", {
  extend: qx.core.Object,

  construct() {
    super();
    this.setPeople(new qx.data.Array());
  },

  properties: {
    roomName: {
      check: "String",
      event: "changeRoomName"
    },
    /** @type{qx.data.Array<interviewtest.Person>} */
    people: {
      check: "qx.data.Array",
      event: "changePeople"
    },
    when: {
      check: "Date",
      nullable: true,
      event: "changeWhen"
    }
  },

  members: {
    loadFromJson(data, db) {
      this.set({
        roomName: data.roomName
      });
      let people = this.getPeople();
      people.removeAll();
      data.people.forEach(data => {
        let person = db
          .getPeople()
          .find(person => person.getName() == data.person);
        if (person) people.append(person);
      });
      people.append(data.people);
    },

    saveToJson() {
      return {
        roomName: this.getRoomName(),
        people: this.getPeople().toArray()
      };
    }
  }
});
