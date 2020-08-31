$(document).ready(function () {
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: "http://hotels.test/hotels/2/free-rooms",
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
        url: "http://hotels.test/hotel-types",
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
            url: "http://hotels.test/filtered-hotels",
            data: {
                'from': $("#from-date").val(),
                'to': $("#to-date").val(),
                'adults': $("#adults").val(),
                'children': $("#children").val(),
                'type': $("#type").val()
            },
        })
            .done(function (response) {
                for (let [hotelKey, value] of Object.entries(response.hotels)) {
                    $('.hotels').append(`<div class="col-md-12 mt-3">
                                                <div class="col-md-6 float-left">
                                                    <h5 class='hotel-name font-weight-bold'>${value.name}</h5>
                                                    <div class="rooms-${hotelKey}">
                                                        <div class="title font-weight-bold">Rooms</div>
                                                    </div>
                                                </div>
                                       
                                                <div class="col-md-6 float-right">
                                                    <div class="email">E-mail: ${value.email}</div>
                                                    <div class="phone">Tel: ${value.phone}</div>
                                                </div>
                                            </div>`)

                    for (let [key, room] of Object.entries(value.rooms)) {
                        $('.rooms-' + hotelKey).append(`<span>${room.name}</span><br>`)
                    }
                }
            })
            .fail(function (error) {
                for (let [key, value] of Object.entries(error.responseJSON.errors)) {
                    $('.errors').append(`<span class='feedback text-danger'>${value}</span><br>`)
                }
            });
    });
});