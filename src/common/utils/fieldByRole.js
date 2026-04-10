const fields = {
    admin: () => ({ }),
    staff: (id) =>( { assignedTo: id }),
    customer: (id) => ({ createdBy: id })
}

export default fields