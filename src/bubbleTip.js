import style from './bubbleTip.scss';
$.fn.bubbleTip = function(settings){
    var defaultSettings = {
        action: 'top',
        width: 'auto',
        top: 0,
        left: 0,
        timeout: 300
    };
    var oName = {left: 'direction-left',right: 'direction-right',bottom: 'direction-bottom'};
    settings = $.extend({},defaultSettings,settings);
    return this.each(function(){
        var elem = $(this), ew,eh, w,h;
        var $bubble,cont;
        var title = elem.attr('data-title') || elem.attr('data-content');
        if(!title) return true;
        elem.hover(function(){
            $bubble && $bubble.remove();
            var offset = elem.offset();
            var sName = settings.action in oName ? ('bubble-tip ' + oName[settings.action]) : 'bubble-tip';
            $bubble = $('<div class="' + sName +'"></div>');
            cont = '<span class="ac"></span>';
            cont += settings.pre === true ? '<pre>' + title +'</pre>' : '<div>' + title +'</div>';
            $bubble = $bubble.html(cont);
            var top = offset.top ;
            var left = offset.left;
            $bubble.css({
                display: 'none',
                width: settings.width
            });
            elem.attr('title','');
            $('body').append($bubble);
            ew = elem.outerWidth();
            eh = elem.outerHeight();
            w = $bubble.outerWidth();
            h = $bubble.outerHeight();
            if(settings.action == 'right'){
                top = top - h/2 + eh/2;
                left = left - w - 10;
            }
            if(settings.action == 'left'){
                top = top - h/2 + eh/2;
                left = left + ew + 10;
            }
            if(settings.action == 'top'){
                top = top + eh + 10;
                left = left - (w - ew)/2;
            }
            if(settings.action == 'bottom'){
                top = top - h - 10;
                left = left - (w - ew)/2;
            }
            $bubble.css({
                top: top,
                left: left
            });
            $bubble.stop().show();
        },function(){
            $bubble.stop().animate({opacity: 0},settings.timeout,function(){
                $bubble.css({
                    opacity: 1,
                    display: 'none'
                });
                $bubble.remove();
            })
        })

    });

};

