$(document).ready(function($)
{
    Slider('js-slider-wrap', 3);
    function Slider(sliderListWrap, onDisplay, toElem)
    {
        if (sliderListWrap.length == 0)
            return;

        var minWidthSlide = 200;
        var maxWidthSlide = 400;

        //IE
        toElem = toElem === undefined ? -1 : toElem;

        var sliderList = sliderListWrap+' .js-list';

        var count = $('.'+sliderList+' > *').length;
        console.log("count: " + count);

        var wrapWidth = $('.'+sliderListWrap+' .js-full-wrap').outerWidth();
        //var wrapWidth = $('.'+sliderListWrap+' .js-full-wrap').width();
        console.log("wrapWidth: " + wrapWidth);

        var marginRight = $('.js-slide').css('margin-right');
        marginRight = Number(marginRight.replace('px', ''));
        console.log('marginRight : ' + marginRight);


        var elemWidth = ((wrapWidth / onDisplay) + marginRight);


        while (elemWidth > maxWidthSlide)
        {
            onDisplay++;
            elemWidth = wrapWidth / onDisplay;
        }

        while (elemWidth < minWidthSlide)
        {
            onDisplay--;
            elemWidth = wrapWidth / onDisplay;
        }


        console.log("elemWidth: " + elemWidth);

        var sliderWidth = elemWidth * count;
        console.log("sliderWidth: " + sliderWidth);

        var maxShift = count - onDisplay;
        console.log("maxShift: " + sliderWidth);

        $('.'+sliderList+' > *').outerWidth(elemWidth);

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

        // if ($('.js-points').is(":visible")) {

            $('.'+sliderListWrap).find('.js-points > *').remove();
            for (var i = 0; i < pointsCount; i++)
            {
                var pointTemplate = $('#js-point-template').clone();
                pointTemplate.removeAttr('id');
                $('.'+sliderListWrap).find('.js-points').append(pointTemplate);
            }
            $('.'+sliderListWrap).find('.js-points > *').eq(currentShift).addClass('active');
        // }



        //Сдвиг первоначальный
        $('.'+sliderList).css('margin-left', currentShift * -elemWidth - currentShift);
        console.log('margin-left: ' + (currentShift * -elemWidth - currentShift));

        $('.'+sliderListWrap+' .js-list-wrap').width(wrapWidth);

        $('.' + sliderListWrap + ' .js-slide-to-left, ' + '.' + sliderListWrap + ' .js-slide-to-right').off('click');
        $('.' + sliderListWrap + ' .js-slide-to-left, ' + '.' + sliderListWrap + ' .js-slide-to-right').on('click', function()
        {
            var currentShift = $('.'+sliderList).attr('data-current');

            if ($(this).hasClass('js-slide-to-left'))
                currentShift--;
            else
                currentShift++;

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
                $('.'+sliderListWrap).find('.js-sub-slider-percents').css('margin-left', (currentShift * -100) + "%");
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
});