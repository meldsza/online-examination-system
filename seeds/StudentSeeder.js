
const bcrypt = require('bcrypt')
const Student = require('../server/models/Student')
exports.seed = async function () {
  // Deletes ALL existing entries

  await Student.query().upsertGraph([
    { id: 1, name: 'Melroy', usn: '4nm17cs105', username: 'meldsza', email: 'meldsza@gmail.com', password: await bcrypt.hash('abcd@1234', 10) },
    { id: 2, name: 'Pratheek', usn: '4nm17cs129', username: 'pratheek', email: 'pratheekmr@gmail.com', password: await bcrypt.hash('abcd@1234', 10) },
  ], { insertMissing: true });
};
