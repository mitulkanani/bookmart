@extends('admin.master')

@section('content')
	
<!-- Content Wrapper. Contains page content -->
<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        User Detail
        <!--<small>Blank example to the boxed layout</small> -->
    </h1>

</section>

<!-- Main content -->
<section class="content">

    <!-- Default box -->
    <div class="box">
        <div class="box-header with-border">
            <h3 class="box-title"><strong>@if($property_data->property_type==1)
            Residencial
            @elseif($property_data->property_type==2)
            Commercial
            @else
             Office
            @endif</strong></h3>
            <div class="box-tools pull-right">
                <button class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse"><i class="fa fa-minus"></i></button>
                <button class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove"><i class="fa fa-times"></i></button>
            </div>
        </div>
        <div class="box-body">
            
            @if($property_data->property_type==1)
            Property Type : Residencial
            @elseif($property_data->property_type==2)
            Property Type : Commercial
            @else
            Property Type : Office
            @endif
        </div>
        <div class="box-body">
            Location : {{$property_data->location}}
        </div>
        <div class="box-body">
            @if($property_data->business_deal==1)
            Business Deal : Bye
            @elseif($property_data->business_deal==2)
            Business Deal : Rent
            @else
            Business Deal : Sale
            @endif
            
        </div>
        <div class="box-body">
            no. Of Bedrooms : {{$property_data->no_of_bedrooms}}
        </div>
        <div class="box-body">
            price : {{$property_data->price}}
        </div>
        <div class="box-body">
            area : {{$property_data->area}}
        </div>
        <div class="box-body">
            description : {{$property_data->description}}
        </div>
        <div class="box-body">
            <a class="btn btn-primary btn-flat" href="{{ url('admin/property') }}">Back</a>
        </div>
        <!-- /.box-body -->

    </div><!-- /.box -->
</section><!-- /.content -->
@stop