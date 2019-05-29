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

function Slider(sliderListWrap, onDisplay, toElem)
{
    //IE
    toElem = toElem === undefined ? -1 : toElem;

    var sliderList = sliderListWrap+' .js-list';

    var count = $('.'+sliderList+' > *').length;
    console.log("count: " + count);

    var wrapWidth = $('.'+sliderListWrap+' .js-full-wrap').width();
    console.log("wrapWidth: " + wrapWidth);

    var marginRight = $('.'+sliderList+' > *').css('margin-right');
    var marginLeft = $('.'+sliderList+' > *').css('margin-left');

    console.log('marginRight : ' + marginRight);
    console.log('marginLeft : ' + marginLeft);

    marginRight = Number(marginRight.replace('px', ''));
    marginLeft = Number(marginLeft.replace('px', ''));

    var elemWidth = wrapWidth / onDisplay;
    console.log('1 elemWidth : ' + elemWidth);
    while (elemWidth < 200)
    {
        onDisplay--;
        elemWidth = wrapWidth / onDisplay;
    }

    console.log("elemWidth: " + elemWidth);

    var sliderWidth = elemWidth * count;
    console.log("sliderWidth: " + sliderWidth);

    var maxShift = count - onDisplay;
    console.log("maxShift: " + sliderWidth);

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

    console.log("currentShift: " + currentShift);

    //Обновляем количество points
    var pointsCount = 1 + count - onDisplay;
    console.log("pointsCount: " + pointsCount);


    $('.'+sliderListWrap).find('.js-points > *').remove();
    for (var i = 0; i < pointsCount; i++)
    {
        var pointTemplate = $('#js-point-template').clone();
        pointTemplate.removeAttr('id');
        $('.'+sliderListWrap).find('.js-points').append(pointTemplate);
    }
    $('.'+sliderListWrap).find('.js-points > *').eq(currentShift).addClass('active');


    //Сдвиг первоначальный
    $('.'+sliderList).css('margin-left', currentShift * -elemWidth - currentShift);
    console.log('margin-left: ' + (currentShift * -elemWidth - currentShift));

    $('.'+sliderListWrap+' .slider-list-wrap').width(wrapWidth);

    $('.' + sliderListWrap + ' .js-slide-to-left, ' + '.' + sliderListWrap + ' .js-slide-to-right').off('click');
    $('.' + sliderListWrap + ' .js-slide-to-left, ' + '.' + sliderListWrap + ' .js-slide-to-right').on('click', function()
    {
        var currentShift = $('.'+sliderList).attr('data-current');

        if ($(this).hasClass('js-slide-to-left'))
            currentShift--;
        else
            currentShift++;

        $('.slider-list-wrap').on('swipeleft', function () {
            currentShift++;
        });

        $('.slider-list-wrap').on('swiperight', function () {
            currentShift--;
        });


        if (currentShift >= 0 && currentShift <= count - onDisplay)
        {
            $('.'+sliderList).eq(0).css('margin-left', currentShift * -elemWidth - currentShift);

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

            //Саб слайдеры
            // $('.'+sliderListWrap).find('.js-sub-slider-percents').css('margin-left', (currentShift * -100) + "%");
        }
    });

    $('.'+sliderListWrap).find('.js-points > *').click(function() {
        $('.js-points > *').removeClass('active');
        $(this).addClass('active');

        var currentShift = $(this).index();
        $('.'+sliderList).eq(0).css('margin-left', currentShift * -elemWidth - currentShift);

        $('.'+sliderList).attr('data-current', currentShift);
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

    $('html').on('click', function (e) {
        if ($(e.target).parents('.js-menu').length == 0 && !$(e.target).hasClass('js-menu')) {
            $('.js-menu-wrap').stop().slideUp(300, function ()
            {
                var menu = $(this).parents('.js-menu');
                menu.removeClass('active');
            });
        }
    });
}

// Cancels the scroll when highlighted popup
/*
function disableScroll() {
    $('html, body').on('mousewheel', function () {
        return false;
    });
}

function enableScroll() {
    $('html, body').off('mousewheel');
}
*/


// customize popups

function showPopup ()
{
    $('.button').on('click', function () {

        $('.popup-wrap').fadeIn(1000/*, disableScroll*/);
        $('.popup-wrap').animate({
        }, 400);
    });

    $('.js-call-back').on('click', function () {

        $('.ask-call').fadeIn(1000/*, disableScroll*/);
        $('.ask-call').animate({
        }, 400);
    });

    $('.js-project').on('click', function () {

        $('.order-project').fadeIn(1000/*, disableScroll*/);
        $('.order-project').animate({
        }, 400);
    });

    $('.popup-bg, .js-close').on('mousedown', function (event) {
        if (event.target == this) {
            $('.popup-wrap, .ask-call, .order-project').fadeOut(400/*, enableScroll*/);
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
            // console.log('function InputActive() added active');
        }
        else
        {
            $(this).removeClass('active');
            // console.log('function InputActive() romoved active');
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
            console.log(obj);

            $.ajax({
                url: 'mail.php',
                method: 'POST',
                data: obj
            }).done(function(response)
            {
                console.log('success: ' + response);
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



