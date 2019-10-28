const Group = require('../server/models/Group')
const Student = require('../server/models/Student')
exports.seed = async function () {
  // Deletes ALL existing entries
  // Inserts seed entries


  await Group.query().upsertGraph([
    { "id": 1, name: 'CS' },
    { "id": 2, name: 'IS' }], { insertMissing: true });
  await Group.query().upsertGraph(
    [{ "id": 3, name: "5th Sem", parent_group: 1 }], { insertMissing: true });
  await Group.query().upsertGraph([
    { "id": 4, name: "C", parent_group: 3 }]
    , { insertMissing: true })
  let c_section = await Group.query().where({ id: 4 });
  c_section = c_section[0]
  let students = await Student.query()
  await c_section.$relatedQuery('students').unrelate()
  Promise.all(students.map(async student => {
    await c_section.$relatedQuery('students').relate(student.id)
  })).catch(console.error)

};
