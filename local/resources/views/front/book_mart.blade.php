@extends('master')

@section('content')
<!-------------- content ------------------------>
<div class="main_content_area">
    <main class="cd-main-content">
        <div class="cd-tab-filter-wrapper">
            <div class="cd-tab-filter">
                <ul class="cd-filters">
                    <li class="placeholder"> 
                        <a data-type="all" href="#0">All</a> <!-- selected option on mobile -->
                    </li> 
                    <li class="filter"><a class="selected" href="#0" data-type="all">All</a></li>
                    <li class="filter" data-filter=".SALE"><a href="#0" data-type="SALE">SALE</a></li>
                    <li class="filter" data-filter=".RENT"><a href="#0" data-type="RENT">RENT</a></li>
                    <li class="filter" data-filter=".engineering"><a href="#0" data-type="engineering">Engineering</a></li>
                    <li class="filter" data-filter=".medical"><a href="#0" data-type="medical">Medical</a></li>
                    <li class="filter" data-filter=".pgrooms"><a href="#0" data-type="pgrooms">PG-Rooms</a></li>
                </ul> <!-- cd-filters -->
            </div> <!-- cd-tab-filter -->
        </div> <!-- cd-tab-filter-wrapper -->
        <section id = "new-products_block_center7c29aa9f48"
                 class = "cd-gallery new-products_block_center products_block section display_as_grid " style="padding: 0;">
            <ul style="margin: 15px 1px 15px 0;padding: 0;" id="sthomenew_grid" class="product_list grid row sthomenew_grid" 
                data-classnames="col-lg-2-4 col-md-2-4 col-sm-3 col-xs-4 col-xxs-6" data-default-view="">
                @foreach($adLists as $key=>$adsList)
                <?php
                $id = $adsList->id;
//                dd($adsList);
                ?>
                <li class="ajax_block_product col-sm-4 mix {{$adsList->ad_type}}  {{$adsList->category}}" style="margin-bottom: 11px;">
                    <div itemscope="" class="product-container" style="float: left;width: 100%;">
                        <div class="pro_first_box" style="float: left;width: 32%;">
                            <a itemprop="url" title="Synthetic Leather Mens Adjustable Casual buckle Belt" href="view_full_details/1" class="product_img_link pro_img_hover_scale">
                                <img width="272" height="310" 
                                     itemprop="image" title="Synthetic Leather Mens Adjustable Casual buckle Belt" alt="Synthetic Leather Mens Adjustable Casual buckle Belt"
                                     src="ads_picture/original/{{$adsList->cover_image}}" class="replace-2x img-responsive front-image">
                                <span class="new"><i>{{$adsList->ad_type}}</i></span>
                            </a>
                            <div class="hover_fly fly_1 clearfix">
                                <a class="quick-view" href="javascript:void(0);" onclick="view_quick_product(1)" title="Quick view">
                                    <div>
                                        <i class="icon-search-1 icon-0x icon_btn icon-mar-lr2"></i>
                                        <span>Quick view</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="" style="display: inline-block;margin: 8px 0px 7px;text-align: left;width: 65%;">
                            <h4 class="s_title_block " itemprop="name">
                                <a  title="Synthetic Leather Mens Adjustable Casual buckle Belt" 
                                    href="view_full_details/1" 
                                    style="color: #2d3e52;font-size: 1.28em;">{{$adsList->ad_title}}</a>
                            </h4>
                            <div class="s_title_block" style="">{{$adsList->author_name}}</div>
                            <div class="price_container">
                                <span class="desc-heading" style="color: #331d35;"> Price: </span>
                                <span class="price product-price" itemprop="price">Rs.{{$adsList->price}}</span>
                            </div>
                            <div class="price_container">
                                <span class="desc-heading" style="color: #331d35;"> Publication: </span>
                                <span class="price product-price" itemprop="price">{{$adsList->publication}}</span>
                            </div>
                            <div class="price_container">
                                <span class="desc-heading" style="color: #331d35;">Edition: </span>
                                <span class="price product-price" itemprop="price">{{$adsList->edition}}</span>
                            </div>
                            <div class="price_container">
                                <span class="desc-heading" style="color: #331d35;">College: </span>
                                <span class="price product-price" itemprop="price">{{$adsList->college}}</span>
                            </div>
                            <div class="price_container">
                                <span class="desc-heading" style="color: #331d35;">Owner Name: </span>
                                <span class="price product-price" itemprop="price">{{$adsList->owner_name}}</span>
                            </div>
                            <div class="price_container">
                                <span class="desc-heading" style="color: #331d35;">Mobile-no: </span>
                                <span class="price product-price" itemprop="price">{{$adsList->mobileno}}</span>
                            </div>
                        </div>
                    </div>
                </li>
                @endforeach
            </ul>
            <div class="cd-fail-message">No results found</div>
        </section> <!-- cd-gallery -->
        <div class="cd-filter">
            <form>
                <div class="cd-filter-block">
                    <h4>Search</h4>
                    <div class="cd-filter-content">
                        <input type="search" placeholder="Try engineering...">
                    </div> <!-- cd-filter-content -->
                </div> <!-- cd-filter-block -->

                <div class="cd-filter-block">
                    <h4>Categories</h4>
                    <ul class="cd-filter-content cd-filters list">
                        <li>
                            <input class="filter" data-filter=".SALE" type="checkbox" id="checkbox1">
                            <label class="checkbox-label" for="checkbox1">SALE</label>
                        </li>
                        <li>
                            <input class="filter" data-filter=".RENT" type="checkbox" id="checkbox2">
                            <label class="checkbox-label" for="checkbox2">RENT</label>
                        </li>
                        <li>
                            <input class="filter" data-filter=".engineering " type="checkbox" id="checkbox3">
                            <label class="checkbox-label" for="checkbox3">Engineering</label>
                        </li>
                        <li>
                            <input class="filter" data-filter=".medical" type="checkbox" id="checkbox4">
                            <label class="checkbox-label" for="checkbox4">Medical</label>
                        </li>
                        <li>
                            <input class="filter" data-filter=".commerce" type="checkbox" id="checkbox5">
                            <label class="checkbox-label" for="checkbox5">Commerce</label>
                        </li>
                        <li>
                            <input class="filter" data-filter=".others" type="checkbox" id="checkbox6">
                            <label class="checkbox-label" for="checkbox6">Others</label>
                        </li>
                        <li>
                            <input class="filter" data-filter=".pgrooms" type="checkbox" id="checkbox7">
                            <label class="checkbox-label" for="checkbox7">PG-Rooms</label>
                        </li>
                    </ul> <!-- cd-filter-content -->
                </div> <!-- cd-filter-block -->
            </form>

            <a href="#0" class="cd-close">Close</a>
        </div> <!-- cd-filter -->

        <a href="#0" class="cd-filter-trigger">Filters</a>
    </main>



    <!----------- How it works box--------------->

    <!----------- How its works box--------------->
</div>
<script>
    function view_quick_product(id)
    {
        $.ajax({
            type: "POST",
            url: '{{ url("view_product")}}',
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            data: {product_id: id},
            success: function(response)
            {
                $.fancybox.open(response);
            }
        });
    }
    var page_name = 'index';
</script>
@stop