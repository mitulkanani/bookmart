@foreach($otherImages as $key=>$otherImage)
<a href="{{asset('ads_picture/original/')}}/{{$otherImage}}">
    <img 
        src="{{asset('ads_picture/thumbnail/')}}/{{$otherImage}}",
        data-big="{{asset('ads_picture/original/')}}/{{$otherImage}}"
        data-title="Biandintz eta zaldiak"
        data-description="Horses on Bianditz mountain, in Navarre, Spain."
        >
</a>
@endforeach

