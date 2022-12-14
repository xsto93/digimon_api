
const getParams = (color, cardnumber, type, set_name) => {

    const params = [];
    if(color) params.push({ color: { $regex: `${color}*`, $options: 'i'} })
    if(cardnumber) params.push({ cardnumber: { $regex: `${cardnumber}`, $options: 'i'} })
    if(type) params.push({ type:  { $regex: `${type}*`, $options: 'i'} })
    if(set_name) params.push({ set_name: { $regex: `${set_name}*`, $options: 'i'} });

    return params.length === 0 ? {} : { $and: params };
}


module.exports = getParams;
