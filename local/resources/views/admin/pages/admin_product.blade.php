@extends('admin.master')

@section('content')
<!-- content push wrapper -->

<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Products
        <small>Manage Products</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="{{ url('admin/addproduct') }}"><span class="add-link"> Add Product </span> </a></li>
    </ol>
</section>

<!-- Main content -->
<section class="content">
    <div class="row">

        <div class="col-md-12">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">Products</h3>
                </div><!-- /.box-header -->
                <div class="box-body no-padding">
                    <table class="table table-striped">
                        <tr>
                            <th>cat_id</th>
                            <th>sale_rent</th>
                            <th>front big image</th>
                            <th>back big image</th>
                            <th>full-name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        @foreach($products as $key=>$value)

                        <tr>
                            <td>
                                {{$value->cat_id}}
                            </td>
                            <td>
                                {{$value->sale_rent}}
                            </td>
                            <td>
                                {{$value->front_big_img}}
                            </td>
                            <td>
                                {{$value->back_big_img}}
                            </td>
                            <td>
                                {{$value->full_name}}
                            </td>
                            <td>
                                {{$value->price}}
                            </td>
                            <td>
                                @if($value->status==1)
                                Active
                                @else
                                Inactive
                                @endif
                            </td>

                            <td>
                                <a href="{{ url('/admin/edituser/') }}/{{$value->id}}">Edit</a>
                                <a onclick="return confirm('Are you sure you want to delete this user?')" href="{{ url('/admin/deleteuser/') }}/{{$value->id}}">Delete</a>
                            </td>
                        </tr>
                        @endforeach
                    </table>
                </div><!-- /.box-body -->
            </div><!-- /.box -->
        </div><!-- /.col -->
    </div><!-- /.row -->

</section><!-- /.content -->

<script>
</script>
@stop