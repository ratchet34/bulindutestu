const reduceField = (field) => {
    return (field === null || field === undefined ? null:field.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
}

module.exports = { reduceField }