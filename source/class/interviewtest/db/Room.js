qx.Class.define("interviewtest.db.Room", {
  extend: qx.core.Object,

  properties: {
    name: {
      check: "String",
      event: "changeName"
    },
    maxPeople: {
      init: 100,
      check: "Integer",
      event: "changeMaxPeople"
    }
  },

  members: {
    loadFromJson(data) {
      this.set(data);
    },

    saveToJson() {
      return {
        name: this.getName(),
        maxPeople: this.getMaxPeople()
      };
    }
  }
});
