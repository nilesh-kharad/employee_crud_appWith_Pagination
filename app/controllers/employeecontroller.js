const db = require("../models");
const Employee = db.employees;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: employees } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, employees, totalPages, currentPage };
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Employee
    const employee = {
        name: req.body.name,
        address: req.body.address,
        company: req.body.company
    };

    // Save Employee in the database
    Employee.create(employee)
    .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Employee."
        });
      });
  };

  
  exports.findAll = (req, res) => {
    const { page, size, name } = req.query;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    const { limit, offset } = getPagination(page, size);
  
    Employee.findAndCountAll({ where: condition, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
  


  exports.findOne = (req, res) => {
    const id = req.params.id;
    Employee.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Employee with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Employee with id=" + id
        });
      });
  };


  exports.update = (req, res) => {
    const id = req.query.id;
    Employee.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Employee was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Employee with id=" + id
        });
      });
  };


  exports.delete = (req, res) => {
    const id = req.params.id;
    Employee.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Employee was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Employee with id=" + id
        });
      });
  };


  exports.deleteAll = (req, res) => {
    Employee.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Employee were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Employee."
        });
      });
  };


  