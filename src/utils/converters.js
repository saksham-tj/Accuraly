export function convertFilterObjects(filters) {
    let filterKeys = Object.keys(filters)
    // console.log(filterKeys)

    let filterValues = Object.values(filters)
    // console.log(filterValues)

    let filterQuery = {}

    filterKeys.forEach((key, i) => {
        filterValues.forEach((val, index) => {
            if (i === index) {
                filterQuery[key] = val.filterVal
            }

        })
    })
    return filterQuery
}

export function convertKeysToNames(key) {
    switch (key) {
      case "campaign_id":
        return "Id";
      case "name":
        return "Name";
      case "description":
        return "Description";
      case "start_time":
        return "Start Time";
      case "end_time":
        return "End Time";
      case "email":
        return "Email";
      case "phone":
          return "Phone";
      case "AssignPool":
          return "Assigned Pool"
      default:
        return key;
    }
  }
  