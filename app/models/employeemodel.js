module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employees", {
    name: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    company: {
      type: Sequelize.STRING
    }
  });
  return Employee;
};