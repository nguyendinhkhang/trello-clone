const sortByOrder = (arr, order, key) => {
  const newArray = [...arr]
  return newArray.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]))
}

export default sortByOrder