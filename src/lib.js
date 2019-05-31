
window.Collect = function(form)
{
    var data = {};

    form.find('input:visible, textarea:visible').each(function() {
        var value = "";
        var name = $(this).attr('name');

        if (name)
        {
            if ($(this).is('[type=checkbox]'))
            {
                value = Number($(this).is(':checked'));

                if (data[name] != undefined)
                    data[name] = data[name] + "," + value;
                else
                    data[name] = value;
            }
            else if($(this).is('[type=radio]'))
            {
                if ($(this).is(':checked'))
                {
                    value = $(this).val();
                    data[name] = value;
                }
            }
            else
            {
                value = $(this).val();
                data[name] = value;
            }
        }
    });

    console.log(data);

    return data;
}

window.Validate = function(wrap)
{
    var inputErrors = 0;

    $(wrap).find('input:visible.js-required').each(function() {
        if (!$(this).val())
        {
            console.log('Validate Errors: ' + inputErrors);
            $(this).addClass('js-invalid');
            $(this).parents('.js-error').addClass('error');
            $(this).parents('.js-wrap').find('.js-block-error').slideDown(300);

            inputErrors++;
        }
        else
        {
            if ($(this).hasClass('js-user-email'))
            {
                if (!EmailValidate($(this).val()))
                {
                    $(this).addClass('js-invalid');
                    $(this).parents('.js-error').addClass('error');
                    $(this).parents('.js-wrap').find('.js-block-error').slideDown(300);

                    inputErrors++;
                }
            }
        }
    });

    if (inputErrors > 0)
    {
        return false;
    }
    else
    {
        $('.js-invalid').parents('.js-error').removeClass('error');
        $('.js-invalid').parents('.js-wrap').find('.js-block-error').slideUp(300);
        $('.js-invalid').removeClass('js-invalid');

        return true;
    }
}

function EmailValidate(email)
{
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(email);
};


window.PhoneNumbValidate = function ()
{
    $('.js-user-phone').on("keypress keyup blur change", function (e)
    {
        e = e || window.event;
        var charCode = (typeof e.which == "number") ? e.which : e.keyCode;

        // Allow non-printable keys
        if (!charCode || charCode == 8 /* Backspace */ )
            return;

        var typedChar = String.fromCharCode(charCode);

        // Allow numeric characters
        if (/\d/.test(typedChar))
            return;

        // Allow the minus sign (-) if the user enters it first
        if (typedChar == "-" || typedChar == "+" && this.value == "") {
            return;
        }
        // In all other cases, suppress the event
        return false;

    });


}