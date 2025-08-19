module.exports = (temp, obj) => {
    let output = temp.replaceAll('{%PRODUCTNAME%}', obj.productName);
    output = output.replaceAll('{%IMAGE%}', obj.image);
    output = output.replaceAll('{%FROM%}', obj.from);
    output = output.replaceAll('{%NUTRIENTS%}', obj.nutrients);
    output = output.replaceAll('{%QUANTITY%}', obj.quantity);
    output = output.replaceAll('{%PRICE%}', obj.price);
    output = output.replaceAll('{%ID%}', obj.id);
    output = output.replaceAll('{%DESCRIPTION%}', obj.description);
    if (!obj.organic) output = output.replaceAll('{%NOT_ORGANIC%}', 'not-organic');
    return output
}

//its nameless because, we will import it using a variable