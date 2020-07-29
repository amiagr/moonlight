const express = require('express')
const logger = require('morgan')
const path = require('path')
const chalk = require('chalk')
const expressStatusMonitor = require('express-status-monitor')
const sass = require('node-sass-middleware')
const bodyParser = require('body-parser')
const app = express()

app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000)
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(expressStatusMonitor())
app.use(sass({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public')
}))

const Home = require('./home')

app.get('/', (req, res) => res.render('home'))
app.use('/', Home)

app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
