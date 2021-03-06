@extends('master')
@section('content')
<!-------------- content ------------------------>
<div class="main_content_area">
    <div id="iosSlider_7" class="iosSlider fullwidth_default mar_b2 ">
        <div class="slider clearfix">
            <div id="iosSliderBanner_19" style="height:770px;" class="iosSlideritem">
                <div class="iosSliderBanner_image" style="background-image:url('http://transformer.sunnytoo.com/twelfth/upload/stiosslider/403b10e624fbc7d76f148ab80749e76a.jpg');"></div>
                <div class=" container ">
                    <div class="iosSlider_text animated iosSlider_center_center text-center " style="width:60%;left:20%;right:20%;" data-animate="slideInDown">
                        <div class="iosSlider_text_con clearfix">
                            <h2 class="closer" style="font-family:Raleway;font-weight:bold;">FREE SHIPPING</h2>
                            <h3 style="font-family:Raleway;font-weight:bold;">ON ALL ORDERS</h3>
                            <p class="spacer">&nbsp;</p>
                            <p>Transformer theme is an elegant, powerful and fully responsive prestashop theme with modern design. Suitable for every type of store.</p>
                            <p class="spacer">&nbsp;</p>
                            <p><a class="btn btn-default" style="font-family:Raleway;" title="See more" href="#" target="_self">See more</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="iosSliderBanner_18" style="height:770px;" class="iosSlideritem">
                <div class="iosSliderBanner_image" style="background-image:url('http://transformer.sunnytoo.com/twelfth/upload/stiosslider/7f45f834ecf72c0b3c3de02b9a338d27.jpg');"></div>
                <div class=" container ">
                    <div class="iosSlider_text animated iosSlider_center_center text-center " style="" data-animate="fadeInDown">
                        <div class="iosSlider_text_con clearfix">
                            <p class="fs_lg" style="font-family:Raleway;font-weight:bold;">WE ARE TRANSFORMER THEME</p>
                            <h1 style="font-family:Raleway;font-weight:bold;">FULLY RESPONSIVE THEME</h1>
                            <p class="fs_md closer" style="font-family:Raleway;">PrestaShop is the most reliable and flexible</p>
                            <p class="fs_md" style="font-family:Raleway;">open-source e-commerce software.</p>
                            <p class="spacer"></p>
                            <p><a class="btn btn-default" style="font-family:Raleway;" title="See more" href="#" target="_self">See more</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="iosSliderPrev_7" class="iosSlider_prev showonhover ">
            <i class="icon-angle-left"></i>
        </div>
        <div id="iosSliderNext_7" class="iosSlider_next showonhover ">
            <i class="icon-angle-right"></i>
        </div>
        <div class="css3loader css3loader-3"></div>
    </div>
    <div class="st_advanced_banner_row st_advanced_banner_0 hover_effect_4" id="st_advanced_banner_29">
        <div class="row">
            <?php foreach ($catlists as $key => $catlist) { ?>
                <div style = "height:193px;" class = "st_advanced_banner_block_24 st_advanced_banner_block  col-sm-3"
                     id = "st_advanced_banner_block_24">
                    <div style = "" class = "st_advanced_banner_image">
                        <img src = "<?php echo $catlist->cat_image ?>" style="height: 100%;width: 100%;">
                    </div>
                    <div class = "advanced_banner_text text_table_wrap ">
                        <div class = "text_table" style="padding: 14px;">
                            <div class = "text_td style_content text-center advanced_banner_text_center clearfix" style="border:3px solid rgba(255, 255, 255, 0.3);">
                                <h6 style = "font-family:'Comic Sans MS';color: #fff;" class = "closer uppercase"><?php echo $catlist->cat_name ?></h6>
                                <div>
                                    <a class="btn btn-default" title = "See more" href = "<?php echo $catlist->cat_url ?>">See more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <?php } ?>
        </div>
    </div>
    <div id = "new-products_block_center_container_7c29aa9f48" class = "new-products_block_center_container block s_countdown_block">
        <div class = "wide_container">
            <div class = "container">
                <section id = "new-products_block_center7c29aa9f48"
                         class = "new-products_block_center products_block section display_as_grid ">
                    <h2 class = "title_block">
                        Related Products
                    </h2>
                    <!----------- Book-Mart-------------->
                    <?php
                    if (!$book_mart_list->isEmpty()) {
                        ?>
                        <div style="border-bottom: 4px solid #72111a"></div>
                        <ul style="display: inline-block;">
                            <li style="float: left;margin-right: 4px;"><a href="book_mart" title="See more" class="btn btn-default">Book Mart</a></li>
                            <li style="float: left"><a href="book_mart" title="See more" class="btn btn-default">View-all</a></li>
                        </ul>
                        <div class="wpb_woo_slider_202093270" style="margin-bottom: 15px;margin-top: 10px;">
                            <?php
                            $i = 0;
                            foreach ($book_mart_list as $key => $bmList) {
                                if (++$i == 15)
                                    break;
                                ?>
                                <div class="owl-item" style="padding-right: 15px;">
                                    <div class="product-container" itemscope style="border: 2px solid #72111a">
                                        <div class="pro_outer_box">
                                            <div class="pro_first_box" style="height: 250px;">
                                                <a class="product_img_link pro_img_hover_scale" 
                                                   href="view_full_details/{{$bmList->id}}"
                                                   title="{{$bmList->ad_title}}" itemprop="url">
                                                    <img class="replace-2x img-responsive front-image" 
                                                         src="ads_picture/book_mart/original/{{$bmList->cover_image}}" 
                                                         alt="{{$bmList->ad_title}}"
                                                         title="{{$bmList->ad_title}}"
                                                         style="height: 250px;" itemprop="image" />
                                                    <span class="new"><i>{{$bmList->ad_type}}</i></span>
                                                </a>
                                                <div class="hover_fly fly_1">
                                                    <a title="Quick view"
                                                       onclick="view_quick_product(1)"
                                                       href="javascript:void(0);" 
                                                       class="quick-view">
                                                        <div>
                                                            <i class="icon-search-1 icon-0x icon_btn icon-mar-lr2"></i>
                                                            <span>Quick view</span>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="pro_second_box">
                                                <h5 itemprop="name" class="s_title_block ">
                                                    <a class="product-name"
                                                       href="view_full_details/{{$bmList->id}}"
                                                       title="{{$bmList->ad_title}}"
                                                       itemprop="url" >{{$bmList->ad_title}}</a>
                                                </h5>
                                                <div class="price_container" itemprop="offers" 
                                                     itemscope itemtype="https://schema.org/Offer">
                                                    <span itemprop="price" class="price product-price">Rs.{{$bmList->price}}</span>
                                                    <meta itemprop="priceCurrency" content="USD" />
                                                </div>
                                                <div class="availability product_stock_info mar_b6">
                                                    <span class="available-now hidden sm_lable"> In stock </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <?php } ?>
                        </div>
                        <?php
                    }
                    ?>
                    <!----------- Transportation-------------->
                    <?php
                    if (!$transport_list->isEmpty()) {
                        ?>
                        <div style="border-bottom: 4px solid #72111a"></div>
                        <ul style="display: inline-block;">
                            <li style="float: left;margin-right: 4px;"><a href="transportation" title="See more" class="btn btn-default">Transportation</a></li>
                            <li style="float: left"><a href="transportation" title="See more" class="btn btn-default">View-all</a></li>
                        </ul>
                        <div class="wpb_woo_slider_202093270" style="margin-bottom: 15px;margin-top: 10px;">
                            <?php
                            $i = 0;
                            foreach ($transport_list as $key => $tralist) {
                                if (++$i == 15)
                                    break;
                                ?>
                                <div class="owl-item" style="padding-right: 15px;">
                                    <div class="product-container" itemscope style="border: 2px solid #72111a">
                                        <div class="pro_outer_box">
                                            <div class="pro_first_box" style="height: 250px;">
                                                <a class="product_img_link pro_img_hover_scale" 
                                                   href="view_full_details/{{$tralist->id}}"
                                                   title="{{$tralist->ad_title}}" itemprop="url">
                                                    <img class="replace-2x img-responsive front-image" 
                                                         src="ads_picture/transportation/original/{{$tralist->cover_image}}" 
                                                         alt="{{$tralist->ad_title}}"
                                                         title="{{$tralist->ad_title}}"
                                                         style="height: 250px;" itemprop="image" />
                                                    <span class="new"><i>{{$tralist->ad_type}}</i></span>
                                                </a>
                                                <div class="hover_fly fly_1">
                                                    <a title="Quick view"
                                                       onclick="view_quick_product(1)"
                                                       href="javascript:void(0);" 
                                                       class="quick-view">
                                                        <div>
                                                            <i class="icon-search-1 icon-0x icon_btn icon-mar-lr2"></i>
                                                            <span>Quick view</span>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="pro_second_box">
                                                <h5 itemprop="name" class="s_title_block ">
                                                    <a class="product-name"
                                                       href="view_full_details/{{$tralist->id}}"
                                                       title="{{$tralist->ad_title}}"
                                                       itemprop="url" >{{$tralist->ad_title}}</a>
                                                </h5>
                                                <div class="price_container" itemprop="offers" 
                                                     itemscope itemtype="https://schema.org/Offer">
                                                    <span itemprop="price" class="price product-price">Rs.{{$tralist->price}}</span>
                                                    <meta itemprop="priceCurrency" content="USD" />
                                                </div>
                                                <div class="availability product_stock_info mar_b6">
                                                    <span class="available-now hidden sm_lable"> In stock </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <?php } ?>
                        </div>
                        <?php
                    }
                    ?>
                    <!---------- Cart Product ----------------------->
                    <?php
                    foreach ($catlists as $key => $catlist) {
                        $frontpageProductlists = $cartproductOBJ->getProductList($catlist->id);
                        if (!$frontpageProductlists->isEmpty()) {
                            ?>
                            <div style="border-bottom: 4px solid #72111a"></div>
                            <ul style="display: inline-block;">
                                <li style="float: left;margin-right: 4px;"><a href="<?php echo $catlist->cat_name ?>" title="See more" class="btn btn-default"><?php echo $catlist->cat_name ?></a></li>
                                <li style="float: left"><a href="#" title="See more" class="btn btn-default">View-all</a></li>
                            </ul>
                            <div class="wpb_woo_slider_202093270" style="margin-bottom: 15px;margin-top: 10px;">
                                <?php
                                $i = 0;
                                foreach ($frontpageProductlists as $key => $frProduct) {
                                    if (++$i == 15)
                                        break;
                                    ?>
                                    <div class="owl-item" style="padding-right: 15px;">
                                        <div class="product-container" itemscope style="border: 2px solid #72111a">
                                            <div class="pro_outer_box">
                                                <div class="pro_first_box" style="height: 250px;">
                                                    <a class="product_img_link pro_img_hover_scale" 
                                                       href="view_full_details/{{$frProduct->id}}"
                                                       title="{{$frProduct->name}}" itemprop="url">
                                                        <img class="replace-2x img-responsive front-image" 
                                                             src="admin_cart_picture/original/{{$frProduct->front_big_img}}" 
                                                             alt="{{$frProduct->name}}"
                                                             title="{{$frProduct->name}}"
                                                             style="height: 250px;" itemprop="image" />
                                                        <span class="new"><i>SALE</i></span>
                                                    </a>
                                                    <div class="hover_fly fly_2">
                                                        <a class="ajax_add_to_cart_button btn btn-default btn_primary" 
                                                           href="{{Request::url()}}/cart?add=1&amp;id_product={{$frProduct->id}}&amp;token=5f2d2499e3a3ae4c0e39accff9ed1f04" 
                                                           rel="nofollow" title="Add to cart" data-id-product-attribute="0" 
                                                           data-id-product="{{$frProduct->id}}" data-minimal_quantity="1">
                                                            <div>
                                                                <i class="icon-basket icon-0x icon_btn icon-mar-lr2"></i>
                                                                <span>Add to cart</span>
                                                            </div>
                                                        </a>
                                                        <a title="Quick view"
                                                           onclick="view_quick_product(1)"
                                                           href="javascript:void(0);" 
                                                           class="quick-view">
                                                            <div>
                                                                <i class="icon-search-1 icon-0x icon_btn icon-mar-lr2"></i>
                                                                <span>Quick view</span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="pro_second_box">
                                                    <h5 itemprop="name" class="s_title_block ">
                                                        <a class="product-name"
                                                           href="view_full_details/{{$frProduct->id}}"
                                                           title="{{$frProduct->name}}"
                                                           itemprop="url" >{{$frProduct->name}}</a>
                                                    </h5>
                                                    <div class="price_container" itemprop="offers" 
                                                         itemscope itemtype="https://schema.org/Offer">
                                                        <span itemprop="price" class="price product-price">Rs.{{$frProduct->price}}</span>
                                                        <meta itemprop="priceCurrency" content="USD" />
                                                    </div>
                                                    <div class="availability product_stock_info mar_b6">
                                                        <span class="available-now hidden sm_lable"> In stock </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <?php } ?>
                            </div>
                            <?php
                        }
                    }
                    ?>
                    <script type="text/javascript">
                        jQuery(".wpb_woo_slider_202093270").owlCarousel({
                            autoPlay: true,
                            stopOnHover: true,
                            navigation: true,
                            navigationText: ["<i class='icon-left-open-3'></i>", "<i class='icon-right-open-3'></i>"],
                            slideSpeed: 1000,
                            paginationSpeed: 1000,
                            pagination: false,
                            paginationNumbers: false,
                            items: 4,
                            itemsDesktop: [1199, 3],
                            itemsDesktopSmall: [979, 3],
                            itemsTablet: [768, 2],
                            itemsMobile: [479, 2],
                        });
                    </script>
                </section>
            </div>
        </div>
    </div>
    <div id="easycontent_container_31" class="easycontent_container full_container block">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <aside id="easycontent_31" class="easycontent_31 easycontent section">
                        <div class=" text-center block_content">
                            <h2 style="font-family: 'Raleway'; font-weight: bold;">WELCOME TO TRANSFORMER THEME</h2>
                            <p class="fs_lg center_width_70">Transformer theme is an elegant, powerful and fully responsive
                                prestashop theme with modern design. Suitable for every type of store.
                            </p>
                            <div>
                                <br /> <br /> <br /> 
                                <img src="images/upload/store12_1.png" alt="Transformer theme" title="Transformer theme" />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </div>
    <div id="easycontent_container_30" class="easycontent_container full_container block">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <aside id="easycontent_30" class="easycontent_30 easycontent section">
                        <div class=" block_content">
                            <div class="row easycontent_s7">
                                <div class="col-xs-12 col-sm-9 easycontent_s7_left">
                                    <h3 class="mar_t4" style="font-family: Raleway;">
                                        Summer sale up to 50% off + Free shipping on orders over $50
                                    </h3>
                                </div>
                                <div class="col-xs-12 col-sm-3 easycontent_s7_right text-right">
                                    <a class="btn btn-large btn-wider" title="See more" href="#" style="font-family: Raleway;">SEE MORE</a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </div>
    <div class="columns-container wide_container">
        <div id="columns" class="container">
            <div class="row">
                <div id="center_column" class="center_column col-xs-12 col-sm-12 col-md-12">
                    <div id="home_secondary_row" class="row">
                        <div id="home_secondary_left" class=" col-xs-12 col-sm-9 col-md-9 ">
                            <div id="fc_slider_block_container_c1abe5a9e9" class="fc_slider_block_container block ">
                                <section id="fc_slider_block_c1abe5a9e9" class="fc_slider_block block products_block section ">
                                    <h3 class="title_block"><span>Featured categories</span></h3>
                                    <div id="fc_itemslider-c1abe5a9e9" class="fc_itemslider flexslider">
                                        <div class="nav_top_right"></div>
                                        <div class="sliderwrap products_slider">
                                            <ul class="slides">
                                                <li class="ajax_block_product first_item">
                                                    <div class="pro_outer_box">
                                                        <div class="pro_first_box">
                                                            <a href="http://transformer.sunnytoo.com/twelfth/en/3-fashion"
                                                               title="Fashion"> <img src="http://transformer.sunnytoo.com/twelfth/c/3-home_default/fashion.jpg" alt="Fashion" width="272" height="310" class="replace-2x img-responsive" /> </a></div>
                                                        <div class="pro_second_box">
                                                            <p class="s_title_block"><a href="http://transformer.sunnytoo.com/twelfth/en/3-fashion" title="Fashion">Fashion</a></p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="ajax_block_product item">
                                                    <div class="pro_outer_box">
                                                        <div class="pro_first_box"> <a href="http://transformer.sunnytoo.com/twelfth/en/24-shoes" title="Shoes"> <img src="http://transformer.sunnytoo.com/twelfth/c/24-home_default/shoes.jpg" alt="Shoes" width="272" height="310" class="replace-2x img-responsive" /> </a></div>
                                                        <div class="pro_second_box">
                                                            <p class="s_title_block"><a href="http://transformer.sunnytoo.com/twelfth/en/24-shoes" title="Shoes">Shoes</a></p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="ajax_block_product item">
                                                    <div class="pro_outer_box">
                                                        <div class="pro_first_box"> <a href="http://transformer.sunnytoo.com/twelfth/en/4-women-s-clothing" title="Women&#039;s Clothing"> <img src="http://transformer.sunnytoo.com/twelfth/c/4-home_default/women-s-clothing.jpg" alt="Women&#039;s Clothing" width="272" height="310" class="replace-2x img-responsive" /> </a></div>
                                                        <div class="pro_second_box">
                                                            <p class="s_title_block"><a href="http://transformer.sunnytoo.com/twelfth/en/4-women-s-clothing" title="Women&#039;s Clothing">Women&#039;s Clothing</a></p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="ajax_block_product item">
                                                    <div class="pro_outer_box">
                                                        <div class="pro_first_box"> <a href="http://transformer.sunnytoo.com/twelfth/en/29-fur-leather" title="Fur &amp; Leather"> <img src="http://transformer.sunnytoo.com/twelfth/c/29-home_default/fur-leather.jpg" alt="Fur &amp; Leather" width="272" height="310" class="replace-2x img-responsive" /> </a></div>
                                                        <div class="pro_second_box">
                                                            <p class="s_title_block"><a href="http://transformer.sunnytoo.com/twelfth/en/29-fur-leather" title="Fur &amp; Leather">Fur &amp; Leather</a></p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="ajax_block_product last_item">
                                                    <div class="pro_outer_box">
                                                        <div class="pro_first_box"> <a href="http://transformer.sunnytoo.com/twelfth/en/9-lingerie" title="Lingerie"> <img src="http://transformer.sunnytoo.com/twelfth/c/9-home_default/lingerie.jpg" alt="Lingerie" width="272" height="310" class="replace-2x img-responsive" /> </a></div>
                                                        <div class="pro_second_box">
                                                            <p class="s_title_block"><a href="http://transformer.sunnytoo.com/twelfth/en/9-lingerie" title="Lingerie">Lingerie</a></p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div id="home_secondary_right" class="col-sm-3 col-md-3 hidden-xs">
                            <div id="banner_10" class="row st_banner_block mar_b2 ">
                                <div class="col-xs-12 text-center st_banner_image"> 
                                    <img class=" hover_effect " src="http://transformer.sunnytoo.com/twelfth/upload/stbanner/1ec05a8e94ec8c2ae4d2ddd3571b81fe.jpg" alt="" width="277" height="397" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="featured_products_sldier_block_center_container_898ddbdbf6" class="featured_products_sldier_block_center_container block">
        <div class="wide_container">
            <div class="container">
                <section id="featured_products_sldier_block_center_898ddbdbf6" class="featured_products_sldier_block_center products_block section display_as_grid ">
                    <h4 class="title_block mar_b1"><span>Featured Products</span></h4>
                    <ul class="pro_itemlist row">
                        <li class="ajax_block_product col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxs-12 first-item-of-desktop-line first-item-of-line first-item-of-tablet-line first-item-of-mobile-line">
                            <div class="itemlist_left"> <a class="product_image" href="http://transformer.sunnytoo.com/twelfth/en/home/15-new-fashion-vintage-double-breasted-trench-long-sleeve-coat-jacket-outwear-1234567890123.html" title="New Fashion Vintage Double Breasted Trench Long Sleeve Coat Jacket Outwear"><img class="replace-2x img-responsive" src="http://transformer.sunnytoo.com/twelfth/27-medium_default/new-fashion-vintage-double-breasted-trench-long-sleeve-coat-jacket-outwear.jpg" height="138" width="120" alt="New Fashion Vintage Double Breasted Trench Long Sleeve Coat Jacket Outwear" /></a></div>
                            <div class="itemlist_right">
                                <p class="s_title_block"><a href="http://transformer.sunnytoo.com/twelfth/en/home/15-new-fashion-vintage-double-breasted-trench-long-sleeve-coat-jacket-outwear-1234567890123.html" title="New Fashion Vintage Double Breasted Trench Long Sleeve Coat Jacket Outwear">New Fashion Vintage Double Breasted...</a></p>
                                <div class="price_container mar_b10"> <span class="price"> $39.89 </span></div>
                                <div class="itemlist_action"> <a class="exclusive ajax_add_to_cart_button" href="http://transformer.sunnytoo.com/twelfth/en/cart?qty=1&amp;id_product=15&amp;token=5f2d2499e3a3ae4c0e39accff9ed1f04&amp;add" rel="nofollow" title="Add to Cart" data-id-product="15" ><i class="icon-basket icon-1x icon_btn icon-mar-lr2"></i><span>Add to Cart</span></a></div>
                            </div>
                        </li>
                        <li class="ajax_block_product col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxs-12 ">
                            <div class="itemlist_left"> <a class="product_image" href="http://transformer.sunnytoo.com/twelfth/en/home/14-2013-hot-women-thicken-fleece-warm-coat-lady-outerwear-fur-jacket-fashion-new-1234567890123.html" title="2013 Hot Women thicken fleece Warm Coat Lady Outerwear Fur Jacket Fashion New"><img class="replace-2x img-responsive" src="http://transformer.sunnytoo.com/twelfth/25-medium_default/2013-hot-women-thicken-fleece-warm-coat-lady-outerwear-fur-jacket-fashion-new.jpg" height="138" width="120" alt="2013 Hot Women thicken fleece Warm Coat Lady Outerwear Fur Jacket Fashion New" /></a></div>
                            <div class="itemlist_right">
                                <p class="s_title_block"><a href="http://transformer.sunnytoo.com/twelfth/en/home/14-2013-hot-women-thicken-fleece-warm-coat-lady-outerwear-fur-jacket-fashion-new-1234567890123.html" title="2013 Hot Women thicken fleece Warm Coat Lady Outerwear Fur Jacket Fashion New">2013 Hot Women thicken fleece Warm...</a></p>
                                <div class="price_container mar_b10"> <span class="price"> $111.20 </span> <span class="old_price">$139.00</span></div>
                                <div class="itemlist_action"> <a class="exclusive ajax_add_to_cart_button" href="http://transformer.sunnytoo.com/twelfth/en/cart?qty=1&amp;id_product=14&amp;token=5f2d2499e3a3ae4c0e39accff9ed1f04&amp;add" rel="nofollow" title="Add to Cart" data-id-product="14" ><i class="icon-basket icon-1x icon_btn icon-mar-lr2"></i><span>Add to Cart</span></a></div>
                            </div>
                        </li>
                        <li class="ajax_block_product col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxs-12 first-item-of-mobile-line">
                            <div class="itemlist_left"> <a class="product_image" href="http://transformer.sunnytoo.com/twelfth/en/home/13-faux-fur-special-occasion-shawl-1234567890123.html" title="Faux Fur Special Occasion Shawl"><img class="replace-2x img-responsive" src="http://transformer.sunnytoo.com/twelfth/23-medium_default/faux-fur-special-occasion-shawl.jpg" height="138" width="120" alt="Faux Fur Special Occasion Shawl" /></a></div>
                            <div class="itemlist_right">
                                <p class="s_title_block"><a href="http://transformer.sunnytoo.com/twelfth/en/home/13-faux-fur-special-occasion-shawl-1234567890123.html" title="Faux Fur Special Occasion Shawl">Faux Fur Special Occasion Shawl</a></p>
                                <div class="price_container mar_b10"> <span class="price"> $35.10 </span> <span class="old_price">$39.89</span></div>
                                <div class="itemlist_action"> <a class="exclusive ajax_add_to_cart_button" href="http://transformer.sunnytoo.com/twelfth/en/cart?qty=1&amp;id_product=13&amp;token=5f2d2499e3a3ae4c0e39accff9ed1f04&amp;add" rel="nofollow" title="Add to Cart" data-id-product="13" ><i class="icon-basket icon-1x icon_btn icon-mar-lr2"></i><span>Add to Cart</span></a></div>
                            </div>
                        </li>
                        <li class="ajax_block_product col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxs-12 first-item-of-tablet-line">
                            <div class="itemlist_left"> <a class="product_image" href="http://transformer.sunnytoo.com/twelfth/en/home/12-short-sleeve-lace-jacket-with-beaded-trim-1234567890123.html" title="Short Sleeve Lace Jacket With Beaded Trim"><img class="replace-2x img-responsive" src="http://transformer.sunnytoo.com/twelfth/21-medium_default/short-sleeve-lace-jacket-with-beaded-trim.jpg" height="138" width="120" alt="Short Sleeve Lace Jacket With Beaded Trim" /></a></div>
                            <div class="itemlist_right">
                                <p class="s_title_block"><a href="http://transformer.sunnytoo.com/twelfth/en/home/12-short-sleeve-lace-jacket-with-beaded-trim-1234567890123.html" title="Short Sleeve Lace Jacket With Beaded Trim">Short Sleeve Lace Jacket With Beaded...</a></p>
                                <div class="price_container mar_b10"> <span class="price"> $26.00 </span></div>
                                <div class="itemlist_action"> <a class="exclusive ajax_add_to_cart_button" href="http://transformer.sunnytoo.com/twelfth/en/cart?qty=1&amp;id_product=12&amp;token=5f2d2499e3a3ae4c0e39accff9ed1f04&amp;add" rel="nofollow" title="Add to Cart" data-id-product="12" ><i class="icon-basket icon-1x icon_btn icon-mar-lr2"></i><span>Add to Cart</span></a></div>
                            </div>
                        </li>
                        <li class="ajax_block_product col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxs-12 first-item-of-desktop-line first-item-of-line first-item-of-mobile-line">
                            <div class="itemlist_left"> <a class="product_image" href="http://transformer.sunnytoo.com/twelfth/en/home/11-long-sleeves-taffeta-flower-girl-jacket-1234567890123.html" title="Long Sleeves Taffeta Flower Girl Jacket"><img class="replace-2x img-responsive" src="http://transformer.sunnytoo.com/twelfth/19-medium_default/long-sleeves-taffeta-flower-girl-jacket.jpg" height="138" width="120" alt="Long Sleeves Taffeta Flower Girl Jacket" /></a></div>
                            <div class="itemlist_right">
                                <p class="s_title_block"><a href="http://transformer.sunnytoo.com/twelfth/en/home/11-long-sleeves-taffeta-flower-girl-jacket-1234567890123.html" title="Long Sleeves Taffeta Flower Girl Jacket">Long Sleeves Taffeta Flower Girl Jacket</a></p>
                                <div class="price_container mar_b10"> <span class="price"> $68.99 </span></div>
                                <div class="itemlist_action"> <a class="view_button btn btn-default" href="http://transformer.sunnytoo.com/twelfth/en/home/11-long-sleeves-taffeta-flower-girl-jacket-1234567890123.html" title="View" rel="nofollow"><i class="icon-eye-2 icon-1x icon_btn icon-mar-lr2"></i><span>View</span></a></div>
                            </div>
                        </li>
                        <li class="ajax_block_product col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxs-12 ">
                            <div class="itemlist_left"> <a class="product_image" href="http://transformer.sunnytoo.com/twelfth/en/fashion/10-beautiful-lace-half-sleeve-casual-party-jacket-1234567890123.html" title="Beautiful Lace Half-Sleeve Casual/Party Jacket"><img class="replace-2x img-responsive" src="http://transformer.sunnytoo.com/twelfth/17-medium_default/beautiful-lace-half-sleeve-casual-party-jacket.jpg" height="138" width="120" alt="Beautiful Lace Half-Sleeve Casual/Party Jacket" /></a></div>
                            <div class="itemlist_right">
                                <p class="s_title_block"><a href="http://transformer.sunnytoo.com/twelfth/en/fashion/10-beautiful-lace-half-sleeve-casual-party-jacket-1234567890123.html" title="Beautiful Lace Half-Sleeve Casual/Party Jacket">Beautiful Lace Half-Sleeve...</a></p>
                                <div class="price_container mar_b10"> <span class="price"> $14.08 </span> <span class="old_price">$16.00</span></div>
                                <div class="itemlist_action"> <a class="exclusive ajax_add_to_cart_button" href="http://transformer.sunnytoo.com/twelfth/en/cart?qty=1&amp;id_product=10&amp;token=5f2d2499e3a3ae4c0e39accff9ed1f04&amp;add" rel="nofollow" title="Add to Cart" data-id-product="10" ><i class="icon-basket icon-1x icon_btn icon-mar-lr2"></i><span>Add to Cart</span></a></div>
                            </div>
                        </li>
                        <li class="ajax_block_product col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxs-12 first-item-of-tablet-line first-item-of-mobile-line">
                            <div class="itemlist_left"> <a class="product_image" href="http://transformer.sunnytoo.com/twelfth/en/fashion/9-half-sleeves-taffeta-bridal-jacket-1234567890123.html" title="Half Sleeves Taffeta Bridal Jacket"><img class="replace-2x img-responsive" src="http://transformer.sunnytoo.com/twelfth/15-medium_default/half-sleeves-taffeta-bridal-jacket.jpg" height="138" width="120" alt="Half Sleeves Taffeta Bridal Jacket" /></a></div>
                            <div class="itemlist_right">
                                <p class="s_title_block"><a href="http://transformer.sunnytoo.com/twelfth/en/fashion/9-half-sleeves-taffeta-bridal-jacket-1234567890123.html" title="Half Sleeves Taffeta Bridal Jacket">Half Sleeves Taffeta Bridal Jacket</a></p>
                                <div class="price_container mar_b10"> <span class="price"> $45.62 </span> <span class="old_price">$49.59</span></div>
                                <div class="itemlist_action"> <a class="exclusive ajax_add_to_cart_button" href="http://transformer.sunnytoo.com/twelfth/en/cart?qty=1&amp;id_product=9&amp;token=5f2d2499e3a3ae4c0e39accff9ed1f04&amp;add" rel="nofollow" title="Add to Cart" data-id-product="9" ><i class="icon-basket icon-1x icon_btn icon-mar-lr2"></i><span>Add to Cart</span></a></div>
                            </div>
                        </li>
                        <li class="ajax_block_product col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxs-12 ">
                            <div class="itemlist_left"> <a class="product_image" href="http://transformer.sunnytoo.com/twelfth/en/fashion/8-hot-new-women-s-thicken-warm-winter-coat-hood-parka-overcoat-long-jacket-outwear-1234567890123.html" title="Hot New Women&#039;s Thicken Warm Winter Coat Hood Parka Overcoat Long Jacket Outwear"><img class="replace-2x img-responsive" src="http://transformer.sunnytoo.com/twelfth/13-medium_default/hot-new-women-s-thicken-warm-winter-coat-hood-parka-overcoat-long-jacket-outwear.jpg" height="138" width="120" alt="Hot New Women&#039;s Thicken Warm Winter Coat Hood Parka Overcoat Long Jacket Outwear" /></a></div>
                            <div class="itemlist_right">
                                <p class="s_title_block"><a href="http://transformer.sunnytoo.com/twelfth/en/fashion/8-hot-new-women-s-thicken-warm-winter-coat-hood-parka-overcoat-long-jacket-outwear-1234567890123.html" title="Hot New Women&#039;s Thicken Warm Winter Coat Hood Parka Overcoat Long Jacket Outwear">Hot New Women&#039;s Thicken Warm Winter...</a></p>
                                <div class="price_container mar_b10"> <span class="price"> $19.00 </span></div>
                                <div class="itemlist_action"> <a class="exclusive ajax_add_to_cart_button" href="http://transformer.sunnytoo.com/twelfth/en/cart?qty=1&amp;id_product=8&amp;token=5f2d2499e3a3ae4c0e39accff9ed1f04&amp;add" rel="nofollow" title="Add to Cart" data-id-product="8" ><i class="icon-basket icon-1x icon_btn icon-mar-lr2"></i><span>Add to Cart</span></a></div>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    </div>
    <div class="main_content_area_footer">
        <div class="wide_container"></div>
    </div>
</div>

<script>
    function view_quick_product(id)
    {
        $.ajax({
            type: "POST",
            url: '{{ url("view_product")}}', headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            data: {product_id: id}, success: function(response)
            {
                $.fancybox.open(response);
            }
        });
    }
    var page_name = 'index';
</script>
@stop

