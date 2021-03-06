$(document).ready(function() {
    showPopup();
    DropMenu();
    UpdateSliders();
    InputActive();
    SendFormAll();

});

$(window).resize(function() {
    UpdateSliders();
});

function Slider(sliderListWrap, onDisplay, toElem) {

    toElem = toElem === undefined ? -1 : toElem;

    var sliderList = sliderListWrap+' .js-list'; //Class name string


    var count = $('.'+sliderList+' > *').length; //total elements
    // console.log("count: " + count);

    var marginRight = 10;
    var marginLeft = 10;

    //ширина окна отображения всего слайдера
    var wrapWidth = Math.round($('.'+sliderListWrap+' .js-full-wrap').width());
    // console.log("wrapWidth = ", wrapWidth);

    var elemWidth = Math.round(wrapWidth / onDisplay);//width of one slide

    // console.log("elemWidth: " + elemWidth);
    while (elemWidth < 290)
    {
        // while the width of the element is less than the specified minimum, then reduce the slider by 1 element
        onDisplay--;
        elemWidth = Math.round(wrapWidth / onDisplay);
    }
    // console.log("after while elemWidth: " + elemWidth);
    var sliderWidth = elemWidth * count; // Slider width
    // console.log("sliderWidth: " + sliderWidth);

    var maxShift = count - onDisplay; // maximum shift
    // console.log("maxShift: " + maxShift);
// set the width of each element
    $('.'+sliderList+' > *').width(elemWidth - (marginRight + marginLeft));

    $('.'+sliderList).width(sliderWidth);

    if (toElem != -1) {
        $('.'+sliderList).attr('data-current', toElem);
    }

    // shift count
    var currentShift = parseInt($('.'+sliderList).attr('data-current'));

    if (currentShift > maxShift)
    {
        $('.'+sliderList).attr('data-current', maxShift);
        currentShift = maxShift;
    }

    // console.log("currentShift: " + currentShift);

    //Update the number of points
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

    //Initial shift
    $('.'+sliderList).css('margin-left', currentShift * -elemWidth);

    $('.'+sliderListWrap+' .js-list-wrap').width(wrapWidth);

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
}

function UpdateSliders()
{

    Slider('js-slider-wrap', 3);
}

function DropMenu()
{
    $('.js-menu').on('click', function () {

        if ($(this).hasClass('active')) {
            $(this).find('.js-menu-wrap').stop().slideUp(300, function ()
            {
                var menu = $(this).parents('.js-menu');
                menu.removeClass('active');
            });
            return;
        }

        $(this).addClass('active');
        $(this).find('.js-menu-wrap').stop().slideDown(300)
    });

    $('html').on('click touchstart', function (e) {
        if ($(e.target).parents('.js-menu').length == 0 && !$(e.target).hasClass('js-menu')) {
            $('.js-menu-wrap').stop().slideUp(300, function ()
            {
                var menu = $(this).parents('.js-menu');
                menu.removeClass('active');
            });
        }
    });
}

// customize popups

function showPopup ()
{
    $('.button').on('click', function () {

        $('.popup-wrap').fadeIn(1000);
        $('.popup-wrap').animate({
        }, 400);
    });

    $('.js-call-back').on('click', function () {

        $('.ask-call').fadeIn(1000);
        $('.ask-call').animate({
        }, 400);
    });

    $('.js-project').on('click', function () {

        $('.order-project').fadeIn(1000);
        $('.order-project').animate({
        }, 400);
    });

    $('.popup-bg, .js-close').on('mousedown', function (event) {
        if (event.target == this) {
            $('.popup-wrap, .ask-call, .order-project').fadeOut(400);
            $('.popup-wrap').animate({
            }, 400);
        }
    });

}

function InputActive()
{
    $('input').on("keypress keyup blur change",function () {

        PhoneNumbValidate();

        var inputVal = $(this).val();

        if(inputVal)
        {
            $(this).addClass('active');
        }
        else
        {
            $(this).removeClass('active');
        }

    });
}

function SendFormAll()
{
    $('.js-button-send').on('click', function ()
    {
        var formWrap = $(this).parents('.js-form');
        if (Validate(formWrap))
        {
            var data = Collect($('.js-form'));

            var userNameForm = formWrap.find('.js-user-name1').val();
            var userPhoneForm = $('.js-user-phone').val();
            var userEmailForm = $('.js-user-email').val();
            var descriptionProject = $('.js-project-description').val();

            var obj = {"userNameForm" : userNameForm, "userPhoneForm" : userPhoneForm, "userEmailForm" : userEmailForm, "descriptionProject" : descriptionProject,};
            // console.log(obj);

            $.ajax({
                url: 'mail.php',
                method: 'POST',
                data: obj
            }).done(function(response)
            {
                // console.log('success: ' + response);
            });

            $('.js-user-name1').val('');
            $(this).parents('.js-form').find('.js-user-name1').val('');
            $('.js-user-phone').val('');
            $('.js-user-email').val('');
            $('.js-project-description').val('');

        }
        else {
            return false;
        }

    });
}

/*function DatepickerLocalization ()
    {
        $(".js-datepicker").datepicker({
        maxDate:new Date(),
        autoClose:true,
        dateFormat:"dd.mm.yyyy"
    })
}*/



