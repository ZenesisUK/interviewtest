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
    loadFromJson(data) {
      this.set({
        roomName: data.roomName
      });
      this.getPeople().removeAll();
      this.getPeople().append(data.people);
    },

    saveToJson() {
      return {
        roomName: this.getRoomName(),
        people: this.getPeople().toArray()
      };
    }
  }
});
