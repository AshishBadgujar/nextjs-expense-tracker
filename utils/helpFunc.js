export function DateSort(array) {
    let today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    let newArray = [];
    array.map(item => {
        if (item._id == `${dd}/${mm}/${yyyy}`) {
            newArray = item.data
        } else {
            newArray = []
        }
    })
    return newArray;
}

export function DaySort(array) {
    let d = new Date(Date.now() - ((new Date().getDay()) * 24 * 60 * 60 * 1000));
    let newArray = [];
    array.forEach(item => {
        if (item._id == `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`) {
            newArray = item.days
        } else {
            newArray = []
        }
    });
    return newArray;
}

export function MonthDaysSort(array) {
    let newArray = [];
    let sum = 0;
    for (let m = 0; m < 12; m++) {
        array.forEach((item) => {
            if (item.month == m) {
                sum = sum + item.data.reduce((a, b) => a + b.amount, 0);
                if (newArray.some(sm => sm._id == item.month)) {
                    newArray[newArray.findIndex(sm => sm._id == item.month)] = { _id: item.month, total: sum }
                } else {
                    newArray.push({
                        _id: item.month,
                        total: sum
                    })
                }
            }
        })
    }
    return newArray;
}

export function CategorySort(array) {
    let newArray = [];
    let catArray = ['Food', 'Rent', 'College', 'Other']
    let sum = 0;
    catArray.forEach(cat => {
        array.forEach((item) => {
            if (item.category == cat) {
                sum = sum + item.amount;
                if (newArray.some(tm => tm.category == item.category)) {
                    newArray[newArray.findIndex(tm => tm.category == item.category)] = { category: item.category, amount: sum }
                } else {
                    newArray.push({
                        category: item.category,
                        amount: sum
                    })
                }
            }
        })
        sum = 0;
    })
    return newArray;
}

export function MonthCategorySort(array) {
    let d = new Date();
    let mm = d.getMonth()
    if (mm < 10) {
        mm = '0' + mm;
    }
    let daysData = [];
    array.forEach(item => {
        if (item.month == mm) {
            daysData = daysData.concat(item.data)
        }
    })
    let newArray = CategorySort(daysData);
    return newArray;
}

export function AllDaysCategorySort(array) {
    let daysDataArray = [];
    array.forEach(item => {
        daysDataArray = daysDataArray.concat(item.data)
    });
    let newArray = CategorySort(daysDataArray);
    return newArray;
}