qx.Class.define("interviewtest.db.Person", {
  extend: qx.core.Object,

  properties: {
    name: {
      check: "String"
    },
    email: {
      check: "String"
    }
  },

  members: {
    loadFromJson(data) {
      this.set(data);
    },

    saveToJson() {
      return {
        name: this.getName(),
        email: this.getEmail()
      };
    }
  }
});
