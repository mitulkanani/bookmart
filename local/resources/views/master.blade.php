<!DOCTYPE HTML> 
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en-us"><![endif]--> 
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8 ie7" lang="en-us"><![endif]--> <!--[if IE 8]>
<html class="no-js lt-ie9 ie8" lang="en-us"><![endif]--> <!--[if gt IE 8]>
<html class="no-js ie9" lang="en-us"><![endif]-->
<html lang="en-us">
    <head>
        <meta charset="utf-8" />
        <title>rentYaar</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, minimum-scale=0.25, maximum-scale=1.6, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <!--<link rel="stylesheet" href="{{ asset('/css/bootstrap.min.css')}}">-->
        <link rel="icon" type="image/vnd.microsoft.icon" href="{{ asset('/images/upload/favicon-12.ico?1443194111')}}" />
        <link href='https://fonts.googleapis.com/css?family=Raleway:400,100,300,500,600,700,900,800' rel='stylesheet' type='text/css'/>

        <link rel="stylesheet" href="{{ asset('/css/cart/custom2.css')}}">
        <link rel="stylesheet" href="{{ asset('/css/cart/theme.css')}}" type="text/css" media="all" />
        <link rel="stylesheet" href="{{ asset('/css/cart/customer_s12.css')}}">
        <link id="main-style" rel="stylesheet" href="{{ asset('/css/style2.css')}}">   
        
        <script type="text/javascript" src="{{ asset('/js/cart/jquery-2.1.4.js')}}"></script>
        <script type="text/javascript" src="{{ asset('/js/cart/iosSlider.js')}}"></script>
        <script type="text/javascript" src="{{ asset('/js/cart/privet.js')}}"></script>
        <script type="text/javascript" src="{{ asset('/js/front/main.js')}}"></script>
        <script type="text/javascript" src="{{ asset('/js/cart/owl.carousel.min.js')}}"></script>
        <script type="text/javascript" src="{{ asset('/js/front/jquery.mixitup.min.js')}}"></script>

    </head>
    <body id="index" class="index hide-left-column hide-right-column lang_en slide_lr_column ">
        <div id="body_wrapper">

            @include('front.home_header')

            @yield('content')

            @include('front.home_footer')

        </div>
        <div id="rightbar" class="">
            <div id="rightbar_inner" class="clearfix rightbar_2">
                <div id="rightbar_cart" class="rightbar_wrap">
                    <a id="rightbar-shopping_cart" href="http://transformer.sunnytoo.com/twelfth/en/order"
                       class="rightbar_tri icon_wrap" title="View my shopping cart"> 
                        <i class="icon-basket icon_btn icon-0x"></i> 
                        <span class="icon_text">Cart</span> 
                        <span class="ajax_cart_quantity amount_circle simple_hidden ">0</span> 
                    </a>
                </div>
                <div id="to_top_wrap">
                    <div id="to_top">
                        <a href="#top_bar" class="icon_wrap disabled" title="Back to top">
                            <i class="icon-up-open-2 icon-0x"></i>
                            <span class="icon_text">Top</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="st-side">
            <div id="stmobileadvancedmenu" class="st-side-content">
                <ul class="mo_advanced_mu_level_0">
                    <li class="mo_advanced_ml_level_0 mo_advanced_ml_column">
                        <a id="st_mo_advanced_ma_431" href="rentyaar/"
                           class="mo_advanced_ma_level_0" title="Home">Home</a>
                    </li>
                    <li class="mo_advanced_ml_level_0 mo_advanced_ml_column">
                        <a id="st_mo_advanced_ma_436" href="http://transformer.sunnytoo.com/twelfth/en/3-fashion"
                           class="mo_advanced_ma_level_0" title="Fashion">Fashion</a> <span class="opener">&nbsp;</span>
                        <ul class="mo_advanced_mu_level_1 mo_advanced_sub_ul">
                            <li class="mo_advanced_ml_level_1 mo_advanced_sub_li">
                                <a href="http://transformer.sunnytoo.com/twelfth/en/24-shoes" title="Shoes" class="mo_advanced_ma_level_1 mo_advanced_sub_a">Shoes</a> <span class="opener">&nbsp;</span>
                                <ul class="mo_advanced_sub_ul mo_advanced_mu_level_2 p_granditem_1">
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/28-sandals" title="Sandals" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Sandals</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/27-flats" title="Flats" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Flats</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/26-wedges" title="Wedges" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Wedges</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/25-hells" title="Hells" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Hells</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="mo_advanced_mu_level_1 mo_advanced_sub_ul">
                            <li class="mo_advanced_ml_level_1 mo_advanced_sub_li">
                                <a href="http://transformer.sunnytoo.com/twelfth/en/19-fashion-accessories" title="Fashion Accessories" class="mo_advanced_ma_level_1 mo_advanced_sub_a">Fashion Accessories</a> <span class="opener">&nbsp;</span>
                                <ul class="mo_advanced_sub_ul mo_advanced_mu_level_2 p_granditem_1">
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/22-fashion-belt" title="Fashion Belt" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Fashion Belt</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/23-fashion-umbrellas" title="Fashion Umbrellas" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Fashion Umbrellas</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/21-headwear" title="Headwear" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Headwear</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/20-fashion-jewelry" title="Fashion Jewelry" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Fashion Jewelry</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="mo_advanced_mu_level_1 mo_advanced_sub_ul">
                            <li class="mo_advanced_ml_level_1 mo_advanced_sub_li">
                                <a href="http://transformer.sunnytoo.com/twelfth/en/29-fur-leather" title="Fur &amp; Leather" class="mo_advanced_ma_level_1 mo_advanced_sub_a">Fur &amp; Leather</a> <span class="opener">&nbsp;</span>
                                <ul class="mo_advanced_sub_ul mo_advanced_mu_level_2 p_granditem_1">
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/32-fur-scarves" title="Fur Scarves" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Fur Scarves</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/31-fur-wraps" title="Fur Wraps" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Fur Wraps</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/30-coats-jackets" title="Coats &amp; Jackets" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Coats &amp; Jackets</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="mo_advanced_mu_level_1 mo_advanced_sub_ul">
                            <li class="mo_advanced_ml_level_1 mo_advanced_sub_li">
                                <a href="http://transformer.sunnytoo.com/twelfth/en/9-lingerie" title="Lingerie" class="mo_advanced_ma_level_1 mo_advanced_sub_a">Lingerie</a> <span class="opener">&nbsp;</span>
                                <ul class="mo_advanced_sub_ul mo_advanced_mu_level_2 p_granditem_1">
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/13-womens-bras" title="Womens Bras" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Womens Bras</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/12-fashion-hosiery" title="Fashion Hosiery" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Fashion Hosiery</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/11-women-nightwear" title="Women Nightwear" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Women Nightwear</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/10-swimwear" title="Swimwear" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Swimwear</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="mo_advanced_mu_level_1 mo_advanced_sub_ul">
                            <li class="mo_advanced_ml_level_1 mo_advanced_sub_li">
                                <a href="http://transformer.sunnytoo.com/twelfth/en/14-hanbags" title="Hanbags" class="mo_advanced_ma_level_1 mo_advanced_sub_a">Hanbags</a> <span class="opener">&nbsp;</span>
                                <ul class="mo_advanced_sub_ul mo_advanced_mu_level_2 p_granditem_1">
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/15-corssbody" title="Corssbody" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Corssbody</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/16-satchel" title="Satchel" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Satchel</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/17-totes" title="Totes" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Totes</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/18-ladies-wallets" title="Ladies Wallets" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Ladies Wallets</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="mo_advanced_mu_level_1 mo_advanced_sub_ul">
                            <li class="mo_advanced_ml_level_1 mo_advanced_sub_li">
                                <a href="http://transformer.sunnytoo.com/twelfth/en/4-women-s-clothing" title="Women&#039;s Clothing" class="mo_advanced_ma_level_1 mo_advanced_sub_a">Women&#039;s Clothing</a> <span class="opener">&nbsp;</span>
                                <ul class="mo_advanced_sub_ul mo_advanced_mu_level_2 p_granditem_1">
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/8-botoms" title="Botoms" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Botoms</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/7-outerwears" title="Outerwears" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Outerwears</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/6-tops" title="Tops" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Tops</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/5-dresses" title="Dresses" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Dresses</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="mo_advanced_ml_level_0 mo_advanced_ml_column">
                        <a id="st_mo_advanced_ma_458" href="javascript:;" class="mo_advanced_ma_level_0" title="Select store">Select store<span class="cate_label">Hot</span></a> <span class="opener">&nbsp;</span>
                        <div id="st_advanced_menu_block_459" class="stmobileadvancedmenu_column style_content">
                            <div class="row">
                                <div class="col-md-2 text-center">
                                    <a title="Go to store 12" href="/twelfth" rel="nofollow"><img class="hover_effect" src="images/upload/v12.jpg" alt="" width="164" height="109" /></a>
                                    <div><a class="ma_level_1" title="Go to store 12" href="/twelfth" rel="nofollow">Go to store 12</a></div>
                                    <p class="mar_b2">Cosmos, black background</p>
                                    <a title="Go to store 10" href="/tenth" rel="nofollow"><img class="hover_effect" src="images/upload/v12.jpg" alt="" width="164" height="109" /></a>
                                    <div><a class="ma_level_1" title="Go to store 10" href="/tenth" rel="nofollow">Go to store 10</a></div>
                                    <p>White, Parallax background</p>
                                </div>
                                <div class="col-md-2 text-center">
                                    <a title="Main demo" href="/" rel="nofollow"><img class="hover_effect" src="images/upload/v12.jpg" alt="" width="164" height="109" /></a>
                                    <div><a class="ma_level_1" title="Main demo" href="/" rel="nofollow">Go to main demo</a></div>
                                    <p class="mar_b2">Green, main demo</p>
                                    <a title="Go to store 6" href="/sixth" rel="nofollow"><img class="hover_effect" src="images/upload/v12.jpg" alt="" width="164" height="109" /></a>
                                    <div><a class="ma_level_1" title="Go to store 6" href="/sixth" rel="nofollow">Go to store 6</a></div>
                                    <p>Yellow, stretched</p>
                                </div>
                                <div class="col-md-2 text-center">
                                    <a title="Go to store 2" href="/second" rel="nofollow"><img class="hover_effect" src="images/upload/v12.jpg" alt="" width="164" height="109" /></a>
                                    <div><a class="ma_level_1" title="Go to store 2" href="/second" rel="nofollow">Go to store 2</a></div>
                                    <p class="mar_b2">Gray, boxed, 960px</p>
                                    <a title="Go to store 7" href="/seventh" rel="nofollow"><img class="hover_effect" src="images/upload/v12.jpg" alt="" width="164" height="109" /></a>
                                    <div><a class="ma_level_1" title="Go to store 7" href="/seventh" rel="nofollow">Go to store 7</a></div>
                                    <p>Black, Parallax</p>
                                </div>
                                <div class="col-md-2 text-center">
                                    <a title="Go to store 3" href="/third" rel="nofollow"><img class="hover_effect" src="images/upload/v12.jpg" alt="" width="164" height="109" /></a>
                                    <div><a class="ma_level_1" title="Go to store 3" href="/third" rel="nofollow">Go to store 3</a></div>
                                    <p class="mar_b2">Red, stretched</p>
                                    <a title="Go to store 8" href="/eighth" rel="nofollow">
                                        <img class="hover_effect" src="images/upload/v12.jpg" alt="" width="164" height="109" /></a>
                                    <div><a class="ma_level_1" title="Go to store 8" href="/eighth" rel="nofollow">Go to store 8</a></div>
                                    <p>Dark, Fullscreen slider</p>
                                </div>
                                <div class="col-md-2 text-center">
                                    <a title="Go to store 4" href="/fourth" rel="nofollow"><img class="hover_effect" src="images/upload/v12.jpg" alt="" width="164" height="109" /></a>
                                    <div><a class="ma_level_1" title="Go to store 4" href="/fourth" rel="nofollow">Go to store 4</a></div>
                                    <p class="mar_b2">Green, boxed, 1200px</p>
                                    <a title="Go to store 9" href="/ninth" rel="nofollow"><img class="hover_effect" src="images/upload/v12.jpg" alt="" width="164" height="109" />
                                    </a>
                                    <div><a class="ma_level_1" title="Go to store 9" href="/ninth" rel="nofollow">Go to store 9</a></div>
                                    <p>Light blue, Left menu</p>
                                </div>
                                <div class="col-md-2 text-center">
                                    <a title="Go to store 5" href="/fifth" rel="nofollow"><img class="hover_effect" src="images/upload/v12.jpg" alt="" width="164" height="109" /></a>
                                    <div><a class="ma_level_1" title="Go to store 5" href="/fifth" rel="nofollow">Go to store 5</a></div>
                                    <p class="mar_b2">Brown, logon center</p>
                                    <a title="Go to store 11" href="/eleventh" rel="nofollow"><img class="hover_effect" src="images/upload/v12.jpg" alt="" width="164" height="109" /></a>
                                    <div><a class="ma_level_1" title="Go to store 11" href="/eleventh" rel="nofollow">Go to store 11</a></div>
                                    <p>RTL</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="mo_advanced_ml_level_0 mo_advanced_ml_column">
                        <a id="st_mo_advanced_ma_437" href="http://transformer.sunnytoo.com/twelfth/en/9-lingerie" class="mo_advanced_ma_level_0" title="Lingerie">Lingerie</a> <span class="opener">&nbsp;</span>
                        <ul class="mo_advanced_mu_level_1 mo_advanced_sub_ul">
                            <li class="mo_advanced_ml_level_1 mo_advanced_sub_li"> <a href="http://transformer.sunnytoo.com/twelfth/en/13-womens-bras" title="Womens Bras" class="mo_advanced_ma_level_1 mo_advanced_sub_a">Womens Bras</a></li>
                        </ul>
                        <ul class="mo_advanced_mu_level_1 mo_advanced_sub_ul">
                            <li class="mo_advanced_ml_level_1 mo_advanced_sub_li"> <a href="http://transformer.sunnytoo.com/twelfth/en/12-fashion-hosiery" title="Fashion Hosiery" class="mo_advanced_ma_level_1 mo_advanced_sub_a">Fashion Hosiery</a></li>
                        </ul>
                        <ul class="mo_advanced_mu_level_1 mo_advanced_sub_ul">
                            <li class="mo_advanced_ml_level_1 mo_advanced_sub_li"> <a href="http://transformer.sunnytoo.com/twelfth/en/11-women-nightwear" title="Women Nightwear" class="mo_advanced_ma_level_1 mo_advanced_sub_a">Women Nightwear</a></li>
                        </ul>
                        <ul class="mo_advanced_mu_level_1 mo_advanced_sub_ul">
                            <li class="mo_advanced_ml_level_1 mo_advanced_sub_li">
                                <a href="http://transformer.sunnytoo.com/twelfth/en/10-swimwear" title="Swimwear" class="mo_advanced_ma_level_1 mo_advanced_sub_a">Swimwear</a> <span class="opener">&nbsp;</span>
                                <ul class="mo_advanced_sub_ul mo_advanced_mu_level_2 p_granditem_1">
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/52-bikinis" title="Bikinis" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">Bikinis</a></li>
                                    <li class="mo_advanced_sub_li mo_advanced_ml_level_2 granditem_0 p_granditem_1"> <a href="http://transformer.sunnytoo.com/twelfth/en/53-one-pieces" title="One pieces" class="mo_advanced_sub_a mo_advanced_ma_level_2 advanced_ma_item ">One pieces</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="mo_advanced_ml_level_0 mo_advanced_ml_column"> <a id="st_mo_advanced_ma_461" href="http://transformer.sunnytoo.com/twelfth/en/blog" class="mo_advanced_ma_level_0" title="Blog">Blog</a></li>
                    <li class="mo_advanced_ml_level_0 mo_advanced_ml_column"> <a id="st_mo_advanced_ma_462" href="http://themeforest.net/item/transformer-responsive-prestashop-theme/5095795?ref=tantan199" class="mo_advanced_ma_level_0" title="Buy theme">Buy theme</a></li>
                </ul>
            </div>
            <div id="blockcart_mobile_wrap" class="blockcart_wrap st-side-content">
                <div id="cart_block_mobile" class="cart_block block exclusive">
                    <div class="block_content">
                        <div class="cart_block_list">
                            <p class="cart_block_no_products alert alert-warning"> No products</p>
                            <div class="cart-prices unvisible">
                                <div class="cart-prices-line first-line"> 
                                    <span class="price cart_block_shipping_cost ajax_cart_shipping_cost unvisible"> To be determined </span> 
                                    <span class="unvisible"> Shipping </span>
                                </div>
                                <div class="cart-prices-line last-line">
                                    <span class="price cart_block_total ajax_block_cart_total">$0.00</span>
                                    <span>Total</span>
                                </div>
                            </div>
                            <p class="cart-buttons unvisible"> 
                                <a id="button_order_cart" class="btn btn-default" href="http://transformer.sunnytoo.com/twelfth/en/order" title="Check out" rel="nofollow">Check out</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="search_block_mobile_bar" class="st-side-content clearfix">
                <form id="searchbox_mobile_bar" method="get" action="http://transformer.sunnytoo.com/twelfth/en/search" >
                    <div class="searchbox_inner"> <input type="hidden" name="controller" value="search" /> 
                        <input type="hidden" name="orderby" value="position" />
                        <input type="hidden" name="orderway" value="desc" /> 
                        <input class="search_query form-control" type="text" id="search_query_mobile_bar" name="search_query" placeholder="Search here" value="" autocomplete="off" />
                        <a href="javascript:;" title="Search" rel="nofollow" id="submit_searchbox_mobile_bar" class="submit_searchbox icon_wrap">
                            <i class="icon-search-1 icon-0x"></i>
                            <span class="icon_text">Search</span>
                        </a>
                    </div>
                </form>
            </div>
        </div>
        <div id="st-side-close"><i class="icon-cancel-2 close-st-side"></i></div>
        <div id="st-side-overlay"></div>
        <div id="layer_compare" class="layer_box">
            <div class="layer_inner_box">
                <div class="layer_product clearfix mar_b10">
                    <span class="cross" title="Close window"></span>
                    <div class="product-image-container layer_compare_img"></div>
                    <div class="layer_product_info">
                        <span id="layer_compare_product_title" class="product-name"></span>
                    </div>
                </div>
                <div id="compare_add_success" class="success hidden">has been added to compare.</div>
                <div id="compare_remove_success" class="success hidden">has been removed from compare.
                </div>
                <div class="button-container clearfix">
                    <a class="continue pull-left btn btn-default" href="javascript:;" rel="nofollow">Continue shopping</a>
                    <a class="pull-right btn btn-default layer_compare_btn" href="http://transformer.sunnytoo.com/twelfth/en/products-comparison" title="Compare" rel="nofollow">Compare</a>
                </div>
            </div>
        </div>
        <div class="layer_compare_overlay layer_overlay">
            <?php // $value = Session::get('id_product'); dd($value); ?>
        </div>

    </body>
    <script type="text/javascript">/* <![CDATA[ */;
var CUSTOMIZE_TEXTFIELD = 1;
var FancyboxI18nNext = 'Next';
var FancyboxI18nPrev = 'Previous';
var FancyboxboxI18nClose = 'Close';
var added_to_wishlist = 'The product was successfully added to your wishlist.';
var ajax_allowed = true;
var ajaxsearch = true;
var baseDir = 'http://localhost/bookmart/';
var baseUri = 'http://localhost/bookmart/';
var allowBuyWhenOutOfStock = false;
var attribute_anchor_separator = '-';
var attributesCombinations = [];
var availableLaterValue = 'Current supply. Ordering availlable';
var availableNowValue = 'In stock';
var blocksearch_hide_image = 0;
var blocksearch_type = 'top';
var comparator_max_item = 3;
var comparedProductsIds = [];
var contentOnly = false;
var comment_actions_failure = 'An error occurred. Maybe a network problem or you already set.';
var comment_actions_login_first = 'Please login first!';
var comment_success_msg = 'Success! Thank you!';
var confirm_report_message = 'Are you sure that you want to report this comment?';
var currency = {"id": 1, "name": "Ruppe", "iso_code": "USD", "iso_code_num": "840", "sign": "$", "blank": "0",
    "conversion_rate": "1.000000",
    "deleted": "0", "format": "1",
    "decimals": "1", "active": "1", "prefix": "$ ", "suffix": "", "id_shop_list": null,
    "force_id": false};
var currencyBlank = 0;
var currencyFormat = 1;
var currencyRate = 1;
var currencySign = '$';
var currentDate = '2016-04-07 03:11:24';
var customizationIdMessage = 'Customization #';
var delete_txt = 'Delete';
var displayList = false;
var freeProductTranslation = 'Free!';
var freeShippingTranslation = 'Free shipping!';
var generated_date = 1459742536;
var hasDeliveryAddress = false;
var highDPI = false;
var id_lang = 1;
var customerGroupWithoutTax = true;
var customizationFields = false;
var customizationId = null;
var default_eco_tax = 0;
var discount_percentage = 0;
var displayPrice = 1;
var doesntExist = 'This combination does not exist for this product. Please select another combination.';
var doesntExistNoMore = 'This product is no longer in stock';
var doesntExistNoMoreBut = 'with those attributes but is available with others.';
var ecotaxTax_rate = 0;
var fieldRequired = 'Please fill in all the required fields before saving your customization.';
var groupReduction = 0;
var idDefaultImage = 101;
var id_product = 46;

var img_dir = 'http://localhost/bookmart/';
var instantsearch = false;
var isGuest = 0;
var isLogged = 0;
var isMobile = false;
var loggin_required = 'You must be logged in to manage your wishlist.';
var max_item = 'You cannot add more than 3 product(s) to the product comparison';
var min_item = 'Please select at least one product';
var img_prod_dir = 'http://transformer.sunnytoo.com/twelfth/img/p/';
var img_ps_dir = 'http://transformer.sunnytoo.com/twelfth/img/';
var jqZoomEnabled = true;
var maxQuantityToAllowDisplayOfLastQuantityMessage = 3;
var minimalQuantity = 1;
var moderation_active = false;
var mywishlist_url = 'http://transformer.sunnytoo.com/twelfth/en/module/blockwishlist/mywishlist';
var priceDisplayMethod = 1;
var priceDisplayPrecision = 2;
var quickView = true;
var quickViewCaller = null;
var removingLinkText = 'remove this product from my cart';
var roundMode = 2;
var search_url = 'http://transformer.sunnytoo.com/twelfth/en/search';
var st_adv_submemus_animation = 0;
var st_submemus_animation = 0;
var static_token = '5f2d2499e3a3ae4c0e39accff9ed1f04';
var toBeDetermined = 'To be determined';
var token = 'fc8b2e444c99c8d5fe27b8e61e03e9b2';
var usingSecureMode = false;
var wishlistProductsJson = false;



var noTaxForThisProduct = true;
var oosHookJsCodeFunctions = [];
var pro_thumbnails = false;
var productAvailableForOrder = true;
var productBasePriceTaxExcl = 68.99;
var productBasePriceTaxExcluded = 68.99;
var productBasePriceTaxIncl = 68.99;
var productHasAttributes = false;
var productPrice = 64.8506;
var productPriceTaxExcluded = 68.99;
var productPriceTaxIncluded = 68.99;
/* ]]> */
    </script> 
    <script type="text/javascript">/* <![CDATA[ */;
        jQuery(function($) {
            $('#submit_searchbox').click(function() {
                var search_query_top_val = $.trim($('#search_query_top').val());
                if (search_query_top_val == '' || search_query_top_val == $.trim($('#search_query_top').attr('placeholder')))
                {
                    $('#search_query_top').focusout();
                    return false;
                }
                $('#searchbox').submit();
            });
            if (!isPlaceholer())
            {
                $('#search_query_top').focusin(function() {
                    if ($(this).val() == $(this).attr('placeholder'))
                        $(this).val('');
                }).focusout(function() {
                    if ($(this).val() == '')
                        $(this).val($(this).attr('placeholder'));
                });
            }
        });
        ;
        jQuery(function($) {
            $('#iosSlider_7').iosSlider({desktopClickDrag: true, infiniteSlider: true, scrollbar: false, autoSlide: true, autoSlideTimer: 7000, autoSlideTransTimer: 400, autoSlideHoverPause: true, navNextSelector: $('#iosSliderNext_7'), navPrevSelector: $('#iosSliderPrev_7'), onSliderLoaded: sliderLoaded_7, onSlideChange: slideChange_7, snapToChildren: true});
        });
        function slideChange_7(args) {
            $(args.sliderContainerObject).find('.iosSlideritem').removeClass('current');
            $(args.currentSlideObject).addClass('current');
            var slide_height = $(args.currentSlideObject).outerHeight();
            $(args.sliderContainerObject).css('min-height', slide_height);
            $(args.sliderContainerObject).css('height', 'auto');
            $(args.sliderContainerObject).find('.iosSlider_text').each(function() {
                $(this).removeClass($(this).attr('data-animate'));
            });
            $(args.currentSlideObject).find('.iosSlider_text').addClass($(args.currentSlideObject).find('.iosSlider_text').attr('data-animate'));
        }
        function sliderLoaded_7(args) {
            $(args.sliderContainerObject).find('.css3loader').fadeOut();
            $(args.currentSlideObject).addClass('current');
            var slide_height = $(args.currentSlideObject).outerHeight();
            $(args.sliderContainerObject).css('min-height', slide_height);
            $(args.sliderContainerObject).css('height', 'auto');
            $(args.sliderContainerObject).find('.iosSlider_center_center,.iosSlider_left_center,.iosSlider_right_center').each(function() {
                $(this).css('margin-bottom', -($(this).outerHeight() / 2).toFixed(3));
            });
            $(args.sliderContainerObject).find('.iosSlider_selectors,.iosSlider_prev,.iosSlider_next').fadeIn();
            $(args.currentSlideObject).find('.iosSlider_text').addClass($(args.currentSlideObject).find('.iosSlider_text').attr('data-animate'));
        }
        ;
        var new_itemslider_options7c29aa9f48;
        ;
        jQuery(function($) {
            $('#easycontent_container_31').parallax("50%", 0);
        });
        ;
        var fc_slider_itemslider_optionsc1abe5a9e9;
        ;
        jQuery(function($) {
            fc_itemslider_optionsc1abe5a9e9 = {easing: "swing", useCSS: false, slideshow: 0, slideshowSpeed: 7000, animationSpeed: 400, pauseOnHover: 1, direction: "horizontal", animation: "slide", animationLoop: 0, controlNav: false, controlsContainer: "#fc_itemslider-c1abe5a9e9 .nav_top_right", itemWidth: 260, minItems: getFlexSliderSize({'lg': 3, 'md': 3, 'sm': 2, 'xs': 2, 'xxs': 1}), maxItems: getFlexSliderSize({'lg': 3, 'md': 3, 'sm': 2, 'xs': 2, 'xxs': 1}), move: 1, prevText: '<i class="icon-left-open-3"></i>', nextText: '<i class="icon-right-open-3"></i>', productSlider: true, allowOneSlide: false};
            $('#fc_itemslider-c1abe5a9e9 .sliderwrap').flexslider(fc_itemslider_optionsc1abe5a9e9);
            var fc_itemslider_rsc1abe5a9e9;
            $(window).resize(function() {
                clearTimeout(fc_itemslider_rsc1abe5a9e9);
                var rand_s = parseInt(Math.random() * 200 + 300);
                fc_itemslider_rsc1abe5a9e9 = setTimeout(function() {
                    var flexSliderSize = getFlexSliderSize({'lg': 3, 'md': 3, 'sm': 2, 'xs': 2, 'xxs': 1});
                    var flexslide_object = $('#fc_itemslider-c1abe5a9e9 .sliderwrap').data('flexslider');
                    if (flexSliderSize && flexslide_object != null)
                        flexslide_object.setVars({'minItems': flexSliderSize, 'maxItems': flexSliderSize});
                }, rand_s);
            });
        });
        ;
        var featured_itemslider_options898ddbdbf6;
        ;
        var wrongemailaddress_stnewsletter = "Invalid email address.";
        ;
        jQuery(function($) {
            $('#submit_searchbox_mobile_bar').click(function() {
                var search_query_mobile_bar_val = $.trim($('#search_query_mobile_bar').val());
                if (search_query_mobile_bar_val == '' || search_query_mobile_bar_val == $.trim($('#search_query_mobile_bar').attr('placeholder')))
                {
                    $('#search_query_mobile_bar').focusout();
                    return false;
                }
                $('#searchbox_mobile_bar').submit();
            });
            if (!isPlaceholer())
            {
                $('#search_query_mobile_bar').focusin(function() {
                    if ($(this).val() == $(this).attr('placeholder'))
                        $(this).val('');
                }).focusout(function() {
                    if ($(this).val() == '')
                        $(this).val($(this).attr('placeholder'));
                });
            }
        });/* ]]> */
    </script>
    <script type="text/javascript">
        var productPriceWithoutReduction = 68.99;
        var productReference = 'RP-demo_11';
        var productShowPrice = true;
        var productUnitPriceRatio = 0;
        var product_big_image = true;
        var product_fileButtonHtml = 'Choose File';
        var product_fileDefaultHtml = 'No file selected';
        var product_main_image_height = '649';
        var product_main_image_width = '568';
        var product_specific_price = {
            "id_specific_price": "31",
            "id_specific_price_rule": "0",
            "id_cart": "0",
            "id_product": "46",
            "id_shop": "0",
            "id_shop_group": "0",
            "id_currency": "0",
            "id_country": "0",
            "id_group": "0",
            "id_customer": "0",
            "id_product_attribute": "0",
            "price": "-1.000000",
            "from_quantity": "1",
            "reduction": "0.060000",
            "reduction_tax": "1",
            "reduction_type": "percentage",
            "from": "0000-00-00 00:00:00",
            "to": "0000-00-00 00:00:00",
            "score": "32"
        };
        var productcomment_added = 'Your comment has been added!';
        var productcomment_added_moderation = 'Your comment has been added and will be available once approved by a moderator.';
        var productcomment_ok = 'OK';
        var productcomment_title = 'New comment';
        var productcomments_controller_url = 'http://transformer.sunnytoo.com/twelfth/en/module/productcomments/default';
        var productcomments_url_rewrite = true;
        var quantitiesDisplayAllowed = true;
        var quantityAvailable = 994;
        var reduction_off = 'Off';
        var reduction_percent = 6;
        var reduction_price = 0;
        var reduction_save = 'Save';
        var secure_key = 'e9ad905693f904a2cd4e9ab37f3251a3';
        var specific_currency = false;
        var specific_price = -1;
        var stock_management = 1;
        var taxRate = 0;
        var uploading_in_progress = 'Uploading in progress, please be patient.';
        /* ]]> */
    </script>
    <script type="text/javascript">
        /* <![CDATA[ */;
        var st_responsive = 1;
        var st_responsive_max = 1;
        var st_addtocart_animation = 0;
        var st_sticky_menu = 2;
        var st_sticky_adv = 4;
        var st_sticky_mobile_header = 3;
        var st_is_rtl = false;
        var zoom_type = 2;
        var st_retina = false;
        var st_sticky_mobile_header_height = 60;
        blog_flexslider_options = {
            slideshow: 0,
            slideshowSpeed: 7000,
            animationSpeed: 400,
            pauseOnHover: 1,
            animationLoop: 1
        };
        jQuery(function($) {
            $("#st_owl_carousel-7").owlCarousel({
                autoPlay: 7000,
                navigation: true,
                pagination: false,
                paginationSpeed: 1000,
                goToFirstSpeed: 2000,
                rewindNav: false,
                singleItem: true,
                autoHeight: false,
                slideSpeed: 400,
                stopOnHover: false,
                mouseDrag: false,
                transitionStyle: "fade"
            });
        });
        ;
        var best_itemslider_options_column;
        ;
        jQuery(function($) {
            best_itemslider_options_column = {
                easing: "swing",
                useCSS: false,
                slideshow: 0,
                slideshowSpeed: 7000,
                animationSpeed: 400,
                pauseOnHover: 1,
                direction: "horizontal",
                animation: "slide",
                animationLoop: 0,
                controlNav: false,
                controlsContainer: "#bestsellers-itemslider-_column .nav_top_right",
                itemWidth: 260,
                minItems: getFlexSliderSize({
                    'lg': 1,
                    'md': 1,
                    'sm': 1,
                    'xs': 1,
                    'xxs': 1
                }),
                maxItems: getFlexSliderSize({
                    'lg': 1,
                    'md': 1,
                    'sm': 1,
                    'xs': 1,
                    'xxs': 1
                }),
                move: 0,
                prevText: '<i class="icon-left-open-3"></i>',
                nextText: '<i class="icon-right-open-3"></i>',
                productSlider: true,
                allowOneSlide: false
            };
            $('#bestsellers-itemslider-_column .sliderwrap').flexslider(best_itemslider_options_column);
            var best_flexslider_rs_column;
            $(window).resize(function() {
                clearTimeout(best_flexslider_rs_column);
                var rand_s = parseInt(Math.random() * 200 + 300);
                best_flexslider_rs_column = setTimeout(function() {
                    var flexSliderSize = getFlexSliderSize({
                        'lg': 1,
                        'md': 1,
                        'sm': 1,
                        'xs': 1,
                        'xxs': 1
                    });
                    var flexslide_object = $('#bestsellers-itemslider-_column .sliderwrap').data('flexslider');
                    if (flexSliderSize && flexslide_object != null)
                        flexslide_object.setVars({
                            'minItems': flexSliderSize,
                            'maxItems': flexSliderSize
                        });
                }, rand_s);
            });
        });

        jQuery(function($) {
            jQuery('.productscategory-itemslider').each(function(index) {
                if (jQuery(".productscategory-itemslider").eq(index).length) {
                    $('.productscategory-itemslider .sliderwrap').eq(index).flexslider({
                        easing: "swing",
                        useCSS: false,
                        slideshow: 0,
                        slideshowSpeed: 7000,
                        animationSpeed: 400,
                        pauseOnHover: 1,
                        direction: "horizontal",
                        animation: "slide",
                        animationLoop: 0,
                        controlNav: false,
                        controlsContainer: "#productscategory-itemslider .nav_top_right",
                        itemWidth: 260,
                        minItems: getFlexSliderSize({
                            'lg': 4,
                            'md': 3,
                            'sm': 3,
                            'xs': 2,
                            'xxs': 1
                        }),
                        maxItems: getFlexSliderSize({
                            'lg': 4,
                            'md': 3,
                            'sm': 3,
                            'xs': 2,
                            'xxs': 1
                        }),
                        move: 0,
                        prevText: '<i class="icon-left-open-3"></i>',
                        nextText: '<i class="icon-right-open-3"></i>',
                        productSlider: true,
                        allowOneSlide: false
                    });
                }
            })
            var productscategory_flexslider_rs;
            $(window).resize(function() {
                clearTimeout(productscategory_flexslider_rs);
                var rand_s = parseInt(Math.random() * 200 + 300);
                productscategory_flexslider_rs = setTimeout(function() {
                    var flexSliderSize = getFlexSliderSize({
                        'lg': 4,
                        'md': 3,
                        'sm': 3,
                        'xs': 2,
                        'xxs': 1
                    });
                    var flexslide_object = $('.productscategory-itemslider .sliderwrap').data('flexslider');
                    if (flexSliderSize && flexslide_object != null)
                        flexslide_object.setVars({
                            'minItems': flexSliderSize,
                            'maxItems': flexSliderSize
                        });
                }, rand_s);
            });
        });

        jQuery(function($) {
            $('#productscategory-itemslider .sliderwrap').flexslider({
                easing: "swing",
                useCSS: false,
                slideshow: 0,
                slideshowSpeed: 7000,
                animationSpeed: 400,
                pauseOnHover: 1,
                direction: "horizontal",
                animation: "slide",
                animationLoop: 0,
                controlNav: false,
                controlsContainer: "#productscategory-itemslider .nav_top_right",
                itemWidth: 260,
                minItems: getFlexSliderSize({
                    'lg': 4,
                    'md': 3,
                    'sm': 3,
                    'xs': 2,
                    'xxs': 1
                }),
                maxItems: getFlexSliderSize({
                    'lg': 4,
                    'md': 3,
                    'sm': 3,
                    'xs': 2,
                    'xxs': 1
                }),
                move: 0,
                prevText: '<i class="icon-left-open-3"></i>',
                nextText: '<i class="icon-right-open-3"></i>',
                productSlider: true,
                allowOneSlide: false
            });
            var productscategory_flexslider_rs;
            $(window).resize(function() {
                clearTimeout(productscategory_flexslider_rs);
                var rand_s = parseInt(Math.random() * 200 + 300);
                productscategory_flexslider_rs = setTimeout(function() {
                    var flexSliderSize = getFlexSliderSize({
                        'lg': 4,
                        'md': 3,
                        'sm': 3,
                        'xs': 2,
                        'xxs': 1
                    });
                    var flexslide_object = $('#productscategory-itemslider .sliderwrap').data('flexslider');
                    if (flexSliderSize && flexslide_object != null)
                        flexslide_object.setVars({
                            'minItems': flexSliderSize,
                            'maxItems': flexSliderSize
                        });
                }, rand_s);
            });
        });
    </script>
</html>

