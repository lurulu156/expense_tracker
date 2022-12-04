module.exports = {
  ifEven: (conditional, options) => {
    if ((conditional % 2) == 0) {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  },
  select: (selected, option) => {
    return (selected == option) ? 'selected="selected"' : ''
  }
}