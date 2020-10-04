const React = require('react')
const ReactDOM = require('react-dom/server')

function render(Component, props) {
  const html = ReactDOM.renderToStaticMarkup(
    React.createElement(Component, props),
  )

  return `<!doctype html>${html}`
}

module.exports = { render }
