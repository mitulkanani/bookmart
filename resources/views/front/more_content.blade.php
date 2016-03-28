<?php if ($adLists->count()) { ?>
    @foreach($adLists as $key=>$adsList)
    <?php $id = $adsList->id; ?>
    <li class="mix {{$adsList->ad_type}}  {{$adsList->category}}" style="display: inline-block;">
        <article class="box animated" data-animation-type="fadeInUp">
            <figure>
                <a class="media-box-thumb" title="" onclick="getgallery({{$adsList->id}});" href="javascript:;">
                    <img src="{{asset('ads_picture/original/')}}/{{$adsList->cover_image}}" alt="" class="middle-item"  style="width: 100%;cursor: pointer"/>
                </a>
            </figure>
            <div class="details">
                <div class="ribbon-wrapper-green">
                    <div class="ribbon-green">
                        <span style="color: #fff;font-style: oblique;">{{$adsList->ad_type}}</span>
                    </div>
                </div>
                <h4 class="box-title" style="font-size: 18px;">{{$adsList->ad_title}}<small>{{$adsList->author_name}}</small></h4>
                <div class="" style="float: left">
                    <span class="desc-heading"> Price:&nbsp;&nbsp; </span>
                    <span style="float:left">Rs.</span><strong class="price" style="font-size: 17px;">{{$adsList->price}} </strong>
                    <div class="tags">
                        <a href="#">{{$adsList->fixed}}</a>
                    </div>
                </div>
                <div class="" style="float: left">
                    <span class="desc-heading"> Edition: </span>
                    <span style="color: #98ce44;font-weight: bold;">&nbsp;&nbsp;{{$adsList->edition}} </span>
                </div>
                <div class="" style="float: left">
                    <span class="desc-heading">Publication: </span>
                    <span style="color: #98ce44;font-weight: bold;">&nbsp;&nbsp;{{$adsList->publication}}</span>
                </div>
            </div>
        </article>
        <div class="col-sm-12" style="margin: 0;padding: 0;">
            <button class="button btn-small dark-blue1 col-sm-6"
                    type="button"
                    data-toggle="collapse" 
                    data-target="#{{$adsList->id}}" 
                    aria-expanded="false" 
                    aria-controls="{{$adsList->id}}">
                <span class="glyphicon glyphicon-eye-open"></span>View Details
            </button>
            <a href="view.html">
                <button class="button btn-small green col-sm-6"><span class="glyphicon glyphicon-eye-open"></span>View more</button>
            </a>
        </div>
        <div class="collapse" id="{{$adsList->id}}" style="background: #fff;">
            <div class="row">
                <div class="col-sm-12" style="margin-left: 14px;">
                    <span class="glyphicon glyphicon-user"></span><span> Owner-name:</span><span>{{$adsList->owner_name}}</span>
                </div>
                <div class="col-sm-12" style="margin-left: 14px;">
                    <span class="glyphicon glyphicon-phone"></span><span> MobileNo.:</span><span>{{$adsList->mobile}}</span>
                </div>
                <div class="col-sm-12" style="margin-left: 14px;">
                    <span class="glyphicon glyphicon-education"></span><span> College-name:</span><span>{{$adsList->college}}</span>
                </div>
                <div class="col-sm-12" style="margin-left: 14px;">
                    <span class="glyphicon glyphicon-map-marker"></span><span>Address:</span><span>{{$adsList->address}}</span>
                </div>
                <div class="col-sm-12" style="margin-left: 14px;">
                    <span class="glyphicon glyphicon-tree-deciduous"></span><span> City:</span><span>{{$adsList->city}}</span>
                </div>
            </div>
        </div>
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
    echo "<h2>No More Content to Load<h2>";
}?>