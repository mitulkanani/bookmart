@extends('master')

@section('content')
<!-------------- Search-bar ------------------------>
<div class="search"> 
    <div class="search-form-wrap">

        <form action="/search/results" method="get" name="search" id="search">                
            <input type="hidden" value="main" name="did">
            <div class="search-refine">
                <label for="course-search" class="sr-only">Search for a course</label>
                <input type="text" value="" name="keywords" placeholder="Enter subject or university name" class="form-control" id="subjectKeyword">
                <select name="level-of-study" class="form-control">
                    <option value="">- Level of Study -</option>
                    <option value="">Any Level of Study</option>
                    <option>-</option>
                    <option value="los-sch">School</option><option value="los-fou">Foundation</option><option value="los-ug">Undergraduate</option><option value="los-pg">Postgraduate</option><option value="los-eng">English as a Foreign Language</option><option value="los-mba">MBA</option>                </select>
                <select class="pull-right form-control" name="country">
                    <option value="">- Location -</option>
                    <option value="AU">Australia</option><option value="GB">United Kingdom</option><option value="US">United States</option><option value="CA">Canada</option><option value="CN">China</option><option value="FI">Finland</option><option value="FR">France</option><option value="DE">Germany</option><option value="IE">Ireland</option><option value="IT">Italy</option><option value="HK">Hong Kong</option><option value="NZ">New Zealand</option><option value="NL">Netherlands</option><option value="NO">Norway</option><option value="KR">Korea (the Republic of)</option><option value="ES">Spain</option><option value="SE">Sweden</option><option value="TR">Turkey</option><option value="SL-ROE">Rest of Europe</option>                </select>
            </div>
            <div class="search-refine-button">
                <button class="btn btn-default btn-search" type="submit"><i class="icon-search-1 icon-0x"></i></button>
            </div>
        </form>


    </div>

</div>
<!-------------- Search-bar ------------------------>
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
                    <li class="filter" data-filter=".Engineering"><a href="#0" data-type="engineering">Engineering</a></li>
                    <li class="filter" data-filter=".Medical"><a href="#0" data-type="medical">Medical</a></li>
                    <li class="filter" data-filter=".Commerce"><a href="#0" data-type="pgrooms">Commerce</a></li>
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
                    <div itemscope="" class="product-container " style="float: left;width: 100%;">
                        <div class="ribbon-wrapper-green">
                            <div class="ribbon-green">
                                <span style="color: #fff;font-style: oblique;">{{$adsList->ad_type}}</span>
                            </div>
                        </div>
                        <div class="pro_first_box" style="float: left;width: 32%; height: 184px;">
                            <a itemprop="url" title="Synthetic Leather Mens Adjustable Casual buckle Belt"
                               href="view_full_details/1" 
                               class="product_img_link pro_img_hover_scale">
                                <img style="height: 184px;"
                                     itemprop="image" title="Synthetic Leather Mens Adjustable Casual buckle Belt" alt="Synthetic Leather Mens Adjustable Casual buckle Belt"
                                     src="ads_picture/book_mart/original/{{$adsList->cover_image}}" class="replace-2x img-responsive front-image">
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
                        <div class="" style="display: inline-block;margin: 8px 0px 7px;text-align: left;width: 65%; height: 168px;">
                            <h4 class="s_title_block " itemprop="name">
                                <a  title="Synthetic Leather Mens Adjustable Casual buckle Belt" 
                                    href="view_full_details/1" 
                                    style="color: #2d3e52;font-size: 1.1em;">{{$adsList->ad_title}}</a>
                            </h4>
                            <div class="s_title_block" style=" font-size: 0.9em;">{{$adsList->author_name}}</div>
                            <div class="price_container">
                                <span class="desc-heading" style="color: #331d35;"> Price: </span>
                                <span class="price product-price" itemprop="price" style="font-size: 1.01em;">Rs.{{$adsList->price}}</span>
                            </div>
                            <div class="price_container">
                                <span class="desc-heading" style="color: #331d35;"> Publication: </span>
                                <span class="price product-price" itemprop="price" style="font-size: 1.01em;">{{$adsList->publication}}</span>
                            </div>
                            <div class="price_container">
                                <span class="desc-heading" style="color: #331d35;">Edition: </span>
                                <span class="price product-price" itemprop="price" style="font-size: 1.01em;">{{$adsList->edition}}</span>
                            </div>
                            <div class="price_container">
                                <span class="desc-heading" style="color: #331d35;">Owner Name: </span>
                                <span class="price product-price" itemprop="price" style="font-size: 1.01em;">{{$adsList->owner_name}}</span>
                            </div>
                            <div class="price_container">
                                <span class="desc-heading" style="color: #331d35;">Mobile-no: </span>
                                <span class="price product-price" itemprop="price" style="font-size: 1.01em;">{{$adsList->mobileno}}</span>
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