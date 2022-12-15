qx.Class.define("interviewtest.db.Room", {
  extend: qx.core.Object,

  properties: {
    name: {
      check: "String"
    },
    maxPeople: {
      init: 100,
      check: "Integer"
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
