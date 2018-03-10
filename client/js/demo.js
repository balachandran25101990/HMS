type = ['', 'info', 'success', 'warning', 'danger'];


demo = {
    initPickColor: function() {
        $('.pick-class-label').click(function() {
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if (display_div.length) {
                var display_buttons = display_div.find('.btn');
                display_buttons.removeClass(old_class);
                display_buttons.addClass(new_class);
                display_div.attr('data-class', new_class);
            }
        });
    },
    initFormExtendedDatetimepickers: function(){
        $('.datetimepicker').datetimepicker({
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove',
                inline: true
            }
         });

        var FromEndDate = new Date();
         $('.datepicker').datetimepicker({
            format: 'DD/MM/YYYY',
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove',
                inline: true
            }
             //maxDate: FromEndDate
         });

         $('.timepicker').datetimepicker({
//          format: 'H:mm',    // use this format if you want the 24hours timepicker
            format: 'h:mm A',    //use this format if you want the 12hours timpiecker with AM/PM toggle
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove',
                inline: true

            }
         });
    },
    showNotification: function(message, type, icons) {
        types = ['','success','warning','danger','rose','primary'];
        $.notifyClose("all");
    	$.notify({
        	icon: icons,
        	message: message

        },{
            type: types[type],
            timer: 3000,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
    }
}

function LoadGif() {
    $("#divLoading").css("display", "");
    $("#imgLoadingGif").css("display", "");
}

function RemoveGif() {
    $("#divLoading").css("display", "none");
    $("#imgLoadingGif").css("display", "none");
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function isEvent(evt) {
    return false;
};

function DateValidation(startDate, endDate) {
    if (startDate == undefined && endDate == undefined) {
        demo.showNotification('Ensure the valid start date and end Date', 3, 'error');
        return false;
    }
    if (new Date(startDate) > new Date(endDate)) {
        demo.showNotification('End Date should be greater than start date', 3, 'error');
        return false;
    }
    return true;

};

function isFloatNumber(event) {

    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
}

function isDecimalNumber(obj) {
    var val = obj.value;
    val = val.replace(/[^0-9\.]/g, '');
    if (val.split('.').length > 2)
        val = val.replace(/\.+$/, "");
    obj.value = val;
}

function isRemoveSymbol(evt) {
   evt = (evt) ? evt : window.event;
   var charCode = (evt.which) ? evt.which : evt.keyCode;
   if (charCode == 126) {
       return false;
   }
   return true;
}