
@foreach($adLists as $key=>$adsList)
<li class="mix {{$adsList->ad_type}}  {{$adsList->category}}"  style="display: inline-block;">
    <article class="box animated" data-animation-type="fadeInUp" style="">
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
            <h2 class="box-title">{{$adsList->ad_title}}<small>{{$adsList->auther_name}}</small></h2>
            <div class="col-sm-12" style="float: left">
                <span class="desc-heading"> Price:&nbsp;&nbsp; </span>
                <span style="float:left">Rs.</span><strong class="price" >{{$adsList->price}} </strong>
            </div>
            <div class="col-sm-12" style="float: left">
                <span class="desc-heading"> Edition: </span>
                <span style="color: #98ce44;font-weight: bold;">&nbsp;&nbsp;{{$adsList->edition}} </span>
            </div>
            <div class="col-sm-12" style="float: left">
                <span class="desc-heading">Publication: </span>
                <span style="color: #98ce44;font-weight: bold;">&nbsp;&nbsp;{{$adsList->publication}}</span>
            </div>
            <div class="col-sm-12" style=" bottom: -14px;margin: 0;padding: 0;">
                <button class="button btn-small dark-blue1 col-sm-6"
                        type="button"
                        data-toggle="collapse" 
                        data-target="#{{$adsList->id}}" 
                        aria-expanded="false" 
                        aria-controls="{{$adsList->id}}">
                    View Details
                </button>
                <a href="view.html">
                    <button class="button btn-small green col-sm-6">View more</button>
                </a>
            </div>
        </div>
    </article>
    <div class="collapse" id="{{$adsList->id}}" style="background: #fff;">
        <div class="row">
            <div class="col-sm-12">
                <div class="col-sm-6"><span> Owner-name:</span><span>{{$adsList->owner_name}}</span></div>
                <div class="col-sm-6"><span> MobileNo.:</span><span>{{$adsList->mobile}}</span></div>
            </div>
            <div class="col-sm-12" style="margin-left: 14px;">
                <span> College-name:</span><span>{{$adsList->college}}</span>
            </div>
            <div class="col-sm-12" style="margin-left: 14px;">
                <span>Address:</span><span>{{$adsList->address}}</span>
            </div>
            <div class="col-sm-12">
                <div class="col-sm-6"><span> City:</span><span>{{$adsList->city}}</span></div>
                <div class="col-sm-6"><span>Negotiable:</span><span>{{$adsList->type}}</span></div>
            </div>
        </div>
    </div>
</li>
@endforeach
<li class="gap"></li>
<li class="gap"></li>
<li class="gap"></li>
