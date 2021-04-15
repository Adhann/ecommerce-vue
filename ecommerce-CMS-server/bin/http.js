if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}
const app = require('../app')
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('server running on port ' + PORT);
})