$(document).ready(function(){

var dataCorrente = moment('2018-01-01');

insertDays(dataCorrente);


// $('h1.month').html(dataCorrente.format('MMM') + ' ' + dataCorrente.format('YYYY'));

});

//** FUNZIONI

function insertDays(data){
    var month = data.format('MMMM');
    var year = data.format('YYYY');
    console.log(month + ' ' + year);
    $('h1.month').html(month + ' ' + year);

    var daysMonth = data.daysInMonth();
    console.log(daysMonth);

    for (var i = 1; i <= daysMonth; i++){
        var source = $("#days-template").html();
        var template = Handlebars.compile(source);

        // var context = {
        //     day: addZero(i),
        //
        //     month: month,
        //
        //     completeDate: year + '-' + month + '-' + addZero(i)
        // };
        //
        //
        // var html = template(context);
        // $('.month.list').append(html);
    }
}

function addZero(n){
    if(n < 10){
        return '0'+ n;
    } else {
        return n;
    }
}
