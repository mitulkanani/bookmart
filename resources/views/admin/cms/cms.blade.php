@extends('admin.master')

@section('content')
<!-- content push wrapper -->

<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Users
        <small>Manage Users</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="{{ url('admin/addcms') }}"><span class="add-link"> Add CMS </span> </a></li>
    </ol>
</section>

<!-- Main content -->
<section class="content">
    <div class="row">

        <div class="col-md-12">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title">Users</h3>
                </div><!-- /.box-header -->
                <div class="box-body no-padding">
                    <table class="table table-striped">
                        <tr>
                            <th>Subject</th>
                            <th>Slug</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        @foreach($cmsAll as $key=>$value)
                    <tr>
                      <td>
                        <a href="{{ url('/admin/cms/') }}/{{$value->id}}">{{$value->subject}}</a>
                     </td>
                     <td>
                         {{$value->slug}}
                     </td>
                     <td>
                         @if($value->status==1)
                            Active
                         @else
                            Inactive
                        @endif
                     </td>

                     <td>
                        <a href="{{ url('/admin/editcms/') }}/{{$value->id}}">Edit</a>
                        <a onclick="return confirm('Are you sure you want to delete this cms?')" href="{{ url('/admin/deletecms/') }}/{{$value->id}}">Delete</a>
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