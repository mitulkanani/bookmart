@extends('admin.master')

@section('content')

<!-- Content Wrapper. Contains page content -->
<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Cart Product Detail
        <!--<small>Blank example to the boxed layout</small> -->
    </h1>

</section>

<!-- Main content -->
<section class="content">

    <!-- Default box -->
    <div class="box">
        <div class="box-header with-border">
            <h3 class="box-title"><strong>sadsd</strong></h3>
            <div class="box-tools pull-right">
                <button class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse"><i class="fa fa-minus"></i></button>
                <button class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove"><i class="fa fa-times"></i></button>
            </div>
        </div>

        
        <div class="box-body">
            area : 
        </div>
        <div class="box-body">
            description : 
        </div>
        <div class="box-body">
            <a class="btn btn-primary btn-flat" href="{{ url('admin/admin_cart_product') }}">Back</a>
        </div>
        <!-- /.box-body -->

    </div><!-- /.box -->
</section><!-- /.content -->
@stop