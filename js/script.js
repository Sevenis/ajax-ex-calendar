$(document).ready(function(){

//dataInizio è un oggetto
var dataInizio = moment('2018-01-01');

insertDays(dataInizio);
insertHolidays(dataInizio);


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
        var source = $("#day-template").html();
        var template = Handlebars.compile(source);

        var context = {
            day: addZero(i),

            month: month,

            completeDate: year + '-' + data.format('MM') + '-' + addZero(i)
        };

        console.log(context);

        var html = template(context);
        console.log(html);
        $('.month-list').append(html);
    }
}

function insertHolidays(data){
    $.ajax({
        url: 'https://flynn.boolean.careers/exercises/api/holidays',
        method: 'GET',
        data: {
            year: data.year(),
            month: data.month()
        },
        success: function(risposta){
            for (var i = 0; i < risposta.response.length; i++){
                var listItem = $('li[data-completa="'+ risposta.response[i].date + '"]');
                listItem.append('-' + risposta.response[i].name);
                listItem.addClass('festivo');
                console.log(listItem);
            }
        }



    });
}


function addZero(n){
    if(n < 10){
        return '0'+ n;
    } else {
        return n;
    }
}
