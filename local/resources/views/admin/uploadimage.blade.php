@extends('admin.master')

@section('content')

<!-- Content Wrapper. Contains page content -->
<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Upload Image
        <!--<small>Blank example to the boxed layout</small> -->
    </h1>

</section>

<!-- Main content -->
<section class="content">

    <!-- Default box -->
    <div class="box">
        <div class="box-header with-border">
            <h3 class="box-title"><strong>Upload Image</strong></h3>
            <div class="box-tools pull-right">
                <button class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse"><i class="fa fa-minus"></i></button>
                <button class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove"><i class="fa fa-times"></i></button>
            </div>
        </div>
        <div class="box-body">

            <div class="top-imgupload">
                <div class="select-file">
                    <div class="editphoto" id="upload_image" style="background-color: aquamarine;width: 100px;height: 30px;"><a href="javascript:void(0);">Upload Image</a></div>
                    <form id="upload_picture_form" class="form-horizontal" role="form" method="POST" action="{{url('imageSave/')}}/{{$propertyId}}">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="file" id="upload_picture" data-show="2" name="profile_picture"  accept="image/*" style="display: none;" />
                    </form>
            <!--<input type="file" id="uploadImage" name="uploadImage" onchange="readURL(this);">-->
                </div>

            </div>
            <script src="http://malsup.github.com/jquery.form.js"></script> 
            <script>
        function deleteImg(id, propertyid) {

        $.ajax({
        type: 'POST',
                url: "{{ url('/deleteImage') }}",
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                data: {id:id, propertyid:propertyid},
                success: function(data) {
                $('#allImage').html(data);
                }
        });
        }
$(document).ready(function ($) {
$("#upload_image").click(function () {
$("input[id='upload_picture']").click();
});
        $('#upload_picture').on('change', function ()
{
//$("#profile_image").html('');
$(".imageloader").html('<img src="{{ asset("/images/loading.gif") }}" alt="Uploading...."/>');
        $("#upload_picture_form").ajaxForm(
{

success: function (data) {
$('#allImage').html(data);
$(".imageloader").html('');
}
}).submit();
});
        });</script>

        </div>

        <!-------------------------------------------------------------------->

        
        <!--script src="js/jquery.lint.js" type="text/javascript" charset="utf-8"></script-->
        <link rel="stylesheet" href="{{asset('css/prettyPhoto.css')}}" type="text/css" media="screen" title="prettyPhoto main stylesheet" charset="utf-8" />
        <script src="{{asset('js/imgslider/jquery.min.js')}}" type="text/javascript" charset="utf-8"></script>

        <style type="text/css" media="screen">


            h1 { font-family: Georgia; font-style: italic; margin-bottom: 10px; }

            h2 {
                font-family: Georgia;
                font-style: italic;
                margin: 25px 0 5px 0;
            }

            p { font-size: 1.2em; }

            ul li { display: inline; }

            .wide {
                border-bottom: 1px #000 solid;
                width: 4000px;
            }

            .fleft { float: left; margin: 0 20px 0 0; }

            .cboth { clear: both; }
            .delete{position: absolute;}
            #main {
                background: #fff;
                margin: 0 auto;
                padding: 30px;
                width: 1000px;
            }
        </style>
        <div class="imageloader"></div>
        <div id="main">

            <div id="allImage" style="width:835px;">
                <ul class="gallery clearfix">
                    <?php foreach ($property_data as $key => $value) { ?>

                    <li>
                            <a href="javascript:void(0);" class="delete" onclick="deleteImg('{{$value->id}}','{{$value->property_id}}')"><img  src="{{asset('/images/close.png')}}"/></a>
                            <a href="{{asset('property_picture/original/')}}/{{$value->image}}" rel="prettyPhoto[pp_gal]" title="You can add caption to pictures.">
                                <img src="{{asset('property_picture/thumbnail/')}}/{{$value->image}}" width="100" height="100" style="margin:15px;" alt="Red round shape" />
                            </a>

                        </li>

                    <?php } ?>
                </ul>
            </div>
            <!---- theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */ ----------->
            <script type="text/javascript" charset="utf-8">
                                $(document).ready(function(){
                        $("area[rel^='prettyPhoto']").prettyPhoto();
                                $(".gallery:first a[rel^='prettyPhoto']").prettyPhoto({
                        animation_speed:'normal', /* fast/slow/normal */
                                theme:'pp_default',
                                slideshow:3000, /* false OR interval time in ms */
                                autoplay_slideshow: false, /* true/false */
                                social_tools:false,
                                show_title: false, /* true/false */
                                allow_resize: true, /* Resize the photos bigger than viewport. true/false */
                                default_width: 500,
                                default_height: 344,
                                counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
                                horizontal_padding: 20, /* The padding on each side of the picture */
                        });
                                $(".gallery:gt(0) a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'fast', slideshow:10000, hideflash: true});
                                $("#custom_content a[rel^='prettyPhoto']:first").prettyPhoto({
                        custom_markup: '<div id="map_canvas" style="width:260px; height:265px"></div>',
                                changepicturecallback: function(){ initialize(); }
                        });
                                $("#custom_content a[rel^='prettyPhoto']:last").prettyPhoto({
                        custom_markup: '<div id="bsap_1259344" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div><div id="bsap_1237859" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6" style="height:260px"></div><div id="bsap_1251710" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div>',
                                changepicturecallback: function(){ _bsap.exec(); }
                        });
                        });
            </script>


        </div>
        <!--------------------------------------------------------------------->
        <div class="box-body">
            <a class="btn btn-primary btn-flat" href="{{ url('admin/property') }}">Back</a>
        </div>
        <!-- /.box-body -->

    </div><!-- /.box -->
</section><!-- /.content -->
@stop