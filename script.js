$(document).ready(function () {
    let domain = "http://hotels.test/";

    $.ajax({
        type: "GET",
        dataType: 'json',
        url: domain + "all-days",
    })
        .done(function (response) {
            for (const [key, value] of Object.entries(response.data)) {
                $('.select-date select').append(`<option value="${value}">${value}</option>`);
            }
        })
        .fail(function (error) {
            console.log(error)
        });

    $.ajax({
        type: "GET",
        dataType: 'json',
        url: domain + "hotel-types",
    })
        .done(function (response) {
            for (const [key, value] of Object.entries(response.data)) {
                $('.select-type select').append(`<option value=${key}>${value}</option>`)
            }
        })
        .fail(function (error) {
            console.log(error)
        });

    $(".submit").click(function () {
        $('.hotels').empty();
        $('.errors').empty();

        $.ajax({
            type: "GET",
            dataType: 'json',
            url: domain + "filtered-hotels",
            data: {
                'from': $("#from-date").val(),
                'to': $("#to-date").val(),
                'adults': $("#adults").val(),
                'children': $("#children").val(),
                'type': $("#type").val()
            },
        })
            .done(function (response) {
                $('.hotels').append(response.content)
            })
            .fail(function (error) {
                for (let [key, value] of Object.entries(error.responseJSON.errors)) {
                    $('.errors').append(`<span class='feedback text-danger'>${value}</span><br>`)
                }
            });
    });
});