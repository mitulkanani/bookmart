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
;
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
            ajaxCart.remove(productId, productAttributeId, customizationId, idAddressDelivery);
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
                                if (contentOnly) {
                                    window.parent.ajaxCart.updateLayer(this, jsonData, addedFromProductPage, callerElement);
                                }
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
    }, remove: function(idProduct, idCombination, customizationId, idAddressDelivery) {
        $.ajax({type: 'POST', headers: {"cache-control": "no-cache"}, url: baseUri + 'rand', async: true, cache: false, dataType: "json", data: 'controller=cart&delete=1&id_product=' + idProduct + '&ipa=' + ((idCombination != null && parseInt(idCombination)) ? idCombination : '') + ((customizationId && customizationId != null) ? '&id_customization=' + customizationId : '') + '&id_address_delivery=' + idAddressDelivery + '&token=' + static_token + '&ajax=true', success: function(jsonData) {
                ajaxCart.updateCart(jsonData);
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
                    if (jsonData.products[aProduct]['id'] == ids[0] && (!ids[1] || jsonData.products[aProduct]['idCombination'] == ids[1]))
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
            $('div[data-id="' + domIdProduct + '"]' + ' span.remove_link').html('<a class="ajax_cart_block_remove_link" rel="nofollow" href="' + baseUri + '?controller=cart&amp;delete=1&amp;id_product=' + product['id'] + '&amp;ipa=' + product['idCombination'] + '&amp;token=' + static_token + '"><i class="icon-cancel icon-small"></i></a>');
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
                    var content = '<dt class="clearfix unvisible" data-id="cart_block_product_' + domIdProduct + '">';
                    var name = $.trim($('<span />').html(this.name).text());
                    name = (name.length > 16 ? name.substring(0, 14) + '...' : name);
                    content += '<a class="cart-images" href="' + this.link + '" title="' + name + '"><img  src="' + this.image_cart + '" alt="' + this.name + '"></a>';
                    content += '<span class="quantity-formated"><span class="quantity">' + this.quantity + '</span>x</span><a href="' + this.link + '" title="' + this.name + '" class="cart_block_product_name">' + name + '</a>';
                    if (typeof (this.is_gift) == 'undefined' || this.is_gift == 0)
                        content += '<span class="remove_link"><a rel="nofollow" class="ajax_cart_block_remove_link" href="' + baseUri + '?controller=cart&amp;delete=1&amp;id_product=' + productId + '&amp;token=' + static_token + (this.hasAttributes ? '&amp;ipa=' + parseInt(this.idCombination) : '') + '"><i class="icon-cancel icon-small"></i></a></span>';
                    else
                        content += '<span class="remove_link"></span>';
                    if (typeof (freeProductTranslation) != 'undefined')
                        content += '<span class="price">' + (parseFloat(this.price_float) > 0 ? this.priceByLine : freeProductTranslation) + '</span>';
                    if (this.hasAttributes)
                        content += '<div class="product-atributes"><a href="' + this.link + '" title="' + this.name + '">' + this.attributes + '</a></div>';
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
                    if ($.trim($('dt[data-id="cart_block_product_' + domIdProduct + '"] .quantity').html()) != jsonProduct.quantity || $.trim($('dt[data-id="cart_block_product_' + domIdProduct + '"] .price').html()) != jsonProduct.priceByLine)
                    {
                        if (!this.is_gift)
                            $('dt[data-id="cart_block_product_' + domIdProduct + '"] .price').text(jsonProduct.priceByLine);
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
            content += '<li name="customization"><div class="deleteCustomizableProduct" data-id="deleteCustomizableProduct_' + c_customizationId + '_' + productId + '_' + (productAttributeId ? productAttributeId : '0') + '"><a rel="nofollow" class="ajax_cart_block_remove_link" href="' + baseUri + '?controller=cart&amp;delete=1&amp;id_product=' + productId + '&amp;ipa=' + productAttributeId + '&amp;id_customization=' + c_customizationId + '&amp;token=' + static_token + '"><i class="icon-cancel icon-small"></i></a></div>';
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
            $('#layer_cart_product_title').text(product.full_name);
            $('#layer_cart_product_attributes').text('');
            if (product.hasAttributes && product.hasAttributes == true)
                $('#layer_cart_product_attributes').html(product.attributes);
            $('#layer_cart_product_price').text(product.price);
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
            ajaxCart.hideOldProducts(jsonData);
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
$(document).ready(function() {
    $('#home-page-tabs li:first, #index .tab-content ul:first').addClass('active');
});