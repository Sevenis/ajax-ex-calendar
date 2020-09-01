$(document).ready(function(){

//dataInizio è un oggetto
// var dataInizio = moment('2018-01-01');
var dataInizio = moment($('h1.month').attr('data-partenza'));

insertDays(dataInizio);
insertHolidays(dataInizio);

$('#next').click(function(){
    next(dataInizio);
})
$('#prev').click(function(){
    prev(dataInizio);
})

});

//** FUNZIONI

function insertDays(data){

    //svuotiamo la lista
    $('ul.month-list').empty();

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
            // abbiamo cambiato il formato del mese per renderlo compatibile con
            //il formato dell'API
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
                listItem.append(' - ' + risposta.response[i].name);
                listItem.addClass('festivo');
                console.log(listItem);
            }
        },
        error: function (richiesta, stato, errori) {
            alert("E' avvenuto un errore. " + errore);
        }
    });
}

function next(data) {
    if (data.month() == 11){
        alert('Non puoi andare oltre!');
    } else {
        // aggiungiamo un mese al nostro mese
        data.add(1, 'months');
        // rigeneriamo i nostri giorni sul mese
        insertDays(data);
        insertHolidays(data);
    }
}

function prev(data) {
    if (data.month() == 0){
        alert('Non puoi andare oltre!');
    } else {
        // aggiungiamo un mese al nostro mese
        data.subtract(1, 'months');
        // rigeneriamo i nostri giorni sul mese
        insertDays(data);
        insertHolidays(data);
    }
}

function addZero(n){
    if(n < 10){
        return '0'+ n;
    } else {
        return n;
    }
}
