<?php if ($adLists->count()) { ?>
    @foreach($adLists as $key=>$adsList)
    <?php $id = $adsList->id; ?>
    <li class="mix {{$adsList->ad_type}}  {{$adsList->category}}" style="display: inline-block;">
        <article class="box animated" data-animation-type="fadeInUp">
            <figure>
                <a class="hover-effect media-box-thumb" title="" onclick="getgallery({{$adsList->id}});" href="javascript:;">
                    <img src="{{asset('ads_picture/original/')}}/{{$adsList->cover_image}}" alt="" class="middle-item"  style="width: 100%;height: 180px;cursor: pointer"/>
                </a>
            </figure>
            <div class="details">
                <div class="ribbon-wrapper-green">
                    <div class="ribbon-green">
                        <span style="color: #fff;font-style: oblique;">{{$adsList->ad_type}}</span>
                    </div>
                </div>
                <h4 class="box-title" style="font-size: 18px;">{{$adsList->ad_title}}<small>{{$adsList->author_name}}</small></h4>
                <div class="col-sm-12">
                    <span class="desc-heading"> Price:&nbsp;&nbsp; </span>
                    <span style="float:left">Rs.</span><strong class="price" style="font-size: 17px;">{{$adsList->price}} </strong>
                    <div class="tags">
                        <a href="#">{{$adsList->fixed}}</a>
                    </div>
                </div>
                <div class="col-sm-12">
                    <span class="desc-heading"> Edition: </span>
                    <span style="color: #98ce44;font-weight: bold;">&nbsp;&nbsp;{{$adsList->edition}} </span>
                </div>
                <div class="col-sm-12">
                    <span class="desc-heading">Publication: </span>
                    <span style="color: #98ce44;font-weight: bold;">&nbsp;&nbsp;{{$adsList->publication}}</span>
                </div>
            </div>
            <div class="" style="margin: 0;padding: 0;">
                <button class="button btn-small dark-blue1 col-sm-6"
                        type="button" onclick="viewFullDetail({{$adsList->id}});">
                    <span class="glyphicon glyphicon-eye-open"></span>View Details
                </button>
                <button onclick="viewFullDetail({{$adsList->id}});" class="button btn-small green col-sm-6"><span class="glyphicon glyphicon-eye-open"></span>View more</button>
            </div>
        </article>
    </li>
    @endforeach
    <li class="gap"></li>
    <li class="gap"></li>
    <li class="gap"></li>
    <div id="load_more_<?php echo $id; ?>" class="more_tab"><a class="button btn-large full-width uppercase load_more" id="<?php echo $id; ?>" href="#">Load More Books</a></div>
    <?php
} else {
    echo "<li class='gap'></li>"
    . "<li class='gap'></li>"
    . "<li class='gap'></li>";
    echo "<h4 style='background: yellowgreen none repeat scroll 0 0;text-align: center;margin-top: -40px;line-height: 40px;'>No More Content to Load<h4>";
}?>