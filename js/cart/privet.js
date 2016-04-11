$(document).ready(function() {
    highdpiInit();
    if (typeof quickView !== 'undefined' && quickView)
        quick_view();
    if (typeof page_name !== 'undefined' && !in_array(page_name, ['index', 'product']))
    {
        bindGrid();

        $(document).on('change', '.selectProductSort', function(e) {
            if (typeof request != 'undefined' && request)
                var requestSortProducts = request;
            var url = '';
            var splitData = $(this).val().split(':');
            if (typeof requestSortProducts != 'undefined' && requestSortProducts)
            {
                url += requestSortProducts;
                if (typeof splitData[0] !== 'undefined' && splitData[0])
                {
                    url += (requestSortProducts.indexOf('?') < 0 ? '?' : '&') + 'orderby=' + splitData[0] + (splitData[1] ? '&orderway=' + splitData[1] : '');
                    if (typeof splitData[1] !== 'undefined' && splitData[1])
                        url += '&orderway=' + splitData[1];
                }
                document.location.href = url;
            }
        });
        $(document).on('change', 'select[name="n"]', function() {
            $(this.form).submit();
        });
        $(document).on('change', 'select[name="currency_payment"]', function() {
            setCurrency($(this).val());
        });
    }
    $(document).on('change', 'select[name="manufacturer_list"], select[name="supplier_list"]', function() {
        if (this.value != '')
            location.href = this.value;
    });
    $(document).on('click', '.back', function(e) {
        e.preventDefault();
        history.back();
    });
    jQuery.curCSS = jQuery.css;
    if (!!$.prototype.cluetip)
        $('a.cluetip').cluetip({local: true, cursor: 'pointer', dropShadow: false, dropShadowSteps: 0, showTitle: false, tracking: true, sticky: false, mouseOutClose: true, fx: {open: 'fadeIn', openSpeed: 'fast'}}).css('opacity', 0.8);
    if (typeof (FancyboxI18nClose) !== 'undefined' && typeof (FancyboxI18nNext) !== 'undefined' && typeof (FancyboxI18nPrev) !== 'undefined' && !!$.prototype.fancybox)
        $.extend($.fancybox.defaults.tpl, {closeBtn: '<a title="' + FancyboxboxI18nClose + '" class="fancybox-item fancybox-close" href="javascript:;"></a>', next: '<a title="' + FancyboxI18nNext + '" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>', prev: '<a title="' + FancyboxI18nPrev + '" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'});
    $(".alert.alert-danger").on('click', this, function(e) {
        if (e.offsetX >= 16 && e.offsetX <= 39 && e.offsetY >= 16 && e.offsetY <= 34)
            $(this).fadeOut();
    });
    $("#blocksearch_mod_tri").click(function() {
        stSidebar('blocksearch_mod');
        return false;
    });
    $("#st-side-overlay,#st-side-close").click(function() {
        resetSidebar();
        return false;
    });
    if (!!$.prototype.fancybox)
        $("a.iframe").fancybox({'type': 'iframe', 'width': 600, 'height': 600});
});
function highdpiInit()
{
    if (typeof st_retina !== 'undefined' && st_retina && isRetina())
    {
        var els = $("img.replace-2x").get();
        var img = new Array();
        for (var i = 0; i < els.length; i++)
        {
            var src = els[i].src;
            if (els[i].getAttribute('data-2x'))
                var src_2x = els[i].getAttribute('data-2x');
            else
                var src_2x = src.replace(/\/(\d+)\-(\w+)\_default([\.\/])/i, "/$1-$2_default_2x$3");
            if (src_2x == src)
                continue;
            img[i] = new Image();
            img[i].setAttribute('title', i);
            img[i].setAttribute('rel', src_2x);
            img[i].onload = (function() {
                if (this.height != 125 && this.width != 125)
                    els[this.getAttribute('title')].src = this.getAttribute('rel');
            });
            img[i].src = src_2x;
        }
        var img_links = new Array();
        var img_small = new Array();
        var img_large = new Array();
        var links = $("a.replace-2x").get();
        for (var i = 0; i < links.length; i++)
        {
            var ahref = links[i].href;
            var ahref_2x = ahref.replace(/\/(\d+)\-(\w+)\_default([\.\/])/i, "/$1-$2_default_2x$3");
            if (ahref_2x != ahref)
            {
                img_links[i] = new Image();
                img_links[i].setAttribute('title', i);
                img_links[i].setAttribute('rel', ahref_2x);
                img_links[i].onload = (function() {
                    if (this.height != 125 && this.width != 125)
                        links[this.getAttribute('title')].href = this.getAttribute('rel');
                });
                img_links[i].src = ahref_2x;
            }
            var arel = links[i].rel;
            if (arel)
            {
                var arel_obj = $.extend({}, eval("(" + $.trim(arel) + ")"));
                if (arel_obj && typeof (arel_obj.smallimage) !== 'undefined' && typeof (arel_obj.largeimage) !== 'undefined')
                {
                    var ahref_2x = arel_obj.smallimage.replace(/\/(\d+)\-(\w+)\_default([\.\/])/i, "/$1-$2_default_2x$3");
                    if (ahref_2x != arel_obj.smallimage)
                    {
                        img_small[i] = new Image();
                        img_small[i].setAttribute('title', i);
                        img_small[i].setAttribute('rel', ahref_2x);
                        img_small[i].onload = (function() {
                            if (this.height != 125 && this.width != 125)
                            {
                                var img_current_rel = links[this.getAttribute('title')].rel;
                                var img_current_rel_obj = $.extend({}, eval("(" + $.trim(img_current_rel) + ")"));
                                links[this.getAttribute('title')].rel = "{gallery: 'gal1', smallimage: '" + this.getAttribute('rel') + "',largeimage: '" + img_current_rel_obj.largeimage + "'}";
                            }
                        });
                        img_small[i].src = ahref_2x;
                    }
                    var ahref_2x = arel_obj.largeimage.replace(/\/(\d+)\-(\w+)\_default([\.\/])/i, "/$1-$2_default_2x$3");
                    if (ahref_2x != arel_obj.largeimage)
                    {
                        img_large[i] = new Image();
                        img_large[i].setAttribute('title', i);
                        img_large[i].setAttribute('rel', ahref_2x);
                        img_large[i].onload = (function() {
                            if (this.height != 125 && this.width != 125)
                            {
                                var img_current_rel = links[this.getAttribute('title')].rel;
                                var img_current_rel_obj = $.extend({}, eval("(" + $.trim(img_current_rel) + ")"));
                                links[this.getAttribute('title')].rel = "{gallery: 'gal1', smallimage: '" + img_current_rel_obj.smallimage + "',largeimage: '" + this.getAttribute('rel') + "'}";
                            }
                        });
                        img_large[i].src = ahref_2x;
                    }
                }
            }
        }
    }
}
var isRetina = function() {
    var root = (typeof exports === 'undefined' ? window : exports);
    var mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';
    if (root.devicePixelRatio > 1) {
        return true;
    }
    if (root.matchMedia && root.matchMedia(mediaQuery).matches) {
        return true;
    }
    return false;
};
function scrollCompensate()
{
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";
    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);
    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2)
        w2 = outer.clientWidth;
    document.body.removeChild(outer);
    return(w1 - w2);
}
function responsiveResize()
{
    compensante = scrollCompensate();
    if (($(window).width() + scrollCompensate()) <= 767 && responsiveflag == false)
    {
        accordion('enable');
        responsiveflag = true;
    }
    else if (($(window).width() + scrollCompensate()) >= 768)
    {
        accordion('disable');
        responsiveflag = false;
        if (typeof bindUniform !== 'undefined')
            bindUniform();
    }
    blockHover();
}
function blockHover(status)
{
    var screenLg = $('body').find('.container').width() == 1170;
    if ($('.product_list').is('.grid'))
        if (screenLg)
            $('.product_list .button-container').hide();
        else
            $('.product_list .button-container').show();
    $(document).off('mouseenter').on('mouseenter', '.product_list.grid li.ajax_block_product .product-container', function(e) {
        if (screenLg)
        {
            var pcHeight = $(this).parent().outerHeight();
            var pcPHeight = $(this).parent().find('.button-container').outerHeight() + $(this).parent().find('.comments_note').outerHeight() + $(this).parent().find('.functional-buttons').outerHeight();
            $(this).parent().addClass('hovered').css({'height': pcHeight + pcPHeight, 'margin-bottom': pcPHeight * (-1)});
            $(this).find('.button-container').show();
        }
    });
    $(document).off('mouseleave').on('mouseleave', '.product_list.grid li.ajax_block_product .product-container', function(e) {
        if (screenLg)
        {
            $(this).parent().removeClass('hovered').css({'height': 'auto', 'margin-bottom': '0'});
            $(this).find('.button-container').hide();
        }
    });
}
function quick_view()
{
    $(document).on('click', '.quick-view:visible, .quick-view-mobile:visible', function(e)
    {
        quickViewCaller = this;
        e.preventDefault();
        var url = this.rel;
        var anchor = '';
        if (url.indexOf('#') != -1)
        {
            anchor = url.substring(url.indexOf('#'), url.length);
            url = url.substring(0, url.indexOf('#'));
        }
        if (url.indexOf('?') != -1)
            url += '&';
        else
            url += '?';
        if (!!$.prototype.fancybox)
            $.fancybox({'padding': 0, 'width': 1087, 'height': 610, 'type': 'iframe', 'href': url + 'content_only=1' + anchor});
    });
}
function bindGrid()
{
    var storage = false;
    if (typeof (getStorageAvailable) !== 'undefined') {
        storage = getStorageAvailable();
    } else {
        test = 'foo';
        storage_temp = window.localStorage || window.sessionStorage;
        try {
            storage_temp.setItem(test, test);
            storage_temp.removeItem(test);
            storage = storage_temp;
        }
        catch (error) {
            storage = false;
        }
    }
    if (!storage) {
        return;
    }
    var view = $.totalStorage('display');
    if (!view && $('ul.product_list').length == 1)
    {
        var default_view = $.trim($('ul.product_list').attr('data-default-view'));
        if (default_view == 'grid')
            view = 'grid';
        if (default_view == 'list')
            view = 'list';
    }
    if (view && view != 'grid')
        display(view);
    else
        $('.content_sortPagiBar .display').find('li.grid').addClass('selected');
    $(document).on('click', '.content_sortPagiBar .display .grid', function(e) {
        e.preventDefault();
        display('grid');
    });
    $(document).on('click', '.content_sortPagiBar .display .list', function(e) {
        e.preventDefault();
        display('list');
    });
}
function display(view)
{
    if (view == 'list')
    {
        var classnames = $('ul.product_list').removeClass('grid row').addClass('list').attr('data-classnames');
        $('.product_list > li').removeClass(classnames).addClass('col-xs-12 clearfix');
        $('.content_sortPagiBar .display').find('li.list').addClass('selected');
        $('.content_sortPagiBar .display').find('li.grid').removeClass('selected');
        $.totalStorage('display', 'list');
    }
    else
    {
        var classnames = $('ul.product_list').removeClass('list').addClass('grid row').attr('data-classnames');
        $('.product_list > li').removeClass('col-xs-12 clearfix').addClass(classnames);
        $('.content_sortPagiBar .display').find('li.grid').addClass('selected');
        $('.content_sortPagiBar .display').find('li.list').removeClass('selected');
        $.totalStorage('display', 'grid');
    }
}
function accordionFooter(status)
{
    if (status == 'enable')
    {
        $('#footer .footer-block h4').on('click', function(e) {
            $(this).toggleClass('active').parent().find('.toggle-footer').stop().slideToggle('medium');
            e.preventDefault();
        })
        $('#footer').addClass('accordion').find('.toggle-footer').slideUp('fast');
    }
    else
    {
        $('.footer-block h4').removeClass('active').off().parent().find('.toggle-footer').removeAttr('style').slideDown('fast');
        $('#footer').removeClass('accordion');
    }
}
function accordion(status)
{
    if (status == 'enable')
    {
        var accordion_selector = '#right_column .block .title_block, #left_column .block .title_block, #left_column #newsletter_block_left h4,' + '#left_column .shopping_cart > a:first-child, #right_column .shopping_cart > a:first-child';
        $(accordion_selector).on('click', function(e) {
            $(this).toggleClass('active').parent().find('.block_content').stop().slideToggle('medium');
        });
        $('#right_column, #left_column').addClass('accordion').find('.block .block_content').slideUp('fast');
        if (typeof (ajaxCart) !== 'undefined')
            ajaxCart.collapse();
    }
    else
    {
        $('#right_column .block:not(#layered_block_left) .title_block, #left_column .block:not(#layered_block_left) .title_block, #left_column #newsletter_block_left h4').removeClass('active').off().parent().find('.block_content').removeAttr('style').slideDown('fast');
        $('#left_column, #right_column').removeClass('accordion');
    }
}
function isPlaceholer() {
    var input = document.createElement('input');
    return"placeholder"in input;
}
function getFlexSliderSize(per_row) {
    var ww = 'md';
    if (st_responsive)
    {
        var window_width = $(window).innerWidth();
        if (window_width >= 1200 && st_responsive_max == 1)
            ww = 'lg';
        else if (window_width >= 992)
            ww = 'md';
        else if (window_width >= 768)
            ww = 'sm';
        else if (window_width >= 480)
            ww = 'xs';
        else
            ww = 'xxs';
    }
    return eval('per_row.' + ww);
}
jQuery(function($) {
    window_width = $(window).width();
    $('#to_top').click(function() {
        $('body,html').animate({scrollTop: 0}, 'fast');
        return false;
    });
    $('.dropdown_wrap').hover(function() {
        $(this).addClass('open');
    }, function() {
        $(this).removeClass('open');
    });
    $('#footer .opener').click(function() {
        $(this).closest('.block').toggleClass('open');
        return false;
    });
    $('.product_accordion .opener').click(function() {
        $(this).closest('.product_accordion').toggleClass('open');
        return false;
    });
    $('#switch_left_column,#switch_right_column').click(function() {
        var column = $(this).attr('data-column');
        var opened = $('#' + column).hasClass('opened');
        var that_left_column = $('#' + column);
        if (!that_left_column.size())
        {
            $(this).hide();
            return false;
        }
        $('#left_column,#right_column').removeClass('opened');
        $('#switch_left_column i').removeClass('icon-left-open-1').addClass('icon-right-open-1');
        $('#switch_right_column i').removeClass('icon-right-open-1').addClass('icon-left-open-1');
        if (!opened) {
            var that_center_column = $('#center_column');
            if (that_left_column.height() > that_center_column.height())
                that_center_column.height(that_left_column.height());
            $('#' + column).addClass('opened');
            if (column == 'left_column')
                $(this).find('i').removeClass('icon-right-open-1').addClass('icon-left-open-1');
            else
                $(this).find('i').removeClass('icon-left-open-1').addClass('icon-right-open-1');
            var center_column_offset = $('#center_column').offset();
            $('body,html').animate({scrollTop: center_column_offset.top - 20}, 'fast');
        }
        else
        {
            $('#center_column').height('auto');
        }
        return false;
    });
    to_top_wrap_master($(window).scrollTop() > 300);
    $('.version_switching').click(function() {
        $.getJSON(baseDir + 'modules/stthemeeditor/stthemeeditor-ajax.php?action=version_switching&vs=' + ($(this).hasClass('vs_desktop') ? 1 : 0) + '&_ts=' + new Date().getTime(), function(json) {
            if (json.r)
                window.location.reload(true);
        });
        return false;
    });
    if ($('#st_mega_menu_container').size())
    {
        menu_container_top = $('#st_mega_menu_container').offset().top;
        sticky_menu();
    }
    if ($((st_sticky_adv == 3 || st_sticky_adv == 4) ? '#page_header #header' : '#st_advanced_menu_container').size())
    {
        adv_container_top = $((st_sticky_adv == 3 || st_sticky_adv == 4) ? '#page_header #header' : '#st_advanced_menu_container').offset().top;
        sticky_adv();
    }
    if ($('#top_bar').size())
        nav_container_height = $('#top_bar').outerHeight();
    sticky_mobile_header();
});
$(window).scroll(function() {
    to_top_wrap_master($(this).scrollTop() > 300);
    sticky_menu();
    sticky_adv();
    sticky_mobile_header();
});
function sticky_menu()
{
    if (!$.isNumeric(menu_container_top) || !st_sticky_menu)
        return false;
    if (window_width < 991)
    {
        $('#st_mega_menu_container').removeClass('sticky fadeInDownLarge');
        $('#page_header').removeClass('has_sticky');
        return false;
    }
    var c_window_scroll_top = $(window).scrollTop();
    var page_header_dom = $('#page_header');
    if (c_window_scroll_top > menu_container_top && !page_header_dom.hasClass('has_sticky')) {
        $('#st_mega_menu_container').addClass('sticky ' + (st_sticky_menu == 2 ? 'fadeInDownLarge' : ''));
        page_header_dom.addClass('has_sticky');
    }
    else if (c_window_scroll_top <= menu_container_top && page_header_dom.hasClass('has_sticky')) {
        $('#st_mega_menu_container').removeClass('sticky fadeInDownLarge');
        page_header_dom.removeClass('has_sticky');
    }
    return false;
}
function sticky_adv()
{
    if (!$.isNumeric(adv_container_top) || !st_sticky_adv)
        return false;
    if (window_width < 991)
    {
        $((st_sticky_adv == 3 || st_sticky_adv == 4) ? '#page_header #header' : '#st_advanced_menu_container').removeClass('sticky fadeInDownLarge');
        $('#page_header').removeClass('has_sticky');
        return false;
    }
    if ($('body').hasClass('cart_popup'))
        return false;
    var c_window_scroll_top = $(window).scrollTop();
    var page_header_dom = $('#page_header');
    if (c_window_scroll_top > adv_container_top && !page_header_dom.hasClass('has_sticky')) {
        $((st_sticky_adv == 3 || st_sticky_adv == 4) ? '#page_header #header' : '#st_advanced_menu_container').addClass('sticky ' + ((st_sticky_adv == 2 || st_sticky_adv == 4) ? 'fadeInDownLarge' : ''));
        page_header_dom.addClass('has_sticky');
    }
    else if (c_window_scroll_top <= adv_container_top && page_header_dom.hasClass('has_sticky')) {
        $((st_sticky_adv == 3 || st_sticky_adv == 4) ? '#page_header #header' : '#st_advanced_menu_container').removeClass('sticky fadeInDownLarge');
        page_header_dom.removeClass('has_sticky');
    }
    return false;
}
function sticky_mobile_header()
{
    if (!$.isNumeric(nav_container_height) || st_sticky_mobile_header < 2)
        return false;
    var page_header_dom = $('#page_header');
    var mobile_bar_dom = $('#mobile_bar');
    if (window_width >= 991)
    {
        page_header_dom.removeClass('sticky_mh');
        mobile_bar_dom.removeClass('fadeInDownLarge')
        return false;
    }
    var c_window_scroll_top = $(window).scrollTop();
    if (c_window_scroll_top > (nav_container_height + st_sticky_mobile_header_height) && !page_header_dom.hasClass('sticky_mh')) {
        page_header_dom.addClass('sticky_mh');
        mobile_bar_dom.addClass('fadeInDownLarge')
    }
    else if (c_window_scroll_top <= (nav_container_height + st_sticky_mobile_header_height) && page_header_dom.hasClass('sticky_mh')) {
        page_header_dom.removeClass('sticky_mh');
        mobile_bar_dom.removeClass('fadeInDownLarge')
    }
    return false;
}
function to_top_wrap_master($statu)
{
    if ($statu)
        $('#to_top_wrap .icon_wrap').removeClass('disabled');
    else
        $('#to_top_wrap .icon_wrap').addClass('disabled');
}
$(window).resize(function() {
    window_width = $(window).width();
    if (window_width >= 991)
        resetSidebar();
    if ($('#st_mega_menu_container').size())
        menu_container_top = $('#st_mega_menu_container').offset().top;
    if ($((st_sticky_adv == 3 || st_sticky_adv == 4) ? '#page_header #header' : '#st_advanced_menu_container').size())
        adv_container_top = $((st_sticky_adv == 3 || st_sticky_adv == 4) ? '#page_header #header' : '#st_advanced_menu_container').offset().top;
    if ($('#top_bar').size())
        nav_container_height = $('#top_bar').outerHeight();
    if (st_sticky_menu)
        sticky_menu();
    if (st_sticky_adv)
        sticky_adv();
    if (st_sticky_mobile_header)
        sticky_mobile_header();
});
function pug() {
    if (!arguments || typeof arguments[0] != 'object') {
        return
    }
    ;
    var param = arguments[0], url = arguments[1] || window.location.href;
    for (var i in param) {
        if (!i) {
            continue
        }
        ;
        var name = i, val = param[i];
        var reg = new RegExp('([\\?&])((' + name + '\=)([\\w\-]+))(&?)', 'i');
        var omatch = url.match(reg);
        if (!val && omatch) {
            (omatch[5] && omatch[2]) ? url = url.replace(omatch[2] + '&', '') : (omatch[1] && omatch[2]) ? url = url.replace(omatch[0], '') : ''
        }
        if (val && !omatch) {
            url.indexOf('?') > -1 ? url += '&' + name + '=' + val : url += '?' + name + '=' + val
        }
        if (val && omatch && val != omatch[4]) {
            url = url.replace(omatch[2], omatch[3] + val)
        }
    }
    ;
    if (!arguments[1] && window.location.href != url) {
        if (location.hash != '') {
            url = url.replace(location.hash, '');
            url += location.hash
        }
        window.location.href = url
    } else {
        return url
    }
}
;
(function(jQuery) {
    jQuery.fn.extend({staccordion: function() {
            return this.each(function() {
                var $ul = $(this), elementDataKey = 'accordiated', activeClassName = 'active', activationEffect = 'slideToggle', panelSelector = 'ul, div', activationEffectSpeed = 'fast', itemSelector = 'li';
                if ($ul.data(elementDataKey))
                    return false;
                if ($(this).attr('id') == 'stmobilemenu')
                    $.each($ul.find('ul.stmlevel1, ul.stmlevel2, li>div'), function() {
                        $(this).data(elementDataKey, true);
                        $(this).hide();
                    });
                else
                    $.each($ul.find('ul.mo_advanced_sub_ul, div.stmobileadvancedmenu_column'), function() {
                        $(this).data(elementDataKey, true);
                        $(this).hide();
                    });
                $.each($ul.find('span.opener'), function() {
                    $(this).click(function(e) {
                        activate(this, activationEffect);
                        return void(0);
                    });
                    $(this).bind('activate-node', function() {
                        $ul.find(panelSelector).not($(this).parents()).not($(this).siblings()).slideUp(activationEffectSpeed);
                        activate(this, 'slideDown');
                    });
                });
                var active = (location.hash) ? $ul.find('a[href="' + location.hash + '"]')[0] : $ul.find('li.current a')[0];
                if (active) {
                    activate(active, false);
                }
                function activate(el, effect) {
                    $(el).parent(itemSelector).siblings().removeClass(activeClassName).children(panelSelector).slideUp(activationEffectSpeed);
                    $(el).siblings(panelSelector)[(effect || activationEffect)](((effect == "show") ? activationEffectSpeed : false), function() {
                        if ($(el).siblings(panelSelector).is(':visible')) {
                            $(el).parents(itemSelector).not($ul.parents()).addClass(activeClassName);
                        } else {
                            $(el).parent(itemSelector).removeClass(activeClassName);
                        }
                        if (effect == 'show') {
                            $(el).parents(itemSelector).not($ul.parents()).addClass(activeClassName);
                        }
                        $(el).parents().show();
                    });
                }}
            );
        }});
})(jQuery);
var resetSidebar = function() {
    $('body').removeClass('open_st_mobile_advanced_menu open_block_cart_mod open_blocksearch_mod open_st_mobile_menu');
    return false;
};
var stSidebar = function(id) {
    var st_body = $('body');
    if (st_body.hasClass('open_' + id))
        resetSidebar();
    else
    {
        resetSidebar();
        st_body.addClass('open_' + id);
    }
    return false;
};
function bindUniform()
{
    if (!!$.prototype.uniform)
        $("select.form-control,input[type='radio'],input[type='checkbox']").not(".not_uniform").uniform();
}
;/**
 * bootstrap.js v3.0.0 by @fat and @mdo
 * Copyright 2013 Twitter Inc.
 * http://www.apache.org/licenses/LICENSE-2.0
 */
if (!jQuery)
    throw new Error("Bootstrap requires jQuery");
+function(a) {
    "use strict";
    function b() {
        var a = document.createElement("bootstrap"), b = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend"};
        for (var c in b)
            if (void 0 !== a.style[c])
                return{end: b[c]}
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1, d = this;
        a(this).one(a.support.transition.end, function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b()
    })
}(window.jQuery), +function(a) {
    "use strict";
    var b = '[data-dismiss="alert"]', c = function(c) {
        a(c).on("click", b, this.close)
    };
    c.prototype.close = function(b) {
        function c() {
            f.trigger("closed.bs.alert").remove()
        }
        var d = a(this), e = d.attr("data-target");
        e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
        var f = a(e);
        b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one(a.support.transition.end, c).emulateTransitionEnd(150) : c())
    };
    var d = a.fn.alert;
    a.fn.alert = function(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.alert");
            e || d.data("bs.alert", e = new c(this)), "string" == typeof b && e[b].call(d)
        })
    }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function() {
        return a.fn.alert = d, this
    }, a(document).on("click.bs.alert.data-api", b, c.prototype.close)
}(window.jQuery), +function(a) {
    "use strict";
    var b = function(c, d) {
        this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d)
    };
    b.DEFAULTS = {loadingText: "loading..."}, b.prototype.setState = function(a) {
        var b = "disabled", c = this.$element, d = c.is("input") ? "val" : "html", e = c.data();
        a += "Text", e.resetText || c.data("resetText", c[d]()), c[d](e[a] || this.options[a]), setTimeout(function() {
            "loadingText" == a ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b)
        }, 0)
    }, b.prototype.toggle = function() {
        var a = this.$element.closest('[data-toggle="buttons"]');
        if (a.length) {
            var b = this.$element.find("input").prop("checked", !this.$element.hasClass("active")).trigger("change");
            "radio" === b.prop("type") && a.find(".active").removeClass("active")
        }
        this.$element.toggleClass("active")
    };
    var c = a.fn.button;
    a.fn.button = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.button"), f = "object" == typeof c && c;
            e || d.data("bs.button", e = new b(this, f)), "toggle" == c ? e.toggle() : c && e.setState(c)
        })
    }, a.fn.button.Constructor = b, a.fn.button.noConflict = function() {
        return a.fn.button = c, this
    }, a(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(b) {
        var c = a(b.target);
        c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle"), b.preventDefault()
    })
}(window.jQuery), +function(a) {
    "use strict";
    var b = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
    };
    b.DEFAULTS = {interval: 5e3, pause: "hover", wrap: !0}, b.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, b.prototype.getActiveIndex = function() {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, b.prototype.to = function(b) {
        var c = this, d = this.getActiveIndex();
        return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid", function() {
            c.to(b)
        }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
    }, b.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition.end && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, b.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, b.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, b.prototype.slide = function(b, c) {
        var d = this.$element.find(".item.active"), e = c || d[b](), f = this.interval, g = "next" == b ? "left" : "right", h = "next" == b ? "first" : "last", i = this;
        if (!e.length) {
            if (!this.options.wrap)
                return;
            e = this.$element.find(".item")[h]()
        }
        this.sliding = !0, f && this.pause();
        var j = a.Event("slide.bs.carousel", {relatedTarget: e[0], direction: g});
        if (!e.hasClass("active")) {
            if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
                var b = a(i.$indicators.children()[i.getActiveIndex()]);
                b && b.addClass("active")
            })), a.support.transition && this.$element.hasClass("slide")) {
                if (this.$element.trigger(j), j.isDefaultPrevented())
                    return;
                e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one(a.support.transition.end, function() {
                    e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function() {
                        i.$element.trigger("slid")
                    }, 0)
                }).emulateTransitionEnd(600)
            } else {
                if (this.$element.trigger(j), j.isDefaultPrevented())
                    return;
                d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return f && this.cycle(), this
        }
    };
    var c = a.fn.carousel;
    a.fn.carousel = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.carousel"), f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c), g = "string" == typeof c ? c : f.slide;
            e || d.data("bs.carousel", e = new b(this, f)), "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = c, this
    }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(b) {
        var c, d = a(this), e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")), f = a.extend({}, e.data(), d.data()), g = d.attr("data-slide-to");
        g && (f.interval = !1), e.carousel(f), (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g), b.preventDefault()
    }), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var b = a(this);
            b.carousel(b.data())
        })
    })
}(window.jQuery), +function(a) {
    "use strict";
    var b = function(c, d) {
        this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    b.DEFAULTS = {toggle: !0}, b.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, b.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b = a.Event("show.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.$parent && this.$parent.find("> .panel > .in");
                if (c && c.length) {
                    var d = c.data("bs.collapse");
                    if (d && d.transitioning)
                        return;
                    c.collapse("hide"), d || c.data("bs.collapse", null)
                }
                var e = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[e](0), this.transitioning = 1;
                var f = function() {
                    this.$element.removeClass("collapsing").addClass("in")[e]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!a.support.transition)
                    return f.call(this);
                var g = a.camelCase(["scroll", e].join("-"));
                this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g])
            }
        }
    }, b.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var d = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return a.support.transition ? (this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350), void 0) : d.call(this)
            }
        }
    }, b.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var c = a.fn.collapse;
    a.fn.collapse = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.collapse"), f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c);
            e || d.data("bs.collapse", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = c, this
    }, a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(b) {
        var c, d = a(this), e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""), f = a(e), g = f.data("bs.collapse"), h = g ? "toggle" : d.data(), i = d.attr("data-parent"), j = i && a(i);
        g && g.transitioning || (j && j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(d).addClass("collapsed"), d[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), f.collapse(h)
    })
}(window.jQuery), +function(a) {
    "use strict";
    function b() {
        a(d).remove(), a(e).each(function(b) {
            var d = c(a(this));
            d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown")), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown"))
        })
    }
    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }
    var d = ".dropdown-backdrop", e = "[data-toggle=dropdown]", f = function(b) {
        a(b).on("click.bs.dropdown", this.toggle)
    };
    f.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e), g = f.hasClass("open");
            if (b(), !g) {
                if ("ontouchstart"in document.documentElement && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b), f.trigger(d = a.Event("show.bs.dropdown")), d.isDefaultPrevented())
                    return;
                f.toggleClass("open").trigger("shown.bs.dropdown")
            }
            return e.focus(), !1
        }
    }, f.prototype.keydown = function(b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var f = c(d), g = f.hasClass("open");
                if (!g || g && 27 == b.keyCode)
                    return 27 == b.which && f.find(e).focus(), d.click();
                var h = a("[role=menu] li:not(.divider):visible a", f);
                if (h.length) {
                    var i = h.index(h.filter(":focus"));
                    38 == b.keyCode && i > 0 && i--, 40 == b.keyCode && i < h.length - 1 && i++, ~i || (i = 0), h.eq(i).focus()
                }
            }
        }
    };
    var g = a.fn.dropdown;
    a.fn.dropdown = function(b) {
        return this.each(function() {
            var c = a(this), d = c.data("dropdown");
            d || c.data("dropdown", d = new f(this)), "string" == typeof b && d[b].call(c)
        })
    }, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = g, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ", [role=menu]", f.prototype.keydown)
}(window.jQuery), +function(a) {
    "use strict";
    var b = function(b, c) {
        this.options = c, this.$element = a(b).on("click.dismiss.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load(this.options.remote)
    };
    b.DEFAULTS = {backdrop: !0, keyboard: !0, show: !0}, b.prototype.toggle = function(a) {
        return this[this.isShown ? "hide" : "show"](a)
    }, b.prototype.show = function(b) {
        var c = this, d = a.Event("show.bs.modal", {relatedTarget: b});
        this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function() {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(document.body), c.$element.show(), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
            var e = a.Event("shown.bs.modal", {relatedTarget: b});
            d ? c.$element.one(a.support.transition.end, function() {
                c.$element.focus().trigger(e)
            }).emulateTransitionEnd(300) : c.$element.focus().trigger(e)
        }))
    }, b.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, b.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus()
        }, this))
    }, b.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, b.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.removeBackdrop(), a.$element.trigger("hidden.bs.modal")
        })
    }, b.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, b.prototype.backdrop = function(b) {
        var c = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var d = a.support.transition && c;
            if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), this.$element.on("click.dismiss.modal", a.proxy(function(a) {
                a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b)
                return;
            d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()
        } else
            !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b()
    };
    var c = a.fn.modal;
    a.fn.modal = function(c, d) {
        return this.each(function() {
            var e = a(this), f = e.data("bs.modal"), g = a.extend({}, b.DEFAULTS, e.data(), "object" == typeof c && c);
            f || e.data("bs.modal", f = new b(this, g)), "string" == typeof c ? f[c](d) : g.show && f.show(d)
        })
    }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function() {
        return a.fn.modal = c, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(b) {
        var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("modal") ? "toggle" : a.extend({remote: !/#/.test(d) && d}, e.data(), c.data());
        b.preventDefault(), e.modal(f, this).one("hide", function() {
            c.is(":visible") && c.focus()
        })
    }), a(document).on("shown.bs.modal", ".modal", function() {
        a(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function() {
        a(document.body).removeClass("modal-open")
    })
}(window.jQuery), +function(a) {
    "use strict";
    var b = function(a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
    };
    b.DEFAULTS = {animation: !0, placement: "top", selector: !1, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1}, b.prototype.init = function(b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d);
        for (var e = this.options.trigger.split(" "), f = e.length; f--; ) {
            var g = e[f];
            if ("click" == g)
                this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focus", i = "hover" == g ? "mouseleave" : "blur";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {trigger: "manual", selector: ""}) : this.fixTitle()
    }, b.prototype.getDefaults = function() {
        return b.DEFAULTS
    }, b.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {show: b.delay, hide: b.delay}), b
    }, b.prototype.getDelegateOptions = function() {
        var b = {}, c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, b.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(c.timeout), c.options.delay && c.options.delay.show ? (c.hoverState = "in", c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show), void 0) : c.show()
    }, b.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(c.timeout), c.options.delay && c.options.delay.hide ? (c.hoverState = "out", c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide), void 0) : c.hide()
    }, b.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(b), b.isDefaultPrevented())
                return;
            var c = this.tip();
            this.setContent(), this.options.animation && c.addClass("fade");
            var d = "function" == typeof this.options.placement ? this.options.placement.call(this, c[0], this.$element[0]) : this.options.placement, e = /\s?auto?\s?/i, f = e.test(d);
            f && (d = d.replace(e, "") || "top"), c.detach().css({top: 0, left: 0, display: "block"}).addClass(d), this.options.container ? c.appendTo(this.options.container) : c.insertAfter(this.$element);
            var g = this.getPosition(), h = c[0].offsetWidth, i = c[0].offsetHeight;
            if (f) {
                var j = this.$element.parent(), k = d, l = document.documentElement.scrollTop || document.body.scrollTop, m = "body" == this.options.container ? window.innerWidth : j.outerWidth(), n = "body" == this.options.container ? window.innerHeight : j.outerHeight(), o = "body" == this.options.container ? 0 : j.offset().left;
                d = "bottom" == d && g.top + g.height + i - l > n ? "top" : "top" == d && g.top - l - i < 0 ? "bottom" : "right" == d && g.right + h > m ? "left" : "left" == d && g.left - h < o ? "right" : d, c.removeClass(k).addClass(d)
            }
            var p = this.getCalculatedOffset(d, g, h, i);
            this.applyPlacement(p, d), this.$element.trigger("shown.bs." + this.type)
        }
    }, b.prototype.applyPlacement = function(a, b) {
        var c, d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10), h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), a.top = a.top + g, a.left = a.left + h, d.offset(a).addClass("in");
        var i = d[0].offsetWidth, j = d[0].offsetHeight;
        if ("top" == b && j != f && (c = !0, a.top = a.top + f - j), /bottom|top/.test(b)) {
            var k = 0;
            a.left < 0 && (k = -2 * a.left, a.left = 0, d.offset(a), i = d[0].offsetWidth, j = d[0].offsetHeight), this.replaceArrow(k - e + i, i, "left")
        } else
            this.replaceArrow(j - f, j, "top");
        c && d.offset(a)
    }, b.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
    }, b.prototype.setContent = function() {
        var a = this.tip(), b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, b.prototype.hide = function() {
        function b() {
            c.detach()
        }
        var c = this.tip(), d = a.Event("hide.bs." + this.type);
        return this.$element.trigger(d), d.isDefaultPrevented() ? void 0 : (c.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? c.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(), this.$element.trigger("hidden.bs." + this.type), this)
    }, b.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, b.prototype.hasContent = function() {
        return this.getTitle()
    }, b.prototype.getPosition = function() {
        var b = this.$element[0];
        return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {width: b.offsetWidth, height: b.offsetHeight}, this.$element.offset())
    }, b.prototype.getCalculatedOffset = function(a, b, c, d) {
        return"bottom" == a ? {top: b.top + b.height, left: b.left + b.width / 2 - c / 2} : "top" == a ? {top: b.top - d, left: b.left + b.width / 2 - c / 2} : "left" == a ? {top: b.top + b.height / 2 - d / 2, left: b.left - c} : {top: b.top + b.height / 2 - d / 2, left: b.left + b.width}
    }, b.prototype.getTitle = function() {
        var a, b = this.$element, c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, b.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template)
    }, b.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, b.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, b.prototype.enable = function() {
        this.enabled = !0
    }, b.prototype.disable = function() {
        this.enabled = !1
    }, b.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, b.prototype.toggle = function(b) {
        var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, b.prototype.destroy = function() {
        this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var c = a.fn.tooltip;
    a.fn.tooltip = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof c && c;
            e || d.data("bs.tooltip", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = c, this
    }
}(window.jQuery), +function(a) {
    "use strict";
    var b = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip)
        throw new Error("Popover requires tooltip.js");
    b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {placement: "right", trigger: "click", content: "", template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}), b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), b.prototype.constructor = b, b.prototype.getDefaults = function() {
        return b.DEFAULTS
    }, b.prototype.setContent = function() {
        var a = this.tip(), b = this.getTitle(), c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "html" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, b.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, b.prototype.getContent = function() {
        var a = this.$element, b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, b.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, b.prototype.tip = function() {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip
    };
    var c = a.fn.popover;
    a.fn.popover = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.popover"), f = "object" == typeof c && c;
            e || d.data("bs.popover", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function() {
        return a.fn.popover = c, this
    }
}(window.jQuery), +function(a) {
    "use strict";
    function b(c, d) {
        var e, f = a.proxy(this.process, this);
        this.$element = a(c).is("body") ? a(window) : a(c), this.$body = a("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = a([]), this.targets = a([]), this.activeTarget = null, this.refresh(), this.process()
    }
    b.DEFAULTS = {offset: 10}, b.prototype.refresh = function() {
        var b = this.$element[0] == window ? "offset" : "position";
        this.offsets = a([]), this.targets = a([]);
        var c = this;
        this.$body.find(this.selector).map(function() {
            var d = a(this), e = d.data("target") || d.attr("href"), f = /^#\w/.test(e) && a(e);
            return f && f.length && [[f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e]] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            c.offsets.push(this[0]), c.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, d = c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
        if (b >= d)
            return g != (a = f.last()[0]) && this.activate(a);
        for (a = e.length; a--; )
            g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, a(this.selector).parents(".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate")
    };
    var c = a.fn.scrollspy;
    a.fn.scrollspy = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = c, this
    }, a(window).on("load", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            b.scrollspy(b.data())
        })
    })
}(window.jQuery), +function(a) {
    "use strict";
    var b = function(b) {
        this.element = a(b)
    };
    b.prototype.show = function() {
        var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.attr("data-target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a")[0], f = a.Event("show.bs.tab", {relatedTarget: e});
            if (b.trigger(f), !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.parent("li"), c), this.activate(g, g.parent(), function() {
                    b.trigger({type: "shown.bs.tab", relatedTarget: e})
                })
            }
        }
    }, b.prototype.activate = function(b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
        }
        var f = c.find("> .active"), g = d && a.support.transition && f.hasClass("fade");
        g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(), f.removeClass("in")
    };
    var c = a.fn.tab;
    a.fn.tab = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.tab");
            e || d.data("bs.tab", e = new b(this)), "string" == typeof c && e[c]()
        })
    }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function() {
        return a.fn.tab = c, this
    }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(b) {
        b.preventDefault(), a(this).tab("show")
    })
}(window.jQuery), +function(a) {
    "use strict";
    var b = function(c, d) {
        this.options = a.extend({}, b.DEFAULTS, d), this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(c), this.affixed = this.unpin = null, this.checkPosition()
    };
    b.RESET = "affix affix-top affix-bottom", b.DEFAULTS = {offset: 0}, b.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, b.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var c = a(document).height(), d = this.$window.scrollTop(), e = this.$element.offset(), f = this.options.offset, g = f.top, h = f.bottom;
            "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top()), "function" == typeof h && (h = f.bottom());
            var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom" : null != g && g >= d ? "top" : !1;
            this.affixed !== i && (this.unpin && this.$element.css("top", ""), this.affixed = i, this.unpin = "bottom" == i ? e.top - d : null, this.$element.removeClass(b.RESET).addClass("affix" + (i ? "-" + i : "")), "bottom" == i && this.$element.offset({top: document.body.offsetHeight - h - this.$element.height()}))
        }
    };
    var c = a.fn.affix;
    a.fn.affix = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.affix"), f = "object" == typeof c && c;
            e || d.data("bs.affix", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.affix.Constructor = b, a.fn.affix.noConflict = function() {
        return a.fn.affix = c, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var b = a(this), c = b.data();
            c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c)
        })
    })
}(window.jQuery);/*
 * TotalStorage
 *
 * Copyright (c) 2012 Jared Novack & Upstatement (upstatement.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Total Storage is the conceptual the love child of jStorage by Andris Reinman, 
 * and Cookie by Klaus Hartl -- though this is not connected to either project.
 *
 * @name $.totalStorage
 * @cat Plugins/Cookie
 * @author Jared Novack/jared@upstatement.com
 * @version 1.1.2
 * @url http://upstatement.com/blog/2012/01/jquery-local-storage-done-right-and-easy/
 */
(function($) {
    var ls = window.localStorage;
    var supported;
    if (typeof ls == 'undefined' || typeof window.JSON == 'undefined') {
        supported = false;
    } else {
        supported = true;
    }
    $.totalStorage = function(key, value, options) {
        return $.totalStorage.impl.init(key, value);
    }
    $.totalStorage.setItem = function(key, value) {
        return $.totalStorage.impl.setItem(key, value);
    }
    $.totalStorage.getItem = function(key) {
        return $.totalStorage.impl.getItem(key);
    }
    $.totalStorage.getAll = function() {
        return $.totalStorage.impl.getAll();
    }
    $.totalStorage.deleteItem = function(key) {
        return $.totalStorage.impl.deleteItem(key);
    }
    $.totalStorage.impl = {init: function(key, value) {
            if (typeof value != 'undefined') {
                return this.setItem(key, value);
            } else {
                return this.getItem(key);
            }
        }, setItem: function(key, value) {
            if (!supported) {
                try {
                    $.cookie(key, value);
                    return value;
                } catch (e) {
                    console.log('Local Storage not supported by this browser. Install the cookie plugin on your site to take advantage of the same functionality. You can get it at https://github.com/carhartl/jquery-cookie');
                }
            }
            var saver = JSON.stringify(value);
            ls.setItem(key, saver);
            return this.parseResult(saver);
        }, getItem: function(key) {
            if (!supported) {
                try {
                    return this.parseResult($.cookie(key));
                } catch (e) {
                    return null;
                }
            }
            return this.parseResult(ls.getItem(key));
        }, deleteItem: function(key) {
            if (!supported) {
                try {
                    $.cookie(key, null);
                    return true;
                } catch (e) {
                    return false;
                }
            }
            ls.removeItem(key);
            return true;
        }, getAll: function() {
            var items = new Array();
            if (!supported) {
                try {
                    var pairs = document.cookie.split(";");
                    for (var i = 0; i < pairs.length; i++) {
                        var pair = pairs[i].split('=');
                        var key = pair[0];
                        items.push({key: key, value: this.parseResult($.cookie(key))});
                    }
                } catch (e) {
                    return null;
                }
            } else {
                for (var i in ls) {
                    if (i.length) {
                        items.push({key: i, value: this.parseResult(ls.getItem(i))});
                    }
                }
            }
            return items;
        }, parseResult: function(res) {
            var ret;
            try {
                ret = JSON.parse(res);
                if (ret == 'true') {
                    ret = true;
                }
                if (ret == 'false') {
                    ret = false;
                }
                if (parseFloat(ret) == ret && typeof ret != "object") {
                    ret = parseFloat(ret);
                }
            } catch (e) {
            }
            return ret;
        }}
})(jQuery);
;
(function(wind, $, undef) {
    "use strict";
    function attrOrProp($el) {
        var args = Array.prototype.slice.call(arguments, 1);
        if ($el.prop) {
            return $el.prop.apply($el, args);
        }
        return $el.attr.apply($el, args);
    }
    function bindMany($el, options, events) {
        var name, namespaced;
        for (name in events) {
            if (events.hasOwnProperty(name)) {
                namespaced = name.replace(/ |$/g, options.eventNamespace);
                $el.bind(namespaced, events[name]);
            }
        }
    }
    function bindUi($el, $target, options) {
        bindMany($el, options, {focus: function() {
                $target.addClass(options.focusClass);
            }, blur: function() {
                $target.removeClass(options.focusClass);
                $target.removeClass(options.activeClass);
            }, mouseenter: function() {
                $target.addClass(options.hoverClass);
            }, mouseleave: function() {
                $target.removeClass(options.hoverClass);
                $target.removeClass(options.activeClass);
            }, "mousedown touchbegin": function() {
                if (!$el.is(":disabled")) {
                    $target.addClass(options.activeClass);
                }
            }, "mouseup touchend": function() {
                $target.removeClass(options.activeClass);
            }});
    }
    function classClearStandard($el, options) {
        $el.removeClass(options.hoverClass + " " + options.focusClass + " " + options.activeClass);
    }
    function classUpdate($el, className, enabled) {
        if (enabled) {
            $el.addClass(className);
        } else {
            $el.removeClass(className);
        }
    }
    function classUpdateChecked($tag, $el, options) {
        var c = "checked", isChecked = $el.is(":" + c);
        if ($el.prop) {
            $el.prop(c, isChecked);
        } else {
            if (isChecked) {
                $el.attr(c, c);
            } else {
                $el.removeAttr(c);
            }
        }
        classUpdate($tag, options.checkedClass, isChecked);
    }
    function classUpdateDisabled($tag, $el, options) {
        classUpdate($tag, options.disabledClass, $el.is(":disabled"));
    }
    function divSpanWrap($el, $container, method) {
        switch (method) {
            case"after":
                $el.after($container);
                return $el.next();
            case"before":
                $el.before($container);
                return $el.prev();
            case"wrap":
                $el.wrap($container);
                return $el.parent();
        }
        return null;
    }
    function divSpan($el, options, divSpanConfig) {
        var $div, $span, id;
        if (!divSpanConfig) {
            divSpanConfig = {};
        }
        divSpanConfig = $.extend({bind: {}, divClass: null, divWrap: "wrap", spanClass: null, spanHtml: null, spanWrap: "wrap"}, divSpanConfig);
        $div = $('<div />');
        $span = $('<span />');
        if (options.autoHide && $el.is(':hidden') && $el.css('display') === 'none') {
            $div.hide();
        }
        if (divSpanConfig.divClass) {
            $div.addClass(divSpanConfig.divClass);
        }
        if (options.wrapperClass) {
            $div.addClass(options.wrapperClass);
        }
        if (divSpanConfig.spanClass) {
            $span.addClass(divSpanConfig.spanClass);
        }
        id = attrOrProp($el, 'id');
        if (options.useID && id) {
            attrOrProp($div, 'id', options.idPrefix + '-' + id);
        }
        if (divSpanConfig.spanHtml) {
            $span.html(divSpanConfig.spanHtml);
        }
        $div = divSpanWrap($el, $div, divSpanConfig.divWrap);
        $span = divSpanWrap($el, $span, divSpanConfig.spanWrap);
        classUpdateDisabled($div, $el, options);
        return{div: $div, span: $span};
    }
    function wrapWithWrapperClass($el, options) {
        var $span;
        if (!options.wrapperClass) {
            return null;
        }
        $span = $('<span />').addClass(options.wrapperClass);
        $span = divSpanWrap($el, $span, "wrap");
        return $span;
    }
    function highContrast() {
        var c, $div, el, rgb;
        rgb = 'rgb(120,2,153)';
        $div = $('<div style="width:0;height:0;color:' + rgb + '">');
        $('body').append($div);
        el = $div.get(0);
        if (wind.getComputedStyle) {
            c = wind.getComputedStyle(el, '').color;
        } else {
            c = (el.currentStyle || el.style || {}).color;
        }
        $div.remove();
        return c.replace(/ /g, '') !== rgb;
    }
    function htmlify(text) {
        if (!text) {
            return"";
        }
        return $('<span />').text(text).html();
    }
    function isMsie() {
        return navigator.cpuClass && !navigator.product;
    }
    function isMsieSevenOrNewer() {
        if (wind.XMLHttpRequest !== undefined) {
            return true;
        }
        return false;
    }
    function isMultiselect($el) {
        var elSize;
        if ($el[0].multiple) {
            return true;
        }
        elSize = attrOrProp($el, "size");
        if (!elSize || elSize <= 1) {
            return false;
        }
        return true;
    }
    function returnFalse() {
        return false;
    }
    function noSelect($elem, options) {
        var none = 'none';
        bindMany($elem, options, {'selectstart dragstart mousedown': returnFalse});
        $elem.css({MozUserSelect: none, msUserSelect: none, webkitUserSelect: none, userSelect: none});
    }
    function setFilename($el, $filenameTag, options) {
        var filename = $el.val();
        if (filename === "") {
            filename = options.fileDefaultHtml;
        } else {
            filename = filename.split(/[\/\\]+/);
            filename = filename[(filename.length - 1)];
        }
        $filenameTag.text(filename);
    }
    function swap($elements, newCss, callback) {
        var restore, item;
        restore = [];
        $elements.each(function() {
            var name;
            for (name in newCss) {
                if (Object.prototype.hasOwnProperty.call(newCss, name)) {
                    restore.push({el: this, name: name, old: this.style[name]});
                    this.style[name] = newCss[name];
                }
            }
        });
        callback();
        while (restore.length) {
            item = restore.pop();
            item.el.style[item.name] = item.old;
        }
    }
    function sizingInvisible($el, callback) {
        var targets;
        targets = $el.parents();
        targets.push($el[0]);
        targets = targets.not(':visible');
        swap(targets, {visibility: "hidden", display: "block", position: "absolute"}, callback);
    }
    function unwrapUnwrapUnbindFunction($el, options) {
        return function() {
            $el.unwrap().unwrap().unbind(options.eventNamespace);
        };
    }
    var allowStyling = true, highContrastTest = false, uniformHandlers = [{match: function($el) {
                return $el.is("a, button, :submit, :reset, input[type='button']");
            }, apply: function($el, options) {
                var $div, defaultSpanHtml, ds, getHtml, doingClickEvent;
                defaultSpanHtml = options.submitDefaultHtml;
                if ($el.is(":reset")) {
                    defaultSpanHtml = options.resetDefaultHtml;
                }
                if ($el.is("a, button")) {
                    getHtml = function() {
                        return $el.html() || defaultSpanHtml;
                    };
                } else {
                    getHtml = function() {
                        return htmlify(attrOrProp($el, "value")) || defaultSpanHtml;
                    };
                }
                ds = divSpan($el, options, {divClass: options.buttonClass, spanHtml: getHtml()});
                $div = ds.div;
                bindUi($el, $div, options);
                doingClickEvent = false;
                bindMany($div, options, {"click touchend": function() {
                        var ev, res, target, href;
                        if (doingClickEvent) {
                            return;
                        }
                        if ($el.is(':disabled')) {
                            return;
                        }
                        doingClickEvent = true;
                        if ($el[0].dispatchEvent) {
                            ev = document.createEvent("MouseEvents");
                            ev.initEvent("click", true, true);
                            res = $el[0].dispatchEvent(ev);
                            if ($el.is('a') && res) {
                                target = attrOrProp($el, 'target');
                                href = attrOrProp($el, 'href');
                                if (!target || target === '_self') {
                                    document.location.href = href;
                                } else {
                                    wind.open(href, target);
                                }
                            }
                        } else {
                            $el.click();
                        }
                        doingClickEvent = false;
                    }});
                noSelect($div, options);
                return{remove: function() {
                        $div.after($el);
                        $div.remove();
                        $el.unbind(options.eventNamespace);
                        return $el;
                    }, update: function() {
                        classClearStandard($div, options);
                        classUpdateDisabled($div, $el, options);
                        $el.detach();
                        ds.span.html(getHtml()).append($el);
                    }};
            }}, {match: function($el) {
                return $el.is(":checkbox");
            }, apply: function($el, options) {
                var ds, $div, $span;
                ds = divSpan($el, options, {divClass: options.checkboxClass});
                $div = ds.div;
                $span = ds.span;
                bindUi($el, $div, options);
                bindMany($el, options, {"click touchend": function() {
                        classUpdateChecked($span, $el, options);
                    }});
                classUpdateChecked($span, $el, options);
                return{remove: unwrapUnwrapUnbindFunction($el, options), update: function() {
                        classClearStandard($div, options);
                        $span.removeClass(options.checkedClass);
                        classUpdateChecked($span, $el, options);
                        classUpdateDisabled($div, $el, options);
                    }};
            }}, {match: function($el) {
                return $el.is(":file");
            }, apply: function($el, options) {
                var ds, $div, $filename, $button;
                ds = divSpan($el, options, {divClass: options.fileClass, spanClass: options.fileButtonClass, spanHtml: options.fileButtonHtml, spanWrap: "after"});
                $div = ds.div;
                $button = ds.span;
                $filename = $("<span />").html(options.fileDefaultHtml);
                $filename.addClass(options.filenameClass);
                $filename = divSpanWrap($el, $filename, "after");
                if (!attrOrProp($el, "size")) {
                    attrOrProp($el, "size", $div.width() / 10);
                }
                function filenameUpdate() {
                    setFilename($el, $filename, options);
                }
                bindUi($el, $div, options);
                filenameUpdate();
                if (isMsie()) {
                    bindMany($el, options, {click: function() {
                            $el.trigger("change");
                            setTimeout(filenameUpdate, 0);
                        }});
                } else {
                    bindMany($el, options, {change: filenameUpdate});
                }
                noSelect($filename, options);
                noSelect($button, options);
                return{remove: function() {
                        $filename.remove();
                        $button.remove();
                        return $el.unwrap().unbind(options.eventNamespace);
                    }, update: function() {
                        classClearStandard($div, options);
                        setFilename($el, $filename, options);
                        classUpdateDisabled($div, $el, options);
                    }};
            }}, {match: function($el) {
                if ($el.is("input")) {
                    var t = (" " + attrOrProp($el, "type") + " ").toLowerCase(), allowed = " color date datetime datetime-local email month number password search tel text time url week ";
                    return allowed.indexOf(t) >= 0;
                }
                return false;
            }, apply: function($el, options) {
                var elType, $wrapper;
                elType = attrOrProp($el, "type");
                $el.addClass(options.inputClass);
                $wrapper = wrapWithWrapperClass($el, options);
                bindUi($el, $el, options);
                if (options.inputAddTypeAsClass) {
                    $el.addClass(elType);
                }
                return{remove: function() {
                        $el.removeClass(options.inputClass);
                        if (options.inputAddTypeAsClass) {
                            $el.removeClass(elType);
                        }
                        if ($wrapper) {
                            $el.unwrap();
                        }
                    }, update: returnFalse};
            }}, {match: function($el) {
                return $el.is(":radio");
            }, apply: function($el, options) {
                var ds, $div, $span;
                ds = divSpan($el, options, {divClass: options.radioClass});
                $div = ds.div;
                $span = ds.span;
                bindUi($el, $div, options);
                bindMany($el, options, {"click touchend": function() {
                        $.uniform.update($(':radio[name="' + attrOrProp($el, "name") + '"]'));
                    }});
                classUpdateChecked($span, $el, options);
                return{remove: unwrapUnwrapUnbindFunction($el, options), update: function() {
                        classClearStandard($div, options);
                        classUpdateChecked($span, $el, options);
                        classUpdateDisabled($div, $el, options);
                    }};
            }}, {match: function($el) {
                if ($el.is("select") && !isMultiselect($el)) {
                    return true;
                }
                return false;
            }, apply: function($el, options) {
                var ds, $div, $span, origElemWidth;
                if (options.selectAutoWidth) {
                    sizingInvisible($el, function() {
                        origElemWidth = $el.width();
                    });
                }
                ds = divSpan($el, options, {divClass: options.selectClass, spanHtml: ($el.find(":selected:first") || $el.find("option:first")).html(), spanWrap: "before"});
                $div = ds.div;
                $span = ds.span;
                if (options.selectAutoWidth) {
                    sizingInvisible($el, function() {
                        swap($([$span[0], $div[0]]), {display: "block"}, function() {
                            var spanPad;
                            spanPad = $span.outerWidth() - $span.width();
                            $div.width(origElemWidth);
                            $span.width(origElemWidth - spanPad);
                        });
                    });
                } else {
                    $div.addClass('fixedWidth');
                }
                bindUi($el, $div, options);
                bindMany($el, options, {change: function() {
                        $span.html($el.find(":selected").html());
                        $div.removeClass(options.activeClass);
                    }, "click touchend": function() {
                        var selHtml = $el.find(":selected").html();
                        if ($span.html() !== selHtml) {
                            $el.trigger('change');
                        }
                    }, keyup: function() {
                        $span.html($el.find(":selected").html());
                    }});
                noSelect($span, options);
                return{remove: function() {
                        $span.remove();
                        $el.unwrap().unbind(options.eventNamespace);
                        return $el;
                    }, update: function() {
                        if (options.selectAutoWidth) {
                            $.uniform.restore($el);
                            $el.uniform(options);
                        } else {
                            classClearStandard($div, options);
                            $span.html($el.find(":selected").html());
                            classUpdateDisabled($div, $el, options);
                        }
                    }};
            }}, {match: function($el) {
                if ($el.is("select") && isMultiselect($el)) {
                    return true;
                }
                return false;
            }, apply: function($el, options) {
                var $wrapper;
                $el.addClass(options.selectMultiClass);
                $wrapper = wrapWithWrapperClass($el, options);
                bindUi($el, $el, options);
                return{remove: function() {
                        $el.removeClass(options.selectMultiClass);
                        if ($wrapper) {
                            $el.unwrap();
                        }
                    }, update: returnFalse};
            }}, {match: function($el) {
                return $el.is("textarea");
            }, apply: function($el, options) {
                var $wrapper;
                $el.addClass(options.textareaClass);
                $wrapper = wrapWithWrapperClass($el, options);
                bindUi($el, $el, options);
                return{remove: function() {
                        $el.removeClass(options.textareaClass);
                        if ($wrapper) {
                            $el.unwrap();
                        }
                    }, update: returnFalse};
            }}];
    if (isMsie() && !isMsieSevenOrNewer()) {
        allowStyling = false;
    }
    $.uniform = {defaults: {activeClass: "active", autoHide: true, buttonClass: "button", checkboxClass: "checker", checkedClass: "checked", disabledClass: "disabled", eventNamespace: ".uniform", fileButtonClass: "action", fileButtonHtml: "Choose File", fileClass: "uploader", fileDefaultHtml: "No file selected", filenameClass: "filename", focusClass: "focus", hoverClass: "hover", idPrefix: "uniform", inputAddTypeAsClass: true, inputClass: "uniform-input", radioClass: "radio", resetDefaultHtml: "Reset", resetSelector: false, selectAutoWidth: true, selectClass: "selector", selectMultiClass: "uniform-multiselect", submitDefaultHtml: "Submit", textareaClass: "uniform", useID: true, wrapperClass: null}, elements: []};
    $.fn.uniform = function(options) {
        var el = this;
        options = $.extend({}, $.uniform.defaults, options);
        if (!highContrastTest) {
            highContrastTest = true;
            if (highContrast()) {
                allowStyling = false;
            }
        }
        if (!allowStyling) {
            return this;
        }
        if (options.resetSelector) {
            $(options.resetSelector).mouseup(function() {
                wind.setTimeout(function() {
                    $.uniform.update(el);
                }, 10);
            });
        }
        return this.each(function() {
            var $el = $(this), i, handler, callbacks;
            if ($el.data("uniformed")) {
                $.uniform.update($el);
                return;
            }
            for (i = 0; i < uniformHandlers.length; i = i + 1) {
                handler = uniformHandlers[i];
                if (handler.match($el, options)) {
                    callbacks = handler.apply($el, options);
                    $el.data("uniformed", callbacks);
                    $.uniform.elements.push($el.get(0));
                    return;
                }
            }
        });
    };
    $.uniform.restore = $.fn.uniform.restore = function(elem) {
        if (elem === undef) {
            elem = $.uniform.elements;
        }
        $(elem).each(function() {
            var $el = $(this), index, elementData;
            elementData = $el.data("uniformed");
            if (!elementData) {
                return;
            }
            elementData.remove();
            index = $.inArray(this, $.uniform.elements);
            if (index >= 0) {
                $.uniform.elements.splice(index, 1);
            }
            $el.removeData("uniformed");
        });
    };
    $.uniform.update = $.fn.uniform.update = function(elem) {
        if (elem === undef) {
            elem = $.uniform.elements;
        }
        $(elem).each(function() {
            var $el = $(this), elementData;
            elementData = $el.data("uniformed");
            if (!elementData) {
                return;
            }
            elementData.update($el, elementData.options);
        });
    };
}(this, jQuery));
if (typeof isMobile != 'undefined' && !isMobile) {
    $(window).load(function() {
        $("select.form-control,input[type='checkbox']:not(.comparator), input[type='radio'],input#id_carrier2, input[type='file']").uniform();
    });
    $(window).resize(function() {
        $.uniform.update("select.form-control, input[type='file']");
    });
}
;
;/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
(function(r, G, f, v) {
    var J = f("html"), n = f(r), p = f(G), b = f.fancybox = function() {
        b.open.apply(this, arguments)
    }, I = navigator.userAgent.match(/msie/i), B = null, s = G.createTouch !== v, t = function(a) {
        return a && a.hasOwnProperty && a instanceof f
    }, q = function(a) {
        return a && "string" === f.type(a)
    }, E = function(a) {
        return q(a) && 0 < a.indexOf("%")
    }, l = function(a, d) {
        var e = parseInt(a, 10) || 0;
        d && E(a) && (e *= b.getViewport()[d] / 100);
        return Math.ceil(e)
    }, w = function(a, b) {
        return l(a, b) + "px"
    };
    f.extend(b, {version: "2.1.5", defaults: {padding: 15, margin: 20, width: 800, height: 600, minWidth: 100, minHeight: 100, maxWidth: 9999, maxHeight: 9999, pixelRatio: 1, autoSize: !0, autoHeight: !1, autoWidth: !1, autoResize: !0, autoCenter: !s, fitToView: !0, aspectRatio: !1, topRatio: 0.5, leftRatio: 0.5, scrolling: "auto", wrapCSS: "", arrows: !0, closeBtn: !0, closeClick: !1, nextClick: !1, mouseWheel: !0, autoPlay: !1, playSpeed: 3E3, preload: 3, modal: !1, loop: !0, ajax: {dataType: "html", headers: {"X-fancyBox": !0}}, iframe: {scrolling: "auto", preload: !0}, swf: {wmode: "transparent", allowfullscreen: "true", allowscriptaccess: "always"}, keys: {next: {13: "left", 34: "up", 39: "left", 40: "up"}, prev: {8: "right", 33: "down", 37: "right", 38: "down"}, close: [27], play: [32], toggle: [70]}, direction: {next: "left", prev: "right"}, scrollOutside: !0, index: 0, type: null, href: null, content: null, title: null, tpl: {wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>', image: '<img class="fancybox-image" src="{href}" alt="" />', iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' +
                        (I ? ' allowtransparency="true"' : "") + "></iframe>", error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>', closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>', next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>', prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'}, openEffect: "fade", openSpeed: 250, openEasing: "swing", openOpacity: !0, openMethod: "zoomIn", closeEffect: "fade", closeSpeed: 250, closeEasing: "swing", closeOpacity: !0, closeMethod: "zoomOut", nextEffect: "elastic", nextSpeed: 250, nextEasing: "swing", nextMethod: "changeIn", prevEffect: "elastic", prevSpeed: 250, prevEasing: "swing", prevMethod: "changeOut", helpers: {overlay: !0, title: !0}, onCancel: f.noop, beforeLoad: f.noop, afterLoad: f.noop, beforeShow: f.noop, afterShow: f.noop, beforeChange: f.noop, beforeClose: f.noop, afterClose: f.noop}, group: {}, opts: {}, previous: null, coming: null, current: null, isActive: !1, isOpen: !1, isOpened: !1, wrap: null, skin: null, outer: null, inner: null, player: {timer: null, isActive: !1}, ajaxLoad: null, imgPreload: null, transitions: {}, helpers: {}, open: function(a, d) {
            if (a && (f.isPlainObject(d) || (d = {}), !1 !== b.close(!0)))
                return f.isArray(a) || (a = t(a) ? f(a).get() : [a]), f.each(a, function(e, c) {
                    var k = {}, g, h, j, m, l;
                    "object" === f.type(c) && (c.nodeType && (c = f(c)), t(c) ? (k = {href: c.data("fancybox-href") || c.attr("href"), title: c.data("fancybox-title") || c.attr("title"), isDom: !0, element: c}, f.metadata && f.extend(!0, k, c.metadata())) : k = c);
                    g = d.href || k.href || (q(c) ? c : null);
                    h = d.title !== v ? d.title : k.title || "";
                    m = (j = d.content || k.content) ? "html" : d.type || k.type;
                    !m && k.isDom && (m = c.data("fancybox-type"), m || (m = (m = c.prop("class").match(/fancybox\.(\w+)/)) ? m[1] : null));
                    q(g) && (m || (b.isImage(g) ? m = "image" : b.isSWF(g) ? m = "swf" : "#" === g.charAt(0) ? m = "inline" : q(c) && (m = "html", j = c)), "ajax" === m && (l = g.split(/\s+/, 2), g = l.shift(), l = l.shift()));
                    j || ("inline" === m ? g ? j = f(q(g) ? g.replace(/.*(?=#[^\s]+$)/, "") : g) : k.isDom && (j = c) : "html" === m ? j = g : !m && (!g && k.isDom) && (m = "inline", j = c));
                    f.extend(k, {href: g, type: m, content: j, title: h, selector: l});
                    a[e] = k
                }), b.opts = f.extend(!0, {}, b.defaults, d), d.keys !== v && (b.opts.keys = d.keys ? f.extend({}, b.defaults.keys, d.keys) : !1), b.group = a, b._start(b.opts.index)
        }, cancel: function() {
            var a = b.coming;
            a && !1 !== b.trigger("onCancel") && (b.hideLoading(), b.ajaxLoad && b.ajaxLoad.abort(), b.ajaxLoad = null, b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(), b.coming = null, b.current || b._afterZoomOut(a))
        }, close: function(a) {
            b.cancel();
            !1 !== b.trigger("beforeClose") && (b.unbindEvents(), b.isActive && (!b.isOpen || !0 === a ? (f(".fancybox-wrap").stop(!0).trigger("onReset").remove(), b._afterZoomOut()) : (b.isOpen = b.isOpened = !1, b.isClosing = !0, f(".fancybox-item, .fancybox-nav").remove(), b.wrap.stop(!0, !0).removeClass("fancybox-opened"), b.transitions[b.current.closeMethod]())))
        }, play: function(a) {
            var d = function() {
                clearTimeout(b.player.timer)
            }, e = function() {
                d();
                b.current && b.player.isActive && (b.player.timer = setTimeout(b.next, b.current.playSpeed))
            }, c = function() {
                d();
                p.unbind(".player");
                b.player.isActive = !1;
                b.trigger("onPlayEnd")
            };
            if (!0 === a || !b.player.isActive && !1 !== a) {
                if (b.current && (b.current.loop || b.current.index < b.group.length - 1))
                    b.player.isActive = !0, p.bind({"onCancel.player beforeClose.player": c, "onUpdate.player": e, "beforeLoad.player": d}), e(), b.trigger("onPlayStart")
            } else
                c()
        }, next: function(a) {
            var d = b.current;
            d && (q(a) || (a = d.direction.next), b.jumpto(d.index + 1, a, "next"))
        }, prev: function(a) {
            var d = b.current;
            d && (q(a) || (a = d.direction.prev), b.jumpto(d.index - 1, a, "prev"))
        }, jumpto: function(a, d, e) {
            var c = b.current;
            c && (a = l(a), b.direction = d || c.direction[a >= c.index ? "next" : "prev"], b.router = e || "jumpto", c.loop && (0 > a && (a = c.group.length + a % c.group.length), a %= c.group.length), c.group[a] !== v && (b.cancel(), b._start(a)))
        }, reposition: function(a, d) {
            var e = b.current, c = e ? e.wrap : null, k;
            c && (k = b._getPosition(d), a && "scroll" === a.type ? (delete k.position, c.stop(!0, !0).animate(k, 200)) : (c.css(k), e.pos = f.extend({}, e.dim, k)))
        }, update: function(a) {
            var d = a && a.type, e = !d || "orientationchange" === d;
            e && (clearTimeout(B), B = null);
            b.isOpen && !B && (B = setTimeout(function() {
                var c = b.current;
                c && !b.isClosing && (b.wrap.removeClass("fancybox-tmp"), (e || "load" === d || "resize" === d && c.autoResize) && b._setDimension(), "scroll" === d && c.canShrink || b.reposition(a), b.trigger("onUpdate"), B = null)
            }, e && !s ? 0 : 300))
        }, toggle: function(a) {
            b.isOpen && (b.current.fitToView = "boolean" === f.type(a) ? a : !b.current.fitToView, s && (b.wrap.removeAttr("style").addClass("fancybox-tmp"), b.trigger("onUpdate")), b.update())
        }, hideLoading: function() {
            p.unbind(".loading");
            f("#fancybox-loading").remove()
        }, showLoading: function() {
            var a, d;
            b.hideLoading();
            a = f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");
            p.bind("keydown.loading", function(a) {
                if (27 === (a.which || a.keyCode))
                    a.preventDefault(), b.cancel()
            });
            b.defaults.fixed || (d = b.getViewport(), a.css({position: "absolute", top: 0.5 * d.h + d.y, left: 0.5 * d.w + d.x}))
        }, getViewport: function() {
            var a = b.current && b.current.locked || !1, d = {x: n.scrollLeft(), y: n.scrollTop()};
            a ? (d.w = a[0].clientWidth, d.h = a[0].clientHeight) : (d.w = s && r.innerWidth ? r.innerWidth : n.width(), d.h = s && r.innerHeight ? r.innerHeight : n.height());
            return d
        }, unbindEvents: function() {
            b.wrap && t(b.wrap) && b.wrap.unbind(".fb");
            p.unbind(".fb");
            n.unbind(".fb")
        }, bindEvents: function() {
            var a = b.current, d;
            a && (n.bind("orientationchange.fb" + (s ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), b.update), (d = a.keys) && p.bind("keydown.fb", function(e) {
                var c = e.which || e.keyCode, k = e.target || e.srcElement;
                if (27 === c && b.coming)
                    return!1;
                !e.ctrlKey && (!e.altKey && !e.shiftKey && !e.metaKey && (!k || !k.type && !f(k).is("[contenteditable]"))) && f.each(d, function(d, k) {
                    if (1 < a.group.length && k[c] !== v)
                        return b[d](k[c]), e.preventDefault(), !1;
                    if (-1 < f.inArray(c, k))
                        return b[d](), e.preventDefault(), !1
                })
            }), f.fn.mousewheel && a.mouseWheel && b.wrap.bind("mousewheel.fb", function(d, c, k, g) {
                for (var h = f(d.target || null), j = !1; h.length && !j && !h.is(".fancybox-skin") && !h.is(".fancybox-wrap"); )
                    j = h[0] && !(h[0].style.overflow && "hidden" === h[0].style.overflow) && (h[0].clientWidth && h[0].scrollWidth > h[0].clientWidth || h[0].clientHeight && h[0].scrollHeight > h[0].clientHeight), h = f(h).parent();
                if (0 !== c && !j && 1 < b.group.length && !a.canShrink) {
                    if (0 < g || 0 < k)
                        b.prev(0 < g ? "down" : "left");
                    else if (0 > g || 0 > k)
                        b.next(0 > g ? "up" : "right");
                    d.preventDefault()
                }
            }))
        }, trigger: function(a, d) {
            var e, c = d || b.coming || b.current;
            if (c) {
                f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1)));
                if (!1 === e)
                    return!1;
                c.helpers && f.each(c.helpers, function(d, e) {
                    if (e && b.helpers[d] && f.isFunction(b.helpers[d][a]))
                        b.helpers[d][a](f.extend(!0, {}, b.helpers[d].defaults, e), c)
                });
                p.trigger(a)
            }
        }, isImage: function(a) {
            return q(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        }, isSWF: function(a) {
            return q(a) && a.match(/\.(swf)((\?|#).*)?$/i)
        }, _start: function(a) {
            var d = {}, e, c;
            a = l(a);
            e = b.group[a] || null;
            if (!e)
                return!1;
            d = f.extend(!0, {}, b.opts, e);
            e = d.margin;
            c = d.padding;
            "number" === f.type(e) && (d.margin = [e, e, e, e]);
            "number" === f.type(c) && (d.padding = [c, c, c, c]);
            d.modal && f.extend(!0, d, {closeBtn: !1, closeClick: !1, nextClick: !1, arrows: !1, mouseWheel: !1, keys: null, helpers: {overlay: {closeClick: !1}}});
            d.autoSize && (d.autoWidth = d.autoHeight = !0);
            "auto" === d.width && (d.autoWidth = !0);
            "auto" === d.height && (d.autoHeight = !0);
            d.group = b.group;
            d.index = a;
            b.coming = d;
            if (!1 === b.trigger("beforeLoad"))
                b.coming = null;
            else {
                c = d.type;
                e = d.href;
                if (!c)
                    return b.coming = null, b.current && b.router && "jumpto" !== b.router ? (b.current.index = a, b[b.router](b.direction)) : !1;
                b.isActive = !0;
                if ("image" === c || "swf" === c)
                    d.autoHeight = d.autoWidth = !1, d.scrolling = "visible";
                "image" === c && (d.aspectRatio = !0);
                "iframe" === c && s && (d.scrolling = "scroll");
                d.wrap = f(d.tpl.wrap).addClass("fancybox-" + (s ? "mobile" : "desktop") + " fancybox-type-" + c + " fancybox-tmp " + d.wrapCSS).appendTo(d.parent || "body");
                f.extend(d, {skin: f(".fancybox-skin", d.wrap), outer: f(".fancybox-outer", d.wrap), inner: f(".fancybox-inner", d.wrap)});
                f.each(["Top", "Right", "Bottom", "Left"], function(a, b) {
                    d.skin.css("padding" + b, w(d.padding[a]))
                });
                b.trigger("onReady");
                if ("inline" === c || "html" === c) {
                    if (!d.content || !d.content.length)
                        return b._error("content")
                } else if (!e)
                    return b._error("href");
                "image" === c ? b._loadImage() : "ajax" === c ? b._loadAjax() : "iframe" === c ? b._loadIframe() : b._afterLoad()
            }
        }, _error: function(a) {
            f.extend(b.coming, {type: "html", autoWidth: !0, autoHeight: !0, minWidth: 0, minHeight: 0, scrolling: "no", hasError: a, content: b.coming.tpl.error});
            b._afterLoad()
        }, _loadImage: function() {
            var a = b.imgPreload = new Image;
            a.onload = function() {
                this.onload = this.onerror = null;
                b.coming.width = this.width / b.opts.pixelRatio;
                b.coming.height = this.height / b.opts.pixelRatio;
                b._afterLoad()
            };
            a.onerror = function() {
                this.onload = this.onerror = null;
                b._error("image")
            };
            a.src = b.coming.href;
            !0 !== a.complete && b.showLoading()
        }, _loadAjax: function() {
            var a = b.coming;
            b.showLoading();
            b.ajaxLoad = f.ajax(f.extend({}, a.ajax, {url: a.href, error: function(a, e) {
                    b.coming && "abort" !== e ? b._error("ajax", a) : b.hideLoading()
                }, success: function(d, e) {
                    "success" === e && (a.content = d, b._afterLoad())
                }}))
        }, _loadIframe: function() {
            var a = b.coming, d = f(a.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", s ? "auto" : a.iframe.scrolling).attr("src", a.href);
            f(a.wrap).bind("onReset", function() {
                try {
                    f(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (a) {
                }
            });
            a.iframe.preload && (b.showLoading(), d.one("load", function() {
                f(this).data("ready", 1);
                s || f(this).bind("load.fb", b.update);
                f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
                b._afterLoad()
            }));
            a.content = d.appendTo(a.inner);
            a.iframe.preload || b._afterLoad()
        }, _preloadImages: function() {
            var a = b.group, d = b.current, e = a.length, c = d.preload ? Math.min(d.preload, e - 1) : 0, f, g;
            for (g = 1; g <= c; g += 1)
                f = a[(d.index + g) % e], "image" === f.type && f.href && ((new Image).src = f.href)
        }, _afterLoad: function() {
            var a = b.coming, d = b.current, e, c, k, g, h;
            b.hideLoading();
            if (a && !1 !== b.isActive)
                if (!1 === b.trigger("afterLoad", a, d))
                    a.wrap.stop(!0).trigger("onReset").remove(), b.coming = null;
                else {
                    d && (b.trigger("beforeChange", d), d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());
                    b.unbindEvents();
                    e = a.content;
                    c = a.type;
                    k = a.scrolling;
                    f.extend(b, {wrap: a.wrap, skin: a.skin, outer: a.outer, inner: a.inner, current: a, previous: d});
                    g = a.href;
                    switch (c) {
                        case"inline":
                        case"ajax":
                        case"html":
                            a.selector ? e = f("<div>").html(e).find(a.selector) : t(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function() {
                                f(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
                            }));
                            break;
                        case"image":
                            e = a.tpl.image.replace("{href}", g);
                            break;
                        case"swf":
                            e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + g + '"></param>', h = "", f.each(a.swf, function(a, b) {
                                e += '<param name="' + a + '" value="' + b + '"></param>';
                                h += " " + a + '="' + b + '"'
                            }), e += '<embed src="' + g + '" type="application/x-shockwave-flash" width="100%" height="100%"' + h + "></embed></object>"
                    }
                    (!t(e) || !e.parent().is(a.inner)) && a.inner.append(e);
                    b.trigger("beforeShow");
                    a.inner.css("overflow", "yes" === k ? "scroll" : "no" === k ? "hidden" : k);
                    b._setDimension();
                    b.reposition();
                    b.isOpen = !1;
                    b.coming = null;
                    b.bindEvents();
                    if (b.isOpened) {
                        if (d.prevMethod)
                            b.transitions[d.prevMethod]()
                    } else
                        f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();
                    b.transitions[b.isOpened ? a.nextMethod : a.openMethod]();
                    b._preloadImages()
                }
        }, _setDimension: function() {
            var a = b.getViewport(), d = 0, e = !1, c = !1, e = b.wrap, k = b.skin, g = b.inner, h = b.current, c = h.width, j = h.height, m = h.minWidth, u = h.minHeight, n = h.maxWidth, p = h.maxHeight, s = h.scrolling, q = h.scrollOutside ? h.scrollbarWidth : 0, x = h.margin, y = l(x[1] + x[3]), r = l(x[0] + x[2]), v, z, t, C, A, F, B, D, H;
            e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");
            x = l(k.outerWidth(!0) - k.width());
            v = l(k.outerHeight(!0) - k.height());
            z = y + x;
            t = r + v;
            C = E(c) ? (a.w - z) * l(c) / 100 : c;
            A = E(j) ? (a.h - t) * l(j) / 100 : j;
            if ("iframe" === h.type) {
                if (H = h.content, h.autoHeight && 1 === H.data("ready"))
                    try {
                        H[0].contentWindow.document.location && (g.width(C).height(9999), F = H.contents().find("body"), q && F.css("overflow-x", "hidden"), A = F.outerHeight(!0))
                    } catch (G) {
                    }
            } else if (h.autoWidth || h.autoHeight)
                g.addClass("fancybox-tmp"), h.autoWidth || g.width(C), h.autoHeight || g.height(A), h.autoWidth && (C = g.width()), h.autoHeight && (A = g.height()), g.removeClass("fancybox-tmp");
            c = l(C);
            j = l(A);
            D = C / A;
            m = l(E(m) ? l(m, "w") - z : m);
            n = l(E(n) ? l(n, "w") - z : n);
            u = l(E(u) ? l(u, "h") - t : u);
            p = l(E(p) ? l(p, "h") - t : p);
            F = n;
            B = p;
            h.fitToView && (n = Math.min(a.w - z, n), p = Math.min(a.h - t, p));
            z = a.w - y;
            r = a.h - r;
            h.aspectRatio ? (c > n && (c = n, j = l(c / D)), j > p && (j = p, c = l(j * D)), c < m && (c = m, j = l(c / D)), j < u && (j = u, c = l(j * D))) : (c = Math.max(m, Math.min(c, n)), h.autoHeight && "iframe" !== h.type && (g.width(c), j = g.height()), j = Math.max(u, Math.min(j, p)));
            if (h.fitToView)
                if (g.width(c).height(j), e.width(c + x), a = e.width(), y = e.height(), h.aspectRatio)
                    for (; (a > z || y > r) && (c > m && j > u) && !(19 < d++); )
                        j = Math.max(u, Math.min(p, j - 10)), c = l(j * D), c < m && (c = m, j = l(c / D)), c > n && (c = n, j = l(c / D)), g.width(c).height(j), e.width(c + x), a = e.width(), y = e.height();
                else
                    c = Math.max(m, Math.min(c, c - (a - z))), j = Math.max(u, Math.min(j, j - (y - r)));
            q && ("auto" === s && j < A && c + x + q < z) && (c += q);
            g.width(c).height(j);
            e.width(c + x);
            a = e.width();
            y = e.height();
            e = (a > z || y > r) && c > m && j > u;
            c = h.aspectRatio ? c < F && j < B && c < C && j < A : (c < F || j < B) && (c < C || j < A);
            f.extend(h, {dim: {width: w(a), height: w(y)}, origWidth: C, origHeight: A, canShrink: e, canExpand: c, wPadding: x, hPadding: v, wrapSpace: y - k.outerHeight(!0), skinSpace: k.height() - j});
            !H && (h.autoHeight && j > u && j < p && !c) && g.height("auto")
        }, _getPosition: function(a) {
            var d = b.current, e = b.getViewport(), c = d.margin, f = b.wrap.width() + c[1] + c[3], g = b.wrap.height() + c[0] + c[2], c = {position: "absolute", top: c[0], left: c[3]};
            d.autoCenter && d.fixed && !a && g <= e.h && f <= e.w ? c.position = "fixed" : d.locked || (c.top += e.y, c.left += e.x);
            c.top = w(Math.max(c.top, c.top + (e.h - g) * d.topRatio));
            c.left = w(Math.max(c.left, c.left + (e.w - f) * d.leftRatio));
            return c
        }, _afterZoomIn: function() {
            var a = b.current;
            a && (b.isOpen = b.isOpened = !0, b.wrap.css("overflow", "visible").addClass("fancybox-opened"), b.update(), (a.closeClick || a.nextClick && 1 < b.group.length) && b.inner.css("cursor", "pointer").bind("click.fb", function(d) {
                !f(d.target).is("a") && !f(d.target).parent().is("a") && (d.preventDefault(), b[a.closeClick ? "close" : "next"]())
            }), a.closeBtn && f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb", function(a) {
                a.preventDefault();
                b.close()
            }), a.arrows && 1 < b.group.length && ((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind("click.fb", b.prev), (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind("click.fb", b.next)), b.trigger("afterShow"), !a.loop && a.index === a.group.length - 1 ? b.play(!1) : b.opts.autoPlay && !b.player.isActive && (b.opts.autoPlay = !1, b.play()))
        }, _afterZoomOut: function(a) {
            a = a || b.current;
            f(".fancybox-wrap").trigger("onReset").remove();
            f.extend(b, {group: {}, opts: {}, router: !1, current: null, isActive: !1, isOpened: !1, isOpen: !1, isClosing: !1, wrap: null, skin: null, outer: null, inner: null});
            b.trigger("afterClose", a)
        }});
    b.transitions = {getOrigPosition: function() {
            var a = b.current, d = a.element, e = a.orig, c = {}, f = 50, g = 50, h = a.hPadding, j = a.wPadding, m = b.getViewport();
            !e && (a.isDom && d.is(":visible")) && (e = d.find("img:first"), e.length || (e = d));
            t(e) ? (c = e.offset(), e.is("img") && (f = e.outerWidth(), g = e.outerHeight())) : (c.top = m.y + (m.h - g) * a.topRatio, c.left = m.x + (m.w - f) * a.leftRatio);
            if ("fixed" === b.wrap.css("position") || a.locked)
                c.top -= m.y, c.left -= m.x;
            return c = {top: w(c.top - h * a.topRatio), left: w(c.left - j * a.leftRatio), width: w(f + j), height: w(g + h)}
        }, step: function(a, d) {
            var e, c, f = d.prop;
            c = b.current;
            var g = c.wrapSpace, h = c.skinSpace;
            if ("width" === f || "height" === f)
                e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start), b.isClosing && (e = 1 - e), c = "width" === f ? c.wPadding : c.hPadding, c = a - c, b.skin[f](l("width" === f ? c : c - g * e)), b.inner[f](l("width" === f ? c : c - g * e - h * e))
        }, zoomIn: function() {
            var a = b.current, d = a.pos, e = a.openEffect, c = "elastic" === e, k = f.extend({opacity: 1}, d);
            delete k.position;
            c ? (d = this.getOrigPosition(), a.openOpacity && (d.opacity = 0.1)) : "fade" === e && (d.opacity = 0.1);
            b.wrap.css(d).animate(k, {duration: "none" === e ? 0 : a.openSpeed, easing: a.openEasing, step: c ? this.step : null, complete: b._afterZoomIn})
        }, zoomOut: function() {
            var a = b.current, d = a.closeEffect, e = "elastic" === d, c = {opacity: 0.1};
            e && (c = this.getOrigPosition(), a.closeOpacity && (c.opacity = 0.1));
            b.wrap.animate(c, {duration: "none" === d ? 0 : a.closeSpeed, easing: a.closeEasing, step: e ? this.step : null, complete: b._afterZoomOut})
        }, changeIn: function() {
            var a = b.current, d = a.nextEffect, e = a.pos, c = {opacity: 1}, f = b.direction, g;
            e.opacity = 0.1;
            "elastic" === d && (g = "down" === f || "up" === f ? "top" : "left", "down" === f || "right" === f ? (e[g] = w(l(e[g]) - 200), c[g] = "+=200px") : (e[g] = w(l(e[g]) + 200), c[g] = "-=200px"));
            "none" === d ? b._afterZoomIn() : b.wrap.css(e).animate(c, {duration: a.nextSpeed, easing: a.nextEasing, complete: b._afterZoomIn})
        }, changeOut: function() {
            var a = b.previous, d = a.prevEffect, e = {opacity: 0.1}, c = b.direction;
            "elastic" === d && (e["down" === c || "up" === c ? "top" : "left"] = ("up" === c || "left" === c ? "-" : "+") + "=200px");
            a.wrap.animate(e, {duration: "none" === d ? 0 : a.prevSpeed, easing: a.prevEasing, complete: function() {
                    f(this).trigger("onReset").remove()
                }})
        }};
    b.helpers.overlay = {defaults: {closeClick: !0, speedOut: 200, showEarly: !0, css: {}, locked: !s, fixed: !0}, overlay: null, fixed: !1, el: f("html"), create: function(a) {
            a = f.extend({}, this.defaults, a);
            this.overlay && this.close();
            this.overlay = f('<div class="fancybox-overlay"></div>').appendTo(b.coming ? b.coming.parent : a.parent);
            this.fixed = !1;
            a.fixed && b.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        }, open: function(a) {
            var d = this;
            a = f.extend({}, this.defaults, a);
            this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a);
            this.fixed || (n.bind("resize.overlay", f.proxy(this.update, this)), this.update());
            a.closeClick && this.overlay.bind("click.overlay", function(a) {
                if (f(a.target).hasClass("fancybox-overlay"))
                    return b.isActive ? b.close() : d.close(), !1
            });
            this.overlay.css(a.css).show()
        }, close: function() {
            var a, b;
            n.unbind("resize.overlay");
            this.el.hasClass("fancybox-lock") && (f(".fancybox-margin").removeClass("fancybox-margin"), a = n.scrollTop(), b = n.scrollLeft(), this.el.removeClass("fancybox-lock"), n.scrollTop(a).scrollLeft(b));
            f(".fancybox-overlay").remove().hide();
            f.extend(this, {overlay: null, fixed: !1})
        }, update: function() {
            var a = "100%", b;
            this.overlay.width(a).height("100%");
            I ? (b = Math.max(G.documentElement.offsetWidth, G.body.offsetWidth), p.width() > b && (a = p.width())) : p.width() > n.width() && (a = p.width());
            this.overlay.width(a).height(p.height())
        }, onReady: function(a, b) {
            var e = this.overlay;
            f(".fancybox-overlay").stop(!0, !0);
            e || this.create(a);
            a.locked && (this.fixed && b.fixed) && (e || (this.margin = p.height() > n.height() ? f("html").css("margin-right").replace("px", "") : !1), b.locked = this.overlay.append(b.wrap), b.fixed = !1);
            !0 === a.showEarly && this.beforeShow.apply(this, arguments)
        }, beforeShow: function(a, b) {
            var e, c;
            b.locked && (!1 !== this.margin && (f("*").filter(function() {
                return"fixed" === f(this).css("position") && !f(this).hasClass("fancybox-overlay") && !f(this).hasClass("fancybox-wrap")
            }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), e = n.scrollTop(), c = n.scrollLeft(), this.el.addClass("fancybox-lock"), n.scrollTop(e).scrollLeft(c));
            this.open(a)
        }, onUpdate: function() {
            this.fixed || this.update()
        }, afterClose: function(a) {
            this.overlay && !b.coming && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this))
        }};
    b.helpers.title = {defaults: {type: "float", position: "bottom"}, beforeShow: function(a) {
            var d = b.current, e = d.title, c = a.type;
            f.isFunction(e) && (e = e.call(d.element, d));
            if (q(e) && "" !== f.trim(e)) {
                d = f('<div class="fancybox-title fancybox-title-' + c + '-wrap">' + e + "</div>");
                switch (c) {
                    case"inside":
                        c = b.skin;
                        break;
                    case"outside":
                        c = b.wrap;
                        break;
                    case"over":
                        c = b.inner;
                        break;
                    default:
                        c = b.skin, d.appendTo("body"), I && d.width(d.width()), d.wrapInner('<span class="child"></span>'), b.current.margin[2] += Math.abs(l(d.css("margin-bottom")))
                }
                d["top" === a.position ? "prependTo" : "appendTo"](c)
            }
        }};
    f.fn.fancybox = function(a) {
        var d, e = f(this), c = this.selector || "", k = function(g) {
            var h = f(this).blur(), j = d, k, l;
            !g.ctrlKey && (!g.altKey && !g.shiftKey && !g.metaKey) && !h.is(".fancybox-wrap") && (k = a.groupAttr || "data-fancybox-group", l = h.attr(k), l || (k = "rel", l = h.get(0)[k]), l && ("" !== l && "nofollow" !== l) && (h = c.length ? f(c) : e, h = h.filter("[" + k + '="' + l + '"]'), j = h.index(this)), a.index = j, !1 !== b.open(h, a) && g.preventDefault())
        };
        a = a || {};
        d = a.index || 0;
        !c || !1 === a.live ? e.unbind("click.fb-start").bind("click.fb-start", k) : p.undelegate(c, "click.fb-start").delegate(c + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", k);
        this.filter("[data-fancybox-start=1]").trigger("click");
        return this
    };
    p.ready(function() {
        var a, d;
        f.scrollbarWidth === v && (f.scrollbarWidth = function() {
            var a = f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), b = a.children(), b = b.innerWidth() - b.height(99).innerWidth();
            a.remove();
            return b
        });
        if (f.support.fixedPosition === v) {
            a = f.support;
            d = f('<div style="position:fixed;top:20px;"></div>').appendTo("body");
            var e = 20 === d[0].offsetTop || 15 === d[0].offsetTop;
            d.remove();
            a.fixedPosition = e
        }
        f.extend(b.defaults, {scrollbarWidth: f.scrollbarWidth(), fixed: f.support.fixedPosition, parent: f("body")});
        a = f(r).width();
        J.addClass("fancybox-lock-test");
        d = f(r).width();
        J.removeClass("fancybox-lock-test");
        f("<style type='text/css'>.fancybox-margin{margin-right:" + (d - a) + "px;}</style>").appendTo("head")
    })
})(window, document, jQuery);
;
$(document).ready(function() {
    $(document).on('click', '.add_to_compare', function(e) {
        e.preventDefault();
        if (typeof addToCompare != 'undefined')
            addToCompare(parseInt($(this).data('id-product')), this);
    });
    $(document).on('click', '#layer_compare .cross, #layer_compare .continue, .layer_compare_overlay', function(e) {
        e.preventDefault();
        $('.layer_compare_overlay').hide();
        $('#layer_compare').fadeOut('fast');
    });
    reloadProductComparison();
    compareButtonsStatusRefresh();
    totalCompareButtons();
});
function addToCompare(productId, callerElement)
{
    if (contentOnly)
        var dom_compare_quantity = $('#rightbar_compare .compare_quantity', window.parent.document);
    else
        var dom_compare_quantity = $('#rightbar_compare .compare_quantity');
    var totalValueNow = parseInt(dom_compare_quantity.html(), 10);
    if (isNaN(totalValueNow))
        totalValueNow = 0;
    var action, totalVal;
    if ($.inArray(parseInt(productId), comparedProductsIds) === -1 && $.inArray('' + productId, comparedProductsIds) === -1)
        action = 'add';
    else
        action = 'remove';
    $(callerElement).addClass('active');
    $.ajax({url: baseUri + '?controller=products-comparison&ajax=1&action=' + action + '&id_product=' + productId, async: true, cache: false, success: function(data) {
            $(callerElement).removeClass('active');
            var pro_name = $(callerElement).attr('data-product-name');
            var pro_cover = $(callerElement).attr('data-product-cover');
            $('#compare_add_success,#compare_remove_success').addClass('hidden');
            if (action === 'add' && comparedProductsIds.length < comparator_max_item) {
                comparedProductsIds.push(parseInt(productId)), compareButtonsStatusRefresh(), totalVal = totalValueNow + 1;
                if (contentOnly)
                    window.parent.totalValue(totalVal);
                else
                    totalValue(totalVal);
                $('#compare_add_success').removeClass('hidden');
                $('#layer_compare_product_title').text(pro_name);
                $('.layer_compare_img').html('<img class="layer_compare_img img-responsive" src="' + pro_cover + '" alt="' + pro_name + '" title="' + pro_name + '" />');
                var n = parseInt($(window).scrollTop()) + 100 + 'px';
                $('.layer_compare_overlay').css('width', '100%');
                $('.layer_compare_overlay').css('height', '100%');
                $('.layer_compare_overlay').show();
                if (contentOnly)
                    $('.layer_compare_btn').hide();
                $('#layer_compare').css({'top': n}).fadeIn('fast');
            }
            else if (action === 'remove') {
                var compare_index_of = $.inArray(parseInt(productId), comparedProductsIds) === -1 ? $.inArray('' + productId, comparedProductsIds) : $.inArray(parseInt(productId), comparedProductsIds);
                comparedProductsIds.splice(compare_index_of, 1), compareButtonsStatusRefresh(), totalVal = totalValueNow - 1;
                if (contentOnly)
                    window.parent.totalValue(totalVal);
                else
                    totalValue(totalVal);
                $('#compare_remove_success').removeClass('hidden');
                $('#layer_compare_product_title').text(pro_name);
                $('.layer_compare_img').html('<img class="layer_compare_img img-responsive" src="' + pro_cover + '" alt="' + pro_name + '" title="' + pro_name + '" />');
                var n = parseInt($(window).scrollTop()) + 100 + 'px';
                $('.layer_compare_overlay').css('width', '100%');
                $('.layer_compare_overlay').css('height', '100%');
                $('.layer_compare_overlay').show();
                if (contentOnly)
                    $('.layer_compare_btn').hide();
                $('#layer_compare').css({'top': n}).fadeIn('fast');
            }
            else
            {
                if (!!$.prototype.fancybox)
                    $.fancybox.open([{type: 'inline', autoScale: true, minHeight: 30, content: '<p class="fancybox-error">' + max_item + '</p>'}], {padding: 0});
                else
                    alert(max_item);
            }
            totalCompareButtons();
        }, error: function() {
            $(callerElement).removeClass('active');
        }});
}
function reloadProductComparison()
{
    $(document).on('click', 'a.cmp_remove', function(e) {
        e.preventDefault();
        var idProduct = parseInt($(this).data('id-product'));
        $.ajax({url: baseUri + '?controller=products-comparison&ajax=1&action=remove&id_product=' + idProduct, async: false, cache: false});
        $('td.product-' + idProduct).fadeOut(600);
        var compare_product_list = products_comparision_get('compare_product_list');
        var bak = compare_product_list;
        var new_compare_product_list = [];
        compare_product_list = decodeURIComponent(compare_product_list).split('|');
        for (var i in compare_product_list)
            if (parseInt(compare_product_list[i]) != idProduct)
                new_compare_product_list.push(compare_product_list[i]);
        if (new_compare_product_list.length)
            window.location.search = window.location.search.replace(bak, new_compare_product_list.join(encodeURIComponent('|')));
        var dom_compare_quantity = $('#rightbar_compare .compare_quantity');
        var totalValueNow = parseInt(dom_compare_quantity.html(), 10);
        if (isNaN(totalValueNow))
            totalValueNow = 0;
        if (totalValueNow)
            if (contentOnly)
                window.parent.totalValue(totalValueNow - 1);
            else
                totalValue(totalValueNow - 1);
    });
}
;
function compareButtonsStatusRefresh()
{
    $('.add_to_compare').each(function() {
        if ($.inArray(parseInt($(this).data('id-product')), comparedProductsIds) !== -1 || $.inArray('' + $(this).data('id-product'), comparedProductsIds) !== -1)
            $(this).addClass('checked');
        else
            $(this).removeClass('checked');
    });
}
function totalCompareButtons()
{
    var totalProductsToCompare = parseInt($('.bt_compare .total-compare-val').html());
    if (typeof totalProductsToCompare !== "number" || totalProductsToCompare === 0)
        $('.bt_compare').attr("disabled", true);
    else
        $('.bt_compare').attr("disabled", false);
}
function totalValue(value)
{
    var dom_compare_quantity = $('#rightbar_compare .compare_quantity');
    if (value > 0)
        dom_compare_quantity.html(value).show();
    else
        dom_compare_quantity.html(0).hide();
}
function products_comparision_get(name)
{
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return"";
    else
        return results[1];
}
;
;
(function($) {
    $.fn.idTabs = function() {
        var s = {"start": null, "return": false, "click": null};
        for (var i = 0; i < arguments.length; ++i) {
            var n = {}, a = arguments[i];
            switch (typeof a) {
                case"object":
                    $.extend(n, a);
                    break;
                case"number":
                case"string":
                    n.start = a;
                    break;
                case"boolean":
                    n["return"] = a;
                    break;
                case"function":
                    n.click = a;
                    break;
            }
            ;
            $.extend(s, n);
        }
        var self = this;
        var list = $("a[href^='#']", this).click(function() {
            if ($("a.selected", self)[0] == this)
                return s["return"];
            var id = "#" + this.href.split('#')[1];
            var aList = [];
            var idList = [];
            $("a", self).each(function() {
                if (this.href.match(/#/)) {
                    aList[aList.length] = this;
                    idList[idList.length] = "#" + this.href.split('#')[1];
                }
            });
            if (s.click && !s.click(id, idList, self))
                return s["return"];
            for (i in aList)
                $(aList[i]).removeClass("selected");
            for (i in idList) {
                $(idList[i]).addClass('block_hidden_only_for_screen');
            }
            $(this).addClass("selected");
            $(id).removeClass('block_hidden_only_for_screen');
            return s["return"];
        });
        var test;
        if (typeof s.start == "number" && (test = list.filter(":eq(" + s.start + ")")).length)
            test.click();
        else if (typeof s.start == "string" && (test = list.filter("[href='#" + s.start + "']")).length)
            test.click();
        else if ((test = list.filter(".selected")).length)
            test.removeClass("selected").click();
        else
            list.filter(":first").click();
        return this;
    };
    $(function() {
        $(".idTabs").each(function() {
            $(this).idTabs();
        });
    });
})(jQuery);
;
(function(k) {
    'use strict';
    k(['jquery'], function($) {
        var j = $.scrollTo = function(a, b, c) {
            return $(window).scrollTo(a, b, c)
        };
        j.defaults = {axis: 'xy', duration: 0, limit: !0};
        j.window = function(a) {
            return $(window)._scrollable()
        };
        $.fn._scrollable = function() {
            return this.map(function() {
                var a = this, isWin = !a.nodeName || $.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;
                if (!isWin)
                    return a;
                var b = (a.contentWindow || a).document || a.ownerDocument || a;
                return/webkit/i.test(navigator.userAgent) || b.compatMode == 'BackCompat' ? b.body : b.documentElement
            })
        };
        $.fn.scrollTo = function(f, g, h) {
            if (typeof g == 'object') {
                h = g;
                g = 0
            }
            if (typeof h == 'function')
                h = {onAfter: h};
            if (f == 'max')
                f = 9e9;
            h = $.extend({}, j.defaults, h);
            g = g || h.duration;
            h.queue = h.queue && h.axis.length > 1;
            if (h.queue)
                g /= 2;
            h.offset = both(h.offset);
            h.over = both(h.over);
            return this._scrollable().each(function() {
                if (f == null)
                    return;
                var d = this, $elem = $(d), targ = f, toff, attr = {}, win = $elem.is('html,body');
                switch (typeof targ) {
                    case'number':
                    case'string':
                        if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
                            targ = both(targ);
                            break
                        }
                        targ = win ? $(targ) : $(targ, this);
                        if (!targ.length)
                            return;
                    case'object':
                        if (targ.is || targ.style)
                            toff = (targ = $(targ)).offset()
                }
                var e = $.isFunction(h.offset) && h.offset(d, targ) || h.offset;
                $.each(h.axis.split(''), function(i, a) {
                    var b = a == 'x' ? 'Left' : 'Top', pos = b.toLowerCase(), key = 'scroll' + b, old = d[key], max = j.max(d, a);
                    if (toff) {
                        attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
                        if (h.margin) {
                            attr[key] -= parseInt(targ.css('margin' + b)) || 0;
                            attr[key] -= parseInt(targ.css('border' + b + 'Width')) || 0
                        }
                        attr[key] += e[pos] || 0;
                        if (h.over[pos])
                            attr[key] += targ[a == 'x' ? 'width' : 'height']() * h.over[pos]
                    } else {
                        var c = targ[pos];
                        attr[key] = c.slice && c.slice(-1) == '%' ? parseFloat(c) / 100 * max : c
                    }
                    if (h.limit && /^\d+$/.test(attr[key]))
                        attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
                    if (!i && h.queue) {
                        if (old != attr[key])
                            animate(h.onAfterFirst);
                        delete attr[key]
                    }
                });
                animate(h.onAfter);
                function animate(a) {
                    $elem.animate(attr, g, h.easing, a && function() {
                        a.call(this, targ, h)
                    })
                }}
            ).end()
        };
        j.max = function(a, b) {
            var c = b == 'x' ? 'Width' : 'Height', scroll = 'scroll' + c;
            if (!$(a).is('html,body'))
                return a[scroll] - $(a)[c.toLowerCase()]();
            var d = 'client' + c, html = a.ownerDocument.documentElement, body = a.ownerDocument.body;
            return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d])
        };
        function both(a) {
            return $.isFunction(a) || $.isPlainObject(a) ? a : {top: a, left: a}
        }
        return j
    })
}(typeof define === 'function' && define.amd ? define : function(a, b) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = b(require('jquery'))
    } else {
        b(jQuery)
    }
}));
;
(function(a) {
    var b = a.serialScroll = function(c) {
        return a(window).serialScroll(c)
    };
    b.defaults = {duration: 1e3, axis: "x", event: "click", start: 0, step: 1, lock: !0, cycle: !0, constant: !0};
    a.fn.serialScroll = function(c) {
        return this.each(function() {
            var t = a.extend({}, b.defaults, c), s = t.event, i = t.step, r = t.lazy, e = t.target ? this : document, u = a(t.target || this, e), p = u[0], m = t.items, h = t.start, g = t.interval, k = t.navigation, l;
            if (!r) {
                m = d()
            }
            if (t.force) {
                f({}, h)
            }
            a(t.prev || [], e).bind(s, -i, q);
            a(t.next || [], e).bind(s, i, q);
            if (!p.ssbound) {
                u.bind("prev.serialScroll", -i, q).bind("next.serialScroll", i, q).bind("goto.serialScroll", f)
            }
            if (g) {
                u.bind("start.serialScroll", function(v) {
                    if (!g) {
                        o();
                        g = !0;
                        n()
                    }
                }).bind("stop.serialScroll", function() {
                    o();
                    g = !1
                })
            }
            u.bind("notify.serialScroll", function(x, w) {
                var v = j(w);
                if (v > -1) {
                    h = v
                }
            });
            p.ssbound = !0;
            if (t.jump) {
                (r ? u : d()).bind(s, function(v) {
                    f(v, j(v.target))
                })
            }
            if (k) {
                k = a(k, e).bind(s, function(v) {
                    v.data = Math.round(d().length / k.length) * k.index(this);
                    f(v, this)
                })
            }
            function q(v) {
                v.data += h;
                f(v, this)
            }
            function f(B, z) {
                if (!isNaN(z)) {
                    B.data = z;
                    z = p
                }
                var C = B.data, v, D = B.type, A = t.exclude ? d().slice(0, -t.exclude) : d(), y = A.length, w = A[C], x = t.duration;
                if (D) {
                    B.preventDefault()
                }
                if (g) {
                    o();
                    l = setTimeout(n, t.interval)
                }
                if (!w) {
                    v = C < 0 ? 0 : y - 1;
                    if (h != v) {
                        C = v
                    } else {
                        if (!t.cycle) {
                            return
                        } else {
                            C = y - v - 1
                        }
                    }
                    w = A[C]
                }
                if (!w || t.lock && u.is(":animated") || D && t.onBefore && t.onBefore(B, w, u, d(), C) === !1) {
                    return
                }
                if (t.stop) {
                    u.queue("fx", []).stop()
                }
                if (t.constant) {
                    x = Math.abs(x / i * (h - C))
                }
                u.scrollTo(w, x, t).trigger("notify.serialScroll", [C])
            }
            function n() {
                u.trigger("next.serialScroll")
            }
            function o() {
                clearTimeout(l)
            }
            function d() {
                return a(m, p)
            }
            function j(w) {
                if (!isNaN(w)) {
                    return w
                }
                var x = d(), v;
                while ((v = x.index(w)) == -1 && w != p) {
                    w = w.parentNode
                }
                return v
            }}
        )
    }
})(jQuery);
;
!function(t) {
    var e = {}, s = {mode: "horizontal", slideSelector: "", infiniteLoop: !0, hideControlOnEnd: !1, speed: 500, easing: null, slideMargin: 0, startSlide: 0, randomStart: !1, captions: !1, ticker: !1, tickerHover: !1, adaptiveHeight: !1, adaptiveHeightSpeed: 500, video: !1, useCSS: !0, preloadImages: "visible", responsive: !0, slideZIndex: 50, touchEnabled: !0, swipeThreshold: 50, oneToOneTouch: !0, preventDefaultSwipeX: !0, preventDefaultSwipeY: !1, pager: !0, pagerType: "full", pagerShortSeparator: " / ", pagerSelector: null, buildPager: null, pagerCustom: null, controls: !0, nextText: "Next", prevText: "Prev", nextSelector: null, prevSelector: null, autoControls: !1, startText: "Start", stopText: "Stop", autoControlsCombine: !1, autoControlsSelector: null, auto: !1, pause: 4e3, autoStart: !0, autoDirection: "next", autoHover: !1, autoDelay: 0, minSlides: 1, maxSlides: 1, moveSlides: 0, slideWidth: 0, onSliderLoad: function() {
        }, onSlideBefore: function() {
        }, onSlideAfter: function() {
        }, onSlideNext: function() {
        }, onSlidePrev: function() {
        }, onSliderResize: function() {
        }};
    t.fn.bxSlider = function(n) {
        if (0 == this.length)
            return this;
        if (this.length > 1)
            return this.each(function() {
                t(this).bxSlider(n)
            }), this;
        var o = {}, r = this;
        e.el = this;
        var a = t(window).width(), l = t(window).height(), d = function() {
            o.settings = t.extend({}, s, n), o.settings.slideWidth = parseInt(o.settings.slideWidth), o.children = r.children(o.settings.slideSelector), o.children.length < o.settings.minSlides && (o.settings.minSlides = o.children.length), o.children.length < o.settings.maxSlides && (o.settings.maxSlides = o.children.length), o.settings.randomStart && (o.settings.startSlide = Math.floor(Math.random() * o.children.length)), o.active = {index: o.settings.startSlide}, o.carousel = o.settings.minSlides > 1 || o.settings.maxSlides > 1, o.carousel && (o.settings.preloadImages = "all"), o.minThreshold = o.settings.minSlides * o.settings.slideWidth + (o.settings.minSlides - 1) * o.settings.slideMargin, o.maxThreshold = o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin, o.working = !1, o.controls = {}, o.interval = null, o.animProp = "vertical" == o.settings.mode ? "top" : "left", o.usingCSS = o.settings.useCSS && "fade" != o.settings.mode && function() {
                var t = document.createElement("div"), e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                for (var i in e)
                    if (void 0 !== t.style[e[i]])
                        return o.cssPrefix = e[i].replace("Perspective", "").toLowerCase(), o.animProp = "-" + o.cssPrefix + "-transform", !0;
                return!1
            }(), "vertical" == o.settings.mode && (o.settings.maxSlides = o.settings.minSlides), r.data("origStyle", r.attr("style")), r.children(o.settings.slideSelector).each(function() {
                t(this).data("origStyle", t(this).attr("style"))
            }), c()
        }, c = function() {
            r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'), o.viewport = r.parent(), o.loader = t('<div class="bx-loading" />'), o.viewport.prepend(o.loader), r.css({width: "horizontal" == o.settings.mode ? 100 * o.children.length + 215 + "%" : "auto", position: "relative"}), o.usingCSS && o.settings.easing ? r.css("-" + o.cssPrefix + "-transition-timing-function", o.settings.easing) : o.settings.easing || (o.settings.easing = "swing"), f(), o.viewport.css({width: "100%", overflow: "hidden", position: "relative"}), o.viewport.parent().css({maxWidth: p()}), o.settings.pager || o.viewport.parent().css({margin: "0 auto 0px"}), o.children.css({"float": "horizontal" == o.settings.mode ? "left" : "none", listStyle: "none", position: "relative"}), o.children.css("width", u()), "horizontal" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginRight", o.settings.slideMargin), "vertical" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginBottom", o.settings.slideMargin), "fade" == o.settings.mode && (o.children.css({position: "absolute", zIndex: 0, display: "none"}), o.children.eq(o.settings.startSlide).css({zIndex: o.settings.slideZIndex, display: "block"})), o.controls.el = t('<div class="bx-controls" />'), o.settings.captions && P(), o.active.last = o.settings.startSlide == x() - 1, o.settings.video && r.fitVids();
            var e = o.children.eq(o.settings.startSlide);
            "all" == o.settings.preloadImages && (e = o.children), o.settings.ticker ? o.settings.pager = !1 : (o.settings.pager && T(), o.settings.controls && C(), o.settings.auto && o.settings.autoControls && E(), (o.settings.controls || o.settings.autoControls || o.settings.pager) && o.viewport.after(o.controls.el)), g(e, h)
        }, g = function(e, i) {
            var s = e.find("img, iframe").length;
            if (0 == s)
                return i(), void 0;
            var n = 0;
            e.find("img, iframe").each(function() {
                t(this).one("load", function() {
                    ++n == s && i()
                }).each(function() {
                    this.complete && t(this).load()
                })
            })
        }, h = function() {
            if (o.settings.infiniteLoop && "fade" != o.settings.mode && !o.settings.ticker) {
                var e = "vertical" == o.settings.mode ? o.settings.minSlides : o.settings.maxSlides, i = o.children.slice(0, e).clone().addClass("bx-clone"), s = o.children.slice(-e).clone().addClass("bx-clone");
                r.append(i).prepend(s)
            }
            o.loader.remove(), S(), "vertical" == o.settings.mode && (o.settings.adaptiveHeight = !0), o.viewport.height(v()), r.redrawSlider(), o.settings.onSliderLoad(o.active.index), o.initialized = !0, o.settings.responsive && t(window).bind("resize", Z), o.settings.auto && o.settings.autoStart && H(), o.settings.ticker && L(), o.settings.pager && q(o.settings.startSlide), o.settings.controls && W(), o.settings.touchEnabled && !o.settings.ticker && O()
        }, v = function() {
            var e = 0, s = t();
            if ("vertical" == o.settings.mode || o.settings.adaptiveHeight)
                if (o.carousel) {
                    var n = 1 == o.settings.moveSlides ? o.active.index : o.active.index * m();
                    for (s = o.children.eq(n), i = 1; i <= o.settings.maxSlides - 1; i++)
                        s = n + i >= o.children.length ? s.add(o.children.eq(i - 1)) : s.add(o.children.eq(n + i))
                } else
                    s = o.children.eq(o.active.index);
            else
                s = o.children;
            return"vertical" == o.settings.mode ? (s.each(function() {
                e += t(this).outerHeight()
            }), o.settings.slideMargin > 0 && (e += o.settings.slideMargin * (o.settings.minSlides - 1))) : e = Math.max.apply(Math, s.map(function() {
                return t(this).outerHeight(!1)
            }).get()), e
        }, p = function() {
            var t = "100%";
            return o.settings.slideWidth > 0 && (t = "horizontal" == o.settings.mode ? o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin : o.settings.slideWidth), t
        }, u = function() {
            var t = o.settings.slideWidth, e = o.viewport.width();
            return 0 == o.settings.slideWidth || o.settings.slideWidth > e && !o.carousel || "vertical" == o.settings.mode ? t = e : o.settings.maxSlides > 1 && "horizontal" == o.settings.mode && (e > o.maxThreshold || e < o.minThreshold && (t = (e - o.settings.slideMargin * (o.settings.minSlides - 1)) / o.settings.minSlides)), t
        }, f = function() {
            var t = 1;
            if ("horizontal" == o.settings.mode && o.settings.slideWidth > 0)
                if (o.viewport.width() < o.minThreshold)
                    t = o.settings.minSlides;
                else if (o.viewport.width() > o.maxThreshold)
                    t = o.settings.maxSlides;
                else {
                    var e = o.children.first().width();
                    t = Math.floor(o.viewport.width() / e)
                }
            else
                "vertical" == o.settings.mode && (t = o.settings.minSlides);
            return t
        }, x = function() {
            var t = 0;
            if (o.settings.moveSlides > 0)
                if (o.settings.infiniteLoop)
                    t = o.children.length / m();
                else
                    for (var e = 0, i = 0; e < o.children.length; )
                        ++t, e = i + f(), i += o.settings.moveSlides <= f() ? o.settings.moveSlides : f();
            else
                t = Math.ceil(o.children.length / f());
            return t
        }, m = function() {
            return o.settings.moveSlides > 0 && o.settings.moveSlides <= f() ? o.settings.moveSlides : f()
        }, S = function() {
            if (o.children.length > o.settings.maxSlides && o.active.last && !o.settings.infiniteLoop) {
                if ("horizontal" == o.settings.mode) {
                    var t = o.children.last(), e = t.position();
                    b(-(e.left - (o.viewport.width() - t.width())), "reset", 0)
                } else if ("vertical" == o.settings.mode) {
                    var i = o.children.length - o.settings.minSlides, e = o.children.eq(i).position();
                    b(-e.top, "reset", 0)
                }
            } else {
                var e = o.children.eq(o.active.index * m()).position();
                o.active.index == x() - 1 && (o.active.last = !0), void 0 != e && ("horizontal" == o.settings.mode ? b(-e.left, "reset", 0) : "vertical" == o.settings.mode && b(-e.top, "reset", 0))
            }
        }, b = function(t, e, i, s) {
            if (o.usingCSS) {
                var n = "vertical" == o.settings.mode ? "translate3d(0, " + t + "px, 0)" : "translate3d(" + t + "px, 0, 0)";
                r.css("-" + o.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" == e ? (r.css(o.animProp, n), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                    r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), D()
                })) : "reset" == e ? r.css(o.animProp, n) : "ticker" == e && (r.css("-" + o.cssPrefix + "-transition-timing-function", "linear"), r.css(o.animProp, n), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                    r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), b(s.resetValue, "reset", 0), N()
                }))
            } else {
                var a = {};
                a[o.animProp] = t, "slide" == e ? r.animate(a, i, o.settings.easing, function() {
                    D()
                }) : "reset" == e ? r.css(o.animProp, t) : "ticker" == e && r.animate(a, speed, "linear", function() {
                    b(s.resetValue, "reset", 0), N()
                })
            }
        }, w = function() {
            for (var e = "", i = x(), s = 0; i > s; s++) {
                var n = "";
                o.settings.buildPager && t.isFunction(o.settings.buildPager) ? (n = o.settings.buildPager(s), o.pagerEl.addClass("bx-custom-pager")) : (n = s + 1, o.pagerEl.addClass("bx-default-pager")), e += '<div class="bx-pager-item"><a href="" data-slide-index="' + s + '" class="bx-pager-link">' + n + "</a></div>"
            }
            o.pagerEl.html(e)
        }, T = function() {
            o.settings.pagerCustom ? o.pagerEl = t(o.settings.pagerCustom) : (o.pagerEl = t('<div class="bx-pager" />'), o.settings.pagerSelector ? t(o.settings.pagerSelector).html(o.pagerEl) : o.controls.el.addClass("bx-has-pager").append(o.pagerEl), w()), o.pagerEl.on("click", "a", I)
        }, C = function() {
            o.controls.next = t('<a class="bx-next" href="">' + o.settings.nextText + "</a>"), o.controls.prev = t('<a class="bx-prev" href="">' + o.settings.prevText + "</a>"), o.controls.next.bind("click", y), o.controls.prev.bind("click", z), o.settings.nextSelector && t(o.settings.nextSelector).append(o.controls.next), o.settings.prevSelector && t(o.settings.prevSelector).append(o.controls.prev), o.settings.nextSelector || o.settings.prevSelector || (o.controls.directionEl = t('<div class="bx-controls-direction" />'), o.controls.directionEl.append(o.controls.prev).append(o.controls.next), o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))
        }, E = function() {
            o.controls.start = t('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + o.settings.startText + "</a></div>"), o.controls.stop = t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + o.settings.stopText + "</a></div>"), o.controls.autoEl = t('<div class="bx-controls-auto" />'), o.controls.autoEl.on("click", ".bx-start", k), o.controls.autoEl.on("click", ".bx-stop", M), o.settings.autoControlsCombine ? o.controls.autoEl.append(o.controls.start) : o.controls.autoEl.append(o.controls.start).append(o.controls.stop), o.settings.autoControlsSelector ? t(o.settings.autoControlsSelector).html(o.controls.autoEl) : o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl), A(o.settings.autoStart ? "stop" : "start")
        }, P = function() {
            o.children.each(function() {
                var e = t(this).find("img:first").attr("title");
                void 0 != e && ("" + e).length && t(this).append('<div class="bx-caption"><span>' + e + "</span></div>")
            })
        }, y = function(t) {
            o.settings.auto && r.stopAuto(), r.goToNextSlide(), t.preventDefault()
        }, z = function(t) {
            o.settings.auto && r.stopAuto(), r.goToPrevSlide(), t.preventDefault()
        }, k = function(t) {
            r.startAuto(), t.preventDefault()
        }, M = function(t) {
            r.stopAuto(), t.preventDefault()
        }, I = function(e) {
            o.settings.auto && r.stopAuto();
            var i = t(e.currentTarget), s = parseInt(i.attr("data-slide-index"));
            s != o.active.index && r.goToSlide(s), e.preventDefault()
        }, q = function(e) {
            var i = o.children.length;
            return"short" == o.settings.pagerType ? (o.settings.maxSlides > 1 && (i = Math.ceil(o.children.length / o.settings.maxSlides)), o.pagerEl.html(e + 1 + o.settings.pagerShortSeparator + i), void 0) : (o.pagerEl.find("a").removeClass("active"), o.pagerEl.each(function(i, s) {
                t(s).find("a").eq(e).addClass("active")
            }), void 0)
        }, D = function() {
            if (o.settings.infiniteLoop) {
                var t = "";
                0 == o.active.index ? t = o.children.eq(0).position() : o.active.index == x() - 1 && o.carousel ? t = o.children.eq((x() - 1) * m()).position() : o.active.index == o.children.length - 1 && (t = o.children.eq(o.children.length - 1).position()), t && ("horizontal" == o.settings.mode ? b(-t.left, "reset", 0) : "vertical" == o.settings.mode && b(-t.top, "reset", 0))
            }
            o.working = !1, o.settings.onSlideAfter(o.children.eq(o.active.index), o.oldIndex, o.active.index)
        }, A = function(t) {
            o.settings.autoControlsCombine ? o.controls.autoEl.html(o.controls[t]) : (o.controls.autoEl.find("a").removeClass("active"), o.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active"))
        }, W = function() {
            1 == x() ? (o.controls.prev.addClass("disabled"), o.controls.next.addClass("disabled")) : !o.settings.infiniteLoop && o.settings.hideControlOnEnd && (0 == o.active.index ? (o.controls.prev.addClass("disabled"), o.controls.next.removeClass("disabled")) : o.active.index == x() - 1 ? (o.controls.next.addClass("disabled"), o.controls.prev.removeClass("disabled")) : (o.controls.prev.removeClass("disabled"), o.controls.next.removeClass("disabled")))
        }, H = function() {
            o.settings.autoDelay > 0 ? setTimeout(r.startAuto, o.settings.autoDelay) : r.startAuto(), o.settings.autoHover && r.hover(function() {
                o.interval && (r.stopAuto(!0), o.autoPaused = !0)
            }, function() {
                o.autoPaused && (r.startAuto(!0), o.autoPaused = null)
            })
        }, L = function() {
            var e = 0;
            if ("next" == o.settings.autoDirection)
                r.append(o.children.clone().addClass("bx-clone"));
            else {
                r.prepend(o.children.clone().addClass("bx-clone"));
                var i = o.children.first().position();
                e = "horizontal" == o.settings.mode ? -i.left : -i.top
            }
            b(e, "reset", 0), o.settings.pager = !1, o.settings.controls = !1, o.settings.autoControls = !1, o.settings.tickerHover && !o.usingCSS && o.viewport.hover(function() {
                r.stop()
            }, function() {
                var e = 0;
                o.children.each(function() {
                    e += "horizontal" == o.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0)
                });
                var i = o.settings.speed / e, s = "horizontal" == o.settings.mode ? "left" : "top", n = i * (e - Math.abs(parseInt(r.css(s))));
                N(n)
            }), N()
        }, N = function(t) {
            speed = t ? t : o.settings.speed;
            var e = {left: 0, top: 0}, i = {left: 0, top: 0};
            "next" == o.settings.autoDirection ? e = r.find(".bx-clone").first().position() : i = o.children.first().position();
            var s = "horizontal" == o.settings.mode ? -e.left : -e.top, n = "horizontal" == o.settings.mode ? -i.left : -i.top, a = {resetValue: n};
            b(s, "ticker", speed, a)
        }, O = function() {
            o.touch = {start: {x: 0, y: 0}, end: {x: 0, y: 0}}, o.viewport.bind("touchstart", X)
        }, X = function(t) {
            if (o.working)
                t.preventDefault();
            else {
                o.touch.originalPos = r.position();
                var e = t.originalEvent;
                o.touch.start.x = e.changedTouches[0].pageX, o.touch.start.y = e.changedTouches[0].pageY, o.viewport.bind("touchmove", Y), o.viewport.bind("touchend", V)
            }
        }, Y = function(t) {
            var e = t.originalEvent, i = Math.abs(e.changedTouches[0].pageX - o.touch.start.x), s = Math.abs(e.changedTouches[0].pageY - o.touch.start.y);
            if (3 * i > s && o.settings.preventDefaultSwipeX ? t.preventDefault() : 3 * s > i && o.settings.preventDefaultSwipeY && t.preventDefault(), "fade" != o.settings.mode && o.settings.oneToOneTouch) {
                var n = 0;
                if ("horizontal" == o.settings.mode) {
                    var r = e.changedTouches[0].pageX - o.touch.start.x;
                    n = o.touch.originalPos.left + r
                } else {
                    var r = e.changedTouches[0].pageY - o.touch.start.y;
                    n = o.touch.originalPos.top + r
                }
                b(n, "reset", 0)
            }
        }, V = function(t) {
            o.viewport.unbind("touchmove", Y);
            var e = t.originalEvent, i = 0;
            if (o.touch.end.x = e.changedTouches[0].pageX, o.touch.end.y = e.changedTouches[0].pageY, "fade" == o.settings.mode) {
                var s = Math.abs(o.touch.start.x - o.touch.end.x);
                s >= o.settings.swipeThreshold && (o.touch.start.x > o.touch.end.x ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto())
            } else {
                var s = 0;
                "horizontal" == o.settings.mode ? (s = o.touch.end.x - o.touch.start.x, i = o.touch.originalPos.left) : (s = o.touch.end.y - o.touch.start.y, i = o.touch.originalPos.top), !o.settings.infiniteLoop && (0 == o.active.index && s > 0 || o.active.last && 0 > s) ? b(i, "reset", 200) : Math.abs(s) >= o.settings.swipeThreshold ? (0 > s ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto()) : b(i, "reset", 200)
            }
            o.viewport.unbind("touchend", V)
        }, Z = function() {
            var e = t(window).width(), i = t(window).height();
            (a != e || l != i) && (a = e, l = i, r.redrawSlider(), o.settings.onSliderResize.call(r, o.active.index))
        };
        return r.goToSlide = function(e, i) {
            if (!o.working && o.active.index != e)
                if (o.working = !0, o.oldIndex = o.active.index, o.active.index = 0 > e ? x() - 1 : e >= x() ? 0 : e, o.settings.onSlideBefore(o.children.eq(o.active.index), o.oldIndex, o.active.index), "next" == i ? o.settings.onSlideNext(o.children.eq(o.active.index), o.oldIndex, o.active.index) : "prev" == i && o.settings.onSlidePrev(o.children.eq(o.active.index), o.oldIndex, o.active.index), o.active.last = o.active.index >= x() - 1, o.settings.pager && q(o.active.index), o.settings.controls && W(), "fade" == o.settings.mode)
                    o.settings.adaptiveHeight && o.viewport.height() != v() && o.viewport.animate({height: v()}, o.settings.adaptiveHeightSpeed), o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex: 0}), o.children.eq(o.active.index).css("zIndex", o.settings.slideZIndex + 1).fadeIn(o.settings.speed, function() {
                        t(this).css("zIndex", o.settings.slideZIndex), D()
                    });
                else {
                    o.settings.adaptiveHeight && o.viewport.height() != v() && o.viewport.animate({height: v()}, o.settings.adaptiveHeightSpeed);
                    var s = 0, n = {left: 0, top: 0};
                    if (!o.settings.infiniteLoop && o.carousel && o.active.last)
                        if ("horizontal" == o.settings.mode) {
                            var a = o.children.eq(o.children.length - 1);
                            n = a.position(), s = o.viewport.width() - a.outerWidth()
                        } else {
                            var l = o.children.length - o.settings.minSlides;
                            n = o.children.eq(l).position()
                        }
                    else if (o.carousel && o.active.last && "prev" == i) {
                        var d = 1 == o.settings.moveSlides ? o.settings.maxSlides - m() : (x() - 1) * m() - (o.children.length - o.settings.maxSlides), a = r.children(".bx-clone").eq(d);
                        n = a.position()
                    } else if ("next" == i && 0 == o.active.index)
                        n = r.find("> .bx-clone").eq(o.settings.maxSlides).position(), o.active.last = !1;
                    else if (e >= 0) {
                        var c = e * m();
                        n = o.children.eq(c).position()
                    }
                    if ("undefined" != typeof n) {
                        var g = "horizontal" == o.settings.mode ? -(n.left - s) : -n.top;
                        b(g, "slide", o.settings.speed)
                    }
                }
        }, r.goToNextSlide = function() {
            if (o.settings.infiniteLoop || !o.active.last) {
                var t = parseInt(o.active.index) + 1;
                r.goToSlide(t, "next")
            }
        }, r.goToPrevSlide = function() {
            if (o.settings.infiniteLoop || 0 != o.active.index) {
                var t = parseInt(o.active.index) - 1;
                r.goToSlide(t, "prev")
            }
        }, r.startAuto = function(t) {
            o.interval || (o.interval = setInterval(function() {
                "next" == o.settings.autoDirection ? r.goToNextSlide() : r.goToPrevSlide()
            }, o.settings.pause), o.settings.autoControls && 1 != t && A("stop"))
        }, r.stopAuto = function(t) {
            o.interval && (clearInterval(o.interval), o.interval = null, o.settings.autoControls && 1 != t && A("start"))
        }, r.getCurrentSlide = function() {
            return o.active.index
        }, r.getCurrentSlideElement = function() {
            return o.children.eq(o.active.index)
        }, r.getSlideCount = function() {
            return o.children.length
        }, r.redrawSlider = function() {
            o.children.add(r.find(".bx-clone")).outerWidth(u()), o.viewport.css("height", v()), o.settings.ticker || S(), o.active.last && (o.active.index = x() - 1), o.active.index >= x() && (o.active.last = !0), o.settings.pager && !o.settings.pagerCustom && (w(), q(o.active.index))
        }, r.destroySlider = function() {
            o.initialized && (o.initialized = !1, t(".bx-clone", this).remove(), o.children.each(function() {
                void 0 != t(this).data("origStyle") ? t(this).attr("style", t(this).data("origStyle")) : t(this).removeAttr("style")
            }), void 0 != t(this).data("origStyle") ? this.attr("style", t(this).data("origStyle")) : t(this).removeAttr("style"), t(this).unwrap().unwrap(), o.controls.el && o.controls.el.remove(), o.controls.next && o.controls.next.remove(), o.controls.prev && o.controls.prev.remove(), o.pagerEl && o.settings.controls && o.pagerEl.remove(), t(".bx-caption", this).remove(), o.controls.autoEl && o.controls.autoEl.remove(), clearInterval(o.interval), o.settings.responsive && t(window).unbind("resize", Z))
        }, r.reloadSlider = function(t) {
            void 0 != t && (n = t), r.destroySlider(), d()
        }, d(), this
    }
}(jQuery);
;
var serialScrollNbImagesDisplayed;
var selectedCombination = [];
var globalQuantity = 0;
var colors = [];
var original_url = window.location + '';
var first_url_check = true;
var firstTime = true;
if (typeof product_big_image === 'undefined')
    var product_big_image = false;
if (typeof customizationFields !== 'undefined' && customizationFields)
{
    var customizationFieldsBk = customizationFields;
    customizationFields = [];
    var j = 0;
    for (var i = 0; i < customizationFieldsBk.length; ++i)
    {
        var key = 'pictures_' + parseInt(id_product) + '_' + parseInt(customizationFieldsBk[i]['id_customization_field']);
        customizationFields[i] = [];
        customizationFields[i][0] = (parseInt(customizationFieldsBk[i]['type']) == 0) ? 'img' + i : 'textField' + j++;
        customizationFields[i][1] = (parseInt(customizationFieldsBk[i]['type']) == 0 && customizationFieldsBk[i][key]) ? 2 : parseInt(customizationFieldsBk[i]['required']);
    }
}
if (typeof combinationImages !== 'undefined' && combinationImages)
{
    combinationImagesJS = [];
    combinationImagesJS[0] = [];
    var k = 0;
    for (var i in combinationImages)
    {
        combinationImagesJS[i] = [];
        for (var j in combinationImages[i])
        {
            var id_image = parseInt(combinationImages[i][j]['id_image']);
            if (id_image)
            {
                combinationImagesJS[0][k++] = id_image;
                combinationImagesJS[i][j] = [];
                combinationImagesJS[i][j] = id_image;
            }
        }
    }
    if (typeof combinationImagesJS[0] !== 'undefined' && combinationImagesJS[0])
    {
        var array_values = [];
        for (var key in arrayUnique(combinationImagesJS[0]))
            array_values.push(combinationImagesJS[0][key]);
        combinationImagesJS[0] = array_values;
    }
    combinationImages = combinationImagesJS;
}
if (typeof combinations !== 'undefined' && combinations)
{
    combinationsJS = [];
    combinationsHashSet = {};
    var k = 0;
    for (var i in combinations)
    {
        globalQuantity += combinations[i]['quantity'];
        combinationsJS[k] = [];
        combinationsJS[k]['idCombination'] = parseInt(i);
        combinationsJS[k]['idsAttributes'] = combinations[i]['attributes'];
        combinationsJS[k]['quantity'] = combinations[i]['quantity'];
        combinationsJS[k]['price'] = combinations[i]['price'];
        combinationsJS[k]['ecotax'] = combinations[i]['ecotax'];
        combinationsJS[k]['image'] = parseInt(combinations[i]['id_image']);
        combinationsJS[k]['reference'] = combinations[i]['reference'];
        combinationsJS[k]['unit_price'] = combinations[i]['unit_impact'];
        combinationsJS[k]['minimal_quantity'] = parseInt(combinations[i]['minimal_quantity']);
        combinationsJS[k]['available_date'] = [];
        combinationsJS[k]['available_date']['date'] = combinations[i]['available_date'];
        combinationsJS[k]['available_date']['date_formatted'] = combinations[i]['date_formatted'];
        combinationsJS[k]['specific_price'] = [];
        combinationsJS[k]['specific_price']['reduction_percent'] = (combinations[i]['specific_price'] && combinations[i]['specific_price']['reduction'] && combinations[i]['specific_price']['reduction_type'] == 'percentage') ? combinations[i]['specific_price']['reduction'] * 100 : 0;
        combinationsJS[k]['specific_price']['reduction_price'] = (combinations[i]['specific_price'] && combinations[i]['specific_price']['reduction'] && combinations[i]['specific_price']['reduction_type'] == 'amount') ? combinations[i]['specific_price']['reduction'] : 0;
        combinationsJS[k]['price'] = (combinations[i]['specific_price'] && combinations[i]['specific_price']['price'] && parseInt(combinations[i]['specific_price']['price']) != -1) ? combinations[i]['specific_price']['price'] : combinations[i]['price'];
        combinationsJS[k]['reduction_type'] = (combinations[i]['specific_price'] && combinations[i]['specific_price']['reduction_type']) ? combinations[i]['specific_price']['reduction_type'] : '';
        combinationsJS[k]['id_product_attribute'] = (combinations[i]['specific_price'] && combinations[i]['specific_price']['id_product_attribute']) ? combinations[i]['specific_price']['id_product_attribute'] : 0;
        var key = combinationsJS[k]['idsAttributes'].sort().join('-');
        combinationsHashSet[key] = combinationsJS[k];
        k++;
    }
    combinations = combinationsJS;
}
jQuery(document).ready(function($)
{
    var url_found = checkUrl();
    if (!url_found)
    {
        if (typeof productHasAttributes !== 'undefined' && productHasAttributes)
            findCombination();
        else
            refreshProductImages(0);
    }
    if (!!$.prototype.serialScroll && (typeof (pro_thumbnails) === 'undefined' || !pro_thumbnails))
        $('#thumbs_list').serialScroll({items: 'li:visible', prev: '#view_scroll_left', next: '#view_scroll_right', axis: 'x', offset: 0, start: 0, stop: true, onBefore: serialScrollFixLock, duration: 700, step: 1, lazy: true, lock: false, force: false, cycle: false});
    $('#thumbs_list').trigger('goto', 0);
    if (typeof (contentOnly) !== 'undefined' && !contentOnly && typeof (zoom_type) !== 'undefined' && zoom_type < 2)
    {
        if ($('#thumbs_list .shown img').length)
        {
            var thumb_rel = $.extend({}, eval("(" + $.trim($('#thumbs_list .shown').attr('rel')) + ")"));
            if (thumb_rel.smallimage && thumb_rel.largeimage)
            {
                var thumb_rel_smallimage = thumb_rel.smallimage;
                var thumb_rel_largeimage = thumb_rel.largeimage;
                $('#thumbs_list a').removeClass('zoomThumbActive');
                $('#thumbs_list .shown').addClass('zoomThumbActive');
                if ($('.jqzoom img').attr('src') != thumb_rel_smallimage)
                    $('.jqzoom img').attr('src', thumb_rel_smallimage).parent().attr('href', thumb_rel_largeimage);
            }
        }
        var jqzoom_ins = $('.jqzoom').jqzoom({zoomType: (typeof (zoom_type) !== 'undefined' && zoom_type == 1) ? 'innerzoom' : 'standard', zoomWidth: (typeof (product_main_image_width) !== 'undefined' && product_main_image_width > 0) ? product_main_image_width : 367, zoomHeight: (typeof (product_main_image_height) !== 'undefined' && product_main_image_height > 0) ? product_main_image_height : 420, xOffset: 21, yOffset: 0, title: false});
    }
    if (typeof (contentOnly) !== 'undefined' && !contentOnly)
    {
        if (!contentOnly && !!$.prototype.fancybox)
        {
            $('li:visible .fancybox, .fancybox.shown').fancybox({'hideOnContentClick': true, 'openEffect': 'elastic', 'closeEffect': 'elastic', 'beforeLoad': function() {
                    if (st_responsive && $(window).width() <= 768)
                        return false;
                }});
        }
        else if (contentOnly) {
            $('#buy_block').attr('target', '_top');
        }
    }
    if (!!$.prototype.uniform)
    {
        if (typeof product_fileDefaultHtml !== 'undefined')
            $.uniform.defaults.fileDefaultHtml = product_fileDefaultHtml;
        if (typeof product_fileButtonHtml !== 'undefined')
            $.uniform.defaults.fileButtonHtml = product_fileButtonHtml;
    }
    if ($('#customizationForm').length)
    {
        var url = window.location + '';
        if (url.indexOf('#') != -1)
            getProductAttribute();
    }
});
function findSpecificPrice() {
    var domData = $("#quantityDiscount table tbody tr").not(":hidden");
    var nbProduct = $('#quantity_wanted').val();
    var newPrice = false;
    domData.each(function(i) {
        var dataDiscountQuantity = parseInt($(this).attr('data-discount-quantity'));
        var dataDiscountNextQuantity = -1;
        var nextQtDiscount = $(domData[i + 1]);
        if (nextQtDiscount.length) {
            dataDiscountNextQuantity = parseInt(nextQtDiscount.attr('data-discount-quantity'));
        }
        if ((dataDiscountNextQuantity != -1 && nbProduct >= dataDiscountQuantity && nbProduct < dataDiscountNextQuantity) || (dataDiscountNextQuantity == -1 && nbProduct >= dataDiscountQuantity)) {
            newPrice = $(this).attr('data-real-discount-value');
            return false;
        }
    });
    return newPrice;
}
$(window).resize(function() {
    $('#thumbs_list').trigger('goto', 0);
    serialScrollFixLock('', '', '', '', 0);
});
$(window).bind('hashchange', function() {
    checkUrl();
    findCombination();
});
$(document).on('mouseover', '#views_block li a', function() {
    displayImage($(this));
});
$(document).on('click', '#view_full_size, #image-block', function(e) {
    $('#views_block .shown').click();
});
$(document).on('click', '#short_description_block .button', function(e) {
    $('#more_info_tab_more_info').click();
    $.scrollTo('#more_info_tabs', 1200);
});
$(document).on('click', '#customizedDatas input', function(e) {
    $('#customizedDatas input').hide();
    $('#ajax-loader').fadeIn();
    $('#customizedDatas').append(uploading_in_progress);
});
$(document).on('click', 'a[data-id=resetImages]', function(e) {
    e.preventDefault();
    refreshProductImages(0);
});
$(document).on('click', '.color_pick', function(e) {
    e.preventDefault();
    colorPickerClick($(this));
    getProductAttribute();
});
$(document).on('change', '#quantity_wanted', function(e) {
    e.preventDefault();
    var specificPrice = findSpecificPrice();
    if (false !== specificPrice) {
        $('#our_price_display').text(specificPrice);
    } else {
        if (typeof productHasAttributes != 'undefined' && productHasAttributes) {
            updateDisplay();
        } else {
            $('#our_price_display').text(formatCurrency(parseFloat($('#our_price_display').attr('content')), currencyFormat, currencySign, currencyBlank));
        }
    }
});
$(document).on('change', '.attribute_select', function(e) {
    e.preventDefault();
    findCombination();
    getProductAttribute();
});
$(document).on('click', '.attribute_radio', function(e) {
    e.preventDefault();
    getProductAttribute();
});
$(document).on('click', 'button[name=saveCustomization]', function(e) {
    saveCustomization();
});
if (typeof ad !== 'undefined' && ad && typeof adtoken !== 'undefined' && adtoken)
{
    $(document).on('click', 'a#publish_button', function(e) {
        e.preventDefault();
        submitPublishProduct(ad, 0, adtoken);
    });
    $(document).on('click', 'a#lnk_view', function(e) {
        e.preventDefault();
        submitPublishProduct(ad, 1, adtoken);
    });
}
if (typeof (contentOnly) !== 'undefined' && contentOnly)
{
    $(document).on('click', '.fancybox', function(e) {
        e.preventDefault();
    });
    $(document).on('click', '#image-block', function(e) {
        e.preventDefault();
        var productUrl = window.document.location.href + '';
        var data = productUrl.replace(/[\?|&]content_only=1/, '');
        if (window.parent.page_name == 'search')
            data += ((data.indexOf('?') < 0) ? '?' : '&') + 'HTTP_REFERER=' + encodeURIComponent(window.parent.document.location.href);
        window.parent.document.location.href = data;
        return;
    });
}
$(document).on('click', '.product_quantity_up', function(e) {
    e.preventDefault();
    fieldName = $(this).data('field-qty');
    var currentVal = parseInt($('input[name=' + fieldName + ']').val());
    if (!allowBuyWhenOutOfStock && quantityAvailable > 0)
        quantityAvailableT = quantityAvailable;
    else
        quantityAvailableT = 100000000;
    if (!isNaN(currentVal) && currentVal < quantityAvailableT)
        $('input[name=' + fieldName + ']').val(currentVal + 1).trigger('keyup');
    else
        $('input[name=' + fieldName + ']').val(quantityAvailableT);
    $('#quantity_wanted').change();
});
$(document).on('click', '.product_quantity_down', function(e) {
    e.preventDefault();
    fieldName = $(this).data('field-qty');
    var currentVal = parseInt($('input[name=' + fieldName + ']').val());
    if (!isNaN(currentVal) && currentVal > 1)
        $('input[name=' + fieldName + ']').val(currentVal - 1).trigger('keyup');
    else
        $('input[name=' + fieldName + ']').val(1);
    $('#quantity_wanted').change();
});
if (typeof minimalQuantity !== 'undefined' && minimalQuantity)
{
    checkMinimalQuantity();
    $(document).on('keyup', 'input[name=qty]', function(e) {
        checkMinimalQuantity(minimalQuantity);
    });
}
function arrayUnique(a)
{
    return a.reduce(function(p, c) {
        if (p.indexOf(c) < 0)
            p.push(c);
        return p;
    }, []);
}
;
function function_exists(function_name)
{
    if (typeof function_name === 'string')
        function_name = this.window[function_name];
    return typeof function_name === 'function';
}
function oosHookJsCode()
{
    for (var i = 0; i < oosHookJsCodeFunctions.length; i++)
    {
        if (function_exists(oosHookJsCodeFunctions[i]))
            setTimeout(oosHookJsCodeFunctions[i] + '()', 0);
    }
}
function addCombination(idCombination, arrayOfIdAttributes, quantity, price, ecotax, id_image, reference, unit_price, minimal_quantity, available_date, combination_specific_price)
{
    globalQuantity += quantity;
    var combination = [];
    combination['idCombination'] = idCombination;
    combination['quantity'] = quantity;
    combination['idsAttributes'] = arrayOfIdAttributes;
    combination['price'] = price;
    combination['ecotax'] = ecotax;
    combination['image'] = id_image;
    combination['reference'] = reference;
    combination['unit_price'] = unit_price;
    combination['minimal_quantity'] = minimal_quantity;
    combination['available_date'] = [];
    combination['available_date'] = available_date;
    combination['specific_price'] = [];
    combination['specific_price'] = combination_specific_price;
    combinations.push(combination);
}
function findCombination()
{
    $('#minimal_quantity_wanted_p').fadeOut();
    if (typeof $('#minimal_quantity_label').text() === 'undefined' || $('#minimal_quantity_label').html() > 1)
        $('#quantity_wanted').val(1);
    var choice = [];
    var radio_inputs = parseInt($('#attributes .checked > input[type=radio]').length);
    if (radio_inputs)
        radio_inputs = '#attributes .checked > input[type=radio]';
    else
        radio_inputs = '#attributes input[type=radio]:checked';
    $('#attributes select, #attributes input[type=hidden], ' + radio_inputs).each(function() {
        choice.push(parseInt($(this).val()));
    });
    if (typeof combinationsHashSet !== 'undefined') {
        var combination = combinationsHashSet[choice.sort().join('-')];
        if (combination)
        {
            if (combination['minimal_quantity'] > 1)
            {
                $('#minimal_quantity_label').html(combination['minimal_quantity']);
                $('#minimal_quantity_wanted_p').fadeIn();
                $('#quantity_wanted').val(combination['minimal_quantity']);
                $('#quantity_wanted').bind('keyup', function() {
                    checkMinimalQuantity(combination['minimal_quantity']);
                });
            }
            selectedCombination['unavailable'] = false;
            selectedCombination['reference'] = combination['reference'];
            $('#idCombination').val(combination['idCombination']);
            quantityAvailable = combination['quantity'];
            selectedCombination['price'] = combination['price'];
            selectedCombination['unit_price'] = combination['unit_price'];
            selectedCombination['specific_price'] = combination['specific_price'];
            if (combination['ecotax'])
                selectedCombination['ecotax'] = combination['ecotax'];
            else
                selectedCombination['ecotax'] = default_eco_tax;
            if (combination['image'] && combination['image'] != -1)
                displayImage($('#thumb_' + combination['image']).parent());
            if (combination['idCombination'] && combination['idCombination'] > 0)
                displayDiscounts(combination['idCombination']);
            selectedCombination['available_date'] = combination['available_date'];
            updateDisplay();
            if (firstTime)
            {
                refreshProductImages(0);
                firstTime = false;
            }
            else
                refreshProductImages(combination['idCombination']);
            return;
        }
    }
    selectedCombination['unavailable'] = true;
    if (typeof (selectedCombination['available_date']) !== 'undefined')
        delete selectedCombination['available_date'];
    updateDisplay();
}
function updateDisplay()
{
    var productPriceDisplay = productPrice;
    var productPriceWithoutReductionDisplay = productPriceWithoutReduction;
    if (!selectedCombination['unavailable'] && quantityAvailable > 0 && productAvailableForOrder == 1)
    {
        $('#quantity_wanted_p:hidden').show('slow');
        $('#add_to_cart:hidden').fadeIn(600);
        $('#oosHook').hide();
        $('#availability_date').fadeOut();
        if (stock_management && availableNowValue != '')
        {
            $('#availability_value').removeClass('st-label-warning').addClass('st-label-success').text(availableNowValue).show();
            $('#availability_statut:hidden').show('slow');
        }
        else
            $('#availability_statut:visible').hide('slow');
        if (!allowBuyWhenOutOfStock)
        {
            if (quantityAvailable <= maxQuantityToAllowDisplayOfLastQuantityMessage)
                $('#last_quantities').show('slow');
            else
                $('#last_quantities').hide('slow');
        }
        if (quantitiesDisplayAllowed)
        {
            $('#pQuantityAvailable:hidden').show('slow');
            $('#quantityAvailable').text(quantityAvailable);
            if (quantityAvailable < 2)
            {
                $('#quantityAvailableTxt').show();
                $('#quantityAvailableTxtMultiple').hide();
            }
            else
            {
                $('#quantityAvailableTxt').hide();
                $('#quantityAvailableTxtMultiple').show();
            }
        }
    }

    if (selectedCombination['reference'] || productReference)
    {
        if (selectedCombination['reference'])
            $('#product_reference span').text(selectedCombination['reference']);
        else if (productReference)
            $('#product_reference span').text(productReference);
        $('#product_reference:hidden').show('slow');
    }
    else
        $('#product_reference:visible').hide('slow');
    if (productHasAttributes)
        updatePrice();
}
function updatePrice()
{
    var combID = $('#idCombination').val();
    var combination = combinationsFromController[combID];
    if (typeof combination == 'undefined')
        return;
    var basePriceWithoutTax = +productPriceTaxExcluded;
    var basePriceWithTax = +productPriceTaxIncluded;
    var priceWithGroupReductionWithoutTax = 0;
    priceWithGroupReductionWithoutTax = basePriceWithoutTax * (1 - groupReduction);
    basePriceWithoutTax = basePriceWithoutTax + combination.price;
    basePriceWithTax = basePriceWithTax + +combination.price * (taxRate / 100 + 1);
    if (combination.specific_price && combination.specific_price.price > 0)
    {
        basePriceWithoutTax = +combination.specific_price.price;
        basePriceWithTax = +combination.specific_price.price * (taxRate / 100 + 1);
    }
    var priceWithDiscountsWithoutTax = basePriceWithoutTax;
    var priceWithDiscountsWithTax = basePriceWithTax;
    if (default_eco_tax)
    {
        priceWithDiscountsWithoutTax = priceWithDiscountsWithoutTax + default_eco_tax * (1 + ecotaxTax_rate / 100);
        priceWithDiscountsWithTax = priceWithDiscountsWithTax + default_eco_tax * (1 + ecotaxTax_rate / 100);
        basePriceWithTax = basePriceWithTax + default_eco_tax * (1 + ecotaxTax_rate / 100);
        basePriceWithoutTax = basePriceWithoutTax + default_eco_tax * (1 + ecotaxTax_rate / 100);
    }
    if (combination.specific_price && combination.specific_price.reduction > 0)
    {
        if (combination.specific_price.reduction_type == 'amount')
        {
            if (typeof combination.specific_price.reduction_tax !== 'undefined' && combination.specific_price.reduction_tax === "0")
            {
                var reduction = combination.specific_price.reduction;
                if (combination.specific_price.id_currency == 0)
                    reduction = reduction * currencyRate * (1 - groupReduction);
                priceWithDiscountsWithoutTax -= reduction;
                priceWithDiscountsWithTax -= reduction * (taxRate / 100 + 1);
            }
        }
        else if (combination.specific_price.reduction_type == 'percentage')
        {
            priceWithDiscountsWithoutTax = priceWithDiscountsWithoutTax * (1 - +combination.specific_price.reduction);
            priceWithDiscountsWithTax = priceWithDiscountsWithTax * (1 - +combination.specific_price.reduction);
        }
    }
    if (noTaxForThisProduct || customerGroupWithoutTax)
    {
        basePriceDisplay = basePriceWithoutTax;
        priceWithDiscountsDisplay = priceWithDiscountsWithoutTax;
    }
    else
    {
        basePriceDisplay = basePriceWithTax;
        priceWithDiscountsDisplay = priceWithDiscountsWithTax;
    }
    if (combination.specific_price && combination.specific_price.reduction > 0)
    {
        if (combination.specific_price.reduction_type == 'amount')
        {
            if (typeof combination.specific_price.reduction_tax === 'undefined' || (typeof combination.specific_price.reduction_tax !== 'undefined' && combination.specific_price.reduction_tax === '1'))
            {
                var reduction = combination.specific_price.reduction;
                if (typeof specific_currency !== 'undefined' && specific_currency && parseInt(combination.specific_price.id_currency) && combination.specific_price.id_currency != currency.id)
                    reduction = reduction / currencyRate;
                else if (!specific_currency)
                    reduction = reduction * currencyRate;
                if (typeof groupReduction !== 'undefined' && groupReduction > 0)
                    reduction *= 1 - parseFloat(groupReduction);
                priceWithDiscountsDisplay -= reduction;
                priceWithDiscountsWithoutTax = priceWithDiscountsDisplay - reduction * (1 / (1 + taxRate / 100));
            }
        }
    }
    if (priceWithDiscountsDisplay < 0)
    {
        priceWithDiscountsDisplay = 0;
    }
    if (basePriceDisplay != priceWithDiscountsDisplay)
    {
        var discountValue = basePriceDisplay - priceWithDiscountsDisplay;
        var discountPercentage = (1 - (priceWithDiscountsDisplay / basePriceDisplay)) * 100;
    }
    var unit_impact = +combination.unit_impact;
    if (productUnitPriceRatio > 0 || unit_impact)
    {
        if (unit_impact)
        {
            baseUnitPrice = productBasePriceTaxExcl / productUnitPriceRatio;
            unit_price = baseUnitPrice + unit_impact;
            if (!noTaxForThisProduct || !customerGroupWithoutTax)
                unit_price = unit_price * (taxRate / 100 + 1);
        }
        else
            unit_price = priceWithDiscountsDisplay / productUnitPriceRatio;
    }
    $('#reduction_percent').hide();
    $('#reduction_amount').hide();
    $('#old_price, #old_price_display, #old_price_display_taxes').hide();
    $('.price-ecotax').hide();
    $('.unit-price').hide();
    if (priceWithDiscountsDisplay > 0)
    {
        $('#our_price_display').text(formatCurrency(priceWithDiscountsDisplay, currencyFormat, currencySign, currencyBlank)).trigger('change');
    }
    else
    {
        $('#our_price_display').text(formatCurrency(0, currencyFormat, currencySign, currencyBlank)).trigger('change');
    }
    if (priceWithDiscountsDisplay.toFixed(2) != basePriceDisplay.toFixed(2))
    {
        $('#old_price_display').text(formatCurrency(basePriceDisplay, currencyFormat, currencySign, currencyBlank));
        $('#old_price,#old_price_display,#old_price_display_taxes').show();
        if (priceWithDiscountsWithoutTax != priceWithGroupReductionWithoutTax)
        {
            if (combination.specific_price.reduction_type == 'amount')
            {
                $('#reduction_amount_display').html((typeof (discount_percentage) != 'undefined' && discount_percentage == 2 ? reduction_save + '<br/>' : '') + '-' + formatCurrency(discountValue, currencyFormat, currencySign, currencyBlank));
                $('#reduction_amount').show();
            }
            else
            {
                var toFix = 2;
                if ((parseFloat(discountPercentage).toFixed(2) - parseFloat(discountPercentage).toFixed(0)) == 0)
                    toFix = 0;
                $('#reduction_percent_display').html('-' + parseFloat(discountPercentage).toFixed(toFix) + '%');
                $('#reduction_percent').show();
            }
        }
    }
    if (default_eco_tax)
    {
        ecotax = default_eco_tax;
        if (combination.ecotax)
            ecotax = +combination.ecotax;
        if (!noTaxForThisProduct)
            ecotax = ecotax * (1 + ecotaxTax_rate / 100)
        $('#ecotax_price_display').text(formatCurrency(ecotax * currencyRate, currencyFormat, currencySign, currencyBlank));
        $('.price-ecotax').show();
    }
    if (productUnitPriceRatio > 0)
    {
        $('#unit_price_display').text(formatCurrency(unit_price * currencyRate, currencyFormat, currencySign, currencyBlank));
        $('.unit-price').show();
    }
    if (noTaxForThisProduct || customerGroupWithoutTax)
        updateDiscountTable(priceWithDiscountsWithoutTax);
    else
        updateDiscountTable(priceWithDiscountsWithTax);
}
function displayImage(domAAroundImgThumb, no_animation)
{
    if (typeof (no_animation) == 'undefined')
        no_animation = false;
    var old_href = domAAroundImgThumb.data('bigpic');
    if (!old_href)
        old_href = domAAroundImgThumb.attr('href');
    if (old_href)
    {
        if (product_big_image)
            var new_src = old_href.replace('thickbox', 'big');
        else
            var new_src = old_href.replace('thickbox', 'large');
        var new_title = domAAroundImgThumb.attr('title');
        var new_href = old_href;
        if ($('#bigpic').attr('src') != new_src)
        {
            $('#bigpic').attr({'src': new_src, 'alt': new_title, 'title': new_title}).load(function() {
                if (typeof (zoom_type) !== 'undefined' && zoom_type < 2)
                    $(this).attr('rel', new_href);
            });
        }
        $('#views_block li a').removeClass('shown');
        $(domAAroundImgThumb).addClass('shown');
    }
}
function displayDiscounts(combination)
{
    var quantityDiscountTable = $('#quantityDiscount');
    var combinationsSpecificQuantityDiscount = $('#quantityDiscount_' + combination, quantityDiscountTable);
    var allQuantityDiscount = $('#quantityDiscount_0', quantityDiscountTable);
    if (combinationsSpecificQuantityDiscount.length != 0) {
        combinationsSpecificQuantityDiscount.show();
        quantityDiscountTable.show();
    } else if (allQuantityDiscount.length != 0) {
        allQuantityDiscount.show();
        $('tbody tr', quantityDiscountTable).not('#quantityDiscount_0').hide();
        quantityDiscountTable.show();
    } else {
        quantityDiscountTable.hide();
    }
}
function updateDiscountTable(newPrice)
{
    $('#quantityDiscount tbody tr').each(function() {
        var type = $(this).data("discount-type");
        var discount = $(this).data("discount");
        var quantity = $(this).data("discount-quantity");
        if (type == 'percentage')
        {
            var discountedPrice = newPrice * (1 - discount / 100);
            var discountUpTo = newPrice * (discount / 100) * quantity;
        }
        else if (type == 'amount')
        {
            var discountedPrice = newPrice - discount;
            var discountUpTo = discount * quantity;
        }
        if (displayDiscountPrice != 0)
            $(this).children('td').eq(1).text(formatCurrency(discountedPrice * currencyRate, currencyFormat, currencySign, currencyBlank));
        $(this).children('td').eq(2).text(upToTxt + ' ' + formatCurrency(discountUpTo * currencyRate, currencyFormat, currencySign, currencyBlank));
    });
}
function serialScrollFixLock(event, targeted, scrolled, items, position)
{
    if (typeof (pro_thumbnails) !== 'undefined' && pro_thumbnails)
        return true;
    var serialScrollNbImages = $('#thumbs_list li:visible').length;
    serialScrollNbImagesDisplayed = $('#thumbs_list').outerWidth(true) / $('#thumbs_list_frame li').eq(0).outerWidth(true);
    var leftArrow = position == 0 ? true : false;
    var rightArrow = position + serialScrollNbImagesDisplayed >= serialScrollNbImages ? true : false;
    $('#view_scroll_left').css('cursor', leftArrow ? 'default' : 'pointer').css('display', leftArrow ? 'none' : 'block').fadeTo(0, leftArrow ? 0 : 1);
    $('#view_scroll_right').css('cursor', rightArrow ? 'default' : 'pointer').fadeTo(0, rightArrow ? 0 : 1).css('display', rightArrow ? 'none' : 'block');
    return true;
}
function serialScrollSetNbImages()
{
    serialScrollNbImagesDisplayed = 4;
    if ($('#thumbs_list').outerWidth(true) < 194)
        serialScrollNbImagesDisplayed = 1;
    if ($('#thumbs_list').outerWidth(true) < 294)
        serialScrollNbImagesDisplayed = 2;
    else if ($('#thumbs_list').outerWidth(true) < 392)
        serialScrollNbImagesDisplayed = 3;
}
function refreshProductImages(id_product_attribute)
{
    id_product_attribute = parseInt(id_product_attribute);
    if (id_product_attribute > 0 && typeof (combinationImages) !== 'undefined' && typeof (combinationImages[id_product_attribute]) !== 'undefined')
    {
        $('#thumbs_list li').hide();
        for (var i = 0; i < combinationImages[id_product_attribute].length; i++)
            if (typeof (zoom_type) !== 'undefined' && zoom_type < 2)
                $('#thumbnail_' + parseInt(combinationImages[id_product_attribute][i])).show().children('a.shown').trigger('click');
            else
                $('#thumbnail_' + parseInt(combinationImages[id_product_attribute][i])).show();
    }
    else
    {
        $('#thumbs_list li').show();
        var choice = [];
        var radio_inputs = parseInt($('#attributes .checked > input[type=radio]').length);
        if (radio_inputs)
            radio_inputs = '#attributes .checked > input[type=radio]';
        else
            radio_inputs = '#attributes input[type=radio]:checked';
        $('#attributes select, #attributes input[type=hidden], ' + radio_inputs).each(function() {
            choice.push(parseInt($(this).val()));
        });
        if (typeof combinationsHashSet !== 'undefined') {
            var combination = combinationsHashSet[choice.sort().join('-')];
            if (combination) {
                if (combination['image'] && combination['image'] != -1)
                    displayImage($('#thumb_' + combination['image']).parent());
            }
        }
    }
    if (parseInt($('#thumbs_list_frame >li:visible').length) != parseInt($('#thumbs_list_frame >li').length))
        $('#wrapResetImages').stop(true, true).show();
    else
        $('#wrapResetImages').stop(true, true).hide();
    if (typeof (pro_thumbnails) === 'undefined' || !pro_thumbnails)
        $('#thumbs_list_frame').width(parseInt($('#thumbs_list_frame >li').outerWidth(true) * $('#thumbs_list_frame >li').length) + 'px');
    $('#thumbs_list').trigger('goto', 0);
    serialScrollFixLock('', '', '', '', 0);
}
function saveCustomization()
{
    $('#quantityBackup').val($('#quantity_wanted').val());
    $('#customizationForm').submit();
}
function submitPublishProduct(url, redirect, token)
{
    var id_product = $('#admin-action-product-id').val();
    $.ajaxSetup({async: false});
    $.post(url + '/index.php', {action: 'publishProduct', id_product: id_product, status: 1, redirect: redirect, ajax: 1, tab: 'AdminProducts', token: token}, function(data)
    {
        if (data.indexOf('error') === -1)
            document.location.href = data;
    });
    return true;
}
function checkMinimalQuantity(minimal_quantity)
{
    if ($('#quantity_wanted').val() < minimal_quantity)
    {
        $('#quantity_wanted').css('border', '1px solid red');
        $('#minimal_quantity_wanted_p').css('color', 'red');
    }
    else
    {
        $('#quantity_wanted').css('border', '1px solid #BDC2C9');
        $('#minimal_quantity_wanted_p').css('color', '#374853');
    }
}
function colorPickerClick(elt)
{
    id_attribute = $(elt).attr('id').replace('color_', '');
    $(elt).parent().parent().children().removeClass('selected');
    $(elt).fadeTo('fast', 1, function() {
        $(this).fadeTo('fast', 0, function() {
            $(this).fadeTo('fast', 1, function() {
                $(this).parent().addClass('selected');
            });
        });
    });
    $(elt).parent().parent().parent().children('.color_pick_hidden').val(id_attribute);
}
function getProductAttribute()
{
    request = '';
    var tab_attributes = [];
    var radio_inputs = parseInt($('#attributes .checked > input[type=radio]').length);
    if (radio_inputs)
        radio_inputs = '#attributes .checked > input[type=radio]';
    else
        radio_inputs = '#attributes input[type=radio]:checked';
    $('#attributes select, #attributes input[type=hidden], ' + radio_inputs).each(function() {
        tab_attributes.push($(this).val());
    });
    for (var i in attributesCombinations)
        for (var a in tab_attributes)
            if (attributesCombinations[i]['id_attribute'] === tab_attributes[a])
                request += '/' + attributesCombinations[i]['id_attribute'] + '-' + attributesCombinations[i]['group'] + attribute_anchor_separator + attributesCombinations[i]['attribute'];
    request = request.replace(request.substring(0, 1), '#/');
    var url = window.location + '';
    if (url.indexOf('#') != -1)
        url = url.substring(0, url.indexOf('#'));
    if ($('#customizationForm').length)
    {
        customAction = $('#customizationForm').attr('action');
        if (customAction.indexOf('#') != -1)
            customAction = customAction.substring(0, customAction.indexOf('#'));
        $('#customizationForm').attr('action', customAction + request);
    }
    window.location.replace(url + request);
}
function checkUrl()
{
    if (original_url != window.location || first_url_check)
    {
        first_url_check = false;
        var url = window.location + '';
        if (url.indexOf('#/') != -1)
        {
            params = url.substring(url.indexOf('#') + 1, url.length);
            tabParams = params.split('/');
            tabValues = [];
            if (tabParams[0] == '')
                tabParams.shift();
            var len = tabParams.length;
            for (var i = 0; i < len; i++)
            {
                tabParams[i] = tabParams[i].replace(attribute_anchor_separator, '-');
                tabValues.push(tabParams[i].split('-'));
            }
            product_id = $('#product_page_product_id').val();
            $('.color_pick').removeClass('selected').parent().parent().children().removeClass('selected');
            count = 0;
            for (var z in tabValues)
                for (var a in attributesCombinations)
                    if (attributesCombinations[a]['group'] === decodeURIComponent(tabValues[z][1]) && attributesCombinations[a]['id_attribute'] === decodeURIComponent(tabValues[z][0]))
                    {
                        count++;
                        $('#color_' + attributesCombinations[a]['id_attribute']).addClass('selected').parent().addClass('selected');
                        $('input:radio[value=' + attributesCombinations[a]['id_attribute'] + ']').prop('checked', true);
                        $('input[type=hidden][name=group_' + attributesCombinations[a]['id_attribute_group'] + ']').val(attributesCombinations[a]['id_attribute']);
                        $('select[name=group_' + attributesCombinations[a]['id_attribute_group'] + ']').val(attributesCombinations[a]['id_attribute']);
                        if (!!$.prototype.uniform)
                            $.uniform.update('input[name=group_' + attributesCombinations[a]['id_attribute_group'] + '], select[name=group_' + attributesCombinations[a]['id_attribute_group'] + ']');
                    }
            if (count)
            {
                if (firstTime)
                {
                    firstTime = false;
                    findCombination();
                }
                original_url = url;
                return true;
            }
            else
                window.location.replace(url.substring(0, url.indexOf('#')));
        }
    }
    return false;
}
;
;/*!
 * jQzoom Evolution Library v2.3  - Javascript Image magnifier
 * http://www.mind-projects.it
 *
 * Copyright 2011, Engineer Marco Renzi
 * Licensed under the BSD license.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the organization nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * Date: 03 May 2011 22:16:00
 */
(function($) {
    var isIE6 = ($.browser.msie && $.browser.version < 7);
    var body = $(document.body);
    var window = $(window);
    var jqzoompluging_disabled = false;
    $.fn.jqzoom = function(options) {
        return this.each(function() {
            var node = this.nodeName.toLowerCase();
            if (node == 'a') {
                new jqzoom(this, options);
            }
        });
    };
    jqzoom = function(el, options) {
        var api = null;
        api = $(el).data("jqzoom");
        if (api)
            return api;
        var obj = this;
        var settings = $.extend({}, $.jqzoom.defaults, options || {});
        obj.el = el;
        el.rel = $(el).attr('rel');
        el.zoom_active = false;
        el.zoom_disabled = false;
        el.largeimageloading = false;
        el.largeimageloaded = false;
        el.scale = {};
        el.timer = null;
        el.mousepos = {};
        el.mouseDown = false;
        $(el).css({'outline-style': 'none', 'text-decoration': 'none'});
        var img = $("img:eq(0)", el);
        el.title = $(el).attr('title');
        el.imagetitle = img.attr('title');
        var zoomtitle = ($.trim(el.title).length > 0) ? el.title : el.imagetitle;
        var smallimage = new Smallimage(img);
        var lens = new Lens();
        var stage = new Stage();
        var largeimage = new Largeimage();
        var loader = new Loader();
        $(el).bind('click', function(e) {
            e.preventDefault();
            return false;
        });
        var zoomtypes = ['standard', 'drag', 'innerzoom', 'reverse'];
        if ($.inArray($.trim(settings.zoomType), zoomtypes) < 0) {
            settings.zoomType = 'standard';
        }
        $.extend(obj, {create: function() {
                if ($(".zoomPad", el).length == 0) {
                    el.zoomPad = $('<div/>').addClass('zoomPad');
                    img.wrap(el.zoomPad);
                }
                if (settings.zoomType == 'innerzoom') {
                    settings.zoomWidth = smallimage.w;
                    settings.zoomHeight = smallimage.h;
                }
                if ($(".zoomPup", el).length == 0) {
                    lens.append();
                }
                if ($(".zoomWindow", el).length == 0) {
                    stage.append();
                }
                if ($(".zoomPreload", el).length == 0) {
                    loader.append();
                }
                if (settings.preloadImages || settings.zoomType == 'drag' || settings.alwaysOn) {
                    obj.load();
                }
                obj.init();
            }, init: function() {
                if (settings.zoomType == 'drag') {
                    $(".zoomPad", el).mousedown(function() {
                        el.mouseDown = true;
                    });
                    $(".zoomPad", el).mouseup(function() {
                        el.mouseDown = false;
                    });
                    document.body.ondragstart = function() {
                        return false;
                    };
                    $(".zoomPad", el).css({cursor: 'default'});
                    $(".zoomPup", el).css({cursor: 'move'});
                }
                if (settings.zoomType == 'innerzoom') {
                    $(".zoomWrapper", el).css({cursor: 'crosshair'});
                }
                $(".zoomPad", el).bind('mouseenter mouseover', function(event) {
                    img.attr('title', '');
                    $(el).attr('title', '');
                    el.zoom_active = true;
                    smallimage.fetchdata();
                    if (el.largeimageloaded) {
                        obj.activate(event);
                    } else {
                        obj.load();
                    }
                });
                $(".zoomPad", el).bind('mouseleave', function(event) {
                    obj.deactivate();
                });
                $(".zoomPad", el).bind('mousemove', function(e) {
                    if (e.pageX > smallimage.pos.r || e.pageX < smallimage.pos.l || e.pageY < smallimage.pos.t || e.pageY > smallimage.pos.b) {
                        lens.setcenter();
                        return false;
                    }
                    el.zoom_active = true;
                    if (el.largeimageloaded && !$('.zoomWindow', el).is(':visible')) {
                        obj.activate(e);
                    }
                    if (el.largeimageloaded && (settings.zoomType != 'drag' || (settings.zoomType == 'drag' && el.mouseDown))) {
                        lens.setposition(e);
                    }
                });
                var thumb_preload = new Array();
                var i = 0;
                var thumblist = new Array();
                thumblist = $('a').filter(function() {
                    var regex = new RegExp("gallery[\\s]*:[\\s]*'" + $.trim(el.rel) + "'", "i");
                    var rel = $(this).attr('rel');
                    if (regex.test(rel)) {
                        return this;
                    }
                });
                if (thumblist.length > 0) {
                    var first = thumblist.splice(0, 1);
                    thumblist.push(first);
                }
                thumblist.each(function() {
                    if (settings.preloadImages) {
                        var thumb_options = $.extend({}, eval("(" + $.trim($(this).attr('rel')) + ")"));
                        thumb_preload[i] = new Image();
                        thumb_preload[i].src = thumb_options.largeimage;
                        i++;
                    }
                    $(this).click(function(e) {
                        if ($(this).hasClass('zoomThumbActive')) {
                            return false;
                        }
                        thumblist.each(function() {
                            $(this).removeClass('zoomThumbActive');
                        });
                        e.preventDefault();
                        obj.swapimage(this);
                        return false;
                    });
                });
            }, load: function() {
                if (el.largeimageloaded == false && el.largeimageloading == false) {
                    var url = $(el).attr('href');
                    el.largeimageloading = true;
                    largeimage.loadimage(url);
                }
            }, activate: function(e) {
                clearTimeout(el.timer);
                lens.show();
                stage.show();
            }, deactivate: function(e) {
                switch (settings.zoomType) {
                    case'drag':
                        break;
                    default:
                        img.attr('title', el.imagetitle);
                        $(el).attr('title', el.title);
                        if (settings.alwaysOn) {
                            lens.setcenter();
                        } else {
                            stage.hide();
                            lens.hide();
                        }
                        break;
                }
                el.zoom_active = false;
            }, swapimage: function(link) {
                el.largeimageloading = false;
                el.largeimageloaded = false;
                var options = new Object();
                options = $.extend({}, eval("(" + $.trim($(link).attr('rel')) + ")"));
                if (options.smallimage && options.largeimage) {
                    var smallimage = options.smallimage;
                    var largeimage = options.largeimage;
                    $(link).addClass('zoomThumbActive');
                    $(el).attr('href', largeimage);
                    img.attr('src', smallimage);
                    lens.hide();
                    stage.hide();
                    obj.load();
                } else {
                    throw'ERROR :: Missing parameter for largeimage or smallimage.';
                }
                return false;
            }});
        if (img[0].complete) {
            smallimage.fetchdata();
            if ($(".zoomPad", el).length == 0)
                obj.create();
        }
        function Smallimage(image) {
            var $obj = this;
            this.node = image[0];
            this.findborder = function() {
                var bordertop = 0;
                bordertop = image.css('border-top-width');
                btop = '';
                var borderleft = 0;
                borderleft = image.css('border-left-width');
                bleft = '';
                if (bordertop) {
                    for (i = 0; i < 3; i++) {
                        var x = [];
                        x = bordertop.substr(i, 1);
                        if (isNaN(x) == false) {
                            btop = btop + '' + bordertop.substr(i, 1);
                        } else {
                            break;
                        }
                    }
                }
                if (borderleft) {
                    for (i = 0; i < 3; i++) {
                        if (!isNaN(borderleft.substr(i, 1))) {
                            bleft = bleft + borderleft.substr(i, 1)
                        } else {
                            break;
                        }
                    }
                }
                $obj.btop = (btop.length > 0) ? eval(btop) : 0;
                $obj.bleft = (bleft.length > 0) ? eval(bleft) : 0;
            };
            this.fetchdata = function() {
                $obj.findborder();
                $obj.w = image.width();
                $obj.h = image.height();
                $obj.ow = image.outerWidth();
                $obj.oh = image.outerHeight();
                $obj.pos = image.offset();
                $obj.pos.l = image.offset().left + $obj.bleft;
                $obj.pos.t = image.offset().top + $obj.btop;
                $obj.pos.r = $obj.w + $obj.pos.l;
                $obj.pos.b = $obj.h + $obj.pos.t;
                $obj.rightlimit = image.offset().left + $obj.ow;
                $obj.bottomlimit = image.offset().top + $obj.oh;
            };
            this.node.onerror = function() {
                throw'Problems while loading image.';
            };
            this.node.onload = function() {
                $obj.fetchdata();
                if ($(".zoomPad", el).length == 0)
                    obj.create();
            };
            return $obj;
        }
        ;
        function Loader() {
            var $obj = this;
            this.append = function() {
                this.node = $('<div/>').addClass('zoomPreload').css('visibility', 'hidden').html(settings.preloadText);
                $('.zoomPad', el).append(this.node);
            };
            this.show = function() {
                this.node.top = (smallimage.oh - this.node.height()) / 2;
                this.node.left = (smallimage.ow - this.node.width()) / 2;
                this.node.css({top: this.node.top, left: this.node.left, position: 'absolute', visibility: 'visible'});
            };
            this.hide = function() {
                this.node.css('visibility', 'hidden');
            };
            return this;
        }
        function Lens() {
            var $obj = this;
            this.node = $('<div/>').addClass('zoomPup');
            this.append = function() {
                $('.zoomPad', el).append($(this.node).hide());
                if (settings.zoomType == 'reverse') {
                    this.image = new Image();
                    this.image.src = smallimage.node.src;
                    $(this.node).empty().append(this.image);
                }
            };
            this.setdimensions = function() {
                this.node.w = (parseInt((settings.zoomWidth) / el.scale.x) > smallimage.w) ? smallimage.w : (parseInt(settings.zoomWidth / el.scale.x));
                this.node.h = (parseInt((settings.zoomHeight) / el.scale.y) > smallimage.h) ? smallimage.h : (parseInt(settings.zoomHeight / el.scale.y));
                this.node.top = (smallimage.oh - this.node.h - 2) / 2;
                this.node.left = (smallimage.ow - this.node.w - 2) / 2;
                this.node.css({top: 0, left: 0, width: this.node.w + 'px', height: this.node.h + 'px', position: 'absolute', display: 'none', borderWidth: 1 + 'px'});
                if (settings.zoomType == 'reverse') {
                    this.image.src = smallimage.node.src;
                    $(this.node).css({'opacity': 1});
                    $(this.image).css({position: 'absolute', display: 'block', left: -(this.node.left + 1 - smallimage.bleft) + 'px', top: -(this.node.top + 1 - smallimage.btop) + 'px'});
                }
            };
            this.setcenter = function() {
                this.node.top = (smallimage.oh - this.node.h - 2) / 2;
                this.node.left = (smallimage.ow - this.node.w - 2) / 2;
                this.node.css({top: this.node.top, left: this.node.left});
                if (settings.zoomType == 'reverse') {
                    $(this.image).css({position: 'absolute', display: 'block', left: -(this.node.left + 1 - smallimage.bleft) + 'px', top: -(this.node.top + 1 - smallimage.btop) + 'px'});
                }
                largeimage.setposition();
            };
            this.setposition = function(e) {
                el.mousepos.x = e.pageX;
                el.mousepos.y = e.pageY;
                var lensleft = 0;
                var lenstop = 0;
                function overleft(lens) {
                    return el.mousepos.x - (lens.w) / 2 < smallimage.pos.l;
                }
                function overright(lens) {
                    return el.mousepos.x + (lens.w) / 2 > smallimage.pos.r;
                }
                function overtop(lens) {
                    return el.mousepos.y - (lens.h) / 2 < smallimage.pos.t;
                }
                function overbottom(lens) {
                    return el.mousepos.y + (lens.h) / 2 > smallimage.pos.b;
                }
                lensleft = el.mousepos.x + smallimage.bleft - smallimage.pos.l - (this.node.w + 2) / 2;
                lenstop = el.mousepos.y + smallimage.btop - smallimage.pos.t - (this.node.h + 2) / 2;
                if (overleft(this.node)) {
                    lensleft = smallimage.bleft - 1;
                } else if (overright(this.node)) {
                    lensleft = smallimage.w + smallimage.bleft - this.node.w - 1;
                }
                if (overtop(this.node)) {
                    lenstop = smallimage.btop - 1;
                } else if (overbottom(this.node)) {
                    lenstop = smallimage.h + smallimage.btop - this.node.h - 1;
                }
                this.node.left = lensleft;
                this.node.top = lenstop;
                this.node.css({'left': lensleft + 'px', 'top': lenstop + 'px'});
                if (settings.zoomType == 'reverse') {
                    if ($.browser.msie && $.browser.version > 7) {
                        $(this.node).empty().append(this.image);
                    }
                    $(this.image).css({position: 'absolute', display: 'block', left: -(this.node.left + 1 - smallimage.bleft) + 'px', top: -(this.node.top + 1 - smallimage.btop) + 'px'});
                }
                largeimage.setposition();
            };
            this.hide = function() {
                img.css({'opacity': 1});
                this.node.hide();
            };
            this.show = function() {
                if (settings.zoomType != 'innerzoom' && (settings.lens || settings.zoomType == 'drag')) {
                    this.node.show();
                }
                if (settings.zoomType == 'reverse') {
                    img.css({'opacity': settings.imageOpacity});
                }
            };
            this.getoffset = function() {
                var o = {};
                o.left = $obj.node.left;
                o.top = $obj.node.top;
                return o;
            };
            return this;
        }
        ;
        function Stage() {
            var $obj = this;
            this.node = $("<div class='zoomWindow'><div class='zoomWrapper'><div class='zoomWrapperTitle'></div><div class='zoomWrapperImage'></div></div></div>");
            this.ieframe = $('<iframe class="zoomIframe" src="javascript:\'\';" marginwidth="0" marginheight="0" align="bottom" scrolling="no" frameborder="0" ></iframe>');
            this.setposition = function() {
                this.node.leftpos = 0;
                this.node.toppos = 0;
                if (settings.zoomType != 'innerzoom') {
                    switch (settings.position) {
                        case"left":
                            this.node.leftpos = (smallimage.pos.l - smallimage.bleft - Math.abs(settings.xOffset) - settings.zoomWidth > 0) ? (0 - settings.zoomWidth - Math.abs(settings.xOffset)) : (smallimage.ow + Math.abs(settings.xOffset));
                            this.node.toppos = Math.abs(settings.yOffset);
                            break;
                        case"top":
                            this.node.leftpos = Math.abs(settings.xOffset);
                            this.node.toppos = (smallimage.pos.t - smallimage.btop - Math.abs(settings.yOffset) - settings.zoomHeight > 0) ? (0 - settings.zoomHeight - Math.abs(settings.yOffset)) : (smallimage.oh + Math.abs(settings.yOffset));
                            break;
                        case"bottom":
                            this.node.leftpos = Math.abs(settings.xOffset);
                            this.node.toppos = (smallimage.pos.t - smallimage.btop + smallimage.oh + Math.abs(settings.yOffset) + settings.zoomHeight < screen.height) ? (smallimage.oh + Math.abs(settings.yOffset)) : (0 - settings.zoomHeight - Math.abs(settings.yOffset));
                            break;
                        default:
                            this.node.leftpos = (smallimage.rightlimit + Math.abs(settings.xOffset) + settings.zoomWidth < screen.width) ? (smallimage.ow + Math.abs(settings.xOffset)) : (0 - settings.zoomWidth - Math.abs(settings.xOffset));
                            this.node.toppos = Math.abs(settings.yOffset);
                            break;
                    }
                }
                this.node.css({'left': this.node.leftpos + 'px', 'top': this.node.toppos + 'px'});
                return this;
            };
            this.append = function() {
                $('.zoomPad', el).append(this.node);
                this.node.css({position: 'absolute', display: 'none', zIndex: 5001});
                if (settings.zoomType == 'innerzoom') {
                    this.node.css({cursor: 'default'});
                    var thickness = (smallimage.bleft == 0) ? 1 : smallimage.bleft;
                    $('.zoomWrapper', this.node).css({borderWidth: thickness + 'px'});
                }
                $('.zoomWrapper', this.node).css({width: Math.round(settings.zoomWidth) + 'px', borderWidth: thickness + 'px'});
                $('.zoomWrapperImage', this.node).css({width: '100%', height: Math.round(settings.zoomHeight) + 'px'});
                $('.zoomWrapperTitle', this.node).css({width: '100%', position: 'absolute'});
                $('.zoomWrapperTitle', this.node).hide();
                if (settings.title && zoomtitle.length > 0) {
                    $('.zoomWrapperTitle', this.node).html(zoomtitle).show();
                }
                $obj.setposition();
            };
            this.hide = function() {
                switch (settings.hideEffect) {
                    case'fadeout':
                        this.node.fadeOut(settings.fadeoutSpeed, function() {
                        });
                        break;
                    default:
                        this.node.hide();
                        break;
                }
                this.ieframe.hide();
            };
            this.show = function() {
                switch (settings.showEffect) {
                    case'fadein':
                        this.node.fadeIn();
                        this.node.fadeIn(settings.fadeinSpeed, function() {
                        });
                        break;
                    default:
                        this.node.show();
                        break;
                }
                if (isIE6 && settings.zoomType != 'innerzoom') {
                    this.ieframe.width = this.node.width();
                    this.ieframe.height = this.node.height();
                    this.ieframe.left = this.node.leftpos;
                    this.ieframe.top = this.node.toppos;
                    this.ieframe.css({display: 'block', position: "absolute", left: this.ieframe.left, top: this.ieframe.top, zIndex: 99, width: this.ieframe.width + 'px', height: this.ieframe.height + 'px'});
                    $('.zoomPad', el).append(this.ieframe);
                    this.ieframe.show();
                }
                ;
            };
        }
        ;
        function Largeimage() {
            var $obj = this;
            this.node = new Image();
            this.loadimage = function(url) {
                loader.show();
                this.url = url;
                this.node.style.position = 'absolute';
                this.node.style.border = '0px';
                this.node.style.display = 'none';
                this.node.style.left = '-5000px';
                this.node.style.top = '0px';
                document.body.appendChild(this.node);
                this.node.src = url;
            };
            this.fetchdata = function() {
                var image = $(this.node);
                var scale = {};
                this.node.style.display = 'block';
                $obj.w = image.width();
                $obj.h = image.height();
                $obj.pos = image.offset();
                $obj.pos.l = image.offset().left;
                $obj.pos.t = image.offset().top;
                $obj.pos.r = $obj.w + $obj.pos.l;
                $obj.pos.b = $obj.h + $obj.pos.t;
                scale.x = ($obj.w / smallimage.w);
                scale.y = ($obj.h / smallimage.h);
                el.scale = scale;
                document.body.removeChild(this.node);
                $('.zoomWrapperImage', el).empty().append(this.node);
                lens.setdimensions();
            };
            this.node.onerror = function() {
                throw'Problems while loading the big image.';
            };
            this.node.onload = function() {
                $obj.fetchdata();
                loader.hide();
                el.largeimageloading = false;
                el.largeimageloaded = true;
                if (settings.zoomType == 'drag' || settings.alwaysOn) {
                    lens.show();
                    stage.show();
                    lens.setcenter();
                }
            };
            this.setposition = function() {
                var left = -el.scale.x * (lens.getoffset().left - smallimage.bleft + 1);
                var top = -el.scale.y * (lens.getoffset().top - smallimage.btop + 1);
                $(this.node).css({'left': left + 'px', 'top': top + 'px'});
            };
            return this;
        }
        ;
        $(el).data("jqzoom", obj);
    };
    $.jqzoom = {defaults: {zoomType: 'standard', zoomWidth: 300, zoomHeight: 300, xOffset: 10, yOffset: 0, position: "right", preloadImages: true, preloadText: 'Loading zoom', title: true, lens: true, imageOpacity: 0.4, alwaysOn: false, showEffect: 'show', hideEffect: 'hide', fadeinSpeed: 'slow', fadeoutSpeed: '2000'}, disable: function(el) {
            var api = $(el).data('jqzoom');
            api.disable();
            return false;
        }, enable: function(el) {
            var api = $(el).data('jqzoom');
            api.enable();
            return false;
        }, disableAll: function(el) {
            jqzoompluging_disabled = true;
        }, enableAll: function(el) {
            jqzoompluging_disabled = false;
        }};
})(jQuery);
;
$(document).ready(function() {
    $('ul.tree.dhtml').hide();
    if (!$('ul.tree.dhtml').hasClass('dynamized'))
    {
        $('ul.tree.dhtml ul').prev().before("<span class='grower OPEN'>&nbsp;</span>");
        $('ul.tree.dhtml ul li:last-child, ul.tree.dhtml li:last-child').addClass('last');
        $('ul.tree.dhtml span.grower.OPEN').addClass('CLOSE').removeClass('OPEN').parent().find('ul:first').hide();
        $('ul.tree.dhtml').show();
        $('ul.tree.dhtml .selected').parents().each(function() {
            if ($(this).is('ul'))
                toggleBranch($(this).prev().prev(), true);
        });
        toggleBranch($('ul.tree.dhtml .selected').prev(), true);
        $('ul.tree.dhtml span.grower').click(function() {
            toggleBranch($(this));
        });
        $('ul.tree.dhtml').addClass('dynamized');
        $('ul.tree.dhtml').removeClass('dhtml');
    }
});
function openBranch(jQueryElement, noAnimation)
{
    jQueryElement.addClass('OPEN').removeClass('CLOSE');
    if (noAnimation)
        jQueryElement.parent().find('ul:first').show();
    else
        jQueryElement.parent().find('ul:first').slideDown();
}
function closeBranch(jQueryElement, noAnimation)
{
    jQueryElement.addClass('CLOSE').removeClass('OPEN');
    if (noAnimation)
        jQueryElement.parent().find('ul:first').hide();
    else
        jQueryElement.parent().find('ul:first').slideUp();
}
function toggleBranch(jQueryElement, noAnimation)
{
    if (jQueryElement.hasClass('OPEN'))
        closeBranch(jQueryElement, noAnimation);
    else
        openBranch(jQueryElement, noAnimation);
}
;
;
var wishlistProductsIds = [];
$(document).ready(function() {
    if (typeof (wishlistProductsJson) != 'undefined' && $.isArray(wishlistProductsJson)) {
        $.each(wishlistProductsJson, function(i, p) {
            if ($.inArray(parseInt(p.id_product), wishlistProductsIds) == -1)
                wishlistProductsIds.push(parseInt(p.id_product))
        });
    }
    ;
    wishlistRefreshStatus();
    $(document).on('change', 'select[name=wishlists]', function() {
        WishlistChangeDefault('wishlist_block_list', $(this).val());
    });
    $("#wishlist_button.wishlist_popover").popover({html: true, content: function() {
            return $("#popover-content").html();
        }});
});
function WishlistCart(id, action, id_product, id_product_attribute, quantity, callerElement, id_wishlist)
{
    $(callerElement).addClass('active');
    $.ajax({type: 'GET', url: baseDir + 'modules/blockwishlist/cart.php?rand=' + new Date().getTime(), headers: {"cache-control": "no-cache"}, async: true, cache: false, data: 'action=' + action + '&id_product=' + id_product + '&quantity=' + quantity + '&token=' + static_token + '&id_product_attribute=' + id_product_attribute + '&id_wishlist=' + id_wishlist, success: function(data)
        {
            $(callerElement).removeClass('active');
            if (action == 'add')
            {
                if (isLogged == true) {
                    wishlistProductsIdsAdd(id_product);
                    wishlistRefreshStatus();
                    if (!!$.prototype.fancybox)
                        $.fancybox.open([{type: 'inline', autoScale: true, minHeight: 30, content: '<p class="fancybox-error">' + added_to_wishlist + '</p>'}], {padding: 0});
                    else
                        alert(added_to_wishlist);
                }
                else
                {
                    if (!!$.prototype.fancybox)
                        $.fancybox.open([{type: 'inline', autoScale: true, minHeight: 30, content: '<p class="fancybox-error">' + loggin_required + '</p>'}], {padding: 0});
                    else
                        alert(loggin_required);
                }
            }
            if (action == 'delete') {
                wishlistProductsIdsRemove(id_product);
                wishlistRefreshStatus();
            }
            if ($('#' + id).length != 0)
            {
                $('#' + id).slideUp('normal');
                document.getElementById(id).innerHTML = data;
                $('#' + id).slideDown('normal');
            }
        }});
}
function WishlistChangeDefault(id, id_wishlist)
{
    $.ajax({type: 'GET', url: baseDir + 'modules/blockwishlist/cart.php?rand=' + new Date().getTime(), headers: {"cache-control": "no-cache"}, async: true, data: 'id_wishlist=' + id_wishlist + '&token=' + static_token, cache: false, success: function(data)
        {
            $('#' + id).slideUp('normal');
            document.getElementById(id).innerHTML = data;
            $('#' + id).slideDown('normal');
        }});
}
function WishlistBuyProduct(token, id_product, id_product_attribute, id_quantity, button, ajax)
{
    if (ajax)
        ajaxCart.add(id_product, id_product_attribute, false, button, 1, [token, id_quantity]);
    else
    {
        $('#' + id_quantity).val(0);
        WishlistAddProductCart(token, id_product, id_product_attribute, id_quantity)
        document.forms['addtocart' + '_' + id_product + '_' + id_product_attribute].method = 'POST';
        document.forms['addtocart' + '_' + id_product + '_' + id_product_attribute].action = baseUri + '?controller=cart';
        document.forms['addtocart' + '_' + id_product + '_' + id_product_attribute].elements['token'].value = static_token;
        document.forms['addtocart' + '_' + id_product + '_' + id_product_attribute].submit();
    }
    return(true);
}
function WishlistAddProductCart(token, id_product, id_product_attribute, id_quantity)
{
    if ($('#' + id_quantity).val() <= 0)
        return(false);
    $.ajax({type: 'GET', url: baseDir + 'modules/blockwishlist/buywishlistproduct.php?rand=' + new Date().getTime(), headers: {"cache-control": "no-cache"}, data: 'token=' + token + '&static_token=' + static_token + '&id_product=' + id_product + '&id_product_attribute=' + id_product_attribute, async: true, cache: false, success: function(data)
        {
            if (data)
            {
                if (!!$.prototype.fancybox)
                    $.fancybox.open([{type: 'inline', autoScale: true, minHeight: 30, content: '<p class="fancybox-error">' + data + '</p>'}], {padding: 0});
                else
                    alert(data);
            }
            else
                $('#' + id_quantity).val($('#' + id_quantity).val() - 1);
        }});
    return(true);
}
function WishlistManage(id, id_wishlist)
{
    $.ajax({type: 'GET', async: true, url: baseDir + 'modules/blockwishlist/managewishlist.php?rand=' + new Date().getTime(), headers: {"cache-control": "no-cache"}, data: 'id_wishlist=' + id_wishlist + '&refresh=' + false, cache: false, success: function(data)
        {
            $('#' + id).hide();
            document.getElementById(id).innerHTML = data;
            $('#' + id).fadeIn('slow');
            $('.wishlist_change_button').each(function(index) {
                $(this).popover({html: true, content: function() {
                        return $(this).next('.popover-content').html();
                    }});
            });
        }});
}
function WishlistProductManage(id, action, id_wishlist, id_product, id_product_attribute, quantity, priority)
{
    $.ajax({type: 'GET', async: true, url: baseDir + 'modules/blockwishlist/managewishlist.php?rand=' + new Date().getTime(), headers: {"cache-control": "no-cache"}, data: 'action=' + action + '&id_wishlist=' + id_wishlist + '&id_product=' + id_product + '&id_product_attribute=' + id_product_attribute + '&quantity=' + quantity + '&priority=' + priority + '&refresh=' + true, cache: false, success: function(data)
        {
            if (action == 'delete')
                $('#wlp_' + id_product + '_' + id_product_attribute).remove();
            else if (action == 'update')
            {
                $('#wlp_' + id_product + '_' + id_product_attribute).fadeOut('fast');
                $('#wlp_' + id_product + '_' + id_product_attribute).fadeIn('fast');
            }
            nb_products = 0;
            $("[id^='quantity']").each(function(index, element) {
                nb_products += parseInt(element.value);
            });
            $("#wishlist_" + id_wishlist).children('td').eq(1).html(nb_products);
        }});
}
function WishlistDelete(id, id_wishlist, msg)
{
    var res = confirm(msg);
    if (res == false)
        return(false);
    if (typeof mywishlist_url == 'undefined')
        return(false);
    $.ajax({type: 'GET', async: true, dataType: "json", url: mywishlist_url, headers: {"cache-control": "no-cache"}, cache: false, data: {rand: new Date().getTime(), deleted: 1, myajax: 1, id_wishlist: id_wishlist, action: 'deletelist'}, success: function(data)
        {
            var mywishlist_siblings_count = $('#' + id).siblings().length;
            $('#' + id).fadeOut('slow').remove();
            $("#block-order-detail").html('');
            if (mywishlist_siblings_count == 0)
                $("#block-history").remove();
            if (data.id_default)
            {
                var td_default = $("#wishlist_" + data.id_default + " > .wishlist_default");
                $("#wishlist_" + data.id_default + " > .wishlist_default > a").remove();
                td_default.append('<p class="is_wish_list_default"><i class="icon icon-check"></i></p>');
            }
        }});
}
function WishlistDefault(id, id_wishlist)
{
    if (typeof mywishlist_url == 'undefined')
        return(false);
    $.ajax({type: 'GET', async: true, url: mywishlist_url, headers: {"cache-control": "no-cache"}, cache: false, data: {rand: new Date().getTime(), 'default': 1, id_wishlist: id_wishlist, myajax: 1, action: 'setdefault'}, success: function(data)
        {
            var old_default_id = $(".is_wish_list_default").parents("tr").attr("id");
            var td_check = $(".is_wish_list_default").parent();
            $(".is_wish_list_default").remove();
            td_check.append('<a href="#" onclick="javascript:event.preventDefault();(WishlistDefault(\'' + old_default_id + '\', \'' + old_default_id.replace("wishlist_", "") + '\'));"><i class="icon icon-check-empty"></i></a>');
            var td_default = $("#" + id + " > .wishlist_default");
            $("#" + id + " > .wishlist_default > a").remove();
            td_default.append('<p class="is_wish_list_default"><i class="icon icon-check"></i></p>');
        }});
}
function WishlistVisibility(bought_class, id_button)
{
    if ($('#hide' + id_button).is(':hidden'))
    {
        $('.' + bought_class).slideDown('fast');
        $('#show' + id_button).hide();
        $('#hide' + id_button).show();
    }
    else
    {
        $('.' + bought_class).slideUp('fast');
        $('#hide' + id_button).hide();
        $('#show' + id_button).show();
    }
}
function WishlistSend(id, id_wishlist, id_email)
{
    $.post(baseDir + 'modules/blockwishlist/sendwishlist.php', {token: static_token, id_wishlist: id_wishlist, email1: $('#' + id_email + '1').val(), email2: $('#' + id_email + '2').val(), email3: $('#' + id_email + '3').val(), email4: $('#' + id_email + '4').val(), email5: $('#' + id_email + '5').val(), email6: $('#' + id_email + '6').val(), email7: $('#' + id_email + '7').val(), email8: $('#' + id_email + '8').val(), email9: $('#' + id_email + '9').val(), email10: $('#' + id_email + '10').val()}, function(data)
    {
        if (data)
        {
            if (!!$.prototype.fancybox)
                $.fancybox.open([{type: 'inline', autoScale: true, minHeight: 30, content: '<p class="fancybox-error">' + data + '</p>'}], {padding: 0});
            else
                alert(data);
        }
        else
            WishlistVisibility(id, 'hideSendWishlist');
    });
}
function wishlistProductsIdsAdd(id)
{
    if ($.inArray(parseInt(id), wishlistProductsIds) == -1)
        wishlistProductsIds.push(parseInt(id))
}
function wishlistProductsIdsRemove(id)
{
    wishlistProductsIds.splice($.inArray(parseInt(id), wishlistProductsIds), 1)
}
function wishlistRefreshStatus()
{
    $('.addToWishlist').each(function() {
        if ($.inArray(parseInt($(this).data('pid')), wishlistProductsIds) != -1)
            $(this).addClass('checked');
        else
            $(this).removeClass('checked');
    });
}
function wishlistProductChange(id_product, id_product_attribute, id_old_wishlist, id_new_wishlist)
{
    if (typeof mywishlist_url == 'undefined')
        return(false);
    var quantity = $('#quantity_' + id_product + '_' + id_product_attribute).val();
    $.ajax({type: 'GET', url: mywishlist_url, headers: {"cache-control": "no-cache"}, async: true, cache: false, dataType: "json", data: {id_product: id_product, id_product_attribute: id_product_attribute, quantity: quantity, priority: $('#priority_' + id_product + '_' + id_product_attribute).val(), id_old_wishlist: id_old_wishlist, id_new_wishlist: id_new_wishlist, myajax: 1, action: 'productchangewishlist'}, success: function(data)
        {
            if (data.success == true) {
                $('#wlp_' + id_product + '_' + id_product_attribute).fadeOut('slow');
                $('#wishlist_' + id_old_wishlist + ' td:nth-child(2)').text($('#wishlist_' + id_old_wishlist + ' td:nth-child(2)').text() - quantity);
                $('#wishlist_' + id_new_wishlist + ' td:nth-child(2)').text(+$('#wishlist_' + id_new_wishlist + ' td:nth-child(2)').text() + +quantity);
            }
            else
            {
                if (!!$.prototype.fancybox)
                    $.fancybox.open([{type: 'inline', autoScale: true, minHeight: 30, content: '<p class="fancybox-error">' + data.error + '</p>'}], {padding: 0});
            }
        }});
}
;/*
 ### jQuery Star Rating Plugin v2.0 - 2008-03-12 ###
 By Diego A, http://www.fyneworks.com, diego@fyneworks.com
 - v2 by Keith Wood, kbwood@virginbroadband.com.au
 
 Project: http://plugins.jquery.com/project/MultipleFriendlyStarRating
 Website: http://www.fyneworks.com/jquery/star-rating/
 
 This is a modified version of the star rating plugin from:
 http://www.phpletter.com/Demo/Jquery-Star-Rating-Plugin/
 */
eval(function(p, a, c, k, e, r) {
    e = function(c) {
        return(c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--)
            r[e(c)] = k[c] || e(c);
        k = [function(e) {
                return r[e]
            }];
        e = function() {
            return'\\w+'
        };
        c = 1
    }
    ;
    while (c--)
        if (k[c])
            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}(';4(w)(3($){$.Y.T=3(c){c=$.15({m:\'X U\',E:\'\',B:z,8:z},c||{});o d={};o e={t:3(n,a,b){2.6(n);$(a).D(\'.j\').A().l(b||\'x\')},6:3(n){$(d[n].7).O(\'.j\').u(\'9\').u(\'x\')},h:3(n){4(!$(d[n].5).Z(\'.m\')){$(d[n].5).D(\'.j\').A().l(\'9\')}},g:3(n,a){d[n].5=a;o b=$(a).L(\'a\').K();$(d[n].7).J(b);e.6(n);e.h(n);4(c.I)c.I.W(d[n].7,[b,a])}};2.V(3(i){o n=2.G;4(!d[n])d[n]={r:0};i=d[n].r;d[n].r++;4(i==0){c.8=$(2).S(\'p\')||c.8;d[n].7=$(\'<R Q="P" G="\'+n+\'" q=""\'+(c.8?\' p="p"\':\'\')+\'>\');$(2).C(d[n].7);4(c.8||c.B){}F{$(2).C($(\'<k y="m"><a s="\'+c.m+\'">\'+c.E+\'</a></k>\').H(3(){e.6(n);$(2).l(\'9\')}).v(3(){e.h(n);$(2).u(\'9\')}).g(3(){e.g(n,2)}))}};f=$(\'<k y="j"><a s="\'+(2.s||2.q)+\'">\'+2.q+\'</a></k>\');$(2).N(f);4(c.8){$(f).l(\'M\')}F{$(f).H(3(){e.6(n);e.t(n,2)}).v(3(){e.6(n);e.h(n)}).g(3(){e.g(n,2)})};4(2.14)d[n].5=f;$(2).13();4(i+1==2.12)e.h(n)});11(n 10 d)4(d[n].5){e.t(n,d[n].5,\'9\');$(d[n].7).J($(d[n].5).L(\'a\').K())}16 2}})(w);', 62, 69, '||this|function|if|currentElem|drain|valueElem|readOnly|star_on||||||eStar|click|reset||star|div|addClass|cancel||var|disabled|value|count|title|fill|removeClass|mouseout|jQuery|star_hover|class|false|andSelf|required|before|prevAll|cancelValue|else|name|mouseover|callback|val|text|children|star_readonly|after|siblings|hidden|type|input|attr|rating|Rating|each|apply|Cancel|fn|is|in|for|length|remove|checked|extend|return'.split('|'), 0, {}));
;
(function($) {
    $.flexslider = function(el, options) {
        var slider = $(el), vars = $.extend({}, $.flexslider.defaults, options), namespace = vars.namespace, touch = ("ontouchstart"in window) || window.DocumentTouch && document instanceof DocumentTouch, eventType = (touch) ? "touchend" : "click", vertical = vars.direction === "vertical", reverse = vars.reverse, carousel = (vars.itemWidth > 0), fade = vars.animation === "fade", asNav = vars.asNavFor !== "", methods = {};
        $.data(el, "flexslider", slider);
        methods = {init: function() {
                slider.animating = false;
                slider.currentSlide = vars.startAt;
                slider.animatingTo = slider.currentSlide;
                slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
                slider.containerSelector = vars.selector.substr(0, vars.selector.search(' '));
                slider.slides = $(vars.selector, slider);
                slider.container = $(slider.containerSelector, slider);
                slider.count = slider.slides.length;
                slider.syncExists = $(vars.sync).length > 0;
                if (vars.animation === "slide")
                    vars.animation = "swing";
                slider.prop = (vertical) ? "top" : "marginLeft";
                slider.args = {};
                slider.manualPause = false;
                slider.transitions = !vars.video && !fade && vars.useCSS && (function() {
                    var obj = document.createElement('div'), props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
                    for (var i in props) {
                        if (obj.style[props[i]] !== undefined) {
                            slider.pfx = props[i].replace('Perspective', '').toLowerCase();
                            slider.prop = "-" + slider.pfx + "-transform";
                            return true;
                        }
                    }
                    return false;
                }());
                if (vars.controlsContainer !== "")
                    slider.controlsContainer = $(vars.controlsContainer).length > 0 && $(vars.controlsContainer);
                if (vars.manualControls !== "")
                    slider.manualControls = $(vars.manualControls).length > 0 && $(vars.manualControls);
                if (vars.randomize) {
                    slider.slides.sort(function() {
                        return(Math.round(Math.random()) - 0.5);
                    });
                    slider.container.empty().append(slider.slides);
                }
                slider.doMath();
                if (asNav)
                    methods.asNav.setup();
                slider.setup("init");
                if (vars.controlNav)
                    methods.controlNav.setup();
                if (vars.directionNav)
                    methods.directionNav.setup();
                if (vars.keyboard && ($(slider.containerSelector).length === 1 || vars.multipleKeyboard)) {
                    $(document).bind('keyup', function(event) {
                        var keycode = event.keyCode;
                        if (!slider.animating && (keycode === 39 || keycode === 37)) {
                            var target = (keycode === 39) ? slider.getTarget('next') : (keycode === 37) ? slider.getTarget('prev') : false;
                            slider.flexAnimate(target, vars.pauseOnAction);
                        }
                    });
                }
                if (vars.mousewheel) {
                    slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
                        event.preventDefault();
                        var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
                        slider.flexAnimate(target, vars.pauseOnAction);
                    });
                }
                if (vars.pausePlay)
                    methods.pausePlay.setup();
                if (vars.slideshow) {
                    if (vars.pauseOnHover) {
                        slider.hover(function() {
                            if (!slider.manualPlay && !slider.manualPause)
                            {
                                vars.pauseOn(slider);
                                slider.pause();
                            }
                        }, function() {
                            if (!slider.manualPause && !slider.manualPlay)
                            {
                                vars.pauseOff(slider);
                                slider.play();
                            }
                        });
                    }
                    (vars.initDelay > 0) ? setTimeout(slider.play, vars.initDelay) : slider.play();
                }
                if (touch && vars.touch)
                    methods.touch();
                if (!fade || (fade && vars.smoothHeight))
                    $(window).bind("resize focus", methods.resize);
                setTimeout(function() {
                    vars.start(slider);
                }, 200);
            }, asNav: {setup: function() {
                    slider.asNav = true;
                    slider.animatingTo = Math.floor(slider.currentSlide / slider.move);
                    slider.currentItem = slider.currentSlide;
                    slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
                    slider.slides.click(function(e) {
                        e.preventDefault();
                        var $slide = $(this), target = $slide.index();
                        if (!$(vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                            slider.direction = (slider.currentItem < target) ? "next" : "prev";
                            slider.flexAnimate(target, vars.pauseOnAction, false, true, true);
                        }
                    });
                }}, controlNav: {setup: function() {
                    if (!slider.manualControls) {
                        methods.controlNav.setupPaging();
                    } else {
                        methods.controlNav.setupManual();
                    }
                }, setupPaging: function() {
                    var type = (vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging', j = 1, item;
                    slider.controlNavScaffold = $('<ol class="' + namespace + 'control-nav ' + namespace + type + '"></ol>');
                    if (slider.pagingCount > 1) {
                        for (var i = 0; i < slider.pagingCount; i++) {
                            item = (vars.controlNav === "thumbnails") ? '<img src="' + slider.slides.eq(i).attr("data-thumb") + '"/>' : '<a>' + j + '</a>';
                            slider.controlNavScaffold.append('<li>' + item + '</li>');
                            j++;
                        }
                    }
                    (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
                    methods.controlNav.set();
                    methods.controlNav.active();
                    slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
                        event.preventDefault();
                        var $this = $(this), target = slider.controlNav.index($this);
                        if (!$this.hasClass(namespace + 'active')) {
                            slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                            slider.flexAnimate(target, vars.pauseOnAction);
                        }
                    });
                    if (touch) {
                        slider.controlNavScaffold.delegate('a', "click touchstart", function(event) {
                            event.preventDefault();
                        });
                    }
                }, setupManual: function() {
                    slider.controlNav = slider.manualControls;
                    methods.controlNav.active();
                    slider.controlNav.live(eventType, function(event) {
                        event.preventDefault();
                        var $this = $(this), target = slider.controlNav.index($this);
                        if (!$this.hasClass(namespace + 'active')) {
                            (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                            slider.flexAnimate(target, vars.pauseOnAction);
                        }
                    });
                    if (touch) {
                        slider.controlNav.live("click touchstart", function(event) {
                            event.preventDefault();
                        });
                    }
                }, set: function() {
                    var selector = (vars.controlNav === "thumbnails") ? 'img' : 'a';
                    slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
                }, active: function() {
                    slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
                }, update: function(action, pos) {
                    if (slider.pagingCount > 1 && action === "add") {
                        slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
                    } else if (slider.pagingCount === 1) {
                        slider.controlNavScaffold.find('li').remove();
                    } else {
                        slider.controlNav.eq(pos).closest('li').remove();
                    }
                    methods.controlNav.set();
                    (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
                }}, directionNav: {setup: function() {
                    var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li><a class="' + namespace + 'prev" href="#">' + vars.prevText + '</a></li><li><a class="' + namespace + 'next" href="#">' + vars.nextText + '</a></li></ul>');
                    if (slider.controlsContainer) {
                        $(slider.controlsContainer).append(directionNavScaffold);
                        slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
                    } else {
                        slider.append(directionNavScaffold);
                        slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
                    }
                    methods.directionNav.update();
                    slider.directionNav.bind(eventType, function(event) {
                        event.preventDefault();
                        var target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
                        slider.flexAnimate(target, vars.pauseOnAction);
                    });
                    if (touch) {
                        slider.directionNav.bind("click touchstart", function(event) {
                            event.preventDefault();
                        });
                    }
                }, update: function() {
                    var disabledClass = namespace + 'disabled';
                    if (slider.pagingCount === 1) {
                        slider.directionNav.addClass(disabledClass);
                    } else if (!vars.animationLoop) {
                        if (slider.animatingTo === 0) {
                            slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass);
                        } else if (slider.animatingTo === slider.last) {
                            slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass);
                        } else {
                            slider.directionNav.removeClass(disabledClass);
                        }
                    } else {
                        slider.directionNav.removeClass(disabledClass);
                    }
                }}, pausePlay: {setup: function() {
                    var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');
                    if (slider.controlsContainer) {
                        slider.controlsContainer.append(pausePlayScaffold);
                        slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
                    } else {
                        slider.append(pausePlayScaffold);
                        slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
                    }
                    methods.pausePlay.update((vars.slideshow) ? namespace + 'pause' : namespace + 'play');
                    slider.pausePlay.bind(eventType, function(event) {
                        event.preventDefault();
                        if ($(this).hasClass(namespace + 'pause')) {
                            slider.manualPause = true;
                            slider.manualPlay = false;
                            slider.pause();
                        } else {
                            slider.manualPause = false;
                            slider.manualPlay = true;
                            slider.play();
                        }
                    });
                    if (touch) {
                        slider.pausePlay.bind("click touchstart", function(event) {
                            event.preventDefault();
                        });
                    }
                }, update: function(state) {
                    (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').text(vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').text(vars.pauseText);
                }}, touch: function() {
                var startX, startY, offset, cwidth, dx, startT, scrolling = false;
                el.addEventListener('touchstart', onTouchStart, false);
                function onTouchStart(e) {
                    if (slider.animating) {
                        e.preventDefault();
                    } else if (e.touches.length === 1) {
                        slider.pause();
                        cwidth = (vertical) ? slider.h : slider.w;
                        startT = Number(new Date());
                        offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 : (carousel && reverse) ? slider.limit - (((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo) : (carousel && slider.currentSlide === slider.last) ? slider.limit : (carousel) ? ((slider.itemW + vars.itemMargin) * slider.move) * slider.currentSlide : (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                        startX = (vertical) ? e.touches[0].pageY : e.touches[0].pageX;
                        startY = (vertical) ? e.touches[0].pageX : e.touches[0].pageY;
                        el.addEventListener('touchmove', onTouchMove, false);
                        el.addEventListener('touchend', onTouchEnd, false);
                    }
                }
                function onTouchMove(e) {
                    dx = (vertical) ? startX - e.touches[0].pageY : startX - e.touches[0].pageX;
                    scrolling = (vertical) ? (Math.abs(dx) < Math.abs(e.touches[0].pageX - startY)) : (Math.abs(dx) < Math.abs(e.touches[0].pageY - startY));
                    if (!scrolling || Number(new Date()) - startT > 500) {
                        e.preventDefault();
                        if (!fade && slider.transitions) {
                            if (!vars.animationLoop) {
                                dx = dx / ((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx) / cwidth + 2) : 1);
                            }
                            slider.setProps(offset + dx, "setTouch");
                        }
                    }
                }
                function onTouchEnd(e) {
                    el.removeEventListener('touchmove', onTouchMove, false);
                    if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                        var updateDx = (reverse) ? -dx : dx, target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');
                        if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) {
                            slider.flexAnimate(target, vars.pauseOnAction);
                        } else {
                            if (!fade)
                                slider.flexAnimate(slider.currentSlide, vars.pauseOnAction, true);
                        }
                    }
                    el.removeEventListener('touchend', onTouchEnd, false);
                    startX = null;
                    startY = null;
                    dx = null;
                    offset = null;
                }}
            , resize: function() {
                if (!slider.animating && slider.is(':visible')) {
                    if (!carousel)
                        slider.doMath();
                    if (fade) {
                        methods.smoothHeight();
                    } else if (carousel) {
                        slider.slides.css({"width": slider.computedW});
                        slider.update(slider.pagingCount);
                        slider.setProps();
                    }
                    else if (vertical) {
                        slider.viewport.height(slider.h);
                        slider.setProps(slider.h, "setTotal");
                    } else {
                        if (vars.smoothHeight)
                            methods.smoothHeight();
                        slider.newSlides.css({"width": slider.computedW});
                        slider.setProps(slider.computedW, "setTotal");
                    }
                }
            }, smoothHeight: function(dur) {
                if (!vertical || fade) {
                    var $obj = (fade) ? slider : slider.viewport;
                    (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).height()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
                }
            }, sync: function(action) {
                var $obj = $(vars.sync).data("flexslider"), target = slider.animatingTo;
                switch (action) {
                    case"animate":
                        $obj.flexAnimate(target, vars.pauseOnAction, false, true);
                        break;
                    case"play":
                        if (!$obj.playing && !$obj.asNav) {
                            $obj.play();
                        }
                        break;
                    case"pause":
                        $obj.pause();
                        break;
                }
            }}
        slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
            if (asNav && slider.pagingCount === 1)
                slider.direction = (slider.currentItem < target) ? "next" : "prev";
            if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
                if (asNav && withSync) {
                    var master = $(vars.asNavFor).data('flexslider');
                    slider.atEnd = target === 0 || target === slider.count - 1;
                    master.flexAnimate(target, true, false, true, fromNav);
                    slider.direction = (slider.currentItem < target) ? "next" : "prev";
                    master.direction = slider.direction;
                    if (Math.ceil((target + 1) / slider.visible) - 1 !== slider.currentSlide && target !== 0) {
                        slider.currentItem = target;
                        slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
                        target = Math.floor(target / slider.visible);
                    } else {
                        slider.currentItem = target;
                        slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
                        return false;
                    }
                }
                slider.animating = true;
                slider.animatingTo = target;
                vars.before(slider);
                if (pause)
                    slider.pause();
                if (slider.syncExists && !fromNav)
                    methods.sync("animate");
                if (vars.controlNav)
                    methods.controlNav.active();
                if (!carousel)
                    slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');
                slider.atEnd = target === 0 || target === slider.last;
                if (vars.directionNav)
                    methods.directionNav.update();
                if (target === slider.last) {
                    vars.end(slider);
                    if (!vars.animationLoop)
                        slider.pause();
                }
                if (!fade) {
                    var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW, margin, slideString, calcNext;
                    if (carousel) {
                        margin = (vars.itemWidth > slider.w) ? vars.itemMargin * 2 : vars.itemMargin;
                        calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
                        slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
                    } else if (slider.currentSlide === 0 && target === slider.count - 1 && vars.animationLoop && slider.direction !== "next") {
                        slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
                    } else if (slider.currentSlide === slider.last && target === 0 && vars.animationLoop && slider.direction !== "prev") {
                        slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
                    } else {
                        slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
                    }
                    slider.setProps(slideString, "", vars.animationSpeed);
                    if (slider.transitions) {
                        if (!vars.animationLoop || !slider.atEnd) {
                            slider.animating = false;
                            slider.currentSlide = slider.animatingTo;
                        }
                        slider.container.unbind("webkitTransitionEnd transitionend");
                        slider.container.bind("webkitTransitionEnd transitionend", function() {
                            slider.wrapup(dimension);
                        });
                    } else {
                        slider.container.animate(slider.args, vars.animationSpeed, vars.easing, function() {
                            slider.wrapup(dimension);
                        });
                    }
                } else {
                    if (!touch) {
                        slider.slides.eq(slider.currentSlide).fadeOut(vars.animationSpeed, vars.easing);
                        slider.slides.eq(target).fadeIn(vars.animationSpeed, vars.easing, slider.wrapup);
                    } else {
                        slider.slides.eq(slider.currentSlide).css({"opacity": 0, "zIndex": 1});
                        slider.slides.eq(target).css({"opacity": 1, "zIndex": 2});
                        slider.slides.unbind("webkitTransitionEnd transitionend");
                        slider.slides.eq(slider.currentSlide).bind("webkitTransitionEnd transitionend", function() {
                            vars.after(slider);
                        });
                        slider.animating = false;
                        slider.currentSlide = slider.animatingTo;
                    }
                }
                if (vars.smoothHeight)
                    methods.smoothHeight(vars.animationSpeed);
            }
        }
        slider.wrapup = function(dimension) {
            if (!fade && !carousel) {
                if (slider.currentSlide === 0 && slider.animatingTo === slider.last && vars.animationLoop) {
                    slider.setProps(dimension, "jumpEnd");
                } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && vars.animationLoop) {
                    slider.setProps(dimension, "jumpStart");
                }
            }
            slider.animating = false;
            slider.currentSlide = slider.animatingTo;
            vars.after(slider);
        }
        slider.animateSlides = function() {
            if (!slider.animating)
                slider.flexAnimate(slider.getTarget("next"));
        }
        slider.pause = function() {
            clearInterval(slider.animatedSlides);
            slider.playing = false;
            if (vars.pausePlay)
                methods.pausePlay.update("play");
            if (slider.syncExists)
                methods.sync("pause");
        }
        slider.play = function() {
            slider.animatedSlides = setInterval(slider.animateSlides, vars.slideshowSpeed);
            slider.playing = true;
            if (vars.pausePlay)
                methods.pausePlay.update("pause");
            if (slider.syncExists)
                methods.sync("play");
        }
        slider.canAdvance = function(target, fromNav) {
            var last = (asNav) ? slider.pagingCount - 1 : slider.last;
            return(fromNav) ? true : (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true : (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false : (target === slider.currentSlide && !asNav) ? false : (vars.animationLoop) ? true : (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false : (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false : true;
        }
        slider.getTarget = function(dir) {
            slider.direction = dir;
            if (dir === "next") {
                return(slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
            } else {
                return(slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
            }
        }
        slider.setProps = function(pos, special, dur) {
            var target = (function() {
                var posCheck = (pos) ? pos : ((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo, posCalc = (function() {
                    if (carousel) {
                        return(special === "setTouch") ? pos : (reverse && slider.animatingTo === slider.last) ? 0 : (reverse) ? slider.limit - (((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo) : (slider.animatingTo === slider.last) ? slider.limit : posCheck;
                    } else {
                        switch (special) {
                            case"setTotal":
                                return(reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                            case"setTouch":
                                return(reverse) ? pos : pos;
                            case"jumpEnd":
                                return(reverse) ? pos : slider.count * pos;
                            case"jumpStart":
                                return(reverse) ? slider.count * pos : pos;
                            default:
                                return pos;
                        }
                    }
                }());
                return(posCalc * -1) + "px";
            }());
            if (slider.transitions) {
                target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
                dur = (dur !== undefined) ? (dur / 1000) + "s" : "0s";
                slider.container.css("-" + slider.pfx + "-transition-duration", dur);
            }
            slider.args[slider.prop] = target;
            if (slider.transitions || dur === undefined)
                slider.container.css(slider.args);
        }
        slider.setup = function(type) {
            if (!fade) {
                var sliderOffset, arr;
                if (type === "init") {
                    var viewportCss = {"overflow": "hidden"};
                    if (!vars.productSlider)
                        viewportCss.position = "relative";
                    slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css(viewportCss).appendTo(slider).append(slider.container);
                    slider.cloneCount = 0;
                    slider.cloneOffset = 0;
                    if (reverse) {
                        arr = $.makeArray(slider.slides).reverse();
                        slider.slides = $(arr);
                        slider.container.empty().append(slider.slides);
                    }
                }
                if (vars.animationLoop && !carousel) {
                    slider.cloneCount = 2;
                    slider.cloneOffset = 1;
                    if (type !== "init")
                        slider.container.find('.clone').remove();
                    slider.container.append(slider.slides.first().clone().addClass('clone')).prepend(slider.slides.last().clone().addClass('clone'));
                }
                slider.newSlides = $(vars.selector, slider);
                sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
                if (vertical && !carousel) {
                    slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
                    setTimeout(function() {
                        slider.newSlides.css({"display": "block"});
                        slider.doMath();
                        slider.viewport.height(slider.h);
                        slider.setProps(sliderOffset * slider.h, "init");
                    }, (type === "init") ? 100 : 0);
                } else {
                    slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
                    slider.setProps(sliderOffset * slider.computedW, "init");
                    setTimeout(function() {
                        slider.doMath();
                        slider.newSlides.css({"width": slider.computedW, "float": "left", "display": "block"});
                        if (vars.smoothHeight)
                            methods.smoothHeight();
                    }, (type === "init") ? 100 : 0);
                }
            } else {
                slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
                if (type === "init") {
                    if (!touch) {
                        slider.slides.eq(slider.currentSlide).fadeIn(vars.animationSpeed, vars.easing);
                    } else {
                        slider.slides.css({"opacity": 0, "display": "block", "webkitTransition": "opacity " + vars.animationSpeed / 1000 + "s ease", "zIndex": 1}).eq(slider.currentSlide).css({"opacity": 1, "zIndex": 2});
                    }
                }
                if (vars.smoothHeight)
                    methods.smoothHeight();
            }
            if (!carousel)
                slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");
        }
        slider.doMath = function() {
            var slide = slider.slides.first(), slideMargin = vars.itemMargin, minItems = vars.minItems, maxItems = vars.maxItems;
            slider.w = slider.width();
            slider.h = slide.height();
            slider.boxPadding = slide.outerWidth() - slide.width();
            if (carousel) {
                slider.itemT = vars.itemWidth + slideMargin;
                slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
                slider.maxW = (maxItems) ? maxItems * slider.itemT : slider.w;
                slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * minItems)) / minItems : (slider.maxW < slider.w) ? (slider.w - (slideMargin * maxItems)) / maxItems : (vars.itemWidth > slider.w) ? slider.w : vars.itemWidth;
                slider.itemW = parseInt(slider.itemW) % 2 == 1 ? parseInt(slider.itemW) - 1 : parseInt(slider.itemW);
                slider.visible = Math.floor(slider.w / (slider.itemW + slideMargin));
                slider.move = (vars.move > 0 && vars.move < slider.visible) ? vars.move : slider.visible;
                slider.pagingCount = Math.ceil(((slider.count - slider.visible) / slider.move) + 1);
                slider.last = slider.pagingCount - 1;
                slider.limit = (slider.pagingCount === 1) ? 0 : (vars.itemWidth > slider.w) ? ((slider.itemW + (slideMargin * 2)) * slider.count) - slider.w - slideMargin : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
            } else {
                slider.itemW = slider.w;
                slider.pagingCount = slider.count;
                slider.last = slider.count - 1;
            }
            slider.computedW = slider.itemW;
        }
        slider.update = function(pos, action) {
            slider.doMath();
            if (!carousel) {
                if (pos < slider.currentSlide) {
                    slider.currentSlide += 1;
                } else if (pos <= slider.currentSlide && pos !== 0) {
                    slider.currentSlide -= 1;
                }
                slider.animatingTo = slider.currentSlide;
            }
            if (vars.controlNav && !slider.manualControls) {
                if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
                    methods.controlNav.update("add");
                } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
                    if (carousel && slider.currentSlide > slider.last) {
                        slider.currentSlide -= 1;
                        slider.animatingTo -= 1;
                    }
                    methods.controlNav.update("remove", slider.last);
                }
            }
            if (vars.directionNav)
                methods.directionNav.update();
        }
        slider.addSlide = function(obj, pos) {
            var $obj = $(obj);
            slider.count += 1;
            slider.last = slider.count - 1;
            if (vertical && reverse) {
                (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
            } else {
                (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
            }
            slider.update(pos, "add");
            slider.slides = $(vars.selector + ':not(.clone)', slider);
            slider.setup();
            vars.added(slider);
        }
        slider.removeSlide = function(obj) {
            var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;
            slider.count -= 1;
            slider.last = slider.count - 1;
            if (isNaN(obj)) {
                $(obj, slider.slides).remove();
            } else {
                (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
            }
            slider.doMath();
            slider.update(pos, "remove");
            slider.slides = $(vars.selector + ':not(.clone)', slider);
            slider.setup();
            vars.removed(slider);
        }
        slider.setVars = function(options) {
            $.extend(vars, options);
            slider.flexAnimate(0, true);
            slider.setup();
        };
        methods.init();
    }
    $.flexslider.defaults = {namespace: "flex-", selector: ".slides > li", animation: "fade", easing: "swing", direction: "horizontal", reverse: false, animationLoop: true, smoothHeight: false, startAt: 0, slideshow: true, slideshowSpeed: 7000, animationSpeed: 600, initDelay: 0, randomize: false, pauseOnAction: true, pauseOnHover: false, useCSS: true, touch: true, video: false, controlNav: true, directionNav: true, prevText: "<i class='icon-angle-left icon-3x'></i>", nextText: "<i class='icon-angle-right icon-3x'></i>", keyboard: true, multipleKeyboard: false, mousewheel: false, pausePlay: false, pauseText: "Pause", playText: "Play", controlsContainer: "", manualControls: "", sync: "", asNavFor: "", itemWidth: 0, itemMargin: 0, minItems: 0, maxItems: 0, move: 0, start: function() {
        }, before: function() {
        }, after: function() {
        }, end: function() {
        }, added: function() {
        }, removed: function() {
        }, pauseOn: function() {
        }, pauseOff: function() {
        }, productSlider: false, allowOneSlide: true}
    $.fn.flexslider = function(options) {
        if (options === undefined)
            options = {};
        if (typeof options === "object") {
            return this.each(function() {
                var $this = $(this), selector = (options.selector) ? options.selector : ".slides > li", $slides = $this.find(selector);
                if (($slides.length === 1 && options.allowOneSlide === true) || $slides.length === 0) {
                    $slides.fadeIn(400);
                    if (options.start)
                        options.start($this);
                } else if ($this.data('flexslider') == undefined) {
                    new $.flexslider(this, options);
                }
            });
        } else {
            var $slider = $(this).data('flexslider');
            switch (options) {
                case"play":
                    $slider.play();
                    break;
                case"pause":
                    $slider.pause();
                    break;
                case"next":
                    $slider.flexAnimate($slider.getTarget("next"), true);
                    break;
                case"prev":
                case"previous":
                    $slider.flexAnimate($slider.getTarget("prev"), true);
                    break;
                default:
                    if (typeof options === "number")
                        $slider.flexAnimate(options, true);
            }
        }
    }
})(jQuery);
var extendViewsPlugin = (function() {
    var pluginExtend = {imageSwitch: function(data) {
            $('.pro_thumb_item').bind('click', function() {
                $(this).parent().addClass('pro_thumb_selected').siblings().removeClass('pro_thumb_selected');
                var img_cover = $('img.img_cover', $(this).closest('li'));
                var isImage = $(this).find('img')[0];
                isImage = (typeof (isImage) != 'undefined' ? true : false);
                if (isImage)
                    img_cover.attr('src', $(this).find('img').attr('src').replace('productmin', 'home_default'));
            });
        }, initCarousel: function(data) {
            var prev, next;
            $('#product_list li').each(function(k, obj) {
                prev = $('.combinations_thumb_wraper .previous', this);
                next = $('.combinations_thumb_wraper .next', this);
                $('.combinations_thumb', this).extendCarousel({'previous': prev, 'next': next, 'viewPort': 4});
            });
        }};
    return{init: function(ajax) {
            pluginExtend.initCarousel();
            pluginExtend.imageSwitch();
        }};
})();
$.fn.extendCarousel = function(options) {
    options = $.extend({previous: '#next', next: '#prev', viewPort: 6, toolTip: false, callback: function() {
        }}, options);
    var listItems = $(this).children('dl');
    if (typeof (options.previous) == 'string')
        options.previous = $(previous);
    if (typeof (options.next) == 'string')
        options.next = $(next);
    var numElmts = $(listItems).children('dd').length;
    if (numElmts > options.viewPort) {
        options.previous.css('display', 'block');
        options.next.css('display', 'block');
    }
    if (listItems) {
        var increment = $(listItems).children('dd').outerWidth(true), elmnts = $(listItems).children('dd'), numElmts = elmnts.length, firstItem = 1, isAnimating = false;
        for (i = 0; i < options.viewPort; i++) {
            $(listItems).css('width', (numElmts + options.viewPort) * increment + increment + "px");
        }
        options.previous.click(function(event) {
            if (!isAnimating && !options.previous.hasClass('disa')) {
                options.next.removeClass('disa');
                if (firstItem == 2)
                    options.previous.addClass('disa');
                firstItem--;
                $(listItems).animate({left: "+=" + increment * 1, y: 0, queue: true}, "swing", function() {
                    isAnimating = false;
                });
                isAnimating = true;
            }
        });
        options.next.click(function(event) {
            if (!isAnimating && !options.next.hasClass('disa')) {
                options.previous.removeClass('disa');
                firstItem++;
                if (firstItem == numElmts - 3)
                    options.next.addClass('disa');
                $(listItems).animate({left: "-=" + increment * 1, y: 0, queue: true}, "swing", function() {
                    isAnimating = false;
                });
                isAnimating = true;
            }
        });
    }
};
$.fn.countdown = function(options) {
    var defaults = {id: 'countdown_senconds', onlyDays: 4, textdays: 'days', suffix: 'Sale ends'};
    return this.each(function() {
        options = $.extend(defaults, options);
        if (!options.endDate)
            return;
        var el = $(this);
        var timeLeft = new Date(options.endDate) - new Date(options.curDate);
        if (timeLeft <= 0) {
            return
        }
        ;
        var timer, eltxt = $('#' + options.id);
        if (eltxt.size() != 1)
            eltxt = el;
        var is_onlydays = false;
        var tick = function() {
            timeLeft -= 1000;
            if (timeLeft < 0) {
                window.clearInterval(timer);
                return
            }
            ;
            var seconds = timeLeft / 1000;
            minutes = Math.floor(seconds / 60);
            hours = Math.floor(minutes / 60);
            days = Math.floor(hours / 24);
            seconds %= 60;
            minutes %= 60;
            seconds = ("0" + seconds).slice(-2);
            minutes = ("0" + minutes).slice(-2);
            if (hours < 10)
                hours = ("0" + hours).slice(-2);
            if (days >= options.onlyDays) {
                eltxt.html(options.suffix + ' ' + days + ' ' + options.textdays + ' ' + (hours % 24 < 10 ? ("0" + hours % 24) : hours % 24) + ':' + minutes + ":" + seconds);
            } else {
                eltxt.html(options.suffix + ' ' + hours + ':' + minutes + ":" + seconds);
            }
        };
        tick();
        if (!is_onlydays)
            timer = window.setInterval(tick, 1000)
    })
};
;
if (typeof Object.create !== "function") {
    Object.create = function(obj) {
        function F() {
        }
        F.prototype = obj;
        return new F();
    };
}
(function($, window, document) {
    var Carousel = {init: function(options, el) {
            var base = this;
            base.$elem = $(el);
            base.options = $.extend({}, $.fn.owlCarousel.options, base.$elem.data(), options);
            base.userOptions = options;
            base.loadContent();
        }, loadContent: function() {
            var base = this, url;
            function getData(data) {
                var i, content = "";
                if (typeof base.options.jsonSuccess === "function") {
                    base.options.jsonSuccess.apply(this, [data]);
                } else {
                    for (i in data.owl) {
                        if (data.owl.hasOwnProperty(i)) {
                            content += data.owl[i].item;
                        }
                    }
                    base.$elem.html(content);
                }
                base.logIn();
            }
            if (typeof base.options.beforeInit === "function") {
                base.options.beforeInit.apply(this, [base.$elem]);
            }
            if (typeof base.options.jsonPath === "string") {
                url = base.options.jsonPath;
                $.getJSON(url, getData);
            } else {
                base.logIn();
            }
        }, logIn: function() {
            var base = this;
            base.$elem.data("owl-originalStyles", base.$elem.attr("style"));
            base.$elem.data("owl-originalClasses", base.$elem.attr("class"));
            base.$elem.css({opacity: 0});
            base.orignalItems = base.options.items;
            base.checkBrowser();
            base.wrapperWidth = 0;
            base.checkVisible = null;
            base.setVars();
        }, setVars: function() {
            var base = this;
            if (base.$elem.children().length === 0) {
                return false;
            }
            base.baseClass();
            base.eventTypes();
            base.$userItems = base.$elem.children();
            base.itemsAmount = base.$userItems.length;
            base.wrapItems();
            base.$owlItems = base.$elem.find(".owl-item");
            base.$owlWrapper = base.$elem.find(".owl-wrapper");
            base.playDirection = "next";
            base.prevItem = 0;
            base.prevArr = [0];
            base.currentItem = 0;
            base.customEvents();
            base.onStartup();
        }, onStartup: function() {
            var base = this;
            base.updateItems();
            base.calculateAll();
            base.buildControls();
            base.updateControls();
            base.response();
            base.moveEvents();
            base.stopOnHover();
            base.owlStatus();
            if (base.options.transitionStyle !== false) {
                base.transitionTypes(base.options.transitionStyle);
            }
            if (base.options.autoPlay === true) {
                base.options.autoPlay = 5000;
            }
            base.play();
            base.$elem.find(".owl-wrapper").css("display", "block");
            if (!base.$elem.is(":visible")) {
                base.watchVisibility();
            } else {
                base.$elem.css("opacity", 1);
            }
            base.onstartup = false;
            base.eachMoveUpdate();
            if (typeof base.options.afterInit === "function") {
                base.options.afterInit.apply(this, [base.$elem]);
            }
        }, eachMoveUpdate: function() {
            var base = this;
            if (base.options.lazyLoad === true) {
                base.lazyLoad();
            }
            if (base.options.autoHeight === true) {
                base.autoHeight();
            }
            base.onVisibleItems();
            if (typeof base.options.afterAction === "function") {
                base.options.afterAction.apply(this, [base.$elem]);
            }
        }, updateVars: function() {
            var base = this;
            if (typeof base.options.beforeUpdate === "function") {
                base.options.beforeUpdate.apply(this, [base.$elem]);
            }
            base.watchVisibility();
            base.updateItems();
            base.calculateAll();
            base.updatePosition();
            base.updateControls();
            base.eachMoveUpdate();
            if (typeof base.options.afterUpdate === "function") {
                base.options.afterUpdate.apply(this, [base.$elem]);
            }
        }, reload: function() {
            var base = this;
            window.setTimeout(function() {
                base.updateVars();
            }, 0);
        }, watchVisibility: function() {
            var base = this;
            if (base.$elem.is(":visible") === false) {
                base.$elem.css({opacity: 0});
                window.clearInterval(base.autoPlayInterval);
                window.clearInterval(base.checkVisible);
            } else {
                return false;
            }
            base.checkVisible = window.setInterval(function() {
                if (base.$elem.is(":visible")) {
                    base.reload();
                    base.$elem.animate({opacity: 1}, 200);
                    window.clearInterval(base.checkVisible);
                }
            }, 500);
        }, wrapItems: function() {
            var base = this;
            base.$userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");
            base.$elem.find(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");
            base.wrapperOuter = base.$elem.find(".owl-wrapper-outer");
            base.$elem.css("display", "block");
        }, baseClass: function() {
            var base = this, hasBaseClass = base.$elem.hasClass(base.options.baseClass), hasThemeClass = base.$elem.hasClass(base.options.theme);
            if (!hasBaseClass) {
                base.$elem.addClass(base.options.baseClass);
            }
            if (!hasThemeClass) {
                base.$elem.addClass(base.options.theme);
            }
        }, updateItems: function() {
            var base = this, width, i;
            if (base.options.responsive === false) {
                return false;
            }
            if (base.options.singleItem === true) {
                base.options.items = base.orignalItems = 1;
                base.options.itemsCustom = false;
                base.options.itemsDesktop = false;
                base.options.itemsDesktopSmall = false;
                base.options.itemsTablet = false;
                base.options.itemsTabletSmall = false;
                base.options.itemsMobile = false;
                return false;
            }
            width = $(base.options.responsiveBaseWidth).width();
            if (width > (base.options.itemsDesktop[0] || base.orignalItems)) {
                base.options.items = base.orignalItems;
            }
            if (base.options.itemsCustom !== false) {
                base.options.itemsCustom.sort(function(a, b) {
                    return a[0] - b[0];
                });
                for (i = 0; i < base.options.itemsCustom.length; i += 1) {
                    if (base.options.itemsCustom[i][0] <= width) {
                        base.options.items = base.options.itemsCustom[i][1];
                    }
                }
            } else {
                if (width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false) {
                    base.options.items = base.options.itemsDesktop[1];
                }
                if (width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false) {
                    base.options.items = base.options.itemsDesktopSmall[1];
                }
                if (width <= base.options.itemsTablet[0] && base.options.itemsTablet !== false) {
                    base.options.items = base.options.itemsTablet[1];
                }
                if (width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== false) {
                    base.options.items = base.options.itemsTabletSmall[1];
                }
                if (width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false) {
                    base.options.items = base.options.itemsMobile[1];
                }
            }
            if (base.options.items > base.itemsAmount && base.options.itemsScaleUp === true) {
                base.options.items = base.itemsAmount;
            }
        }, response: function() {
            var base = this, smallDelay, lastWindowWidth;
            if (base.options.responsive !== true) {
                return false;
            }
            lastWindowWidth = $(window).width();
            base.resizer = function() {
                if ($(window).width() !== lastWindowWidth) {
                    if (base.options.autoPlay !== false) {
                        window.clearInterval(base.autoPlayInterval);
                    }
                    window.clearTimeout(smallDelay);
                    smallDelay = window.setTimeout(function() {
                        lastWindowWidth = $(window).width();
                        base.updateVars();
                    }, base.options.responsiveRefreshRate);
                }
            };
            $(window).resize(base.resizer);
        }, updatePosition: function() {
            var base = this;
            base.jumpTo(base.currentItem);
            if (base.options.autoPlay !== false) {
                base.checkAp();
            }
        }, appendItemsSizes: function() {
            var base = this, roundPages = 0, lastItem = base.itemsAmount - base.options.items;
            base.$owlItems.each(function(index) {
                var $this = $(this);
                $this.css({"width": base.itemWidth}).data("owl-item", Number(index));
                if (index % base.options.items === 0 || index === lastItem) {
                    if (!(index > lastItem)) {
                        roundPages += 1;
                    }
                }
                $this.data("owl-roundPages", roundPages);
            });
        }, appendWrapperSizes: function() {
            var base = this, width = base.$owlItems.length * base.itemWidth;
            base.$owlWrapper.css({"width": width * 2, "left": 0});
            base.appendItemsSizes();
        }, calculateAll: function() {
            var base = this;
            base.calculateWidth();
            base.appendWrapperSizes();
            base.loops();
            base.max();
        }, calculateWidth: function() {
            var base = this;
            base.itemWidth = Math.round(base.$elem.width() / base.options.items);
        }, max: function() {
            var base = this, maximum = ((base.itemsAmount * base.itemWidth) - base.options.items * base.itemWidth) * -1;
            if (base.options.items > base.itemsAmount) {
                base.maximumItem = 0;
                maximum = 0;
                base.maximumPixels = 0;
            } else {
                base.maximumItem = base.itemsAmount - base.options.items;
                base.maximumPixels = maximum;
            }
            return maximum;
        }, min: function() {
            return 0;
        }, loops: function() {
            var base = this, prev = 0, elWidth = 0, i, item, roundPageNum;
            base.positionsInArray = [0];
            base.pagesInArray = [];
            for (i = 0; i < base.itemsAmount; i += 1) {
                elWidth += base.itemWidth;
                base.positionsInArray.push(-elWidth);
                if (base.options.scrollPerPage === true) {
                    item = $(base.$owlItems[i]);
                    roundPageNum = item.data("owl-roundPages");
                    if (roundPageNum !== prev) {
                        base.pagesInArray[prev] = base.positionsInArray[i];
                        prev = roundPageNum;
                    }
                }
            }
        }, buildControls: function() {
            var base = this;
            if (base.options.navigation === true || base.options.pagination === true) {
                base.owlControls = $("<div class=\"owl-controls\"/>").toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem);
            }
            if (base.options.pagination === true) {
                base.buildPagination();
            }
            if (base.options.navigation === true) {
                base.buildButtons();
            }
        }, buildButtons: function() {
            var base = this, buttonsWrapper = $("<div class=\"owl-buttons\"/>");
            base.owlControls.append(buttonsWrapper);
            base.buttonPrev = $("<div/>", {"class": "owl-prev", "html": base.options.navigationText[0] || ""});
            base.buttonNext = $("<div/>", {"class": "owl-next", "html": base.options.navigationText[1] || ""});
            buttonsWrapper.append(base.buttonPrev).append(base.buttonNext);
            buttonsWrapper.on("touchstart.owlControls mousedown.owlControls", "div[class^=\"owl\"]", function(event) {
                event.preventDefault();
            });
            buttonsWrapper.on("touchend.owlControls mouseup.owlControls", "div[class^=\"owl\"]", function(event) {
                event.preventDefault();
                if ($(this).hasClass("owl-next")) {
                    base.next();
                } else {
                    base.prev();
                }
            });
        }, buildPagination: function() {
            var base = this;
            base.paginationWrapper = $("<div class=\"owl-pagination\"/>");
            base.owlControls.append(base.paginationWrapper);
            base.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(event) {
                event.preventDefault();
                if (Number($(this).data("owl-page")) !== base.currentItem) {
                    base.goTo(Number($(this).data("owl-page")), true);
                }
            });
        }, updatePagination: function() {
            var base = this, counter, lastPage, lastItem, i, paginationButton, paginationButtonInner;
            if (base.options.pagination === false) {
                return false;
            }
            base.paginationWrapper.html("");
            counter = 0;
            lastPage = base.itemsAmount - base.itemsAmount % base.options.items;
            for (i = 0; i < base.itemsAmount; i += 1) {
                if (i % base.options.items === 0) {
                    counter += 1;
                    if (lastPage === i) {
                        lastItem = base.itemsAmount - base.options.items;
                    }
                    paginationButton = $("<div/>", {"class": "owl-page"});
                    paginationButtonInner = $("<span></span>", {"text": base.options.paginationNumbers === true ? counter : "", "class": base.options.paginationNumbers === true ? "owl-numbers" : ""});
                    paginationButton.append(paginationButtonInner);
                    paginationButton.data("owl-page", lastPage === i ? lastItem : i);
                    paginationButton.data("owl-roundPages", counter);
                    base.paginationWrapper.append(paginationButton);
                }
            }
            base.checkPagination();
        }, checkPagination: function() {
            var base = this;
            if (base.options.pagination === false) {
                return false;
            }
            base.paginationWrapper.find(".owl-page").each(function() {
                if ($(this).data("owl-roundPages") === $(base.$owlItems[base.currentItem]).data("owl-roundPages")) {
                    base.paginationWrapper.find(".owl-page").removeClass("active");
                    $(this).addClass("active");
                }
            });
        }, checkNavigation: function() {
            var base = this;
            if (base.options.navigation === false) {
                return false;
            }
            if (base.options.rewindNav === false) {
                if (base.currentItem === 0 && base.maximumItem === 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem === 0 && base.maximumItem !== 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.removeClass("disabled");
                } else if (base.currentItem === base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem !== 0 && base.currentItem !== base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.removeClass("disabled");
                }
            }
        }, updateControls: function() {
            var base = this;
            base.updatePagination();
            base.checkNavigation();
            if (base.owlControls) {
                if (base.options.items >= base.itemsAmount) {
                    base.owlControls.hide();
                } else {
                    base.owlControls.show();
                }
            }
        }, destroyControls: function() {
            var base = this;
            if (base.owlControls) {
                base.owlControls.remove();
            }
        }, next: function(speed) {
            var base = this;
            if (base.isTransition) {
                return false;
            }
            base.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;
            if (base.currentItem > base.maximumItem + (base.options.scrollPerPage === true ? (base.options.items - 1) : 0)) {
                if (base.options.rewindNav === true) {
                    base.currentItem = 0;
                    speed = "rewind";
                } else {
                    base.currentItem = base.maximumItem;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        }, prev: function(speed) {
            var base = this;
            if (base.isTransition) {
                return false;
            }
            if (base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items) {
                base.currentItem = 0;
            } else {
                base.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;
            }
            if (base.currentItem < 0) {
                if (base.options.rewindNav === true) {
                    base.currentItem = base.maximumItem;
                    speed = "rewind";
                } else {
                    base.currentItem = 0;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        }, goTo: function(position, speed, drag) {
            var base = this, goToPixel;
            if (base.isTransition) {
                return false;
            }
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }
            base.currentItem = base.owl.currentItem = position;
            if (base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1 && base.browser.support3d === true) {
                base.swapSpeed(0);
                if (base.browser.support3d === true) {
                    base.transition3d(base.positionsInArray[position]);
                } else {
                    base.css2slide(base.positionsInArray[position], 1);
                }
                base.afterGo();
                base.singleItemTransition();
                return false;
            }
            goToPixel = base.positionsInArray[position];
            if (base.browser.support3d === true) {
                base.isCss3Finish = false;
                if (speed === true) {
                    base.swapSpeed("paginationSpeed");
                    window.setTimeout(function() {
                        base.isCss3Finish = true;
                    }, base.options.paginationSpeed);
                } else if (speed === "rewind") {
                    base.swapSpeed(base.options.rewindSpeed);
                    window.setTimeout(function() {
                        base.isCss3Finish = true;
                    }, base.options.rewindSpeed);
                } else {
                    base.swapSpeed("slideSpeed");
                    window.setTimeout(function() {
                        base.isCss3Finish = true;
                    }, base.options.slideSpeed);
                }
                base.transition3d(goToPixel);
            } else {
                if (speed === true) {
                    base.css2slide(goToPixel, base.options.paginationSpeed);
                } else if (speed === "rewind") {
                    base.css2slide(goToPixel, base.options.rewindSpeed);
                } else {
                    base.css2slide(goToPixel, base.options.slideSpeed);
                }
            }
            base.afterGo();
        }, jumpTo: function(position) {
            var base = this;
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem || position === -1) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }
            base.swapSpeed(0);
            if (base.browser.support3d === true) {
                base.transition3d(base.positionsInArray[position]);
            } else {
                base.css2slide(base.positionsInArray[position], 1);
            }
            base.currentItem = base.owl.currentItem = position;
            base.afterGo();
        }, afterGo: function() {
            var base = this;
            base.prevArr.push(base.currentItem);
            base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2];
            base.prevArr.shift(0);
            if (base.prevItem !== base.currentItem) {
                base.checkPagination();
                base.checkNavigation();
                base.eachMoveUpdate();
                if (base.options.autoPlay !== false) {
                    base.checkAp();
                }
            }
            if (typeof base.options.afterMove === "function" && base.prevItem !== base.currentItem) {
                base.options.afterMove.apply(this, [base.$elem]);
            }
        }, stop: function() {
            var base = this;
            base.apStatus = "stop";
            window.clearInterval(base.autoPlayInterval);
        }, checkAp: function() {
            var base = this;
            if (base.apStatus !== "stop") {
                base.play();
            }
        }, play: function() {
            var base = this;
            base.apStatus = "play";
            if (base.options.autoPlay === false) {
                return false;
            }
            window.clearInterval(base.autoPlayInterval);
            base.autoPlayInterval = window.setInterval(function() {
                base.next(true);
            }, base.options.autoPlay);
        }, swapSpeed: function(action) {
            var base = this;
            if (action === "slideSpeed") {
                base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed));
            } else if (action === "paginationSpeed") {
                base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed));
            } else if (typeof action !== "string") {
                base.$owlWrapper.css(base.addCssSpeed(action));
            }
        }, addCssSpeed: function(speed) {
            return{"-webkit-transition": "all " + speed + "ms ease", "-moz-transition": "all " + speed + "ms ease", "-o-transition": "all " + speed + "ms ease", "transition": "all " + speed + "ms ease"};
        }, removeTransition: function() {
            return{"-webkit-transition": "", "-moz-transition": "", "-o-transition": "", "transition": ""};
        }, doTranslate: function(pixels) {
            return{"-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)", "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)", "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)", "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)", "transform": "translate3d(" + pixels + "px, 0px,0px)"};
        }, transition3d: function(value) {
            var base = this;
            base.$owlWrapper.css(base.doTranslate(value));
        }, css2move: function(value) {
            var base = this;
            base.$owlWrapper.css({"left": value});
        }, css2slide: function(value, speed) {
            var base = this;
            base.isCssFinish = false;
            base.$owlWrapper.stop(true, true).animate({"left": value}, {duration: speed || base.options.slideSpeed, complete: function() {
                    base.isCssFinish = true;
                }});
        }, checkBrowser: function() {
            var base = this, translate3D = "translate3d(0px, 0px, 0px)", tempElem = document.createElement("div"), regex, asSupport, support3d, isTouch;
            tempElem.style.cssText = "  -moz-transform:" + translate3D + "; -ms-transform:" + translate3D + "; -o-transform:" + translate3D + "; -webkit-transform:" + translate3D + "; transform:" + translate3D;
            regex = /translate3d\(0px, 0px, 0px\)/g;
            asSupport = tempElem.style.cssText.match(regex);
            support3d = (asSupport !== null && asSupport.length >= 1 && asSupport.length <= 2);
            isTouch = "ontouchstart"in window || window.navigator.msMaxTouchPoints;
            base.browser = {"support3d": support3d, "isTouch": isTouch};
        }, moveEvents: function() {
            var base = this;
            if (base.options.mouseDrag !== false || base.options.touchDrag !== false) {
                base.gestures();
                base.disabledEvents();
            }
        }, eventTypes: function() {
            var base = this, types = ["s", "e", "x"];
            base.ev_types = {};
            if (base.options.mouseDrag === true && base.options.touchDrag === true) {
                types = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"];
            } else if (base.options.mouseDrag === false && base.options.touchDrag === true) {
                types = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"];
            } else if (base.options.mouseDrag === true && base.options.touchDrag === false) {
                types = ["mousedown.owl", "mousemove.owl", "mouseup.owl"];
            }
            base.ev_types.start = types[0];
            base.ev_types.move = types[1];
            base.ev_types.end = types[2];
        }, disabledEvents: function() {
            var base = this;
            base.$elem.on("dragstart.owl", function(event) {
                event.preventDefault();
            });
            base.$elem.on("mousedown.disableTextSelect", function(e) {
                return $(e.target).is('input, textarea, select, option');
            });
        }, gestures: function() {
            var base = this, locals = {offsetX: 0, offsetY: 0, baseElWidth: 0, relativePos: 0, position: null, minSwipe: null, maxSwipe: null, sliding: null, dargging: null, targetElement: null};
            base.isCssFinish = true;
            function getTouches(event) {
                if (event.touches !== undefined) {
                    return{x: event.touches[0].pageX, y: event.touches[0].pageY};
                }
                if (event.touches === undefined) {
                    if (event.pageX !== undefined) {
                        return{x: event.pageX, y: event.pageY};
                    }
                    if (event.pageX === undefined) {
                        return{x: event.clientX, y: event.clientY};
                    }
                }
            }
            function swapEvents(type) {
                if (type === "on") {
                    $(document).on(base.ev_types.move, dragMove);
                    $(document).on(base.ev_types.end, dragEnd);
                } else if (type === "off") {
                    $(document).off(base.ev_types.move);
                    $(document).off(base.ev_types.end);
                }
            }
            function dragStart(event) {
                var ev = event.originalEvent || event || window.event, position;
                if (ev.which === 3) {
                    return false;
                }
                if (base.itemsAmount <= base.options.items) {
                    return;
                }
                if (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }
                if (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }
                if (base.options.autoPlay !== false) {
                    window.clearInterval(base.autoPlayInterval);
                }
                if (base.browser.isTouch !== true && !base.$owlWrapper.hasClass("grabbing")) {
                    base.$owlWrapper.addClass("grabbing");
                }
                base.newPosX = 0;
                base.newRelativeX = 0;
                $(this).css(base.removeTransition());
                position = $(this).position();
                locals.relativePos = position.left;
                locals.offsetX = getTouches(ev).x - position.left;
                locals.offsetY = getTouches(ev).y - position.top;
                swapEvents("on");
                locals.sliding = false;
                locals.targetElement = ev.target || ev.srcElement;
            }
            function dragMove(event) {
                var ev = event.originalEvent || event || window.event, minSwipe, maxSwipe;
                base.newPosX = getTouches(ev).x - locals.offsetX;
                base.newPosY = getTouches(ev).y - locals.offsetY;
                base.newRelativeX = base.newPosX - locals.relativePos;
                if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
                    locals.dragging = true;
                    base.options.startDragging.apply(base, [base.$elem]);
                }
                if ((base.newRelativeX > 8 || base.newRelativeX < -8) && (base.browser.isTouch === true)) {
                    if (ev.preventDefault !== undefined) {
                        ev.preventDefault();
                    } else {
                        ev.returnValue = false;
                    }
                    locals.sliding = true;
                }
                if ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) {
                    $(document).off("touchmove.owl");
                }
                minSwipe = function() {
                    return base.newRelativeX / 5;
                };
                maxSwipe = function() {
                    return base.maximumPixels + base.newRelativeX / 5;
                };
                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());
                if (base.browser.support3d === true) {
                    base.transition3d(base.newPosX);
                } else {
                    base.css2move(base.newPosX);
                }
            }
            function dragEnd(event) {
                var ev = event.originalEvent || event || window.event, newPosition, handlers, owlStopEvent;
                ev.target = ev.target || ev.srcElement;
                locals.dragging = false;
                if (base.browser.isTouch !== true) {
                    base.$owlWrapper.removeClass("grabbing");
                }
                if (base.newRelativeX < 0) {
                    base.dragDirection = base.owl.dragDirection = "left";
                } else {
                    base.dragDirection = base.owl.dragDirection = "right";
                }
                if (base.newRelativeX !== 0) {
                    newPosition = base.getNewPosition();
                    base.goTo(newPosition, false, "drag");
                    if (locals.targetElement === ev.target && base.browser.isTouch !== true) {
                        $(ev.target).on("click.disable", function(ev) {
                            ev.stopImmediatePropagation();
                            ev.stopPropagation();
                            ev.preventDefault();
                            $(ev.target).off("click.disable");
                        });
                        handlers = $._data(ev.target, "events").click;
                        owlStopEvent = handlers.pop();
                        handlers.splice(0, 0, owlStopEvent);
                    }
                }
                swapEvents("off");
            }
            base.$elem.on(base.ev_types.start, ".owl-wrapper", dragStart);
        }, getNewPosition: function() {
            var base = this, newPosition = base.closestItem();
            if (newPosition > base.maximumItem) {
                base.currentItem = base.maximumItem;
                newPosition = base.maximumItem;
            } else if (base.newPosX >= 0) {
                newPosition = 0;
                base.currentItem = 0;
            }
            return newPosition;
        }, closestItem: function() {
            var base = this, array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray, goal = base.newPosX, closest = null;
            $.each(array, function(i, v) {
                if (goal - (base.itemWidth / 20) > array[i + 1] && goal - (base.itemWidth / 20) < v && base.moveDirection() === "left") {
                    closest = v;
                    if (base.options.scrollPerPage === true) {
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {
                        base.currentItem = i;
                    }
                } else if (goal + (base.itemWidth / 20) < v && goal + (base.itemWidth / 20) > (array[i + 1] || array[i] - base.itemWidth) && base.moveDirection() === "right") {
                    if (base.options.scrollPerPage === true) {
                        closest = array[i + 1] || array[array.length - 1];
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {
                        closest = array[i + 1];
                        base.currentItem = i + 1;
                    }
                }
            });
            return base.currentItem;
        }, moveDirection: function() {
            var base = this, direction;
            if (base.newRelativeX < 0) {
                direction = "right";
                base.playDirection = "next";
            } else {
                direction = "left";
                base.playDirection = "prev";
            }
            return direction;
        }, customEvents: function() {
            var base = this;
            base.$elem.on("owl.next", function() {
                base.next();
            });
            base.$elem.on("owl.prev", function() {
                base.prev();
            });
            base.$elem.on("owl.play", function(event, speed) {
                base.options.autoPlay = speed;
                base.play();
                base.hoverStatus = "play";
            });
            base.$elem.on("owl.stop", function() {
                base.stop();
                base.hoverStatus = "stop";
            });
            base.$elem.on("owl.goTo", function(event, item) {
                base.goTo(item);
            });
            base.$elem.on("owl.jumpTo", function(event, item) {
                base.jumpTo(item);
            });
        }, stopOnHover: function() {
            var base = this;
            if (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) {
                base.$elem.on("mouseover", function() {
                    base.stop();
                });
                base.$elem.on("mouseout", function() {
                    if (base.hoverStatus !== "stop") {
                        base.play();
                    }
                });
            }
        }, lazyLoad: function() {
            var base = this, i, $item, itemNumber, $lazyImg, follow;
            if (base.options.lazyLoad === false) {
                return false;
            }
            for (i = 0; i < base.itemsAmount; i += 1) {
                $item = $(base.$owlItems[i]);
                if ($item.data("owl-loaded") === "loaded") {
                    continue;
                }
                itemNumber = $item.data("owl-item");
                $lazyImg = $item.find(".lazyOwl");
                if (typeof $lazyImg.data("src") !== "string") {
                    $item.data("owl-loaded", "loaded");
                    continue;
                }
                if ($item.data("owl-loaded") === undefined) {
                    $lazyImg.hide();
                    $item.addClass("loading").data("owl-loaded", "checked");
                }
                if (base.options.lazyFollow === true) {
                    follow = itemNumber >= base.currentItem;
                } else {
                    follow = true;
                }
                if (follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length) {
                    base.lazyPreload($item, $lazyImg);
                }
            }
        }, lazyPreload: function($item, $lazyImg) {
            var base = this, iterations = 0, isBackgroundImg;
            if ($lazyImg.prop("tagName") === "DIV") {
                $lazyImg.css("background-image", "url(" + $lazyImg.data("src") + ")");
                isBackgroundImg = true;
            } else {
                if ($lazyImg.hasClass('replace-2x') && typeof st_retina !== 'undefined' && st_retina && isRetina()) {
                    var src = $lazyImg.data("src");
                    if ($lazyImg.data('2x'))
                        src_2x = $lazyImg.data('2x');
                    else
                        src_2x = src.replace(/\/(\d+)\-(\w+)\_default([\.\/])/i, "/$1-$2_default_2x$3");
                    if (src_2x != src)
                    {
                        var retina_image = new Image();
                        retina_image.setAttribute('rel', src_2x);
                        retina_image.onload = (function() {
                            if (this.height != 0)
                                $lazyImg[0].src = this.getAttribute('rel');
                        });
                        retina_image.src = src_2x;
                    }
                }
                if (!$lazyImg[0].src)
                    $lazyImg[0].src = $lazyImg.data("src");
            }
            function showImage() {
                $item.data("owl-loaded", "loaded").removeClass("loading");
                $lazyImg.removeAttr("data-src");
                if (base.options.lazyEffect === "fade") {
                    $lazyImg.fadeIn(400);
                } else {
                    $lazyImg.show();
                }
                if (typeof base.options.afterLazyLoad === "function") {
                    base.options.afterLazyLoad.apply(this, [base.$elem]);
                }
            }
            function checkLazyImage() {
                iterations += 1;
                if (base.completeImg($lazyImg.get(0)) || isBackgroundImg === true) {
                    showImage();
                } else if (iterations <= 100) {
                    window.setTimeout(checkLazyImage, 100);
                } else {
                    showImage();
                }
            }
            checkLazyImage();
        }, autoHeight: function() {
            var base = this, $currentimg = $(base.$owlItems[base.currentItem]).find("img"), iterations;
            function addHeight() {
                var $currentItem = $(base.$owlItems[base.currentItem]).height();
                base.wrapperOuter.css("height", $currentItem + "px");
                if (!base.wrapperOuter.hasClass("autoHeight")) {
                    window.setTimeout(function() {
                        base.wrapperOuter.addClass("autoHeight");
                    }, 0);
                }
            }
            function checkImage() {
                iterations += 1;
                if (base.completeImg($currentimg.get(0))) {
                    addHeight();
                } else if (iterations <= 100) {
                    window.setTimeout(checkImage, 100);
                } else {
                    base.wrapperOuter.css("height", "");
                }
            }
            if ($currentimg.get(0) !== undefined) {
                iterations = 0;
                checkImage();
            } else {
                addHeight();
            }
        }, completeImg: function(img) {
            var naturalWidthType;
            if (!img.complete) {
                return false;
            }
            naturalWidthType = typeof img.naturalWidth;
            if (naturalWidthType !== "undefined" && img.naturalWidth === 0) {
                return false;
            }
            return true;
        }, onVisibleItems: function() {
            var base = this, i;
            if (base.options.addClassActive === true) {
                base.$owlItems.removeClass("active");
            }
            base.visibleItems = [];
            for (i = base.currentItem; i < base.currentItem + base.options.items; i += 1) {
                base.visibleItems.push(i);
                if (base.options.addClassActive === true) {
                    $(base.$owlItems[i]).addClass("active");
                }
            }
            base.owl.visibleItems = base.visibleItems;
        }, transitionTypes: function(className) {
            var base = this;
            base.outClass = "owl-" + className + "-out";
            base.inClass = "owl-" + className + "-in";
        }, singleItemTransition: function() {
            var base = this, outClass = base.outClass, inClass = base.inClass, $currentItem = base.$owlItems.eq(base.currentItem), $prevItem = base.$owlItems.eq(base.prevItem), prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem], origin = Math.abs(base.positionsInArray[base.currentItem]) + base.itemWidth / 2, animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';
            base.isTransition = true;
            base.$owlWrapper.addClass('owl-origin').css({"-webkit-transform-origin": origin + "px", "-moz-perspective-origin": origin + "px", "perspective-origin": origin + "px"});
            function transStyles(prevPos) {
                return{"position": "relative", "left": prevPos + "px"};
            }
            $prevItem.css(transStyles(prevPos, 10)).addClass(outClass).on(animEnd, function() {
                base.endPrev = true;
                $prevItem.off(animEnd);
                base.clearTransStyle($prevItem, outClass);
            });
            $currentItem.addClass(inClass).on(animEnd, function() {
                base.endCurrent = true;
                $currentItem.off(animEnd);
                base.clearTransStyle($currentItem, inClass);
            });
        }, clearTransStyle: function(item, classToRemove) {
            var base = this;
            item.css({"position": "", "left": ""}).removeClass(classToRemove);
            if (base.endPrev && base.endCurrent) {
                base.$owlWrapper.removeClass('owl-origin');
                base.endPrev = false;
                base.endCurrent = false;
                base.isTransition = false;
            }
        }, owlStatus: function() {
            var base = this;
            base.owl = {"userOptions": base.userOptions, "baseElement": base.$elem, "userItems": base.$userItems, "owlItems": base.$owlItems, "currentItem": base.currentItem, "prevItem": base.prevItem, "visibleItems": base.visibleItems, "isTouch": base.browser.isTouch, "browser": base.browser, "dragDirection": base.dragDirection};
        }, clearEvents: function() {
            var base = this;
            base.$elem.off(".owl owl mousedown.disableTextSelect");
            $(document).off(".owl owl");
            $(window).off("resize", base.resizer);
        }, unWrap: function() {
            var base = this;
            if (base.$elem.children().length !== 0) {
                base.$owlWrapper.unwrap();
                base.$userItems.unwrap().unwrap();
                if (base.owlControls) {
                    base.owlControls.remove();
                }
            }
            base.clearEvents();
            base.$elem.attr("style", base.$elem.data("owl-originalStyles") || "").attr("class", base.$elem.data("owl-originalClasses"));
        }, destroy: function() {
            var base = this;
            base.stop();
            window.clearInterval(base.checkVisible);
            base.unWrap();
            base.$elem.removeData();
        }, reinit: function(newOptions) {
            var base = this, options = $.extend({}, base.userOptions, newOptions);
            base.unWrap();
            base.init(options, base.$elem);
        }, addItem: function(htmlString, targetPosition) {
            var base = this, position;
            if (!htmlString) {
                return false;
            }
            if (base.$elem.children().length === 0) {
                base.$elem.append(htmlString);
                base.setVars();
                return false;
            }
            base.unWrap();
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }
            if (position >= base.$userItems.length || position === -1) {
                base.$userItems.eq(-1).after(htmlString);
            } else {
                base.$userItems.eq(position).before(htmlString);
            }
            base.setVars();
        }, removeItem: function(targetPosition) {
            var base = this, position;
            if (base.$elem.children().length === 0) {
                return false;
            }
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }
            base.unWrap();
            base.$userItems.eq(position).remove();
            base.setVars();
        }};
    $.fn.owlCarousel = function(options) {
        return this.each(function() {
            if ($(this).data("owl-init") === true) {
                return false;
            }
            $(this).data("owl-init", true);
            var carousel = Object.create(Carousel);
            carousel.init(options, this);
            $.data(this, "owlCarousel", carousel);
        });
    };
    $.fn.owlCarousel.options = {items: 5, itemsCustom: false, itemsDesktop: [1199, 4], itemsDesktopSmall: [979, 3], itemsTablet: [748, 2], itemsTabletSmall: false, itemsMobile: [479, 1], singleItem: false, itemsScaleUp: false, slideSpeed: 200, paginationSpeed: 800, rewindSpeed: 1000, autoPlay: false, stopOnHover: false, navigation: false, navigationText: ["<i class='icon-left-open-3'></i>", "<i class='icon-right-open-3'></i>"], rewindNav: true, scrollPerPage: false, pagination: true, paginationNumbers: false, responsive: true, responsiveRefreshRate: 200, responsiveBaseWidth: window, baseClass: "owl-carousel", theme: "owl-theme", lazyLoad: false, lazyFollow: true, lazyEffect: "fade", autoHeight: false, jsonPath: false, jsonSuccess: false, dragBeforeAnimFinish: true, mouseDrag: true, touchDrag: true, addClassActive: false, transitionStyle: false, beforeUpdate: false, afterUpdate: false, beforeInit: false, afterInit: false, beforeMove: false, afterMove: false, afterAction: false, startDragging: false, afterLazyLoad: false};
}(jQuery, window, document));
;
(function($) {
    var $window = $(window);
    var windowHeight = $window.height();
    var windowWidth = $window.width();
    $window.resize(function() {
        windowHeight = $window.height();
        windowWidth = $window.width();
    });
    $.fn.parallax = function(xpos, speedFactor, outerHeight) {
        var $this = $(this);
        var getHeight;
        var firstTop;
        var paddingTop = 0;
        $this.each(function() {
            firstTop = $this.offset().top;
        });
        if (outerHeight) {
            getHeight = function(jqo) {
                return jqo.outerHeight(true);
            };
        } else {
            getHeight = function(jqo) {
                return jqo.height();
            };
        }
        if (arguments.length < 1 || xpos === null)
            xpos = "50%";
        if (arguments.length < 2 || speedFactor === null)
            speedFactor = 0.1;
        if (arguments.length < 3 || outerHeight === null)
            outerHeight = true;
        function update() {
            if (windowWidth < 768)
                return false;
            var pos = $window.scrollTop();
            $this.each(function() {
                var $element = $(this);
                var top = $element.offset().top;
                var height = getHeight($element);
                if (top + height < pos || top > pos + windowHeight) {
                    return;
                }
                $this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
            });
        }
        $window.bind('scroll', update).resize(update);
        update();
    };
})(jQuery);
function initParallax() {
    if ($(".parallax_box").length) {
        $(".parallax_box").each(function() {
            var e = $(this).data("speed") * .4;
            $(this).parallax("50%", e);
        });
    }
}

(function($) {
    $.fn.hoverIntent = function(f, g) {
        var cfg = {sensitivity: 7, interval: 100, timeout: 0};
        cfg = $.extend(cfg, g ? {over: f, out: g} : f);
        var cX, cY, pX, pY;
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };
        var compare = function(ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) {
                $(ob).unbind("mousemove", track);
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob, [ev]);
            } else {
                pX = cX;
                pY = cY;
                ob.hoverIntent_t = setTimeout(function() {
                    compare(ev, ob);
                }, cfg.interval);
            }
        };
        var delay = function(ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob, [ev]);
        };
        var handleHover = function(e) {
            var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
            while (p && p != this) {
                try {
                    p = p.parentNode;
                } catch (e) {
                    p = this;
                }
            }
            if (p == this) {
                return false;
            }
            var ev = jQuery.extend({}, e);
            var ob = this;
            if (ob.hoverIntent_t) {
                ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            }
            if (e.type == "mouseover") {
                pX = ev.pageX;
                pY = ev.pageY;
                $(ob).bind("mousemove", track);
                if (ob.hoverIntent_s != 1) {
                    ob.hoverIntent_t = setTimeout(function() {
                        compare(ev, ob);
                    }, cfg.interval);
                }
            } else {
                $(ob).unbind("mousemove", track);
                if (ob.hoverIntent_s == 1) {
                    ob.hoverIntent_t = setTimeout(function() {
                        delay(ev, ob);
                    }, cfg.timeout);
                }
            }
        };
        return this.mouseover(handleHover).mouseout(handleHover);
    };
})(jQuery);/*
 * iosSlider - http://iosscripts.com/iosslider/
 * 
 * Touch Enabled, Responsive jQuery Horizontal Content Slider/Carousel/Image Gallery Plugin
 *
 * A jQuery plugin which allows you to integrate a customizable, cross-browser 
 * content slider into your web presence. Designed for use as a content slider, carousel, 
 * scrolling website banner, or image gallery.
 * 
 * Copyright (c) 2013 Marc Whitbread
 * 
 * Version: v1.3.19 (11/17/2013)
 * Minimum requirements: jQuery v1.4+
 *
 * Advanced requirements:
 * 1) jQuery bind() click event override on slide requires jQuery v1.6+
 *
 * Terms of use:
 *
 * 1) iosSlider is licensed under the Creative Commons â€“ Attribution-NonCommercial 3.0 License.
 * 2) You may use iosSlider free for personal or non-profit purposes, without restriction.
 *	  Attribution is not required but always appreciated. For commercial projects, you
 *	  must purchase a license. You may download and play with the script before deciding to
 *	  fully implement it in your project. Making sure you are satisfied, and knowing iosSlider
 *	  is the right script for your project is paramount.
 * 3) You are not permitted to make the resources found on iosscripts.com available for
 *    distribution elsewhere "as is" without prior consent. If you would like to feature
 *    iosSlider on your site, please do not link directly to the resource zip files. Please
 *    link to the appropriate page on iosscripts.com where users can find the download.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

(function(a) {
    var na = 0, W = 0, ea = 0, T = 0, Aa = "ontouchstart"in window, Ba = "onorientationchange"in window, fa = !1, aa = !1, X = !1, oa = !1, ia = !1, ga = "pointer", sa = "pointer", ja = [], J = [], ta = [], $ = [], z = [], ba = [], B = [], m = [], s = [], ua = [], ca = [], e = {showScrollbar: function(b, e) {
            b.scrollbarHide && a("." + e).css({opacity: b.scrollbarOpacity, filter: "alpha(opacity:" + 100 * b.scrollbarOpacity + ")"})
        }, hideScrollbar: function(a, g, c, f, h, d, m, s, B, z) {
            if (a.scrollbar && a.scrollbarHide)
                for (var t = c; t < c + 25; t++)
                    g[g.length] = e.hideScrollbarIntervalTimer(10 * t, f[c], (c + 24 - t) / 24, h, d, m, s, B, z, a)
        }, hideScrollbarInterval: function(b, g, c, f, h, d, m, B, z) {
            T = -1 * b / s[B] * (h - d - m - f);
            e.setSliderOffset("." + c, T);
            a("." + c).css({opacity: z.scrollbarOpacity * g, filter: "alpha(opacity:" + z.scrollbarOpacity * g * 100 + ")"})
        }, slowScrollHorizontalInterval: function(b, g, c, f, h, d, N, O, L, K, t, w, x, y, v, q, G, p, n) {
            if (n.infiniteSlider) {
                if (c <= -1 * s[q]) {
                    var r = a(b).width();
                    if (c <= -1 * ua[q]) {
                        var u = -1 * t[0];
                        a(g).each(function(c) {
                            e.setSliderOffset(a(g)[c], u + G);
                            c < w.length && (w[c] = -1 * u);
                            u += v[c]
                        });
                        c += -1 * w[0];
                        m[q] = -1 * w[0] + G;
                        s[q] = m[q] + r - d;
                        B[q] = 0
                    } else {
                        var k = 0, D = e.getSliderOffset(a(g[0]), "x");
                        a(g).each(function(a) {
                            e.getSliderOffset(this, "x") < D && (D = e.getSliderOffset(this, "x"), k = a)
                        });
                        x = m[q] + r;
                        e.setSliderOffset(a(g)[k], x);
                        m[q] = -1 * w[1] + G;
                        s[q] = m[q] + r - d;
                        w.splice(0, 1);
                        w.splice(w.length, 0, -1 * x + G);
                        B[q]++
                    }
                }
                if (c >= -1 * m[q] || 0 <= c) {
                    r = a(b).width();
                    if (0 <= c)
                        for (u = -1 * t[0], a(g).each(function(c) {
                            e.setSliderOffset(a(g)[c], u + G);
                            c < w.length && (w[c] = -1 * u);
                            u += v[c]
                        }), c -= -1 * w[0], m[q] = -1 * w[0] + G, s[q] = m[q] + r - d, B[q] = y; 0 < -1 * w[0] - r + G; ) {
                            var A = 0, I = e.getSliderOffset(a(g[0]), "x");
                            a(g).each(function(a) {
                                e.getSliderOffset(this, "x") > I && (I = e.getSliderOffset(this, "x"), A = a)
                            });
                            x = m[q] - v[A];
                            e.setSliderOffset(a(g)[A], x);
                            w.splice(0, 0, -1 * x + G);
                            w.splice(w.length - 1, 1);
                            m[q] = -1 * w[0] + G;
                            s[q] = m[q] + r - d;
                            B[q]--;
                            z[q]++
                        }
                    0 > c && (A = 0, I = e.getSliderOffset(a(g[0]), "x"), a(g).each(function(a) {
                        e.getSliderOffset(this, "x") > I && (I = e.getSliderOffset(this, "x"), A = a)
                    }), x = m[q] - v[A], e.setSliderOffset(a(g)[A], x), w.splice(0, 0, -1 * x + G), w.splice(w.length - 1, 1), m[q] = -1 * w[0] + G, s[q] = m[q] + r - d, B[q]--)
                }
            }
            t = !1;
            d = e.calcActiveOffset(n, c, w, d, B[q], y, K, q);
            x = (d + B[q] + y) % y;
            n.infiniteSlider ? x != ba[q] && (t = !0) : d != z[q] && (t = !0);
            if (t && (y = new e.args("change", n, b, a(b).children(":eq(" + x + ")"), x, p), a(b).parent().data("args", y), "" != n.onSlideChange))
                n.onSlideChange(y);
            z[q] = d;
            ba[q] = x;
            c = Math.floor(c);
            e.setSliderOffset(b, c);
            n.scrollbar && (T = Math.floor((-1 * c - m[q] + G) / (s[q] - m[q] + G) * (N - O - h)), b = h - L, c >= -1 * m[q] + G ? (b = h - L - -1 * T, e.setSliderOffset(a("." + f), 0)) : (c <= -1 * s[q] + 1 && (b = N - O - L - T), e.setSliderOffset(a("." + f), T)), a("." + f).css({width: b + "px"}))
        }, slowScrollHorizontal: function(b, g, c, f, h, d, N, O, L, K, t, w, x, y, v, q, G, p, n, r, u) {
            var k = e.getSliderOffset(b, "x");
            d = [];
            var D = 0, A = 25 / 1024 * O;
            frictionCoefficient = u.frictionCoefficient;
            elasticFrictionCoefficient = u.elasticFrictionCoefficient;
            snapFrictionCoefficient = u.snapFrictionCoefficient;
            h > u.snapVelocityThreshold && u.snapToChildren && !n ? D = 1 : h < -1 * u.snapVelocityThreshold && u.snapToChildren && !n && (D = -1);
            h < -1 * A ? h = -1 * A : h > A && (h = A);
            a(b)[0] !== a(p)[0] && (D *= -1, h *= -2);
            p = B[v];
            if (u.infiniteSlider)
                var I = m[v], l = s[v];
            n = [];
            for (var A = [], E = 0; E < x.length; E++)
                n[E] = x[E], E < g.length && (A[E] = e.getSliderOffset(a(g[E]), "x"));
            for (; 1 < h || -1 > h; ) {
                h *= frictionCoefficient;
                k += h;
                (k > -1 * m[v] || k < -1 * s[v]) && !u.infiniteSlider && (h *= elasticFrictionCoefficient, k += h);
                if (u.infiniteSlider) {
                    if (k <= -1 * l) {
                        for (var l = a(b).width(), J = 0, P = A[0], E = 0; E < A.length; E++)
                            A[E] < P && (P = A[E], J = E);
                        E = I + l;
                        A[J] = E;
                        I = -1 * n[1] + r;
                        l = I + l - O;
                        n.splice(0, 1);
                        n.splice(n.length, 0, -1 * E + r);
                        p++
                    }
                    if (k >= -1 * I) {
                        l = a(b).width();
                        J = 0;
                        P = A[0];
                        for (E = 0; E < A.length; E++)
                            A[E] > P && (P = A[E], J = E);
                        E = I - y[J];
                        A[J] = E;
                        n.splice(0, 0, -1 * E + r);
                        n.splice(n.length - 1, 1);
                        I = -1 * n[0] + r;
                        l = I + l - O;
                        p--
                    }
                }
                d[d.length] = k
            }
            A = !1;
            h = e.calcActiveOffset(u, k, n, O, p, G, z[v], v);
            I = (h + p + G) % G;
            u.snapToChildren && (u.infiniteSlider ? I != ba[v] && (A = !0) : h != z[v] && (A = !0), 0 > D && !A ? (h++, h >= x.length && !u.infiniteSlider && (h = x.length - 1)) : 0 < D && !A && (h--, 0 > h && !u.infiniteSlider && (h = 0)));
            if (u.snapToChildren || (k > -1 * m[v] || k < -1 * s[v]) && !u.infiniteSlider) {
                (k > -1 * m[v] || k < -1 * s[v]) && !u.infiniteSlider ? d.splice(0, d.length) : (d.splice(0.1 * d.length, d.length), k = 0 < d.length ? d[d.length - 1] : k);
                for (; k < n[h] - 0.5 || k > n[h] + 0.5; )
                    k = (k - n[h]) * snapFrictionCoefficient + n[h], d[d.length] = k;
                d[d.length] = n[h]
            }
            D = 1;
            0 != d.length % 2 && (D = 0);
            for (k = 0; k < c.length; k++)
                clearTimeout(c[k]);
            p = (h + p + G) % G;
            I = 0;
            for (k = D; k < d.length; k += 2)
                if (k == D || 1 < Math.abs(d[k] - I) || k >= d.length - 2)
                    I = d[k], c[c.length] = e.slowScrollHorizontalIntervalTimer(10 * k, b, g, d[k], f, N, O, L, K, t, h, w, x, q, G, y, v, r, p, u);
            I = (h + B[v] + G) % G;
            "" != u.onSlideComplete && 1 < d.length && (c[c.length] = e.onSlideCompleteTimer(10 * (k + 1), u, b, a(b).children(":eq(" + I + ")"), p, v));
            $[v] = c;
            e.hideScrollbar(u, c, k, d, f, N, O, K, t, v)
        }, onSlideComplete: function(b, g, c, f, h) {
            c = new e.args("complete", b, a(g), c, f, f);
            a(g).parent().data("args", c);
            if ("" != b.onSlideComplete)
                b.onSlideComplete(c)
        }, getSliderOffset: function(b, e) {
            var c = 0;
            e = "x" == e ? 4 : 5;
            if (!fa || aa || X)
                c = parseInt(a(b).css("left"), 10);
            else {
                for (var c = ["-webkit-transform", "-moz-transform", "transform"], f, h = 0; h < c.length; h++)
                    if (void 0 != a(b).css(c[h]) && 0 < a(b).css(c[h]).length) {
                        f = a(b).css(c[h]).split(",");
                        break
                    }
                c = void 0 == f[e] ? 0 : parseInt(f[e], 10)
            }
            return c
        }, setSliderOffset: function(b, e) {
            e = parseInt(e, 10);
            !fa || aa || X ? a(b).css({left: e + "px"}) : a(b).css({webkitTransform: "matrix(1,0,0,1," + e + ",0)", MozTransform: "matrix(1,0,0,1," + e + ",0)", transform: "matrix(1,0,0,1," + e + ",0)"})
        }, setBrowserInfo: function() {
            null != navigator.userAgent.match("WebKit") ? (ga = "-webkit-grab", sa = "-webkit-grabbing") : null != navigator.userAgent.match("Gecko") ? (ia = !0, ga = "move", sa = "-moz-grabbing") : null != navigator.userAgent.match("MSIE 7") ? oa = aa = !0 : null != navigator.userAgent.match("MSIE 8") ? oa = X = !0 : null != navigator.userAgent.match("MSIE 9") && (oa = !0)
        }, has3DTransform: function() {
            var b = !1, e = a("<div />").css({webkitTransform: "matrix(1,1,1,1,1,1)", MozTransform: "matrix(1,1,1,1,1,1)", transform: "matrix(1,1,1,1,1,1)"});
            "" == e.attr("style") ? b = !1 : ia && 21 <= parseInt(navigator.userAgent.split("/")[3], 10) ? b = !1 : void 0 != e.attr("style") && (b = !0);
            return b
        }, getSlideNumber: function(a, e, c) {
            return(a - B[e] + c) % c
        }, calcActiveOffset: function(a, e, c, f, h, d, m, s) {
            h = !1;
            a = [];
            var z;
            e > c[0] && (z = 0);
            e < c[c.length - 1] && (z = d - 1);
            for (d = 0; d < c.length; d++)
                c[d] <= e && c[d] > e - f && (h || c[d] == e || (a[a.length] = c[d - 1]), a[a.length] = c[d], h = !0);
            0 == a.length && (a[0] = c[c.length - 1]);
            for (d = h = 0; d < a.length; d++)
                m = Math.abs(e - a[d]), m < f && (h = a[d], f = m);
            for (d = 0; d < c.length; d++)
                h == c[d] && (z = d);
            return z
        }, changeSlide: function(b, g, c, f, h, d, m, s, L, K, t, w, x, y, v, q, G, p) {
            e.autoSlidePause(y);
            for (var n = 0; n < f.length; n++)
                clearTimeout(f[n]);
            var r = Math.ceil(p.autoSlideTransTimer / 10) + 1, u = e.getSliderOffset(g, "x"), k = w[b], D = k - u;
            if (p.infiniteSlider)
                for (b = (b - B[y] + 2 * q) % q, n = !1, 0 == b && 2 == q && (b = q, w[b] = w[b - 1] - a(c).eq(0).outerWidth(!0), n = !0), k = w[b], D = k - u, k = [w[b] - a(g).width(), w[b] + a(g).width()], n && w.splice(w.length - 1, 1), n = 0; n < k.length; n++)
                    Math.abs(k[n] - u) < Math.abs(D) && (D = k[n] - u);
            var k = [], A;
            e.showScrollbar(p, h);
            for (n = 0; n <= r; n++)
                A = n, A /= r, A--, A = u + D * (Math.pow(A, 5) + 1), k[k.length] = A;
            r = (b + B[y] + q) % q;
            for (n = u = 0; n < k.length; n++) {
                if (0 == n || 1 < Math.abs(k[n] - u) || n >= k.length - 2)
                    u = k[n], f[n] = e.slowScrollHorizontalIntervalTimer(10 * (n + 1), g, c, k[n], h, d, m, s, L, K, b, t, w, v, q, x, y, G, r, p);
                0 == n && "" != p.onSlideStart && (D = (z[y] + B[y] + q) % q, p.onSlideStart(new e.args("start", p, g, a(g).children(":eq(" + D + ")"), D, b)))
            }
            u = !1;
            p.infiniteSlider ? r != ba[y] && (u = !0) : b != z[y] && (u = !0);
            u && "" != p.onSlideComplete && (f[f.length] = e.onSlideCompleteTimer(10 * (n + 1), p, g, a(g).children(":eq(" + r + ")"), r, y));
            $[y] = f;
            e.hideScrollbar(p, f, n, k, h, d, m, L, K, y);
            e.autoSlide(g, c, f, h, d, m, s, L, K, t, w, x, y, v, q, G, p)
        }, autoSlide: function(a, g, c, f, h, d, m, s, L, K, t, w, x, y, v, q, G) {
            if (!J[x].autoSlide)
                return!1;
            e.autoSlidePause(x);
            ja[x] = setTimeout(function() {
                !G.infiniteSlider && z[x] > t.length - 1 && (z[x] -= v);
                e.changeSlide((z[x] + B[x] + t.length + 1) % t.length, a, g, c, f, h, d, m, s, L, K, t, w, x, y, v, q, G);
                e.autoSlide(a, g, c, f, h, d, m, s, L, K, t, w, x, y, v, q, G)
            }, G.autoSlideTimer + G.autoSlideTransTimer)
        }, autoSlidePause: function(a) {
            clearTimeout(ja[a])
        }, isUnselectable: function(b, e) {
            return"" != e.unselectableSelector && 1 == a(b).closest(e.unselectableSelector).length ? !0 : !1
        }, slowScrollHorizontalIntervalTimer: function(a, g, c, f, h, d, m, s, z, B, t, w, x, y, v, q, G, p, n, r) {
            return setTimeout(function() {
                e.slowScrollHorizontalInterval(g, c, f, h, d, m, s, z, B, t, w, x, y, v, q, G, p, n, r)
            }, a)
        }, onSlideCompleteTimer: function(a, g, c, f, h, d) {
            return setTimeout(function() {
                e.onSlideComplete(g, c, f, h, d)
            }, a)
        }, hideScrollbarIntervalTimer: function(a, g, c, f, h, d, m, s, z, B) {
            return setTimeout(function() {
                e.hideScrollbarInterval(g, c, f, h, d, m, s, z, B)
            }, a)
        }, args: function(b, g, c, f, h, d) {
            this.prevSlideNumber = void 0 == a(c).parent().data("args") ? void 0 : a(c).parent().data("args").prevSlideNumber;
            this.prevSlideObject = void 0 == a(c).parent().data("args") ? void 0 : a(c).parent().data("args").prevSlideObject;
            this.targetSlideNumber = d + 1;
            this.targetSlideObject = a(c).children(":eq(" + d + ")");
            this.slideChanged = !1;
            "load" == b ? this.targetSlideObject = this.targetSlideNumber = void 0 : "start" == b ? this.targetSlideObject = this.targetSlideNumber = void 0 : "change" == b ? (this.slideChanged = !0, this.prevSlideNumber = void 0 == a(c).parent().data("args") ? g.startAtSlide : a(c).parent().data("args").currentSlideNumber, this.prevSlideObject = a(c).children(":eq(" + this.prevSlideNumber + ")")) : "complete" == b && (this.slideChanged = a(c).parent().data("args").slideChanged);
            this.settings = g;
            this.data = a(c).parent().data("iosslider");
            this.sliderObject = c;
            this.sliderContainerObject = a(c).parent();
            this.currentSlideObject = f;
            this.currentSlideNumber = h + 1;
            this.currentSliderOffset = -1 * e.getSliderOffset(c, "x")
        }, preventDrag: function(a) {
            a.preventDefault()
        }, preventClick: function(a) {
            a.stopImmediatePropagation();
            return!1
        }, enableClick: function() {
            return!0
        }};
    e.setBrowserInfo();
    var V = {init: function(b, g) {
            fa = e.has3DTransform();
            var c = a.extend(!0, {elasticPullResistance: 0.6, frictionCoefficient: 0.92, elasticFrictionCoefficient: 0.6, snapFrictionCoefficient: 0.92, snapToChildren: !1, snapSlideCenter: !1, startAtSlide: 1, scrollbar: !1, scrollbarDrag: !1, scrollbarHide: !0, scrollbarLocation: "top", scrollbarContainer: "", scrollbarOpacity: 0.4, scrollbarHeight: "4px", scrollbarBorder: "0", scrollbarMargin: "5px", scrollbarBackground: "#000", scrollbarBorderRadius: "100px", scrollbarShadow: "0 0 0 #000", scrollbarElasticPullResistance: 0.9, desktopClickDrag: !1, keyboardControls: !1, tabToAdvance: !1, responsiveSlideContainer: !0, responsiveSlides: !0, navSlideSelector: "", navPrevSelector: "", navNextSelector: "", autoSlideToggleSelector: "", autoSlide: !1, autoSlideTimer: 5E3, autoSlideTransTimer: 750, autoSlideHoverPause: !0, infiniteSlider: !1, snapVelocityThreshold: 5, slideStartVelocityThreshold: 0, horizontalSlideLockThreshold: 5, verticalSlideLockThreshold: 3, stageCSS: {position: "relative", top: "0", left: "0", overflow: "hidden", zIndex: 1}, unselectableSelector: "", onSliderLoaded: "", onSliderUpdate: "", onSliderResize: "", onSlideStart: "", onSlideChange: "", onSlideComplete: ""}, b);
            void 0 == g && (g = this);
            return a(g).each(function(b) {
                function g() {
                    e.autoSlidePause(d);
                    va = a(F).find("a");
                    ja = a(F).find("[onclick]");
                    pa = a(F).find("*");
                    a(n).css("width", "");
                    a(n).css("height", "");
                    a(F).css("width", "");
                    C = a(F).children().not("script").get();
                    ha = [];
                    M = [];
                    c.responsiveSlides && a(C).css("width", "");
                    s[d] = 0;
                    l = [];
                    q = a(n).parent().width();
                    r = a(n).outerWidth(!0);
                    c.responsiveSlideContainer && (r = a(n).outerWidth(!0) > q ? q : a(n).width());
                    a(n).css({position: c.stageCSS.position, top: c.stageCSS.top, left: c.stageCSS.left, overflow: c.stageCSS.overflow, zIndex: c.stageCSS.zIndex, webkitPerspective: 1E3, webkitBackfaceVisibility: "hidden", msTouchAction: "pan-y", width: r});
                    a(c.unselectableSelector).css({cursor: "default"});
                    for (var b = 0; b < C.length; b++) {
                        ha[b] = a(C[b]).width();
                        M[b] = a(C[b]).outerWidth(!0);
                        var h = M[b];
                        c.responsiveSlides && (M[b] > r ? (h = r + -1 * (M[b] - ha[b]), ha[b] = h, M[b] = r) : h = ha[b], a(C[b]).css({width: h}));
                        a(C[b]).css({webkitBackfaceVisibility: "hidden", overflow: "hidden", position: "absolute"});
                        l[b] = -1 * s[d];
                        s[d] = s[d] + h + (M[b] - ha[b])
                    }
                    c.snapSlideCenter && (p = 0.5 * (r - M[0]), c.responsiveSlides && M[0] > r && (p = 0));
                    ua[d] = 2 * s[d];
                    for (b = 0; b < C.length; b++)
                        e.setSliderOffset(a(C[b]), -1 * l[b] + s[d] + p), l[b] -= s[d];
                    if (!c.infiniteSlider && !c.snapSlideCenter) {
                        for (b = 0; b < l.length && !(l[b] <= - 1 * (2 * s[d] - r)); b++)
                            ia = b;
                        l.splice(ia + 1, l.length);
                        l[l.length] = -1 * (2 * s[d] - r)
                    }
                    for (b = 0; b < l.length; b++)
                        E[b] = l[b];
                    I && (J[d].startAtSlide = J[d].startAtSlide > l.length ? l.length : J[d].startAtSlide, c.infiniteSlider ? (J[d].startAtSlide = (J[d].startAtSlide - 1 + H) % H, z[d] = J[d].startAtSlide) : (J[d].startAtSlide = 0 > J[d].startAtSlide - 1 ? l.length - 1 : J[d].startAtSlide, z[d] = J[d].startAtSlide - 1), ba[d] = z[d]);
                    m[d] = s[d] + p;
                    a(F).css({position: "relative", cursor: ga, webkitPerspective: "0", webkitBackfaceVisibility: "hidden", width: s[d] + "px"});
                    R = s[d];
                    s[d] = 2 * s[d] - r + 2 * p;
                    (Y = R + p < r || 0 == r ? !0 : !1) && a(F).css({cursor: "default"});
                    G = a(n).parent().outerHeight(!0);
                    u = a(n).height();
                    c.responsiveSlideContainer && (u = u > G ? G : u);
                    a(n).css({height: u});
                    e.setSliderOffset(F, l[z[d]]);
                    if (c.infiniteSlider && !Y) {
                        b = e.getSliderOffset(a(F), "x");
                        for (h = (B[d] + H) % H * -1; 0 > h; ) {
                            var f = 0, A = e.getSliderOffset(a(C[0]), "x");
                            a(C).each(function(a) {
                                e.getSliderOffset(this, "x") < A && (A = e.getSliderOffset(this, "x"), f = a)
                            });
                            var L = m[d] + R;
                            e.setSliderOffset(a(C)[f], L);
                            m[d] = -1 * l[1] + p;
                            s[d] = m[d] + R - r;
                            l.splice(0, 1);
                            l.splice(l.length, 0, -1 * L + p);
                            h++
                        }
                        for (; 0 < -1 * l[0] - R + p && c.snapSlideCenter && I; ) {
                            var O = 0, P = e.getSliderOffset(a(C[0]), "x");
                            a(C).each(function(a) {
                                e.getSliderOffset(this, "x") > P && (P = e.getSliderOffset(this, "x"), O = a)
                            });
                            L = m[d] - M[O];
                            e.setSliderOffset(a(C)[O], L);
                            l.splice(0, 0, -1 * L + p);
                            l.splice(l.length - 1, 1);
                            m[d] = -1 * l[0] + p;
                            s[d] = m[d] + R - r;
                            B[d]--;
                            z[d]++
                        }
                        for (; b <= - 1 * s[d]; )
                            f = 0, A = e.getSliderOffset(a(C[0]), "x"), a(C).each(function(a) {
                                e.getSliderOffset(this, "x") < A && (A = e.getSliderOffset(this, "x"), f = a)
                            }), L = m[d] + R, e.setSliderOffset(a(C)[f], L), m[d] = -1 * l[1] + p, s[d] = m[d] + R - r, l.splice(0, 1), l.splice(l.length, 0, -1 * L + p), B[d]++, z[d]--
                    }
                    e.setSliderOffset(F, l[z[d]]);
                    c.desktopClickDrag || a(F).css({cursor: "default"});
                    c.scrollbar && (a("." + K).css({margin: c.scrollbarMargin, overflow: "hidden", display: "none"}), a("." + K + " ." + t).css({border: c.scrollbarBorder}), k = parseInt(a("." + K).css("marginLeft")) + parseInt(a("." + K).css("marginRight")), D = parseInt(a("." + K + " ." + t).css("borderLeftWidth"), 10) + parseInt(a("." + K + " ." + t).css("borderRightWidth"), 10), y = "" != c.scrollbarContainer ? a(c.scrollbarContainer).width() : r, v = r / R * (y - k), c.scrollbarHide || (V = c.scrollbarOpacity), a("." + K).css({position: "absolute", left: 0, width: y - k + "px", margin: c.scrollbarMargin}), "top" == c.scrollbarLocation ? a("." + K).css("top", "0") : a("." + K).css("bottom", "0"), a("." + K + " ." + t).css({borderRadius: c.scrollbarBorderRadius, background: c.scrollbarBackground, height: c.scrollbarHeight, width: v - D + "px", minWidth: c.scrollbarHeight, border: c.scrollbarBorder, webkitPerspective: 1E3, webkitBackfaceVisibility: "hidden", position: "relative", opacity: V, filter: "alpha(opacity:" + 100 * V + ")", boxShadow: c.scrollbarShadow}), e.setSliderOffset(a("." + K + " ." + t), Math.floor((-1 * l[z[d]] - m[d] + p) / (s[d] - m[d] + p) * (y - k - v))), a("." + K).css({display: "block"}), w = a("." + K + " ." + t), x = a("." + K));
                    c.scrollbarDrag && !Y && a("." + K + " ." + t).css({cursor: ga});
                    c.infiniteSlider && (S = (s[d] + r) / 3);
                    "" != c.navSlideSelector && a(c.navSlideSelector).each(function(b) {
                        a(this).css({cursor: "pointer"});
                        a(this).unbind(Q).bind(Q, function(g) {
                            "touchstart" == g.type ? a(this).unbind("click.iosSliderEvent") : a(this).unbind("touchstart.iosSliderEvent");
                            Q = g.type + ".iosSliderEvent";
                            e.changeSlide(b, F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c)
                        })
                    });
                    "" != c.navPrevSelector && (a(c.navPrevSelector).css({cursor: "pointer"}), a(c.navPrevSelector).unbind(Q).bind(Q, function(b) {
                        "touchstart" == b.type ? a(this).unbind("click.iosSliderEvent") : a(this).unbind("touchstart.iosSliderEvent");
                        Q = b.type + ".iosSliderEvent";
                        b = (z[d] + B[d] + H) % H;
                        (0 < b || c.infiniteSlider) && e.changeSlide(b - 1, F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c)
                    }));
                    "" != c.navNextSelector && (a(c.navNextSelector).css({cursor: "pointer"}), a(c.navNextSelector).unbind(Q).bind(Q, function(b) {
                        "touchstart" == b.type ? a(this).unbind("click.iosSliderEvent") : a(this).unbind("touchstart.iosSliderEvent");
                        Q = b.type + ".iosSliderEvent";
                        b = (z[d] + B[d] + H) % H;
                        (b < l.length - 1 || c.infiniteSlider) && e.changeSlide(b + 1, F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c)
                    }));
                    c.autoSlide && !Y && "" != c.autoSlideToggleSelector && (a(c.autoSlideToggleSelector).css({cursor: "pointer"}), a(c.autoSlideToggleSelector).unbind(Q).bind(Q, function(b) {
                        "touchstart" == b.type ? a(this).unbind("click.iosSliderEvent") : a(this).unbind("touchstart.iosSliderEvent");
                        Q = b.type + ".iosSliderEvent";
                        wa ? (e.autoSlide(F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c), wa = !1, a(c.autoSlideToggleSelector).removeClass("on")) : (e.autoSlidePause(d), wa = !0, a(c.autoSlideToggleSelector).addClass("on"))
                    }));
                    e.autoSlide(F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c);
                    a(n).bind("mouseleave.iosSliderEvent", function() {
                        e.autoSlide(F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c)
                    });
                    a(n).bind("touchend.iosSliderEvent", function() {
                        e.autoSlide(F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c)
                    });
                    c.autoSlideHoverPause && a(n).bind("mouseenter.iosSliderEvent", function() {
                        e.autoSlidePause(d)
                    });
                    a(n).data("iosslider", {obj: za, settings: c, scrollerNode: F, slideNodes: C, numberOfSlides: H, centeredSlideOffset: p, sliderNumber: d, originalOffsets: E, childrenOffsets: l, sliderMax: s[d], scrollbarClass: t, scrollbarWidth: v, scrollbarStageWidth: y, stageWidth: r, scrollMargin: k, scrollBorder: D, infiniteSliderOffset: B[d], infiniteSliderWidth: S, slideNodeOuterWidths: M});
                    I = !1;
                    return!0
                }
                na++;
                var d = na, N = [];
                J[d] = a.extend({}, c);
                m[d] = 0;
                s[d] = 0;
                var O = [0, 0], L = [0, 0], K = "scrollbarBlock" + na, t = "scrollbar" + na, w, x, y, v, q, G, p = 0, n = a(this), r, u, k, D, A, I = !0;
                b = -1;
                var l, E = [], V = 0, P = 0, fa = 0, F = a(this).children(":first-child"), C, ha, M, H = a(F).children().not("script").length, U = !1, ia = 0, xa = !1, qa = void 0, S;
                B[d] = 0;
                var Y = !1, wa = !1;
                ta[d] = !1;
                var Z, ra = !1, ka = !1, Q = "touchstart.iosSliderEvent click.iosSliderEvent", R, va, ja, pa;
                ca[d] = !1;
                $[d] = [];
                c.scrollbarDrag && (c.scrollbar = !0, c.scrollbarHide = !1);
                var za = a(this);
                if (void 0 != za.data("iosslider"))
                    return!0;
                a(this).find("img").bind("dragstart.iosSliderEvent", function(a) {
                    a.preventDefault()
                });
                c.infiniteSlider && (c.scrollbar = !1);
                c.infiniteSlider && 1 == H && (c.infiniteSlider = !1);
                c.scrollbar && ("" != c.scrollbarContainer ? a(c.scrollbarContainer).append("<div class = '" + K + "'><div class = '" + t + "'></div></div>") : a(F).parent().append("<div class = '" + K + "'><div class = '" + t + "'></div></div>"));
                if (!g())
                    return!0;
                a(this).find("a").bind("mousedown", e.preventDrag);
                a(this).find("[onclick]").bind("click", e.preventDrag).each(function() {
                    a(this).data("onclick", this.onclick)
                });
                b = e.calcActiveOffset(c, e.getSliderOffset(a(F), "x"), l, r, B[d], H, void 0, d);
                b = (b + B[d] + H) % H;
                b = new e.args("load", c, F, a(F).children(":eq(" + b + ")"), b, b);
                a(n).data("args", b);
                if ("" != c.onSliderLoaded)
                    c.onSliderLoaded(b);
                if (J[d].responsiveSlides || J[d].responsiveSlideContainer)
                    b = Ba ? "orientationchange" : "resize", a(window).bind(b + ".iosSliderEvent-" + d, function() {
                        if (!g())
                            return!0;
                        var b = a(n).data("args");
                        if ("" != c.onSliderResize)
                            c.onSliderResize(b)
                    });
                !c.keyboardControls && !c.tabToAdvance || Y || a(document).bind("keydown.iosSliderEvent", function(a) {
                    aa || X || (a = a.originalEvent);
                    if (37 == a.keyCode && c.keyboardControls)
                        a.preventDefault(), a = (z[d] + B[d] + H) % H, (0 < a || c.infiniteSlider) && e.changeSlide(a - 1, F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c);
                    else if (39 == a.keyCode && c.keyboardControls || 9 == a.keyCode && c.tabToAdvance)
                        a.preventDefault(), a = (z[d] + B[d] + H) % H, (a < l.length - 1 || c.infiniteSlider) && e.changeSlide(a + 1, F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c)
                });
                if (Aa || c.desktopClickDrag) {
                    var da = !1, la = a(F), ma = a(F), ya = !1;
                    c.scrollbarDrag && (la = la.add(w), ma = ma.add(x));
                    a(la).bind("mousedown.iosSliderEvent touchstart.iosSliderEvent", function(b) {
                        if (da)
                            return!0;
                        da = !0;
                        "touchstart" == b.type ? a(ma).unbind("mousedown.iosSliderEvent") : a(ma).unbind("touchstart.iosSliderEvent");
                        if (ca[d] || Y || (ya = e.isUnselectable(b.target, c)))
                            return U = da = !1, !0;
                        Z = a(this)[0] === a(w)[0] ? w : F;
                        aa || X || (b = b.originalEvent);
                        e.autoSlidePause(d);
                        pa.unbind(".disableClick");
                        if ("touchstart" == b.type)
                            eventX = b.touches[0].pageX, eventY = b.touches[0].pageY;
                        else {
                            if (window.getSelection)
                                window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges();
                            else if (document.selection)
                                if (X)
                                    try {
                                        document.selection.empty()
                                    } catch (g) {
                                    }
                                else
                                    document.selection.empty();
                            eventX = b.pageX;
                            eventY = b.pageY;
                            xa = !0;
                            qa = F;
                            a(this).css({cursor: sa})
                        }
                        O = [0, 0];
                        L = [0, 0];
                        W = 0;
                        U = !1;
                        for (b = 0; b < N.length; b++)
                            clearTimeout(N[b]);
                        b = e.getSliderOffset(F, "x");
                        b > -1 * m[d] + p + R ? (b = -1 * m[d] + p + R, e.setSliderOffset(a("." + t), b), a("." + t).css({width: v - D + "px"})) : b < -1 * s[d] && (e.setSliderOffset(a("." + t), y - k - v), a("." + t).css({width: v - D + "px"}));
                        b = a(this)[0] === a(w)[0] ? m[d] : 0;
                        P = -1 * (e.getSliderOffset(this, "x") - eventX - b);
                        e.getSliderOffset(this, "y");
                        O[1] = eventX;
                        L[1] = eventY;
                        ka = !1
                    });
                    a(ma).bind("touchmove.iosSliderEvent mousemove.iosSliderEvent", function(b) {
                        aa || X || (b = b.originalEvent);
                        if (ca[d] || Y || ya)
                            return!0;
                        var g = 0;
                        if ("touchmove" == b.type)
                            eventX = b.touches[0].pageX, eventY = b.touches[0].pageY;
                        else {
                            if (window.getSelection)
                                window.getSelection().empty || window.getSelection().removeAllRanges && window.getSelection().removeAllRanges();
                            else if (document.selection)
                                if (X)
                                    try {
                                        document.selection.empty()
                                    } catch (h) {
                                    }
                                else
                                    document.selection.empty();
                            eventX = b.pageX;
                            eventY = b.pageY;
                            if (!xa || !oa && ("undefined" != typeof b.webkitMovementX || "undefined" != typeof b.webkitMovementY) && 0 === b.webkitMovementY && 0 === b.webkitMovementX)
                                return!0
                        }
                        O[0] = O[1];
                        O[1] = eventX;
                        W = (O[1] - O[0]) / 2;
                        L[0] = L[1];
                        L[1] = eventY;
                        ea = (L[1] - L[0]) / 2;
                        if (!U) {
                            var f = (z[d] + B[d] + H) % H, f = new e.args("start", c, F, a(F).children(":eq(" + f + ")"), f, void 0);
                            a(n).data("args", f);
                            if ("" != c.onSlideStart)
                                c.onSlideStart(f)
                        }
                        (ea > c.verticalSlideLockThreshold || ea < -1 * c.verticalSlideLockThreshold) && "touchmove" == b.type && !U && (ra = !0);
                        (W > c.horizontalSlideLockThreshold || W < -1 * c.horizontalSlideLockThreshold) && "touchmove" == b.type && b.preventDefault();
                        if (W > c.slideStartVelocityThreshold || W < -1 * c.slideStartVelocityThreshold)
                            U = !0;
                        if (U && !ra) {
                            var f = e.getSliderOffset(F, "x"), q = a(Z)[0] === a(w)[0] ? m[d] : p, u = a(Z)[0] === a(w)[0] ? (m[d] - s[d] - p) / (y - k - v) : 1, x = a(Z)[0] === a(w)[0] ? c.scrollbarElasticPullResistance : c.elasticPullResistance, G = c.snapSlideCenter && a(Z)[0] === a(w)[0] ? 0 : p, K = c.snapSlideCenter && a(Z)[0] === a(w)[0] ? p : 0;
                            "touchmove" == b.type && (fa != b.touches.length && (P = -1 * f + eventX), fa = b.touches.length);
                            if (c.infiniteSlider) {
                                if (f <= -1 * s[d]) {
                                    var I = a(F).width();
                                    if (f <= -1 * ua[d]) {
                                        var J = -1 * E[0];
                                        a(C).each(function(b) {
                                            e.setSliderOffset(a(C)[b], J + p);
                                            b < l.length && (l[b] = -1 * J);
                                            J += M[b]
                                        });
                                        P -= -1 * l[0];
                                        m[d] = -1 * l[0] + p;
                                        s[d] = m[d] + I - r;
                                        B[d] = 0
                                    } else {
                                        var N = 0, S = e.getSliderOffset(a(C[0]), "x");
                                        a(C).each(function(a) {
                                            e.getSliderOffset(this, "x") < S && (S = e.getSliderOffset(this, "x"), N = a)
                                        });
                                        x = m[d] + I;
                                        e.setSliderOffset(a(C)[N], x);
                                        m[d] = -1 * l[1] + p;
                                        s[d] = m[d] + I - r;
                                        l.splice(0, 1);
                                        l.splice(l.length, 0, -1 * x + p);
                                        B[d]++
                                    }
                                }
                                if (f >= -1 * m[d] || 0 <= f)
                                    if (I = a(F).width(), 0 <= f)
                                        for (J = -1 * E[0], a(C).each(function(b) {
                                            e.setSliderOffset(a(C)[b], J + p);
                                            b < l.length && (l[b] = -1 * J);
                                            J += M[b]
                                        }), P += -1 * l[0], m[d] = -1 * l[0] + p, s[d] = m[d] + I - r, B[d] = H; 0 < -1 * l[0] - I + p; ) {
                                            var Q = 0, R = e.getSliderOffset(a(C[0]), "x");
                                            a(C).each(function(a) {
                                                e.getSliderOffset(this, "x") > R && (R = e.getSliderOffset(this, "x"), Q = a)
                                            });
                                            x = m[d] - M[Q];
                                            e.setSliderOffset(a(C)[Q], x);
                                            l.splice(0, 0, -1 * x + p);
                                            l.splice(l.length - 1, 1);
                                            m[d] = -1 * l[0] + p;
                                            s[d] = m[d] + I - r;
                                            B[d]--;
                                            z[d]++
                                        }
                                    else
                                        Q = 0, R = e.getSliderOffset(a(C[0]), "x"), a(C).each(function(a) {
                                            e.getSliderOffset(this, "x") > R && (R = e.getSliderOffset(this, "x"), Q = a)
                                        }), x = m[d] - M[Q], e.setSliderOffset(a(C)[Q], x), l.splice(0, 0, -1 * x + p), l.splice(l.length - 1, 1), m[d] = -1 * l[0] + p, s[d] = m[d] + I - r, B[d]--
                            } else
                                I = a(F).width(), f > -1 * m[d] + p && (g = (m[d] + -1 * (P - q - eventX + G) * u - q) * x * -1 / u), f < -1 * s[d] && (g = (s[d] + K + -1 * (P - q - eventX) * u - q) * x * -1 / u);
                            e.setSliderOffset(F, -1 * (P - q - eventX - g) * u - q + K);
                            c.scrollbar && (e.showScrollbar(c, t), T = Math.floor((P - eventX - g - m[d] + G) / (s[d] - m[d] + p) * (y - k - v) * u), f = v, 0 >= T ? (f = v - D - -1 * T, e.setSliderOffset(a("." + t), 0), a("." + t).css({width: f + "px"})) : T >= y - k - D - v ? (f = y - k - D - T, e.setSliderOffset(a("." + t), T), a("." + t).css({width: f + "px"})) : e.setSliderOffset(a("." + t), T));
                            "touchmove" == b.type && (A = b.touches[0].pageX);
                            b = !1;
                            g = e.calcActiveOffset(c, -1 * (P - eventX - g), l, r, B[d], H, void 0, d);
                            f = (g + B[d] + H) % H;
                            c.infiniteSlider ? f != ba[d] && (b = !0) : g != z[d] && (b = !0);
                            if (b && (z[d] = g, ba[d] = f, ka = !0, f = new e.args("change", c, F, a(F).children(":eq(" + f + ")"), f, f), a(n).data("args", f), "" != c.onSlideChange))
                                c.onSlideChange(f)
                        }
                        da = !1
                    });
                    b = a(window);
                    if (X || aa)
                        b = a(document);
                    a(la).bind("touchend.iosSliderEvent", function(a) {
                        a = a.originalEvent;
                        if (ca[d] || Y || ya)
                            return!0;
                        if (0 != a.touches.length)
                            for (var b = 0; b < a.touches.length; b++)
                                a.touches[b].pageX == A && e.slowScrollHorizontal(F, C, N, t, W, ea, v, r, y, k, D, E, l, M, d, S, H, Z, ka, p, c);
                        else
                            e.slowScrollHorizontal(F, C, N, t, W, ea, v, r, y, k, D, E, l, M, d, S, H, Z, ka, p, c);
                        da = ra = !1
                    });
                    a(b).bind("mouseup.iosSliderEvent-" + d, function(b) {
                        U ? va.unbind("click.disableClick").bind("click.disableClick", e.preventClick) : va.unbind("click.disableClick").bind("click.disableClick", e.enableClick);
                        ja.each(function() {
                            this.onclick = function(b) {
                                if (U)
                                    return!1;
                                a(this).data("onclick").call(this, b || window.event)
                            };
                            this.onclick = a(this).data("onclick")
                        });
                        1.8 <= parseFloat(a().jquery) ? pa.each(function() {
                            var b = a._data(this, "events");
                            if (void 0 != b && void 0 != b.click && "iosSliderEvent" != b.click[0].namespace) {
                                if (!U)
                                    return!1;
                                a(this).one("click.disableClick", e.preventClick);
                                var b = a._data(this, "events").click, c = b.pop();
                                b.splice(0, 0, c)
                            }
                        }) : 1.6 <= parseFloat(a().jquery) && pa.each(function() {
                            var b = a(this).data("events");
                            if (void 0 != b && void 0 != b.click && "iosSliderEvent" != b.click[0].namespace) {
                                if (!U)
                                    return!1;
                                a(this).one("click.disableClick", e.preventClick);
                                var b = a(this).data("events").click, c = b.pop();
                                b.splice(0, 0, c)
                            }
                        });
                        if (!ta[d]) {
                            if (Y || ca[d])
                                return!0;
                            a(la).css({cursor: ga});
                            xa = !1;
                            if (void 0 == qa)
                                return!0;
                            e.slowScrollHorizontal(qa, C, N, t, W, ea, v, r, y, k, D, E, l, M, d, S, H, Z, ka, p, c);
                            qa = void 0
                        }
                        da = ra = !1
                    })
                }
            })
        }, destroy: function(b, g) {
            void 0 == g && (g = this);
            return a(g).each(function() {
                var c = a(this), f = c.data("iosslider");
                if (void 0 == f)
                    return!1;
                void 0 == b && (b = !0);
                e.autoSlidePause(f.sliderNumber);
                ta[f.sliderNumber] = !0;
                a(window).unbind(".iosSliderEvent-" + f.sliderNumber);
                a(document).unbind(".iosSliderEvent-" + f.sliderNumber);
                a(document).unbind("keydown.iosSliderEvent");
                a(this).unbind(".iosSliderEvent");
                a(this).children(":first-child").unbind(".iosSliderEvent");
                a(this).children(":first-child").children().unbind(".iosSliderEvent");
                b && (a(this).attr("style", ""), a(this).children(":first-child").attr("style", ""), a(this).children(":first-child").children().attr("style", ""), a(f.settings.navSlideSelector).attr("style", ""), a(f.settings.navPrevSelector).attr("style", ""), a(f.settings.navNextSelector).attr("style", ""), a(f.settings.autoSlideToggleSelector).attr("style", ""), a(f.settings.unselectableSelector).attr("style", ""));
                f.settings.scrollbar && a(".scrollbarBlock" + f.sliderNumber).remove();
                for (var f = $[f.sliderNumber], g = 0; g < f.length; g++)
                    clearTimeout(f[g]);
                c.removeData("iosslider");
                c.removeData("args")
            })
        }, update: function(b) {
            void 0 == b && (b = this);
            return a(b).each(function() {
                var b = a(this), c = b.data("iosslider");
                if (void 0 == c)
                    return!1;
                c.settings.startAtSlide = b.data("args").currentSlideNumber;
                V.destroy(!1, this);
                1 != c.numberOfSlides && c.settings.infiniteSlider && (c.settings.startAtSlide = (z[c.sliderNumber] + 1 + B[c.sliderNumber] + c.numberOfSlides) % c.numberOfSlides);
                V.init(c.settings, this);
                b = new e.args("update", c.settings, c.scrollerNode, a(c.scrollerNode).children(":eq(" + (c.settings.startAtSlide - 1) + ")"), c.settings.startAtSlide - 1, c.settings.startAtSlide - 1);
                a(c.stageNode).data("args", b);
                if ("" != c.settings.onSliderUpdate)
                    c.settings.onSliderUpdate(b)
            })
        }, addSlide: function(b, e) {
            return this.each(function() {
                var c = a(this), f = c.data("iosslider");
                if (void 0 == f)
                    return!1;
                0 == a(f.scrollerNode).children().length ? (a(f.scrollerNode).append(b), c.data("args").currentSlideNumber = 1) : f.settings.infiniteSlider ? (1 == e ? a(f.scrollerNode).children(":eq(0)").before(b) : a(f.scrollerNode).children(":eq(" + (e - 2) + ")").after(b), -1 > B[f.sliderNumber] && z[f.sliderNumber]--, c.data("args").currentSlideNumber >= e && z[f.sliderNumber]++) : (e <= f.numberOfSlides ? a(f.scrollerNode).children(":eq(" + (e - 1) + ")").before(b) : a(f.scrollerNode).children(":eq(" + (e - 2) + ")").after(b), c.data("args").currentSlideNumber >= e && c.data("args").currentSlideNumber++);
                c.data("iosslider").numberOfSlides++;
                V.update(this)
            })
        }, removeSlide: function(b) {
            return this.each(function() {
                var e = a(this).data("iosslider");
                if (void 0 == e)
                    return!1;
                a(e.scrollerNode).children(":eq(" + (b - 1) + ")").remove();
                z[e.sliderNumber] > b - 1 && z[e.sliderNumber]--;
                V.update(this)
            })
        }, goToSlide: function(b, g) {
            void 0 == g && (g = this);
            return a(g).each(function() {
                var c = a(this).data("iosslider");
                if (void 0 == c)
                    return!1;
                b = b > c.childrenOffsets.length ? c.childrenOffsets.length - 1 : b - 1;
                e.changeSlide(b, a(c.scrollerNode), a(c.slideNodes), $[c.sliderNumber], c.scrollbarClass, c.scrollbarWidth, c.stageWidth, c.scrollbarStageWidth, c.scrollMargin, c.scrollBorder, c.originalOffsets, c.childrenOffsets, c.slideNodeOuterWidths, c.sliderNumber, c.infiniteSliderWidth, c.numberOfSlides, c.centeredSlideOffset, c.settings)
            })
        }, prevSlide: function() {
            return this.each(function() {
                var b = a(this).data("iosslider");
                if (void 0 == b)
                    return!1;
                var g = (z[b.sliderNumber] + B[b.sliderNumber] + b.numberOfSlides) % b.numberOfSlides;
                (0 < g || b.settings.infiniteSlider) && e.changeSlide(g - 1, a(b.scrollerNode), a(b.slideNodes), $[b.sliderNumber], b.scrollbarClass, b.scrollbarWidth, b.stageWidth, b.scrollbarStageWidth, b.scrollMargin, b.scrollBorder, b.originalOffsets, b.childrenOffsets, b.slideNodeOuterWidths, b.sliderNumber, b.infiniteSliderWidth, b.numberOfSlides, b.centeredSlideOffset, b.settings);
                z[b.sliderNumber] = g
            })
        }, nextSlide: function() {
            return this.each(function() {
                var b = a(this).data("iosslider");
                if (void 0 == b)
                    return!1;
                var g = (z[b.sliderNumber] + B[b.sliderNumber] + b.numberOfSlides) % b.numberOfSlides;
                (g < b.childrenOffsets.length - 1 || b.settings.infiniteSlider) && e.changeSlide(g + 1, a(b.scrollerNode), a(b.slideNodes), $[b.sliderNumber], b.scrollbarClass, b.scrollbarWidth, b.stageWidth, b.scrollbarStageWidth, b.scrollMargin, b.scrollBorder, b.originalOffsets, b.childrenOffsets, b.slideNodeOuterWidths, b.sliderNumber, b.infiniteSliderWidth, b.numberOfSlides, b.centeredSlideOffset, b.settings);
                z[b.sliderNumber] = g
            })
        }, lock: function() {
            return this.each(function() {
                var b = a(this).data("iosslider");
                if (void 0 == b)
                    return!1;
                a(b.scrollerNode).css({cursor: "default"});
                ca[b.sliderNumber] = !0
            })
        }, unlock: function() {
            return this.each(function() {
                var b = a(this).data("iosslider");
                if (void 0 == b)
                    return!1;
                a(b.scrollerNode).css({cursor: ga});
                ca[b.sliderNumber] = !1
            })
        }, getData: function() {
            return this.each(function() {
                var b = a(this).data("iosslider");
                return void 0 == b ? !1 : b
            })
        }, autoSlidePause: function() {
            return this.each(function() {
                var b = a(this).data("iosslider");
                if (void 0 == b)
                    return!1;
                J[b.sliderNumber].autoSlide = !1;
                e.autoSlidePause(b.sliderNumber);
                return b
            })
        }, autoSlidePlay: function() {
            return this.each(function() {
                var b = a(this).data("iosslider");
                if (void 0 == b)
                    return!1;
                J[b.sliderNumber].autoSlide = !0;
                e.autoSlide(a(b.scrollerNode), a(b.slideNodes), $[b.sliderNumber], b.scrollbarClass, b.scrollbarWidth, b.stageWidth, b.scrollbarStageWidth, b.scrollMargin, b.scrollBorder, b.originalOffsets, b.childrenOffsets, b.slideNodeOuterWidths, b.sliderNumber, b.infiniteSliderWidth, b.numberOfSlides, b.centeredSlideOffset, b.settings);
                return b
            })
        }};
    a.fn.iosSlider = function(b) {
        if (V[b])
            return V[b].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" !== typeof b && b)
            a.error("invalid method call!");
        else
            return V.init.apply(this, arguments)
    }
})(jQuery);
;
jQuery(function($) {
    $('.rt_size_chart td').hover(function() {
        var sc_table = $(this).closest('table');
        sc_table.find('th,td').removeClass('hover');
        var sb = $(this).addClass('hover').parent().find('td');
        sb.eq(0).addClass('hover');
        sc_table.find('th').eq($(this).index()).addClass('hover');
    });
    $('.rt_size_chart').mouseout(function() {
        $(this).find('th,td').removeClass('hover');
    });
});
;
;
;/*!
 * FitVids 1.0
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 * Date: Thu Sept 01 18:00:00 2011 -0500
 */
;
(function($) {
    "use strict";
    $.fn.fitVids = function(options) {
        var settings = {customSelector: null};
        if (options) {
            $.extend(settings, options);
        }
        return this.each(function() {
            var selectors = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
            if (settings.customSelector) {
                selectors.push(settings.customSelector);
            }
            var $allVideos = $(this).find(selectors.join(','));
            $allVideos = $allVideos.not("object object");
            $allVideos.each(function() {
                var $this = $(this);
                if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) {
                    return;
                }
                var height = (this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)))) ? parseInt($this.attr('height'), 10) : $this.height(), width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(), aspectRatio = height / width;
                if (!$this.attr('id')) {
                    var videoID = 'fitvid' + Math.floor(Math.random() * 999999);
                    $this.attr('id', videoID);
                }
                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100) + "%");
                $this.removeAttr('height').removeAttr('width');
            });
        });
    };
})(window.jQuery || window.Zepto);
;
var blog_flexslider_options;
jQuery(function($) {
    var blog_flexslider_options_default = {slideshow: false, slideshowSpeed: 7000, animationSpeed: 400, pauseOnHover: true, animationLoop: true, useCSS: false, controlNav: false, prevText: '<i class="icon-angle-left icon-3x"></i>', nextText: '<i class="icon-angle-right icon-3x"></i>'};
    var blog_flexslider_options_extend = $.extend({}, blog_flexslider_options_default, blog_flexslider_options);
    $('.blog_flexslider').flexslider(blog_flexslider_options_extend);
    $('.full_video').fitVids();
});
;
$(document).ready(function() {
    initCrossSellingbxSlider();
});
function initCrossSellingbxSlider()
{
    if (!!$.prototype.bxSlider)
        $('#crossselling_list_car').bxSlider({minSlides: 2, maxSlides: 6, slideWidth: 178, slideMargin: 20, pager: false, nextText: '', prevText: '', moveSlides: 1, infiniteLoop: false, hideControlOnEnd: true});
}
;
;
$(document).ready(function() {
    reHoverImage();
});
function reHoverImage() {
    $('.pro_first_box').hover(function() {
        if ($('.back-image', this).size())
            $(this).addClass('showhoverimage');
    }, function() {
        $(this).removeClass('showhoverimage');
    });
}
;
;
if (typeof $.uniform.defaults !== 'undefined')
{
    if (typeof stblogcomments_fileDefaultHtml !== 'undefined')
        $.uniform.defaults.fileDefaultHtml = stblogcomments_fileDefaultHtml;
    if (typeof stblogcomments_fileButtonHtml !== 'undefined')
        $.uniform.defaults.fileButtonHtml = stblogcomments_fileButtonHtml;
}
jQuery(function($) {
    if (!isPlaceholer())
    {
        $('#comment_input input').each(function() {
            $(this).focusin(function() {
                if ($(this).val() == $(this).attr('placeholder'))
                    $(this).val('');
            }).focusout(function() {
                if ($(this).val() == '')
                    $(this).val($(this).attr('placeholder'));
            });
        });
    }
    $('form[name=st_blog_comment_form]').submit(function(e) {
        e.preventDefault();
        var is_success = false;
        var sub_btn = $('#st_blog_comment_submit');
        if (sub_btn.hasClass('disabled'))
            return false;
        else
            sub_btn.addClass('disabled');
        $.ajax({url: $('form[name=st_blog_comment_form]').attr('action'), type: 'POST', headers: {"cache-control": "no-cache"}, dataType: 'json', data: $('form[name=st_blog_comment_form]').serialize(), cache: false, success: function(json) {
                sub_btn.removeClass('disabled');
                if (json.r)
                {
                    is_success = true;
                    if (!!$.prototype.fancybox)
                        $.fancybox.open([{type: 'inline', autoScale: true, minHeight: 30, afterClose: function() {
                                    if (is_success)
                                        window.location.reload(true);
                                    return true;
                                }, content: '<p class="fancybox-error">' + stblogcomments_thank + (stblogcomments_moderate ? '<br/>' + stblogcomments_moderation : '') + '</p>'}], {padding: 0});
                    else
                        alert(added_to_wishlist);
                }
                else
                {
                    if (!!$.prototype.fancybox)
                        $.fancybox.open([{type: 'inline', autoScale: true, minHeight: 30, content: '<p class="fancybox-error">' + json.m + '</p>'}], {padding: 0});
                    else
                        alert(json.m);
                }
            }});
        return false;
    });
    $('.comment_reply_link').click(function() {
        var id_st_blog_comment = $(this).attr('data-id-st-blog-comment');
        if (id_st_blog_comment)
            stblogcomments.move_to(id_st_blog_comment);
    });
    $('#cancel_comment_reply_link').click(function() {
        stblogcomments.move_back();
    });
});
var stblogcomments = {'move_to': function(id_st_blog_comment)
    {
        $('#comment-' + id_st_blog_comment + ' > .comment_node').after($('#st_blog_comment_reply_block').get(0));
        $('#blog_comment_parent_id').val(id_st_blog_comment);
        $('#cancel_comment_reply_link').show();
    }, 'move_back': function()
    {
        $('#comments').after($('#st_blog_comment_reply_block').get(0));
        $('#cancel_comment_reply_link').hide();
        $('#blog_comment_parent_id').val(0);
    }};
;
jQuery(function($) {
    var stadvancedmenu_down_timer;
    function advancedMegaHoverOver() {
        $(this).addClass('current');
        if ($(this).find('.stadvancedmenu_sub').children().size())
        {
            var stmenu_sub_dom = $(this).find(".stadvancedmenu_sub");
            stmenu_sub_dom.stop();
            stadvancedmenu_down_timer = setTimeout(function() {
                if (typeof (st_adv_submemus_animation) !== 'undefined' && st_adv_submemus_animation)
                    stmenu_sub_dom.slideDown('fast', function() {
                        stmenu_sub_dom.css('overflow', 'visible');
                    });
                else
                    stmenu_sub_dom.fadeIn('fast', function() {
                        stmenu_sub_dom.css('overflow', 'visible');
                    });
            }, 100);
        }
    }
    function advancedMegaHoverOut() {
        clearTimeout(stadvancedmenu_down_timer);
        $(this).removeClass('current');
        $(this).find(".stadvancedmenu_sub").stop().hide();
    }
    $(".advanced_ml_level_0").hoverIntent({sensitivity: 7, interval: 0, over: advancedMegaHoverOver, timeout: 0, out: advancedMegaHoverOut});
    $('#stmobileadvancedmenu .mo_advanced_mu_level_0,#st_advanced_menu_column_mobile .mo_advanced_mu_level_0').staccordion();
    if (('ontouchstart'in document.documentElement || window.navigator.msMaxTouchPoints))
    {
        $(".advanced_ma_level_0").click(function(e) {
            var ml_level_0 = $(this).parent();
            if (ml_level_0.find('.stadvancedmenu_sub').children().size())
            {
                if (!ml_level_0.hasClass('advanced_ma_touched'))
                {
                    $(".advanced_ml_level_0").removeClass('advanced_ma_touched');
                    ml_level_0.addClass('advanced_ma_touched');
                    return false;
                }
                else
                    ml_level_0.removeClass('advanced_ma_touched');
            }
        });
        $('.stadvancedmenu_sub .has_children').click(function(e) {
            if (!$(this).hasClass('item_touched'))
            {
                $(".stadvancedmenu_sub .menu_touched").removeClass('item_touched');
                $(this).addClass('item_touched');
                return false;
            }
            else
                $(this).removeClass('item_touched');
        });
    }
    $("#stmobileadvancedmenu_tri").click(function() {
        stSidebar('st_mobile_advanced_menu');
        return false;
    });
});
;
$(document).ready(function() {
    if (!isPlaceholer())
    {
        $('.news_letter_input').focusin(function() {
            if ($(this).val() == $(this).attr('placeholder'))
                $(this).val('');
        }).focusout(function() {
            if ($(this).val() == '')
                $(this).val($(this).attr('placeholder'));
        });
    }
    $('form.st_news_letter_form').submit(function() {
        var $form = $(this);
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/.test($(this).find('.st_news_letter_input').val()))
        {
            $form.parent().find('.alert-danger').html(wrongemailaddress_stnewsletter).removeClass('hidden');
            return false;
        }
        $.ajax({type: 'POST', url: $form.attr('action'), data: $form.serialize(), dataType: 'json', cache: false, success: function(result)
            {
                $form.parent().find('.alert-danger').addClass('hidden');
                $form.parent().find('.alert-success').addClass('hidden');
                if (result.hasError)
                    $form.parent().find('.alert-danger').html(result.hasError).removeClass('hidden');
                else
                {
                    $form.parent().find('.alert-success').html(result.message).removeClass('hidden');
                    if ($.isFunction(window.regested_popup))
                        regested_popup();
                }
            }});
        return false;
    });
});
;/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);
            if (value === null || value === undefined) {
                options.expires = -1;
            }
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
            value = String(value);
            return(document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
        }
        options = value || {};
        var decode = options.raw ? function(s) {
            return s;
        } : decodeURIComponent;
        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key)
                return decode(pair[1] || '');
        }
        return null;
    };
})(jQuery);
;
if (typeof (st_addtocart_animation) == "undefined")
    var st_addtocart_animation = 0;
$(document).ready(function() {
    ajaxCart.overrideButtonsInThePage();
    $(document).on('click', '.block_cart_collapse', function(e) {
        e.preventDefault();
        ajaxCart.collapse();
    });
    $(document).on('click', '.block_cart_expand', function(e) {
        e.preventDefault();
        ajaxCart.expand();
    });
    var current_timestamp = parseInt(new Date().getTime() / 1000);
    if (typeof $('.ajax_cart_quantity').html() == 'undefined' || (typeof generated_date != 'undefined' && generated_date != null && (parseInt(generated_date) + 30) < current_timestamp))
        ajaxCart.refresh();
    var cart_block = new HoverWatcher('#page_header .cart_block');
    var shopping_cart = new HoverWatcher('#page_header .shopping_cart');
    if (('ontouchstart'in document.documentElement))
    {
        $('#page_header .shopping_cart').on('click', function(e) {
            if ($('#page_header .cart_block').hasClass('cart_block_touched'))
            {
                return true;
            }
            else
            {
                $("#page_header .cart_block").addClass('cart_block_touched').stop(true, true).slideDown(450);
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
    }
    $("#page_header .shopping_cart").hover(function() {
        if (ajaxCart.nb_total_products > 0 || parseInt($('.ajax_cart_quantity').html()) > 0)
            $(this).parent().find(".cart_block").stop(true, true).slideDown(450);
    }, function() {
        setTimeout(function() {
            if (!shopping_cart.isHoveringOver() && !cart_block.isHoveringOver())
                $("#page_header .cart_block").removeClass('cart_block_touched').stop(true, true).slideUp(450);
        }, 200);
    });
    $("#page_header .cart_block").hover(function() {
        $(this).parent().find(".shopping_cart").addClass('active');
    }, function() {
        setTimeout(function() {
            $('.shopping_cart').removeClass('active');
            if (!shopping_cart.isHoveringOver())
                $("#page_header .cart_block").stop(true, true).slideUp(450);
        }, 200);
    });
    $(document).on('click', '.delete_voucher', function(e) {
        e.preventDefault();
        $.ajax({type: 'POST', headers: {"cache-control": "no-cache"}, async: true, cache: false, url: $(this).attr('href') + '?rand=' + new Date().getTime()});
        $(this).parent().parent().remove();
        ajaxCart.refresh();
        if ($('body').attr('id') == 'order' || $('body').attr('id') == 'order-opc')
        {
            if (typeof (updateAddressSelection) != 'undefined')
                updateAddressSelection();
            else
                location.reload();
        }
    });
    $(document).on('click', '#cart_navigation input', function(e) {
        $(this).prop('disabled', 'disabled').addClass('disabled');
        $(this).closest("form").get(0).submit();
    });
    $(document).on('click', '#layer_cart .cross, #layer_cart .continue, .layer_cart_overlay', function(e) {
        e.preventDefault();
        $('body').removeClass('cart_popup');
        $('#main_menu_widgets').removeClass('overlay_on');
        $('.layer_cart_overlay').hide();
        $('#layer_cart').fadeOut('fast');
        if (typeof sticky_adv !== 'undefined')
            sticky_adv();
    });
    $('#columns #layer_cart, #columns .layer_cart_overlay').detach().prependTo('#columns');
    $('#shopping_cart_mobile').click(function(e) {
        e.preventDefault();
        stSidebar('block_cart_mod');
        return false;
    });
});
var ajaxCart = {nb_total_products: 0, overrideButtonsInThePage: function() {
        $(document).off('click', '.ajax_add_to_cart_button').on('click', '.ajax_add_to_cart_button', function(e) {
            e.preventDefault();
            var idProduct = parseInt($(this).data('id-product'));
            var idProductAttribute = parseInt($(this).data('id-product-attribute'));
            var minimalQuantity = parseInt($(this).data('minimal_quantity'));
            if (!minimalQuantity)
                minimalQuantity = 1;
            if ($(this).prop('disabled') != 'disabled')
                ajaxCart.add(idProduct, idProductAttribute, false, this, minimalQuantity);
        });
        if ($('.cart_block').length || contentOnly) {
            $(document).off('click', '#add_to_cart button').on('click', '#add_to_cart button', function(e) {
                e.preventDefault();
                ajaxCart.add($('#product_page_product_id').val(), $('#idCombination').val(), true, null, $('#quantity_wanted').val(), null);
            });
        }
        $(document).off('click', '.cart_block_list .ajax_cart_block_remove_link').on('click', '.cart_block_list .ajax_cart_block_remove_link', function(e) {
            e.preventDefault();
            var customizationId = 0;
            var productId = 0;
            var productAttributeId = 0;
            var customizableProductDiv = $($(this).parent().parent()).find("div[data-id^=deleteCustomizableProduct_]");
            var rowid = $(this).parent().parent().data('idRow');
            var idAddressDelivery = false;
            if (customizableProductDiv && $(customizableProductDiv).length)
            {
                var ids = customizableProductDiv.data('id').split('_');
                if (typeof (ids[1]) != 'undefined')
                {
                    customizationId = parseInt(ids[1]);
                    productId = parseInt(ids[2]);
                    if (typeof (ids[3]) != 'undefined')
                        productAttributeId = parseInt(ids[3]);
                    if (typeof (ids[4]) != 'undefined')
                        idAddressDelivery = parseInt(ids[4]);
                }
            }
            if (!customizationId)
            {
                var firstCut = $(this).parent().parent().data('id').replace('cart_block_product_', '');
                firstCut = firstCut.replace('deleteCustomizableProduct_', '');
                ids = firstCut.split('_');
                productId = parseInt(ids[0]);
                if (typeof (ids[1]) != 'undefined')
                    productAttributeId = parseInt(ids[1]);
                if (typeof (ids[2]) != 'undefined')
                    idAddressDelivery = parseInt(ids[2]);
            }
            ajaxCart.remove(productId, rowid, productAttributeId, customizationId, idAddressDelivery);
        });
    }, expand: function() {
        if ($('.cart_block_list').hasClass('collapsed'))
        {
            $('.cart_block_list.collapsed').slideDown({duration: 450, complete: function() {
                    $(this).addClass('expanded').removeClass('collapsed');
                }});
            $.ajax({type: 'POST', headers: {"cache-control": "no-cache"}, url: baseDir + 'modules/blockcart/blockcart-set-collapse.php' + '?rand=' + new Date().getTime(), async: true, cache: false, data: 'ajax_blockcart_display=expand', complete: function() {
                    $('.block_cart_expand').fadeOut('fast', function() {
                        $('.block_cart_collapse').fadeIn('fast');
                    });
                }});
        }
    }, collapse: function() {
        if ($('.cart_block_list').hasClass('expanded'))
        {
            $('.cart_block_list.expanded').slideUp('slow', function() {
                $(this).addClass('collapsed').removeClass('expanded');
            });
            $.ajax({type: 'POST', headers: {"cache-control": "no-cache"}, url: baseDir + 'modules/blockcart/blockcart-set-collapse.php' + '?rand=' + new Date().getTime(), async: true, cache: false, data: 'ajax_blockcart_display=collapse' + '&rand=' + new Date().getTime(), complete: function() {
                    $('.block_cart_collapse').fadeOut('fast', function() {
                        $('.block_cart_expand').fadeIn('fast');
                    });
                }});
        }
    }, refresh: function() {
        $.ajax({
            type: 'POST',
            headers: {"cache-control": "no-cache", 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: (typeof (baseUri) !== 'undefined') ? baseUri + 'rand' : '', async: true, cache: false, dataType: "json", data: (typeof (static_token) !== 'undefined') ? 'controller=cart&ajax=true&token=' + static_token : '', success: function(jsonData)
            {
                ajaxCart.updateCart(jsonData);
            }});
    }, updateCartInformation: function(jsonData, addedFromProductPage) {
        ajaxCart.updateCart(jsonData);
        if (addedFromProductPage)
        {
            $('#add_to_cart button').removeProp('disabled').removeClass('disabled');
            if (!jsonData.hasError || jsonData.hasError == false)
                $('#add_to_cart button').addClass('added');
            else
                $('#add_to_cart button').removeClass('added');
        }
        else
            $('.ajax_add_to_cart_button').removeProp('disabled');
    }, updateFancyBox: function() {
    }, add: function(idProduct, idCombination, addedFromProductPage, callerElement, quantity, whishlist) {
        if (addedFromProductPage && !checkCustomizations())
        {
            if (contentOnly)
            {
                var productUrl = window.document.location.href + '';
                var data = productUrl.replace('content_only=1', '');
                window.parent.document.location.href = data;
                return;
            }
            if (!!$.prototype.fancybox)
                $.fancybox.open([{type: 'inline', autoScale: true, minHeight: 30, content: '<p class="fancybox-error">' + fieldRequired + '</p>'}], {padding: 0});
            else
                alert(fieldRequired);
            return;
        }
        if (addedFromProductPage)
        {
            $('#add_to_cart button').prop('disabled', 'disabled').addClass('disabled');
            $('.filled').removeClass('filled');
        }
        else
            $(callerElement).prop('disabled', 'disabled').addClass('active');
        if ($('.cart_block_list').hasClass('collapsed'))
            this.expand();
        $.ajax({
            type: 'POST',
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: baseUri + 'rand',
            async: true,
            cache: false,
            dataType: "json",
            data: 'controller=cart&add=1&ajax=true&qty=' + ((quantity && quantity != null) ? quantity : '1') + '&id_product=' + idProduct + '&token=' + static_token + ((parseInt(idCombination) && idCombination != null) ? '&ipa=' + parseInt(idCombination) : '' + '&id_customization=' + ((typeof customizationId !== 'undefined') ? customizationId : 0)),
            success: function(jsonData, textStatus, jqXHR)
            {
                $(callerElement).removeClass('active');
                if (whishlist && !jsonData.errors)
                    WishlistAddProductCart(whishlist[0], idProduct, idCombination, whishlist[1]);
                if (!jsonData.hasError)
                {
                    if (idCombination && idCombination != 0)
                        $(jsonData.products).each(function() {
                            if (this.id != undefined && this.id == parseInt(idProduct) && this.idCombination == parseInt(idCombination))
                                if (contentOnly)
                                    window.parent.ajaxCart.updateLayer(this, jsonData, addedFromProductPage, callerElement);
                                else
                                    ajaxCart.updateLayer(this, jsonData, addedFromProductPage, callerElement);
                        });
                    else
                        $(jsonData.products).each(function() {
                            if (this.id != undefined && this.id == parseInt(idProduct))
                                if (contentOnly)
                                    window.parent.ajaxCart.updateLayer(this, jsonData, addedFromProductPage, callerElement);
                                else
                                    ajaxCart.updateLayer(this, jsonData, addedFromProductPage, callerElement);
                        });
                    if (contentOnly)
                        parent.$.fancybox.close();
                }
                else
                {
                    if (contentOnly)
                        window.parent.ajaxCart.updateCart(jsonData);
                    else
                        ajaxCart.updateCart(jsonData);
                    if (addedFromProductPage)
                        $('#add_to_cart button').removeProp('disabled').removeClass('disabled');
                    else
                        $(callerElement).removeProp('disabled');
                    var errors = '';
                    for (error in jsonData.errors)
                        if (error != 'indexOf')
                            errors += $('<div />').html(jsonData.errors[error]).text() + "\n";
                    if (!!$.prototype.fancybox)
                        $.fancybox.open([{type: 'inline', autoScale: true, minHeight: 30, content: '<p class="fancybox-error">' + errors + '</p>'}], {padding: 0});
                    else
                        alert(errors);
                }
                emptyCustomizations();
            }, error: function(XMLHttpRequest, textStatus, errorThrown)
            {
                $(callerElement).removeClass('active');
                var error = "Impossible to add the product to the cart.<br/>textStatus: '" + textStatus + "'<br/>errorThrown: '" + errorThrown + "'<br/>responseText:<br/>" + XMLHttpRequest.responseText;
                if (!!$.prototype.fancybox)
                    $.fancybox.open([{type: 'inline', autoScale: true, minHeight: 30, content: '<p class="fancybox-error">' + error + '</p>'}], {padding: 0});
                else
                    alert(error);
                if (addedFromProductPage)
                    $('#add_to_cart button').removeProp('disabled').removeClass('disabled');
                else
                    $(callerElement).removeProp('disabled');
            }});
    }, remove: function(idProduct, rowid, idCombination, customizationId, idAddressDelivery) {
        $.ajax({type: 'POST',
            headers: {"cache-control": "no-cache", 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: baseUri + 'rand',
            async: true,
            cache: false,
            dataType: "json",
            data: 'controller=cart&delete=1&rowid=' + rowid + '&id_product=' + idProduct + '&ipa=' + ((idCombination != null && parseInt(idCombination)) ? idCombination : '') + ((customizationId && customizationId != null) ? '&id_customization=' + customizationId : '') + '&id_address_delivery=' + idAddressDelivery + '&token=' + static_token + '&ajax=true', success: function(jsonData) {
                ajaxCart.updateCart(jsonData);
                ajaxCart.hideOldProducts(jsonData);
                if ($('body').attr('id') == 'order' || $('body').attr('id') == 'order-opc')
                    deleteProductFromSummary(idProduct + '_' + idCombination + '_' + customizationId + '_' + idAddressDelivery);
            }, error: function()
            {
                var error = 'ERROR: unable to delete the product';
                if (!!$.prototype.fancybox)
                {
                    $.fancybox.open([{type: 'inline', autoScale: true, minHeight: 30, content: error}], {padding: 0});
                }
                else
                    alert(error);
            }});
    }, hideOldProducts: function(jsonData) {
        if ($('.cart_block_list:first dl.products').length > 0)
        {
            var removedProductId = null;
            var removedProductData = null;
            var removedProductDomId = null;
            $('.cart_block_list:first dl.products dt').each(function() {
                var domIdProduct = $(this).data('id');
                var firstCut = domIdProduct.replace('cart_block_product_', '');
                var ids = firstCut.split('_');
                var stayInTheCart = false;
                for (aProduct in jsonData.products)
                {
                    if (jsonData.products[aProduct]['id'] == ids[0])
                    {
                        stayInTheCart = true;
                        ajaxCart.hideOldProductCustomizations(jsonData.products[aProduct], domIdProduct);
                    }
                }
                if (!stayInTheCart)
                {
                    removedProductId = $(this).data('id');
                    if (removedProductId != null)
                    {
                        var firstCut = removedProductId.replace('cart_block_product_', '');
                        var ids = firstCut.split('_');
                        $('dt[data-id="' + removedProductId + '"]').addClass('strike').fadeTo('slow', 0, function() {
                            $(this).slideUp('slow', function() {
                                $(this).remove();
                                if ($('.cart_block:first dl.products dt').length == 0)
                                {
                                    $('.ajax_cart_quantity').html('0');
                                    $("#page_header .cart_block").stop(true, true).slideUp(200);
                                    $('.cart_block_no_products:hidden').slideDown(450);
                                    $('.cart_block dl.products').remove();
                                    $('.cart_block .cart-prices, .cart_block .cart-buttons').hide();
                                }
                            });
                        });
                        $('dd[data-id="cart_block_combination_of_' + ids[0] + (ids[1] ? '_' + ids[1] : '') + (ids[2] ? '_' + ids[2] : '') + '"]').fadeTo('fast', 0, function() {
                            $(this).slideUp('fast', function() {
                                $(this).remove();
                            });
                        });
                    }
                }
            });
        }
    }, hideOldProductCustomizations: function(product, domIdProduct) {
        var customizationList = $('ul[data-id="customization_' + product['id'] + '_' + product['idCombination'] + '"]');
        if (customizationList.length > 0)
        {
            $(customizationList).find("li").each(function() {
                $(this).find("div").each(function() {
                    var customizationDiv = $(this).data('id');
                    var tmp = customizationDiv.replace('deleteCustomizableProduct_', '');
                    var ids = tmp.split('_');
                    if ((parseInt(product.idCombination) == parseInt(ids[2])) && !ajaxCart.doesCustomizationStillExist(product, ids[0]))
                        $('div[data-id="' + customizationDiv + '"]').parent().addClass('strike').fadeTo('slow', 0, function() {
                            $(this).slideUp('slow');
                            $(this).remove();
                        });
                });
            });
        }
        var removeLinks = $('.deleteCustomizableProduct[data-id="' + domIdProduct + '"]').find('.ajax_cart_block_remove_link');
        if (!product.hasCustomizedDatas && !removeLinks.length)
            $('div[data-id="' + domIdProduct + '"]' + ' span.remove_link').html('<a class="ajax_cart_block_remove_link" rel="nofollow" href="' + baseUri + '?controller=cart&amp;delete=1&amp;rowid=' + product['rowid'] + '&amp;id_product=' + product['id'] + '&amp;ipa=' + product['idCombination'] + '&amp;token=' + static_token + '"><i class="icon-cancel icon-small"></i></a>');
        if (product.is_gift)
            $('div[data-id="' + domIdProduct + '"]' + ' span.remove_link').html('');
    }, doesCustomizationStillExist: function(product, customizationId) {
        var exists = false;
        $(product.customizedDatas).each(function() {
            if (this.customizationId == customizationId)
            {
                exists = true;
                return false;
            }
        });
        return(exists);
    }, refreshVouchers: function(jsonData) {
        if (typeof (jsonData.discounts) == 'undefined' || jsonData.discounts.length == 0)
            $('.vouchers').hide();
        else
        {
            $('.vouchers tbody').html('');
            for (i = 0; i < jsonData.discounts.length; i++)
            {
                if (parseFloat(jsonData.discounts[i].price_float) > 0)
                {
                    var delete_link = '';
                    if (jsonData.discounts[i].code.length)
                        delete_link = '<a class="delete_voucher" href="' + jsonData.discounts[i].link + '" title="' + delete_txt + '"><i class="icon-remove-sign"></i></a>';
                    $('.vouchers tbody').append($('<tr class="bloc_cart_voucher" data-id="bloc_cart_voucher_' + jsonData.discounts[i].id + '">'
                            + ' <td class="quantity">1x</td>'
                            + ' <td class="name" title="' + jsonData.discounts[i].description + '">' + jsonData.discounts[i].name + '</td>'
                            + ' <td class="price">-' + jsonData.discounts[i].price + '</td>'
                            + ' <td class="delete">' + delete_link + '</td>'
                            + '</tr>'));
                }
            }
            $('.vouchers').show();
        }
    }, updateProductQuantity: function(product, quantity) {
        $('dt[data-id=cart_block_product_' + product.id + '_' + (product.idCombination ? product.idCombination : '0') + '_' + (product.idAddressDelivery ? product.idAddressDelivery : '0') + '] .quantity').fadeTo('fast', 0, function() {
            $(this).text(quantity);
            $(this).fadeTo('fast', 1, function() {
                $(this).fadeTo('fast', 0, function() {
                    $(this).fadeTo('fast', 1, function() {
                        $(this).fadeTo('fast', 0, function() {
                            $(this).fadeTo('fast', 1);
                        });
                    });
                });
            });
        });
    }, displayNewProducts: function(jsonData) {

        $(jsonData.products).each(function() {
            if (this.id != undefined)
            {
                if ($('.cart_block:first dl.products').length == 0)
                {
                    $('.cart_block .cart_block_no_products').before('<dl class="products"></dl>');
                    $('.cart_block_no_products').hide();
                    $('.cart_block .cart-prices, .cart_block .cart-buttons').show();
                }
                var domIdProduct = this.id + '_' + (this.idCombination ? this.idCombination : '0') + '_' + (this.idAddressDelivery ? this.idAddressDelivery : '0');
                var domIdProductAttribute = this.id + '_' + (this.idCombination ? this.idCombination : '0');
                if ($('dt[data-id="cart_block_product_' + domIdProduct + '"]').length == 0)
                {
                    var productId = parseInt(this.id);
                    var productAttributeId = (this.hasAttributes ? parseInt(this.attributes) : 0);
                    var content = '<dt class="clearfix unvisible" data-id-row="' + this.rowid + '" data-id="cart_block_product_' + domIdProduct + '">';
                    var name = $.trim($('<span />').html(this.name).text());
                    name = (name.length > 16 ? name.substring(0, 14) + '...' : name);
                    content += '<a class="cart-images" href="view_full_details/' + this.id + '" title="' + name + '"><img  src="' + this.image_cart + '" alt="' + this.name + '"></a>';
                    content += '<span class="quantity-formated"><span class="quantity">' + this.quantity + '</span>x</span><a href="view_full_details/' + this.id + '" title="' + this.name + '" class="cart_block_product_name">' + name + '</a>';
                    if (typeof (this.is_gift) == 'undefined' || this.is_gift == 0)
                        content += '<span class="remove_link"><a rel="nofollow" class="ajax_cart_block_remove_link" href="' + baseUri + '?controller=cart&amp;delete=1&amp;rowid=' + this.rowid + '&amp;id_product=' + productId + '&amp;token=' + static_token + (this.hasAttributes ? '&amp;ipa=' + parseInt(this.idCombination) : '') + '"><i class="icon-cancel icon-small"></i></a></span>';
                    else
                        content += '<span class="remove_link"></span>';
                    if (typeof (freeProductTranslation) != 'undefined')
                        content += '<span class="price">' + (parseFloat(this.options.price_float) > 0 ? this.price * this.quantity : freeProductTranslation) + '</span>';
                    if (this.hasAttributes)
                        content += '<div class="product-atributes"><a href="view_full_details/' + this.id + '" title="' + this.name + '">' + this.attributes + '</a></div>';
                    content += '</dt>';
                    if (this.hasAttributes)
                        content += '<dd data-id="cart_block_combination_of_' + domIdProduct + '" class="unvisible">';
                    if (this.hasCustomizedDatas)
                        content += ajaxCart.displayNewCustomizedDatas(this);
                    if (this.hasAttributes)
                        content += '</dd>';
                    $('.cart_block dl.products').append(content);
                }
                else
                {
                    var jsonProduct = this;
                    if ($.trim($('dt[data-id="cart_block_product_' + domIdProduct + '"] .quantity').html()) != jsonProduct.quantity || $.trim($('dt[data-id="cart_block_product_' + domIdProduct + '"] .price').html()) != jsonProduct.price)
                    {
                        if (!this.is_gift)
                            $('dt[data-id="cart_block_product_' + domIdProduct + '"] .price').text(jsonProduct.price * this.quantity);
                        else
                            $('dt[data-id="cart_block_product_' + domIdProduct + '"] .price').html(freeProductTranslation);
                        ajaxCart.updateProductQuantity(jsonProduct, jsonProduct.quantity);
                        if (jsonProduct.hasCustomizedDatas)
                        {
                            customizationFormatedDatas = ajaxCart.displayNewCustomizedDatas(jsonProduct);
                            if (!$('ul[data-id="customization_' + domIdProductAttribute + '"]').length)
                            {
                                if (jsonProduct.hasAttributes)
                                    $('dd[data-id="cart_block_combination_of_' + domIdProduct + '"]').append(customizationFormatedDatas);
                                else
                                    $('.cart_block dl.products').append(customizationFormatedDatas);
                            }
                            else
                            {
                                $('ul[data-id="customization_' + domIdProductAttribute + '"]').html('');
                                $('ul[data-id="customization_' + domIdProductAttribute + '"]').append(customizationFormatedDatas);
                            }
                        }
                    }
                }
                $('.cart_block dl.products .unvisible').slideDown(450).removeClass('unvisible');
                var removeLinks = $('dt[data-id="cart_block_product_' + domIdProduct + '"]').find('a.ajax_cart_block_remove_link');
                if (this.hasCustomizedDatas && removeLinks.length)
                    $(removeLinks).each(function() {
                        $(this).remove();
                    });
            }
        });
    }, displayNewCustomizedDatas: function(product) {
        var content = '';
        var productId = parseInt(product.id);
        var productAttributeId = typeof (product.idCombination) == 'undefined' ? 0 : parseInt(product.idCombination);
        var hasAlreadyCustomizations = $('ul[data-id="customization_' + productId + '_' + productAttributeId + '"]').length;
        if (!hasAlreadyCustomizations)
        {
            if (!product.hasAttributes)
                content += '<dd data-id="cart_block_combination_of_' + productId + '" class="unvisible">';
            if ($('ul[data-id="customization_' + productId + '_' + productAttributeId + '"]').val() == undefined)
                content += '<ul class="cart_block_customizations" data-id="customization_' + productId + '_' + productAttributeId + '">';
        }
        $(product.customizedDatas).each(function() {
            var done = 0;
            var c_customizationId = parseInt(this.customizationId);
            productAttributeId = typeof (product.idCombination) == 'undefined' ? 0 : parseInt(product.idCombination);
            content += '<li name="customization"><div class="deleteCustomizableProduct" data-id="deleteCustomizableProduct_' + c_customizationId + '_' + productId + '_' + (productAttributeId ? productAttributeId : '0') + '"><a rel="nofollow" class="ajax_cart_block_remove_link" href="' + baseUri + '?controller=cart&amp;delete=1&amp;rowid=' + this.rowid + '&amp;id_product=' + productId + '&amp;ipa=' + productAttributeId + '&amp;id_customization=' + c_customizationId + '&amp;token=' + static_token + '"><i class="icon-cancel icon-small"></i></a></div>';
            $(this.datas).each(function() {
                if (this['type'] == CUSTOMIZE_TEXTFIELD)
                {
                    $(this.datas).each(function() {
                        if (this['index'] == 0)
                        {
                            content += ' ' + this.truncatedValue.replace(/<br \/>/g, ' ');
                            done = 1;
                            return false;
                        }
                    })
                }
            });
            if (!done)
                content += customizationIdMessage + c_customizationId;
            if (!hasAlreadyCustomizations)
                content += '</li>';
            if (c_customizationId)
            {
                $('#uploadable_files li div.customizationUploadBrowse img').remove();
                $('#text_fields input').attr('value', '');
            }
        });
        if (!hasAlreadyCustomizations)
        {
            content += '</ul>';
            if (!product.hasAttributes)
                content += '</dd>';
        }
        return(content);
    }, updateLayer: function(product, jsonData, addedFromProductPage, callerElement) {
        if ((st_addtocart_animation == 1 || st_addtocart_animation == 2) && ($("#page_header #cart_block").length || $(window).width() > 768))
        {
            if (!callerElement && typeof (quickViewCaller) != 'undefined' && quickViewCaller)
                callerElement = quickViewCaller;
            var $element = $(callerElement).closest('.ajax_block_product').find('a.product_image img.front-image,a.product_img_link img.front-image');
            if (!$element.length)
                var $element = $(callerElement).closest('.ajax_block_product').find('a.product_image img,a.product_img_link img');
            if (!$element.length)
                $element = $('#bigpic');
            if (!$element.length)
                $element = $('#jqzoom_bigpic');
            var $picture = $element.clone();
            var pictureOffsetOriginal = $element.offset();
            pictureOffsetOriginal.right = $(window).innerWidth() - pictureOffsetOriginal.left - $element.width();
            if ($picture.length)
            {
                $picture.css({position: 'absolute', top: pictureOffsetOriginal.top, right: pictureOffsetOriginal.right});
            }
            if ($(window).width() < 992)
                var cartBlock = $('#shopping_cart_mobile');
            else
                var cartBlock = $('#shopping_cart');
            if (!cartBlock.length)
                cartBlock = $('#shopping_cart');
            var cartBlockOffset = cartBlock.offset();
            cartBlockOffset.right = $(window).innerWidth() - cartBlockOffset.left - cartBlock.width();
            if (cartBlockOffset != undefined && $picture.length)
            {
                $picture.appendTo('body');
                $picture.css({position: 'absolute', top: pictureOffsetOriginal.top, right: pictureOffsetOriginal.right, zIndex: 4242}).animate({width: '100px', height: '100px', opacity: 0.2, top: cartBlockOffset.top + 30, right: cartBlockOffset.right + 15}, 1500).fadeOut(100, function() {
                    if (contentOnly)
                        window.parent.ajaxCart.updateCartInformation(jsonData, addedFromProductPage);
                    else
                        ajaxCart.updateCartInformation(jsonData, addedFromProductPage);
                    $(this).remove();
                });
                if (st_addtocart_animation == 1)
                {
                    if (cartBlockOffset.top)
                        $('body,html').animate({scrollTop: cartBlockOffset.top + 22}, 1500);
                }
            }
        }
        else
        {
            if (contentOnly)
                window.parent.ajaxCart.updateCartInformation(jsonData, addedFromProductPage);
            else
                ajaxCart.updateCartInformation(jsonData, addedFromProductPage);
            $('#layer_cart_product_title').text(product.options.full_name);
            $('#layer_cart_product_attributes').text('');
            if (product.hasAttributes && product.hasAttributes == true)
                $('#layer_cart_product_attributes').html(product.attributes);
            $('#layer_cart_product_price').text(product.price * product.quantity);
            $('#layer_cart_product_quantity').text(product.quantity);
            $('.layer_cart_img').html('<img class="layer_cart_img img-responsive" src="' + product.image + '" alt="' + product.name + '" title="' + product.name + '" width="' + product.image_width + '" height="' + product.image_height + '" />');
            var n = (parseInt($(window).scrollTop()) + 32) + 'px';
            $('body').addClass('cart_popup');
            $('#main_menu_widgets').addClass('overlay_on');
            $('#page_header #header,#st_advanced_menu_container').removeClass('sticky fadeInDownLarge');
            $('#page_header').removeClass('has_sticky');
            $('.layer_cart_overlay').css('width', '100%');
            $('.layer_cart_overlay').css('height', '100%');
            $('.layer_cart_overlay').show();
            $('#layer_cart').css({'top': n}).fadeIn('fast');
        }
    }, updateCart: function(jsonData) {
        if (jsonData.hasError)
        {
            var errors = '';
            for (error in jsonData.errors)
                if (error != 'indexOf')
                    errors += $('<div />').html(jsonData.errors[error]).text() + "\n";
            if (!!$.prototype.fancybox)
                $.fancybox.open([{type: 'inline', autoScale: true, minHeight: 30, content: '<p class="fancybox-error">' + errors + '</p>'}], {padding: 0});
            else
                alert(errors);
        }
        else
        {
            ajaxCart.updateCartEverywhere(jsonData);
//            ajaxCart.hideOldProducts(jsonData);
            ajaxCart.displayNewProducts(jsonData);
            ajaxCart.refreshVouchers(jsonData);
            $('.cart_block .products dt').removeClass('first_item').removeClass('last_item').removeClass('item');
            $('.cart_block .products dt:first').addClass('first_item');
            $('.cart_block .products dt:not(:first,:last)').addClass('item');
            $('.cart_block .products dt:last').addClass('last_item');
        }
    }, updateCartEverywhere: function(jsonData) {
        $('.ajax_cart_total').text($.trim(jsonData.productTotal));
        if (typeof hasDeliveryAddress == 'undefined')
            hasDeliveryAddress = false;
        if (parseFloat(jsonData.shippingCostFloat) > 0)
            $('.ajax_cart_shipping_cost').text(jsonData.shippingCost).parent().find('.unvisible').show();
        else if ((hasDeliveryAddress || typeof (orderProcess) !== 'undefined' && orderProcess == 'order-opc') && typeof (freeShippingTranslation) != 'undefined')
            $('.ajax_cart_shipping_cost').html(freeShippingTranslation);
        else if ((typeof toBeDetermined !== 'undefined') && !hasDeliveryAddress)
            $('.ajax_cart_shipping_cost').html(toBeDetermined);
        if (!jsonData.shippingCostFloat && !jsonData.free_ship)
            $('.ajax_cart_shipping_cost').parent().find('.unvisible').hide();
        else if (hasDeliveryAddress && !jsonData.isVirtualCart)
            $('.ajax_cart_shipping_cost').parent().find('.unvisible').show();
        $('.ajax_cart_tax_cost').text(jsonData.taxCost);
        $('.cart_block_wrapping_cost').text(jsonData.wrappingCost);
        $('.ajax_block_cart_total').text(jsonData.total);
        $('.ajax_block_products_total').text(jsonData.productTotal);
        $('.ajax_total_price_wt').text(jsonData.total_price_wt);
        if (parseFloat(jsonData.freeShippingFloat) > 0)
        {
            $('.ajax_cart_free_shipping').html(jsonData.freeShipping);
            $('.freeshipping').fadeIn(0);
        }
        else if (parseFloat(jsonData.freeShippingFloat) == 0)
            $('.freeshipping').fadeOut(0);
        this.nb_total_products = jsonData.nbTotalProducts;
        if (parseInt(jsonData.nbTotalProducts) > 0)
        {
            $('.ajax_cart_no_product').hide();
            if (jsonData.nbTotalProducts > 9)
                $('.ajax_cart_quantity').addClass('dozens');
            else
                $('.ajax_cart_quantity').removeClass('dozens');
            $('.ajax_cart_quantity').text(jsonData.nbTotalProducts);
            $('.ajax_cart_quantity').fadeIn('slow');
            $('.ajax_cart_total').fadeIn('slow');
            if (parseInt(jsonData.nbTotalProducts) > 1)
            {
                $('.ajax_cart_product_txt').each(function() {
                    $(this).hide();
                });
                $('.ajax_cart_product_txt_s').each(function() {
                    $(this).show();
                });
            }
            else
            {
                $('.ajax_cart_product_txt').each(function() {
                    $(this).show();
                });
                $('.ajax_cart_product_txt_s').each(function() {
                    $(this).hide();
                });
            }
        }
        else
        {
            $('.ajax_cart_product_txt_s, .ajax_cart_product_txt').each(function() {
                $(this).hide();
            });
            $('.ajax_cart_total').each(function() {
                if (!$(this).hasClass('ajax_cart_right'))
                    $(this).hide();
            });
            $('.ajax_cart_quantity').each(function() {
                if (!$(this).hasClass('constantly_show'))
                    $(this).hide();
            });
            $('.ajax_cart_no_product').show('slow');
        }
    }};
function HoverWatcher(selector)
{
    this.hovering = false;
    var self = this;
    this.isHoveringOver = function() {
        return self.hovering;
    }
    $(selector).hover(function() {
        self.hovering = true;
    }, function() {
        self.hovering = false;
    })
}
function crossselling_serialScroll()
{
    if (!!$.prototype.bxSlider)
        $('#blockcart_caroucel').bxSlider({minSlides: 2, maxSlides: 4, slideWidth: 178, slideMargin: 20, moveSlides: 1, infiniteLoop: false, hideControlOnEnd: true, pager: false});
}
;
;
(function($) {
    $.fn.extend({autocomplete: function(urlOrData, options) {
            var isUrl = typeof urlOrData == "string";
            options = $.extend({}, $.Autocompleter.defaults, {url: isUrl ? urlOrData : null, data: isUrl ? null : urlOrData, delay: isUrl ? $.Autocompleter.defaults.delay : 10, max: options && !options.scroll ? 10 : 150}, options);
            options.highlight = options.highlight || function(value) {
                return value;
            };
            options.formatMatch = options.formatMatch || options.formatItem;
            return this.each(function() {
                new $.Autocompleter(this, options);
            });
        }, result: function(handler) {
            return this.bind("result", handler);
        }, search: function(handler) {
            return this.trigger("search", [handler]);
        }, flushCache: function() {
            return this.trigger("flushCache");
        }, setOptions: function(options) {
            return this.trigger("setOptions", [options]);
        }, unautocomplete: function() {
            return this.trigger("unautocomplete");
        }});
    $.Autocompleter = function(input, options) {
        var KEY = {UP: 38, DOWN: 40, DEL: 46, TAB: 9, RETURN: 13, ESC: 27, COMMA: 188, PAGEUP: 33, PAGEDOWN: 34, BACKSPACE: 8};
        var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);
        var timeout;
        var previousValue = "";
        var cache = $.Autocompleter.Cache(options);
        var hasFocus = 0;
        var lastKeyPressCode;
        var config = {mouseDownOnSelect: false};
        var select = $.Autocompleter.Select(options, input, selectCurrent, config);
        var blockSubmit;
        $.browser.opera && $(input.form).bind("submit.autocomplete", function() {
            if (blockSubmit) {
                blockSubmit = false;
                return false;
            }
        });
        $input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function(event) {
            lastKeyPressCode = event.keyCode;
            switch (event.keyCode) {
                case KEY.UP:
                    event.preventDefault();
                    if (select.visible()) {
                        select.prev();
                    } else {
                        onChange(0, true);
                    }
                    break;
                case KEY.DOWN:
                    event.preventDefault();
                    if (select.visible()) {
                        select.next();
                    } else {
                        onChange(0, true);
                    }
                    break;
                case KEY.PAGEUP:
                    event.preventDefault();
                    if (select.visible()) {
                        select.pageUp();
                    } else {
                        onChange(0, true);
                    }
                    break;
                case KEY.PAGEDOWN:
                    event.preventDefault();
                    if (select.visible()) {
                        select.pageDown();
                    } else {
                        onChange(0, true);
                    }
                    break;
                case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
                case KEY.TAB:
                case KEY.RETURN:
                    if (selectCurrent()) {
                        event.preventDefault();
                        blockSubmit = true;
                        return false;
                    }
                    break;
                case KEY.ESC:
                    select.hide();
                    break;
                default:
                    clearTimeout(timeout);
                    timeout = setTimeout(onChange, options.delay);
                    break;
            }
        }).focus(function() {
            hasFocus++;
        }).blur(function() {
            hasFocus = 0;
            if (!config.mouseDownOnSelect) {
                hideResults();
            }
        }).click(function() {
            if (hasFocus++ > 1 && !select.visible()) {
                onChange(0, true);
            }
        }).bind("search", function() {
            var fn = (arguments.length > 1) ? arguments[1] : null;
            function findValueCallback(q, data) {
                var result;
                if (data && data.length) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].result.toLowerCase() == q.toLowerCase()) {
                            result = data[i];
                            break;
                        }
                    }
                }
                if (typeof fn == "function")
                    fn(result);
                else
                    $input.trigger("result", result && [result.data, result.value]);
            }
            $.each(trimWords($input.val()), function(i, value) {
                request(value, findValueCallback, findValueCallback);
            });
        }).bind("flushCache", function() {
            cache.flush();
        }).bind("setOptions", function() {
            $.extend(options, arguments[1]);
            if ("data"in arguments[1])
                cache.populate();
        }).bind("unautocomplete", function() {
            select.unbind();
            $input.unbind();
            $(input.form).unbind(".autocomplete");
        });
        function selectCurrent() {
            var selected = select.selected();
            if (!selected)
                return false;
            var v = selected.result;
            previousValue = v;
            if (options.multiple) {
                var words = trimWords($input.val());
                if (words.length > 1) {
                    v = words.slice(0, words.length - 1).join(options.multipleSeparator) + options.multipleSeparator + v;
                }
                v += options.multipleSeparator;
            }
            $input.val(v);
            hideResultsNow();
            $input.trigger("result", [selected.data, selected.value]);
            return true;
        }
        function onChange(crap, skipPrevCheck) {
            if (lastKeyPressCode == KEY.DEL) {
                select.hide();
                return;
            }
            var currentValue = $input.val();
            if (!skipPrevCheck && currentValue == previousValue)
                return;
            previousValue = currentValue;
            currentValue = lastWord(currentValue);
            if (currentValue.length >= options.minChars) {
                $input.addClass(options.loadingClass);
                if (!options.matchCase)
                    currentValue = currentValue.toLowerCase();
                request(currentValue, receiveData, hideResultsNow);
            } else {
                stopLoading();
                select.hide();
            }
        }
        ;
        function trimWords(value) {
            if (!value) {
                return[""];
            }
            var words = value.split(options.multipleSeparator);
            var result = [];
            $.each(words, function(i, value) {
                if ($.trim(value))
                    result[i] = $.trim(value);
            });
            return result;
        }
        function lastWord(value) {
            if (!options.multiple)
                return value;
            var words = trimWords(value);
            return words[words.length - 1];
        }
        function autoFill(q, sValue) {
            if (options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE) {
                $input.val($input.val() + sValue.substring(lastWord(previousValue).length));
                $.Autocompleter.Selection(input, previousValue.length, previousValue.length + sValue.length);
            }
        }
        ;
        function hideResults() {
            clearTimeout(timeout);
            timeout = setTimeout(hideResultsNow, 200);
        }
        ;
        function hideResultsNow() {
            var wasVisible = select.visible();
            select.hide();
            clearTimeout(timeout);
            stopLoading();
            if (options.mustMatch) {
                $input.search(function(result) {
                    if (!result) {
                        if (options.multiple) {
                            var words = trimWords($input.val()).slice(0, -1);
                            $input.val(words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : ""));
                        }
                        else
                            $input.val("");
                    }
                });
            }
            if (wasVisible)
                $.Autocompleter.Selection(input, input.value.length, input.value.length);
        }
        ;
        function receiveData(q, data) {
            if (data && data.length && hasFocus) {
                stopLoading();
                select.display(data, q);
                autoFill(q, data[0].value);
                select.show();
            } else {
                hideResultsNow();
            }
        }
        ;
        function request(term, success, failure) {
            if (!options.matchCase)
                term = term.toLowerCase();
            var data = cache.load(term);
            if (data && data.length) {
                success(term, data);
            } else if ((typeof options.url == "string") && (options.url.length > 0)) {
                var extraParams = {timestamp: +new Date()};
                $.each(options.extraParams, function(key, param) {
                    extraParams[key] = typeof param == "function" ? param() : param;
                });
                $.ajax({mode: "abort", port: "autocomplete" + input.name, dataType: options.dataType, url: options.url, data: $.extend({q: lastWord(term), limit: options.max}, extraParams), success: function(data) {
                        var parsed = options.parse && options.parse(data) || parse(data);
                        cache.add(term, parsed);
                        success(term, parsed);
                    }});
            } else {
                select.emptyList();
                failure(term);
            }
        }
        ;
        function parse(data) {
            var parsed = [];
            var rows = data.split("\n");
            for (var i = 0; i < rows.length; i++) {
                var row = $.trim(rows[i]);
                if (row) {
                    row = row.split("|");
                    parsed[parsed.length] = {data: row, value: row[0], result: options.formatResult && options.formatResult(row, row[0]) || row[0]};
                }
            }
            return parsed;
        }
        ;
        function stopLoading() {
            $input.removeClass(options.loadingClass);
        }
        ;
    };
    $.Autocompleter.defaults = {inputClass: "ac_input", resultsClass: "ac_results", loadingClass: "ac_loading", minChars: 1, delay: 400, matchCase: false, matchSubset: true, matchContains: false, cacheLength: 10, max: 100, mustMatch: false, extraParams: {}, selectFirst: true, formatItem: function(row) {
            return row[0];
        }, formatMatch: null, autoFill: false, width: 0, multiple: false, multipleSeparator: ", ", highlight: function(value, term) {
            return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
        }, scroll: true, scrollHeight: 180};
    $.Autocompleter.Cache = function(options) {
        var data = {};
        var length = 0;
        function matchSubset(s, sub) {
            if (!options.matchCase)
                s = s.toLowerCase();
            var i = s.indexOf(sub);
            if (i == -1)
                return false;
            return i == 0 || options.matchContains;
        }
        ;
        function add(q, value) {
            if (length > options.cacheLength) {
                flush();
            }
            if (!data[q]) {
                length++;
            }
            data[q] = value;
        }
        function populate() {
            if (!options.data)
                return false;
            var stMatchSets = {}, nullData = 0;
            if (!options.url)
                options.cacheLength = 1;
            stMatchSets[""] = [];
            for (var i = 0, ol = options.data.length; i < ol; i++) {
                var rawValue = options.data[i];
                rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;
                var value = options.formatMatch(rawValue, i + 1, options.data.length);
                if (value === false)
                    continue;
                var firstChar = value.charAt(0).toLowerCase();
                if (!stMatchSets[firstChar])
                    stMatchSets[firstChar] = [];
                var row = {value: value, data: rawValue, result: options.formatResult && options.formatResult(rawValue) || value};
                stMatchSets[firstChar].push(row);
                if (nullData++ < options.max) {
                    stMatchSets[""].push(row);
                }
            }
            ;
            $.each(stMatchSets, function(i, value) {
                options.cacheLength++;
                add(i, value);
            });
        }
        setTimeout(populate, 25);
        function flush() {
            data = {};
            length = 0;
        }
        return{flush: flush, add: add, populate: populate, load: function(q) {
                if (!options.cacheLength || !length)
                    return null;
                if (!options.url && options.matchContains) {
                    var csub = [];
                    for (var k in data) {
                        if (k.length > 0) {
                            var c = data[k];
                            $.each(c, function(i, x) {
                                if (matchSubset(x.value, q)) {
                                    csub.push(x);
                                }
                            });
                        }
                    }
                    return csub;
                } else
                if (data[q]) {
                    return data[q];
                } else
                if (options.matchSubset) {
                    for (var i = q.length - 1; i >= options.minChars; i--) {
                        var c = data[q.substr(0, i)];
                        if (c) {
                            var csub = [];
                            $.each(c, function(i, x) {
                                if (matchSubset(x.value, q)) {
                                    csub[csub.length] = x;
                                }
                            });
                            return csub;
                        }
                    }
                }
                return null;
            }};
    };
    $.Autocompleter.Select = function(options, input, select, config) {
        var CLASSES = {ACTIVE: "ac_over"};
        var listItems, active = -1, data, term = "", needsInit = true, element, list;
        function init() {
            if (!needsInit)
                return;
            element = $("<div/>").hide().addClass(options.resultsClass).css("position", "absolute").appendTo(document.body);
            list = $("<ul/>").appendTo(element).mouseover(function(event) {
                if (target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
                    active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
                    $(target(event)).addClass(CLASSES.ACTIVE);
                }
            }).click(function(event) {
                $(target(event)).addClass(CLASSES.ACTIVE);
                select();
                input.focus();
                return false;
            }).mousedown(function() {
                config.mouseDownOnSelect = true;
            }).mouseup(function() {
                config.mouseDownOnSelect = false;
            });
            if (options.width > 0)
                element.css("width", options.width);
            needsInit = false;
        }
        function target(event) {
            var element = event.target;
            while (element && element.tagName != "LI")
                element = element.parentNode;
            if (!element)
                return[];
            return element;
        }
        function moveSelect(step) {
            listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
            movePosition(step);
            var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
            if (options.scroll) {
                var offset = 0;
                listItems.slice(0, active).each(function() {
                    offset += this.offsetHeight;
                });
                if ((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                    list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
                } else if (offset < list.scrollTop()) {
                    list.scrollTop(offset);
                }
            }
        }
        ;
        function movePosition(step) {
            active += step;
            if (active < 0) {
                active = listItems.size() - 1;
            } else if (active >= listItems.size()) {
                active = 0;
            }
        }
        function limitNumberOfItems(available) {
            return options.max && options.max < available ? options.max : available;
        }
        function fillList() {
            list.empty();
            var max = limitNumberOfItems(data.length);
            for (var i = 0; i < max; i++) {
                if (!data[i])
                    continue;
                var formatted = options.formatItem(data[i].data, i + 1, max, data[i].value, term);
                if (formatted === false)
                    continue;
                var li = $("<li/>").html(options.highlight(formatted, term)).addClass(i % 2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
                $.data(li, "ac_data", data[i]);
            }
            listItems = list.find("li");
            if (options.selectFirst) {
                listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
                active = 0;
            }
            if ($.fn.bgiframe)
                list.bgiframe();
        }
        return{display: function(d, q) {
                init();
                data = d;
                term = q;
                fillList();
            }, next: function() {
                moveSelect(1);
            }, prev: function() {
                moveSelect(-1);
            }, pageUp: function() {
                if (active != 0 && active - 8 < 0) {
                    moveSelect(-active);
                } else {
                    moveSelect(-8);
                }
            }, pageDown: function() {
                if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
                    moveSelect(listItems.size() - 1 - active);
                } else {
                    moveSelect(8);
                }
            }, hide: function() {
                element && element.hide();
                listItems && listItems.removeClass(CLASSES.ACTIVE);
                active = -1;
            }, visible: function() {
                return element && element.is(":visible");
            }, current: function() {
                return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
            }, show: function() {
                var offset = $(input).offset();
                element.css({width: typeof options.width == "string" || options.width > 0 ? options.width : ($(input).width() + parseInt($(input).css('padding-left')) + parseInt($(input).css('padding-right')) + parseInt($(input).css('margin-left')) + parseInt($(input).css('margin-right'))), top: offset.top + input.offsetHeight, left: offset.left}).show();
                if (options.scroll) {
                    list.css({maxHeight: options.scrollHeight, overflow: 'auto'});
                    if ($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
                        var listHeight = 0;
                        listItems.each(function() {
                            listHeight += this.offsetHeight;
                        });
                        var scrollbarsVisible = listHeight > options.scrollHeight;
                        list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight);
                        if (!scrollbarsVisible) {
                            listItems.width(list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")));
                        }
                    }
                }
            }, selected: function() {
                var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
                return selected && selected.length && $.data(selected[0], "ac_data");
            }, emptyList: function() {
                list && list.empty();
            }, unbind: function() {
                element && element.remove();
            }};
    };
    $.Autocompleter.Selection = function(field, start, end) {
        if (field.createTextRange) {
            var selRange = field.createTextRange();
            selRange.collapse(true);
            selRange.moveStart("character", start);
            selRange.moveEnd("character", end);
            selRange.select();
        } else if (field.setSelectionRange) {
            field.setSelectionRange(start, end);
        } else {
            if (field.selectionStart) {
                field.selectionStart = start;
                field.selectionEnd = end;
            }
        }
        field.focus();
    };
})(jQuery);
;
if (typeof (blocksearch_type) == 'undefined')
    var blocksearch_type = 'top';
if (typeof (blocksearch_hide_image) == 'undefined')
    var blocksearch_hide_image = 0;
var instantSearchQueries = [];
$(document).ready(function()
{
    if (typeof blocksearch_type == 'undefined')
        return;
    var $input = $("#search_query_" + blocksearch_type);
    $input.focus(function() {
        $(this).parent().addClass('active');
    }).blur(function() {
        $(this).parent().removeClass('active');
    });
    var width_ac_results = $input.parent('form').outerWidth();
    if (typeof ajaxsearch != 'undefined' && ajaxsearch)
    {
        $input.focus(function() {
            $(this).parent().addClass('active');
        }).blur(function() {
            $(this).parent().removeClass('active');
        });
        var search_query_autocomplete = $input.autocomplete(search_url, {minChars: 3, max: 10, width: ($input.parent().outerWidth() > 0 ? $input.parent().outerWidth() : 306), selectFirst: false, scroll: false, dataType: "json", formatItem: function(data, i, max, value, term) {
                return value;
            }, parse: function(data) {
                if ($('#search_block_top').hasClass('quick_search_simple'))
                    search_query_autocomplete.setOptions({'width': $('#search_block_top').outerWidth() + $('#search_query_top').outerWidth()});
                else
                    search_query_autocomplete.setOptions({'width': $("#search_block_" + blocksearch_type).outerWidth()});
                var mytab = new Array();
                for (var i = 0; i < data.length; i++)
                    if (i == 6) {
                        data[i].pname = 'searchboxsubmit';
                        data[i].product_link = $('#search_query_' + blocksearch_type).val();
                        mytab[mytab.length] = {data: data[i], value: '<div id="ac_search_more"> ' + $("#more_prod_string").html() + ' </div>'};
                        break;
                    } else
                        mytab[mytab.length] = {data: data[i], value: (blocksearch_hide_image ? '' : '<img src="' + data[i].pthumb + '" alt="' + data[i].pname + '" />') + '<span class="ac_product_name">' + data[i].pname + ' </span> '};
                return mytab;
            }, extraParams: {ajaxSearch: 1, id_lang: id_lang}}).result(function(event, data, formatted) {
            if (data.pname == 'searchboxsubmit') {
                $('#search_query_' + blocksearch_type).val(data.product_link);
                $("#searchbox").submit();
            } else {
                $('#search_query_' + blocksearch_type).val(data.pname);
                document.location.href = data.product_link;
            }
        });
    }
    if (typeof instantsearch != 'undefined' && instantsearch)
        $input.keyup(function() {
            if ($(this).val().length > 4)
            {
                stopInstantSearchQueries();
                instantSearchQuery = $.ajax({url: search_url + '?rand=' + new Date().getTime(), data: {instantSearch: 1, id_lang: id_lang, q: $(this).val()}, dataType: 'html', type: 'POST', headers: {"cache-control": "no-cache"}, async: true, cache: false, success: function(data) {
                        if ($input.val().length > 0)
                        {
                            tryToCloseInstantSearch();
                            $('#center_column').attr('id', 'old_center_column');
                            $('#old_center_column').after('<div id="center_column" class="' + $('#old_center_column').attr('class') + '">' + data + '</div>').hide();
                            ajaxCart.overrideButtonsInThePage();
                            $("#instant_search_close").on('click', function() {
                                $input.val('');
                                return tryToCloseInstantSearch();
                            });
                            return false;
                        }
                        else
                            tryToCloseInstantSearch();
                    }});
                instantSearchQueries.push(instantSearchQuery);
            }
            else
                tryToCloseInstantSearch();
        });
});
function tryToCloseInstantSearch()
{
    var $oldCenterColumn = $('#old_center_column');
    if ($oldCenterColumn.length > 0)
    {
        $('#center_column').remove();
        $oldCenterColumn.attr('id', 'center_column').show();
        return false;
    }
}
function stopInstantSearchQueries()
{
    for (var i = 0; i < instantSearchQueries.length; i++)
        instantSearchQueries[i].abort();
    instantSearchQueries = [];
}
;
;
(function($) {
    $.fn.textareaCount = function(options, fn) {
        var defaults = {maxCharacterSize: -1, originalStyle: 'originalTextareaInfo', warningStyle: 'warningTextareaInfo', warningNumber: 20, displayFormat: '#input characters | #words words'};
        var options = $.extend(defaults, options);
        var container = $(this);
        $("<div class='charleft'>&nbsp;</div>").insertAfter(container);
        var charLeftCss = {'width': container.width()};
        var charLeftInfo = getNextCharLeftInformation(container);
        charLeftInfo.addClass(options.originalStyle);
        charLeftInfo.css(charLeftCss);
        var numInput = 0;
        var maxCharacters = options.maxCharacterSize;
        var numLeft = 0;
        var numWords = 0;
        container.bind('keyup', function(event) {
            limitTextAreaByCharacterCount();
        }).bind('mouseover', function(event) {
            setTimeout(function() {
                limitTextAreaByCharacterCount();
            }, 10);
        }).bind('paste', function(event) {
            setTimeout(function() {
                limitTextAreaByCharacterCount();
            }, 10);
        });
        function limitTextAreaByCharacterCount() {
            charLeftInfo.html(countByCharacters());
            if (typeof fn != 'undefined') {
                fn.call(this, getInfo());
            }
            return true;
        }
        function countByCharacters() {
            var content = container.val();
            var contentLength = content.length;
            if (options.maxCharacterSize > 0) {
                if (contentLength >= options.maxCharacterSize) {
                    content = content.substring(0, options.maxCharacterSize);
                }
                var newlineCount = getNewlineCount(content);
                var systemmaxCharacterSize = options.maxCharacterSize - newlineCount;
                if (!isWin()) {
                    systemmaxCharacterSize = options.maxCharacterSize
                }
                if (contentLength > systemmaxCharacterSize) {
                    var originalScrollTopPosition = this.scrollTop;
                    container.val(content.substring(0, systemmaxCharacterSize));
                    this.scrollTop = originalScrollTopPosition;
                }
                charLeftInfo.removeClass(options.warningStyle);
                if (systemmaxCharacterSize - contentLength <= options.warningNumber) {
                    charLeftInfo.addClass(options.warningStyle);
                }
                numInput = container.val().length + newlineCount;
                if (!isWin()) {
                    numInput = container.val().length;
                }
                numWords = countWord(getCleanedWordString(container.val()));
                numLeft = maxCharacters - numInput;
            } else {
                var newlineCount = getNewlineCount(content);
                numInput = container.val().length + newlineCount;
                if (!isWin()) {
                    numInput = container.val().length;
                }
                numWords = countWord(getCleanedWordString(container.val()));
            }
            return formatDisplayInfo();
        }
        function formatDisplayInfo() {
            var format = options.displayFormat;
            format = format.replace('#input', numInput);
            format = format.replace('#words', numWords);
            if (maxCharacters > 0) {
                format = format.replace('#max', maxCharacters);
                format = format.replace('#left', numLeft);
            }
            return format;
        }
        function getInfo() {
            var info = {input: numInput, max: maxCharacters, left: numLeft, words: numWords};
            return info;
        }
        function getNextCharLeftInformation(container) {
            return container.next('.charleft');
        }
        function isWin() {
            var strOS = navigator.appVersion;
            if (strOS.toLowerCase().indexOf('win') != -1) {
                return true;
            }
            return false;
        }
        function getNewlineCount(content) {
            var newlineCount = 0;
            for (var i = 0; i < content.length; i++) {
                if (content.charAt(i) == '\n') {
                    newlineCount++;
                }
            }
            return newlineCount;
        }
        function getCleanedWordString(content) {
            var fullStr = content + " ";
            var initial_whitespace_rExp = /^[^A-Za-z0-9]+/gi;
            var left_trimmedStr = fullStr.replace(initial_whitespace_rExp, "");
            var non_alphanumerics_rExp = rExp = /[^A-Za-z0-9]+/gi;
            var cleanedStr = left_trimmedStr.replace(non_alphanumerics_rExp, " ");
            var splitString = cleanedStr.split(" ");
            return splitString;
        }
        function countWord(cleanedWordString) {
            var word_count = cleanedWordString.length - 1;
            return word_count;
        }}
    ;
})(jQuery);
;
$(document).ready(function() {
    $('input.star').rating();
    $('.auto-submit-star').rating();
    if (!!$.prototype.fancybox)
        $('.open-comment-form').fancybox({'autoSize': false, 'width': 600, 'height': 'auto', 'hideOnContentClick': false});
    $(document).on('click', '#id_new_comment_form .closefb', function(e) {
        e.preventDefault();
        $.fancybox.close();
    });
    $(document).on('click', 'a[href=#idTab5]', function(e) {
        $('*[id^="idTab"]').addClass('block_hidden_only_for_screen');
        $('div#idTab5').removeClass('block_hidden_only_for_screen').addClass('open');
        $('ul#more_info_tabs a[href^="#idTab"]').removeClass('selected');
        $('a[href="#idTab5"]').addClass('selected');
        $.scrollTo('#idTab5', 400, {'offset': -150});
        return false;
    });
    $(document).on('click', '.usefulness_btn', function(e) {
        if ($(this).hasClass('useful_done'))
            return false;
        if (!$(this).hasClass('logged'))
        {
            if (!!$.prototype.fancybox)
                $.fancybox.open([{type: 'inline', autoScale: true, minHeight: 30, content: '<p class="fancybox-error">' + comment_actions_login_first + '</p>'}], {padding: 0});
            else
                alert(comment_actions_login_first);
            return false;
        }
        var id_product_comment = $(this).data('id-product-comment');
        var is_usefull = $(this).data('is-usefull');
        var curr_number = parseInt($(this).find('span').text(), 10);
        curr_number = curr_number > 0 ? curr_number + 1 : 1;
        var that = $(this);
        $.ajax({url: productcomments_controller_url + '?rand=' + new Date().getTime(), data: {id_product_comment: id_product_comment, action: 'comment_is_usefull', value: is_usefull}, type: 'POST', headers: {"cache-control": "no-cache"}, success: function(result) {
                if (result == 1)
                {
                    that.addClass('useful_done').find('span').html(curr_number).end().siblings().addClass('useful_done');
                    if (!!$.prototype.fancybox)
                        $.fancybox.open([{type: 'inline', autoScale: true, minHeight: 30, content: '<p class="fancybox-error">' + comment_success_msg + '</p>'}], {padding: 0});
                    else
                        alert(comment_success_msg);
                }
                else
                if (!!$.prototype.fancybox)
                    $.fancybox.open([{type: 'inline', autoScale: true, minHeight: 30, content: '<p class="fancybox-error">' + comment_actions_failure + '</p>'}], {padding: 0});
                else
                    alert(comment_actions_failure);
            }});
    });
    $(document).on('click', 'span.report_btn', function(e) {
        if (confirm(confirm_report_message))
        {
            var idProductComment = $(this).data('id-product-comment');
            var parent = $(this).parent();
            $.ajax({url: productcomments_controller_url + '?rand=' + new Date().getTime(), data: {id_product_comment: idProductComment, action: 'report_abuse'}, type: 'POST', headers: {"cache-control": "no-cache"}, success: function(result) {
                    parent.fadeOut('slow', function() {
                        parent.remove();
                    });
                }});
        }
    });
    $(document).on('click', '#submitNewMessage', function(e) {
        e.preventDefault();
        url_options = '?';
        if (!productcomments_url_rewrite)
            url_options = '&';
        $.ajax({url: productcomments_controller_url + url_options + 'action=add_comment&secure_key=' + secure_key + '&rand=' + new Date().getTime(), data: $('#id_new_comment_form').serialize(), type: 'POST', headers: {"cache-control": "no-cache"}, dataType: "json", success: function(data) {
                if (data.result)
                {
                    $.fancybox.close();
                    var buttons = {};
                    buttons[productcomment_ok] = "productcommentRefreshPage";
                    fancyChooseBox(moderation_active ? productcomment_added_moderation : productcomment_added, productcomment_title, buttons);
                }
                else
                {
                    $('#new_comment_form_error ul').html('');
                    $.each(data.errors, function(index, value) {
                        $('#new_comment_form_error ul').append('<li>' + value + '</li>');
                    });
                    $('#new_comment_form_error').slideDown('slow');
                }
            }});
    });
});
function productcommentRefreshPage()
{
    window.location.reload();
}
;