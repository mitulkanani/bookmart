@extends('admin.master')

@section('content')
<!-- content push wrapper -->

<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Book-Mart
        <small>Manage Book-Mart</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="{{ url('admin/add_admin_book_mart') }}"><span class="add-link"> Add Books </span> </a></li>
    </ol>
</section>

<!-- Main content -->
<section class="content">
    <div class="row">

        <div class="col-md-12">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">Books</h3>
                </div><!-- /.box-header -->
                <div class="box-body no-padding">
                    <table class="table table-striped" >
                        <tr>
                            <th>Category</th>
                            <th>ad_type</th>
                            <th>ad_title</th>
                            <th>author_name</th>
                            <th>Price</th>
                            <th>owner_name</th>
                            <th>mobileno</th>
                            <th>college</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        @foreach($book_mart_products as $key=>$value)

                        <tr>
                            <td>
                                {{$value->category}}
                            </td>
                            <td>
                                {{$value->ad_type}}
                            </td>
                            <td>
                                {{$value->ad_title}}
                            </td>
                            <td>
                                {{$value->author_name}}
                            </td>
                            <td>
                                {{$value->price}}
                            </td>
                            <td>
                                {{$value->owner_name}}
                            </td>
                            <td>
                                {{$value->mobileno}}
                            </td>
                            <td>
                                {{$value->college}}
                            </td>
                            <td>
                                @if($value->status==1)
                                <span style="color: green">ACTIVE</span>
                                @else
                                <span style="color: red">Inactive</span>
                                @endif
                            </td>

                            <td>
                                <a href="{{ url('/admin/edit_admin_book_mart/') }}/{{$value->id}}">Edit</a>
                                <a href="{{ url('/admin/view_admin_book_mart/') }}/{{$value->id}}">View</a>
                                <a onclick="return confirm('Are you sure you want to delete this user?')" href="{{ url('/admin/delete_admin_book_mart/') }}/{{$value->id}}">Delete</a>
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