@extends('admin.master')

@section('content')
<!-- content push wrapper -->

<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Property
        <small>Manage Property</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="{{ url('admin/addproduct') }}"><span class="add-link"> Add Transport Ad </span> </a></li>
    </ol>
</section>

<!-- Main content -->
<section class="content">
    <div class="row">

        <div class="col-md-12">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">Property</h3>
                </div><!-- /.box-header -->
                <div class="box-body no-padding">
                    <table class="table table-striped">
                        <tr>
                            <th>Ad Type</th>
                            <th>Ad Title</th>
                            <th>Price</th>
                            <th>Address</th>
                            <th>city</th>
                            <th>Owner Name</th>
                            <th>Mobile-no</th>
                            <th>Action</th>
                            <th>Upload Image</th>
                        </tr>
                        @foreach($transportList as $key=>$value)
                        <tr>
                            <td>
                                {{$value->ad_type}}
                            </td>
                            <td>
                                {{$value->ad_title}}
                            </td>
                            <td>
                                {{$value->price}}
                            </td>
                            <td>
                                {{$value->address}}
                            </td>
                            <td>
                                {{$value->city}}
                            </td>
                            <td>
                                {{$value->owner_name}}
                            </td>
                            <td>
                                {{$value->mobileno}}
                            </td>
                            <td>
                                @if($value->status==1)
                                <span style="color: green">ACTIVE</span>
                                @else($value->status==0)
                                <span style="color: red">Inactive</span>
                                @endif
                            </td>

                            <td>
                                <a href="{{ url('/admin/editAdmin_product/') }}/{{$value->id}}">Edit</a>
                                <a onclick="return confirm('Are you sure you want to delete this user?')" href="{{ url('/admin/deleteAdmin_product/') }}/{{$value->id}}">Delete</a>
                            </td>
                        </tr>
                        @endforeach
                    </table>
                </div><!-- /.box-body -->
            </div><!-- /.box -->
        </div><!-- /.col -->
    </div><!-- /.row -->
    <form id="form1">
        <div>
            <div id="popupdiv" title="Uploadd Image" style="display: none">
                <b> Welcome to Aspdotnet-Suresh.com</b>
            </div>
            <table align="center" style="margin-top:200px">
                <tr>
                    <td>

                    </td>
                </tr>
            </table>
        </div>
    </form>
</section><!-- /.content -->

<script>
</script>
@stop