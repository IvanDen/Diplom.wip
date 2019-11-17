/*function Slider(sliderListWrap, onDisplay, toElem)
{
    var maxWight = 228;
    var minWight = 300;

    $('.' + sliderListWrap).find('.js-list > div').css('margin-left', '10px');
    $('.' + sliderListWrap).find('.js-list > div').css('margin-right', '10px');

    //IE
    toElem = toElem === undefined ? -1 : toElem;

    var sliderList = sliderListWrap+' .js-list';

    var marginRight = $('.'+sliderList+' > *').css('margin-right');
    var marginLeft = $('.'+sliderList+' > *').css('margin-left');

    /!* marginRight = Number(marginRight.replace('px', ''));
     marginLeft = Number(marginLeft.replace('px', ''));*!/

    marginRight = Number(parseInt(marginRight));
    marginLeft = Number(parseInt(marginLeft));

    /!* console.log ("marginRight= ",marginRight);
     console.log ("marginLeft= ",marginLeft);*!/

    var elemWidth = minWight + marginRight + marginLeft;

    var count = $('.'+sliderList+' > *').length;
    // console.log("elemWidth : " + elemWidth);

    // var wrapWidth = $('.'+sliderListWrap+' .js-full-wrap').width();
    var wrapWidth = elemWidth * onDisplay;

    // console.log("wrapWidth: " + wrapWidth);

    // var elemWidth = wrapWidth / onDisplay;

    // console.log('1 elemWidth : ' + elemWidth);

    while (elemWidth < minWight)
    {
        onDisplay--;
        elemWidth = wrapWidth / onDisplay;
    }

    var globalWrapWidth = $('.'+sliderListWrap).width();
    // wrapWidth = globalWrapWidth;

    // console.log('globalWrapWidth: ' + globalWrapWidth);
    // console.log("elemWidth: " + elemWidth);

    var sliderWidth = elemWidth * count;
    // console.log("sliderWidth: " + sliderWidth);


    var maxShift = count - onDisplay;
    // console.log("maxShift: " + maxShift);


    $('.'+sliderList+' > *').width(elemWidth - (marginRight + marginLeft));

    $('.'+sliderList).width(sliderWidth);

    if (toElem != -1)
        $('.'+sliderList).attr('data-current', toElem);

    var currentShift = parseInt($('.'+sliderList).attr('data-current'));
    if (currentShift > maxShift)
    {
        $('.'+sliderList).attr('data-current', maxShift);
        currentShift = maxShift;
    }

    // console.log("currentShift: " + currentShift);

    //Обновляем количество points
    var pointsCount = 1 + count - onDisplay;
    // console.log("pointsCount: " + pointsCount);

    $('.'+sliderListWrap).find('.js-points > *').remove();
    for (var i = 0; i < pointsCount; i++)
    {
        var pointTemplate = $('#js-point-template').clone();
        pointTemplate.removeAttr('id');
        $('.'+sliderListWrap).find('.js-points').append(pointTemplate);
    }
    $('.'+sliderListWrap).find('.js-points > *').eq(currentShift).addClass('active');

    //Сдвиг первоначальный
    $('.'+sliderList).css('margin-left', currentShift * -elemWidth);

    // console.log('------------------');

    $('.'+sliderListWrap+' .slider-list-wrap').width(wrapWidth);

    var currentShift = $('.'+sliderList).attr('data-current');

    function CheckCurrentShift()
    {
        if (currentShift >= 0 && currentShift <= count - onDisplay)
        {
            $('.'+sliderList).eq(0).css('margin-left', currentShift * -elemWidth);
            // console.log("Сдвиг первоначальный ", (currentShift * (-elemWidth)));

            $('.'+sliderList).attr('data-current', currentShift);

            //Переключаем пойнты
            $('.'+sliderListWrap).find('.js-points > *').removeClass('active');
            $('.'+sliderListWrap).find('.js-points > *').eq(currentShift).addClass('active');

            if (currentShift == 0)
                $('.' + sliderListWrap + ' .js-slide-to-left').addClass('noactive');
            else
                $('.' + sliderListWrap + ' .js-slide-to-left').removeClass('noactive');

            if (currentShift == count - onDisplay)
                $('.' + sliderListWrap + ' .js-slide-to-right').addClass('noactive');
            else
                $('.' + sliderListWrap + ' .js-slide-to-right').removeClass('noactive');
        }
    }

    $('.' + sliderListWrap + ' .js-slide-to-left, ' + '.' + sliderListWrap + ' .js-slide-to-right').off('click touchend');
    $('.' + sliderListWrap + ' .js-slide-to-left, ' + '.' + sliderListWrap + ' .js-slide-to-right').on('click touchend', function()
    {
        currentShift = $('.'+sliderList).attr('data-current');

        if ($(this).hasClass('js-slide-to-left'))
            currentShift--;
        else
            currentShift++;

        CheckCurrentShift();
    });

//-------Making an event for touchscreen devices-------
    function TouchSwipe()
    {
        var swipeWrap = $("."+sliderListWrap).find('.js-full-wrap');
        // console.log("swipeWrap ", swipeWrap);

        swipeWrap.off('swipeleft');
        swipeWrap.on('swipeleft',  function(){

            currentShift = $('.'+sliderList).attr('data-current');
            currentShift++;
            CheckCurrentShift();
        });

        swipeWrap.off('swiperight');
        swipeWrap.on('swiperight', function() {

            currentShift = $('.'+sliderList).attr('data-current');
            currentShift--;
            CheckCurrentShift();
        });
    }

    TouchSwipe();

    $('.'+sliderListWrap).find('.js-points > *').click(function() {
        $('.'+sliderListWrap).find('.js-points > *').removeClass('active');
        $(this).addClass('active');

        var currentShift = $(this).index();
        $('.'+sliderList).eq(0).css('margin-left', currentShift * -elemWidth);

        $('.'+sliderList).attr('data-current', currentShift);

        if (currentShift == 0)
            $('.' + sliderListWrap + ' .js-slide-to-left').addClass('noactive');
        else
            $('.' + sliderListWrap + ' .js-slide-to-left').removeClass('noactive');

        if (currentShift == count - onDisplay)
            $('.' + sliderListWrap + ' .js-slide-to-right').addClass('noactive');
        else
            $('.' + sliderListWrap + ' .js-slide-to-right').removeClass('noactive');

    });
}*/

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