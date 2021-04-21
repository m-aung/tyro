const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-17-updated');

Enzyme.configure({ adapter: new Adapter() });
module.exports = {
  testEnvironment: 'node',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  verbose: true,
};
